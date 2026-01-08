# Remote Access to Juicebox Docs MCP Server

This guide explains how to access the MCP server from another machine or repository.

## Option 1: HTTP API (Recommended for Remote Access)

The MCP server is available as an HTTP API at:

**Production:** `https://docs.juicebox.money/api/mcp`

### API Endpoints

#### Search Documentation
```bash
POST https://docs.juicebox.money/api/mcp/search
Content-Type: application/json

{
  "query": "how to deploy a project",
  "category": "developer",
  "version": "v5",
  "limit": 10
}
```

#### Get Document
```bash
POST https://docs.juicebox.money/api/mcp/get-doc
Content-Type: application/json

{
  "path": "dev/v5/learn/overview.md"
}
```

#### List Docs by Category
```bash
GET https://docs.juicebox.money/api/mcp/list-docs?category=developer&version=v5
```

#### Get Documentation Structure
```bash
GET https://docs.juicebox.money/api/mcp/structure
```

### Example Usage

**JavaScript/TypeScript:**
```javascript
// Search docs
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

**Python:**
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

**cURL:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "how to deploy a project",
    "category": "developer",
    "version": "v5",
    "limit": 5
  }'
```

## Option 2: Reference via GitHub (For Local MCP)

If you want to use the stdio MCP server from another machine, you can reference the GitHub repository:

### Using with Claude Desktop (Remote)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jbx-protocol/juice-docs-v3.git
   cd juice-docs-v3
   ```

2. **Install dependencies:**
   ```bash
   npm run mcp:install
   npm run mcp:build-index
   ```

3. **Configure Claude Desktop:**
   ```json
   {
     "mcpServers": {
       "juice-docs": {
         "command": "node",
         "args": [
           "/path/to/juice-docs-v3/mcp-server/src/index.js"
         ],
         "cwd": "/path/to/juice-docs-v3"
       }
     }
   }
   ```

### Using with Custom Scripts

You can also create a wrapper script that clones/updates the repo and runs the server:

```bash
#!/bin/bash
# juice-docs-mcp.sh

REPO_DIR="$HOME/.juice-docs-mcp"
REPO_URL="https://github.com/jbx-protocol/juice-docs-v3.git"

# Clone or update repo
if [ ! -d "$REPO_DIR" ]; then
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
git pull

# Install and build if needed
if [ ! -d "$REPO_DIR/mcp-server/node_modules" ]; then
  npm run mcp:install
fi

if [ ! -f "$REPO_DIR/mcp-server/src/docs-index.json" ]; then
  npm run mcp:build-index
fi

# Run the server
cd "$REPO_DIR/mcp-server"
node src/index.js
```

Then reference it in your MCP config:
```json
{
  "mcpServers": {
    "juice-docs": {
      "command": "/path/to/juice-docs-mcp.sh"
    }
  }
}
```

## Option 3: NPM Package (Future)

You could publish the MCP server as an npm package:

```bash
npm install -g @juicebox/docs-mcp-server
juice-docs-mcp-server
```

Then reference it:
```json
{
  "mcpServers": {
    "juice-docs": {
      "command": "juice-docs-mcp-server"
    }
  }
}
```

## Option 4: Docker Container

Create a Docker container for easy deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci
COPY . .
RUN cd mcp-server && npm run build-index
CMD ["node", "mcp-server/src/index.js"]
```

Then run:
```bash
docker run -it juice-docs-mcp
```

## Testing Remote Access

Test the HTTP API:

```bash
# Health check
curl https://docs.juicebox.money/api/mcp/

# Search
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "overview"}'

# Get structure
curl https://docs.juicebox.money/api/mcp/structure
```

## Troubleshooting

### HTTP API not responding
- Check that the Vercel deployment includes the `/api/mcp` route
- Verify the index file exists: `mcp-server/src/docs-index.json`
- Check Vercel function logs

### Local MCP not working
- Ensure Node.js 18+ is installed
- Run `npm run mcp:install` and `npm run mcp:build-index`
- Check file paths are absolute in your config

### Index out of date
The index is automatically rebuilt when docs change (via GitHub Actions). For manual updates:
```bash
npm run mcp:build-index
```

## Best Practices

1. **For remote access:** Use the HTTP API at `https://docs.juicebox.money/api/mcp`
2. **For local development:** Use the stdio MCP server
3. **For CI/CD:** Use the HTTP API or clone the repo
4. **For production AI assistants:** Use the HTTP API for reliability
