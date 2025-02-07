# IBanny721TokenUriResolver
[Git Source](https://github.com/mejango/banny-contract/blob/b8fd68f37fbb8d85a53ed051250e6280a383daf8/src/interfaces/IBanny721TokenUriResolver.sol)


## Functions
### svgHashOf


```solidity
function svgHashOf(uint256 upc) external view returns (bytes32);
```

### svgBaseUri


```solidity
function svgBaseUri() external view returns (string memory);
```

### outfitLockedUntil


```solidity
function outfitLockedUntil(address hook, uint256 tokenId) external view returns (uint256);
```

### DEFAULT_ALIEN_EYES


```solidity
function DEFAULT_ALIEN_EYES() external view returns (string memory);
```

### DEFAULT_MOUTH


```solidity
function DEFAULT_MOUTH() external view returns (string memory);
```

### DEFAULT_NECKLACE


```solidity
function DEFAULT_NECKLACE() external view returns (string memory);
```

### DEFAULT_STANDARD_EYES


```solidity
function DEFAULT_STANDARD_EYES() external view returns (string memory);
```

### NAKED_BANNY


```solidity
function NAKED_BANNY() external view returns (string memory);
```

### assetIdsOf


```solidity
function assetIdsOf(
    address hook,
    uint256 nakedBannyId
)
    external
    view
    returns (uint256 worldId, uint256[] memory outfitIds);
```

### userOf


```solidity
function userOf(address hook, uint256 worldId) external view returns (uint256);
```

### wearerOf


```solidity
function wearerOf(address hook, uint256 outfitId) external view returns (uint256);
```

### svgOf


```solidity
function svgOf(
    address hook,
    uint256 tokenId,
    bool shouldDressNakedBanny,
    bool shouldIncludeWorldOnNakedBanny
)
    external
    view
    returns (string memory);
```

### namesOf


```solidity
function namesOf(address hook, uint256 tokenId) external view returns (string memory, string memory, string memory);
```

### decorateBannyWith


```solidity
function decorateBannyWith(
    address hook,
    uint256 nakedBannyId,
    uint256 worldId,
    uint256[] calldata outfitIds
)
    external;
```

### lockOutfitChangesFor


```solidity
function lockOutfitChangesFor(address hook, uint256 nakedBannyId) external;
```

### setSvgContentsOf


```solidity
function setSvgContentsOf(uint256[] memory upcs, string[] calldata svgContents) external;
```

### setSvgHashsOf


```solidity
function setSvgHashsOf(uint256[] memory upcs, bytes32[] memory svgHashs) external;
```

### setProductNames


```solidity
function setProductNames(uint256[] memory upcs, string[] memory names) external;
```

### setSvgBaseUri


```solidity
function setSvgBaseUri(string calldata baseUri) external;
```

## Events
### DecorateBanny

```solidity
event DecorateBanny(
    address indexed hook, uint256 indexed nakedBannyId, uint256 indexed worldId, uint256[] outfitIds, address caller
);
```

### SetProductName

```solidity
event SetProductName(uint256 indexed upc, string name, address caller);
```

### SetSvgBaseUri

```solidity
event SetSvgBaseUri(string baseUri, address caller);
```

### SetSvgContent

```solidity
event SetSvgContent(uint256 indexed upc, string svgContent, address caller);
```

### SetSvgHash

```solidity
event SetSvgHash(uint256 indexed upc, bytes32 indexed svgHash, address caller);
```

