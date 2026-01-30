/**
 * MCP Server over HTTP for Vercel
 *
 * This implements MCP protocol messages as standard HTTP request/response.
 * Compatible with MCP clients that support HTTP transport.
 *
 * Endpoints:
 * - GET /api/mcp-sse - Server info and capabilities
 * - POST /api/mcp-sse - Handle MCP JSON-RPC messages
 */

import fs from "fs/promises";
import path from "path";
import Fuse from "fuse.js";

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
  }
}

function initializeSearch() {
  if (docIndex.length === 0) return;
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
    getFn: (obj, p) => {
      if (p === "tags") return obj.tags?.join(" ") || "";
      return Fuse.config.getFn(obj, p);
    },
  });
}

async function ensureIndexLoaded() {
  if (!indexLoaded) {
    await loadIndex();
    indexLoaded = true;
  }
}

// MCP Tool definitions
const TOOLS = [
  {
    name: "search_docs",
    description: "Search Juicebox documentation by keyword or phrase. Returns relevant documentation pages with titles, descriptions, and URLs.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        category: { type: "string", enum: ["developer", "user", "dao", "ecosystem", "all"], default: "all" },
        version: { type: "string", enum: ["v3", "v4", "v5", "all"], default: "v5" },
        limit: { type: "number", default: 10 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_doc",
    description: "Retrieve a specific documentation page by its path or title. Returns the full content.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Document path (e.g., 'dev/v5/learn/overview.md') or title" },
      },
      required: ["path"],
    },
  },
  {
    name: "list_docs_by_category",
    description: "List all documentation pages in a specific category.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", enum: ["developer", "user", "dao", "ecosystem"] },
        version: { type: "string", enum: ["v3", "v4", "v5", "all"], default: "v5" },
      },
      required: ["category"],
    },
  },
  {
    name: "get_doc_structure",
    description: "Get the hierarchical structure of the documentation.",
    inputSchema: { type: "object", properties: {} },
  },
];

// Handle MCP tool calls
async function handleToolCall(name, args) {
  await ensureIndexLoaded();

  switch (name) {
    case "search_docs": {
      const { query, category = "all", version = "v5", limit = 10 } = args;

      let filteredIndex = docIndex;
      if (category !== "all") filteredIndex = filteredIndex.filter((d) => d.category === category);
      if (version !== "all") filteredIndex = filteredIndex.filter((d) => d.version === version);

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
        getFn: (obj, p) => {
          if (p === "tags") return obj.tags?.join(" ") || "";
          return Fuse.config.getFn(obj, p);
        },
      });

      const results = filteredFuse.search(query, { limit: parseInt(limit) });

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            query,
            results: results.map((r) => ({
              title: r.item.title,
              path: r.item.path,
              description: r.item.description,
              url: r.item.url,
              category: r.item.category,
              version: r.item.version,
              score: r.score,
              headings: r.item.headings?.slice(0, 5),
            })),
            total: results.length,
          }, null, 2),
        }],
      };
    }

    case "get_doc": {
      const { path: docPath } = args;

      let doc = docIndex.find((d) => d.path === docPath || d.path.endsWith(docPath));
      if (!doc) {
        doc = docIndex.find((d) =>
          d.title.toLowerCase().includes(docPath.toLowerCase()) ||
          docPath.toLowerCase().includes(d.title.toLowerCase())
        );
      }

      if (!doc) {
        return { content: [{ type: "text", text: `Document not found: ${docPath}` }], isError: true };
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            title: doc.title,
            path: doc.path,
            url: doc.url,
            category: doc.category,
            version: doc.version,
            content: doc.content,
            metadata: { headings: doc.headings, description: doc.description },
          }, null, 2),
        }],
      };
    }

    case "list_docs_by_category": {
      const { category, version = "all" } = args;

      let filtered = docIndex.filter((d) => d.category === category);
      if (version !== "all") filtered = filtered.filter((d) => d.version === version);

      filtered.sort((a, b) => (a.sidebarPosition || 999) - (b.sidebarPosition || 999) || a.title.localeCompare(b.title));

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
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
          }, null, 2),
        }],
      };
    }

    case "get_doc_structure": {
      const structure = { categories: {}, versions: ["v3", "v4", "v5"], totalDocuments: docIndex.length };

      for (const doc of docIndex) {
        if (!structure.categories[doc.category]) {
          structure.categories[doc.category] = { total: 0, versions: {} };
        }
        structure.categories[doc.category].total++;
        if (doc.version) {
          if (!structure.categories[doc.category].versions[doc.version]) {
            structure.categories[doc.category].versions[doc.version] = 0;
          }
          structure.categories[doc.category].versions[doc.version]++;
        }
      }

      return { content: [{ type: "text", text: JSON.stringify(structure, null, 2) }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// MCP JSON-RPC message handler
async function handleMCPMessage(message) {
  const { jsonrpc, id, method, params } = message;

  if (jsonrpc !== "2.0") {
    return { jsonrpc: "2.0", id, error: { code: -32600, message: "Invalid JSON-RPC version" } };
  }

  try {
    switch (method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: { name: "juice-docs-mcp-server", version: "1.0.0" },
          },
        };

      case "tools/list":
        return { jsonrpc: "2.0", id, result: { tools: TOOLS } };

      case "tools/call":
        const { name, arguments: args } = params;
        const result = await handleToolCall(name, args || {});
        return { jsonrpc: "2.0", id, result };

      case "ping":
        return { jsonrpc: "2.0", id, result: {} };

      default:
        return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
    }
  } catch (error) {
    return { jsonrpc: "2.0", id, error: { code: -32603, message: error.message } };
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await ensureIndexLoaded();

  // GET - Return server info
  if (req.method === "GET") {
    res.json({
      name: "juice-docs-mcp-server",
      version: "1.0.0",
      protocol: "mcp",
      protocolVersion: "2024-11-05",
      description: "MCP server for Juicebox V5 documentation",
      capabilities: { tools: {} },
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
      usage: {
        endpoint: "POST /api/mcp-sse",
        format: "JSON-RPC 2.0",
        example: {
          initialize: { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "client", version: "1.0.0" } } },
          listTools: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
          callTool: { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "search_docs", arguments: { query: "pay hook" } } },
        },
      },
    });
    return;
  }

  // POST - Handle MCP messages
  if (req.method === "POST") {
    try {
      const message = req.body;

      // Handle batch requests
      if (Array.isArray(message)) {
        const results = await Promise.all(message.map(handleMCPMessage));
        res.json(results);
        return;
      }

      // Handle single request
      const result = await handleMCPMessage(message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ jsonrpc: "2.0", id: null, error: { code: -32603, message: error.message } });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
