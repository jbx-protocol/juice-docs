# IJBOwnable

[Git Source](https://github.com/jbx-protocol/juice-ownable/blob/b2f98133c7bea013db967e8a204ce0d9cc06d21f/src/interfaces/IJBOwnable.sol)

## Functions

### jbOwner

```solidity
function jbOwner() external view returns (address owner, uint88 projectOwner, uint8 permissionIndex);
```

### transferOwnershipToProject

```solidity
function transferOwnershipToProject(uint256 _projectId) external;
```

### setPermissionIndex

```solidity
function setPermissionIndex(uint8 _permissionIndex) external;
```

## Events

### PermissionIndexChanged

```solidity
event PermissionIndexChanged(uint8 newIndex);
```

