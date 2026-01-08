# How to Reference Juicebox Docs MCP Server from Another Repo

Since your docs are hosted at `docs.juicebox.money` and pushed to `main`, here are the ways to reference the MCP server from another machine or repository:

## 🚀 Option 1: HTTP API (Recommended)

**Use the live API at:** `https://docs.juicebox.money/api/mcp`

This is the easiest option - no setup required, works from anywhere!

### Example Usage

**JavaScript:**
```javascript
const response = await fetch('https://docs.juicebox.money/api/mcp/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'how to deploy a project',
    category: 'developer',
    version: 'v5'
  })
});
const data = await response.json();
```

**Python:**
```python
import requests

response = requests.post(
    'https://docs.juicebox.money/api/mcp/search',
    json={'query': 'deploy project', 'category': 'developer'}
)
data = response.json()
```

**cURL:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "deploy project", "category": "developer"}'
```

### Available Endpoints

- `POST /api/mcp/search` - Search documentation
- `POST /api/mcp/get-doc` - Get a specific document
- `GET /api/mcp/list-docs?category=developer&version=v5` - List docs by category
- `GET /api/mcp/structure` - Get documentation structure
- `GET /api/mcp/` - Health check and API info

See [REMOTE_ACCESS.md](./REMOTE_ACCESS.md) for full API documentation.

## 📦 Option 2: Clone from GitHub

If you need the stdio MCP server (for Claude Desktop, etc.):

```bash
# Clone the repo
git clone https://github.com/jbx-protocol/juice-docs-v3.git
cd juice-docs-v3

# Install dependencies
npm run mcp:install

# Build the index (or use the committed one)
npm run mcp:build-index

# Run the MCP server
cd mcp-server
node src/index.js
```

Then configure your MCP client to point to the local server.

## 🔧 Option 3: Reference in MCP Config (Remote Machine)

If you want to use the stdio MCP server on a remote machine:

1. **Clone the repo on that machine**
2. **Install and build:**
   ```bash
   npm run mcp:install
   npm run mcp:build-index
   ```

3. **Configure your MCP client** (e.g., Claude Desktop):
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

## 🐳 Option 4: Docker (Future)

You could containerize the MCP server for easy deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci
COPY . .
RUN cd mcp-server && npm run build-index
CMD ["node", "mcp-server/src/index.js"]
```

## 📝 Summary

| Method | Best For | Setup Required |
|--------|----------|----------------|
| **HTTP API** | Remote access, scripts, CI/CD | None - just use the URL |
| **Clone Repo** | Local development, custom setup | Clone + npm install |
| **MCP Config** | AI assistants (Claude Desktop) | Clone + configure |
| **Docker** | Containerized deployments | Build image |

## 🎯 Recommendation

**For most use cases, use the HTTP API** at `https://docs.juicebox.money/api/mcp` - it's:
- ✅ Always up-to-date (auto-deployed with docs)
- ✅ No setup required
- ✅ Works from any machine/language
- ✅ Fast and reliable (Vercel CDN)

The index is automatically rebuilt when docs change, so the API always has the latest content!

## 🔗 Quick Links

- **API Base URL:** `https://docs.juicebox.money/api/mcp`
- **GitHub Repo:** `https://github.com/jbx-protocol/juice-docs-v3`
- **Full API Docs:** [REMOTE_ACCESS.md](./REMOTE_ACCESS.md)
- **Local Setup:** [SETUP.md](./SETUP.md)
