# token

Contract: [`JBSingleTokenPaymentTerminal`](/docs/v4/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminal`](/docs/v4/deprecated/v2/interfaces/ijbsingletokenpaymentterminal.md)

**The token that this terminal accepts.**

#### Definition

```
/**
  @notice
  The token that this terminal accepts.
*/
address public immutable override token;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSingleTokenPaymentTerminal`](/docs/v4/deprecated/v2/interfaces/ijbsingletokenpaymentterminal.md) interface.
