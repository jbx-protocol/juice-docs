# currencyForToken

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md)

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
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md) interface.
* The function returns the currency index.

#### Body

1.  There are no currencies for v1 project tokens.

    ```
    // There's no currency for the token.
    return 0;
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
function currencyForToken(address _token) external pure override returns (uint256) {
  _token; // Prevents unused var compiler and natspec complaints.

  // There's no currency for the token.
  return 0;
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
