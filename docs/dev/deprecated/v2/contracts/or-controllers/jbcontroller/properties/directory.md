# directory

Contract: [`JBController`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md)

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
* The resulting function overrides a function definition from the [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md) interface.
