# JBTiered721GovernanceDelegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/JBTiered721GovernanceDelegate.sol)

Inherits: [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md), [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md)

A tiered 721 delegate where each NFT can be used for onchain governance.

## Functions

### constructor

```solidity
constructor(
    IJBDirectory _directory,
    IJBOperatorStore _operatorStore,
    bytes4 _payMetadataDelegateId,
    bytes4 _redeemMetadataDelegateId
) JBTiered721Delegate(_directory, _operatorStore, _payMetadataDelegateId, _redeemMetadataDelegateId);
```

**Parameters**

| Name                        | Type                                                               | Description                                                        |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `_directory`                | [`IJBDirectory`](/docs/dev/api/interfaces/ijbdirectory.md)         | A directory of terminals and controllers for projects.             |
| `_operatorStore`            | [`IJBOperatorStore`](/docs/dev/api/interfaces/ijboperatorstore.md) | The operatorStore that will be used to check operator permissions. |
| `_payMetadataDelegateId`    | `bytes4`                                                           | The 4bytes ID of this delegate, used for pay metadata parsing      |
| `_redeemMetadataDelegateId` | `bytes4`                                                           | The 4bytes ID of this delegate, used for redeem metadata parsing   |

### \_getVotingUnits

The total voting units the provided address has from its NFTs across all tiers. NFTs have a tier-specific number of voting units.

```solidity
function _getVotingUnits(address _account) internal view virtual override returns (uint256 units);
```

**Parameters**

| Name       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `_account` | `address` | The account to get voting units for. |

**Returns**

| Name    | Type      | Description                       |
| ------- | --------- | --------------------------------- |
| `units` | `uint256` | The voting units for the account. |

### \_afterTokenTransferAccounting

Handles voting unit accounting within a tier.

```solidity
function _afterTokenTransferAccounting(address _from, address _to, uint256 _tokenId, JB721Tier memory _tier)
    internal
    virtual
    override;
```

**Parameters**

| Name       | Type                                                                        | Description                                                |
| ---------- | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `_from`    | `address`                                                                   | The account to transfer voting units from.                 |
| `_to`      | `address`                                                                   | The account to transfer voting units to.                   |
| `_tokenId` | `uint256`                                                                   | The token ID for which voting units are being transferred. |
| `_tier`    | [`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md) | The tier that the token ID is part of.                     |
