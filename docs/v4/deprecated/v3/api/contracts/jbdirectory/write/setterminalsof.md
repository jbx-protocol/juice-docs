# setTerminalsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBDirectory`](/docs/v4/deprecated/v3/api/contracts/jbdirectory/README.md)​‌

Interface: [`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Set a project's terminals.**

_Only a project owner, an operator, or its controller can set its terminals._

#### Definition

```
function setTerminalsOf(uint256 _projectId, IJBPaymentTerminal[] calldata _terminals)
  external
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.SET_TERMINALS,
    msg.sender == address(controllerOf[_projectId])
  ) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project having terminals set.
  * `_terminals` is the terminals to set.
* Through the [`requirePermissionAllowingOverride`](/docs/v4/deprecated/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) modifier, the function is only accessible by the project's owner, from an operator that has been given the [`JBOperations.SET_TERMINALS`](/docs/v4/deprecated/v3/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`, or by the project's controller.
* The function overrides a function definition from the [`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/currentof.md)

2.  Make sure the project's current funding cycle is set to allow setting terminals, or the request to set the terminals is coming from the project's current controller.

    ```
    // Setting terminals must be allowed if not called from the current controller.
    if (
      msg.sender != address(controllerOf[_projectId]) && !_fundingCycle.global().allowSetTerminals
    ) revert SET_TERMINALS_NOT_ALLOWED();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/docs/v4/deprecated/v3/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.setTerminalsAllowed(...)`

    _Internal references:_

    * [`controllerOf`](/docs/v4/deprecated/v3/api/contracts/jbdirectory/properties/controllerof.md)

3.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/currentof.md)

4.  Delete the project's current set of terminals from storage.

    ```
    // Set the stored terminals for the project.
    _terminalsOf[_projectId] = _terminals;
    ```

    _Internal references:_

    * [`_terminalsOf`](/docs/v4/deprecated/v3/api/contracts/jbdirectory/properties/-_terminalsof.md)

5.  Make sure the same terminal isn't being set multiple times.
    ```
    // Make sure duplicates were not added.
    if (_terminals.length > 1)
      for (uint256 _i; _i < _terminals.length; ) {
        for (uint256 _j = _i + 1; _j < _terminals.length; ) {
          if (_terminals[_i] == _terminals[_j]) revert DUPLICATE_TERMINALS();

          unchecked {
            ++_j;
          }
        }

        unchecked {
          ++_i;
        }
      }
    ```

6.  Emit a `SetTerminals` event with the relevant parameters.

    ```
    emit SetTerminals(_projectId, _terminals, msg.sender);
    ```

    _Event references:_

    * [`SetTerminals`](/docs/v4/deprecated/v3/api/contracts/jbdirectory/events/setterminals.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Set a project's terminals.

  @dev
  Only a project owner, an operator, or its controller can set its terminals.

  @param _projectId The ID of the project having terminals set.
  @param _terminals The terminal to set.
*/
function setTerminalsOf(uint256 _projectId, IJBPaymentTerminal[] calldata _terminals)
  external
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.SET_TERMINALS,
    msg.sender == address(controllerOf[_projectId])
  )
{
  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Setting terminals must be allowed if not called from the current controller.
  if (
    msg.sender != address(controllerOf[_projectId]) && !_fundingCycle.global().allowSetTerminals
  ) revert SET_TERMINALS_NOT_ALLOWED();

  // Set the stored terminals for the project.
  _terminalsOf[_projectId] = _terminals;

  // Make sure duplicates were not added.
  if (_terminals.length > 1)
    for (uint256 _i; _i < _terminals.length; ) {
      for (uint256 _j = _i + 1; _j < _terminals.length; ) {
        if (_terminals[_i] == _terminals[_j]) revert DUPLICATE_TERMINALS();

        unchecked {
          ++_j;
        }
      }

      unchecked {
        ++_i;
      }
    }

  emit SetTerminals(_projectId, _terminals, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                          | Description                                               |
| ------------------------------- | --------------------------------------------------------- |
| **`ADD_TERMINAL_ZERO_ADDRESS`** | Thrown if a provided terminal to add is the zero address. |
| **`DUPLICATE_TERMINALS`** | Thrown if the same terminal is being set multiple times. |
| **`SET_TERMINALS_NOT_ALLOWED`**          | Thrown if the provided project isn't currently allowed to set its terminals.                |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                          | Data                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [**`SetTerminals`**](/docs/v4/deprecated/v3/api/contracts/jbdirectory/events/setterminals.md)         | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md)[] indexed terminals</code></li><li><code>address caller</code></li></ul>                                            |

</TabItem>


<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
