# IOperatorStore

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IOperatorStore.sol)

## Functions

### permissionsOf

```solidity
function permissionsOf(address _operator, address _account, uint256 _domain) external view returns (uint256);
```

### hasPermission

```solidity
function hasPermission(address _operator, address _account, uint256 _domain, uint256 _permissionIndex)
    external
    view
    returns (bool);
```

### hasPermissions

```solidity
function hasPermissions(address _operator, address _account, uint256 _domain, uint256[] calldata _permissionIndexes)
    external
    view
    returns (bool);
```

### setOperator

```solidity
function setOperator(address _operator, uint256 _domain, uint256[] calldata _permissionIndexes) external;
```

### setOperators

```solidity
function setOperators(
    address[] calldata _operators,
    uint256[] calldata _domains,
    uint256[][] calldata _permissionIndexes
) external;
```

## Events

### SetOperator

```solidity
event SetOperator(
    address indexed operator,
    address indexed account,
    uint256 indexed domain,
    uint256[] permissionIndexes,
    uint256 packed
);
```

