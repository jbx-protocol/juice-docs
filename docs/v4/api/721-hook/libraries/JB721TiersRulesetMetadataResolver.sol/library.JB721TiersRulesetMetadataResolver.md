# JB721TiersRulesetMetadataResolver
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/libraries/JB721TiersRulesetMetadataResolver.sol)

Utility library to parse and store ruleset metadata associated for the tiered 721 hook.

*This library parses the `metadata` member of the `JBRulesetMetadata` struct.*


## Functions
### transfersPaused


```solidity
function transfersPaused(uint256 data) internal pure returns (bool);
```

### mintPendingReservesPaused


```solidity
function mintPendingReservesPaused(uint256 data) internal pure returns (bool);
```

### pack721TiersRulesetMetadata

Pack the ruleset metadata for the 721 hook into a single `uint256`.


```solidity
function pack721TiersRulesetMetadata(JB721TiersRulesetMetadata memory metadata)
    internal
    pure
    returns (uint256 packed);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`metadata`|`JB721TiersRulesetMetadata`|The metadata to validate and pack.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`packed`|`uint256`|A `uint256` containing the packed metadata for the 721 hook.|


### expandMetadata

Expand packed ruleset metadata for the 721 hook.


```solidity
function expandMetadata(uint16 packedMetadata) internal pure returns (JB721TiersRulesetMetadata memory metadata);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`packedMetadata`|`uint16`|The packed metadata to expand.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`metadata`|`JB721TiersRulesetMetadata`|The metadata as a `JB721TiersRulesetMetadata` struct.|


