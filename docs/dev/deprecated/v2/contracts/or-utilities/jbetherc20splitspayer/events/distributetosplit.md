# DistributeToSplit

Emitted from:

* [`_payTo`](/dev/deprecated/v2/contracts/or-utilities/jbetherc20splitspayer/write/-_payto.md)

#### Definition

```
event DistributeToSplit(
  JBSplit split,
  uint256 amount,
  address defaultBeneficiary,
  address caller
);
```

* `split` is the [`JBSplit`](/dev/deprecated/v2/data-structures/jbsplit.md) to which the distribution was made.
* `amount` is the total token amount that was distributed to the split.
* `defaultBeneficiary` is the address that'll be sent tokens if the split doesn't specify a recipient.
* `caller` is the address that issued the transaction within which the event was emitted.
