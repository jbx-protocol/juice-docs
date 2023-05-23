# JBTiered721GovernanceDelegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/JBTiered721GovernanceDelegate.sol)

Mainnet: [`0xd72065178Ad5Ca60b33153f883572A52A080531d`](https://etherscan.io/address/0xd72065178Ad5Ca60b33153f883572A52A080531d)

Goerli: [`0x84C965522bE83dC925726B3Cc4288c089D5Abe9a`](https://goerli.etherscan.io/address/0x84C965522bE83dC925726B3Cc4288c089D5Abe9a)

Inherits: [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md), [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md)

A tiered 721 delegate where each NFT can be used for on chain governance, with votes delegatable globally across all tiers.

Inherits from -
- [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md):  The tiered 721 delegate.
- [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md):  A helper for voting balance snapshots.

## Functions

### constructor

```solidity
constructor(IJBProjects _projects, IJBOperatorStore _operatorStore) JBTiered721Delegate(_projects, _operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IJBProjects`](/docs/dev/api/interfaces/ijbprojects.md)|the IJBProjects that will be used to check ownership of a project|
|`_operatorStore`|[`IJBOperatorStore`](/docs/dev/api/interfaces/ijboperatorstore.md)|the operatorStore to be used to check permissions|

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

