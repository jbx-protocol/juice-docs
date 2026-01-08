# Setting Up the Juicebox Docs MCP Server

This guide will help you set up the MCP server to make your documentation accessible to AI assistants.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run mcp:install
   ```

2. **Build the index:**
   ```bash
   npm run mcp:build-index
   ```

3. **Test the server:**
   ```bash
   cd mcp-server
   npm start
   ```

## Using with Claude Desktop

1. **Find your Claude Desktop config file:**
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. **Add the MCP server configuration:**
   ```json
   {
     "mcpServers": {
       "juice-docs": {
         "command": "node",
         "args": [
           "/absolute/path/to/juice-docs/mcp-server/src/index.js"
         ],
         "cwd": "/absolute/path/to/juice-docs"
       }
     }
   }
   ```
   
   **Important:** Replace `/absolute/path/to/juice-docs` with the actual absolute path to your repository.

3. **Restart Claude Desktop**

4. **Verify it's working:** In Claude Desktop, you should see "juice-docs" in the available MCP servers.

## Using with Other AI Assistants

The MCP server uses stdio transport, which is the standard for MCP. Most MCP-compatible AI assistants should work. Check your assistant's documentation for how to configure MCP servers.

## Deployment Options

### Option 1: Local Development (Recommended for Testing)

Run the server locally and connect AI assistants to it. This is the simplest setup.

### Option 2: Deploy as Standalone Service

You can deploy the MCP server as a standalone service. However, note that MCP typically uses stdio, so you'd need to:
- Use a process manager (PM2, systemd, etc.)
- Or add HTTP transport support (requires modifying the server)

### Option 3: Vercel Serverless Function

For Vercel deployment, you could:
1. Add the MCP server as a serverless function
2. Build the index during deployment
3. Serve via HTTP (requires HTTP transport implementation)

**Note:** The current implementation uses stdio transport, which is standard for MCP. HTTP transport would require additional development.

## Keeping the Index Updated

The index is automatically rebuilt when:
- The server starts and no index exists
- You run `npm run mcp:build-index`

For production, consider:
- Building the index in CI/CD (see `.github/workflows/build-mcp-index.yml`)
- Committing the index to the repository
- Or rebuilding on each deployment

## Troubleshooting

### "Index not found" error
Run `npm run mcp:build-index` to build the index.

### "Cannot find module" error
Make sure you've run `npm run mcp:install` in the root directory.

### Claude Desktop not connecting
- Check that the path in your config is absolute (not relative)
- Verify the path exists and the file is executable
- Check Claude Desktop logs for errors
- Make sure Node.js 18+ is installed

### Search not working well
- The index uses fuzzy search with Fuse.js
- Try more specific queries
- Use category/version filters to narrow results

## Next Steps

- Read the [main README](./README.md) for API documentation
- Check out the [MCP specification](https://modelcontextprotocol.io)
- Customize the search weights in `src/index.js` if needed
