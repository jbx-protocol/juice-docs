# projects

Contract: [`JBV1TokenPaymentTerminal`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBV1TokenPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbv1tokenpaymentterminal.md)

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
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbv1tokenpaymentterminal.md) interface.
