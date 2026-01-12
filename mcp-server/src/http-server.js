#!/usr/bin/env node

/**
 * HTTP Server for Juicebox Documentation MCP
 * 
 * Provides HTTP API access to the MCP server functionality
 * Can be deployed to Vercel or run as a standalone HTTP server
 */

import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import removeMarkdown from "remove-markdown";
import Fuse from "fuse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../..");
const DOCS_DIR = path.join(PROJECT_ROOT, "docs");
const INDEX_FILE = path.join(__dirname, "docs-index.json");
const CODE_EXAMPLES_FILE = path.join(__dirname, "code-examples-index.json");
const SDK_REFERENCE_FILE = path.join(__dirname, "sdk-reference.json");
const CONTRACT_ADDRESSES_FILE = path.join(__dirname, "contract-addresses.json");
const INTEGRATION_PATTERNS_FILE = path.join(__dirname, "integration-patterns.json");

let docIndex = [];
let codeExamples = [];
let sdkReference = null;
let contractAddresses = null;
let integrationPatterns = null;
let fuse = null;

async function loadIndex() {
  try {
    const indexData = await fs.readFile(INDEX_FILE, "utf-8");
    docIndex = JSON.parse(indexData);
    console.log(`Loaded ${docIndex.length} documents from index`);
    initializeSearch();
  } catch (error) {
    console.error("Index not found, building new index...");
    await buildIndex();
    initializeSearch();
  }

  // Load code examples
  try {
    const codeData = await fs.readFile(CODE_EXAMPLES_FILE, "utf-8");
    codeExamples = JSON.parse(codeData);
    console.log(`Loaded ${codeExamples.length} code examples`);
  } catch (error) {
    console.log("Code examples index not found");
    codeExamples = [];
  }

  // Load SDK reference
  try {
    const sdkData = await fs.readFile(SDK_REFERENCE_FILE, "utf-8");
    sdkReference = JSON.parse(sdkData);
    console.log("Loaded SDK reference");
  } catch (error) {
    console.log("SDK reference not found");
  }

  // Load contract addresses
  try {
    const addressData = await fs.readFile(CONTRACT_ADDRESSES_FILE, "utf-8");
    contractAddresses = JSON.parse(addressData);
    console.log("Loaded contract addresses");
  } catch (error) {
    console.log("Contract addresses not found");
  }

  // Load integration patterns
  try {
    const patternsData = await fs.readFile(INTEGRATION_PATTERNS_FILE, "utf-8");
    integrationPatterns = JSON.parse(patternsData);
    console.log(`Loaded ${integrationPatterns.patterns.length} integration patterns`);
  } catch (error) {
    console.log("Integration patterns not found");
  }
}

