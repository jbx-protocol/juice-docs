# SetFeeGauge

Emitted from:

* [`setFeeGauge`](/docs/dev/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/setfeegauge.md)

#### Definition

```
event SetFeeGauge(IJBFeeGauge indexed feeGauge, address caller);
```

* `feeGauge` is the new [`feeGuage`](/docs/dev/v3/api/interfaces/ijbfeegauge.md).
* `caller` is the address that issued the transaction within which the event was emitted.
