---
sidebar_position: 6
---

# Namespaces & Indices

Some Juicebox protocol contracts uses shared namespaces and indices.

## Operator Permissions

[`JBOperatorStore`](/dev/api/contracts/jboperatorstore/) allows addresses to give permissions to any other address to take specific actions on their behalf. Typically, a project owner or protocol user would grant a proxy contract or an EOA (called an *operator*) administrative protocol permissions. This is administered through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission/) and [`requirePermissionAllowingOverride`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride/) modifiers from [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/). When granting permissions to an operator, an address can pass a `domain` to limit these permissions to a certain project ID (where the domain is the project's ID), or can pass a domain of `0` to grant permissions across all domains (see [Operator](/dev/learn/glossary/operator/)).

These permissions are represented by the following indices:

| Index | Name | Found on | Description |
| --- | --- | --- | --- |
| 1 | `RECONFIGURE` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBController3_1.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof) (or similar functions on other controllers) on an address' behalf. |
| 2 | `REDEEM` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1.redeemTokensOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#redeemtokensof) (or similar functions on other terminals) on an address' behalf, redeeming token holders according to a project's (or its data source's) rules. |
| 3 | `MIGRATE_CONTROLLER` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBController3_1.migrate(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#migrate) (or similar functions on other controllers) on an address' behalf. To migrate, the project must have [`allowControllerMigration`](/dev/api/data-structures/jbfundingcyclemetadata/) enabled. |
| 4 | `MIGRATE_TERMINAL` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1.migrate(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#migrate) (or similar functions on other payment terminals) on an address' behalf. To migrate, the project must have [`allowTerminalMigration`](/dev/api/data-structures/jbfundingcyclemetadata/). |
| 5 | `PROCESS_FEES` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1.processFees(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#processfees) (or similar functions on other terminals) on an address' behalf. See [*Hold fees*](/dev/learn/glossary/hold-fees/). |
| 6 | `SET_METADATA` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBProjects.setMetadataOf(...)`](/dev/api/contracts/jbprojects/write/setmetadataof/) on an address' behalf. |
| 7 | `ISSUE`  | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBTokenStore.issueFor(...)`](/dev/api/contracts/jbtokenstore/write/issuefor/) on an address' behalf. This issues an ERC-20 token for a project's token holders to claim. |
| 8 | `SET_TOKEN`  | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBTokenStore.setFor(...)`](/dev/api/contracts/jbtokenstore/write/setfor/) on an address' behalf. This sets a project's token (if not already set). |
| 9 | `MINT` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBTokenStore.mintFor(...)`](/dev/api/contracts/jbtokenstore/write/mintfor/) on an address' behalf. [`allowMinting`](/dev/api/data-structures/jbfundingcyclemetadata/) must be enabled to mint project tokens. |
| 10 | `BURN` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBController3_1.burnTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#burntokensof) on an address' behalf. This burns a token holder's supply. |
| 11 | `CLAIM` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBTokenStore.claimFor(...)`](/dev/api/contracts/jbtokenstore/write/claimfor/) on an address' behalf. This claims internally tracked (unclaimed) tokens as a project's ERC-20. |
| 12 | `TRANSFER` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBTokenStore.transferFrom(...)`](/dev/api/contracts/jbtokenstore/write/transferfrom/) on an address' behalf. [`pauseTransfers`](/dev/api/data-structures/jbglobalfundingcyclemetadata/) must be false to transfer unclaimed (internally tracked) tokens. |
| 13 | `REQUIRE_CLAIM` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBTokenStore.shouldRequireClaimingFor(...)`](/dev/deprecated/v2/contracts/jbtokenstore/write/shouldrequireclaimingfor/) on an address' behalf, forcing all future tokens to be claimed (as ERC-20). This function (and the corresponding permission) have been deprecated in Juicebox v3. |
| 14 | `SET_CONTROLLER` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBDirectory.setControllerOf(...)`](/dev/api/contracts/jbdirectory/write/setcontrollerof/) on an address' behalf. To set new controller(s), the project must have [`allowSetController`](/dev/api/data-structures/jbglobalfundingcyclemetadata/) enabled. |
| 15 | `SET_TERMINALS` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBDirectory.setTerminalsOf(...)`](/dev/api/contracts/jbdirectory/write/setterminalsof/) on an address' behalf. To set new terminal(s), the project must have [`allowSetTerminals`](/dev/api/data-structures/jbglobalfundingcyclemetadata/) enabled. |
| 16 | `SET_PRIMARY_TERMINAL` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBDirectory.setPrimaryTerminalOf(...)`](/dev/api/contracts/jbdirectory/write/setprimaryterminalof/) on an address' behalf. |
| 17 | `USE_ALLOWANCE` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1.useAllowanceOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#useallowanceof) (or similar functions on other terminals) on an address' behalf. This uses a project's [overflow allowance](/dev/learn/glossary/overflow/). |
| 18 | `SET_SPLITS` | [`JBOperations`](/dev/api/libraries/jboperations/) | Allow an operator to call [`JBSplitsStore.set(...)`](/dev/api/contracts/jbsplitsstore/write/set/) on an address' behalf. This sets a project's [splits](/dev/learn/glossary/splits/). |
| 19 | `SET_ENS_NAME_FOR` | [`JBOperations2`](/dev/api/libraries/jboperations2/) | Allow an operator to call [`JBProjectHandles.setEnsNamePartsFor(...)`](/dev/api/contracts/or-utilities/jbprojecthandles/write/setensnamepartsfor/) on an address' behalf, associating an ENS name with a project. |
| 20 | `SET_TOKEN_URI` | [`JBUriOperations`](/dev/extensions/juice-token-resolver/libraries/jburioperations/) | Allow an operator to call [`TokenUriResolver.setTokenUriResolverForProject(...)`](/dev/extensions/juice-token-resolver/tokenuriresolver/#settokenuriresolverforproject), setting a project's [`IJBTokenUriResolver`](/dev/api/interfaces/ijbtokenuriresolver/). This is the URI resolver used for the [Project NFT](/dev/build/project-nft/). |

## Splits Groups

Juicebox projects store [splits](/dev/learn/glossary/splits/) for an arbitrary number of groups, each corresponding to a specific kind of distribution (such as ETH payouts or reserved tokens). Each one of these groups corresponds to a specific index:

| Index | Name | Found on | Description |
| --- | --- | --- | --- |
| 1 | `ETH_PAYOUT` | [`JBSplitsGroups`](/dev/api/libraries/jbsplitsgroups/) | Used when distributing ETH payouts via [`JBPayoutRedemptionPaymentTerminal3_1.distributePayoutsOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#distributepayoutsof). |
| 2 | `RESERVED_TOKENS` | [`JBSplitsGroups`](/dev/api/libraries/jbsplitsgroups/) | Used when distributing [reserved tokens](/dev/learn/glossary/reserved-tokens/). |

These groups must be specified when passing [`JBGroupedSplits`](/dev/api/data-structures/jbgroupedsplits/) to a function such as:

- [`JBController3_1.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor)
- [`JBController3_1.launchFundingCyclesFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#launchfundingcyclesfor)
- [`JBController3_1.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof)
- [`JBSplitsStore.set(...)`](/dev/api/contracts/jbsplitsstore/write/set/)

You can find a terminal's splits group index by accessing the relevant [`JBPayoutRedemptionPaymentTerminal3_1.payoutSplitsGroup`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#payoutsplitsgroup) property.

## Currency Prices

Juicebox uses [`JBPrices`](/dev/api/contracts/jbprices/) to manage and normalize prices for various currencies, with each currency having its own index:

| Index | Name | Found on | Description |
| --- | --- | --- | --- |
| 1 | `ETH` | [`JBCurrencies`](/dev/api/libraries/jbcurrencies/) | 1 ETH = 1 ETH. |
| 2 | `USD` | [`JBCurrencies`](/dev/api/libraries/jbcurrencies/) | Uses [`JBChainlinkV3PriceFeed`](/dev/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/), a generalized price feed for Chainlink's [`AggregatorV3Interface`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol). |

The protocol uses this to allow projects to do their accounting in any number of currencies, but manage all funds in ETH or other assets (regardless of accounting denomination). Price feeds must adhere to [`IJBPriceFeed`](/dev/api/interfaces/ijbpricefeed/). New price feeds can be added via [`JBPrices.addFeedFor(...)`](/dev/api/contracts/jbprices/write/addfeed/), which can only be called by the [JuiceboxDAO multisig](/dev/learn/administration/).
