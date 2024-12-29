# feeGauge

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v2/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The data source that returns a discount to apply to a project's fee.**

#### Definition

```
/**
  @notice
  The data source that returns a discount to apply to a project's fee.
*/
IJBFeeGauge public override feeGauge;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v2/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
