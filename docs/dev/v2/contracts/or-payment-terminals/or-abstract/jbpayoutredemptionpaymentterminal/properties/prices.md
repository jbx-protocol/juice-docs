# prices

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/dev/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/dev/v2/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The contract that exposes price feeds.**

#### Definition

```
/**
  @notice
  The contract that exposes price feeds.
*/
IJBPrices public immutable override prices;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/dev/v2/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
