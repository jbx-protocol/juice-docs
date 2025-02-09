# Omnichain

#### What everyone needs to know

* A project can recieve funds and issue its tokens from any number of blockchains it chooses from the set of eligible ones, currently Ethreum mainnet, Optimism, Arbitrum, and Base.
* Under the hood, a juicebox project is deployed independently on each chain. They can have matching rulesets and payouts, or be totally different.
* The juicebox projects on the various chains are connected in only one way: token holders on one chain can bridge over to any other chain where the project exists. When doing so, they take a proportional share of the project's [surplus](/docs/v4/learn/glossary/surplus.md) on the original chain with them to the new chain.
* A project's `projectIds` are likely to be different on each chain.
* A project can extend to new chains after its been deployed.
 
#### What you'll want to know if you're building

* We call the component that bridges project tokens alongside their juicebox balance a Sucker.
* Each chain has a [`JBSuckerRegistry`](/docs/v4/api/suckers/JBSuckerRegistry.md) that stores info about how local projects are connected to projects on other chains, through calls like [`JBSuckerRegistry.getSuckerPairsOf(...)`](/docs/v4/api/suckers/JBSuckerRegistry/#getsuckerpairsof). This is also the contract where new suckers should be deployed from.
* There currently are [`IJBSucker`](/docs/v4/api/suckers/interfaces/IJBSucker.md) implementations for native bridges between Ethereum mainnet and [Optimism](/docs/v4/api/suckers/JBOptimismSucker.md), [Arbitrum](/docs/v4/api/suckers/JBArbitrumSucker.md), and [Base](/docs/v4/api/suckers/JBBaseSucker.md), as well as a [CCIP version](/docs/v4/api/suckers/JBCCIPSucker.md) for bridging between the L2s and any number of other EVMs into the future.
