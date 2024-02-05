# currencyForToken

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminal`](/dev/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The currency that should be used for the specified token.**

### Definition

```
function currencyForToken(address _token) external view override returns (uint256) { ... }
```

* Arguments:
  * `_token` is the token to check for the currency of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md) interface.
* The function returns the currency index.

#### Body

1.  This terminal only uses one currency.

    ```
    return currency;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The currency that should be used for the specified token.

  @param _token The token to check for the currency of.

  @return The currency index.
*/
function currencyForToken(address _token) external view override returns (uint256) {
  _token; // Prevents unused var compiler and natspec complaints.

  return currency;
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
