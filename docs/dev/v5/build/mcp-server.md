---
sidebar_position: 10
---

# MCP Server for Documentation

The Juicebox documentation is available through an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server, making it easy for AI assistants and automated tools to search and retrieve documentation.

## HTTP API

The MCP server is available as an HTTP API at **`https://docs.juicebox.money/api/mcp`**

### Quick Examples

**Search:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "deploy project", "category": "developer", "limit": 5}'
```

**Get document:**
```bash
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

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/mcp/search` | Search docs by query, category, version |
| `POST` | `/api/mcp/get-doc` | Get full document by path or title |
| `GET` | `/api/mcp/list-docs?category=developer&version=v5` | List all docs in a category |
| `GET` | `/api/mcp/structure` | Get documentation structure/stats |

**Parameters:**
- `query` (string, required for search): Search terms
- `category` (string): `developer` | `user` | `dao` | `ecosystem` | `all`
- `version` (string): `v3` | `v4` | `v5` | `all`
- `limit` (number): Max results (default: 10)
- `path` (string, required for get-doc): Document path or title

## Using with Claude Desktop

For local stdio MCP server:

1. Clone repo and install: `npm run mcp:install && npm run mcp:build-index`
2. Configure Claude Desktop:
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

## More Information

- [MCP Server README](https://github.com/jbx-protocol/juice-docs-v3/blob/main/mcp-server/README.md) - Complete documentation
- [MCP Specification](https://modelcontextprotocol.io)
