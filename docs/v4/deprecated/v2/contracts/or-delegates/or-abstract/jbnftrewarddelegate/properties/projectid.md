# projectId

Contract: [`JBNFTRewardDelegate`](/docs/v4/deprecated/v2/contracts/or-delegates/or-abstract/jbnftrewarddelegate/README.md)​‌

Interface: [`IJBNFTRewardDelegate`](/docs/v4/deprecated/v2/interfaces/ijbnftrewarddelegate.md)

**The ID of the project this NFT should be distributed for.**

#### Definition

```
/**
  @notice
  The ID of the project this NFT should be distributed for.
*/
uint256 public immutable override projectId;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBNFTRewardDelegate`](/docs/v4/deprecated/v2/interfaces/ijbnftrewarddelegate.md) interface.
