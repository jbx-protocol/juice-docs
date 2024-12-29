# JBGlobalFundingCycleMetadata

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/structs/JBGlobalFundingCycleMetadata.sol

#### Definition

```
/**
  @member allowSetTerminals A flag indicating if setting terminals should be allowed during this funding cycle.
  @member allowSetController A flag indicating if setting a new controller should be allowed during this funding cycle.
  @member pauseTransfers A flag indicating if the project token transfer functionality should be paused during the funding cycle.
*/
struct JBGlobalFundingCycleMetadata {
  bool allowSetTerminals;
  bool allowSetController;
  bool pauseTransfers;
}

```

* `allowSetTerminals` is a flag indicating if setting terminals should be allowed during this funding cycle.
* `allowSetController` is a flag indicating if setting a new controller should be allowed during this funding cycle.
* `pauseTransfers` is a flag indicating if the project token transfer functionality should be paused during the funding cycle.