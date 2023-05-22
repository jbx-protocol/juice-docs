---
sidebar_position: 1
---

# Getting started

:::info
If you're interested in building a Juicebox smart contract, see the `juice-contract-template` [GitHub Repository](https://github.com/jbx-protocol/juice-contract-template). If you need any help, join our [Discord server](https://discord.gg/juicebox).
:::

#### Import

Add the protocol files to the project.
```bash
# command line
npm install @jbx-protocol/juice-contracts-v3/
```

If referencing from typescript:
```typescript
const contract = require(`@jbx-protocol/juice-contracts-v3/deployments/${network}/${contractName}.json`)
```

If referencing from a contract:
```
import '@jbx-protocol/juice-contracts-v3/contracts/[file-path].sol'
```

#### Now what

From here, you can build the following:

[Basics](basics.md): Interact with the protocol's basic functionality. Useful for building front-ends.

[Pay a project](utilities/project-payer.md): Deploy or inherit from a contract that makes it easy to forward funds to Juicebox projects.

[Split payments](utilities/splits-payer.md): Deploy or inherit from a contract that makes it easy to forward funds to groups of splits whose members are either addresses, Juicebox projects, or arbitrary contracts that inherit from [`IJBSplitAllocator`](treasury-extensions/split-allocator.md).

[Program a treasury](programmable-treasury.md): Get familiar with the configurable properties available when launching a project.

[Program project permissions](project-nft.md): Build custom Juicebox Project NFT logic to create your own project access controls.

[Program treasury extensions](../treasury-extensions): Create custom contractual rules defining what happens when a project receives funds, and under what conditions funds can leave the treasury during a funding cycle.
