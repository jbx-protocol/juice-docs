# Discount rate

#### What everyone needs to know

* A discount rate is a percentage configured on each funding cycle that determines by how much the subsequent cycle's `weight` (i.e. exchange rate) should decrease compared to the funding cycle for which the discount rate is set.
* A discount rate is only applied if a new `weight` isn't explicitly set in an upcoming funding cycle reconfiguration.
* A discount rate can be used to automatically decrease token issuance over time. Funding cycles with higher `discountRate`s and/or shorter `duration`s will have token issuance decrease faster than those with smaller `discountRate`s and/or longer `duration`s.

#### What you'll want to know if you're building

* A discount rate can be specified in a funding cycle through the [`JBController3_1.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor) or [`JBController3_1.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof) transactions.
