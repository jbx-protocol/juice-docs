#!/usr/bin/env node

/**
 * MCP Server for Juicebox Documentation
 * 
 * Provides AI assistants with structured access to Juicebox documentation
 * through the Model Context Protocol.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
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

// Load or build index
let docIndex = [];
let codeExamples = [];
let sdkReference = null;
let contractAddresses = null;
let integrationPatterns = null;

async function loadIndex() {
  try {
    const indexData = await fs.readFile(INDEX_FILE, "utf-8");
    docIndex = JSON.parse(indexData);
    console.error(`Loaded ${docIndex.length} documents from index`);
  } catch (error) {
    console.error("Index not found, building new index...");
    await buildIndex();
  }

  // Load code examples index
  try {
    const codeData = await fs.readFile(CODE_EXAMPLES_FILE, "utf-8");
    codeExamples = JSON.parse(codeData);
    console.error(`Loaded ${codeExamples.length} code examples`);
  } catch (error) {
    console.error("Code examples index not found");
    codeExamples = [];
  }

  // Load SDK reference
  try {
    const sdkData = await fs.readFile(SDK_REFERENCE_FILE, "utf-8");
    sdkReference = JSON.parse(sdkData);
    console.error("Loaded SDK reference");
  } catch (error) {
    console.error("SDK reference not found");
    sdkReference = null;
  }

  // Load contract addresses
  try {
    const addressData = await fs.readFile(CONTRACT_ADDRESSES_FILE, "utf-8");
    contractAddresses = JSON.parse(addressData);
    console.error("Loaded contract addresses");
  } catch (error) {
    console.error("Contract addresses not found");
    contractAddresses = null;
  }

  // Load integration patterns
  try {
    const patternsData = await fs.readFile(INTEGRATION_PATTERNS_FILE, "utf-8");
    integrationPatterns = JSON.parse(patternsData);
    console.error(`Loaded ${integrationPatterns.patterns.length} integration patterns`);
  } catch (error) {
    console.error("Integration patterns not found");
    integrationPatterns = null;
  }
}

async function buildIndex() {
  console.error("Building documentation index...");
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
          
          // Extract text content
          const textContent = removeMarkdown(body);
          
          // Extract headings
          const headings = [];
          const headingRegex = /^#{1,6}\s+(.+)$/gm;
          let match;
          while ((match = headingRegex.exec(body)) !== null) {
            headings.push(match[1].trim());
          }
          
          // Determine category from path
          let category = "general";
          if (relativePath.startsWith("dev/")) category = "developer";
          else if (relativePath.startsWith("user/")) category = "user";
          else if (relativePath.startsWith("dao/")) category = "dao";
          else if (relativePath.startsWith("ecosystem/")) category = "ecosystem";
          
          // Extract version if present
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
  
  // Save index
  await fs.writeFile(INDEX_FILE, JSON.stringify(docIndex, null, 2));
  console.error(`Indexed ${docIndex.length} documents`);
}

// Initialize Fuse.js for fuzzy search
let fuse = null;

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

// Create MCP server
const server = new Server(
  {
    name: "juice-docs-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available resources (all docs)
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: docIndex.map((doc) => ({
      uri: `juice-docs://${doc.path}`,
      name: doc.title,
      description: doc.description,
      mimeType: "text/markdown",
    })),
  };
});

// Read a specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const docPath = uri.replace("juice-docs://", "");
  
  const doc = docIndex.find((d) => d.path === docPath);
  if (!doc) {
    throw new Error(`Document not found: ${docPath}`);
  }
  
  const content = await fs.readFile(doc.fullPath, "utf-8");
  
  return {
    contents: [
      {
        uri: uri,
        mimeType: "text/markdown",
        text: content,
      },
    ],
  };
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_docs",
        description:
          "Search Juicebox documentation by keyword or phrase. Returns relevant documentation pages with titles, descriptions, and URLs.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query - can be keywords, phrases, or questions",
            },
            category: {
              type: "string",
              enum: ["developer", "user", "dao", "ecosystem", "all"],
              description: "Filter by documentation category",
              default: "all",
            },
            version: {
              type: "string",
              enum: ["v3", "v4", "v5", "all"],
              description: "Filter by protocol version. Defaults to v5 (latest) for new developers.",
              default: "v5",
            },
            limit: {
              type: "number",
              description: "Maximum number of results to return",
              default: 10,
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_doc",
        description:
          "Retrieve a specific documentation page by its path or title. Returns the full markdown content.",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Document path (e.g., 'dev/v5/learn/overview.md') or title",
            },
          },
          required: ["path"],
        },
      },
      {
        name: "list_docs_by_category",
        description:
          "List all documentation pages in a specific category (developer, user, dao, ecosystem).",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: ["developer", "user", "dao", "ecosystem"],
              description: "Documentation category",
            },
            version: {
              type: "string",
              enum: ["v3", "v4", "v5", "all"],
              description: "Filter by protocol version. Defaults to v5 (latest) for new developers.",
              default: "v5",
            },
          },
          required: ["category"],
        },
      },
      {
        name: "get_doc_structure",
        description:
          "Get the hierarchical structure of the documentation, organized by category and version.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "search_code_examples",
        description:
          "Search for code examples by language, category, or keyword. Returns code snippets from documentation with context.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query - keywords or phrases to find in code examples",
            },
            language: {
              type: "string",
              enum: ["solidity", "typescript", "javascript", "json", "graphql", "bash", "all"],
              description: "Filter by programming language",
              default: "all",
            },
            category: {
              type: "string",
              enum: ["contract", "sdk-react", "web3", "api", "config", "cli", "graphql", "all"],
              description: "Filter by code category",
              default: "all",
            },
            limit: {
              type: "number",
              description: "Maximum number of results to return",
              default: 10,
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_contract_addresses",
        description:
          "Get Juicebox contract addresses for a specific contract or chain. Returns addresses with explorer links.",
        inputSchema: {
          type: "object",
          properties: {
            contract: {
              type: "string",
              description: "Contract name (e.g., 'JBController', 'JBMultiTerminal', 'REVDeployer'). Leave empty for all contracts.",
            },
            chainId: {
              type: "string",
              enum: ["1", "10", "42161", "8453", "11155111", "11155420", "421614", "84532", "all"],
              description: "Chain ID to get address for. Use 'all' for all chains.",
              default: "all",
            },
            category: {
              type: "string",
              enum: ["core", "revnet", "hooks", "suckers", "omnichain", "croptop", "all"],
              description: "Contract category",
              default: "all",
            },
          },
        },
      },
      {
        name: "get_sdk_reference",
        description:
          "Get SDK reference for juice-sdk-react hooks, juice-sdk-core utilities, or revnet-sdk functions.",
        inputSchema: {
          type: "object",
          properties: {
            package: {
              type: "string",
              enum: ["juice-sdk-react", "juice-sdk-core", "revnet-sdk", "all"],
              description: "SDK package to get reference for",
              default: "all",
            },
            hookOrUtility: {
              type: "string",
              description: "Specific hook or utility name (e.g., 'useJBProjectProvider', 'getTokenAToBQuote')",
            },
            category: {
              type: "string",
              enum: ["context", "read", "write", "omnichain", "utility", "math", "formatting", "parsing", "constants", "abi", "deploy", "all"],
              description: "Filter by category",
              default: "all",
            },
          },
        },
      },
      {
        name: "get_integration_patterns",
        description:
          "Get common integration patterns for building Juicebox applications. Includes code templates and recommended approaches.",
        inputSchema: {
          type: "object",
          properties: {
            pattern: {
              type: "string",
              description: "Specific pattern ID (e.g., 'wagmi-setup', 'pay-project', 'cash-out-tokens')",
            },
            category: {
              type: "string",
              enum: ["setup", "payments", "calculations", "components", "data", "deployment", "omnichain", "utilities", "all"],
              description: "Filter patterns by category",
              default: "all",
            },
            projectType: {
              type: "string",
              enum: ["crowdfunding", "revnet", "dao-treasury", "subscription"],
              description: "Get patterns recommended for a specific project type",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Filter by tags (e.g., ['wallet', 'payment', 'tokens'])",
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "search_docs": {
        const { query, category = "all", version = "v5", limit = 10 } = args;

        if (!fuse) {
          initializeSearch();
        }

        // Detect query intent
        const queryLower = query.toLowerCase();
        const isAPIQuery = /\b(api|interface|contract|function|method|struct|enum|event|abi|specification|spec)\b/i.test(query) ||
                           /\b(ICT|CT|JB|REV)[A-Z]/.test(query); // Contract/interface names
        const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|hook|example|tutorial|how to|getting started)\b/i.test(query);

        // Check if explicitly requesting old versions
        const wantsOldVersion = /\b(v3|v4)\b/i.test(query) || queryLower.includes("v3") || queryLower.includes("v4");

        // Default to v5 unless explicitly requesting older versions or "all"
        let effectiveVersion = version;
        if (version === "all" && !wantsOldVersion) {
          effectiveVersion = "v5"; // Always prioritize v5 for new developers
        }
        
        // Filter by category and version
        let filteredIndex = docIndex;
        if (category !== "all") {
          filteredIndex = filteredIndex.filter((d) => d.category === category);
        }
        if (effectiveVersion !== "all") {
          filteredIndex = filteredIndex.filter((d) => d.version === effectiveVersion);
        }
        
        // Boost integrator-relevant content in search
        const filteredFuse = new Fuse(filteredIndex, {
          keys: [
            { name: "title", weight: 0.35 },
            { name: "description", weight: 0.25 },
            { name: "content", weight: 0.15 },
            { name: "headings", weight: 0.1 },
            { name: "tags", weight: 0.15 }, // Boost tagged content
          ],
          threshold: 0.4,
          includeScore: true,
          getFn: (obj, path) => {
            if (path === "tags") return obj.tags?.join(" ") || "";
            return Fuse.config.getFn(obj, path);
          },
        });
        
        let results = filteredFuse.search(query, { limit: parseInt(limit) * 3 }); // Get more, then re-rank
        
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
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
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
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "get_doc": {
        const { path: docPath } = args;
        
        // Try to find by path first
        let doc = docIndex.find(
          (d) => d.path === docPath || d.path.endsWith(docPath)
        );
        
        // If not found, try by title
        if (!doc) {
          doc = docIndex.find(
            (d) =>
              d.title.toLowerCase().includes(docPath.toLowerCase()) ||
              docPath.toLowerCase().includes(d.title.toLowerCase())
          );
        }
        
        if (!doc) {
          return {
            content: [
              {
                type: "text",
                text: `Document not found: ${docPath}`,
              },
            ],
            isError: true,
          };
        }
        
        const content = await fs.readFile(doc.fullPath, "utf-8");
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
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
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "list_docs_by_category": {
        const { category, version = "all" } = args;
        
        let filtered = docIndex.filter((d) => d.category === category);
        
        if (version !== "all") {
          filtered = filtered.filter((d) => d.version === version);
        }
        
        // Sort by sidebar position, then by title
        filtered.sort((a, b) => {
          if (a.sidebarPosition !== b.sidebarPosition) {
            return a.sidebarPosition - b.sidebarPosition;
          }
          return a.title.localeCompare(b.title);
        });
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
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
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "get_doc_structure": {
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(structure, null, 2),
            },
          ],
        };
      }

      case "search_code_examples": {
        const { query, language = "all", category = "all", limit = 10 } = args;

        if (!codeExamples || codeExamples.length === 0) {
          return {
            content: [{ type: "text", text: "Code examples index not available. Run build-index to generate." }],
            isError: true,
          };
        }

        let filtered = codeExamples;

        if (language !== "all") {
          filtered = filtered.filter((ex) => ex.language === language || ex.language === "ts" && language === "typescript" || ex.language === "js" && language === "javascript");
        }

        if (category !== "all") {
          filtered = filtered.filter((ex) => ex.category === category);
        }

        // Search in code and context
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                query,
                language,
                category,
                results,
                total: results.length,
              }, null, 2),
            },
          ],
        };
      }

      case "get_contract_addresses": {
        const { contract, chainId = "all", category = "all" } = args;

        if (!contractAddresses) {
          return {
            content: [{ type: "text", text: "Contract addresses not available." }],
            isError: true,
          };
        }

        let results = {};

        // Get contracts from specified category or all categories
        const categories = category === "all"
          ? Object.keys(contractAddresses.contracts)
          : [category];

        for (const cat of categories) {
          const catContracts = contractAddresses.contracts[cat];
          if (!catContracts) continue;

          for (const [name, data] of Object.entries(catContracts)) {
            // Filter by contract name if specified
            if (contract && !name.toLowerCase().includes(contract.toLowerCase())) {
              continue;
            }

            const contractInfo = {
              category: cat,
              description: data.description,
              docs: data.docs,
            };

            // Handle contracts with per-chain addresses
            if (data.addresses) {
              if (chainId === "all") {
                contractInfo.addresses = data.addresses;
              } else {
                contractInfo.address = data.addresses[chainId];
              }
            } else if (data.address) {
              // Same address across all chains
              contractInfo.address = data.address;
              if (data.note) contractInfo.note = data.note;
            }

            results[name] = contractInfo;
          }
        }

        // Add chain info
        const response = {
          chains: contractAddresses.chains,
          contracts: results,
          notes: contractAddresses.notes,
          constants: contractAddresses.constants,
        };

        if (chainId !== "all") {
          response.selectedChain = contractAddresses.chains[chainId];
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      }

      case "get_sdk_reference": {
        const { package: pkg = "all", hookOrUtility, category = "all" } = args;

        if (!sdkReference) {
          return {
            content: [{ type: "text", text: "SDK reference not available." }],
            isError: true,
          };
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

          // Get hooks if available
          if (pkgData.hooks) {
            let hooks = pkgData.hooks;

            if (hookOrUtility) {
              hooks = hooks.filter((h) =>
                h.name.toLowerCase().includes(hookOrUtility.toLowerCase())
              );
            }

            if (category !== "all") {
              hooks = hooks.filter((h) => h.category === category);
            }

            if (hooks.length > 0) {
              pkgResult.hooks = hooks;
            }
          }

          // Get utilities if available
          if (pkgData.utilities) {
            let utilities = pkgData.utilities;

            if (hookOrUtility) {
              utilities = utilities.filter((u) =>
                u.name.toLowerCase().includes(hookOrUtility.toLowerCase())
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

        // Include common patterns if searching for a specific hook
        let commonPatterns = [];
        if (hookOrUtility && sdkReference.commonPatterns) {
          commonPatterns = sdkReference.commonPatterns.filter((p) =>
            p.relatedHooks?.some((h) =>
              h.toLowerCase().includes(hookOrUtility.toLowerCase())
            )
          );
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                packages: results,
                commonPatterns: commonPatterns.length > 0 ? commonPatterns : undefined,
              }, null, 2),
            },
          ],
        };
      }

      case "get_integration_patterns": {
        const { pattern, category = "all", projectType, tags } = args;

        if (!integrationPatterns) {
          return {
            content: [{ type: "text", text: "Integration patterns not available." }],
            isError: true,
          };
        }

        let patterns = integrationPatterns.patterns;

        // Filter by specific pattern ID
        if (pattern) {
          patterns = patterns.filter((p) =>
            p.id === pattern || p.id.includes(pattern) || p.name.toLowerCase().includes(pattern.toLowerCase())
          );
        }

        // Filter by category
        if (category !== "all") {
          patterns = patterns.filter((p) => p.category === category);
        }

        // Filter by tags
        if (tags && tags.length > 0) {
          patterns = patterns.filter((p) =>
            tags.some((tag) => p.tags?.includes(tag.toLowerCase()))
          );
        }

        // Get patterns recommended for a project type
        let projectTypeInfo = null;
        if (projectType) {
          projectTypeInfo = integrationPatterns.projectTypes.find(
            (pt) => pt.id === projectType
          );

          if (projectTypeInfo) {
            // Filter to only recommended patterns
            patterns = patterns.filter((p) =>
              projectTypeInfo.recommendedPatterns.includes(p.id)
            );
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
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
                total: patterns.length,
              }, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  await loadIndex();
  initializeSearch();
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("Juicebox Docs MCP Server running on stdio");
}

main().catch(console.error);
