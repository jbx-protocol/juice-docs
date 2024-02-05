# JBIpfsDecoder

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/libraries/JBIpfsDecoder.sol)

Utilities to decode an IPFS hash.

*This is fairly gas intensive, due to multiple nested loops, onchain IPFS hash decoding is therefore not advised (storing them as a string, in that use-case, *might* be more efficient).*

## State Variables

### \_ALPHABET

Just a kind reminder to our readers.

_Used in base58ToString_

```solidity
bytes internal constant _ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
```

## Functions

### decode

```solidity
function decode(string memory _baseUri, bytes32 _hexString) internal pure returns (string memory);
```

### \_toBase58

Convert a hex string to base58

Written by Martin Ludfall - Licence: MIT

```solidity
function _toBase58(bytes memory _source) private pure returns (string memory);
```

### \_truncate

```solidity
function _truncate(uint8[] memory _array, uint8 _length) private pure returns (uint8[] memory);
```

### \_reverse

```solidity
function _reverse(uint8[] memory _input) private pure returns (uint8[] memory);
```

### \_toAlphabet

```solidity
function _toAlphabet(uint8[] memory _indices) private pure returns (bytes memory);
```
