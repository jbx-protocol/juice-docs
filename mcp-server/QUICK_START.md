# Quick Start: Remote Access

## From Another Machine/Repo

### Option 1: HTTP API (Easiest)

The MCP server is available at: **`https://docs.juicebox.money/api/mcp`**

**Search docs:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "deploy project", "category": "developer", "limit": 5}'
```

**Get a specific doc:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/get-doc \
  -H "Content-Type: application/json" \
  -d '{"path": "dev/v5/learn/overview.md"}'
```

**List all docs in a category:**
```bash
curl "https://docs.juicebox.money/api/mcp/list-docs?category=developer&version=v5"
```

**Get documentation structure:**
```bash
curl "https://docs.juicebox.money/api/mcp/structure"
```

### Option 2: Clone and Use Locally

```bash
# Clone the repo
git clone https://github.com/jbx-protocol/juice-docs-v3.git
cd juice-docs-v3

# Install and build
npm run mcp:install
npm run mcp:build-index

# Use with Claude Desktop or other MCP clients
# See mcp-server/SETUP.md for configuration
```

## Full Documentation

- [Remote Access Guide](./REMOTE_ACCESS.md) - Complete API reference
- [Setup Guide](./SETUP.md) - Local MCP setup
- [Main README](./README.md) - Full documentation
