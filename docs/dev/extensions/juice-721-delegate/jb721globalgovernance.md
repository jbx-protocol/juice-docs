# JB721GlobalGovernance

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/JB721GlobalGovernance.sol)

Mainnet: [`0x401B114e2cE98EE8a01A96D91e0185b0937F7BDc`](https://etherscan.io/address/0x401B114e2cE98EE8a01A96D91e0185b0937F7BDc)

Goerli: [`0xB3344d2ebE52e83E718f59B16eDFDa37d5370a26`](https://goerli.etherscan.io/address/0xB3344d2ebE52e83E718f59B16eDFDa37d5370a26)

Inherits: [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md), [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md)

A tiered 721 delegate where each NFT can be used for on chain governance, with votes delegatable globally across all tiers.

Inherits from -
- [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md):  The tiered 721 delegate.
- [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md):  A helper for voting balance snapshots.

## Functions

### _getVotingUnits

The voting units for an account from its NFTs across all tiers. NFTs have a tier-specific preset number of voting units.

```solidity
function _getVotingUnits(address _account) internal view virtual override returns (uint256 units);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to get voting units for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`units`|`uint256`|The voting units for the account.|

### _afterTokenTransferAccounting

handles the tier voting accounting

```solidity
function _afterTokenTransferAccounting(address _from, address _to, uint256 _tokenId, JB721Tier memory _tier)
    internal
    virtual
    override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The account to transfer voting units from.|
|`_to`|`address`|The account to transfer voting units to.|
|`_tokenId`|`uint256`|The id of the token for which voting units are being transferred.|
|`_tier`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|The tier the token id is part of|

