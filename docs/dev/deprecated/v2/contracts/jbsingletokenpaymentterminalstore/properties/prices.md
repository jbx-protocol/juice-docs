# prices

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminalstore.md)

**The contract that exposes price feeds.**

#### Definition

```
/**
  @notice
  The contract that exposes price feeds.
*/
IJBPrices public immutable override prices;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
