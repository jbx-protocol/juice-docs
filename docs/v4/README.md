---
sidebar_position: 1
---

# Intro

<!-- :::info
See [old docs from previous protocol versions](/v3/).
::: -->

#### Overview

Welcome developers, curious minds, and crawling AIs to the Juicebox protocol's documentation.

Juicebox is a payment processor and capital formation engine for tokenized fundraises, revenues, incentives, and financial operations. Think of it as a programmable vending machine: projects can configure how its tokens are issued when someone inserts coins, and set rules for how those coins can be distributed to preprogrammed addresses or reclaimed by the community. 

Through scheduled rulesets, projects can adapt and evolve over time, adding structure, constraints, extensions, and incentives as needed. Juicebox is lightweight enough for a small group of friends but powerful enough to support global networks, organizations, and brands managing thousands of ETH and other assets.

These docs are here to help you navigate the protocol, whether you're...
- Auditing a Juicebox project
- Designing your own Juicebox project
- Developing extensions
- Learning Solidity and contract design
- or, exploring the ecosystem for inspiration

... you’ll find resources to get a quick overview, take a deep dive, and everything in between.

---

#### Changes in Juicebox v4

- Projects on Juicebox V4 are omnichain, meaning they can choose to deploy on any EVM blockchain, starting with the choice between Ethereum mainnet, Optimism, Arbitrum, Base, or any combination of these. Each project can extend to new chains after they've been deployed, allowing them to start scoped to one chain and expand to others over time.

- Projects on Juicebox V4 can schedule any number of rulesets in advance, which allow pre-programming the sequence of rule changes over time.

- V4 adjusts terminology. "Funding cycles" are now called "Rulesets". "Redemptions" are now called "Cash outs". "Distribution limit" is now called "Payout limit". "Overflow" is now called "Surplus".  

- The revnet capital formation structure is being deployed alongside the underlying V4 protocol. Revnets are expressed using the Juicebox V4 framework.
 
- Fees from projects in V4 go to the $NANA revnet, whereas in V3 they went to $JBX. $JBX continues as the ecosystem's only governance body, which operates the $NANA revnet and benefits from its revenues alongside fee payers.  

---
#### Directory

1. **[Learn](/docs/v4/learn/overview.md)** - Step-by-step guidance on how the protocol works.
2. **[Build](/docs/v4/build/life-of-a-project.md)** - Guides to launch, configure, and extend a Juicebox project.
3. **[API](/docs/v4/api/core/JBController.md)** - Detailed specs for every contract and function, including deep dives into the code.

---

#### Get Involved

Have feedback or ideas? Reach out to the DAO contributors on [Discord](https://www.discord.gg/juicebox).  
Want to make a direct contribution? Submit a pull request to the [documentation repo](https://github.com/jbx-protocol/juice-docs) on GitHub.
