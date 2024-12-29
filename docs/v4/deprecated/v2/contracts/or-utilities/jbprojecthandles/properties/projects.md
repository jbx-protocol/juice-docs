# projects

Contract: [`JBProjectHandles`](/v4/deprecated/v2/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/v4/deprecated/v2/interfaces/ijbprojecthandles.md)

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
* The resulting function overrides a function definition from the [`IJBProjectHandles`](/v4/deprecated/v2/interfaces/ijbprojecthandles.md) interface.
