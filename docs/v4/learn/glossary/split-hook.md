# Split Hook

#### What everyone needs to know

* A project's payout distribution splits or its reserved token distribution splits can be directed at custom hook contracts.
* A split hook can be attached to a project's split during any ruleset configuration to automate the routing of treasury funds and reserved project tokens.
* A split hook's `processSplitWith(...)` transaction is triggered automatically when the split is receiving funds.

#### What you'll want to know if you're building

* A split hook contract must adhere to the [`IJBSplitHook`](/docs/v4/api/core/interfaces/IJBSplitHook.md) interface.
* A split hook can be specified in a split through the [`JBController.launchProjectFor(...)`](/docs/v4/api/core/contracts/JBController.md#launchprojectfor), [`JBController.launchRulesetsFor(...)`](/docs/v4/api/core/contracts/JBController.md#launchrulesetsfor), [`JBController.queueRulesetsOf(...)`](/docs/v4/api/core/contracts/JBController.md#queuerulesetsof), or [`JBController.setSplitGroupsOf(...)`](/docs/v4/api/core/contracts/JBController.md#setsplitGroupsof) transactions.

<!-- [Get started building split hooks](/docs/v4/build/treasury-extensions/split-hook). -->