async function buildIndex() {
  console.log("Building documentation index...");
  docIndex = [];
  
  async function processDirectory(dir, basePath = "") {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      // Skip blog, town-hall, and excluded dao directories
      if (entry.isDirectory()) {
        if (
          entry.name === "blog" || 
          entry.name === "town-hall" || 
          entry.name === "archive" ||
          entry.name === "reference" ||
          entry.name === "security" ||
          basePath.includes("/blog") || 
          basePath.includes("/town-hall") ||
          basePath.includes("/dao/archive") ||
          basePath.includes("/dao/reference") ||
          basePath.includes("/dao/security") ||
          basePath.includes("docusaurus-plugin-content-blog")
        ) {
          continue;
        }
        await processDirectory(fullPath, relativePath);
      } else if (entry.name.endsWith(".md")) {
        // Skip files in blog, town-hall, or excluded dao paths
        if (
          relativePath.includes("/blog") || 
          relativePath.includes("/town-hall") ||
          relativePath.includes("/dao/archive") ||
          relativePath.includes("/dao/reference") ||
          relativePath.includes("/dao/security") ||
          relativePath.includes("docusaurus-plugin-content-blog")
        ) {
          continue;
        }
        try {
          const content = await fs.readFile(fullPath, "utf-8");
          const { data: frontmatter, content: body } = matter(content);
          
          const textContent = removeMarkdown(body);
          
          const headings = [];
          const headingRegex = /^#{1,6}\s+(.+)$/gm;
          let match;
          while ((match = headingRegex.exec(body)) !== null) {
            headings.push(match[1].trim());
          }
          
          let category = "general";
          if (relativePath.startsWith("dev/")) category = "developer";
          else if (relativePath.startsWith("user/")) category = "user";
          else if (relativePath.startsWith("dao/")) category = "dao";
          else if (relativePath.startsWith("ecosystem/")) category = "ecosystem";
          
          const versionMatch = relativePath.match(/v([345])/);
          const version = versionMatch ? `v${versionMatch[1]}` : null;
          
          // Determine document type for better search relevance
          let docType = "general";
          let tags = [];
          
          if (relativePath.includes("/build/")) {
            docType = "build";
            tags.push("integration", "development", "tutorial");
          }
          if (relativePath.includes("/api/")) {
            docType = "api";
            tags.push("reference", "contract", "interface");
          }
          if (relativePath.includes("/learn/")) {
            docType = "learn";
            tags.push("concept", "explanation");
          }
          if (relativePath.includes("/examples/")) {
            docType = "example";
            tags.push("code", "tutorial", "integration");
          }
          if (relativePath.includes("/hooks/")) {
            tags.push("hook", "extension", "custom");
          }
          if (relativePath.includes("addresses")) {
            tags.push("address", "deployment");
          }
          
          // Boost priority for integrator-relevant content
          // Higher score = higher priority for learn/build, lower for API
          let integratorRelevance = 0;
          if (relativePath.startsWith("dev/v5/build/examples/")) integratorRelevance = 10; // Examples highest
          else if (relativePath.startsWith("dev/v5/build/")) integratorRelevance = 9; // Build guides high
          else if (relativePath.startsWith("dev/v5/learn/")) integratorRelevance = 8; // Learn content high
          else if (relativePath.startsWith("dev/v5/api/core/")) integratorRelevance = 7; // Core API highest priority
          else if (relativePath.startsWith("dev/v5/api/suckers/")) integratorRelevance = 6; // Suckers API
          else if (relativePath.startsWith("dev/v5/api/721-hook/")) integratorRelevance = 6; // 721 hook API
          else if (relativePath.startsWith("dev/v5/api/buyback-hook/")) integratorRelevance = 6; // Buyback hook API
          else if (relativePath.startsWith("dev/v5/api/revnet/")) integratorRelevance = 6; // Revnet API
          else if (relativePath.startsWith("dev/v5/api/")) integratorRelevance = 3; // Other API lower priority
          else if (relativePath.startsWith("dev/v5/")) integratorRelevance = 5;
          
          docIndex.push({
            path: relativePath,
            fullPath: fullPath,
            title: frontmatter.title || headings[0] || path.basename(entry.name, ".md"),
            description: frontmatter.description || textContent.substring(0, 200),
            content: textContent,
            headings: headings,
            category: category,
            version: version,
            docType: docType,
            tags: tags,
            integratorRelevance: integratorRelevance,
            sidebarPosition: frontmatter.sidebar_position || 999,
            url: `https://docs.juicebox.money/${relativePath.replace(/\.md$/, "")}`,
          });
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }
  
  await processDirectory(DOCS_DIR);
  await fs.writeFile(INDEX_FILE, JSON.stringify(docIndex, null, 2));
  console.log(`Indexed ${docIndex.length} documents`);
}

function initializeSearch() {
  fuse = new Fuse(docIndex, {
    keys: [
      { name: "title", weight: 0.35 },
      { name: "description", weight: 0.25 },
      { name: "content", weight: 0.15 },
      { name: "headings", weight: 0.1 },
      { name: "tags", weight: 0.15 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    getFn: (obj, path) => {
      if (path === "tags") return obj.tags?.join(" ") || "";
      return Fuse.config.getFn(obj, path);
    },
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    name: "Juicebox Docs MCP Server",
    version: "2.0.0",
    status: "running",
    totalDocs: docIndex.length,
    totalCodeExamples: codeExamples.length,
    endpoints: [
      "GET /",
      "POST /mcp/search",
      "POST /mcp/get-doc",
      "GET /mcp/list-docs",
      "GET /mcp/structure",
      "POST /mcp/search-code",
      "GET /mcp/contracts",
      "GET /mcp/sdk",
      "GET /mcp/patterns",
    ],
  });
});

// Search endpoint
app.post("/mcp/search", async (req, res) => {
  try {
    const { query, category = "all", version = "v5", limit = 10 } = req.body;

    if (!query) {
      return res.status(400).json({ error: "query parameter is required" });
    }

    // Detect query intent
    const queryLower = query.toLowerCase();
    const isAPIQuery = /\b(api|interface|contract|function|method|struct|enum|event|abi|specification|spec)\b/i.test(query) ||
                       /\b(ICT|CT|JB|REV)[A-Z]/.test(query); // Contract/interface names

    // Check if explicitly requesting old versions
    const wantsOldVersion = /\b(v3|v4)\b/i.test(query) || queryLower.includes("v3") || queryLower.includes("v4");

    // Default to v5 unless explicitly requesting older versions or "all"
    let effectiveVersion = version;
    if (version === "all" && !wantsOldVersion) {
      effectiveVersion = "v5"; // Always prioritize v5 for new developers
    }
    
    let filteredIndex = docIndex;
    if (category !== "all") {
      filteredIndex = filteredIndex.filter((d) => d.category === category);
    }
    if (effectiveVersion !== "all") {
      filteredIndex = filteredIndex.filter((d) => d.version === effectiveVersion);
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

// Get document endpoint
app.post("/mcp/get-doc", async (req, res) => {
  try {
    const { path: docPath } = req.body;
    
    if (!docPath) {
      return res.status(400).json({ error: "path parameter is required" });
    }
    
    let doc = docIndex.find(
      (d) => d.path === docPath || d.path.endsWith(docPath)
    );
    
    if (!doc) {
      doc = docIndex.find(
        (d) =>
          d.title.toLowerCase().includes(docPath.toLowerCase()) ||
          docPath.toLowerCase().includes(d.title.toLowerCase())
      );
    }
    
    if (!doc) {
      return res.status(404).json({ error: `Document not found: ${docPath}` });
    }
    
    const content = await fs.readFile(doc.fullPath, "utf-8");
    
    res.json({
      title: doc.title,
      path: doc.path,
      url: doc.url,
      category: doc.category,
      version: doc.version,
      content: content,
      metadata: {
        headings: doc.headings,
        description: doc.description,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List docs by category
app.get("/mcp/list-docs", async (req, res) => {
  try {
    const { category, version = "all" } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: "category parameter is required" });
    }
    
    let filtered = docIndex.filter((d) => d.category === category);
    
    if (version !== "all") {
      filtered = filtered.filter((d) => d.version === version);
    }
    
    filtered.sort((a, b) => {
      if (a.sidebarPosition !== b.sidebarPosition) {
        return a.sidebarPosition - b.sidebarPosition;
      }
      return a.title.localeCompare(b.title);
    });
    
    res.json({
      category,
      version,
      documents: filtered.map((doc) => ({
        title: doc.title,
        path: doc.path,
        description: doc.description,
        url: doc.url,
        version: doc.version,
      })),
      total: filtered.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get structure
app.get("/mcp/structure", (req, res) => {
  try {
    const structure = {
      categories: {},
      versions: ["v3", "v4", "v5"],
      totalDocuments: docIndex.length,
    };

    for (const doc of docIndex) {
      if (!structure.categories[doc.category]) {
        structure.categories[doc.category] = {
          total: 0,
          versions: {},
        };
      }

      structure.categories[doc.category].total++;

      if (doc.version) {
        if (!structure.categories[doc.category].versions[doc.version]) {
          structure.categories[doc.category].versions[doc.version] = 0;
        }
        structure.categories[doc.category].versions[doc.version]++;
      }
    }

    res.json(structure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search code examples
app.post("/mcp/search-code", async (req, res) => {
  try {
    const { query, language = "all", category = "all", limit = 10 } = req.body;

    if (!query) {
      return res.status(400).json({ error: "query parameter is required" });
    }

    if (!codeExamples || codeExamples.length === 0) {
      return res.status(503).json({ error: "Code examples index not available" });
    }

    let filtered = codeExamples;

    if (language !== "all") {
      filtered = filtered.filter((ex) =>
        ex.language === language ||
        (ex.language === "ts" && language === "typescript") ||
        (ex.language === "js" && language === "javascript")
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((ex) => ex.category === category);
    }

    const queryLower = query.toLowerCase();
    const results = filtered
      .filter((ex) =>
        ex.code.toLowerCase().includes(queryLower) ||
        ex.context.toLowerCase().includes(queryLower) ||
        ex.docTitle.toLowerCase().includes(queryLower)
      )
      .slice(0, parseInt(limit))
      .map((ex) => ({
        language: ex.language,
        category: ex.category,
        context: ex.context,
        code: ex.code,
        docPath: ex.docPath,
        docTitle: ex.docTitle,
      }));

    res.json({
      query,
      language,
      category,
      results,
      total: results.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contract addresses
app.get("/mcp/contracts", async (req, res) => {
  try {
    const { contract, chainId = "all", category = "all" } = req.query;

    if (!contractAddresses) {
      return res.status(503).json({ error: "Contract addresses not available" });
    }

    let results = {};

    const categories = category === "all"
      ? Object.keys(contractAddresses.contracts)
      : [category];

    for (const cat of categories) {
      const catContracts = contractAddresses.contracts[cat];
      if (!catContracts) continue;

      for (const [name, data] of Object.entries(catContracts)) {
        if (contract && !name.toLowerCase().includes(contract.toLowerCase())) {
          continue;
        }

        const contractInfo = {
          category: cat,
          description: data.description,
          docs: data.docs,
        };

        if (data.addresses) {
          if (chainId === "all") {
            contractInfo.addresses = data.addresses;
          } else {
            contractInfo.address = data.addresses[chainId];
          }
        } else if (data.address) {
          contractInfo.address = data.address;
          if (data.note) contractInfo.note = data.note;
        }

        results[name] = contractInfo;
      }
    }

    const response = {
      chains: contractAddresses.chains,
      contracts: results,
      notes: contractAddresses.notes,
      constants: contractAddresses.constants,
    };

    if (chainId !== "all") {
      response.selectedChain = contractAddresses.chains[chainId];
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get SDK reference
app.get("/mcp/sdk", async (req, res) => {
  try {
    const { package: pkg = "all", hook, category = "all" } = req.query;

    if (!sdkReference) {
      return res.status(503).json({ error: "SDK reference not available" });
    }

    const results = {};

    const packages = pkg === "all"
      ? Object.keys(sdkReference.packages)
      : [pkg];

    for (const pkgName of packages) {
      const pkgData = sdkReference.packages[pkgName];
      if (!pkgData) continue;

      const pkgResult = {
        description: pkgData.description,
        npm: pkgData.npm,
      };

      if (pkgData.hooks) {
        let hooks = pkgData.hooks;
        if (hook) {
          hooks = hooks.filter((h) =>
            h.name.toLowerCase().includes(hook.toLowerCase())
          );
        }
        if (category !== "all") {
          hooks = hooks.filter((h) => h.category === category);
        }
        if (hooks.length > 0) {
          pkgResult.hooks = hooks;
        }
      }

      if (pkgData.utilities) {
        let utilities = pkgData.utilities;
        if (hook) {
          utilities = utilities.filter((u) =>
            u.name.toLowerCase().includes(hook.toLowerCase())
          );
        }
        if (category !== "all") {
          utilities = utilities.filter((u) => u.category === category);
        }
        if (utilities.length > 0) {
          pkgResult.utilities = utilities;
        }
      }

      if (pkgResult.hooks || pkgResult.utilities) {
        results[pkgName] = pkgResult;
      }
    }

    let commonPatterns = [];
    if (hook && sdkReference.commonPatterns) {
      commonPatterns = sdkReference.commonPatterns.filter((p) =>
        p.relatedHooks?.some((h) =>
          h.toLowerCase().includes(hook.toLowerCase())
        )
      );
    }

    res.json({
      packages: results,
      commonPatterns: commonPatterns.length > 0 ? commonPatterns : undefined,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get integration patterns
app.get("/mcp/patterns", async (req, res) => {
  try {
    const { pattern, category = "all", projectType, tags } = req.query;

    if (!integrationPatterns) {
      return res.status(503).json({ error: "Integration patterns not available" });
    }

    let patterns = integrationPatterns.patterns;

    if (pattern) {
      patterns = patterns.filter((p) =>
        p.id === pattern ||
        p.id.includes(pattern) ||
        p.name.toLowerCase().includes(pattern.toLowerCase())
      );
    }

    if (category !== "all") {
      patterns = patterns.filter((p) => p.category === category);
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      patterns = patterns.filter((p) =>
        tagArray.some((tag) => p.tags?.includes(tag.toLowerCase()))
      );
    }

    let projectTypeInfo = null;
    if (projectType) {
      projectTypeInfo = integrationPatterns.projectTypes.find(
        (pt) => pt.id === projectType
      );
      if (projectTypeInfo) {
        patterns = patterns.filter((p) =>
          projectTypeInfo.recommendedPatterns.includes(p.id)
        );
      }
    }

    res.json({
      patterns: patterns.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category: p.category,
        tags: p.tags,
        code: p.code,
        dependencies: p.dependencies,
        relatedDocs: p.relatedDocs,
      })),
      projectType: projectTypeInfo,
      projectTypes: integrationPatterns.projectTypes,
      total: patterns.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize index on module load
let indexLoaded = false;

async function ensureIndexLoaded() {
  if (!indexLoaded) {
    await loadIndex();
    indexLoaded = true;
  }
}

// Start server
const PORT = process.env.PORT || 3001;

async function startServer() {
  await ensureIndexLoaded();
  
  // Run as standalone server
  app.listen(PORT, () => {
    console.log(`Juicebox Docs MCP HTTP Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}`);
  });
}

// For Vercel, ensure index is loaded on first request
app.use(async (req, res, next) => {
  await ensureIndexLoaded();
  next();
});

// Only start standalone server if not in Vercel environment
if (!process.env.VERCEL) {
  startServer().catch(console.error);
}

// Export for Vercel
export default app;
