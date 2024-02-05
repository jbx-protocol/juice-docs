# JBReconfigurationBufferBallot

_Manages approving funding cycle reconfigurations automatically after a buffer period._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBReconfigurationBufferBallot.sol

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBFundingCycleBallot`**](/dev/api/interfaces/ijbfundingcycleballot.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                          | Description                                                                                                                               |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC165`**](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165)                            |  Introspection on interface adherance.                      |

#### Constructor

```
/**
  @param _duration The number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.
*/
constructor(uint256 _duration) {
  duration = _duration;
}
```

* `_duration` is the number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`duration`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/duration.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`stateOf`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/read/stateof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li><li><code>uint256 _start</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/dev/api/enums/jbballotstate.md) ballotState</code></li></ul> |
| [**`supportsInterface`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |
