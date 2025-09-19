# DelegateDidRedeem

Emitted from:

* [`redeemTokensOf`](/docs/dev/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md)

#### Definition

```
event DelegateDidRedeem(
  IJBRedemptionDelegate indexed delegate,
  JBDidRedeemData data,
  address caller
);
```

* `delegate` is the [`IJBRedeemDelegate`](/docs/dev/v2/interfaces/ijbredemptiondelegate.md) whos `didRedeem` transaction was triggered.
* `data` is the [`JBDidRedeemData`](/docs/dev/v2/data-structures/jbdidredeemdata.md) that was sent to the `IJBRedeemDelegate`'s `didRedeem` function.
* `caller` is the address that issued the transaction within which the event was emitted.
