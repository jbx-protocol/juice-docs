# Juicebox Docs MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that provides AI assistants with structured access to Juicebox documentation.

## Quick Start

### HTTP API (Recommended)

The MCP server is available as an HTTP API at **`https://docs.juicebox.money/api/mcp`**

```bash
# Search docs
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "deploy project", "category": "developer", "limit": 5}'

# Get document
curl -X POST https://docs.juicebox.money/api/mcp/get-doc \
  -H "Content-Type: application/json" \
  -d '{"path": "dev/v5/learn/overview.md"}'
```

**JavaScript:**
```javascript
const response = await fetch('https://docs.juicebox.money/api/mcp/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'deploy project', category: 'developer' })
});
const data = await response.json();
```

## Installation (Local Stdio MCP)

For local development with Claude Desktop:

```bash
# From repo root
npm run mcp:install
npm run mcp:build-index
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/mcp/search` | Search docs (query, category, version, limit) |
| `POST` | `/api/mcp/get-doc` | Get full document by path or title |
| `GET` | `/api/mcp/list-docs?category=developer&version=v5` | List docs in category |
| `GET` | `/api/mcp/structure` | Get documentation structure/stats |

**Parameters:**
- `query` (string, required for search): Search terms
- `category`: `developer` | `user` | `dao` | `ecosystem` | `all`
- `version`: `v3` | `v4` | `v5` | `all`
- `limit` (number): Max results (default: 10)
- `path` (string, required for get-doc): Document path or title

## MCP Tools (Stdio Server)

When using the local stdio MCP server:

- `search_docs` - Search documentation by keyword or phrase
- `get_doc` - Retrieve a specific documentation page
- `list_docs_by_category` - List all docs in a category
- `get_doc_structure` - Get the complete documentation structure

## Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "juice-docs": {
      "command": "node",
      "args": ["/path/to/juice-docs-v3/mcp-server/src/index.js"],
      "cwd": "/path/to/juice-docs-v3"
    }
  }
}
```

**Important:** Use absolute paths. Restart Claude Desktop after configuration.

## Features

- **Semantic Search**: Fuzzy search across all documentation
- **Category Filtering**: Filter by developer, user, dao, or ecosystem docs
- **Version Filtering**: Filter by protocol version (v3, v4, v5)
- **Full Document Retrieval**: Get complete markdown content with metadata
- **Always Up-to-Date**: Index automatically rebuilds when docs change

## Development

```bash
# Build index manually
npm run build-index

# Run stdio server
npm start

# Watch mode (auto-restart)
npm run dev

# Run HTTP server locally
npm run start:http
```

## Troubleshooting

**Index not found:** Run `npm run mcp:build-index` from repo root

**Cannot find module:** Run `npm run mcp:install` from repo root

**Claude Desktop not connecting:**
- Use absolute paths in config
- Verify Node.js 24+ is installed
- Check Claude Desktop logs

**HTTP API not responding:**
- Verify deployment at `https://docs.juicebox.money/api/mcp/`
- Check that index file exists: `mcp-server/src/docs-index.json`
- Check Vercel function logs

## More Information

- [MCP Specification](https://modelcontextprotocol.io)
- [Documentation Guide](/docs/dev/v5/build/mcp-server.md)
