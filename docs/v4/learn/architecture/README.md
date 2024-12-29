# Architecture

The protocol is made up of 9 core contracts and 3 surface contracts, and omnichain connectivity contracts called Suckers.

* Core contracts store all the independent components that make the protocol work.
* Surface contracts glue core contracts together and manage funds. Anyone can write new surface contracts for projects to use.

#### Core contracts

The first five core contracts are generic. They don't know anything specific to the ecosystem, and are open for use by other protocols or future extensions.

* [`JBProjects`](/v4/api/core/contracts/jbprojects) manages and tracks ownership over projects, which are represented as ERC-721 tokens.

    The protocol uses this to enforce permissions needed to access several project-oriented transactions.
* [`JBDirectory`](/v4/api/core/contracts/jbdirectory/) keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and rulesets.

* [`JBPermissions`](/v4/api/core/contracts/jbpermissions) stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf, while confining the permissions to an arbitrary number of domain namespaces.

  The protocol uses this to allow project owners and token holders to give other EOAs or contracts permission to take certain administrative actions on their behalf. This is useful for encouraging a composable ecosystem where proxy contracts can perform actions on an address's behalf as a lego block.

* [`JBFundAccessLimits`](/v4/api/core/contracts/jbfundaccesslimits) keeps a reference to the amounts that each project has specified it can access through payouts or surplus allowances for each token during each ruleset.

* [`JBFeelessAddresses`](/v4/api/core/contracts/jbfeelessaddresses) keeps a reference to the addresses that can receive funds from projects without incurring fees typically taken any time funds leave the ecosystem.

The other four core contracts are self explanatory. They store the core opinionated components of the protocol.

* [`JBTokens`](/v4/api/core/contracts/jbtokens) manages token minting and burning for all projects.
* [`JBRulesets`](/v4/api/core/contracts/jbrulesets) manages rulesets configurations and scheduling. Rulesets are represented as a [`JBRuleset`](/v4/api/core/structs/jbruleset) data structure.
* [`JBSplits`](/v4/api/core/contracts/jbsplits) stores information about how arbitrary distributions should be split. The information is represented as a [`JBSplit`](/v4/api/core/structs/jbsplit) data structure.
  The surface contracts currently use these to split up payout distributions and reserved token distributions.
* [`JBPrices`](/v4/api/core/contracts/jbprices) manages and normalizes price feeds between various currencies.
    
   The protocol uses this to allow projects to do their accounting in any number of currencies, but manage all funds in ETH or other assets regardless of accounting denomination.

#### Surface contracts

There are currently 3 surface contracts that manage how projects manage funds and define how all core contracts should be used together. Anyone can write new surface contracts for projects to use.

* [`JBController`](/v4/api/core/contracts/jbcontroller/) deploys projects and stitches together their rulesets and tokens, allowing for restricted control, accounting, and management.
* [`JBMultiTerminal`](/v4/api/core/contracts/jbmultiterminal/) manages all inflows ([`pay`](/v4/api/core/contracts/jbmultiterminal/#pay), [`addToBalanceOf`](/v4/api/core/contracts/jbmultiterminal/#addtobalanceof)) and outflows ([`sendPayoutsOf`](/v4/api/core/contracts/jbmultiterminal/#sendpayoutsof), [`useAllowanceOf`](/v4/api/core/contracts/jbmultiterminal/#useallowanceof), [`cashOutTokensOf`](/v4/api/core/contracts/jbmultiterminal/#cashouttokensof)) of funds. 
* [`JBTerminalStore`](/v4/api/core/contracts/jbterminalstore/) manages accounting data on behalf of payment terminals.

Projects are welcome to roll their own [`IJBTerminal`](/v4/api/core/interfaces/ijbterminal) implementations to accept funds through. This can be useful to accept other tokens as payment, bypass protocol fees, or attempt some other funky design. Projects with custom terminals are unlikely to show up on cononical web clients because of increased risk. A project can add/remove terminals from the core [`JBDirectory`](/v4/api/core/contracts/jbdirectory/) contract using [`JBDirectory.setTerminalsOf(...)`](/v4/api/core/contracts/jbdirectory.md/#setterminalsof) if its current ruleset is configured to allow doing so.

Likewise, a project can bring its own contract to serve as its controller. A project's controller is the only contract that has direct access to manipulate its tokens, rulesets, splits, and price feeds. A project can set its controller from the core [`JBDirectory`](/v4/api/core/contracts/jbdirectory/) contract using [`JBDirectory.setControllerOf(...)`](/v4/api/core/contracts/jbdirectory.md/#setcontrollerof) if its current ruleset is configured to allow doing so.

#### Omnichain contracts

The core and surface contracts are deployed on any number of EVM chains, starting with Ethereum mainnet, Optimism, Arbitrum, and Base. Projects can connect instances of their treasuries across these chains through components called Suckers, which suck funds from one treasury and deposit them into another as a project's tokens are bridged.

* [`JBSucker`](.) is a contract that sucks funds from one treasury and deposits them into another as a project's tokens are bridged.
* [`JBSuckerDeployer`](.) is a contract that allows projects to deploy new suckers for new chain pairs.

#### Bonus utility contracts

* [`JBBuybackHook`](/v4/deprecated/v2/contracts/or-utilities/jbbuybackhook/) is a utility contract that allows projects to route incoming funds to buy back their own tokens from the market if it offers a better price than the current issuance rate.
* [`JBTiered721Hook`](/v4/deprecated/v2/contracts/or-utilities/jbtiered721hook/) is a utility contract that allows projects to distribute NFTs to holders in a tiered manner as funds are received.
* [`JBSwapTerminal`](/v4/deprecated/v2/contracts/or-utilities/jbswapterminal/) is a utility contract that allows projects to swap incoming funds for other tokens that it wishes to hold in its treasury, allowing payers greater optionality in how they can pay a project while not adding more risk to the project.
* [`JBProjectHandles`](/v4/deprecated/v2/contracts/or-utilities/jbprojecthandles) lets project owners attach an ENS name as a project handle. Front ends can use a project's handle in place of its project ID, and indexers can use events to make the Juicebox project directory searchable and filterable. This will only be deployed on Ethereum mainnet.

