# DelegateDidPay

Emitted from:

* [`_pay`](/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_pay.md)

#### Definition

```
event DelegateDidPay(IJBPayDelegate indexed delegate, JBDidPayData data, address caller);
```

* `delegate` is the [`IJBPayDelegate`](/v4/deprecated/v3/api/interfaces/ijbpaydelegate.md) whos `didPay` transaction was triggered.
* `data` is the [`JBDidPayData`](/v4/deprecated/v3/api/data-structures/jbdidpaydata.md) that was sent to the `IJBPayDelegate`'s `didPay` function.
* `caller` is the address that issued the transaction within which the event was emitted.
