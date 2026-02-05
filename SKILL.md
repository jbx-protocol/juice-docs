# Juicebox V5 — Getting Started for AI Agents

Juicebox is a programmable treasury protocol for tokenized fundraising and financial operations on Ethereum and L2s. V5 is the current version.

## Fastest Path

Install the [Claude Code skills plugin](https://github.com/mejango/juicebox-skills) for comprehensive protocol operations. Key skills:

| Task | Skill |
|------|-------|
| Deploy a project | `/jb-project` |
| Deploy a revnet | `/revnet-modeler` then `/jb-project` |
| Configure rulesets | `/jb-ruleset` |
| Query onchain state | `/jb-query` |
| Generate a pay/cash-out hook | `/jb-pay-hook`, `/jb-cash-out-hook` |
| Build a frontend | `/jb-deploy-ui`, `/jb-interact-ui` |
| Look up contract API | `/jb-v5-api` |
| Understand internals | `/jb-v5-impl` |
| Query cross-chain data | `/jb-bendystraw` |
| Decode a transaction | `/jb-decode` |

## Core Concepts

- **Projects** — NFTs granting admin control over a treasury. Created via `JBController.launchProjectFor()`.
- **Rulesets** — Time-bound configurations controlling token issuance weight, payout limits, surplus allowances, reserved percent, cash-out tax rate, and approval hooks. One active at a time; future rulesets queue automatically.
- **Terminals** — Payment processors. `JBMultiTerminal` accepts ETH and ERC-20s. `JBSwapTerminal` routes payments through Uniswap.
- **Tokens** — Issued to payers per the ruleset weight. Start as internal credits; optional ERC-20 deployment.
- **Splits** — Automated distribution rules for payouts and reserved tokens.
- **Hooks** — Custom Solidity contracts extending protocol behavior: pay hooks, cash-out hooks, split hooks, ruleset data hooks, ruleset approval hooks.
- **Revnets** — Autonomous fundraising networks with pre-programmed token economics, deployed via `REVDeployer`.
- **Suckers** — Cross-chain token and fund bridging between supported chains.

## Contract Addresses (Same on All Chains)

Use `5_1` contracts for new projects. Do NOT use `5_1` contracts for revnets.

| Contract | Address |
|----------|---------|
| JBController5_1 | `0xf3cc99b11bd73a2e3b8815fb85fe0381b29987e1` |
| JBMultiTerminal5_1 | `0x52869db3d61dde1e391967f2ce5039ad0ecd371c` |
| JBDirectory | `0x0061e516886a0540f63157f112c0588ee0651dcf` |
| JBProjects | `0x885f707efa18d2cb12f05a3a8eba6b4b26c8c1d4` |
| JBTokens | `0x4d0edd347fb1fa21589c1e109b3474924be87636` |
| JBPermissions | `0x04fd6913d6c32d8c216e153a43c04b1857a7793d` |
| JBRulesets | `0x6292281d69c3593fcf6ea074e5797341476ab428` |
| JBSplits | `0x7160a322fea44945a6ef9adfd65c322258df3c5e` |
| REVDeployer | `0x2ca27bde7e7d33e353b44c27acfcf6c78dde251d` |
| REVLoans | `0x1880d832aa283d05b8eab68877717e25fbd550bb` |

Supported chains: Ethereum (1), Optimism (10), Arbitrum (42161), Base (8453), and their Sepolia testnets.

Full address list: https://docs.juicebox.money/dev/v5/addresses/

## Common Operations

### Pay a project
```solidity
IJBMultiTerminal(terminal).pay{value: amount}(
    projectId,
    token,           // JBConstants.NATIVE_TOKEN for ETH
    amount,
    beneficiary,
    minReturnedTokens,
    memo,
    metadata
);
```

### Cash out tokens
```solidity
IJBMultiTerminal(terminal).cashOutTokensOf(
    holder,
    projectId,
    cashOutCount,
    token,
    minTokensReclaimed,
    beneficiary,
    metadata
);
```

### Deploy a project
```solidity
IJBController(controller).launchProjectFor(
    owner,
    projectUri,
    rulesetConfigurations,
    terminalConfigurations,
    memo
);
```

## Machine-Readable Resources

| Resource | URL |
|----------|-----|
| LLM quick reference | https://docs.juicebox.money/llms.txt |
| Full protocol context | https://docs.juicebox.money/llms-full.txt |
| Contract addresses JSON | https://docs.juicebox.money/api/contracts.json |
| SDK reference JSON | https://docs.juicebox.money/api/sdk.json |

## MCP Server

Base URL: `https://docs.juicebox.money/api/mcp`

```bash
# Search documentation
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -H "Content-Type: application/json" \
  -d '{"query": "deploy project", "category": "developer", "version": "v5", "limit": 5}'

# Get a specific document
curl -X POST https://docs.juicebox.money/api/mcp/get-doc \
  -H "Content-Type: application/json" \
  -d '{"path": "dev/v5/build/life-of-a-project.md"}'

# Get contract addresses
curl "https://docs.juicebox.money/api/mcp/contracts?contract=JBController"

# Search code examples
curl -X POST https://docs.juicebox.money/api/mcp/search-code \
  -H "Content-Type: application/json" \
  -d '{"query": "pay", "language": "solidity", "limit": 5}'

# Get integration patterns
curl "https://docs.juicebox.money/api/mcp/patterns?projectType=revnet"
```

## Documentation

- Overview: https://docs.juicebox.money/dev/v5/learn/overview/
- Glossary: https://docs.juicebox.money/dev/v5/learn/glossary/
- Project lifecycle: https://docs.juicebox.money/dev/v5/build/life-of-a-project/
- Revnet guide: https://docs.juicebox.money/dev/v5/build/life-of-a-revnet/
- Hook tutorials: https://docs.juicebox.money/dev/v5/build/hooks/pay-hook/
- Code examples: https://docs.juicebox.money/dev/v5/build/examples/launch-project/
- API reference: https://docs.juicebox.money/dev/v5/api/core/
- SDK: https://docs.juicebox.money/dev/v5/build/sdk/
- GraphQL (Bendystraw): https://docs.juicebox.money/dev/v5/build/bendystraw/

## Source Code

- Protocol core: https://github.com/bananapus/nana-core
- Revnets: https://github.com/rev-net/revnet-core
- 721 hook: https://github.com/bananapus/nana-721-hook
- Buyback hook: https://github.com/bananapus/nana-buyback-hook
- Swap terminal: https://github.com/bananapus/nana-swap-terminal
- Suckers: https://github.com/bananapus/nana-suckers
- SDK: https://github.com/jbx-protocol/juice-sdk-v4
- Skills plugin: https://github.com/mejango/juicebox-skills
