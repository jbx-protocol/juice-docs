# JB721TieredGovernance

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/JB721TieredGovernance.sol)

Mainnet: [`0xe7d87a529DdEf757500B2859fC8D945F1B73CBc5`](https://etherscan.io/address/0xe7d87a529DdEf757500B2859fC8D945F1B73CBc5)

Goerli: [`0x441d1Bd20149391228Da95273e2e11a37Ce52Fb5`](https://goerli.etherscan.io/address/0x441d1Bd20149391228Da95273e2e11a37Ce52Fb5)

Inherits: [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md), [`IJB721TieredGovernance`](/docs/dev/extensions/juice-721-delegate/interfaces/ijb721tieredgovernance.md)

A tiered 721 delegate where each NFT can be used for on chain governance, with votes delegatable per tier.

Adheres to -
- [`IJB721TieredGovernance`](/docs/dev/extensions/juice-721-delegate/interfaces/ijb721tieredgovernance.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

Inherits from -
- [`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md):  The tiered 721 delegate.
- [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md):  A helper for voting balance snapshots.

## State Variables

### _tierDelegation

The delegation status for each address and for each tier.
- _delegator The delegator.
- _tierId The ID of the tier being delegated.

```solidity
mapping(address => mapping(uint256 => address)) internal _tierDelegation;
```

### _delegateTierCheckpoints

The delegation checkpoints for each address and for each tier.
- _delegator The delegator.
- _tierId The ID of the tier being delegated.

```solidity
mapping(address => mapping(uint256 => Checkpoints.History)) internal _delegateTierCheckpoints;
```

### _totalTierCheckpoints

The total delegation status for each tier.
- _tierId The ID of the tier being delegated.

```solidity
mapping(uint256 => Checkpoints.History) internal _totalTierCheckpoints;
```

## Functions

### getTierDelegate

Returns the delegate of an account for specific tier.

```solidity
function getTierDelegate(address _account, uint256 _tier) external view override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to check for a delegate of.|
|`_tier`|`uint256`|the tier to check within.|

### getTierVotes

Returns the current voting power of an address for a specific tier.

```solidity
function getTierVotes(address _account, uint256 _tier) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address to check.|
|`_tier`|`uint256`|The tier to check within.|

### getPastTierVotes

Returns the past voting power of a specific address for a specific tier.

```solidity
function getPastTierVotes(address _account, uint256 _tier, uint256 _blockNumber)
    external
    view
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address to check.|
|`_tier`|`uint256`|The tier to check within.|
|`_blockNumber`|`uint256`|the blocknumber to check the voting power at.|

### getTierTotalVotes

Returns the total amount of voting power that exists for a tier.

```solidity
function getTierTotalVotes(uint256 _tier) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint256`|The tier to check.|

### getPastTierTotalVotes

Returns the total amount of voting power that exists for a tier.

```solidity
function getPastTierTotalVotes(uint256 _tier, uint256 _blockNumber) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint256`|The tier to check.|
|`_blockNumber`|`uint256`|The blocknumber to check the total voting power at.|

### setTierDelegates

Delegates votes from the sender to `delegatee`.

```solidity
function setTierDelegates(JBTiered721SetTierDelegatesData[] memory _setTierDelegatesData) external virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_setTierDelegatesData`|[`JBTiered721SetTierDelegatesData[]`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721settierdelegatesdata.md)|An array of tiers to set delegates for.|

### setTierDelegate

Delegates votes from the sender to `delegatee`.

```solidity
function setTierDelegate(address _delegatee, uint256 _tierId) public virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegatee`|`address`|The account to delegate tier voting units to.|
|`_tierId`|`uint256`|The ID of the tier to delegate voting units for.|

### _getTierVotingUnits

Gets the amount of voting units an address has for a particular tier.

```solidity
function _getTierVotingUnits(address _account, uint256 _tierId) internal view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to get voting units for.|
|`_tierId`|`uint256`|The ID of the tier to get voting units for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The voting units.|

### _delegateTier

Delegate all of `account`'s voting units for the specified tier to `delegatee`.

```solidity
function _delegateTier(address _account, address _delegatee, uint256 _tierId) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account delegating tier voting units.|
|`_delegatee`|`address`|The account to delegate tier voting units to.|
|`_tierId`|`uint256`|The ID of the tier for which voting units are being transferred.|

### _transferTierVotingUnits

Transfers, mints, or burns tier voting units. To register a mint, `from` should be zero. To register a burn, `to` should be zero. Total supply of voting units will be adjusted with mints and burns.

```solidity
function _transferTierVotingUnits(address _from, address _to, uint256 _tierId, uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The account to transfer tier voting units from.|
|`_to`|`address`|The account to transfer tier voting units to.|
|`_tierId`|`uint256`|The ID of the tier for which voting units are being transferred.|
|`_amount`|`uint256`|The amount of voting units to delegate.|

### _moveTierDelegateVotes

Moves delegated tier votes from one delegate to another.

```solidity
function _moveTierDelegateVotes(address _from, address _to, uint256 _tierId, uint256 _amount) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The account to transfer tier voting units from.|
|`_to`|`address`|The account to transfer tier voting units to.|
|`_tierId`|`uint256`|The ID of the tier for which voting units are being transferred.|
|`_amount`|`uint256`|The amount of voting units to delegate.|

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
|`_tokenId`|`uint256`|The ID of the token for which voting units are being transferred.|
|`_tier`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|The tier the token ID is part of.|

### _add

```solidity
function _add(uint256 a, uint256 b) internal pure returns (uint256);
```

### _subtract

```solidity
function _subtract(uint256 a, uint256 b) internal pure returns (uint256);
```

## Errors

### BLOCK_NOT_YET_MINED

```solidity
error BLOCK_NOT_YET_MINED();
```

### DELEGATE_ADDRESS_ZERO

```solidity
error DELEGATE_ADDRESS_ZERO();
```

