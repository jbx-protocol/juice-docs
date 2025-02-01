---
sidebar_position: 3
---

# Pay Hook

A pay hook adds functionality to when a project receives a payment. To build a pay hook, you'll want to implement the [`IJBPayHook`](/docs/v4/api/core/interfaces/IJBPayHook.md) interface. 

```javascript
interface IJBPayHook is IERC165 {
    function afterPayRecordedWith(JBAfterPayRecordedContext calldata context) external payable;
}
```

Once you've deployed your contract, you can return its address from [`ruleset data hook`](/docs/v4/build/hooks/ruleset-data-hook.md). The pay hook's [`IJBPayHook.afterPayRecordedWith(...)`](/docs/v4/api/core/interfaces/IJBPayHook.md#afterpayrecordedwith) function will be called with the payment's [`JBAfterPayRecordedContext`](/docs/v4/api/core/structs/JBAfterPayRecordedContext.md) automatically after the project receives a payment. 

[Learn more about pay hooks](/docs/v4/learn/glossary/pay-hook).
