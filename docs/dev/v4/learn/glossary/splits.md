# Splits

#### What everyone needs to know

* A project can store splits for an arbitrary number of groups, such as for payout distributions or for reserved token distributions.
* A split can specify an address, a Juicebox project, a contract that adheres to the [`IJBSplitHook`](/docs/dev/v4/api/core/interfaces/IJBSplitHook.md) interface, or the address that calls the transaction to distribute payouts or reserved tokens as its recipient.
* By default, splits can be changed at any time for any ruleset configuration. A project's owner can also independently lock a split to a ruleset configuration for a customizable duration.

#### What you'll want to know if you're building

* Splits can be set for a ruleset configuration during the [`JBController4_1.launchProjectFor(...)`](/docs/dev/v4/api/core/JBController.md#launchprojectfor), [`JBController4_1.queueRulesetsOf(...)`](/docs/dev/v4/api/core/JBController.md#queuerulesetsof), or [`JBController4_1.launchRulesetsFor(...)`](/docs/dev/v4/api/core/JBController.md#launchrulesetsfor) transactions, or separately using [`JBController4_1.setSplitGroupsOf(...)`](/docs/dev/v4/api/core/JBController.md#setsplitgroupsof).


