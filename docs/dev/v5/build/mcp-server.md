---
sidebar_position: 10
title: AI Agent Integration
description: MCP server, Claude Code skills, and machine-readable resources for AI-assisted Juicebox development
keywords: [MCP, AI, Claude, LLM, machine-readable, API, skills, automation]
---

# AI Agent Integration

Juicebox provides comprehensive tooling for AI assistants and automated development workflows. This includes an MCP server for documentation access, Claude Code skills for protocol operations, and machine-readable data files.

## Claude Code Skills

The fastest way to build on Juicebox with AI assistance is using our Claude Code skills plugin.

**Install:** Add to your Claude Code settings or clone [github.com/mejango/juicebox-skills](https://github.com/mejango/juicebox-skills)

### Available Skills

| Skill | Description |
|-------|-------------|
| `/jb-project` | Create and configure Juicebox V5 projects |
| `/jb-ruleset` | Configure and queue rulesets with all parameters |
| `/jb-pay-hook` | Generate custom pay hooks with Foundry tests |
| `/jb-cash-out-hook` | Generate custom cash out hooks with tests |
| `/jb-split-hook` | Generate custom split hooks with tests |
| `/jb-decode` | Decode and analyze transaction calldata |
| `/jb-query` | Query project state from the blockchain |
| `/jb-docs` | Search documentation via MCP server |
| `/jb-v5-api` | API reference for all contract functions |
| `/jb-v5-impl` | Deep implementation knowledge and edge cases |

### Example Usage

```
/jb-project

Create a crowdfunding project that:
- Accepts ETH
- Issues 1M tokens per ETH
- Reserves 20% for the team
- Has a 100 ETH payout limit per 30-day cycle
- Allows token holders to cash out at any time
```

The skill will generate complete deployment code with proper configurations.

---

## Machine-Readable Resources

For programmatic access to protocol data:

| Resource | URL | Description |
|----------|-----|-------------|
| LLM Summary | [/llms.txt](https://docs.juicebox.money/llms.txt) | Quick protocol overview for LLMs |
| Full Context | [/llms-full.txt](https://docs.juicebox.money/llms-full.txt) | Complete protocol reference |
| Contract Addresses | [/api/contracts.json](https://docs.juicebox.money/api/contracts.json) | All V5 addresses as JSON |
| SDK Reference | [/api/sdk.json](https://docs.juicebox.money/api/sdk.json) | juice-sdk-react hooks and types |

---

## MCP Server

The Juicebox documentation is available through an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server for AI assistants.

### HTTP API

Base URL: **`https://docs.juicebox.money/api/mcp`**

#### Documentation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/search` | Search docs by query, category, version |
| `POST` | `/get-doc` | Get full document by path or title |
| `GET` | `/list-docs` | List all docs in a category |
| `GET` | `/structure` | Get documentation structure/stats |

#### Code & Integration Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/search-code` | Search code examples by language |
| `GET` | `/contracts` | Get contract addresses by name/chain |
| `GET` | `/sdk` | Get SDK hook/utility reference |
| `GET` | `/patterns` | Get integration patterns by project type |

### Quick Examples

**Search documentation:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "deploy project", "category": "developer", "limit": 5}'
```

**Get contract addresses:**
```bash
curl "https://docs.juicebox.money/api/mcp/contracts?contract=JBController"
```

**Get integration pattern:**
```bash
curl "https://docs.juicebox.money/api/mcp/patterns?projectType=revnet"
```

**Search code examples:**
```bash
curl -X POST https://docs.juicebox.money/api/mcp/search-code \
  -H "Content-Type: application/json" \
  -d '{"query": "pay", "language": "solidity", "limit": 5}'
```

### Parameters

**Documentation Search:**
- `query` (string, required): Search terms
- `category`: `developer` | `user` | `dao` | `ecosystem` | `all`
- `version`: `v3` | `v4` | `v5` | `all`
- `limit` (number): Max results (default: 10)

**Contract Addresses:**
- `contract`: Contract name (e.g., `JBController`, `REVDeployer`)
- `chainId`: `1` | `10` | `8453` | `42161` | testnets | `all`
- `category`: `core` | `revnet` | `hooks` | `suckers` | `omnichain` | `all`

**SDK Reference:**
- `package`: `juice-sdk-react` | `juice-sdk-core` | `revnet-sdk` | `all`
- `hook`: Specific hook name (e.g., `useJBProjectProvider`)
- `category`: `context` | `read` | `write` | `omnichain` | `math` | `all`

**Integration Patterns:**
- `pattern`: Pattern ID (e.g., `pay-project`, `wagmi-setup`)
- `projectType`: `crowdfunding` | `revnet` | `dao-treasury` | `subscription`

---

## Using with Claude Desktop

For local MCP server access:

1. Clone and install:
   ```bash
   git clone https://github.com/jbx-protocol/juice-docs-v3
   cd juice-docs-v3
   npm run mcp:install && npm run mcp:build-index
   ```

2. Configure Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):
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

3. Restart Claude Desktop

---

## For AI Agent Developers

If you're building AI agents that interact with Juicebox:

### Recommended Integration Order

1. **Use Claude Code Skills** - Most comprehensive, handles complex operations
2. **Query MCP Server** - For documentation lookup and code examples
3. **Use JSON APIs** - For contract addresses and SDK reference
4. **Parse llms-full.txt** - For complete protocol context

### Key Capabilities

| Task | Recommended Approach |
|------|---------------------|
| Deploy a project | `/jb-project` skill |
| Generate custom hook | `/jb-pay-hook`, `/jb-cash-out-hook`, or `/jb-split-hook` |
| Query project state | `/jb-query` skill with cast/ethers |
| Decode transaction | `/jb-decode` skill |
| Look up function signature | `/jb-v5-api` skill or MCP `/get-doc` |
| Understand internal mechanics | `/jb-v5-impl` skill |
| Get contract address | MCP `/contracts` or `/api/contracts.json` |

### Example: AI Agent Workflow

```javascript
// 1. Get contract addresses
const contracts = await fetch('https://docs.juicebox.money/api/contracts.json')
  .then(r => r.json());

// 2. Search for relevant documentation
const docs = await fetch('https://docs.juicebox.money/api/mcp/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'launch project', category: 'developer' })
}).then(r => r.json());

// 3. Get specific document
const guide = await fetch('https://docs.juicebox.money/api/mcp/get-doc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ path: 'dev/v5/build/life-of-a-project.md' })
}).then(r => r.json());
```

---

## More Information

- [Claude Code Skills Repository](https://github.com/mejango/juicebox-skills)
- [MCP Server README](https://github.com/jbx-protocol/juice-docs-v3/blob/main/mcp-server/README.md)
- [MCP Specification](https://modelcontextprotocol.io)
- [LLM Quick Reference](/llms.txt)
- [Full Protocol Context](/llms-full.txt)
