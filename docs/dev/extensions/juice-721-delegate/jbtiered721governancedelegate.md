# JBTiered721GovernanceDelegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/42d3a6d91f96ac82ae443fb9b5a22dd1ff8d398e/contracts/JBTiered721GovernanceDelegate.sol)

Mainnet: [`0xD4fA4D1BBcBCF1CE1288aaB1Fbd15a54237DF171`](https://etherscan.io/address/0xD4fA4D1BBcBCF1CE1288aaB1Fbd15a54237DF171)

Goerli: [`0x9EfA070f701CB107331C64c56539D29470C83Bd5`](https://goerli.etherscan.io/address/0x9EfA070f701CB107331C64c56539D29470C83Bd5)

Inherits: [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md), [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md)

A tiered 721 delegate where each NFT can be used for onchain governance.

## Functions

### constructor

```solidity
constructor(IJBProjects _projects, IJBOperatorStore _operatorStore) JBTiered721Delegate(_projects, _operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IJBProjects`](/docs/dev/api/interfaces/ijbprojects.md)|The IJBProjects that will be used to check project ownership.|
|`_operatorStore`|[`IJBOperatorStore`](/docs/dev/api/interfaces/ijboperatorstore.md)|The operatorStore that will be used to check operator permissions.|

### _getVotingUnits

The total voting units the provided address has from its NFTs across all tiers. NFTs have a tier-specific number of voting units.

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

Handles voting unit accounting within a tier.

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
|`_tokenId`|`uint256`|The token ID for which voting units are being transferred.|
|`_tier`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|The tier that the token ID is part of.|

