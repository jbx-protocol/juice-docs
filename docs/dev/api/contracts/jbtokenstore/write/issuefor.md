# issueFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Issues an project's ERC-20 tokens that'll be used when claiming tokens.**

_Deploys a project's ERC-20 token contract._

_Only a project's owner or operator can issue its token._

### Definition

```
function issueFor(
  uint256 _projectId,
  string calldata _name,
  string calldata _symbol
)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.ISSUE)
  returns (IJBToken token)
{ ... }
```

* Arguments:
  * `_projectId` is the ID of the project being issued tokens.
  * `_name` is the ERC-20's name.
  * `_symbol` is the ERC-20's symbol.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.ISSUE`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function overrides a function definition from the [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md) interface.
* The function returns the token that was issued.

#### Body

1.  Make sure a name was provided.

    ```
    // There must be a name.
    if (bytes(_name).length == 0) revert EMPTY_NAME();
    ```
2.  Make sure a symbol was provided.

    ```
    // There must be a symbol.
    if (bytes(_symbol).length == 0) revert EMPTY_SYMBOL();
    ```
3.  Make sure the project doesn't already have a token.

    ```
    // The project shouldn't already have a token.
    if (tokenOf[_projectId] != IJBToken(address(0))) revert PROJECT_ALREADY_HAS_TOKEN();
    ```

    _Internal references:_

    * [`tokenOf`](/dev/api/contracts/jbtokenstore/properties/tokenof.md)
4.  Deploy a new instance of a [`JBToken`](/dev/api/contracts/jbtoken/) contract. Assign it to the return value.

    ```
    // Deploy the token contract.
    token = new JBToken(_name, _symbol, _projectId);
    ```
5.  Store the newly deployed token contract as the token of the project.

    ```
    // Store the token contract.
    tokenOf[_projectId] = token;
    ```

    _Internal references:_

    * [`tokenOf`](/dev/api/contracts/jbtokenstore/properties/tokenof.md)
6.  Emit an `Issue` event with the relevant parameters.

    ```
    emit Issue(_projectId, token, _name, _symbol, msg.sender);
    ```

    _Event references:_

    * [`Issue`](/dev/api/contracts/jbtokenstore/events/issue.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Issues an project's ERC-20 tokens that'll be used when claiming tokens.

  @dev
  Deploys a project's ERC-20 token contract.

  @dev
  Only a project's owner or operator can issue its token.

  @param _projectId The ID of the project being issued tokens.
  @param _name The ERC-20's name.
  @param _symbol The ERC-20's symbol.

  @return token The token that was issued.
*/
function issueFor(
  uint256 _projectId,
  string calldata _name,
  string calldata _symbol
)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.ISSUE)
  returns (IJBToken token)
{
  // There must be a name.
  if (bytes(_name).length == 0) revert EMPTY_NAME();

  // There must be a symbol.
  if (bytes(_symbol).length == 0) revert EMPTY_SYMBOL();

  // The project shouldn't already have a token.
  if (tokenOf[_projectId] != IJBToken(address(0))) revert PROJECT_ALREADY_HAS_TOKEN();

  // Deploy the token contract.
  token = new JBToken(_name, _symbol, _projectId);

  // Store the token contract.
  tokenOf[_projectId] = token;

  emit Issue(_projectId, token, _name, _symbol, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                     | Description                                        |
| -------------------------- | -------------------------------------------------- |
| **`EMPTY_NAME`**           | Thrown if a name wasn't specified for the token.   |
| **`EMPTY_SYMBOL`**         | Thrown if a symbol wasn't specified for the token. |
| **`PROJECT_ALREADY_HAS_TOKEN`** | Thrown if the project already has a token.  |

</TabItem>

<TabItem value="Events" label="Events">

| Name                              | Data                                                                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`Issue`**](/dev/api/contracts/jbtokenstore/events/issue.md)                           | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/dev/api/interfaces/ijbtoken.md) indexed token</code></li><li><code>string name</code></li><li><code>string symbol</code></li><li><code>address caller</code></li></ul>                                                                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
