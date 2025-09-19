# ITypeface

[Git Source](https://github.com/jbx-protocol/juice-token-resolver/blob/c700bd075c789c4790d30ba15ea2b31b7fc0791e/src/ITypeface.sol)

## Functions

### name

Returns the typeface name.

```solidity
function name() external view returns (string memory);
```

### supportsCodePoint

Check if typeface includes a glyph for a specific character code point.

*3 bytes supports all possible unicodes.*

```solidity
function supportsCodePoint(bytes3 codePoint) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`codePoint`|`bytes3`|Character code point.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true True if supported.|

### sourceOf

Return source data of Font.

```solidity
function sourceOf(Font memory font) external view returns (bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`font`|`Font`|Font to return source data for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|source Source data of font.|

### hasSource

Checks if source data has been stored for font.

```solidity
function hasSource(Font memory font) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`font`|`Font`|Font to check if source data exists for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true True if source exists.|

### setSource

Stores source data for a font.

```solidity
function setSource(Font memory font, bytes memory source) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`font`|`Font`|Font to store source data for.|
|`source`|`bytes`|Source data of font.|

### setDonationAddress

Sets a new donation address.

```solidity
function setDonationAddress(address donationAddress) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`donationAddress`|`address`|New donation address.|

### donationAddress

Returns donation address

```solidity
function donationAddress() external view returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|donationAddress Donation address.|

## Events

### SetSource

Emitted when the source is set for a font.

```solidity
event SetSource(Font font);
```

### SetSourceHash

Emitted when the source hash is set for a font.

```solidity
event SetSourceHash(Font font, bytes32 sourceHash);
```

### SetDonationAddress
Emitted when the donation address is set.

```solidity
event SetDonationAddress(address donationAddress);
```
