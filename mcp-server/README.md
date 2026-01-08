# Juicebox Docs MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that provides AI assistants with structured access to Juicebox documentation.

## Features

- **Semantic Search**: Search across all documentation with fuzzy matching
- **Structured Access**: Retrieve specific docs by path or title
- **Category Filtering**: Filter by developer, user, dao, or ecosystem docs
- **Version Filtering**: Filter by protocol version (v3, v4, v5)
- **Resource API**: Access docs as MCP resources for direct retrieval

## Installation

```bash
cd mcp-server
npm install
```

## Building the Index

Before using the server, build the documentation index:

```bash
npm run build-index
```

This will:
- Scan all markdown files in the `docs/` directory
- Extract metadata (title, description, headings, etc.)
- Build a searchable index saved to `src/docs-index.json`

The index is automatically rebuilt when the server starts if it doesn't exist.

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server communicates via stdio, which is the standard for MCP servers.

## MCP Tools

### `search_docs`

Search documentation by keyword or phrase.

**Parameters:**
- `query` (required): Search query
- `category` (optional): Filter by category (developer, user, dao, ecosystem, all)
- `version` (optional): Filter by version (v3, v4, v5, all)
- `limit` (optional): Max results (default: 10)

**Example:**
```json
{
  "query": "how to deploy a project",
  "category": "developer",
  "version": "v5",
  "limit": 5
}
```

### `get_doc`

Retrieve a specific documentation page.

**Parameters:**
- `path` (required): Document path or title

**Example:**
```json
{
  "path": "dev/v5/learn/overview.md"
}
```

### `list_docs_by_category`

List all docs in a category.

**Parameters:**
- `category` (required): Category name
- `version` (optional): Filter by version

**Example:**
```json
{
  "category": "developer",
  "version": "v5"
}
```

### `get_doc_structure`

Get the hierarchical structure of all documentation.

## MCP Resources

All documentation pages are available as MCP resources with the URI format:
```
juice-docs://{path}
```

For example:
```
juice-docs://dev/v5/learn/overview.md
```

## Configuration

To use this MCP server with an AI assistant (like Claude Desktop), add it to your MCP configuration:

```json
{
  "mcpServers": {
    "juice-docs": {
      "command": "node",
      "args": ["/path/to/juice-docs/mcp-server/src/index.js"],
      "cwd": "/path/to/juice-docs"
    }
  }
}
```

## Deployment

### Option 1: Deploy as Separate Service

You can deploy this as a standalone service that AI assistants can connect to:

1. Deploy to a server with Node.js
2. Build the index: `npm run build-index`
3. Run the server: `npm start`
4. Configure AI assistants to connect via stdio or HTTP (if you add HTTP transport)

### Option 2: Integrate with Vercel

Since your docs are on Vercel, you could:

1. Add this as a Vercel serverless function
2. Build the index during the build process
3. Serve the MCP server via API routes

### Option 3: GitHub Actions + Index as Artifact

1. Build the index in a GitHub Action
2. Store it as an artifact or commit it
3. Use it in the MCP server

## Development

The server automatically rebuilds the index if it's missing. For development, you can:

```bash
# Watch mode (auto-restart on changes)
npm run dev

# Build index manually
npm run build-index
```

## Index Structure

The index file (`src/docs-index.json`) contains an array of document objects:

```json
{
  "path": "dev/v5/learn/overview.md",
  "title": "Overview",
  "description": "The Juicebox protocol is...",
  "content": "Full text content...",
  "headings": ["Overview", "Deploy a project", ...],
  "category": "developer",
  "version": "v5",
  "url": "https://docs.juicebox.money/dev/v5/learn/overview"
}
```

## License

Same as the main Juicebox Docs repository.
