---
sidebar_position: 1
title: Subgraph Introduction
---

# Subgraph

[The Graph](https://thegraph.com/) is a protocol which allows anyone to create a [GraphQL](https://graphql.org/) API for querying blockchain data. Each individual API is called a *subgraph*. Juicebox's subgraphs are in use on [juicebox.money](https://juicebox.money) and other websites to load Juicebox protocol data without directly querying the blockchain.

To get started, try out the [example queries](queries) on our [subgraph's playground](https://thegraph.com/explorer/subgraphs/FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC?view=Playground). Click the book icon on the right-hand side of the screen to search through our schema as needed. You can use the endpoints below for simple applications, but they may be rate-limited – for production use, see [Avoid Rate-Limiting](#avoid-rate-limiting).

| Name | URL | Description |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| juicebox | [View on Graph explorer](https://thegraph.com/explorer/subgraph?id=FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC&view=Overview) | The primary mainnet subgraph used by [juicebox.money](https://juicebox.money). |
| mainnet-dev | [`https://api.studio.thegraph.com/query/30654/mainnet-dev/7.1.0`](https://api.studio.thegraph.com/query/30654/mainnet-dev/7.1.0) | Indexes mainnet Juicebox protocol contracts. |
| goerli-dev | [`https://api.studio.thegraph.com/query/30654/goerli-dev/7.1.0`](https://api.studio.thegraph.com/query/30654/goerli-dev/7.1.0) | Indexes goerli Juicebox protocol contracts. (Does not include v1 & v2 contracts, except for v2 JBProjects) |

Multiple subgraphs are maintained by [Peel](https://discord.gg/b4rpjgGPHX) in a Graph Studio owned by the [Peel Gnosis safe](https://gnosis-safe.io/app/eth:0x0e9D15e28e3De9bB3CF64FFbC2f2F49Da9Ac545B). Only the primary Juicebox subgraph has been published to the Graph Network; others are available to use for free with rate-limited queries.

If you run into trouble, check:

- The Graph's [Documentation](https://thegraph.com/docs/)
- Peel's [Discord server](https://discord.gg/XvmfY4Hkcz)
- The juicebox.money [implementation](https://github.com/jbx-protocol/juice-interface/blob/main/src/utils/graph.ts)

## Avoid Rate-Limiting

To use the mainnet Juicebox subgraph without being rate-limited:

1. Create your API key on [Subgraph Studio API Keys](https://thegraph.com/studio/apikeys/).
2. Fund your billing balance on [Subgraph Studio Billing](https://thegraph.com/studio/billing/).
3. Query the mainnet Juicebox subgraph using an endpoint like so: `https://gateway.thegraph.com/api/<your-api-key>/subgraphs/id/FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC`. Replace `<your-api-key>` with your Subgraph Studio API key from step 1.

You can also follow the [Video Tutorial](https://www.youtube.com/watch?v=UrfIpm-Vlgs). For more information on Graph query billing, visit [*Billing*](https://thegraph.com/docs/billing/) and [*Managing your API keys*](https://thegraph.com/docs/querying/managing-api-keys/).
