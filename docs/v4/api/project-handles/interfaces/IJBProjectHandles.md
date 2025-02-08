# IJBProjectHandles
[Git Source](https://github.com/Bananapus/nana-project-handles/blob/53556219071dc0b4c7411da3160eeb155cfebf78/src/interfaces/IJBProjectHandles.sol)


## Functions
### TEXT_KEY


```solidity
function TEXT_KEY() external view returns (string memory);
```

### ENS_REGISTRY


```solidity
function ENS_REGISTRY() external view returns (ENS);
```

### ensNamePartsOf


```solidity
function ensNamePartsOf(
    uint256 chainId,
    uint256 projectId,
    address projectOwner
)
    external
    view
    returns (string[] memory);
```

### handleOf


```solidity
function handleOf(uint256 chainId, uint256 projectId, address projectOwner) external view returns (string memory);
```

### setEnsNamePartsFor


```solidity
function setEnsNamePartsFor(uint256 chainId, uint256 projectId, string[] memory parts) external;
```

## Events
### SetEnsNameParts

```solidity
event SetEnsNameParts(uint256 indexed projectId, string handle, string[] parts, address caller);
```

