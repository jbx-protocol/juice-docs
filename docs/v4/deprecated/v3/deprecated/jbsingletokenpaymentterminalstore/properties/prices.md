# prices

Contract: [`JBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md)

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
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
