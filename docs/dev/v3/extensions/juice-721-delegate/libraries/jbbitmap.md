# JBBitmap

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/libraries/JBBitmap.sol)

Utilities to manage bool bitmap storing the inactive tiers.

## Functions

### readId

Initialize a BitmapWord struct, based on the mapping storage pointer and a given index.

```solidity
function readId(mapping(uint256 => uint256) storage self, uint256 _index) internal view returns (JBBitmapWord memory);
```

### isTierIdRemoved

Returns the status of a given bit, in the single word stored in a BitmapWord struct.

```solidity
function isTierIdRemoved(JBBitmapWord memory self, uint256 _index) internal pure returns (bool);
```

### isTierIdRemoved

Returns the status of a bit in a given bitmap (index is the index in the reshaped bitmap matrix 1\*n).

```solidity
function isTierIdRemoved(mapping(uint256 => uint256) storage self, uint256 _index) internal view returns (bool);
```

### removeTier

Flip the bit at a given index to true (this is a one-way operation).

```solidity
function removeTier(mapping(uint256 => uint256) storage self, uint256 _index) internal;
```

### refreshBitmapNeeded

Return true if the index is in an another word than the one stored in the BitmapWord struct.

```solidity
function refreshBitmapNeeded(JBBitmapWord memory self, uint256 _index) internal pure returns (bool);
```

### \_retrieveDepth

Return the lines of the bitmap matrix where an index lies.

```solidity
function _retrieveDepth(uint256 _index) internal pure returns (uint256);
```
