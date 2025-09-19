# Ruleset Approval Hook

#### What everyone needs to know

* A project's rulesets can vary widely. Custom approval hooks can be useful to keep changes in check.
* An approval hook contract must implement a function that tells the world if the state of a proposed ruleset is `empty`, `upcoming`, `active`, `approvalExpected`, `approved`, or `failed`, as defined in [`JBApprovalStatus`](/docs/dev/v5/api/core/enums/JBApprovalStatus.md).
* If a queued ruleset fails to be approved by an approval hook, it will not be used. Instead, a copy of the current ruleset will be used as the next cycle.

#### What you'll want to know if you're building

* An approval hook is a custom contract that adheres to the [`IJBRulesetApprovalHook`](/docs/dev/v5/api/core/interfaces/IJBRulesetApprovalHook.md) interface, which can be attached to a project's rulesets to create restrictive conditions according to which proposed queued rulesets must follow in order to take effect.
* An approval hook can be specified in a ruleset through the [`JBController.launchProjectFor(...)`](/docs/dev/v5/api/core/JBController.md#launchprojectfor), [`JBController.launchRulesetsFor(...)`](/docs/dev/v5/api/core/JBController.md#launchrulesetsfor), or [`JBController.queueRulesetsOf(...)`](/docs/dev/v5/api/core/JBController.md#queuerulesetsof) transactions.

[Get started building ruleset approval hooks](/docs/dev/v5/build/hooks/ruleset-approval-hook.md).

