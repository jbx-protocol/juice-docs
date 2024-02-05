# DelegateDidPay

Emitted from:

* [`_pay`](/dev/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_pay.md)

#### Definition

```
event DelegateDidPay(IJBPayDelegate indexed delegate, JBDidPayData data, address caller);
```

* `delegate` is the [`IJBPayDelegate`](/dev/deprecated/v2/interfaces/ijbpaydelegate.md) whos `didPay` transaction was triggered.
* `data` is the [`JBDidPayData`](/dev/deprecated/v2/data-structures/jbdidpaydata.md) that was sent to the `IJBPayDelegate`'s `didPay` function.
* `caller` is the address that issued the transaction within which the event was emitted.
