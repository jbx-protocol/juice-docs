# Reserved tokens

#### What everyone needs to know

* Reserved tokens allow a project to guarantee that a percentage of all newly minted tokens from payments will be reserved to a preprogrammed list of [`JBSplit`](/docs/v4/api/core/structs/JBSplit.md)s. This percentage is referred to as the *reserved rate*.
* A project's reserved rate and reserved token splits can be reconfigured each ruleset.
* Reserved token splits can be routed to addresses, the owners of other Juicebox projects, to contracts that adhere to the [`IJBSplitHook`](/docs/v4/api/core/interfaces/IJBSplitHook.md) interface, or to the address that sent the [`JBController4_1.sendReservedTokensToSplitsOf(...)`](/docs/v4/api/core/JBController.md#sendreservedtokenstosplitsof) transaction.
* Reserved tokens do not get minted automatically when a new payment is received. Instead, they must be explicitly distributed using the [`JBController4_1.sendReservedTokensToSplitsOf(...)`](/docs/v4/api/core/JBController.md#sendreservedtokenstosplitsof) transaction.

#### What you'll want to know if you're building

* A reserved rate can be specified in a ruleset through the [`JBController4_1.launchProjectFor(...)`](/docs/v4/api/core/JBController.md#launchprojectfor), [`JBController4_1.launchRulesetsFor(...)`](/docs/v4/api/core/JBController.md#launchrulesetsfor), or [`JBController4_1.queueRulesetsOf(...)`](/docs/v4/api/core/JBController.md#queuerulesetsof) transactions.
* Distributing currently allocated reserved tokens is done by calling [`JBController4_1.sendReservedTokensToSplitsOf(...)`](/docs/v4/api/core/JBController.md#sendreservedtokenstosplitsof). 

