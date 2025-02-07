# IJBOwnable
[Git Source](https://github.com/Bananapus/nana-ownable/blob/a74b3181e75adaf0ee0c93cb00bcc5709ca8f314/src/interfaces/IJBOwnable.sol)


## Functions
### PROJECTS


```solidity
function PROJECTS() external view returns (IJBProjects);
```

### jbOwner


```solidity
function jbOwner() external view returns (address owner, uint88 projectOwner, uint8 permissionId);
```

### owner


```solidity
function owner() external view returns (address);
```

### renounceOwnership


```solidity
function renounceOwnership() external;
```

### setPermissionId


```solidity
function setPermissionId(uint8 permissionId) external;
```

### transferOwnership


```solidity
function transferOwnership(address newOwner) external;
```

### transferOwnershipToProject


```solidity
function transferOwnershipToProject(uint256 projectId) external;
```

## Events
### PermissionIdChanged

```solidity
event PermissionIdChanged(uint8 newId, address caller);
```

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner, address caller);
```

