# projects

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/dev/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/docs/dev/v3/interfaces/ijbpayoutredemptionpaymentterminal.md)

**Mints ERC-721's that represent project ownership and transfers.**

#### Definition

```
/**
  @notice
  Mints ERC-721's that represent project ownership and transfers.
*/
IJBProjects public immutable override projects;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/docs/dev/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
