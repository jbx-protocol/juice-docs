---
sidebar_position: 1
---

# Intro

#### Overview

Welcome developers, curious minds, and crawling AIs to the Juicebox protocol's documentation.

Juicebox is a payment processor and capital formation engine for tokenized fundraises, revenues, incentives, and financial operations. Think of it as a programmable vending machine: projects can configure how its tokens are issued when someone inserts coins, and set rules for how those coins can be distributed to preprogrammed addresses or reclaimed by the community. 

Through scheduled rulesets, projects can adapt and evolve over time, adding structure, constraints, extensions, and incentives as needed. Juicebox is lightweight enough for a small group of friends but powerful enough to support global networks, organizations, and brands managing thousands of ETH and other assets.

These docs are here to help you navigate the protocol, whether you're...
- Building a platform on Juicebox
- Configuring a capital formation design using Juicebox
- Auditing a Juicebox project
- Designing your own Juicebox project
- Developing extensions usable by Juicebox projects
- Learning Solidity and contract design
- or, exploring the ecosystem for inspiration

... you’ll find resources to get a quick overview, take a deep dive, and everything in between.

---
#### Directory

1. **[Learn](/docs/dev/v5/learn/overview.md)** - Step-by-step guidance on how the protocol works.
2. **[Build](/docs/dev/v5/build/life-of-a-project.md)** - Guides to launch, configure, and extend a Juicebox project.
3. **[API](/docs/dev/v5/api/core/README.md)** - Detailed specs for every contract and function, including deep dives into the code.
4. **[Contract addresses](/docs/dev/v5/addresses.md)** - All contract addresses.
5. **[MCP Server](/docs/dev/v5/build/mcp-server.md)** - Access documentation programmatically via MCP (Model Context Protocol).

---

#### Changes in Juicebox V5

- V5 is a fork of V4 with a few key bug fixes to the [Revnet](/docs/dev/v5/learn/glossary/revnet.md) protocol, a capital formation subsystem of Juicebox with which fees are handled. See [this](https://jango.eth.sucks/32736EB3-2906-45AC-8887-3A328355799C/) blog post for more info.

#### Changes in Juicebox V4

- Full protocol rewrite, borrowing the core ideas and much of the logic from V3.

- Projects on Juicebox V4 are omnichain, meaning they can choose to deploy on any EVM blockchain, starting with the choice between Ethereum mainnet, Optimism, Arbitrum, Base, or any combination of these. Each project can extend to new chains after they've been deployed, allowing them to start scoped to one chain and expand to others over time.

- Projects on Juicebox V4 can schedule any number of rulesets in advance, which allow pre-programming the sequence of rule changes over time.

- V4 adjusts terminology. "Funding cycles" are now called "Rulesets". "Redemptions" are now called "Cash outs". "Distribution limit" is now called "Payout limit". "Overflow" is now called "Surplus".  

- The revnet capital formation structure is being deployed alongside the underlying V4 protocol. Revnets are expressed using the Juicebox V4 framework.
 
- Fees from projects in V4 go to the $NANA revnet, whereas in V3 they went to JBX. JBX continues as the ecosystem's only governance body, which operates the $NANA revnet and benefits from its revenues alongside fee payers.  

#### Changes in Juicebox V3

- V3 is a fork of V2 that fixes a funding cycle bug, maintaining the same `JBProjects` contract.

#### Changes in Juicebox V2

- Full protocol rewrite, borrowing the core ideas and much of the logic from V1.

- Added hooks that allow projects to bring their own functionality when they are paid, when token holders redeem, and when splits are paid out.


---

#### Get Involved

Have feedback or ideas? Reach out to the DAO contributors on [Discord](https://www.discord.gg/juicebox).  
Want to make a direct contribution? Submit a pull request to the [documentation repo](https://github.com/jbx-protocol/juice-docs) on GitHub.
