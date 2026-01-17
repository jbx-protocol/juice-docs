# Juicebox Docs MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that provides AI assistants with structured access to Juicebox documentation, SDK references, contract addresses, code examples, and integration patterns.

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

# Get contract addresses
curl "https://docs.juicebox.money/api/mcp/contracts?contract=JBController"

# Get SDK reference
curl "https://docs.juicebox.money/api/mcp/sdk?package=juice-sdk-react&category=write"

# Get integration patterns for revnets
curl "https://docs.juicebox.money/api/mcp/patterns?projectType=revnet"

# Search code examples
curl -X POST https://docs.juicebox.money/api/mcp/search-code \
  -H "Content-Type: application/json" \
  -d '{"query": "pay", "language": "solidity", "limit": 5}'
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

### Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/mcp/search` | Search docs (query, category, version, limit) |
| `POST` | `/api/mcp/get-doc` | Get full document by path or title |
| `GET` | `/api/mcp/list-docs?category=developer&version=v5` | List docs in category |
| `GET` | `/api/mcp/structure` | Get documentation structure/stats |

### Code & Integration (New)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/mcp/search-code` | Search code examples by language/category |
| `GET` | `/api/mcp/contracts` | Get contract addresses by name/chain |
| `GET` | `/api/mcp/sdk` | Get SDK hook/utility reference |
| `GET` | `/api/mcp/patterns` | Get integration patterns by project type |

**Documentation Parameters:**
- `query` (string, required for search): Search terms
- `category`: `developer` | `user` | `dao` | `ecosystem` | `all`
- `version`: `v3` | `v4` | `v5` | `all`
- `limit` (number): Max results (default: 10)
- `path` (string, required for get-doc): Document path or title

**Code Search Parameters:**
- `query` (string, required): Code search terms
- `language`: `solidity` | `typescript` | `javascript` | `json` | `graphql` | `bash` | `all`
- `category`: `contract` | `sdk-react` | `web3` | `api` | `config` | `cli` | `graphql` | `all`

**Contract Address Parameters:**
- `contract`: Contract name (e.g., `JBController`, `REVDeployer`)
- `chainId`: `1` (mainnet) | `10` (optimism) | `8453` (base) | `42161` (arbitrum) | testnets | `all`
- `category`: `core` | `revnet` | `hooks` | `suckers` | `omnichain` | `croptop` | `all`

**SDK Reference Parameters:**
- `package`: `juice-sdk-react` | `juice-sdk-core` | `revnet-sdk` | `all`
- `hook`: Specific hook/utility name (e.g., `useJBProjectProvider`)
- `category`: `context` | `read` | `write` | `omnichain` | `math` | `formatting` | `all`

**Integration Patterns Parameters:**
- `pattern`: Pattern ID (e.g., `pay-project`, `wagmi-setup`)
- `category`: `setup` | `payments` | `calculations` | `data` | `deployment` | `omnichain` | `all`
- `projectType`: `crowdfunding` | `revnet` | `dao-treasury` | `subscription`

## MCP Tools (Stdio Server)

When using the local stdio MCP server:

### Documentation Tools
- `search_docs` - Search documentation by keyword or phrase
- `get_doc` - Retrieve a specific documentation page
- `list_docs_by_category` - List all docs in a category
- `get_doc_structure` - Get the complete documentation structure

### Code & Integration Tools (New)
- `search_code_examples` - Search code examples from documentation
- `get_contract_addresses` - Get contract addresses by name/chain
- `get_sdk_reference` - Get SDK hooks and utilities reference
- `get_integration_patterns` - Get integration patterns and templates

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

- **Semantic Search**: Fuzzy search across 1,600+ documentation pages
- **Code Examples**: 8,000+ indexed code examples from docs (Solidity, TypeScript, GraphQL)
- **SDK Reference**: juice-sdk-react hooks, juice-sdk-core utilities, revnet-sdk functions
- **Contract Addresses**: All V5 contract addresses across 8 chains (mainnet + testnets)
- **Integration Patterns**: Ready-to-use code patterns for common use cases
- **Project Type Templates**: Patterns organized by project type (revnet, crowdfunding, DAO, subscription)
- **Version Filtering**: Filter by protocol version (v3, v4, v5)
- **Category Filtering**: Filter by developer, user, dao, or ecosystem docs
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

## Related Resources

- **[Claude Code Skills](https://github.com/mejango/juicebox-skills)** - Comprehensive skills plugin for AI-assisted Juicebox development
- **[/llms.txt](https://docs.juicebox.money/llms.txt)** - Quick protocol overview for LLMs
- **[/llms-full.txt](https://docs.juicebox.money/llms-full.txt)** - Complete protocol reference
- **[/api/contracts.json](https://docs.juicebox.money/api/contracts.json)** - Machine-readable contract addresses
- **[/api/sdk.json](https://docs.juicebox.money/api/sdk.json)** - SDK hooks and types reference

## More Information

- [MCP Specification](https://modelcontextprotocol.io)
- [AI Integration Guide](/docs/dev/v5/build/mcp-server.md)
