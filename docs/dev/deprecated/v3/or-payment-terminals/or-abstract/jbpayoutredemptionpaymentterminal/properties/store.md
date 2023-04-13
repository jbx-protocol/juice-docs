# store

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal)

**The contract that stores and manages the terminal's data.**

#### Definition

```
/**
  @notice
  The contract that stores and manages the terminal's data.
*/
JBSingleTokenPaymentTerminalStore public immutable store;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal) interface.
