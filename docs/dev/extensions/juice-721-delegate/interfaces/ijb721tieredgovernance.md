# IJB721TieredGovernance

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/interfaces/IJB721TieredGovernance.sol)

Inherits: [`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)

## Functions

### getTierDelegate

```solidity
function getTierDelegate(address _account, uint256 _tier) external view returns (address);
```

### getTierVotes

```solidity
function getTierVotes(address _account, uint256 _tier) external view returns (uint256);
```

### getPastTierVotes

```solidity
function getPastTierVotes(address _account, uint256 _tier, uint256 _blockNumber) external view returns (uint256);
```

### getTierTotalVotes

```solidity
function getTierTotalVotes(uint256 _tier) external view returns (uint256);
```

### getPastTierTotalVotes

```solidity
function getPastTierTotalVotes(uint256 _tier, uint256 _blockNumber) external view returns (uint256);
```

### setTierDelegate

```solidity
function setTierDelegate(address _delegatee, uint256 _tierId) external;
```

### setTierDelegates

```solidity
function setTierDelegates(JBTiered721SetTierDelegatesData[] memory _setTierDelegatesData) external;
```

## Events

### TierDelegateChanged

```solidity
event TierDelegateChanged(
    address indexed delegator, address indexed fromDelegate, address indexed toDelegate, uint256 tierId, address caller
);
```

### TierDelegateVotesChanged

```solidity
event TierDelegateVotesChanged(
    address indexed delegate, uint256 indexed tierId, uint256 previousBalance, uint256 newBalance, address caller
);
```

### DelegateChanged

```solidity
event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
```

