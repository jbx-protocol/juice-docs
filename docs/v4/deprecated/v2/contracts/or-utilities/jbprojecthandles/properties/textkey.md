# TEXT_KEY

Contract: [`JBProjectHandles`](/docs/v4/deprecated/v2/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/docs/v4/deprecated/v2/interfaces/ijbprojecthandles.md)

**The key of the ENS text record.**

#### Definition

```
/**
  @notice
  The key of the ENS text record.
*/
string public constant TEXT_KEY = 'juicebox_project_id';
```

* This value must be hardcoded.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectHandles`](/docs/v4/deprecated/v2/interfaces/ijbprojecthandles.md) interface.