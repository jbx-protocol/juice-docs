/**
 * Vercel Serverless Function for MCP HTTP API
 */

import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import removeMarkdown from "remove-markdown";
import Fuse from "fuse.js";
import Anthropic from "@anthropic-ai/sdk";

// Use process.cwd() for Vercel compatibility (works in both CJS and ESM)
const PROJECT_ROOT = process.cwd();
const INDEX_FILE = path.join(PROJECT_ROOT, "mcp-server/src/docs-index.json");

let docIndex = [];
let fuse = null;
let indexLoaded = false;

async function loadIndex() {
  try {
    const indexData = await fs.readFile(INDEX_FILE, "utf-8");
    docIndex = JSON.parse(indexData);
    console.log(`Loaded ${docIndex.length} documents from index`);
    initializeSearch();
  } catch (error) {
    console.error("Index not found:", error.message);
    docIndex = [];
    initializeSearch();
  }
}

function initializeSearch() {
  if (docIndex.length === 0) return;
  
  fuse = new Fuse(docIndex, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "description", weight: 0.3 },
      { name: "content", weight: 0.2 },
      { name: "headings", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

async function ensureIndexLoaded() {
  if (!indexLoaded) {
    await loadIndex();
    indexLoaded = true;
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await ensureIndexLoaded();
  next();
});

// Health check - handle both / and /api/mcp/
app.get(["/", "/api/mcp", "/api/mcp/"], (req, res) => {
  res.json({
    name: "Juicebox Docs MCP Server",
    version: "1.0.0",
    status: "running",
    totalDocs: docIndex.length,
    endpoints: ["GET /", "POST /search", "POST /get-doc", "GET /list-docs", "GET /structure"],
  });
});

app.post(["/search", "/api/mcp/search"], async (req, res) => {
  try {
    const { query, category = "all", version = "all", limit = 10 } = req.body;
    if (!query) return res.status(400).json({ error: "query parameter is required" });
    if (docIndex.length === 0) return res.status(503).json({ error: "Index not available" });
    
    // Detect query intent
    const queryLower = query.toLowerCase();
    const isAPIQuery = /\b(api|interface|contract|function|method|struct|enum|event|abi|specification|spec)\b/i.test(query) || 
                       /\b(ICT|CT|JB|REV)[A-Z]/.test(query); // Contract/interface names
    const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|hook|example|tutorial|how to|getting started)\b/i.test(query);
    const isV5Query = /\bv5\b/i.test(query) || queryLower.includes("v5");
    const isV4Query = /\bv4\b/i.test(query) || queryLower.includes("v4");
    const isV3Query = /\bv3\b/i.test(query) || queryLower.includes("v3");
    const isV2Query = /\bv2\b/i.test(query) || queryLower.includes("v2");
    const isV1Query = /\bv1\b/i.test(query) || queryLower.includes("v1");
    
    // Only include v1-v3 if explicitly requested
    const explicitlyRequestsOldVersion = isV1Query || isV2Query || isV3Query;
    
    // Auto-filter to v5 for building queries if version not specified
    let effectiveVersion = version;
    if (version === "all" && (isBuildingQuery || isAPIQuery) && !isV5Query && !isV4Query) {
      effectiveVersion = "v5";
    }
    
    let filteredIndex = docIndex;
    if (category !== "all") filteredIndex = filteredIndex.filter((d) => d.category === category);
    if (effectiveVersion !== "all") filteredIndex = filteredIndex.filter((d) => d.version === effectiveVersion);
    
    // Exclude v1-v3 docs unless explicitly requested
    if (!explicitlyRequestsOldVersion && effectiveVersion === "all") {
      filteredIndex = filteredIndex.filter((d) => {
        const docVersion = d.version?.toLowerCase() || "";
        return docVersion === "v4" || docVersion === "v5" || !docVersion || docVersion === "";
      });
    }
    
    const filteredFuse = new Fuse(filteredIndex, {
      keys: [
        { name: "title", weight: 0.35 },
        { name: "description", weight: 0.25 },
        { name: "content", weight: 0.15 },
        { name: "headings", weight: 0.1 },
        { name: "tags", weight: 0.15 },
      ],
      threshold: 0.4,
      includeScore: true,
      getFn: (obj, path) => {
        if (path === "tags") return obj.tags?.join(" ") || "";
        return Fuse.config.getFn(obj, path);
      },
    });
    
    let results = filteredFuse.search(query, { limit: parseInt(limit) * 3 });
    
    // Re-rank results based on query type and document type
    if (isAPIQuery) {
      // For API queries, prioritize API docs with core API highest
      results = results.map(r => {
        let adjustedScore = r.score;
        if (r.item.docType === "api") {
          // Use integratorRelevance to rank API sections (core=7, others=6 or 3)
          adjustedScore -= (r.item.integratorRelevance || 0) * 0.15;
        } else if (r.item.docType === "learn" || r.item.docType === "build") {
          adjustedScore += 0.1; // Slight penalty for non-API
        }
        return { ...r, score: adjustedScore };
      }).sort((a, b) => a.score - b.score).slice(0, parseInt(limit));
    } else {
      // For all non-API queries, prioritize learn/build over API
      results = results.map(r => {
        let adjustedScore = r.score;
        // Strong boost for learn/build content based on integratorRelevance
        if (r.item.docType === "learn" || r.item.docType === "build" || r.item.docType === "example") {
          adjustedScore -= (r.item.integratorRelevance || 0) * 0.2; // Stronger boost
        }
        // Penalty for API docs in non-API queries, but less for core API
        if (r.item.docType === "api") {
          if (r.item.path.includes("/api/core/")) {
            adjustedScore += 0.2; // Smaller penalty for core API
          } else if (r.item.path.includes("/api/suckers/") || 
                     r.item.path.includes("/api/721-hook/") || 
                     r.item.path.includes("/api/buyback-hook/") || 
                     r.item.path.includes("/api/revnet/")) {
            adjustedScore += 0.3; // Medium penalty for priority API sections
          } else {
            adjustedScore += 0.4; // Larger penalty for other API docs
          }
        }
        return { ...r, score: adjustedScore };
      }).sort((a, b) => a.score - b.score).slice(0, parseInt(limit));
    }
    res.json({
      query,
      results: results.map((result) => ({
        title: result.item.title,
        path: result.item.path,
        description: result.item.description,
        url: result.item.url,
        category: result.item.category,
        version: result.item.version,
        score: result.score,
        headings: result.item.headings.slice(0, 5),
      })),
      total: results.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post(["/get-doc", "/api/mcp/get-doc"], async (req, res) => {
  try {
    const { path: docPath } = req.body;
    if (!docPath) return res.status(400).json({ error: "path parameter is required" });
    if (docIndex.length === 0) return res.status(503).json({ error: "Index not available" });
    
    let doc = docIndex.find((d) => d.path === docPath || d.path.endsWith(docPath));
    if (!doc) doc = docIndex.find((d) => d.title.toLowerCase().includes(docPath.toLowerCase()) || docPath.toLowerCase().includes(d.title.toLowerCase()));
    if (!doc) return res.status(404).json({ error: `Document not found: ${docPath}` });
    
    const content = await fs.readFile(doc.fullPath, "utf-8");
    res.json({ title: doc.title, path: doc.path, url: doc.url, category: doc.category, version: doc.version, content, metadata: { headings: doc.headings, description: doc.description } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get(["/list-docs", "/api/mcp/list-docs"], async (req, res) => {
  try {
    const { category, version = "all" } = req.query;
    if (!category) return res.status(400).json({ error: "category parameter is required" });
    if (docIndex.length === 0) return res.status(503).json({ error: "Index not available" });
    
    let filtered = docIndex.filter((d) => d.category === category);
    if (version !== "all") filtered = filtered.filter((d) => d.version === version);
    filtered.sort((a, b) => (a.sidebarPosition !== b.sidebarPosition ? a.sidebarPosition - b.sidebarPosition : a.title.localeCompare(b.title)));
    
    res.json({ category, version, documents: filtered.map((doc) => ({ title: doc.title, path: doc.path, description: doc.description, url: doc.url, version: doc.version })), total: filtered.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get(["/structure", "/api/mcp/structure"], (req, res) => {
  try {
    const structure = { categories: {}, versions: ["v3", "v4", "v5"], totalDocuments: docIndex.length };
    for (const doc of docIndex) {
      if (!structure.categories[doc.category]) structure.categories[doc.category] = { total: 0, versions: {} };
      structure.categories[doc.category].total++;
      if (doc.version) {
        if (!structure.categories[doc.category].versions[doc.version]) structure.categories[doc.category].versions[doc.version] = 0;
        structure.categories[doc.category].versions[doc.version]++;
      }
    }
    res.json(structure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint to verify Claude API key and model access
app.get(["/test-claude", "/api/mcp/test-claude"], async (req, res) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "ANTHROPIC_API_KEY not configured",
        configured: false 
      });
    }

    const anthropic = new Anthropic({ apiKey });
    const testModels = [
      "claude-3-5-sonnet-20241022",
      "claude-3-5-sonnet-20240620",
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ];

    const results = [];
    for (const model of testModels) {
      try {
        const testMessage = await anthropic.messages.create({
          model: model,
          max_tokens: 10,
          messages: [{ role: "user", content: "Hi" }],
        });
        results.push({ model, status: "available", response: "success" });
        break; // Found a working model
      } catch (error) {
        const errorMsg = error.error?.message || error.message || JSON.stringify(error);
        results.push({ 
          model, 
          status: "unavailable", 
          error: errorMsg,
          statusCode: error.status 
        });
      }
    }

    const workingModel = results.find(r => r.status === "available");
    res.json({
      apiKeyConfigured: true,
      workingModel: workingModel?.model || null,
      testResults: results,
      recommendation: workingModel 
        ? `Use model: ${workingModel.model}`
        : "No models available. Check your API key permissions and billing status."
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: error.stack 
    });
  }
});

// Claude-powered ask endpoint with full document context
app.post(["/ask", "/api/mcp/ask"], async (req, res) => {
  try {
    const { query, category = "all", version = "all", maxDocs = 5 } = req.body;
    if (!query) return res.status(400).json({ error: "query parameter is required" });
    if (docIndex.length === 0) return res.status(503).json({ error: "Index not available" });

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "ANTHROPIC_API_KEY environment variable is not set. Please configure it in your Vercel project settings." 
      });
    }

    // Use the same search logic as /search endpoint
    const queryLower = query.toLowerCase();
    const isAPIQuery = /\b(api|interface|contract|function|method|struct|enum|event|abi|specification|spec)\b/i.test(query) || 
                       /\b(ICT|CT|JB|REV)[A-Z]/.test(query);
    const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|hook|example|tutorial|how to|getting started)\b/i.test(query);
    const isV5Query = /\bv5\b/i.test(query) || queryLower.includes("v5");
    const isV4Query = /\bv4\b/i.test(query) || queryLower.includes("v4");
    const isV3Query = /\bv3\b/i.test(query) || queryLower.includes("v3");
    const isV2Query = /\bv2\b/i.test(query) || queryLower.includes("v2");
    const isV1Query = /\bv1\b/i.test(query) || queryLower.includes("v1");
    
    // Only include v1-v3 if explicitly requested
    const explicitlyRequestsOldVersion = isV1Query || isV2Query || isV3Query;
    
    let effectiveVersion = version;
    if (version === "all" && (isBuildingQuery || isAPIQuery) && !isV5Query && !isV4Query) {
      effectiveVersion = "v5";
    }
    
    let filteredIndex = docIndex;
    if (category !== "all") filteredIndex = filteredIndex.filter((d) => d.category === category);
    if (effectiveVersion !== "all") filteredIndex = filteredIndex.filter((d) => d.version === effectiveVersion);
    
    // Exclude v1-v3 docs unless explicitly requested
    if (!explicitlyRequestsOldVersion && effectiveVersion === "all") {
      filteredIndex = filteredIndex.filter((d) => {
        const docVersion = d.version?.toLowerCase() || "";
        return docVersion === "v4" || docVersion === "v5" || !docVersion || docVersion === "";
      });
    }
    
    const filteredFuse = new Fuse(filteredIndex, {
      keys: [
        { name: "title", weight: 0.35 },
        { name: "description", weight: 0.25 },
        { name: "content", weight: 0.15 },
        { name: "headings", weight: 0.1 },
        { name: "tags", weight: 0.15 },
      ],
      threshold: 0.4,
      includeScore: true,
      getFn: (obj, path) => {
        if (path === "tags") return obj.tags?.join(" ") || "";
        return Fuse.config.getFn(obj, path);
      },
    });
    
    let searchResults = filteredFuse.search(query, { limit: parseInt(maxDocs) * 2 });
    
    // Re-rank results (same logic as /search)
    if (isAPIQuery) {
      searchResults = searchResults.map(r => {
        let adjustedScore = r.score;
        if (r.item.docType === "api") {
          adjustedScore -= (r.item.integratorRelevance || 0) * 0.15;
        } else if (r.item.docType === "learn" || r.item.docType === "build") {
          adjustedScore += 0.1;
        }
        return { ...r, score: adjustedScore };
      }).sort((a, b) => a.score - b.score).slice(0, parseInt(maxDocs));
    } else {
      searchResults = searchResults.map(r => {
        let adjustedScore = r.score;
        if (r.item.docType === "learn" || r.item.docType === "build" || r.item.docType === "example") {
          adjustedScore -= (r.item.integratorRelevance || 0) * 0.2;
        }
        if (r.item.docType === "api") {
          if (r.item.path.includes("/api/core/")) {
            adjustedScore += 0.2;
          } else if (r.item.path.includes("/api/suckers/") || 
                     r.item.path.includes("/api/721-hook/") || 
                     r.item.path.includes("/api/buyback-hook/") || 
                     r.item.path.includes("/api/revnet/")) {
            adjustedScore += 0.3;
          } else {
            adjustedScore += 0.4;
          }
        }
        return { ...r, score: adjustedScore };
      }).sort((a, b) => a.score - b.score).slice(0, parseInt(maxDocs));
    }

    // Fetch full content of top results
    const docsWithContent = await Promise.all(
      searchResults.slice(0, parseInt(maxDocs)).map(async (result) => {
        try {
          const content = await fs.readFile(result.item.fullPath, "utf-8");
          const { content: markdownContent } = matter(content);
          return {
            title: result.item.title,
            path: result.item.path,
            url: result.item.url,
            description: result.item.description,
            content: markdownContent,
            headings: result.item.headings,
          };
        } catch (error) {
          console.error(`Error reading ${result.item.fullPath}:`, error.message);
          return {
            title: result.item.title,
            path: result.item.path,
            url: result.item.url,
            description: result.item.description,
            content: result.item.content, // Fallback to indexed content
            headings: result.item.headings,
          };
        }
      })
    );

    // Build context for Claude
    const contextSections = docsWithContent.map((doc, idx) => {
      return `## Document ${idx + 1}: ${doc.title}
Path: ${doc.path}
URL: ${doc.url}
${doc.description ? `Description: ${doc.description}\n` : ''}
${doc.headings && doc.headings.length > 0 ? `Headings: ${doc.headings.join(' → ')}\n` : ''}
Content:
${doc.content.substring(0, 8000)}${doc.content.length > 8000 ? '\n[... content truncated ...]' : ''}
---`;
    }).join('\n\n');

    // Initialize Claude client
    const anthropic = new Anthropic({ apiKey });

    // Build the prompt
    const systemPrompt = `You are an expert assistant for the Juicebox protocol documentation. You have deep knowledge of Juicebox and confidently guide developers, integrators, and project builders.

**CORE KNOWLEDGE - Juicebox Protocol Overview (v5):**

The Juicebox protocol is a payment processor and capital formation engine for tokenized fundraises, revenues, incentives, and financial operations. It's the "pay" and "cash out" functions of the open internet, and all financial, ownership, and inventory data in between.

**Key Concepts:**

1. **Projects**: Each Juicebox project is represented by a project NFT. Owning this NFT grants full administrative privileges to adapt the project's rulesets over time.

2. **Rulesets**: Rulesets define the operational constraints for a project, including how funds are managed, tokens are issued, and payouts are distributed. Each project operates under one active ruleset at a time, with the ability to queue future rulesets.

   Main configurable ruleset properties:
   - **Start Timestamp**: When the ruleset becomes active
   - **Duration**: How long the ruleset lasts
   - **Payout Limit**: The maximum funds that can be distributed during a ruleset
   - **Surplus Allowance**: Funds the owner can distribute on-demand
   - **Weight**: Determines how many of the project's tokens are issued per payment
   - **Base Currency**: The currency used as the reference for token issuance weight
   - **Weight Cut Percent**: Automatically decreases token issuance weight for subsequent cycles
   - **Reserved Percent**: Percentage of newly issued project tokens withheld for specific distributions (THIS IS ABOUT TOKEN DISTRIBUTION, NOT FUNDS)
   - **Cash Out Tax Rate**: Determines the percentage of the project's funds that token holders can reclaim by cashing out
   - **Approval Hook**: Custom criteria for approving ruleset changes

3. **Token Issuance**: Projects issue tokens when payments are received. By default, tokens are accounted for as credits (not ERC-20). The project owner can optionally deploy an ERC-20 token at any time, which credit holders can then claim. Once an ERC-20 token is deployed, the project no longer issues credits.

4. **CRITICAL DISTINCTION - Reserved Rate/Reserved Percent**:
   - **Reserved Percent is about TOKEN distribution, NOT funds distribution**
   - Reserved Percent determines what percentage of newly issued project tokens are withheld for specific distributions
   - Example: With a weight of 500 tokens/ETH and a reserved percent of 20%, when 2 ETH is paid:
     - 1000 tokens total are issued (500 × 2)
     - 200 tokens (20%) are reserved for the project owner
     - 800 tokens (80%) go to the contributor
   - Reserved tokens are separate from funds - they are tokens, not ETH or other payment currencies
   - Reserved token splits specify how reserved tokens are allocated (to addresses, other projects, or split hook contracts)

5. **Payout Splits vs Reserved Token Splits**:
   - **Payout Splits**: Define how the project's FUNDS can be paid out (ETH, tokens accepted as payment, etc.)
   - **Reserved Token Splits**: Specify how newly issued reserved PROJECT TOKENS are allocated
   - These are completely separate: payout splits handle funds, reserved token splits handle project tokens

6. **Splits Example**: With a weight of 1000 tokens/ETH, payout limit of 10 ETH, and reserved percent of 20%:
   - When 1 ETH is paid: 200 reserved tokens are allocated (20% of 1000 tokens)
   - The 1 ETH can be distributed via payout splits
   - The 200 reserved tokens can be distributed via reserved token splits
   - These are independent distributions

7. **Omnichain**: Projects can operate across multiple EVM-compatible chains, issuing unified project tokens and receiving funds on any supported chain.

8. **Hooks**: Projects can use custom hooks to extend or override default behavior:
   - IJBRulesetDataHook: Custom logic for fund receipts or token cash-outs
   - IJBPayHook: Custom logic when a payment is received
   - IJBCashOutHook: Custom logic when a token holder cashes out
   - IJBSplitHook: Custom logic for payout splits or reserved token splits
   - IJBRulesetApprovalHook: Enforce criteria for ruleset changes

**Remember**: Reserved Rate/Reserved Percent is ALWAYS about TOKEN distribution, never about funds distribution. Funds are handled separately through payout splits.

**Your Approach:**
- Be CONFIDENT and INSIGHTFUL - you know this documentation well
- Provide clear, actionable answers with specific recommendations
- When a user asks a question, don't just answer - GUIDE them to the next logical step
- Make proactive suggestions: "You might also want to consider...", "I'd recommend checking out...", "A common next step is..."
- If the user seems to be exploring a topic, suggest related concepts or next steps they should know about
- Be concise but thorough - aim for 3-5 sentences that give both the answer and helpful context
- Use conversational, friendly language while maintaining technical accuracy
- Provide code examples when they help illustrate a concept, even if not explicitly asked

**Documentation Structure:**
- **Learn** - Step-by-step guidance on how the protocol works
- **Build** - Guides to launch, configure, and extend a Juicebox project
- **API** - Detailed specs for contracts and functions
- **Core API** has highest priority, followed by Suckers, 721-hook, Buyback-hook, and Revnet APIs
- **Learn** and **Build** content should be prioritized for general queries

**CRITICAL TERMINOLOGY RULES:**
- **NEVER use "funding cycles"** - This term is deprecated. Always use "rulesets" or "ruleset cycles" for v4 and v5
- **Version Priority**: Focus on v4 and v5 documentation. Only reference v1-v3 documentation if the user explicitly asks about those versions
- When discussing project configuration, always refer to "rulesets" and "ruleset cycles", never "funding cycles"
- If you see "funding cycles" in older documentation, translate it to "rulesets" in your response

**CRITICAL: Reserved Rate/Reserved Percent Distinction:**
- **Reserved Rate/Reserved Percent is ALWAYS about TOKEN distribution, NEVER about funds distribution**
- Reserved Percent determines what percentage of newly issued project tokens are withheld
- Funds are handled separately through payout splits
- When someone asks about reserved rate, they are asking about TOKEN allocation, not fund allocation
- Example: A 20% reserved rate means 20% of newly issued tokens go to reserved token splits, 80% go to the payer. This has nothing to do with how funds (ETH, etc.) are distributed.

**Guidance Philosophy:**
- When answering, think: "What would be helpful for this user to know next?"
- If they ask about X, suggest Y and Z that are commonly needed alongside X
- If their question is vague, provide the most common interpretation AND ask if they meant something more specific
- Be proactive: "Based on what you're asking, you'll probably also want to know about..."
- Reference specific documentation sections when relevant
- Always use current terminology (rulesets, not funding cycles) unless the user specifically asks about v1-v3

**CRITICAL: Accuracy and Recommendations**
- ONLY provide specific numbers, percentages, or recommendations if they are EXPLICITLY stated in the documentation
- NEVER make up specific values (like "10-20%", "recommended settings", etc.) unless the documentation explicitly recommends them
- If the documentation doesn't provide specific recommendations, explain the trade-offs, options, and considerations instead
- When discussing configuration values, explain what they do and the implications, but don't invent "recommended" values
- If you're not certain about a specific value or recommendation, say so and point to the relevant documentation for the user to review
- Be honest about what the documentation says vs. what it doesn't say`;

    const userMessage = `User Question: ${query}

Relevant Documentation:
${contextSections}

Please answer the user's question based on the provided documentation.

**Your Response Should:**
- Answer the question directly and confidently (3-5 sentences)
- Provide specific, actionable information from the documentation
- Make proactive suggestions about related topics: "You might also want to...", "I'd recommend checking...", "A common next step is..."
- If the question is vague, provide the most helpful interpretation AND suggest what else they might be looking for
- Reference specific documentation when it's particularly relevant
- Guide the user to logical next steps based on their question

**Be Confident and Accurate:**
- You know this documentation well - speak with authority
- ONLY provide specific numbers, percentages, or "recommended" values if they are EXPLICITLY stated in the documentation
- If the documentation doesn't give specific recommendations, explain the trade-offs and considerations instead
- Don't say "I'm not sure" unless you truly cannot find relevant information
- Instead of asking "what do you mean?", provide the most common interpretation and offer alternatives
- Think: "What would be most helpful for someone asking this question?" but don't invent recommendations that aren't in the docs

**TERMINOLOGY**: 
- NEVER use "funding cycles" - always use "rulesets" or "ruleset cycles" for v4 and v5
- If you see "funding cycles" in the documentation, translate it to "rulesets" in your response
- Focus on v4 and v5 terminology unless the user explicitly asks about v1-v3

**CRITICAL REMINDER - Reserved Rate:**
- Reserved Rate/Reserved Percent is about TOKEN distribution, NOT funds distribution
- When answering questions about reserved rate, always clarify it's about tokens, not funds
- Funds distribution is handled separately through payout splits`;

    // Call Claude API
    // Try models in order of preference - using most current and widely available models
    const modelsToTry = [
      "claude-3-5-sonnet-20241022",  // Latest Claude 3.5 Sonnet
      "claude-3-5-sonnet-20240620",  // Previous Claude 3.5 Sonnet
      "claude-3-opus-20240229",      // Claude 3 Opus
      "claude-3-sonnet-20240229",    // Claude 3 Sonnet
      "claude-3-haiku-20240307",     // Claude 3 Haiku (fastest, cheapest)
    ];
    
    let message;
    let lastError;
    const attemptedModels = [];
    
    for (const modelName of modelsToTry) {
      attemptedModels.push(modelName);
      try {
        message = await anthropic.messages.create({
          model: modelName,
          max_tokens: 1000, // Allow for detailed, helpful responses with recommendations
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
        });
        console.log(`Successfully used model: ${modelName}`);
        break; // Success, exit loop
      } catch (error) {
        lastError = error;
        // Check if it's a model not found error
        const errorMessage = error.message || error.error?.message || JSON.stringify(error);
        const isNotFound = errorMessage.includes("not_found") || 
                          errorMessage.includes("model:") || 
                          error.status === 404 ||
                          (error.error && error.error.type === "not_found_error");
        
        if (isNotFound) {
          console.log(`Model ${modelName} not found, trying next...`);
          continue;
        }
        // For authentication errors, provide helpful message
        if (error.status === 401 || error.status === 403) {
          throw new Error(`Authentication failed. Please check that your ANTHROPIC_API_KEY is valid and has access to Claude models.`);
        }
        // For other errors, throw immediately
        throw error;
      }
    }
    
    if (!message) {
      const errorDetails = lastError?.error ? JSON.stringify(lastError.error) : lastError?.message || 'Unknown error';
      throw new Error(
        `None of the Claude models are available. ` +
        `Tried: ${attemptedModels.join(', ')}. ` +
        `Last error: ${errorDetails}. ` +
        `Please check your API key has access to Claude models.`
      );
    }

    const claudeResponse = message.content[0].text;

    // Return response with metadata
    res.json({
      query,
      response: claudeResponse,
      sources: docsWithContent.map(doc => ({
        title: doc.title,
        path: doc.path,
        url: doc.url,
        description: doc.description,
      })),
      totalSources: docsWithContent.length,
    });
  } catch (error) {
    console.error("Claude API error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to get response from Claude",
      details: error.stack 
    });
  }
});

export default app;
