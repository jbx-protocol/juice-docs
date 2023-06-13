# JBTiered721FundingCycleMetadataResolver

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/42d3a6d91f96ac82ae443fb9b5a22dd1ff8d398e/contracts/libraries/JBTiered721FundingCycleMetadataResolver.sol)

Utility library to parse and store tiered 721 funding cycle metadata.

## Functions

### transfersPaused

```solidity
function transfersPaused(uint256 _data) internal pure returns (bool);
```

### mintingReservesPaused

```solidity
function mintingReservesPaused(uint256 _data) internal pure returns (bool);
```

### packFundingCycleGlobalMetadata

Pack the tiered 721 funding cycle metadata.

```solidity
function packFundingCycleGlobalMetadata(JBTiered721FundingCycleMetadata memory _metadata)
    internal
    pure
    returns (uint256 packed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|[`JBTiered721FundingCycleMetadata`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721fundingcyclemetadata.md)|The metadata to validate and pack.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`packed`|`uint256`|The packed uint256 of all tiered 721 metadata params.|

### expandMetadata

Expand the tiered 721 funding cycle metadata.

```solidity
function expandMetadata(uint8 _packedMetadata)
    internal
    pure
    returns (JBTiered721FundingCycleMetadata memory metadata);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_packedMetadata`|`uint8`|The packed metadata to expand.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`metadata`|[`JBTiered721FundingCycleMetadata`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721fundingcyclemetadata.md)|The tiered 721 metadata object.|

