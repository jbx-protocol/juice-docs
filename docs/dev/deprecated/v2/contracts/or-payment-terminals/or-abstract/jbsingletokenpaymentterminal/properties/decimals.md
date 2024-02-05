# decimals

Contract: [`JBSingleTokenPaymentTerminal`](/dev/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminal.md)

**The number of decimals the token fixed point amounts are expected to have.**

#### Definition

```
/**
  @notice
  The number of decimals the token fixed point amounts are expected to have.
*/
uint256 public immutable override decimals;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSingleTokenPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminal.md) interface.
