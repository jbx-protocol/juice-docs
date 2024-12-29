# unclaimedTotalSupplyOf

Contract: [`JBTokenStore`](/docs/v4/deprecated/v3/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/docs/v4/deprecated/v3/api/interfaces/ijbtokenstore.md)

**The total supply of unclaimed tokens for each project.**

#### Definition

```
/**
  @notice
  The total supply of unclaimed tokens for each project.

  _projectId The ID of the project to which the token belongs.
*/
mapping(uint256 => uint256) public override unclaimedTotalSupplyOf;
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/docs/v4/deprecated/v3/api/interfaces/ijbtokenstore.md) interface.
