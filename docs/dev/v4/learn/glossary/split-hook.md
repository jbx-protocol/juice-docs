# Split Hook

#### What everyone needs to know

* A project's payout distribution splits or its reserved token distribution splits can be directed at custom hook contracts.
* A split hook can be attached to a project's split during any ruleset configuration to automate the routing of funds and reserved project tokens.
* A split hook's `processSplitWith(...)` transaction is triggered automatically when the split is receiving funds.

#### What you'll want to know if you're building

* A split hook contract must adhere to the [`IJBSplitHook`](/docs/dev/v4/api/core/interfaces/IJBSplitHook.md) interface.
* A split hook can be specified in a split through the [`JBController4_1.launchProjectFor(...)`](/docs/dev/v4/api/core/JBController.md#launchprojectfor), [`JBController4_1.launchRulesetsFor(...)`](/docs/dev/v4/api/core/JBController.md#launchrulesetsfor), [`JBController4_1.queueRulesetsOf(...)`](/docs/dev/v4/api/core/JBController.md#queuerulesetsof), or [`JBController4_1.setSplitGroupsOf(...)`](/docs/dev/v4/api/core/JBController.md#setsplitgroupsof) transactions.

[Get started building split hooks](/docs/dev/v4/build/hooks/split-hook.md).

