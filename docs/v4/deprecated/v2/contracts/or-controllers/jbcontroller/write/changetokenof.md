# changeTokenOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/docs/v4/deprecated/v2/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/docs/v4/deprecated/v2/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Swap the current project's token that is minted and burned for another, and transfer ownership of the current token to another address if needed.**

_Only a project's owner or operator can change its token._

#### Definition

```
function changeTokenOf(
  uint256 _projectId,
  IJBToken _token,
  address _newOwner
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.CHANGE_TOKEN) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the changed token belongs.
  * `_token` is the new token, which must adhere to the [`IJBToken`](/docs/v4/deprecated/v2/interfaces/ijbtoken.md) specification.
  * `_newOwner` is an address to transfer the current token's ownership to. This is optional, but it cannot be done later.
* Through the [`requirePermission`](/docs/v4/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.CHANGE_TOKEN`](/docs/v4/deprecated/v2/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/docs/v4/deprecated/v2/interfaces/ijbcontroller.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _Internal references:_

    * [`fundingCycleStore`](/docs/v4/deprecated/v2/contracts/or-controllers/jbcontroller/properties/fundingcyclestore.md)

    _External references:_

    * [`currentOf`](/docs/v4/deprecated/v2/contracts/jbfundingcyclestore/read/currentof.md)
2.  Make sure the current funding cycle for the project allows changing tokens.

    ```
    // The current funding cycle must not be paused.
    if (!_fundingCycle.changeTokenAllowed()) revert CHANGE_TOKEN_NOT_ALLOWED();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/docs/v4/deprecated/v2/libraries/jbfundingcyclemetadataresolver.md)
      * `.changeTokenAllowed(...)`
3.  Forward the call to the token store.

    ```
    // Change the token in the store.
    tokenStore.changeFor(_projectId, _token, _newOwner);
    ```

    _Internal references:_

    * [`tokenStore`](/docs/v4/deprecated/v2/contracts/or-controllers/jbcontroller/properties/tokenstore.md)

    _External references:_

    * [`changeFor`](/docs/v4/deprecated/v2/contracts/jbtokenstore/write/changefor.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Swap the current project's token that is minted and burned for another, and transfer ownership of the current token to another address if needed.

  @dev
  Only a project's owner or operator can change its token.

  @param _projectId The ID of the project to which the changed token belongs.
  @param _token The new token.
  @param _newOwner An address to transfer the current token's ownership to. This is optional, but it cannot be done later.
*/
function changeTokenOf(
  uint256 _projectId,
  IJBToken _token,
  address _newOwner
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.CHANGE_TOKEN)
{
  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // The current funding cycle must not be paused.
  if (!_fundingCycle.changeTokenAllowed()) revert CHANGE_TOKEN_NOT_ALLOWED();

  // Change the token in the store.
  tokenStore.changeFor(_projectId, _token, _newOwner);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                         | Description                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| **`CHANGE_TOKEN_NOT_ALLOWED`** | Thrown if the project doesn't currently allow changing tokens. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
