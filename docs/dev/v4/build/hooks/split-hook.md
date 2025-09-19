---
sidebar_position: 1
---

# Split Hook

A split hook adds functionality to when a project's payouts or reserved tokens are distributed. To build a split hook, you'll want to implement the [`IJBSplitHook`](/docs/dev/v4/api/core/interfaces/IJBSplitHook.md) interface.

```javascript
interface IJBSplitHook is IERC165 {
    function processSplitWith(JBSplitHookContext calldata context) external payable;
}
```

Once you've deployed your contract, you can use its address in the `hook` field of a [`JBSplit`](/docs/dev/v4/api/core/structs/JBSplit.md) when specifying either payout splits or reserved token splits – the `projectId` and `beneficiary` fields of the `JBSplit` wont have any effect and can be used as metadata if you wish. The split hook's [`IJBSplitHook.processSplitWith(...)`](/docs/dev/v4/api/core/interfaces/IJBSplitHook.md#processsplitwith) function will be called with the split's [`JBSplitHookContext`](/docs/dev/v4/api/core/structs/JBSplitHookContext.md) automatically when the split is triggered from payouts or from reserved token distributions.

[Learn more about split hooks](/docs/dev/v4/learn/glossary/split-hook.md).
