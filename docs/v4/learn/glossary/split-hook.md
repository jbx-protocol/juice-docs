# Split Hook

#### What everyone needs to know

* A project's payout distribution splits or its reserved token distribution splits can be directed at custom hook contracts.
* A split hook can be attached to a project's split during any ruleset configuration to automate the routing of funds and reserved project tokens.
* A split hook's `processSplitWith(...)` transaction is triggered automatically when the split is receiving funds.

#### What you'll want to know if you're building

* A split hook contract must adhere to the [`IJBSplitHook`](/docs/v4/api/core/interfaces/IJBSplitHook.sol/interface.IJBSplitHook.md) interface.
* A split hook can be specified in a split through the [`JBController.launchProjectFor(...)`](/docs/v4/api/core/JBController.sol/contract.JBController.md#launchprojectfor), [`JBController.launchRulesetsFor(...)`](/docs/v4/api/core/JBController.sol/contract.JBController.md#launchrulesetsfor), [`JBController.queueRulesetsOf(...)`](/docs/v4/api/core/JBController.sol/contract.JBController.md#queuerulesetsof), or [`JBController.setSplitGroupsOf(...)`](/docs/v4/api/core/JBController.sol/contract.JBController.md#setsplitGroupsof) transactions.

[Get started building split hooks](/docs/v4/build/hooks/split-hook.md).

