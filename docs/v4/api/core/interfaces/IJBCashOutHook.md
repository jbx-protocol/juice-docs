# IJBCashOutHook
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBCashOutHook.sol)

**Inherits:**
IERC165

Hook called after a terminal's `cashOutTokensOf(...)` logic completes (if passed by the ruleset's data
hook).


## Functions
### afterCashOutRecordedWith

This function is called by the terminal's `cashOutTokensOf(...)` function after the cash out has been
recorded in the terminal store.

*Critical business logic should be protected by appropriate access control.*


```solidity
function afterCashOutRecordedWith(JBAfterCashOutRecordedContext calldata context) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterCashOutRecordedContext`|The context passed in by the terminal, as a `JBAfterCashOutRecordedContext` struct.|


