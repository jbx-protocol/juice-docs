# decimals

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The group that payout splits coming from this terminal are identified by.**

#### Definition

```
/**
  @notice
  The group that payout splits coming from this terminal are identified by.
*/
uint256 public immutable override payoutSplitsGroup;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
