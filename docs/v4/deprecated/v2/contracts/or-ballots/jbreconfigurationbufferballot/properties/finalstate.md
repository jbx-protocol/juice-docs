# finalState

Contract: [`JBReconfigurationBufferBallot`](/docs/v4/deprecated/v2/contracts/or-ballots/jbreconfigurationbufferballot/README.md)

Interface: [`IJBReconfigurationBufferBallot`](/docs/v4/deprecated/v2/interfaces/ijbfundingcycleballot.md)

**The finalized state.**

_If `Active`, the ballot for the provided configuration can still be finalized whenever its state settles._

#### Definition

```
/**
  @notice
  The finalized state.

  @dev
  If `Active`, the ballot for the provided configuration can still be finalized whenever its state settles.

  _projectId The ID of the project to check the final ballot state of.
  _configuration The configuration of the funding cycle to check the final ballot state of.
*/
mapping(uint256 => mapping(uint256 => JBBallotState)) public override finalState;
```

* Arguments:
  * `_projectId` is the ID of the project to check the final ballot state of.
  * `_configuration` is the configuration of the funding cycle to check the final ballot state of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBReconfigurationBufferBallot`](/docs/v4/deprecated/v2/interfaces/ijbfundingcycleballot.md) interface.
