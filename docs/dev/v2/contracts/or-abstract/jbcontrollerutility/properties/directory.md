# directory

Contract: [`JBControllerUtility`](/docs/dev/v2/contracts/or-abstract/jbcontrollerutility/README.md)​‌

Interface: [`IJBControllerUtility`](/docs/dev/v2/interfaces/ijbcontrollerutility.md)

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
* The resulting function overrides a function definition from the [`IJBControllerUtility`](/docs/dev/v2/interfaces/ijbcontrollerutility.md) interface.
