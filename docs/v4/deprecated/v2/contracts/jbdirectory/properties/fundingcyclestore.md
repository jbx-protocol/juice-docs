# fundingCycleStore

Contract: [`JBController`](/v4/deprecated/v2/contracts/jbdirectory)​‌

Interface: [`IJBController`](/v4/deprecated/v2/interfaces/ijbcontroller.md)

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
* The resulting function overrides a function definition from the [`IJBController`](/v4/deprecated/v2/interfaces/ijbcontroller.md) interface.
