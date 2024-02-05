# fundingCycleStore

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminalstore.md)

**The contract storing all funding cycle configurations.**

#### Definition

```
/**
  @notice
  The contract storing all funding cycle configurations.
*/
IJBFundingCycleStore public immutable override fundingCycleStore;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
