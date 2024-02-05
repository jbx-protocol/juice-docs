# transferFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/dev/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/dev/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Transfer tokens to an account.**

#### Definition

```
function transfer(
  uint256 _projectId,
  address _to,
  uint256 _amount
) external override { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs. This is ignored.
  * `_to` is the destination address.
  * `_amount` is the amount of the transfer, as a fixed point number with 18 decimals.
* The function overrides a function definition from the [`IJBToken`](/dev/api/interfaces/ijbtoken.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure the project IDs match, or this contract's project ID is 0.

    ```
    // Can't transfer for a wrong project.
    if (projectId != 0 && _projectId != projectId) revert BAD_PROJECT();
    ```

    _Internal references:_

    * [`projectId`](/dev/api/contracts/jbtoken/properties/projectid.md)

2.  Forward the call to the ERC20 implementation.

    ```
    transfer(_to, _amount);
    ```

    _Inherited references:_

    * [`transfer`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-transfer-address-uint256-)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Transfer tokens to an account.

  @param _projectId The ID of the project to which the token belongs. This is ignored.
  @param _to The destination address.
  @param _amount The amount of the transfer, as a fixed point number with 18 decimals.
*/
function transfer(
  uint256 _projectId,
  address _to,
  uint256 _amount
) external override {
  // Can't transfer for a wrong project.
  if (projectId != 0 && _projectId != projectId) revert BAD_PROJECT();

  transfer(_to, _amount);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`BAD_PROJECT`**    | Thrown if the project being transfered for is not compatible with this contract.  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
