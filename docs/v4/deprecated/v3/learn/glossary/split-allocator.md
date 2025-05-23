# Split allocator

#### What everyone needs to know

* A project's payout distribution splits or its reserved token distribution splits can be directed at custom allocator contracts.
* An allocator can be attached to a project's split during any funding cycle configuration to automate the routing of treasury funds and reserved project tokens.
* An allocator's `allocate(...)` transaction is triggered automatically when the split is receiving funds.

#### What you'll want to know if you're building

* An allocator contract must adhere to the [`IJBSplitsAllocator`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitallocator.md) interface.
* An allocator can be specified in a split through the [`JBController3_1.launchProjectFor(...)`](/docs/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchprojectfor), [`JBController3_1.reconfigureFundingCyclesOf(...)`](/docs/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1.md#reconfigurefundingcyclesof), or [`JBSplitStore.set(...)`](/docs/v4/deprecated/v3/api/contracts/jbsplitsstore/write/set.md).

[Get started building split allocators](/docs/v4/deprecated/v3/build/treasury-extensions/split-allocator.md).
