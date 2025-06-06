# decimals

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The currency to base token issuance on.**

_If this differs from `currency`, there must be a price feed available to convert `currency` to `baseWeightCurrency`._

#### Definition

```
/**
  @notice
  The currency to base token issuance on.

  @dev
  If this differs from `currency`, there must be a price feed available to convert `currency` to `baseWeightCurrency`.
*/
uint256 public immutable override baseWeightCurrency;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
