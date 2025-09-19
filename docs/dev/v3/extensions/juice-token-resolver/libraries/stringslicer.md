# StringSlicer

[Git Source](https://github.com/jbx-protocol/juice-token-resolver/blob/c700bd075c789c4790d30ba15ea2b31b7fc0791e/src/Libraries/StringSlicer.sol)

## Functions

### slice

Abbreviates a string.

*This function uses Array Slices (https://blog.soliditylang.org/2020/05/26/array-slices/), which only work on calldata. The function must therefore live in a separate contract for a Token Resolver to use Array Slices.*

```solidity
function slice(string calldata _str, uint256 _start, uint256 _end) external pure returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_str`|`string`|The string to mutate.|
|`_start`|`uint256`|The first index of the input string to include in the output.|
|`_end`|`uint256`|The last index of the input string to include in the output.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|string The abbreviated string.|
