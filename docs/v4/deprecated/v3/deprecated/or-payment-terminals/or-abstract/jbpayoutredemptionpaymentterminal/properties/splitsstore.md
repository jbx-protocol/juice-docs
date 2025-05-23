# splitsStore

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The contract that stores splits for each project.**

#### Definition

```
/**
  @notice
  The contract that stores splits for each project.
*/
IJBSplitsStore public immutable override splitsStore;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
