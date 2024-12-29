# recordAddedBalanceFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Records newly added funds for the project.**

_The msg.sender must be an [`IJBSingleTokenPaymentTerminal`](/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md)._
#### Definition

```
function recordAddedBalanceFor(uint256 _projectId, uint256 _amount) external override { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funds being added belong.
  * `_amount` is the amount of terminal tokens added, as a fixed point number with the same amount of decimals as its relative terminal.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Increment the project's balance by the specified amount.

    ```
    // Increment the balance.
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] +
      _amount;
    ```

    _Internal references:_

    * [`balanceOf`](/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/balanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Records newly added funds for the project.

  @dev
  The msg.sender must be an IJBSingleTokenPaymentTerminal.

  @param _projectId The ID of the project to which the funds being added belong.
  @param _amount The amount of terminal tokens added, as a fixed point number with the same amount of decimals as its relative terminal.
*/
function recordAddedBalanceFor(uint256 _projectId, uint256 _amount) external override {
  // Increment the balance.
  balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] +
    _amount;
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
