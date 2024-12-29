# projects

Contract: [`JBDirectory`](/v4/deprecated/v3/api/contracts/jbdirectory/)​‌

Interface: [`IJBDirectory`](/v4/deprecated/v3/api/interfaces/ijbdirectory.md)

**Mints ERC-721's that represent project ownership and transfers.**

#### Definition

```
/**
  @notice
  Mints ERC-721's that represent project ownership and transfers.
*/
IJBProjects public immutable override projects;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBDirectory`](/v4/deprecated/v3/api/interfaces/ijbdirectory.md) interface.
