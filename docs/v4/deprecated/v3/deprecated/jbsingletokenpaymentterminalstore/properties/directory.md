# directory

Contract: [`JBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md)

**The directory of terminals and controllers for projects.**

#### Definition

```
/**
  @notice
  The directory of terminals and controllers for projects.
*/
IJBDirectory public immutable override directory;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
