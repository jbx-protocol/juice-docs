# projects

Contract: [`JBTokenStore`](/dev/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md)

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
* The resulting function overrides a function definition from the [`IJBTokenStore` ](/dev/deprecated/v2/interfaces/ijbtokenstore.md) interface.
