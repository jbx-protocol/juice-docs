# Weight Cut Percent

#### What everyone needs to know

* The weight cut percent is a percentage configured in each ruleset that determines by how much the subsequent ruleset's `weight` should decrease compared to the current ruleset for which the weight cut percent is set.
* The weight cut percent is only applied if a new `weight` isn't explicitly set in an upcoming ruleset.
* The weight cut percent can be used to automatically decrease token issuance over time. Rulesets with higher `weightCutPercent`s and/or shorter durations will have token issuance decrease faster than those with smaller `weightCutPercent`s and/or longer durations.

#### What you'll want to know if you're building

* The weight cut percent can be specified in a ruleset through the [`JBController.launchProjectFor(...)`](/docs/v4/api/core/JBController.md#launchprojectfor), [`JBController.launchFundingCyclesFor(...)`](/docs/v4/api/core/JBController.md#launchfundingcyclesfor), or [`JBController.queueRulesetsOf(...)`](/docs/v4/api/core/JBController.md#queuerulesetsof) transactions. 
* A weight of `0` will inherit from the previous ruleset's weight. Send `1` to explicitly set issuance to zero.

