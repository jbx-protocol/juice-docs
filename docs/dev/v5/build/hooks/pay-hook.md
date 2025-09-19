---
sidebar_position: 3
---

# Pay Hook

A pay hook adds functionality to when a project receives a payment. To build a pay hook, you'll want to implement the [`IJBPayHook`](/docs/dev/v5/api/core/interfaces/IJBPayHook.md) interface. 

```javascript
interface IJBPayHook is IERC165 {
    function afterPayRecordedWith(JBAfterPayRecordedContext calldata context) external payable;
}
```

Once you've deployed your contract, you can return its address from [`ruleset data hook`](/docs/dev/v5/build/hooks/ruleset-data-hook.md). The pay hook's [`IJBPayHook.afterPayRecordedWith(...)`](/docs/dev/v5/api/core/interfaces/IJBPayHook.md#afterpayrecordedwith) function will be called with the payment's [`JBAfterPayRecordedContext`](/docs/dev/v5/api/core/structs/JBAfterPayRecordedContext.md) automatically after the project receives a payment. 

[Learn more about pay hooks](/docs/dev/v5/learn/glossary/pay-hook.md).
