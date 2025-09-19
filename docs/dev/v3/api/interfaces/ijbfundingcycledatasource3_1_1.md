# IJBFundingCycleDataSource3_1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d45af6f3e4786ae53b9c9248af7f5f8ee832bece/contracts/interfaces/IJBFundingCycleDataSource3_1_1.sol)

Inherits: [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165)

The datasource is called by JBPayoutRedemptionPaymentTerminals on pay and redemption, and provide an extra layer of logic to use a custom weight, a custom memo and/or a pay/redeem delegate

## Functions

### payParams

The datasource implementation for JBPaymentTerminal.pay(..)

```solidity
function payParams(JBPayParamsData calldata data)
    external
    view
    returns (
        uint256 weight,
        string memory memo,
        JBPayDelegateAllocation3_1_1[] memory delegateAllocations
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|[`JBPayParamsData`](/docs/dev/v3/api/data-structures/jbpayparamsdata.md)|the data passed to the data source in terminal.pay(..), as a JBPayParamsData struct:|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|the weight to use to override the funding cycle weight|
|`memo`|`string`|the memo to override the pay(..) memo|
|`delegateAllocations`|[`JBPayDelegateAllocation3_1_1[]`](/docs/dev/v3/api/data-structures/jbpaydelegateallocation3_1_1.md)|The amount to send to delegates instead of adding to the local balance.|

### redeemParams

The datasource implementation for JBPaymentTerminal.redeemTokensOf(..)

```solidity
function redeemParams(JBRedeemParamsData calldata data)
    external
    view
    returns (
        uint256 reclaimAmount,
        string memory memo,
        JBRedemptionDelegateAllocation3_1_1[] memory delegateAllocations
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|[`JBRedeemParamsData`](/docs/dev/v3/api/data-structures/jbredeemparamsdata.md)|the data passed to the data source in terminal.redeemTokensOf(..), as a JBRedeemParamsData struct:|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimAmount`|`uint256`|The amount to claim, overriding the terminal logic.|
|`memo`|`string`|The memo to override the redeemTokensOf(..) memo.|
|`delegateAllocations`|[`JBRedemptionDelegateAllocation3_1_1[]`](/docs/dev/v3/api/data-structures/jbredemptiondelegateallocation3_1_1.md)|The amount to send to delegates instead of adding to the beneficiary.|

