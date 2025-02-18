# Omnichain

#### What everyone needs to know

* A sucker is the component projects use to connect multiple instances of Juiceboxes across chains.
* A sucker is kind of like a bridge, with some special properties that make omnichain Juiceboxes work well together.

See [Omnichain](/docs/v4/learn/glossary/omnichain.md) for more.
 
#### What you'll want to know if you're building

* We call the component that bridges project tokens alongside their juicebox balance a Sucker.
* Each chain has a [`JBSuckerRegistry`](/docs/v4/api/suckers/JBSuckerRegistry.md) that stores info about how local projects are connected to projects on other chains, through calls like [`JBSuckerRegistry.suckerPairsOf(...)`](/docs/v4/api/suckers/JBSuckerRegistry.md#suckerpairsof). This is also the contract where new suckers should be deployed from.
* There currently are [`IJBSucker`](/docs/v4/api/suckers/interfaces/IJBSucker.md) implementations for native bridges between Ethereum mainnet and [Optimism](/docs/v4/api/suckers/JBOptimismSucker.md), [Arbitrum](/docs/v4/api/suckers/JBArbitrumSucker.md), and [Base](/docs/v4/api/suckers/JBBaseSucker.md), as well as a [CCIP version](/docs/v4/api/suckers/JBCCIPSucker.md) for bridging between the L2s and any number of other EVMs into the future.