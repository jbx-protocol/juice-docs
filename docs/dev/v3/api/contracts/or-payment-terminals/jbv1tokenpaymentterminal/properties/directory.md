# directory

Contract: [`JBV1TokenPaymentTerminal`](/docs/dev/v3/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBV1TokenPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbv1tokenpaymentterminal.md)

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
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbv1tokenpaymentterminal.md) interface.
