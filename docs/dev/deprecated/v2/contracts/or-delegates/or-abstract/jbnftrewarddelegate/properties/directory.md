# directory

Contract: [`JBNFTRewardDelegate`](/dev/deprecated/v2/contracts/or-delegates/or-abstract/jbnftrewarddelegate/README.md)​‌

Interface: [`IJBNFTRewardDelegate`](/dev/deprecated/v2/interfaces/ijbnftrewarddelegate.md)

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
* The resulting function overrides a function definition from the [`IJBNFTRewardDelegate`](/dev/deprecated/v2/interfaces/ijbnftrewarddelegate.md) interface.
