# fundingCycleStore

Contract: [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md)

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
* The resulting function overrides a function definition from the [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md) interface.
