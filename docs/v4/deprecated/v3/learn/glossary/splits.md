# Splits

#### What everyone needs to know

* A project can store splits for an arbitrary number of groups, such as for payout distributions or for reserved token distributions.
* A split can specify an address, a Juicebox project, a contract that adheres to the [`IJBSplitAllocator`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitallocator.md) interface, or the address that calls the transaction to distribute payouts or reserved tokens as its recipient.
* By default, splits can be changed at any time for any funding cycle configuration. A project's owner can also independently lock a split to a funding cycle configuration for a customizable duration.

#### What you'll want to know if you're building

* Splits can be set for a funding cycle configuration during the [`JBController3_1.launchProjectFor(...)`](/docs/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchprojectfor) or [`JBController3_1.reconfigureFundingCyclesOf(...)`](/docs/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1.md#reconfigurefundingcyclesof) transactions, or separately using [`JBSplitStore.set(...)`](/docs/v4/deprecated/v3/api/contracts/jbsplitsstore/write/set.md).
