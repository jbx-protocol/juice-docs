# decimals

Contract: [`JBSingleTokenPaymentTerminal`](/dev/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminal.md)

**The currency to use when resolving price feeds for this terminal.**

#### Definition

```
/**
  @notice
  The currency to use when resolving price feeds for this terminal.
*/
uint256 public immutable override currency;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSingleTokenPaymentTerminal`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminal.md) interface.
