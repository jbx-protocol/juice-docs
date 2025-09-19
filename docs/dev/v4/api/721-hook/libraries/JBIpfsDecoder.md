# JBIpfsDecoder
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/libraries/JBIpfsDecoder.sol)

Utilities to decode an IPFS hash.

*This is fairly gas intensive due to multiple nested loops. Onchain IPFS hash decoding is not advised –
storing them as a string *might* be more efficient for that use-case.*


## State Variables
### ALPHABET
Just a kind reminder to our readers.

*Used in `base58ToString`*


```solidity
bytes internal constant ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
```


## Functions
### decode


```solidity
function decode(string memory baseUri, bytes32 hexString) internal pure returns (string memory);
```

### _toBase58

Convert a hex string to base58

Written by Martin Ludfall - Licence: MIT


```solidity
function _toBase58(bytes memory source) private pure returns (string memory);
```

### _truncate


```solidity
function _truncate(uint8[] memory array, uint8 length) private pure returns (uint8[] memory);
```

### _reverse


```solidity
function _reverse(uint8[] memory input) private pure returns (uint8[] memory);
```

### _toAlphabet


```solidity
function _toAlphabet(uint8[] memory indices) private pure returns (bytes memory);
```

