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

#### Core Protocol

| Skill | Description |
|-------|-------------|
| `/jb-project` | Create and configure Juicebox V5 projects |
| `/jb-ruleset` | Configure and queue rulesets with all parameters |
| `/jb-query` | Query project state from the blockchain |
| `/jb-decode` | Decode and analyze transaction calldata |
| `/jb-v5-api` | API reference for all contract functions |
| `/jb-v5-impl` | Deep implementation knowledge and edge cases |
| `/jb-docs` | Search documentation via MCP server |
| `/jb-v5-v51-contracts` | V5.0 vs V5.1 contract differences and migration |

#### Hook Generation

| Skill | Description |
|-------|-------------|
| `/jb-pay-hook` | Generate custom pay hooks with Foundry tests |
| `/jb-cash-out-hook` | Generate custom cash out hooks with tests |
| `/jb-split-hook` | Generate custom split hooks with tests |

#### UI Generation

| Skill | Description |
|-------|-------------|
| `/jb-deploy-ui` | Generate deploy frontends for projects and hooks |
| `/jb-interact-ui` | Generate interaction frontends (pay, cash out, claim) |
| `/jb-explorer-ui` | Etherscan-like contract explorer for projects |
| `/jb-event-explorer-ui` | Browse and decode Juicebox project events |
| `/jb-hook-deploy-ui` | Deploy custom hooks from browser |
| `/jb-nft-gallery-ui` | Interactive gallery for 721 hook NFTs |
| `/jb-omnichain-ui` | Cross-chain UI for multi-chain projects |
| `/jb-ruleset-timeline-ui` | Visual timeline of ruleset history |

#### Data & APIs

| Skill | Description |
|-------|-------------|
| `/jb-bendystraw` | GraphQL API for cross-chain project data |
| `/jb-relayr` | Multi-chain transaction bundling API |
| `/jb-fund-access-limits` | Query payout limits and surplus allowances |
| `/jb-loan-queries` | Query loan data from Revloans |

#### Specialized

| Skill | Description |
|-------|-------------|
| `/jb-permit2-metadata` | Encode Permit2 metadata for gasless ERC20 payments |
| `/jb-cash-out-curve` | Cash out redemption curve calculations |
| `/jb-multi-currency` | Multi-currency terminal support |
| `/jb-simplify` | Checklist to simplify project designs |
| `/jb-patterns` | Common integration patterns |
| `/jb-suckers` | Cross-chain token bridging with Suckers |
| `/jb-terminal-selection` | Terminal selection logic |
| `/jb-terminal-wrapper` | Terminal wrapper patterns |
| `/jb-v5-currency-types` | Currency type reference |
| `/jbx-fee-flows` | JBX fee flow analysis |
| `/jb-revloans` | Revloans borrowing functionality |

#### Revnet

| Skill | Description |
|-------|-------------|
| `/revnet-economics` | Revnet economic modeling and analysis |
| `/revnet-modeler` | Revnet simulation and projections |

### Skill Details

#### Core Protocol Skills

**`/jb-project`** - Creates complete deployment scripts for Juicebox V5 projects including ruleset configuration, terminal setup, split configurations, metadata, and multi-chain deployment with suckers.

**`/jb-ruleset`** - Designs and queues ruleset changes including duration, weight, decay, approval hooks, and metadata flags.

**`/jb-query`** - Queries live project state (configurations, rulesets, balances, token holders, splits) using `cast` or ethers.js.

**`/jb-decode`** - Decodes Juicebox transaction calldata with function parameter extraction and historical analysis.

**`/jb-v5-api`** vs **`/jb-v5-impl`** - API gives function signatures ("what exists?"), impl gives internal mechanics ("how does it work?").

#### Hook Generation Skills

**`/jb-pay-hook`**, **`/jb-cash-out-hook`**, **`/jb-split-hook`** - Generate Solidity contracts with Foundry tests. First evaluates if off-the-shelf hooks (721 hook, buyback hook, Revnet) fit before creating custom implementations.

#### UI Generation Skills

**`/jb-deploy-ui`** - Standalone HTML files for deploying projects with wallet connection and transaction forms.

**`/jb-interact-ui`** - Frontends for paying, cashing out, and claiming tokens from existing projects.

**`/jb-explorer-ui`** - Etherscan-like interface to read contract state, write transactions, and decode events.

**`/jb-hook-deploy-ui`** - Compile Solidity in browser, deploy contracts, verify on explorers, attach to projects.

**`/jb-omnichain-ui`** - Build interfaces for multi-chain projects with unified cross-chain data display.

#### Data & API Skills

**`/jb-bendystraw`** - GraphQL API reference for querying project stats, payments, token holders, loans, NFTs, and activity feeds across all chains.

**`/jb-relayr`** - Multi-chain transaction bundling: pay gas on one chain, execute on many. Used for omnichain deployments.

**`/jb-fund-access-limits`** - Query payout limits and surplus allowances. Detects "unlimited" values and handles the array-based return format.

#### Specialized Skills

**`/jb-permit2-metadata`** - Encode metadata for gasless ERC20 payments using JBMetadataResolver. Fixes "AllowanceExpired" errors and Permit2 signature issues.

**`/jb-cash-out-curve`** - Cash out redemption calculations using the bonding curve formula. Shows what percentage of treasury a cash out receives.

**`/jb-suckers`** - Cross-chain token bridging setup. Links projects across chains for token portability while maintaining treasury backing.

**`/jb-simplify`** - Checklist to reduce custom contracts by leveraging native protocol mechanics.

#### Revnet Skills

**`/revnet-economics`** - Revnet economic modeling: boost periods, price ceilings, operator fees, and token dynamics.

**`/revnet-modeler`** - Simulate revnet behavior with different parameters and project future states.

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
| Query cross-chain data | `/jb-bendystraw` skill (GraphQL API) |
| Decode transaction | `/jb-decode` skill |
| Look up function signature | `/jb-v5-api` skill or MCP `/get-doc` |
| Understand internal mechanics | `/jb-v5-impl` skill |
| Get contract address | MCP `/contracts` or `/api/contracts.json` |
| Build project frontend | `/jb-deploy-ui` or `/jb-interact-ui` skills |
| Deploy hooks from browser | `/jb-hook-deploy-ui` skill |
| Set up cross-chain bridging | `/jb-suckers` skill |
| Model revnet economics | `/revnet-economics` or `/revnet-modeler` |
| Fix Permit2 errors | `/jb-permit2-metadata` skill |
| Simplify project design | `/jb-simplify` skill |

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
