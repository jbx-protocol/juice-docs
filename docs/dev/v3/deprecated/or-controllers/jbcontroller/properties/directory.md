# directory

Contract: [`JBController`](/docs/dev/v3/deprecated/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/docs/dev/v3/interfaces/ijbcontroller.md)

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
* The resulting function overrides a function definition from the [`IJBController`](/docs/dev/v3/interfaces/ijbcontroller.md) interface.
