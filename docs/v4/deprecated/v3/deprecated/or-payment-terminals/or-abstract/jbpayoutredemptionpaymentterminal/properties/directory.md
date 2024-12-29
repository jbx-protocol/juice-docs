# directory

Contract: [`JBPayoutRedemptionPaymentTerminal`](/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal)

**The directory of terminals and controllers for projects.**

#### Definition

```
/**
  @notice
  The directory of terminals and controllers for projects.
*/
IJBDirectory public immutable override directory;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal) interface.
