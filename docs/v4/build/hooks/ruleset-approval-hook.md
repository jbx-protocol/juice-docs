---
sidebar_position: 5
---

# Ruleset Approval Hook

A ruleset approval hook helps determine whether or not a project's queued rulesets should be allowed to take effect. To build a ruleset approval hook, you'll want to implement the [`IJBRulesetApprovalHook`](/docs/v4/api/core/interfaces/IJBRulesetApprovalHook.md) interface. 

```javascript

interface IJBRulesetApprovalHook is IERC165 {
    function DURATION() external view returns (uint256);

    function approvalStatusOf(
        uint256 projectId,
        uint256 rulesetId,
        uint256 start
    )
        external
        view
        returns (JBApprovalStatus);
}
```

Once you've deployed your contract, you can use its address in the `approvalHook` field of a [`JBRuleset`](/docs/v4/api/core/structs/JBRuleset.md) when scheduling a project's rulesets. The hook's [`IJBRulesetApprovalHook.approvalStatusOf(...)`](/docs/v4/api/core/interfaces/IJBRulesetApprovalHook.md#approvalstatusof) function will be called to determine if the specified ruleset should be approved or not. It's [`IJBRulesetApprovalHook.DURATION()`](/docs/v4/api/core/interfaces/IJBRulesetApprovalHook.md#duration) function will be used to determine how long the deliberation period is for the ruleset, affecting the certainty of its admission or rejection.

[Learn more about ruleset approval hooks](/docs/v4/learn/glossary/ruleset-approval-hook.md).
