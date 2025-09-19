# _addTerminalIfNeeded

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBDirectory`](/docs/dev/v3/api/contracts/jbdirectory/README.md)​‌

Interface: [`IJBDirectory`](/docs/dev/v3/api/interfaces/ijbdirectory.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Add a terminal to a project's list of terminals if it hasn't been already.**

#### Definition


```
function _addTerminalIfNeeded(uint256 _projectId, IJBPaymentTerminal _terminal) private { ... }
```
* Arguments:
  * `_projectId` is the ID of the project having a terminal added.
  * `_terminal` is the terminal to add.
* The function is private to this contract.
* The function doesn't return anything.

#### Body
1.  Nothing to do if the terminal is already a terminal of the project.
    ```
    // Check that the terminal has not already been added.
    if (isTerminalOf(_projectId, _terminal)) return;
    ```

    _Internal references:_

    * [`isTerminalOf`](/docs/dev/v3/api/contracts/jbdirectory/read/isterminalof.md)

2.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _Internal references:_

    * [`fundingCycleStore`](/docs/dev/v3/api/contracts/jbdirectory/properties/fundingcyclestore.md)

    _External references:_

    * [`currentOf`](/docs/dev/v3/api/contracts/jbfundingcyclestore/read/currentof.md)

3.  Make sure the project's current funding cycle is set to allow setting its terminals, or the request to set the controller is coming from the project's current controller.

    ```
    // Setting terminals must be allowed if not called from the current controller.
    if (
      msg.sender != address(controllerOf[_projectId]) && !_fundingCycle.global().allowSetTerminals
    ) revert SET_TERMINALS_NOT_ALLOWED();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/docs/dev/v3/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.global(...)`

    _Internal references:_

    * [`controllerOf`](/docs/dev/v3/api/contracts/jbdirectory/properties/controllerof.md)

4.  Add the terminal.
    ```
    // Add the new terminal.
    _terminalsOf[_projectId].push(_terminal);
    ```

    _Internal references:_

    * [`_terminalsOf`](/docs/dev/v3/api/contracts/jbdirectory/properties/-_terminalsof.md)
5.  Emit a `AddTerminal` event with the relevant parameters.

    ```
    emit AddTerminal(_projectId, _terminal, msg.sender);
    ```

    _Event references:_

    * [`AddTerminal`](/docs/dev/v3/api/contracts/jbdirectory/events/addterminal.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Add a terminal to a project's list of terminals if it hasn't been already.

  @param _projectId The ID of the project having a terminal added.
  @param _terminal The terminal to add.
*/
function _addTerminalIfNeeded(uint256 _projectId, IJBPaymentTerminal _terminal) private {
  // Check that the terminal has not already been added.
  if (isTerminalOf(_projectId, _terminal)) return;

  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Setting terminals must be allowed if not called from the current controller.
  if (
    msg.sender != address(controllerOf[_projectId]) && !_fundingCycle.global().allowSetTerminals
  ) revert SET_TERMINALS_NOT_ALLOWED();

  // Add the new terminal.
  _terminalsOf[_projectId].push(_terminal);

  emit AddTerminal(_projectId, _terminal, msg.sender);
}
```

</TabItem>
<TabItem value="Errors" label="Errors">

| String                            | Description                                                      |
| --------------------------------- | ---------------------------------------------------------------- |
| **`SET_TERMINALS_NOT_ALLOWED`**          | Thrown if the provided project isn't currently allowed to set its terminals.                |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                          | Data                                                                                                                                                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`AddTerminal`**](/docs/dev/v3/api/contracts/jbdirectory/events/addterminal.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code><a href="/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md">IJBPaymentTerminal</a> indexed terminal</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
