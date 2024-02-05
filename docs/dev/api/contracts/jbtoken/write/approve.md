# approve

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/dev/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/dev/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Approves an account to spend tokens on the `msg.sender`s behalf.**

#### Definition

```
function approve(
  uint256 _projectId,
  address _spender,
  uint256 _amount
) external override { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs. This is ignored.
  * `_spender` is the address that will be spending tokens on the `msg.sender`s behalf.
  * `_amount` is the amount the `_spender` is allowed to spend.
* The function overrides a function definition from the [`IJBToken`](/dev/api/interfaces/ijbtoken.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure the project IDs match, or this contract's project ID is 0.

    ```
    // Can't approve for a wrong project.
    if (projectId != 0 && _projectId != projectId) revert BAD_PROJECT();
    ```

    _Internal references:_

    * [`projectId`](/dev/api/contracts/jbtoken/properties/projectid.md)

2.  Forward the call to the ERC20 implementation.

    ```
    approve(_spender, _amount);
    ```

    _Inherited references:_

    * [`_mint`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Approves an account to spend tokens on the `msg.sender`s behalf.

  @param _projectId the ID of the project to which the token belongs. This is ignored.
  @param _spender The address that will be spending tokens on the `msg.sender`s behalf.
  @param _amount The amount the `_spender` is allowed to spend.
*/
function approve(
  uint256 _projectId,
  address _spender,
  uint256 _amount
) external override {
  // Can't approve for a wrong project.
  if (projectId != 0 && _projectId != projectId) revert BAD_PROJECT();

  approve(_spender, _amount);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`BAD_PROJECT`**    | Thrown if the project being approved for is not compatible with this contract.  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
