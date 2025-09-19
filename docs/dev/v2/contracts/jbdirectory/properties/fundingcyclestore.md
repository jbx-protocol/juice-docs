# fundingCycleStore

Contract: [`JBController`](/docs/dev/v2/contracts/jbdirectory/README.md)​‌

Interface: [`IJBController`](/docs/dev/v2/interfaces/ijbcontroller.md)

**The contract storing all funding cycle configurations.**

#### Definition

```
/**
  @notice
  The contract storing all funding cycle configurations.
*/
IJBFundingCycleStore public immutable fundingCycleStore;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/docs/dev/v2/interfaces/ijbcontroller.md) interface.
