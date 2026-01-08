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
    
    // Detect query intent for building/integration queries
    const queryLower = query.toLowerCase();
    const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|api|contract|hook|example|tutorial|how to|getting started)\b/i.test(query);
    const isV5Query = /\bv5\b/i.test(query) || queryLower.includes("v5");
    
    // Auto-filter to v5 for building queries if version not specified
    let effectiveVersion = version;
    if (version === "all" && isBuildingQuery && !isV5Query) {
      effectiveVersion = "v5";
    }
    
    let filteredIndex = docIndex;
    if (category !== "all") filteredIndex = filteredIndex.filter((d) => d.category === category);
    if (effectiveVersion !== "all") filteredIndex = filteredIndex.filter((d) => d.version === effectiveVersion);
    
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
    
    let results = filteredFuse.search(query, { limit: parseInt(limit) * 2 });
    
    // Re-rank by integrator relevance for building queries
    if (isBuildingQuery) {
      results = results.map(r => ({
        ...r,
        score: r.score - (r.item.integratorRelevance || 0) * 0.1
      })).sort((a, b) => a.score - b.score).slice(0, parseInt(limit));
    } else {
      results = results.slice(0, parseInt(limit));
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

export default app;
