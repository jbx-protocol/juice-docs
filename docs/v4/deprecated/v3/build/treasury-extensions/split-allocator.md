# Split allocator

Before implementing, learn about allocators [here](/v4/deprecated/v3/learn/glossary/split-allocator.md), and splits [here](/v4/deprecated/v3/learn/glossary/splits.md).

#### Specs

A contract can become a split allocator by adhering to [`IJBSplitAllocator`](/v4/deprecated/v3/api/interfaces/ijbsplitallocator.md):

```
interface IJBSplitAllocator {
  function allocate(JBSplitAllocationData calldata _data) external payable;
}
```

When extending payout distribution or reserved token distribution functionality with an allocator, the protocol will pass a [`JBSplitAllocationData`](/v4/deprecated/v3/api/data-structures/jbsplitallocationdata.md) to the `allocate(...)` function:

```
struct JBSplitAllocationData {
  address token;
  uint256 amount;
  uint256 decimals;
  uint256 projectId;
  uint256 group;
  JBSplit split;
}
```

```
struct JBSplit {
  bool preferClaimed;
  bool preferAddToBalance;
  uint256 percent;
  uint256 projectId;
  address payable beneficiary;
  uint256 lockedUntil;
  IJBSplitAllocator allocator;
}
```

The `msg.sender` to the allocator will either be the payment terminal that facilitated the payout distribution, or the controller that facilitated the reserved tokens distribution.

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1), such as [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/)'s and [`JBERC20PaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1/)'s, the allocator hook gets called while the payouts are being distributed to splits. [View the docs](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#_distributetopayoutsplitsof).

* If the allocation is coming from an ETH payment terminal such as [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/), the ETH will be included in the call to `allocate(...)`.
* If the allocation is coming from an ERC20 payment terminal such as [`JBERC20PaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1/), the tokens will be pre-approved for the allocator contract to transfer them to it. Make sure to initiate the transfer, and make sure to not leave allocated tokens stuck in the allocator contract.
* If the allocation is coming from a controller such as [`JBController3_1`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/) distributing reserved tokens, the tokens will be minted pre-distributed to the allocator's address. If the split's `preferClaimed` property is `true` and the project has a token a contract attached, the tokens will be minted directly to the allocator contract. Otherwise, they will be allocated in the  [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/README.md) as unclaimed tokens from which the allocator can then [`claimFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/claimfor.md) itself or [`transferFrom(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/transferfrom.md) itself to another address. Make sure to not leave allocated tokens stuck in the allocator contract or unclaimed in the [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/README.md) contract.

#### Attaching

New allocator contracts should be deployed independently. Once deployed, its address can be configured into a project's payout splits or reserved token splits so that any distribution triggered while the funding cycle is active sends the relevant token to the allocator contract's `allocate(...)` hook.
