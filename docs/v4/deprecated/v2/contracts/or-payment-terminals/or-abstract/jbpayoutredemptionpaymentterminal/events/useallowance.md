# UseAllowance

Emitted from:

* [`_useAllowanceOf`](/docs/v4/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_useallowanceof.md)

#### Definition

```
event UseAllowance(
  uint256 indexed fundingCycleConfiguration,
  uint256 indexed fundingCycleNumber,
  uint256 indexed projectId,
  address beneficiary,
  uint256 amount,
  uint256 distributedAmount,
  uint256 netDistributedamount,
  string memo,
  address caller
);
```

* `fundingCycleConfiguration` is the funding cycle configuration during which an allowance was used.
* `fundingCycleNumber` is the number of the funding cycle during which an allowance was used.
* `projectId` is the ID of the project whose allowance was used.
* `beneficiary` is the address whose received the allowance.
* `amount` is the amount of allowance that was used in terms of the funding cycle's currency.
* `distributedAmount` is the total amount of tokens that were distributed from the project's balance.
* `netDistributedamount` is the amount of tokens that were distributed to the beneficiary.
* `memo` is a note that was attached.
* `caller` is the address that issued the transaction within which the event was emitted.
