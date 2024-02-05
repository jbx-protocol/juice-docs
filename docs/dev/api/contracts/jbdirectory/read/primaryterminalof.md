# primaryTerminalOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The primary terminal that is managing funds for a project for a specified token.**

_Contracts should send tokens of the specified type to a project's primary terminal._

_The zero address is returned if a terminal isn't found for the specified token._

#### Definition

```
function primaryTerminalOf(uint256 _projectId, address _token)
  external
  view
  override
  returns (IJBPaymentTerminal) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get a terminal for.
  * `_token` is the token the terminal accepts.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBDirectory`](/dev/api/interfaces/ijbdirectory.md) interface.
* The function returns the primary terminal for the project for the specified token.

#### Body

1.  Keep a reference to the project's primary terminal for the specified token.

    ```
    // Keep a reference to the primary terminal for the provided project ID and token.
    IJBPaymentTerminal _primaryTerminal = _primaryTerminalOf[_projectId][_token];
    ```

    _Internal references:_

    * [`_primaryTerminalOf`](/dev/api/contracts/jbdirectory/properties/-_primaryterminalof.md)

2.  Check to see if the project has explicitly set a primary terminal for this token. If so, return it.

    ```
    // If a primary terminal for the token was specifically set and its one of the project's terminals, return it.
    if (
      _primaryTerminal != IJBPaymentTerminal(address(0)) &&
      isTerminalOf(_projectId, _primaryTerminal)
    ) return _primaryTerminal;
    ```

    _Internal references:_

    * [`isTerminalOf`](/dev/api/contracts/jbdirectory/read/isterminalof.md)

3.  Keep a reference to the number of terminals the project has.

    ```
    // Keep a reference to the number of terminals the project has.
    uint256 _numberOfTerminals = _terminalsOf[_projectId].length;
    ```

    _Internal references:_

    * [`_terminalsOf`](/dev/api/contracts/jbdirectory/properties/-_terminalsof.md)


4.  Loop through each of the project's terminals looking for one that uses the same token as the one specified. If one is found, return it.

    ```
    // Return the first terminal which accepts the specified token.
    for (uint256 _i; _i < _numberOfTerminals; ) {
      // Keep a reference to the terminal being iterated on.
      IJBPaymentTerminal _terminal = _terminalsOf[_projectId][_i];

      // If the terminal accepts the specified token, return it.
      if (_terminal.acceptsToken(_token, _projectId)) return _terminal;

      unchecked {
        ++_i;
      }
    }
    ```

    _External references:_

    * [`acceptsToken`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/acceptstoken.md)
5.  Return an empty terminal if not found.

    ```
    // Not found.
    return IJBPaymentTerminal(address(0));
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The primary terminal that is managing funds for a project for a specified token.

  @dev
  Contracts should send tokens of the specified type to a project's primary terminal.

  @dev
  The zero address is returned if a terminal isn't found for the specified token.

  @param _projectId The ID of the project to get a terminal for.
  @param _token The token the terminal accepts.

  @return The primary terminal for the project for the specified token.
*/
function primaryTerminalOf(uint256 _projectId, address _token)
  external
  view
  override
  returns (IJBPaymentTerminal)
{
  // Keep a reference to the primary terminal for the provided project ID and token.
  IJBPaymentTerminal _primaryTerminal = _primaryTerminalOf[_projectId][_token];

  // If a primary terminal for the token was specifically set and its one of the project's terminals, return it.
  if (
    _primaryTerminal != IJBPaymentTerminal(address(0)) &&
    isTerminalOf(_projectId, _primaryTerminal)
  ) return _primaryTerminal;

  // Keep a reference to the number of terminals the project has.
  uint256 _numberOfTerminals = _terminalsOf[_projectId].length;

  // Return the first terminal which accepts the specified token.
  for (uint256 _i; _i < _numberOfTerminals; ) {
    // Keep a reference to the terminal being iterated on.
    IJBPaymentTerminal _terminal = _terminalsOf[_projectId][_i];

    // If the terminal accepts the specified token, return it.
    if (_terminal.acceptsToken(_token, _projectId)) return _terminal;

    unchecked {
      ++_i;
    }
  }

  // Not found.
  return IJBPaymentTerminal(address(0));
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
