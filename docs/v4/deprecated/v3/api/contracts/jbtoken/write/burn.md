# burn

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/docs/v4/deprecated/v3/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/docs/v4/deprecated/v3/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Burn some outstanding tokens.**

_Only the owner of this contract cant burn some of its supply._

#### Definition

```
function burn(
  uint256 _projectId,
  address _account,
  uint256 _amount
) external override onlyOwner { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs. This is ignored.
  * `_account` is the account to burn tokens from.
  * `_amount` is the amount of tokens to burn, as a fixed point number with 18 decimals.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function overrides a function definition from the [`IJBToken`](/docs/v4/deprecated/v3/api/interfaces/ijbtoken.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure the project IDs match, or this contract's project ID is 0.

    ```
    // Can't burn for a wrong project.
    if (projectId != 0 && _projectId != projectId) revert BAD_PROJECT();
    ```

    _Internal references:_

    * [`projectId`](/docs/v4/deprecated/v3/api/contracts/jbtoken/properties/projectid.md)

2.  Forward the call to the ERC20 implementation.

    ```
    return _burn(_account, _amount);
    ```

    _Inherited references:_

    * [`_burn`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-_burn-address-uint256-)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Burn some outstanding tokens.

  @dev
  Only the owner of this contract cant burn some of its supply.

  @param _projectId The ID of the project to which the token belongs. This is ignored.
  @param _account The account to burn tokens from.
  @param _amount The amount of tokens to burn, as a fixed point number with 18 decimals.
*/
function burn(
  uint256 _projectId,
  address _account,
  uint256 _amount
) external override onlyOwner {
  // Can't burn for a wrong project.
  if (projectId != 0 && _projectId != projectId) revert BAD_PROJECT();

  return _burn(_account, _amount);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`BAD_PROJECT`**    | Thrown if the project being burned from is not compatible with this contract.  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
