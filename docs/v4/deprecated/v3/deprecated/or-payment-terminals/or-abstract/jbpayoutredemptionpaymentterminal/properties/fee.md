# fee

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The platform fee percent.**

_Out of MAX_FEE (25_000_000 / 1_000_000_000)._

#### Definition

```
/**
  @notice
  The platform fee percent.

  @dev
  Out of MAX_FEE (25_000_000 / 1_000_000_000).
*/
uint256 public override fee = 25_000_000; // 2.5%
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
