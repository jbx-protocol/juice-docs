# Split Hook

#### What everyone needs to know

* A project's payout distribution splits or its reserved token distribution splits can be directed at custom hook contracts.
* A split hook can be attached to a project's split during any ruleset configuration to automate the routing of treasury funds and reserved project tokens.
* A split hook's `processSplitWith(...)` transaction is triggered automatically when the split is receiving funds.

#### What you'll want to know if you're building

* A split hook contract must adhere to the [`IJBSplitHook`](/v4/api/core/interfaces/ijbsplithook) interface.
* A split hook can be specified in a split through the [`JBController.launchProjectFor(...)`](/v4/api/core/contracts/jbcontroller/#launchprojectfor), [`JBController.launchRulesetsFor(...)`](/v4/api/core/contracts/jbcontroller/#launchrulesetsfor), [`JBController.queueRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#queuerulesetsof), or [`JBController.setSplitGroupsOf(...)`](/v4/api/core/contracts/jbcontroller/#setsplitGroupsof) transactions.

<!-- [Get started building split hooks](/v4/build/treasury-extensions/split-hook). -->

