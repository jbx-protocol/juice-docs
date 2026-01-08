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

// Load or build index
let docIndex = [];

async function loadIndex() {
  try {
    const indexData = await fs.readFile(INDEX_FILE, "utf-8");
    docIndex = JSON.parse(indexData);
    console.error(`Loaded ${docIndex.length} documents from index`);
  } catch (error) {
    console.error("Index not found, building new index...");
    await buildIndex();
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
          let integratorRelevance = 0;
          if (relativePath.startsWith("dev/v5/build/")) integratorRelevance = 10;
          else if (relativePath.startsWith("dev/v5/api/")) integratorRelevance = 8;
          else if (relativePath.startsWith("dev/v5/build/examples/")) integratorRelevance = 9;
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
              description: "Filter by protocol version",
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
              description: "Filter by protocol version",
              default: "all",
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
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "search_docs": {
        const { query, category = "all", version = "all", limit = 10 } = args;
        
        if (!fuse) {
          initializeSearch();
        }
        
        // Detect query intent for building/integration queries
        const queryLower = query.toLowerCase();
        const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|api|contract|hook|example|tutorial|how to|getting started)\b/i.test(query);
        const isV5Query = /\bv5\b/i.test(query) || queryLower.includes("v5");
        
        // Auto-filter to v5 for building queries if version not specified
        let effectiveVersion = version;
        if (version === "all" && isBuildingQuery && !isV5Query) {
          effectiveVersion = "v5";
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
        
        let results = filteredFuse.search(query, { limit: parseInt(limit) * 2 }); // Get more, then re-rank
        
        // Re-rank by integrator relevance for building queries
        if (isBuildingQuery) {
          results = results.map(r => ({
            ...r,
            score: r.score - (r.item.integratorRelevance || 0) * 0.1 // Boost integrator-relevant docs
          })).sort((a, b) => a.score - b.score).slice(0, parseInt(limit));
        } else {
          results = results.slice(0, parseInt(limit));
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
