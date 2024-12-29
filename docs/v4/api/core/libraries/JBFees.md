# JBFees
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/libraries/JBFees.sol)

Fee calculations.


## Functions
### feeAmountIn

Returns the amount of tokens to pay as a fee out of the specified `amount`.

*The resulting fee will be `feePercent` of the REMAINING `amount` after subtracting the fee, not the full
`amount`.*


```solidity
function feeAmountIn(uint256 amount, uint256 feePercent) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount that the fee is based on, as a fixed point number.|
|`feePercent`|`uint256`|The fee percent, out of `JBConstants.MAX_FEE`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokens to pay as a fee, as a fixed point number with the same number of decimals as the provided `amount`.|


### feeAmountFrom

Returns the fee that would have been paid based on an `amount` which has already had the fee subtracted
from it.

*The resulting fee will be `feePercent` of the full `amount`.*


```solidity
function feeAmountFrom(uint256 amount, uint256 feePercent) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount that the fee is based on, as a fixed point number with the same amount of decimals as this terminal.|
|`feePercent`|`uint256`|The fee percent, out of `JBConstants.MAX_FEE`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of the fee, as a fixed point number with the same amount of decimals as this terminal.|


