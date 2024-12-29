# IJBFeelessAddresses
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBFeelessAddresses.sol)


## Functions
### isFeeless


```solidity
function isFeeless(address account) external view returns (bool);
```

### setFeelessAddress


```solidity
function setFeelessAddress(address account, bool flag) external;
```

## Events
### SetFeelessAddress

```solidity
event SetFeelessAddress(address indexed addr, bool indexed isFeeless, address caller);
```

