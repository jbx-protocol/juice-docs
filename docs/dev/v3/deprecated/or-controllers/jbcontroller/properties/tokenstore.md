# tokenStore

Contract: [`JBController`](/docs/dev/v3/deprecated/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/docs/dev/v3/interfaces/ijbcontroller.md)

**The contract that manages token minting and burning.**

#### Definition

```
/**
  @notice
  The contract that manages token minting and burning.
*/
IJBTokenStore public immutable tokenStore;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/docs/dev/v3/interfaces/ijbcontroller.md) interface.
