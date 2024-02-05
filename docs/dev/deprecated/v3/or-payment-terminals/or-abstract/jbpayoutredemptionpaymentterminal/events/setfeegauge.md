# SetFeeGauge

Emitted from:

* [`setFeeGauge`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/setfeegauge.md)

#### Definition

```
event SetFeeGauge(IJBFeeGauge indexed feeGauge, address caller);
```

* `feeGauge` is the new [`feeGuage`](/dev/api/interfaces/ijbfeegauge.md).
* `caller` is the address that issued the transaction within which the event was emitted.
