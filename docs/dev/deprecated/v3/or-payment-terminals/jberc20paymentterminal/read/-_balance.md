# _balance

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/or-payment-terminals/jberc20paymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Checks the balance of tokens in this contract.**

#### Definition

```
function _balance() internal view override returns (uint256) { ...}
```

* Arguments:
* The resulting function is internal to this contract and its inheriters.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal) interface.
* The function returns the contract's balance, as a fixed point number with the same amount of decimals as this terminal.

#### Body

1.  Return this terminal's token balance.

    ```
    return IERC20(token).balanceOf(address(this));
    ```

    _External references:_

    * [`balanceOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-balanceOf-address-)


</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Checks the balance of tokens in this contract.

  @return The contract's balance, as a fixed point number with the same amount of decimals as this terminal.
*/
function _balance() internal view override returns (uint256) {
  return IERC20(token).balanceOf(address(this));
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
