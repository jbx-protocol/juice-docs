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

let docIndex = [];
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
    version: "1.0.0",
    status: "running",
    totalDocs: docIndex.length,
    endpoints: [
      "GET /",
      "POST /mcp/search",
      "POST /mcp/get-doc",
      "GET /mcp/list-docs",
      "GET /mcp/structure",
    ],
  });
});

// Search endpoint
app.post("/mcp/search", async (req, res) => {
  try {
    const { query, category = "all", version = "all", limit = 10 } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: "query parameter is required" });
    }
    
    // Detect query intent
    const queryLower = query.toLowerCase();
    const isAPIQuery = /\b(api|interface|contract|function|method|struct|enum|event|abi|specification|spec)\b/i.test(query) || 
                       /\b(ICT|CT|JB|REV)[A-Z]/.test(query); // Contract/interface names
    const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|hook|example|tutorial|how to|getting started)\b/i.test(query);
    const isV5Query = /\bv5\b/i.test(query) || queryLower.includes("v5");
    
    // Auto-filter to v5 for building/API queries if version not specified
    let effectiveVersion = version;
    if (version === "all" && (isBuildingQuery || isAPIQuery) && !isV5Query) {
      effectiveVersion = "v5";
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
