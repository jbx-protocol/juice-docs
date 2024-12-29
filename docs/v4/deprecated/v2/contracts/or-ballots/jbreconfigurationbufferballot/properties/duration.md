# duration

Contract: [`JBReconfigurationBufferBallot`](/docs/v4/deprecated/v2/contracts/or-ballots/jbreconfigurationbufferballot/README.md)

Interface: [`IJBFundingCycleBallot`](/docs/v4/deprecated/v2/interfaces/ijbfundingcycleballot.md)

**The number of seconds that must pass for a funding cycle reconfiguration to become either `Approved` or `Failed`.**

#### Definition

```
/**
  @notice
  The number of seconds that must pass for a funding cycle reconfiguration to become either `Approved` or `Failed`.
*/
uint256 public immutable override duration;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBFundingCycleBallot`](/docs/v4/deprecated/v2/interfaces/ijbfundingcycleballot.md) interface.
