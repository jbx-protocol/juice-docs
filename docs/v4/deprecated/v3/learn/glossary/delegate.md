# Delegate

#### What everyone needs to know

* A delegate contract is a way of providing extensions to a treasury that augments the default [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/) behavior.
* Pay delegates include a custom `didPay(...)` hook that will execute after all of the default protocol pay logic has successfully executed in the terminal contract. The hook is passed a bunch of contextual information via a [`JBDidPayData`](/v4/deprecated/v3/api/data-structures/jbdidpaydata.md) data structure.
* Redemption delegates include a custom `didRedeem(...)` hook that will execute after all of the default protocol redeem logic has successfully executed in the terminal contract. The hook is passed a bunch of contextual information via a [`JBDidRedeemData`](/v4/deprecated/v3/api/data-structures/jbdidredeemdata.md) data structure. The `didRedeem(...)` hook gets called before any reclaimed tokens are transferred out of the terminal contract.
* Each [`IJBPaymentTerminal`](/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md) fork can leverage delegates in unique ways.

#### What you'll want to know if you're building

* There are two types of delegates: [`IJBPayDelegate3_1_1`](/v4/deprecated/v3/api/interfaces/ijbpaydelegate3_1_1/)s and [`IJBRedemptionDelegate3_1_1`](/v4/deprecated/v3/api/interfaces/ijbredemptiondelegate3_1_1/)s. Any contract that adheres to these interfaces can be used as a delegate in a project's funding cycles.
* The funding cycle's [`dataSource`](data-source.md) specifies the active Delegate contracts.
* The [`IJBPayDelegate3_1_1`](/v4/deprecated/v3/api/interfaces/ijbpaydelegate3_1_1/)'s `didPay(...)` hook is triggered in [`JBPayoutRedemptionPaymentTerminal3_1_1._pay(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#_pay), and the [`IJBRedemptionDelegate`](/v4/deprecated/v3/api/interfaces/ijbredemptiondelegate.md)'s `didRedeem(...)` hook is triggered in [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof).
* The redemption delegate hook is called before funds are dispersed.

[Get started building pay delegates](/v4/deprecated/v3/build/treasury-extensions/pay-delegate.md).

[Get started building redemption delegates](/v4/deprecated/v3/build/treasury-extensions/redemption-delegate.md).
