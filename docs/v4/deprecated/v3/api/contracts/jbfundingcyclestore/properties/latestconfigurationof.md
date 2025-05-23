# latestConfigurationOf

Contract: [`JBFundingCycleStore`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/README.md)​‌

**The latest funding cycle configuration for each project.**

#### Definition

```
/**
  @notice
  The latest funding cycle configuration for each project.

  _projectId The ID of the project to get the latest funding cycle configuration of.
*/
mapping(uint256 => uint256) public override latestConfigurationOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the latest funding cycle configuration of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBFundingCycleStore`](/docs/v4/deprecated/v3/api/interfaces/ijbfundingcyclestore.md) interface.
