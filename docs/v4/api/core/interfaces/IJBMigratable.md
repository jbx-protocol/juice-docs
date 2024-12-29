# IJBMigratable
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBMigratable.sol)

**Inherits:**
IERC165


## Functions
### migrate


```solidity
function migrate(uint256 projectId, IERC165 to) external;
```

### receiveMigrationFrom


```solidity
function receiveMigrationFrom(IERC165 from, uint256 projectId) external;
```

## Events
### Migrate

```solidity
event Migrate(uint256 indexed projectId, IERC165 to, address caller);
```

