# projects

Contract: [`JBDirectory`](/dev/deprecated/v2/contracts/jbdirectory/README.md)​‌

Interface: [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md)

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
* The resulting function overrides a function definition from the [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md) interface.
