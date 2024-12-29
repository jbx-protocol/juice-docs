# JBRedemptionDelegateAllocation

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/structs/JBRedemptionDelegateAllocation.sol

#### Definition

```
/**
 @member delegate A delegate contract to use for subsequent calls.
 @member amount The amount to send to the delegate.
*/
struct JBRedemptionDelegateAllocation {
  IJBRedemptionDelegate delegate;
  uint256 amount;
}
```

* `delegate` is a delegate contract to use for subsequent calls.
* `amount` is the amount to send to the delegate.