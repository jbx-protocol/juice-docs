# Architecture

:::info
See [JuiceboxDAO's Protocol Evolution: Navigating Updates and Enhancements](https://jango.eth.limo/31469E9F-8C0D-49E9-8003-0077674708A6/README.md).
:::

The protocol is made up of 7 core contracts and 3 surface contracts.

* Core contracts store all the independent components that make the protocol work.
* Surface contracts glue core contracts together and manage funds. Anyone can write new surface contracts for projects to use.

#### Core contracts

The first two core contracts are self explanatory. They store the core opinionated components of the protocol.

* [`JBTokenStore`](/docs/dev/v3/api/contracts/jbtokenstore/README.md) manages token minting and burning for all projects.
* [`JBFundingCycleStore`](/docs/dev/v3/api/contracts/jbfundingcyclestore/README.md) manages funding cycle configurations and scheduling. Funding cycles are represented as a [`JBFundingCycle`](/docs/dev/v3/api/data-structures/jbfundingcycle.md) data structure.

The next few are a little more generic. They don't know anything specific to the ecosystem, and are open for use by other protocols or future extensions.

*   [`JBProjects`](/docs/dev/v3/api/contracts/jbprojects/README.md) manages and tracks ownership over projects, which are represented as ERC-721 tokens.

    The protocol uses this to enforce permissions needed to access several project-oriented transactions.
*   [`JBSplitsStore`](/docs/dev/v3/api/contracts/jbsplitsstore/README.md) stores information about how arbitrary distributions should be split. The information is represented as a [`JBSplit`](/docs/dev/v3/api/data-structures/jbsplit.md) data structure.

    The surface contracts currently use these to split up payout distributions and reserved token distributions.
*   [`JBPrices`](/docs/dev/v3/api/contracts/jbprices/README.md) manages and normalizes price feeds of various currencies.

    The protocol uses this to allow projects to do their accounting in any number of currencies, but manage all funds in ETH or other assets regardless of accounting denomination.
*   [`JBOperatorStore`](/docs/dev/v3/api/contracts/jboperatorstore/README.md) stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf, while confining the permissions to an arbitrary number of domain namespaces.

    The protocol uses this to allow project owners and token holders to give other EOAs or contracts permission to take certain administrative actions on their behalf. This is useful for encouraging a composable ecosystem where proxy contracts can perform actions on an address's behalf as a lego block.

* [`JBDirectory`](/docs/dev/v3/api/contracts/jbdirectory/README.md) keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and funding cycles.

#### Surface contracts

There are currently 3 surface contracts that manage how projects manage funds and define how all core contracts should be used together. Anyone can write new surface contracts for projects to use.

* [`JBController3_1`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md) stitches together funding cycles and project tokens, allowing for restricted control, accounting, and token management.
* [`JBPayoutRedemptionPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md) manages all inflows ([`pay`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#pay), [`addToBalanceOf`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#addtobalanceof)) and outflows ([`distributePayoutsOf`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#distributepayoutsof), [`useAllowanceOf`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#useallowanceof), [`redeemTokensOf`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#redeemtokensof)) of funds. This is an abstract implementation that can be used by any number of payment terminals, such as [`JBETHPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1.md)'s and [`JBERC20PaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1.md)'s.
* [`JBSingleTokenPaymentTerminalStore3_1_1`](/docs/dev/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1.md) manages accounting data on behalf of payment terminals that manage balances of only one token type.

The abstract [`JBPayoutRedemptionPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md) implements the [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) interface to provide outflow mechanics, and [`JBETHPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1.md) and [`JBERC20PaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1.md) in-turn extend the [`JBPayoutRedemptionPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md) to provide scoped inflow/outflow environments for specific tokens. Projects are welcome to roll their own [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) implementations to accept funds through. This can be useful to accept other tokens as payment, bypass protocol fees, or attempt some other funky design. A project can add/remove terminals from the core [`JBDirectory`](/docs/dev/v3/api/contracts/jbdirectory/README.md) contract using [`JBDirectory.setTerminalsOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setterminalsof.md) if its current funding cycle is configured to allow doing so.

Likewise, a project can bring its own contract to serve as its controller. A project's controller is the only contract that has direct access to manipulate its tokens and funding cycles. A project can set its controller from the core [`JBDirectory`](/docs/dev/v3/api/contracts/jbdirectory/README.md) contract using [`JBDirectory.setControllerOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setcontrollerof.md) if its current funding cycle is configured to allow doing so.

#### Bonus utility contracts

* [`JBETHERC20ProjectPayer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayer.md) provides utilities to pay a project. Inheriting this contract is useful for contracts that wish to route funds to a treasury while specifying the token beneficiary, memo, and other contextual information alongside. Instances of this contract can also be deployed as stand-alone addresses that will forward funds received directly to a project's treasury.
* [`JBETHERC20ProjectPayerDeployer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayerdeployer.md) provides a function to deploy new stand-alone [`JBETHERC20ProjectPayer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayer.md)s.
* [`JBETHERC20SplitsPayer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20splitspayer.md) provides utilities to pay a group of splits. Inheriting this contract is useful for contracts that wish to route funds to a group of splits while specifying contextual information alongside. Instances of this contract can also be deployed as stand-alone addresses that will forward funds received directly to a group of splits.
* [`JBETHERC20SplitsPayerDeployer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20splitspayerdeployer.md) provides a function to deploy new stand-alone [`JBETHERC20SplitsPayer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20splitspayer.md)s.
* [`JBProjectHandles`]((/docs/dev/v2/contracts/or-utilities/jbprojecthandles/README.md) lets project owners attach an ENS name as a project handle. Front ends can use a project's handle in place of its project ID, and indexers can use events to make the Juicebox project directory searchable and filterable.

