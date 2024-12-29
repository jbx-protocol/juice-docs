# projects

Contract: [`JBTokenStore`](/docs/v4/deprecated/v3/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/docs/v4/deprecated/v3/api/interfaces/ijbtokenstore.md)

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
* The resulting function overrides a function definition from the [`IJBTokenStore` ](/docs/v4/deprecated/v3/api/interfaces/ijbtokenstore.md) interface.
