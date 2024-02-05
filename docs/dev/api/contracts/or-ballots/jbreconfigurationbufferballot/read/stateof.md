# stateOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBReconfigurationBufferBallot`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot)

Interface: [`IJBFundingCycleBallot`](/dev/api/contracts/interfaces/ijbreconfigurationbufferballot)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The approval state of a particular funding cycle.**

### Definition

```
function stateOf(
  uint256 _projectId,
  uint256 _configured,
  uint256 _start
) public view override returns (JBBallotState)  { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funding cycle being checked belongs.
  * `_configured` is the configuration of the funding cycle to check the state of.
  * `_start` is the start timestamp of the funding cycle to check the state of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBFundingCycleBallot`](/dev/api/interfaces/ijbfundingcycleballot.md) interface.
* The function returns the state of the provided ballot.

#### Body

1.  The ballot is failed if the start time of the funding cycle is

    ```
    // If the provided configured timestamp is after the start timestamp, the ballot is Failed.
    if (_configured > _start) return JBBallotState.Failed;
    ```

    _Enums used:_

    * [`JBBallotState`](/dev/api/enums/jbballotstate.md)
      * `.Failed`

2.  If the configuration took place before the funding cycle's start with sufficient time to cover this ballot's duration, it is approved. Otherwise, it is failed.

    ```
    unchecked {
      // If there was sufficient time between configuration and the start of the cycle, it is approved. Otherwise, it is failed.
      return (_start - _configured < duration) ? JBBallotState.Failed : JBBallotState.Approved;
    }
    ```

    _Enums used:_

    * [`JBBallotState`](/dev/api/enums/jbballotstate.md)
      * `.Failed`
      * `.Approved`

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The approval state of a particular funding cycle.

  @param _projectId The ID of the project to which the funding cycle being checked belongs.
  @param _configured The configuration of the funding cycle to check the state of.
  @param _start The start timestamp of the funding cycle to check the state of.

  @return The state of the provided ballot.
*/
function stateOf(
  uint256 _projectId,
  uint256 _configured,
  uint256 _start
) public view override returns (JBBallotState) {
  _projectId; // Prevents unused var compiler and natspec complaints.

  // If the provided configured timestamp is after the start timestamp, the ballot is Failed.
  if (_configured > _start) return JBBallotState.Failed;

  unchecked {
    // If there was sufficient time between configuration and the start of the cycle, it is approved. Otherwise, it is failed.
    return (_start - _configured < duration) ? JBBallotState.Failed : JBBallotState.Approved;
  }
}
```

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
