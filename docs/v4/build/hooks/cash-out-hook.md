---
sidebar_position: 4
---

# Cash Out Hook

A cash out hook adds functionality to when a project's token holder cashes out. To build a cash out hook, you'll want to implement the [`IJBCashOutHook`](/docs/v4/api/core/interfaces/IJBCashOutHook.md) interface. 

```javascript
interface IJBCashOutHook is IERC165 {
    function afterCashOutRecordedWith(JBAfterCashOutRecordedContext calldata context) external payable;
}
```

Once you've deployed your contract, you can return its address from [`ruleset data hook`](/docs/v4/build/hooks/ruleset-data-hook.md). The cash out hook's [`IJBCashOutHook.afterCashOutRecordedWith(...)`](/docs/v4/api/core/interfaces/IJBCashOutHook.md#aftercashoutrecordedwith) function will be called with the cash out's [`JBAfterCashOutRecordedContext`](/docs/v4/api/core/structs/JBAfterCashOutRecordedContext.md) automatically after the project's token holder cashes out. 
