# controllerOf

Contract: [`JBDirectory`](/docs/v4/deprecated/v2/contracts/jbdirectory/README.md)​‌

Interface: [`IJBDirectory`](/docs/v4/deprecated/v2/interfaces/ijbdirectory.md)

**For each project ID, the controller that manages how terminals interact with tokens and funding cycles.**

#### Definition

```
/**
  @notice
  For each project ID, the controller that manages how terminals interact with tokens and funding cycles.

  _projectId The ID of the project to get the controller of.
*/
mapping(uint256 => address) public override controllerOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the controller of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBDirectory`](/docs/v4/deprecated/v2/interfaces/ijbdirectory.md) interface.
