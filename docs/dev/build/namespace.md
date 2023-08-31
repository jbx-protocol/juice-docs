---
sidebar_position: 6
---

# Namespaces & IDs

Some Juicebox protocol contracts and utilities use shared namespaces and indices.

## Operator Permissions

[`JBOperatorStore`](/dev/api/contracts/jboperatorstore/) allows addresses to give permissions to any other address to take specific actions on their behalf. Typically, a project owner or protocol user would grant a proxy contract or an EOA (called an _operator_) administrative protocol permissions. This is administered through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission/) and [`requirePermissionAllowingOverride`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride/) modifiers from [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/). When granting permissions to an operator, an address can pass a `domain` to limit these permissions to a certain project ID (where the domain is the project's ID), or can pass a domain of `0` to grant permissions across all domains (see [Operator](/dev/learn/glossary/operator/)).

These permissions are represented by the following indices:

| Index | Name                   | Found on                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ----- | ---------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `RECONFIGURE`          | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBController3_1.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof) (or similar functions on other controllers) on an address' behalf.                                                                                                                                             |
| 2     | `REDEEM`               | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof) (or similar functions on other terminals) on an address' behalf, redeeming token holders according to a project's (or its data source's) rules.                            |
| 3     | `MIGRATE_CONTROLLER`   | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBController3_1.migrate(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#migrate) (or similar functions on other controllers) on an address' behalf. To migrate, the project must have [`allowControllerMigration`](/dev/api/data-structures/jbfundingcyclemetadata/) enabled.                                                         |
| 4     | `MIGRATE_TERMINAL`     | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.migrate(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#migrate) (or similar functions on other payment terminals) on an address' behalf. To migrate, the project must have [`allowTerminalMigration`](/dev/api/data-structures/jbfundingcyclemetadata/). |
| 5     | `PROCESS_FEES`         | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.processFees(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#processfees) (or similar functions on other terminals) on an address' behalf. See [_Hold fees_](/dev/learn/glossary/hold-fees/).                                                              |
| 6     | `SET_METADATA`         | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBProjects.setMetadataOf(...)`](/dev/api/contracts/jbprojects/write/setmetadataof/) on an address' behalf.                                                                                                                                                                                                                                      |
| 7     | `ISSUE`                | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBTokenStore.issueFor(...)`](/dev/api/contracts/jbtokenstore/write/issuefor/) on an address' behalf. This issues an ERC-20 token for a project's token holders to claim.                                                                                                                                                                        |
| 8     | `SET_TOKEN`            | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBTokenStore.setFor(...)`](/dev/api/contracts/jbtokenstore/write/setfor/) on an address' behalf. This sets a project's token (if not already set).                                                                                                                                                                                              |
| 9     | `MINT`                 | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBTokenStore.mintFor(...)`](/dev/api/contracts/jbtokenstore/write/mintfor/) on an address' behalf. [`allowMinting`](/dev/api/data-structures/jbfundingcyclemetadata/) must be enabled to mint project tokens.                                                                                                                                   |
| 10    | `BURN`                 | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBController3_1.burnTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#burntokensof) on an address' behalf. This burns a token holder's supply.                                                                                                                                                                                 |
| 11    | `CLAIM`                | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBTokenStore.claimFor(...)`](/dev/api/contracts/jbtokenstore/write/claimfor/) on an address' behalf. This claims internally tracked (unclaimed) tokens as a project's ERC-20.                                                                                                                                                                   |
| 12    | `TRANSFER`             | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBTokenStore.transferFrom(...)`](/dev/api/contracts/jbtokenstore/write/transferfrom/) on an address' behalf. [`pauseTransfers`](/dev/api/data-structures/jbglobalfundingcyclemetadata/) must be false to transfer unclaimed (internally tracked) tokens.                                                                                        |
| 13    | `REQUIRE_CLAIM`        | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBTokenStore.shouldRequireClaimingFor(...)`](/dev/deprecated/v2/contracts/jbtokenstore/write/shouldrequireclaimingfor/) on an address' behalf, forcing all future tokens to be claimed (as ERC-20). This function (and the corresponding permission) have been deprecated in Juicebox v3.                                                       |
| 14    | `SET_CONTROLLER`       | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBDirectory.setControllerOf(...)`](/dev/api/contracts/jbdirectory/write/setcontrollerof/) on an address' behalf. To set new controller(s), the project must have [`allowSetController`](/dev/api/data-structures/jbglobalfundingcyclemetadata/) enabled.                                                                                        |
| 15    | `SET_TERMINALS`        | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBDirectory.setTerminalsOf(...)`](/dev/api/contracts/jbdirectory/write/setterminalsof/) on an address' behalf. To set new terminal(s), the project must have [`allowSetTerminals`](/dev/api/data-structures/jbglobalfundingcyclemetadata/) enabled.                                                                                             |
| 16    | `SET_PRIMARY_TERMINAL` | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBDirectory.setPrimaryTerminalOf(...)`](/dev/api/contracts/jbdirectory/write/setprimaryterminalof/) on an address' behalf.                                                                                                                                                                                                                      |
| 17    | `USE_ALLOWANCE`        | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBPayoutRedemptionPaymentTerminal3_1_1.useAllowanceOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#useallowanceof) (or similar functions on other terminals) on an address' behalf. This uses a project's [overflow allowance](/dev/learn/glossary/overflow/).                                |
| 18    | `SET_SPLITS`           | [`JBOperations`](/dev/api/libraries/jboperations/)                                   | Allow an operator to call [`JBSplitsStore.set(...)`](/dev/api/contracts/jbsplitsstore/write/set/) on an address' behalf. This sets a project's [splits](/dev/learn/glossary/splits/).                                                                                                                                                                                       |
| 19    | `SET_ENS_NAME_FOR`     | [`JBOperations2`](/dev/api/libraries/jboperations2/)                                 | Allow an operator to call [`JBProjectHandles.setEnsNamePartsFor(...)`](/dev/api/contracts/or-utilities/jbprojecthandles/write/setensnamepartsfor/) on an address' behalf, associating an ENS name with a project.                                                                                                                                                           |
| 20    | `SET_TOKEN_URI`        | [`JBUriOperations`](/dev/extensions/juice-token-resolver/libraries/jburioperations/) | Allow an operator to call [`TokenUriResolver.setTokenUriResolverForProject(...)`](/dev/extensions/juice-token-resolver/tokenuriresolver/#settokenuriresolverforproject), setting a project's [`IJBTokenUriResolver`](/dev/api/interfaces/ijbtokenuriresolver/). This is the URI resolver used for the [Project NFT](/dev/build/project-nft/).                               |
| 21    | `ADJUST_TIERS`         | [`JB721Operations`](/dev/extensions/juice-721-delegate/libraries/jb721operations/)   | Allow an operator to call [`JBTiered721Delegate.adjustTiers(...)`](/dev/extensions/juice-721-delegate/jbtiered721delegate/#adjusttiers) on an address' behalf.                                                                                                                                                                                                              |
| 22    | `UPDATE_METADATA`      | [`JB721Operations`](/dev/extensions/juice-721-delegate/libraries/jb721operations/)   | Allow an operator to call [`JBTiered721Delegate.setMetadata(...)`](/dev/extensions/juice-721-delegate/jbtiered721delegate/#setmetadata) on an addresses' behalf.                                                                                                                                                                                                            |
| 23    | `MINT`                 | [`JB721Operations`](/dev/extensions/juice-721-delegate/libraries/jb721operations/)   | Allow an operator to call [`JBTiered721Delegate.mintFor(...)`](/dev/extensions/juice-721-delegate/jbtiered721delegate/#mintfor) on an addresses' behalf.                                                                                                                                                                                                                    |
| 24 | `SET_POOL_PARAMS` | [`JBBuybackDelegateOperations`](/dev/extensions/juice-buyback/libraries/jbbuybackdelegateoperations/) | Allow an operator to call [`JBGenericBuybackDelegate.changeSecondsAgo(...)`](/dev/extensions/juice-buyback/jbgenericbuybackdelegate/#changesecondsago) or [`JBGenericBuybackDelegate.setTwapDelta(...)`](/dev/extensions/juice-buyback/jbgenericbuybackdelegate/#settwapdelta) on an addresses' behalf.|
| 25 | `CHANGE_POOL` | [`JBBuybackDelegateOperations`](/dev/extensions/juice-buyback/libraries/jbbuybackdelegateoperations/) | Allow an operator to call [`JBGenericBuybackDelegate.setPoolFor(...)`](/dev/extensions/juice-buyback/jbgenericbuybackdelegate/#setpoolfor) on an addresses' behalf. |

## Delegate IDs

When paying a Juicebox project with a [delegate](/dev/learn/glossary/delegate/), clients must pass the appropriate metadata in the [`JBDidPayData3_1_1`](/dev/api/data-structures/jbdidpaydata3_1_1/) (or the [`JBDidPayData`](/dev/api/data-structures/jbdidpaydata/) for projects using older payment terminals). The same is true for redemptions and the [`JBDidRedeemData3_1_1`](/dev/api/data-structures/jbdidredeemdata3_1_1/) (or [`JBDidRedeemData`](/dev/api/data-structures/jbdidredeemdata/) for projects using older payment terminals).

This metadata must explicitly specify the delegate being interacted with. For older delegates, this is typically the `interfaceId` of the delegate's interface. Newer delegates are identified by a 4 byte ID specified in the constructor arguments, which can be read by calling a delegate's `delegateId()` view function:

```
function delegateId() external view returns (bytes4);
```

The deploy script defaults for notable delegates have been compiled below:

| Delegate | delegateId |
| --- | --- |
| [`juice-buyback`](/dev/extensions/juice-buyback/) | [`BUYB`](https://github.com/jbx-protocol/juice-buyback/blob/9188f091347816c201097ae704fbf2c66b22d495/contracts/scripts/Deploy.s.sol#L26C43-L26C47) |
| [`juice-721-delegate`](/dev/extensions/juice-721-delegate/) | [`721P`](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/scripts/Deploy.s.sol#L22C44-L22C48) |
| [`juice-721-delegate`](/dev/extensions/juice-721-delegate/) | [`721R`](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/scripts/Deploy.s.sol#L23) |

Frontends interacting with newer delegates can use [`JBMetadata-Helper`](https://github.com/simplemachine92/JBMetadata-Helper) to simplify this process.

## Splits Groups

Juicebox projects store [splits](/dev/learn/glossary/splits/) for an arbitrary number of groups, each corresponding to a specific kind of distribution (such as ETH payouts or reserved tokens). Each one of these groups corresponds to a specific index:

| Index | Name              | Found on                                               | Description                                                                                                                                                                                                              |
| ----- | ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | `ETH_PAYOUT`      | [`JBSplitsGroups`](/dev/api/libraries/jbsplitsgroups/) | Used when distributing ETH payouts via [`JBPayoutRedemptionPaymentTerminal3_1_1.distributePayoutsOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#distributepayoutsof). |
| 2     | `RESERVED_TOKENS` | [`JBSplitsGroups`](/dev/api/libraries/jbsplitsgroups/) | Used when distributing [reserved tokens](/dev/learn/glossary/reserved-tokens/).                                                                                                                                          |

These groups must be specified when passing [`JBGroupedSplits`](/dev/api/data-structures/jbgroupedsplits/) to a function such as:

- [`JBController3_1.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor)
- [`JBController3_1.launchFundingCyclesFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#launchfundingcyclesfor)
- [`JBController3_1.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof)
- [`JBSplitsStore.set(...)`](/dev/api/contracts/jbsplitsstore/write/set/)

You can find a terminal's splits group index by accessing the relevant [`JBPayoutRedemptionPaymentTerminal3_1_1.payoutSplitsGroup`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#payoutsplitsgroup) property.

## Currency Prices

Juicebox uses [`JBPrices`](/dev/api/contracts/jbprices/) to manage and normalize prices for various currencies, with each currency having its own index:

| Index | Name  | Found on                                           | Description                                                                                                                                                                                                                                                                         |
| ----- | ----- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `ETH` | [`JBCurrencies`](/dev/api/libraries/jbcurrencies/) | 1 ETH = 1 ETH.                                                                                                                                                                                                                                                                      |
| 2     | `USD` | [`JBCurrencies`](/dev/api/libraries/jbcurrencies/) | Uses [`JBChainlinkV3PriceFeed`](/dev/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/), a generalized price feed for Chainlink's [`AggregatorV3Interface`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol). |

The protocol uses this to allow projects to do their accounting in any number of currencies, but manage all funds in ETH or other assets (regardless of accounting denomination). Price feeds must adhere to [`IJBPriceFeed`](/dev/api/interfaces/ijbpricefeed/). New price feeds can be added via [`JBPrices.addFeedFor(...)`](/dev/api/contracts/jbprices/write/addfeed/), which can only be called by the [JuiceboxDAO multisig](/dev/learn/administration/).

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
| [`IJBAllowanceTerminal3_1`](/dev/api/interfaces/ijballowanceterminal3_1)                                 | `0xa02f801c` |
| [`IJBAllowanceTerminal`](/dev/api/interfaces/ijballowanceterminal)                                       | `0xbc8926e9` |
| [`IJBController3_0_1`](/dev/api/interfaces/ijbcontroller3_0_1)                                           | `0x7c5a29e6` |
| [`IJBController3_1`](/dev/api/interfaces/ijbcontroller3_1)                                               | `0x8cbbedc0` |
| [`IJBController`](/dev/api/interfaces/ijbcontroller)                                                     | `0x85e36899` |
| [`IJBControllerUtility`](/dev/api/interfaces/ijbcontrollerutility)                                       | `0xc41c2f24` |
| [`IJBDirectory`](/dev/api/interfaces/ijbdirectory)                                                       | `0x4ecdb66b` |
| [`IJBETHERC20ProjectPayerDeployer`](/dev/api/interfaces/ijbetherc20projectpayerdeployer)                 | `0x5be94a6f` |
| [`IJBETHERC20SplitsPayerDeployer`](/dev/api/interfaces/ijbetherc20splitspayerdeployer)                   | `0x3715a283` |
| [`IJBFeeGauge3_1`](/dev/api/interfaces/ijbfeegauge3_1)                                                   | `0x192dd609` |
| [`IJBFeeGauge`](/dev/api/interfaces/ijbfeegauge)                                                         | `0x77695896` |
| [`IJBFeeHoldingTerminal`](/dev/api/interfaces/ijbfeeholdingterminal)                                     | `0xc715967a` |
| [`IJBFundAccessConstraintsStore`](/dev/api/interfaces/ijbfundaccessconstraintsstore)                     | `0xa65abb63` |
| [`IJBFundingCycleBallot`](/dev/api/interfaces/ijbfundingcycleballot)                                     | `0x7ba3dfb3` |
| [`IJBFundingCycleDataSource3_1_1`](/dev/api/interfaces/ijbfundingcycledatasource3_1_1)                   | `0x71700c69` |
| [`IJBFundingCycleDataSource`](/dev/api/interfaces/ijbfundingcycledatasource)                             | `0x71700c69` |
| [`IJBFundingCycleStore`](/dev/api/interfaces/ijbfundingcyclestore)                                       | `0xd9590add` |
| [`IJBMigratable`](/dev/api/interfaces/ijbmigratable)                                                     | `0x3e8c615b` |
| [`IJBOperatable`](/dev/api/interfaces/ijboperatable)                                                     | `0xad007d63` |
| [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore)                                               | `0x9125fdae` |
| [`IJBPayDelegate3_1_1`](/dev/api/interfaces/ijbpaydelegate3_1_1)                                         | `0x6b204943` |
| [`IJBPayDelegate`](/dev/api/interfaces/ijbpaydelegate)                                                   | `0xda9ee8b7` |
| [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal)                                           | `0xc07370e4` |
| [`IJBPayoutRedemptionPaymentTerminal3_1_1`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal3_1_1) | `0x00000000` |
| [`IJBPayoutRedemptionPaymentTerminal3_1`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal3_1)     | `0xedb527eb` |
| [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal)           | `0xedb527eb` |
| [`IJBPayoutTerminal3_1`](/dev/api/interfaces/ijbpayoutterminal3_1)                                       | `0x4a4305c0` |
| [`IJBPayoutTerminal`](/dev/api/interfaces/ijbpayoutterminal)                                             | `0x2b267b4e` |
| [`IJBPriceFeed`](/dev/api/interfaces/ijbpricefeed)                                                       | `0x7a3c4c17` |
| [`IJBPrices`](/dev/api/interfaces/ijbprices)                                                             | `0x2730be0e` |
| [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer)                                                 | `0x7ddb72fc` |
| [`IJBProjects`](/dev/api/interfaces/ijbprojects)                                                         | `0xaa91a66f` |
| [`IJBRedemptionDelegate3_1_1`](/dev/api/interfaces/ijbredemptiondelegate3_1_1)                           | `0x0bf46e59` |
| [`IJBRedemptionDelegate`](/dev/api/interfaces/ijbredemptiondelegate)                                     | `0x2b13c58f` |
| [`IJBRedemptionTerminal`](/dev/api/interfaces/ijbredemptionterminal)                                     | `0xfe663f0f` |
| [`IJBSingleTokenPaymentTerminal`](/dev/api/interfaces/ijbsingletokenpaymentterminal)                     | `0x28960002` |
| [`IJBSingleTokenPaymentTerminalStore3_1_1`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore3_1_1) | `0x98d00da8` |
| [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore)           | `0x98d00da8` |
| [`IJBSplitAllocator`](/dev/api/interfaces/ijbsplitallocator)                                             | `0x9d740bfa` |
| [`IJBSplitsPayer`](/dev/api/interfaces/ijbsplitspayer)                                                   | `0x35d42f96` |
| [`IJBSplitsStore`](/dev/api/interfaces/ijbsplitsstore)                                                   | `0xd45e236b` |
| [`IJBPaymentTerminalUtility`](/dev/api/interfaces/ijbpaymentterminalutility)                             | `0xc41c2f24` |
| [`IJBToken`](/dev/api/interfaces/ijbtoken)                                                               | `0xc6805740` |
| [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore)                                                     | `0xb79436b1` |
| [`IJBTokenUriResolver`](/dev/api/interfaces/ijbtokenuriresolver)                                         | `0xda0544aa` |

## Metadata

Juicebox project metadata (such as a project's name, logo, and description) are stored on [IPFS](https://ipfs.tech/). A project's metadata IPFS hash can be found by accessing the [`JBProjects.metadataContentOf(...)`](/dev/api/contracts/jbprojects/properties/metadatacontentof/) property, which takes two arguments:

- `_projectId` is the ID of the project to which the metadata belongs.
- `_domain` is the **domain within which the metadata applies.**

As of 2023-04-13, all projects store their metadata within domain `0`, but future frontends or contracts with unique metadata needs might consider utilizing new domains.

#### Example

If one calls [`JBProjects.metadataContentOf(...)`](/dev/api/contracts/jbprojects/properties/metadatacontentof/) with `_projectId` as `1` and `_domain` as `0`, the contract will return the IPFS hash `QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF`.

Now, one can navigate to a [public IPFS gateway](https://ipfs.github.io/public-gateway-checker/) or a dedicated gateway (from [Infura](https://www.infura.io/), [Cloudflare](https://developers.cloudflare.com/web3/ipfs-gateway/), or another provider) to read the project's metadata:

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

See it yourself at [`https://ipfs.io/ipfs/QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF`](https://ipfs.io/ipfs/QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF). To learn more about IPFS, visit the [IPFS docs](https://docs.ipfs.tech/).

Also see [*Project Metadata*](/dev/frontend/metadata/).
