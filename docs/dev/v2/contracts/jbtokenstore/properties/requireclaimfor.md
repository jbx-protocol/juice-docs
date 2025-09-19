# requireClaimFor

Contract: [`JBTokenStore`](/docs/dev/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/docs/dev/v2/interfaces/ijbtokenstore.md)

**A flag indicating if tokens are required to be issued as claimed for a particular project.**

#### Definition

```
/**
  @notice
  A flag indicating if tokens are required to be issued as claimed for a particular project.

  _projectId The ID of the project to which the requirement applies.
*/
mapping(uint256 => bool) public override requireClaimFor;
```

* Arguments:
  * `_projectId` is the ID of the project to which the requirement applies.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/docs/dev/v2/interfaces/ijbtokenstore.md) interface.
