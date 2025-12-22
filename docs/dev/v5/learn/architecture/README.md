# Architecture

The protocol is made up of 9 core contracts and 3 surface contracts, and omnichain connectivity contracts called Suckers.

* Core contracts store all the independent components that make the protocol work.
* Surface contracts glue core contracts together and manage funds. Anyone can write new surface contracts for projects to use.

#### Core contracts

The first five core contracts are generic. They don't know anything specific to the ecosystem, and are open for use by other protocols or future extensions.

* [`JBProjects`](/docs/dev/v5/api/core/JBProjects.md) manages and tracks ownership over projects, which are represented as ERC-721 tokens.

    The protocol uses this to enforce permissions needed to access several project-oriented transactions.
* [`JBDirectory`](/docs/dev/v5/api/core/JBDirectory.md) keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and rulesets.

* [`JBPermissions`](/docs/dev/v5/api/core/JBPermissions.md) stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf, while confining the permissions to an arbitrary number of domain namespaces.

  The protocol uses this to allow project owners and token holders to give other EOAs or contracts permission to take certain administrative actions on their behalf. This is useful for encouraging a composable ecosystem where proxy contracts can perform actions on an address's behalf as a lego block.

* [`JBFundAccessLimits`](/docs/dev/v5/api/core/JBFundAccessLimits.md) keeps a reference to the amounts that each project has specified it can access through payouts or surplus allowances for each token during each ruleset.

* [`JBFeelessAddresses`](/docs/dev/v5/api/core/JBFeelessAddresses.md) keeps a reference to the addresses that can receive funds from projects without incurring fees typically taken any time funds leave the ecosystem.

The other four core contracts are self explanatory. They store the core opinionated components of the protocol.

* [`JBTokens`](/docs/dev/v5/api/core/JBTokens.md) manages token minting and burning for all projects.
* [`JBRulesets`](/docs/dev/v5/api/core/JBRulesets.md) manages rulesets configurations and scheduling. Rulesets are represented as a [`JBRuleset`](/docs/dev/v5/api/core/structs/JBRuleset.md) data structure. 
* [`JBSplits`](/docs/dev/v5/api/core/JBSplits.md) stores information about how arbitrary distributions should be split. The information is represented as a [`JBSplit`](/docs/dev/v5/api/core/structs/JBSplit.md) data structure.
  The surface contracts currently use these to split up payout distributions and reserved token distributions.
* [`JBPrices`](/docs/dev/v5/api/core/JBPrices.md) manages and normalizes price feeds between various currencies.
    
   The protocol uses this to allow projects to do their accounting in any number of currencies, but manage all funds in ETH or other assets regardless of accounting denomination.

#### Surface contracts

There are currently 3 surface contracts that manage how projects manage funds and define how all core contracts should be used together. Anyone can write new surface contracts for projects to use.

* [`JBController`](/docs/dev/v5/api/core/JBController.md) deploys projects and stitches together their rulesets and tokens, allowing for restricted control, accounting, and management.
* [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md) manages all inflows ([`pay`](/docs/dev/v5/api/core/JBMultiTerminal.md#pay), [`addToBalanceOf`](/docs/dev/v5/api/core/JBMultiTerminal.md#addtobalanceof)) and outflows ([`sendPayoutsOf`](/docs/dev/v5/api/core/JBMultiTerminal.md#sendpayoutsof), [`useAllowanceOf`](/docs/dev/v5/api/core/JBMultiTerminal.md#useallowanceof), [`cashOutTokensOf`](/docs/dev/v5/api/core/JBMultiTerminal.md#cashouttokensof)) of funds. 
* [`JBTerminalStore`](/docs/dev/v5/api/core/JBTerminalStore.md) manages accounting data on behalf of payment terminals.

Projects are welcome to roll their own [`IJBTerminal`](/docs/dev/v5/api/core/interfaces/IJBTerminal.md) implementations to accept funds through. This can be useful to accept other tokens as payment, bypass protocol fees, or attempt some other funky design. Projects with custom terminals are unlikely to show up on cononical web clients because of increased risk. A project can add/remove terminals from the core [`JBDirectory`](/docs/dev/v5/api/core/JBDirectory.md) contract using [`JBDirectory.setTerminalsOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#setterminalsof) if its current ruleset is configured to allow doing so.

Likewise, a project can bring its own contract to serve as its controller. A project's controller is the only contract that has direct access to manipulate its tokens, rulesets, splits, and price feeds. A project can set its controller from the core [`JBDirectory`](/docs/dev/v5/api/core/JBDirectory.md) contract using [`JBDirectory.setControllerOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#setcontrollerof) if its current ruleset is configured to allow doing so.

#### Omnichain contracts

The core and surface contracts are deployed on any number of EVM chains, starting with Ethereum mainnet, Optimism, Arbitrum, and Base. Projects can connect instances of their treasuries across these chains through components called Suckers, which suck funds from one chain and deposit them into another as a project's tokens are bridged.

* [`JBSucker`](/docs/dev/v5/api/suckers/JBSucker.md) sucks funds from one chain and deposits them into another as a project's tokens are burned on one chain and minted on the other.
* [`JBSuckerDeployer`](/docs/dev/v5/api/suckers/deployers/JBSuckerDeployer.md) specifies how to deploy new suckers for new chain pairs.
* [`JBSuckerRegistry`](/docs/dev/v5/api/suckers/JBSuckerRegistry.md) stores info about how local projects are connected to projects on other chains, through calls like [`JBSuckerRegistry.suckerPairsOf(...)`](/docs/dev/v5/api/suckers/JBSuckerRegistry.md#suckerpairsof). This is also the contract where new suckers should be deployed from.

#### Bonus utility contracts

* [`JBBuybackHook`](/docs/dev/v5/api/buyback-hook/JBBuybackHook.md) allows projects to route incoming funds to buy back their own tokens from the market if it offers a better price than the current issuance rate.
 * [`JB721TiersHook`](/docs/dev/v5/api/721-hook/JB721TiersHook.md) allows projects to distribute NFTs to holders along tiers and categories as funds are received.
* [`JBSwapTermina1`](/docs/dev/v5/api/swap-terminal/JBSwapTerminal.md) allows projects to swap incoming funds for other tokens that it wishes to hold in its project's balance, allowing payers greater optionality in how they can pay a project while not adding more risk to the project.
* [`JBProjectHandles`](/docs/dev/v5/api/project-handles/JBProjectHandles.md) lets project attach an ENS name as a project handle. Front ends can use a project's handle in place of its project ID, and indexers can use events to make the Juicebox project directory searchable and filterable. This will only be deployed on Ethereum mainnet.

