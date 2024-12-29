# Splits

#### What everyone needs to know

* A project can store splits for an arbitrary number of groups, such as for payout distributions or for reserved token distributions.
* A split can specify an address, a Juicebox project, a contract that adheres to the [`IJBSplitHook`](/v4/api/core/interfaces/ijbsplithook) interface, or the address that calls the transaction to distribute payouts or reserved tokens as its recipient.
* By default, splits can be changed at any time for any ruleset configuration. A project's owner can also independently lock a split to a ruleset configuration for a customizable duration.

#### What you'll want to know if you're building

* Splits can be set for a ruleset configuration during the [`JBController.launchProjectFor(...)`](/v4/api/core/contracts/jbcontroller/#launchprojectfor), [`JBController.queueRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#queuerulesetsof), or [`JBController.launchRulesetsFor(...)`](/v4/api/core/contracts/jbcontroller/#launchrulesetsfor) transactions, or separately using [`JBController.setSplitGroupsOf(...)`](/v4/api/core/contracts/jbcontroller/#setsplitgroupsof).


