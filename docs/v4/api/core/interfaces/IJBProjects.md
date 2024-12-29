# IJBProjects
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBProjects.sol)

**Inherits:**
IERC721


## Functions
### count


```solidity
function count() external view returns (uint256);
```

### tokenUriResolver


```solidity
function tokenUriResolver() external view returns (IJBTokenUriResolver);
```

### createFor


```solidity
function createFor(address owner) external returns (uint256 projectId);
```

### setTokenUriResolver


```solidity
function setTokenUriResolver(IJBTokenUriResolver resolver) external;
```

## Events
### Create

```solidity
event Create(uint256 indexed projectId, address indexed owner, address caller);
```

### SetTokenUriResolver

```solidity
event SetTokenUriResolver(IJBTokenUriResolver indexed resolver, address caller);
```

