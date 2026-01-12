---
sidebar_position: 6
---

# Subgraph (Legacy)

:::tip Recommended: Use Bendystraw
For V5 protocol data, we recommend using [Bendystraw](/docs/dev/v5/build/bendystraw.md) - a modern GraphQL API with better performance, cross-chain support, and active maintenance.
:::

The legacy Juicebox subgraphs index events from Juicebox contracts V1-V3. These are maintained for backwards compatibility with older projects.

## Legacy Subgraph Access

**URL Format:**
```
https://subgraph.satsuma-prod.com/<api-key>/juicebox/<name>/api
```

**Free dev key:** `bc505571c408` (rate limited)

**Available networks (V1-V3 only):**
- `ethereum-v3`
- `sepolia-v3`

**Playground:**
```
https://subgraph.satsuma-prod.com/juicebox/<network>/playground
```

## V5 Data

For V5 protocol data across all chains (Ethereum, Optimism, Arbitrum, Base), use [Bendystraw](/docs/dev/v5/build/bendystraw.md):

| Feature | Legacy Subgraph | Bendystraw |
|---------|-----------------|------------|
| Protocol versions | V1-V3 only | V5 |
| Chains | Ethereum only | Ethereum, Optimism, Arbitrum, Base |
| Cross-chain queries | No | Yes (Sucker Groups) |
| SDK integration | Manual | `useBendystrawQuery` hook |
| Maintenance | Minimal | Active |

## Source Code

- **V1-V3 Subgraph:** [jbx-protocol/juice-subgraph](https://github.com/jbx-protocol/juice-subgraph)
- **Bendystraw (V5):** [peripheralist/bendystraw](https://github.com/peripheralist/bendystraw)
