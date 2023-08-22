---
sidebar_position: 1
title: Subgraph Introduction
---

# Subgraph

[The Graph](https://thegraph.com/) is a protocol which allows anyone to create a [GraphQL](https://graphql.org/) API for querying blockchain data. Each individual API is called a *subgraph*. Juicebox's subgraphs are in use on [juicebox.money](https://juicebox.money) and other websites to load Juicebox protocol data without directly querying the blockchain.

Juicebox subgraphs are indexed via [Satsuma](https://www.satsuma.xyz/). You can query them using the URLs in the table below (you'll need an API key from the [Peel Discord server](https://discord.gg/XvmfY4Hkcz)), or try out our [example queries](queries) in a playground:

| Name | URL | Description | |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------|--|
| mainnet | `https://subgraph.satsuma-prod.com/<api-key>/juicebox/mainnet/api` | Indexes mainnet Juicebox protocol contracts. | [Playground](https://subgraph.satsuma-prod.com/juicebox/mainnet/playground) |
| goerli | `https://subgraph.satsuma-prod.com/<api-key>/juicebox/goerli/api` | Indexes goerli Juicebox protocol contracts. (Does not include v1 & v2 contracts, except for v2 JBProjects) | [Playground](https://subgraph.satsuma-prod.com/juicebox/goerli/playground) |

The subgraph is maintained by [Peel](https://discord.gg/b4rpjgGPHX) here: [https://github.com/jbx-protocol/juice-subgraph](https://github.com/jbx-protocol/juice-subgraph).

If you run into trouble, check:

- The Graph's [Documentation](https://thegraph.com/docs/)
- Peel's [Discord server](https://discord.gg/XvmfY4Hkcz)
- The juicebox.money [implementation](https://github.com/jbx-protocol/juice-interface/blob/main/src/utils/graph.ts)


## Deprecated Subgraph

Note: The mainnet Juicebox Subgraph was previously published and indexed on the Graph Network [here](https://thegraph.com/explorer/subgraphs/FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC?view=Overview?chain=Ethereum). This Subgraph is no longer being maintained as of version 7.1.0.