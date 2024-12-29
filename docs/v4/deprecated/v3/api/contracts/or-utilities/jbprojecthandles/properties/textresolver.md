# textResolver

Contract: [`JBProjectHandles`](/v4/deprecated/v3/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/v4/deprecated/v3/api/interfaces/ijbprojecthandles.md)

**The ENS text resolver contract address.**

#### Definition

```
/**
  @notice
  The ENS text resolver contract address.
*/
ITextResolver public immutable override textResolver;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectHandles`](/v4/deprecated/v3/api/interfaces/ijbprojecthandles.md) interface.
