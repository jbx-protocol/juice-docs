# MCP Server for Juicebox Documentation

Your Juicebox documentation is now AI-friendly! 🎉

## What is This?

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that makes your entire documentation accessible to AI assistants like Claude, allowing them to:

- Search across all your docs with semantic search
- Retrieve specific documentation pages
- Filter by category (developer, user, dao, ecosystem) and version (v3, v4, v5)
- Access docs as structured resources

## Quick Start

1. **Install MCP server dependencies:**
   ```bash
   npm run mcp:install
   ```

2. **Build the documentation index:**
   ```bash
   npm run mcp:build-index
   ```
   This scans all markdown files and creates a searchable index.

3. **Test the server:**
   ```bash
   cd mcp-server && npm start
   ```

## Using with Claude Desktop

1. Open your Claude Desktop config:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add this configuration (replace the path with your actual absolute path):
   ```json
   {
     "mcpServers": {
       "juice-docs": {
         "command": "node",
         "args": [
           "/Users/jango/Documents/jb/juice-docs/mcp-server/src/index.js"
         ],
         "cwd": "/Users/jango/Documents/jb/juice-docs"
       }
     }
   }
   ```

3. Restart Claude Desktop

4. You're done! Claude can now search and access your documentation.

## Features

### 🔍 Semantic Search
Search across all documentation with fuzzy matching:
- Search by keywords, phrases, or questions
- Filter by category and version
- Get ranked results with relevance scores

### 📄 Document Retrieval
Get full content of any documentation page:
- By path: `dev/v5/learn/overview.md`
- By title: `"Overview"`
- Returns full markdown with metadata

### 📚 Category Browsing
List all docs in a category:
- Developer docs
- User/Project Creator docs
- DAO docs
- Ecosystem docs

### 🏗️ Structure Overview
Get the complete documentation structure:
- See how many docs per category
- See version distribution
- Understand the documentation hierarchy

## How It Works

1. **Indexing**: The `build-index.js` script scans all `.md` files in `docs/`, extracts:
   - Title and description
   - Full text content
   - Headings hierarchy
   - Category and version
   - URL paths

2. **Search**: Uses [Fuse.js](https://fusejs.io) for fuzzy search across:
   - Titles (40% weight)
   - Descriptions (30% weight)
   - Content (20% weight)
   - Headings (10% weight)

3. **MCP Protocol**: Implements the Model Context Protocol standard:
   - Tools for search and retrieval
   - Resources for direct document access
   - Stdio transport (standard for MCP)

## Remote Access

### HTTP API (Recommended for Remote Access)

The MCP server is available as an HTTP API at:

**Production:** `https://docs.juicebox.money/api/mcp`

You can access it from any machine or repository:

```bash
# Search docs
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "how to deploy a project", "category": "developer"}'
```

See [Remote Access Guide](./mcp-server/REMOTE_ACCESS.md) for full API documentation and examples.

### Local MCP Server

For local development with Claude Desktop, use the stdio MCP server (see setup above).

## Deployment

### Automatic Index Updates

A GitHub Actions workflow (`.github/workflows/build-mcp-index.yml`) automatically rebuilds the index when docs change and commits it back to the repo.

### Vercel Integration

The MCP server is deployed alongside your Docusaurus site on Vercel:
- **HTTP API**: Available at `https://docs.juicebox.money/api/mcp`
- **Stdio MCP**: Available locally for AI assistants

## File Structure

```
mcp-server/
├── src/
│   ├── index.js          # Main MCP server
│   ├── build-index.js    # Index builder script
│   └── docs-index.json   # Generated index (gitignored)
├── package.json
├── README.md             # Detailed documentation
├── SETUP.md              # Setup guide
└── claude-desktop-config.json  # Example config
```

## Next Steps

1. **Build the index**: `npm run mcp:build-index`
2. **Configure Claude Desktop** (or your AI assistant)
3. **Test it out**: Ask Claude to search your docs!

## Documentation

- [MCP Server README](./mcp-server/README.md) - Full API documentation
- [Setup Guide](./mcp-server/SETUP.md) - Detailed setup instructions
- [MCP Specification](https://modelcontextprotocol.io) - Learn about MCP

## Support

If you run into issues:
1. Check the [Setup Guide](./mcp-server/SETUP.md) troubleshooting section
2. Make sure the index is built: `npm run mcp:build-index`
3. Verify your paths are absolute in the config file

---

**Your docs are now AI-ready!** 🤖✨
