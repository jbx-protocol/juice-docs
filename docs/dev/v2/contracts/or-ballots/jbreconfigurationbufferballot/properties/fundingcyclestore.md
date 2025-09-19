# fundingCycleStore

Contract: [`JBReconfigurationBufferBallot`](/docs/dev/v2/contracts/or-ballots/jbreconfigurationbufferballot/README.md)

Interface: [`IJBReconfigurationBufferBallot`](/docs/dev/v2/interfaces/ijbfundingcycleballot.md)

**The contract storing all funding cycle configurations.**

#### Definition

```
/**
  @notice
  The contract storing all funding cycle configurations.
*/
IJBFundingCycleStore public immutable override fundingCycleStore;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBReconfigurationBufferBallot`](/docs/dev/v2/interfaces/ijbreconfigurationbufferballot.md) interface.
