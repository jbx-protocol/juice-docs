# setFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Set a project's token if not already set.**

_Only a project's owner or operator can set its token._

_This contract must have access to all of the token's [`IJBToken`](/dev/api/interfaces/ijbtoken.md) interface functions._

_Can't change to a token that's currently being used by another project._

#### Definition

```
function setFor(uint256 _projectId, IJBToken _token)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.SET_TOKEN) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the set token belongs.
  * `_token` is the new token.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.SET_TOKEN`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function overrides a function definition from the [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure a token was provided.

    ```
    // Can't set to the zero address.
    if (_token == IJBToken(address(0))) revert EMPTY_TOKEN();
    ```

2.  Make sure the project doesn't already have a token.

    ```
    // Can't set token if already set.
    if (tokenOf[_projectId] != IJBToken(address(0))) revert ALREADY_SET();
    ```

    _Internal references:_

    * [`tokenOf`](/dev/api/contracts/jbtokenstore/properties/tokenof.md)

3.  Make sure the token has 18 decimals.

    ```
    // Can't change to a token that doesn't use 18 decimals.
    if (_token.decimals() != 18) revert TOKENS_MUST_HAVE_18_DECIMALS();
    ```

    _External references:_

    * [`decimals`](/dev/api/interfaces/ijbtoken.md)

5.  Store the provided token as the token of the project.

    ```
    // Store the new token.
    tokenOf[_projectId] = _token;
    ```

    _Internal references:_

    * [`tokenOf`](/dev/api/contracts/jbtokenstore/properties/tokenof.md)

9.  Emit a `Set` event with the relevant parameters.

    ```
    emit Set(_projectId, _token, msg.sender);
    ```

    _Event references:_

    * [`Set`](/dev/api/contracts/jbtokenstore/events/set.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Set a project's token if not already set.

  @dev
  Only a project's owner or operator can set its token.

  @param _projectId The ID of the project to which the set token belongs.
  @param _token The new token.
*/
function setFor(uint256 _projectId, IJBToken _token)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.SET_TOKEN)
{
  // Can't set to the zero address.
  if (_token == IJBToken(address(0))) revert EMPTY_TOKEN();

  // Can't set token if already set.
  if (tokenOf[_projectId] != IJBToken(address(0))) revert ALREADY_SET();

  // Can't change to a token that doesn't use 18 decimals.
  if (_token.decimals() != 18) revert TOKENS_MUST_HAVE_18_DECIMALS();

  // Store the new token.
  tokenOf[_projectId] = _token;

  emit Set(_projectId, _token, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                              | Description                                               |
| ----------------------------------- | --------------------------------------------------------- |
| **`EMPTY_TOKEN`**    | Thrown if no token was provided.        |
| **`ALREADY_SET`**    | Thrown if the project already has a token set.        |
| **`TOKENS_MUST_HAVE_18_DECIMALS`**    | Thrown if the token does not use 18 decimal fixed point accounting.        |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Set`**](/dev/api/contracts/jbtokenstore/events/set.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/dev/api/interfaces/ijbtoken.md) indexed newToken</code></li><li><code>address caller</code></li></ul>                                                                                           |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
