# IJBPayHook
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBPayHook.sol)

**Inherits:**
IERC165

Hook called after a terminal's `pay(...)` logic completes (if passed by the ruleset's data hook).


## Functions
### afterPayRecordedWith

This function is called by the terminal's `pay(...)` function after the payment has been recorded in the
terminal store.

*Critical business logic should be protected by appropriate access control.*


```solidity
function afterPayRecordedWith(JBAfterPayRecordedContext calldata context) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterPayRecordedContext`|The context passed in by the terminal, as a `JBAfterPayRecordedContext` struct.|


