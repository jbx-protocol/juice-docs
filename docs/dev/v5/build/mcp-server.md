---
sidebar_position: 10
---

# MCP Server for Documentation

The Juicebox documentation is available through an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server, making it easy for AI assistants and automated tools to search and retrieve documentation.

## Quick Start

### HTTP API (Recommended)

The MCP server is available as an HTTP API at:

**`https://docs.juicebox.money/api/mcp`**

#### Search Documentation

```bash
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "how to deploy a project",
    "category": "developer",
    "version": "v5",
    "limit": 10
  }'
```

#### Get a Specific Document

```bash
curl -X POST https://docs.juicebox.money/api/mcp/get-doc \
  -H "Content-Type: application/json" \
  -d '{"path": "dev/v5/learn/overview.md"}'
```

#### List Documents by Category

```bash
curl "https://docs.juicebox.money/api/mcp/list-docs?category=developer&version=v5"
```

#### Get Documentation Structure

```bash
curl "https://docs.juicebox.money/api/mcp/structure"
```

## Using in Code

### JavaScript/TypeScript

```javascript
// Search documentation
const response = await fetch('https://docs.juicebox.money/api/mcp/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'how to deploy a project',
    category: 'developer',
    version: 'v5',
    limit: 5
  })
});

const data = await response.json();
console.log(data.results);
```

### Python

```python
import requests

response = requests.post(
    'https://docs.juicebox.money/api/mcp/search',
    json={
        'query': 'how to deploy a project',
        'category': 'developer',
        'version': 'v5',
        'limit': 5
    }
)

data = response.json()
print(data['results'])
```

## API Reference

### POST `/api/mcp/search`

Search across all documentation with fuzzy matching.

**Request Body:**
```json
{
  "query": "search terms",
  "category": "developer" | "user" | "dao" | "ecosystem" | "all",
  "version": "v3" | "v4" | "v5" | "all",
  "limit": 10
}
```

**Response:**
```json
{
  "query": "search terms",
  "results": [
    {
      "title": "Document Title",
      "path": "dev/v5/learn/overview.md",
      "description": "Document description...",
      "url": "https://docs.juicebox.money/dev/v5/learn/overview",
      "category": "developer",
      "version": "v5",
      "score": 0.123,
      "headings": ["Heading 1", "Heading 2"]
    }
  ],
  "total": 5
}
```

### POST `/api/mcp/get-doc`

Retrieve a specific documentation page by path or title.

**Request Body:**
```json
{
  "path": "dev/v5/learn/overview.md"
}
```

**Response:**
```json
{
  "title": "Overview",
  "path": "dev/v5/learn/overview.md",
  "url": "https://docs.juicebox.money/dev/v5/learn/overview",
  "category": "developer",
  "version": "v5",
  "content": "# Full markdown content...",
  "metadata": {
    "headings": ["Overview", "Deploy a project"],
    "description": "Document description..."
  }
}
```

### GET `/api/mcp/list-docs`

List all documents in a category.

**Query Parameters:**
- `category` (required): `developer` | `user` | `dao` | `ecosystem`
- `version` (optional): `v3` | `v4` | `v5` | `all`

**Response:**
```json
{
  "category": "developer",
  "version": "v5",
  "documents": [
    {
      "title": "Document Title",
      "path": "dev/v5/learn/overview.md",
      "description": "Description...",
      "url": "https://docs.juicebox.money/dev/v5/learn/overview",
      "version": "v5"
    }
  ],
  "total": 298
}
```

### GET `/api/mcp/structure`

Get the complete documentation structure.

**Response:**
```json
{
  "categories": {
    "developer": {
      "total": 1608,
      "versions": {
        "v3": 517,
        "v4": 297,
        "v5": 298
      }
    },
    "user": {
      "total": 24,
      "versions": {}
    }
  },
  "versions": ["v3", "v4", "v5"],
  "totalDocuments": 1648
}
```

## Using with Claude Desktop

For local development with Claude Desktop, you can use the stdio MCP server:

1. Clone the repository:
   ```bash
   git clone https://github.com/jbx-protocol/juice-docs-v3.git
   cd juice-docs-v3
   ```

2. Install and build:
   ```bash
   npm run mcp:install
   npm run mcp:build-index
   ```

3. Configure Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):
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

## Features

- **Semantic Search**: Fuzzy search across all documentation
- **Category Filtering**: Filter by developer, user, dao, or ecosystem docs
- **Version Filtering**: Filter by protocol version (v3, v4, v5)
- **Full Document Retrieval**: Get complete markdown content with metadata
- **Always Up-to-Date**: Index automatically rebuilds when docs change

## Use Cases

- **AI Assistants**: Enable AI tools to search and understand Juicebox documentation
- **Documentation Bots**: Build bots that answer questions using the docs
- **CI/CD Integration**: Automatically check documentation in your workflows
- **Developer Tools**: Integrate docs into your development environment
- **Learning Tools**: Build interactive learning experiences

## More Information

- [MCP Server Documentation](/MCP_SERVER.md) - Full setup guide
- [Remote Access Guide](https://github.com/jbx-protocol/juice-docs-v3/blob/main/mcp-server/REMOTE_ACCESS.md) - Detailed API documentation
- [MCP Specification](https://modelcontextprotocol.io) - Learn about the Model Context Protocol
