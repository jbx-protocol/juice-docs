# Reserved tokens

#### What everyone needs to know

* Reserved tokens allow a project to guarantee that a percentage of all newly minted tokens from payments will be reserved to a preprogrammed list of [`JBSplit`](/v4/api/core/structs/jbsplit)s. This percentage is referred to as the *reserved rate*.
* A project's reserved rate and reserved token splits can be reconfigured each ruleset.
* Reserved token splits can be routed to addresses, the owners of other Juicebox projects, to contracts that adhere to the [`IJBSplitHook`](/v4/api/core/interfaces/ijbsplithook) interface, or to the address that sent the [`JBController.sendReservedTokensToSplitsOf(...)`](/v4/api/core/contracts/jbcontroller/#sendreservedtokenstosplitsof) transaction.
* Reserved tokens do not get minted automatically when a new payment is received. Instead, they must be explicitly distributed using the [`JBController.distributeReservedTokensOf(...)`](/v4/api/core/contracts/jbcontroller/#distributereservedtokensof) transaction.

#### What you'll want to know if you're building

* A reserved rate can be specified in a ruleset through the [`JBController.launchProjectFor(...)`](/v4/api/core/contracts/jbcontroller/#launchprojectfor), [`JBController.launchRulesetsFor(...)`](/v4/api/core/contracts/jbcontroller/#launchrulesetsfor), or [`JBController.queueRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#queuerulesetsof) transactions.
* Distributing currently allocated reserved tokens is done by calling [`JBController.sendReservedTokensToSplitsOf(...)`](/v4/api/core/contracts/jbcontroller/#sendreservedtokenstosplitsof). 

