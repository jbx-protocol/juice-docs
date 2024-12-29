# Ballot

#### What everyone needs to know

* A project's funding cycle reconfigurations can vary widely. Custom ballots can be useful to keep changes in check.
* A ballot contract must implement a function that tells the world if the state of a proposed reconfiguration is `active`, `approved`, or `failed`, as defined in [`JBBallotState`](/v4/deprecated/v3/api/enums/jbballotstate.md).
* If a reconfiguration fails to be approved by a ballot, it will not be used. Instead, a copy of the current funding cycle will be used.

#### What you'll want to know if you're building

* A ballot is a custom contract that adheres to the [`IJBFundingCycleBallot`](/v4/deprecated/v3/api/interfaces/ijbfundingcycleballot.md) interface, which can be attached to a project's funding cycles to create restrictive conditions according to which proposed funding cycle reconfigurations must follow in order to take effect.
* A ballot can be specified in a funding cycle through the [`JBController3_1.launchProjectFor(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor) or [`JBController3_1.reconfigureFundingCyclesOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof) transactions.
* If a ballot is active, the funding cycle's [ballot redemption rate will be used instead of its standard redemption rate](redemption-rate.md).

[Get started building ballots](/v4/deprecated/v3/build/treasury-extensions/ballot.md).
