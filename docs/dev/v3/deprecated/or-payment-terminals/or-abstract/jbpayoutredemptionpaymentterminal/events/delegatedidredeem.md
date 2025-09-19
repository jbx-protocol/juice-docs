# DelegateDidRedeem

Emitted from:

* [`redeemTokensOf`](/docs/dev/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md)

#### Definition

```
event DelegateDidRedeem(
  IJBRedemptionDelegate indexed delegate,
  JBDidRedeemData data,
  address caller
);
```

* `delegate` is the [`IJBRedeemDelegate`](/docs/dev/v3/api/interfaces/ijbredemptiondelegate.md) whos `didRedeem` transaction was triggered.
* `data` is the [`JBDidRedeemData`](/docs/dev/v3/api/data-structures/jbdidredeemdata.md) that was sent to the `IJBRedeemDelegate`'s `didRedeem` function.
* `caller` is the address that issued the transaction within which the event was emitted.
