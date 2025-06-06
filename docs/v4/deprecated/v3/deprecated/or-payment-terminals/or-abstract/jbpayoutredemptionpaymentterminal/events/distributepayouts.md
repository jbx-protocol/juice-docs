# DistributePayouts

Emitted from:

* [`_distributePayoutsOf`](/docs/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_distributepayoutsof.md)

#### Definition

```
event DistributePayouts(
  uint256 indexed fundingCycleConfiguration,
  uint256 indexed fundingCycleNumber,
  uint256 indexed projectId,
  address beneficiary,
  uint256 amount,
  uint256 distributedAmount,
  uint256 fee,
  uint256 beneficiaryDistributionAmount,
  string memo,
  address caller
);
```

* `fundingCycleConfiguration` is the funding cycle configuration during which payouts were distributed.
* `fundingCycleNumber` is the number of the funding cycle during which payouts were distributed.
* `projectId` is the ID of the project that had payout distributed.
* `beneficiary` is the address who owns the project and who received any leftover payouts after splits were settled.
* `amount` is the total amount that was distributed.
* `distributedAmount` is the total amount of tokens that were distributed from the project's balance.
* `fee` is the total amount of tokens that were paid as a fee as a result of the distribution.
* `beneficiaryDistributionAmount` is the total amount of tokens that was distributed to the beneficiary.
* `memo` is a note that was attached.
* `caller` is the address that issued the transaction within which the event was emitted.
