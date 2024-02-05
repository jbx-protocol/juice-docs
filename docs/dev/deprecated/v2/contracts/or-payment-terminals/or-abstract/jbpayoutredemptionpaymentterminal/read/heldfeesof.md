# heldFeesOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The fees that are currently being held to be processed later for each project.**

#### Definition

```
function heldFeesOf(uint256 _projectId) external view override returns (JBFee[] memory) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project for which fees are being held.
* The view function can be accessed externally by anyone.
* The function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
* The function returns an array of fees that are being held.

#### Body

1.  This function just reads and returns the stored held fees of the project.

    ```
    return _heldFeesOf[_projectId];
    ```

    _Internal references:_

    * [`_heldFeesOf`](/dev/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The fees that are currently being held to be processed later for each project.

  @param _projectId The ID of the project for which fees are being held.

  @return An array of fees that are being held.
*/
function heldFeesOf(uint256 _projectId) external view override returns (JBFee[] memory) {
  return _heldFeesOf[_projectId];
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
