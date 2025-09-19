# IJBRedemptionDelegate3_1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d45af6f3e4786ae53b9c9248af7f5f8ee832bece/contracts/interfaces/IJBRedemptionDelegate3_1_1.sol)

Inherits: [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165)

Delegate called after JBTerminal.redeemTokensOf(..) logic completion (if passed by the funding cycle datasource)

## Functions

### didRedeem

This function is called by JBPaymentTerminal.redeemTokensOf(..), after the execution of its logic

*Critical business logic should be protected by an appropriate access control*

```solidity
function didRedeem(JBDidRedeemData3_1_1 calldata data) external payable;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|[`JBDidRedeemData3_1_1`](/docs/dev/v3/api/data-structures/jbdidredeemdata3_1_1.md)|the data passed by the terminal, as a JBDidRedeemData struct:|

