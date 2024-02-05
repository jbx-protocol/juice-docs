# shouldRequireClaimingFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project to force all future mints of its tokens to be claimed into the holder's wallet, or revoke the flag if it's already set.**

_Only a token holder or an operator can require claimed token._

### Definition

```
function shouldRequireClaimingFor(uint256 _projectId, bool _flag)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.REQUIRE_CLAIM) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project being affected.
  * `_flag` is a flag indicating whether or not claiming should be required.
* Through the [`requirePermission`](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.REQUIRE_CLAIM`](/dev/deprecated/v2/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function overrides a function definition from the [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to the project's current token.

    ```
    // Get a reference to the project's current token.
    IJBToken _token = tokenOf[_projectId];
    ```

    _Internal references:_

    * [`tokenOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/tokenof.md)
2.  Make sure the project has a token. If it doesn't, there's nowhere to claim tokens onto.

    ```
    // The project must have a token contract attached.
    if (_token == IJBToken(address(0))) revert TOKEN_NOT_FOUND();
    ```
3.  Store the flag for the project.

    ```
    // Store the flag.
    requireClaimFor[_projectId] = _flag;
    ```

    _Internal references:_

    * [`requireClaimFor`](/dev/deprecated/v2/contracts/jbtokenstore/properties/requireclaimfor.md)
4.  Emit a `ShouldRequireClaim` event with the relevant parameters.

    ```
    emit ShouldRequireClaim(_projectId, _flag, msg.sender);
    ```

    _Event references:_

    * [`ShouldRequireClaim`](/dev/deprecated/v2/contracts/jbtokenstore/events/shouldrequireclaim.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows a project to force all future mints of its tokens to be claimed into the holder's wallet, or revoke the flag if it's already set.

  @dev
  Only a token holder or an operator can require claimed token.

  @param _projectId The ID of the project being affected.
  @param _flag A flag indicating whether or not claiming should be required.
*/
function shouldRequireClaimingFor(uint256 _projectId, bool _flag)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.REQUIRE_CLAIM)
{
  // Get a reference to the project's current token.
  IJBToken _token = tokenOf[_projectId];

  // The project must have a token contract attached.
  if (_token == IJBToken(address(0))) revert TOKEN_NOT_FOUND();

  // Store the flag.
  requireClaimFor[_projectId] = _flag;

  emit ShouldRequireClaim(_projectId, _flag, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                | Description                                      |
| --------------------- | ------------------------------------------------ |
| **`TOKEN_NOT_FOUND`** | Thrown if the project doesn't have a token contract attached. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                        | Data                                                                                                                                |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [**`ShouldRequireClaim`**](/dev/deprecated/v2/contracts/jbtokenstore/events/shouldrequireclaim.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul>                                                                                                                                           |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
