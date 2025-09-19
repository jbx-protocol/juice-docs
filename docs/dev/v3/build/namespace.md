---
sidebar_position: 6
---

# Namespaces & IDs

Some Juicebox protocol contracts and utilities use shared namespaces and indices.

## Operator Permissions

[`JBOperatorStore`](/docs/dev/v3/api/contracts/jboperatorstore/README.md) allows addresses to give permissions to any other address to take specific actions on their behalf. Typically, a project owner or protocol user would grant a proxy contract or an EOA (called an _operator_) administrative protocol permissions. This is administered through the [`requirePermission`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) and [`requirePermissionAllowingOverride`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) modifiers from [`JBOperatable`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/README.md). When granting permissions to an operator, an address can pass a `domain` to limit these permissions to a certain project ID (where the domain is the project's ID), or can pass a domain of `0` to grant permissions across all domains (see [Operator](/docs/dev/v3/learn/glossary/operator.md)).

These permissions are represented by the following indices:

| Index | Name                   | Found on                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ----- | ---------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `RECONFIGURE`          | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBController3_1.reconfigureFundingCyclesOf(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#reconfigurefundingcyclesof) (or similar functions on other controllers) on an address' behalf.                                                                                                                                             |
| 2     | `REDEEM`               | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#redeemtokensof) (or similar functions on other terminals) on an address' behalf, redeeming token holders according to a project's (or its data source's) rules.                            |
| 3     | `MIGRATE_CONTROLLER`   | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBController3_1.migrate(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#migrate) (or similar functions on other controllers) on an address' behalf. To migrate, the project must have [`allowControllerMigration`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md) enabled.                                                         |
| 4     | `MIGRATE_TERMINAL`     | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.migrate(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#migrate) (or similar functions on other payment terminals) on an address' behalf. To migrate, the project must have [`allowTerminalMigration`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md). |
| 5     | `PROCESS_FEES`         | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.processFees(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#processfees) (or similar functions on other terminals) on an address' behalf. See [_Hold fees_](/docs/dev/v3/learn/glossary/hold-fees.md).                                                              |
| 6     | `SET_METADATA`         | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBProjects.setMetadataOf(...)`](/docs/dev/v3/api/contracts/jbprojects/write/setmetadataof.md) on an address' behalf.                                                                                                                                                                                                                                      |
| 7     | `ISSUE`                | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBTokenStore.issueFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/issuefor.md) on an address' behalf. This issues an ERC-20 token for a project's token holders to claim.                                                                                                                                                                        |
| 8     | `SET_TOKEN`            | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBTokenStore.setFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/setfor.md) on an address' behalf. This sets a project's token (if not already set).                                                                                                                                                                                              |
| 9     | `MINT`                 | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBTokenStore.mintFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/mintfor.md) on an address' behalf. [`allowMinting`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md) must be enabled to mint project tokens.                                                                                                                                   |
| 10    | `BURN`                 | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBController3_1.burnTokensOf(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#burntokensof) on an address' behalf. This burns a token holder's supply.                                                                                                                                                                                 |
| 11    | `CLAIM`                | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBTokenStore.claimFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/claimfor.md) on an address' behalf. This claims internally tracked (unclaimed) tokens as a project's ERC-20.                                                                                                                                                                   |
| 12    | `TRANSFER`             | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBTokenStore.transferFrom(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/transferfrom.md) on an address' behalf. [`pauseTransfers`](/docs/dev/v3/api/data-structures/jbglobalfundingcyclemetadata.md) must be false to transfer unclaimed (internally tracked) tokens.                                                                                        |
| 13    | `REQUIRE_CLAIM`        | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBTokenStore.shouldRequireClaimingFor(...)`]((/docs/dev/v2/contracts/jbtokenstore/write/shouldrequireclaimingfor/README.md) on an address' behalf, forcing all future tokens to be claimed (as ERC-20). This function (and the corresponding permission) have been deprecated in Juicebox v3.                                                       |
| 14    | `SET_CONTROLLER`       | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBDirectory.setControllerOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setcontrollerof.md) on an address' behalf. To set new controller(s), the project must have [`allowSetController`](/docs/dev/v3/api/data-structures/jbglobalfundingcyclemetadata.md) enabled.                                                                                        |
| 15    | `SET_TERMINALS`        | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBDirectory.setTerminalsOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setterminalsof.md) on an address' behalf. To set new terminal(s), the project must have [`allowSetTerminals`](/docs/dev/v3/api/data-structures/jbglobalfundingcyclemetadata.md) enabled.                                                                                             |
| 16    | `SET_PRIMARY_TERMINAL` | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBDirectory.setPrimaryTerminalOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setprimaryterminalof.md) on an address' behalf.                                                                                                                                                                                                                      |
| 17    | `USE_ALLOWANCE`        | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.useAllowanceOf(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#useallowanceof) (or similar functions on other terminals) on an address' behalf. This uses a project's [overflow allowance](/docs/dev/v3/learn/glossary/overflow.md).                                |
| 18    | `SET_SPLITS`           | [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md)                                   | Allow an operator to call [`JBSplitsStore.set(...)`](/docs/dev/v3/api/contracts/jbsplitsstore/write/set.md) on an address' behalf. This sets a project's [splits](/docs/dev/v3/learn/glossary/splits.md).                                                                                                                                                                                       |
| 19    | `SET_ENS_NAME_FOR`     | [`JBOperations2`](/docs/dev/v3/api/libraries/jboperations2.md)                                 | Allow an operator to call [`JBProjectHandles.setEnsNamePartsFor(...)`](/docs/dev/v3/api/contracts/or-utilities/jbprojecthandles/write/setensnamepartsfor.md) on an address' behalf, associating an ENS name with a project.                                                                                                                                                           |
| 20    | `SET_TOKEN_URI`        | [`JBUriOperations`](/docs/dev/v3/extensions/juice-token-resolver/libraries/jburioperations.md) | Allow an operator to call [`TokenUriResolver.setTokenUriResolverForProject(...)`](/docs/dev/v3/extensions/juice-token-resolver/tokenuriresolver.md#settokenuriresolverforproject), setting a project's [`IJBTokenUriResolver`](/docs/dev/v3/api/interfaces/ijbtokenuriresolver.md). This is the URI resolver used for the [Project NFT](/docs/dev/v3/build/project-nft.md).                               |
| 21    | `ADJUST_TIERS`         | [`JB721Operations`](/docs/dev/v3/extensions/juice-721-delegate/libraries/jb721operations.md)   | Allow an operator to call [`JBTiered721Delegate.adjustTiers(...)`](/docs/dev/v3/extensions/juice-721-delegate/jbtiered721delegate.md#adjusttiers) on an address' behalf.                                                                                                                                                                                                              |
| 22    | `UPDATE_METADATA`      | [`JB721Operations`](/docs/dev/v3/extensions/juice-721-delegate/libraries/jb721operations.md)   | Allow an operator to call [`JBTiered721Delegate.setMetadata(...)`](/docs/dev/v3/extensions/juice-721-delegate/jbtiered721delegate.md#setmetadata) on an addresses' behalf.                                                                                                                                                                                                            |
| 23    | `MINT`                 | [`JB721Operations`](/docs/dev/v3/extensions/juice-721-delegate/libraries/jb721operations.md)   | Allow an operator to call [`JBTiered721Delegate.mintFor(...)`](/docs/dev/v3/extensions/juice-721-delegate/jbtiered721delegate.md#mintfor) on an addresses' behalf.                                                                                                                                                                                                                    |
| 24 | `SET_POOL_PARAMS` | [`JBBuybackDelegateOperations`](/docs/dev/v3/extensions/juice-buyback/libraries/jbbuybackdelegateoperations.md) | Allow an operator to call [`JBGenericBuybackDelegate.changeSecondsAgo(...)`](/docs/dev/v3/extensions/juice-buyback/jbgenericbuybackdelegate.md#changesecondsago) or [`JBGenericBuybackDelegate.setTwapDelta(...)`](/docs/dev/v3/extensions/juice-buyback/jbgenericbuybackdelegate.md#settwapdelta) on an addresses' behalf.|
| 25 | `CHANGE_POOL` | [`JBBuybackDelegateOperations`](/docs/dev/v3/extensions/juice-buyback/libraries/jbbuybackdelegateoperations.md) | Allow an operator to call [`JBGenericBuybackDelegate.setPoolFor(...)`](/docs/dev/v3/extensions/juice-buyback/jbgenericbuybackdelegate.md#setpoolfor) on an addresses' behalf. |

## Delegate IDs

When paying a Juicebox project with a [delegate](/docs/dev/v3/learn/glossary/delegate.md), clients must pass the appropriate metadata in the [`JBDidPayData3_1_1`](/docs/dev/v3/api/data-structures/jbdidpaydata3_1_1.md) (or the [`JBDidPayData`](/docs/dev/v3/api/data-structures/jbdidpaydata.md) for projects using older payment terminals). The same is true for redemptions and the [`JBDidRedeemData3_1_1`](/docs/dev/v3/api/data-structures/jbdidredeemdata3_1_1.md) (or [`JBDidRedeemData`](/docs/dev/v3/api/data-structures/jbdidredeemdata.md) for projects using older payment terminals).

This metadata must explicitly specify the delegate being interacted with. For older delegates, this is typically the `interfaceId` of the delegate's interface. Newer delegates are identified by a 4 byte ID specified in the constructor arguments, which can be read by calling a delegate's `delegateId()` view function:

```
function delegateId() external view returns (bytes4);
```

The deploy script defaults for notable delegates have been compiled below:

| Delegate | delegateId |
| --- | --- |
| [`juice-buyback`](/docs/dev/v3/extensions/juice-buyback/README.md) | [`BUYB`](https://github.com/jbx-protocol/juice-buyback/blob/9188f091347816c201097ae704fbf2c66b22d495/contracts/scripts/Deploy.s.sol#L26C43-L26C47) |
| [`juice-721-delegate`](/docs/dev/v3/extensions/juice-721-delegate/README.md) | [`721P`](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/scripts/Deploy.s.sol#L22C44-L22C48) |
| [`juice-721-delegate`](/docs/dev/v3/extensions/juice-721-delegate/README.md) | [`721R`](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/scripts/Deploy.s.sol#L23) |

Frontends interacting with newer delegates can use [`JBMetadata-Helper`](https://github.com/simplemachine92/JBMetadata-Helper) to simplify this process.

## Splits Groups

Juicebox projects store [splits](/docs/dev/v3/learn/glossary/splits.md) for an arbitrary number of groups, each corresponding to a specific kind of distribution (such as ETH payouts or reserved tokens). Each one of these groups corresponds to a specific index:

| Index | Name              | Found on                                               | Description                                                                                                                                                                                                              |
| ----- | ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | `ETH_PAYOUT`      | [`JBSplitsGroups`](/docs/dev/v3/api/libraries/jbsplitsgroups.md) | Used when distributing ETH payouts via [`JBPayoutRedemptionPaymentTerminal3_1_1.distributePayoutsOf(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#distributepayoutsof). |
| 2     | `RESERVED_TOKENS` | [`JBSplitsGroups`](/docs/dev/v3/api/libraries/jbsplitsgroups.md) | Used when distributing [reserved tokens](/docs/dev/v3/learn/glossary/reserved-tokens.md).                                                                                                                                          |

These groups must be specified when passing [`JBGroupedSplits`](/docs/dev/v3/api/data-structures/jbgroupedsplits.md) to a function such as:

- [`JBController3_1.launchProjectFor(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchprojectfor)
- [`JBController3_1.launchFundingCyclesFor(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchfundingcyclesfor)
- [`JBController3_1.reconfigureFundingCyclesOf(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#reconfigurefundingcyclesof)
- [`JBSplitsStore.set(...)`](/docs/dev/v3/api/contracts/jbsplitsstore/write/set.md)

You can find a terminal's splits group index by accessing the relevant [`JBPayoutRedemptionPaymentTerminal3_1_1.payoutSplitsGroup`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#payoutsplitsgroup) property.

## Currency Prices

Juicebox uses [`JBPrices`](/docs/dev/v3/api/contracts/jbprices/README.md) to manage and normalize prices for various currencies, with each currency having its own index:

| Index | Name  | Found on                                           | Description                                                                                                                                                                                                                                                                         |
| ----- | ----- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `ETH` | [`JBCurrencies`](/docs/dev/v3/api/libraries/jbcurrencies.md) | 1 ETH = 1 ETH.                                                                                                                                                                                                                                                                      |
| 2     | `USD` | [`JBCurrencies`](/docs/dev/v3/api/libraries/jbcurrencies.md) | Uses [`JBChainlinkV3PriceFeed`](/docs/dev/v3/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/README.md)EADME.md), a generalized price feed for Chainlink's [`AggregatorV3Interface`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol). |

The protocol uses this to allow projects to do their accounting in any number of currencies, but manage all funds in ETH or other assets (regardless of accounting denomination). Price feeds must adhere to [`IJBPriceFeed`](/docs/dev/v3/api/interfaces/ijbpricefeed.md). New price feeds can be added via [`JBPrices.addFeedFor(...)`](/docs/dev/v3/api/contracts/jbprices/write/addfeed.md), which can only be called by the [JuiceboxDAO multisig](/docs/dev/v3/learn/administration.md).

## Interface IDs

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) introduced standard interface detection via the `ERC165.sol` interface:

```
interface ERC165 {
    /// @notice Query if a contract implements an interface
    /// @param interfaceID The interface identifier, as specified in ERC-165
    /// @dev Interface identification is specified in ERC-165. This function
    ///  uses less than 30,000 gas.
    /// @return `true` if the contract implements `interfaceID` and
    ///  `interfaceID` is not 0xffffffff, `false` otherwise
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}
```

This allows people to check whether a given contract adheres to an interface. For your convenience, here are the `interfaceId`s for interfaces in [`juice-contracts-v3`](https://github.com/jbx-protocol/juice-contracts-v3):

| Interface                                                                                                | interfaceId  |
| -------------------------------------------------------------------------------------------------------- | ------------ |
| [`IJBAllowanceTerminal3_1`](/docs/dev/v3/api/interfaces/ijballowanceterminal3_1.md)                                 | `0xa02f801c` |
| [`IJBAllowanceTerminal`](/docs/dev/v3/interfaces/ijballowanceterminal.md)                            | `0xbc8926e9` |
| [`IJBController3_0_1`](/docs/dev/v3/interfaces/ijbcontroller3_0_1.md)                                 | `0x7c5a29e6` |
| [`IJBController3_1`](/docs/dev/v3/api/interfaces/ijbcontroller3_1.md)                                               | `0x8cbbedc0` |
| [`IJBController`](/docs/dev/v3/interfaces/ijbcontroller.md)                                           | `0x85e36899` |
| [`IJBControllerUtility`](/docs/dev/v3/api/interfaces/ijbcontrollerutility.md)                                       | `0xc41c2f24` |
| [`IJBDirectory`](/docs/dev/v3/api/interfaces/ijbdirectory.md)                                                       | `0x4ecdb66b` |
| [`IJBETHERC20ProjectPayerDeployer`](/docs/dev/v3/api/interfaces/ijbetherc20projectpayerdeployer.md)                 | `0x5be94a6f` |
| [`IJBETHERC20SplitsPayerDeployer`](/docs/dev/v3/api/interfaces/ijbetherc20splitspayerdeployer.md)                   | `0x3715a283` |
| [`IJBFeeGauge3_1`](/docs/dev/v3/api/interfaces/ijbfeegauge3_1.md)                                                   | `0x192dd609` |
| [`IJBFeeGauge`](/docs/dev/v3/api/interfaces/ijbfeegauge.md)                                                         | `0x77695896` |
| [`IJBFeeHoldingTerminal`](/docs/dev/v3/api/interfaces/ijbfeeholdingterminal.md)                                     | `0xc715967a` |
| [`IJBFundAccessConstraintsStore`](/docs/dev/v3/api/interfaces/ijbfundaccessconstraintsstore.md)                     | `0xa65abb63` |
| [`IJBFundingCycleBallot`](/docs/dev/v3/api/interfaces/ijbfundingcycleballot.md)                                     | `0x7ba3dfb3` |
| [`IJBFundingCycleDataSource3_1_1`](/docs/dev/v3/api/interfaces/ijbfundingcycledatasource3_1_1.md)                   | `0x71700c69` |
| [`IJBFundingCycleDataSource`](/docs/dev/v3/api/interfaces/ijbfundingcycledatasource.md)                             | `0x71700c69` |
| [`IJBFundingCycleStore`](/docs/dev/v3/api/interfaces/ijbfundingcyclestore.md)                                       | `0xd9590add` |
| [`IJBMigratable`](/docs/dev/v3/api/interfaces/ijbmigratable.md)                                                     | `0x3e8c615b` |
| [`IJBOperatable`](/docs/dev/v3/api/interfaces/ijboperatable.md)                                                     | `0xad007d63` |
| [`IJBOperatorStore`](/docs/dev/v3/api/interfaces/ijboperatorstore.md)                                               | `0x9125fdae` |
| [`IJBPayDelegate3_1_1`](/docs/dev/v3/api/interfaces/ijbpaydelegate3_1_1.md)                                         | `0x6b204943` |
| [`IJBPayDelegate`](/docs/dev/v3/api/interfaces/ijbpaydelegate.md)                                                   | `0xda9ee8b7` |
| [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)                                           | `0xc07370e4` |
| [`IJBPayoutRedemptionPaymentTerminal3_1_1`](/docs/dev/v3/api/interfaces/ijbpayoutredemptionpaymentterminal3_1_1.md) | `0x00000000` |
| [`IJBPayoutRedemptionPaymentTerminal3_1`](/docs/dev/v3/api/interfaces/ijbpayoutredemptionpaymentterminal3_1.md)     | `0xedb527eb` |
| [`IJBPayoutRedemptionPaymentTerminal`](/docs/dev/v3/interfaces/ijbpayoutredemptionpaymentterminal.md)| `0xedb527eb` |
| [`IJBPayoutTerminal3_1`](/docs/dev/v3/api/interfaces/ijbpayoutterminal3_1.md)                                       | `0x4a4305c0` |
| [`IJBPayoutTerminal`](/docs/dev/v3/interfaces/ijbpayoutterminal.md)                                  | `0x2b267b4e` |
| [`IJBPriceFeed`](/docs/dev/v3/api/interfaces/ijbpricefeed.md)                                                       | `0x7a3c4c17` |
| [`IJBPrices`](/docs/dev/v3/api/interfaces/ijbprices.md)                                                             | `0x2730be0e` |
| [`IJBProjectPayer`](/docs/dev/v3/api/interfaces/ijbprojectpayer.md)                                                 | `0x7ddb72fc` |
| [`IJBProjects`](/docs/dev/v3/api/interfaces/ijbprojects.md)                                                         | `0xaa91a66f` |
| [`IJBRedemptionDelegate3_1_1`](/docs/dev/v3/api/interfaces/ijbredemptiondelegate3_1_1.md)                           | `0x0bf46e59` |
| [`IJBRedemptionDelegate`](/docs/dev/v3/api/interfaces/ijbredemptiondelegate.md)                                     | `0x2b13c58f` |
| [`IJBRedemptionTerminal`](/docs/dev/v3/api/interfaces/ijbredemptionterminal.md)                                     | `0xfe663f0f` |
| [`IJBSingleTokenPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbsingletokenpaymentterminal.md)                     | `0x28960002` |
| [`IJBSingleTokenPaymentTerminalStore3_1_1`](/docs/dev/v3/api/interfaces/ijbsingletokenpaymentterminalstore3_1_1.md) | `0x98d00da8` |
| [`IJBSingleTokenPaymentTerminalStore`](/docs/dev/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md)           | `0x98d00da8` |
| [`IJBSplitAllocator`](/docs/dev/v3/api/interfaces/ijbsplitallocator.md)                                             | `0x9d740bfa` |
| [`IJBSplitsPayer`](/docs/dev/v3/api/interfaces/ijbsplitspayer.md)                                                   | `0x35d42f96` |
| [`IJBSplitsStore`](/docs/dev/v3/api/interfaces/ijbsplitsstore.md)                                                   | `0xd45e236b` |
| [`IJBToken`](/docs/dev/v3/api/interfaces/ijbtoken.md)                                                               | `0xc6805740` |
| [`IJBTokenStore`](/docs/dev/v3/api/interfaces/ijbtokenstore.md)                                                     | `0xb79436b1` |
| [`IJBTokenUriResolver`](/docs/dev/v3/api/interfaces/ijbtokenuriresolver.md)                                         | `0xda0544aa` |

## Metadata

Juicebox project metadata (such as a project's name, logo, and description) are stored on [IPFS](https://ipfs.tech/README.md). A project's metadata IPFS hash can be found by accessing the [`JBProjects.metadataContentOf(...)`](/docs/dev/v3/api/contracts/jbprojects/properties/metadatacontentof.md) property, which takes two arguments:

- `_projectId` is the ID of the project to which the metadata belongs.
- `_domain` is the **domain within which the metadata applies.**

As of 2023-04-13, all projects store their metadata within domain `0`, but future frontends or contracts with unique metadata needs might consider utilizing new domains.

#### Example

If one calls [`JBProjects.metadataContentOf(...)`](/docs/dev/v3/api/contracts/jbprojects/properties/metadatacontentof.md) with `_projectId` as `1` and `_domain` as `0`, the contract will return the IPFS hash `QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF`.

Now, one can navigate to a [public IPFS gateway](https://ipfs.github.io/public-gateway-checker/README.md) or a dedicated gateway (from [Infura](https://www.infura.io/README.md), [Cloudflare](https://developers.cloudflare.com/web3/ipfs-gateway/README.md), or another provider) to read the project's metadata:

```json
{
  "name": "JuiceboxDAO",
  "description": "Supports projects built using the Juicebox protocol, and the development of the protocol itself. All projects withdrawing funds from their treasury pay a 2.5% membership fee and receive JBX at the current issuance rate. JBX members govern the NFT that represents ownership over this treasury.",
  "logoUri": "https://jbx.mypinata.cloud/ipfs/QmWXCt1zYAJBkNb7cLXTNRNisuWu9mRAmXTaW9CLFYkWVS",
  "infoUri": "https://snapshot.org/#/jbdao.eth",
  "twitter": "juiceboxETH",
  "discord": "https://discord.gg/W9mTVG4QhD",
  "payButton": "Add juice",
  "tokens": [],
  "version": 4
}
```

See it yourself at [`https://ipfs.io/ipfs/QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF`](https://ipfs.io/ipfs/QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF). To learn more about IPFS, visit the [IPFS docs](https://docs.ipfs.tech/README.md).

Also see [*Project Metadata*](/docs/dev/v3/frontend/metadata.md).
