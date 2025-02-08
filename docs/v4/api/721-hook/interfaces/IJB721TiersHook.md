# IJB721TiersHook
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/interfaces/IJB721TiersHook.sol)

**Inherits:**
[IJB721Hook](/docs/v4/api/721-hook/interfaces/IJB721Hook.md)


## Functions
### RULESETS


```solidity
function RULESETS() external view returns (IJBRulesets);
```

### STORE


```solidity
function STORE() external view returns (IJB721TiersHookStore);
```

### baseURI


```solidity
function baseURI() external view returns (string memory);
```

### contractURI


```solidity
function contractURI() external view returns (string memory);
```

### firstOwnerOf


```solidity
function firstOwnerOf(uint256 tokenId) external view returns (address);
```

### payCreditsOf


```solidity
function payCreditsOf(address addr) external view returns (uint256);
```

### pricingContext


```solidity
function pricingContext() external view returns (uint256, uint256, IJBPrices);
```

### adjustTiers


```solidity
function adjustTiers(JB721TierConfig[] calldata tierDataToAdd, uint256[] calldata tierIdsToRemove) external;
```

### initialize


```solidity
function initialize(
    uint256 projectId,
    string memory name,
    string memory symbol,
    string memory baseUri,
    IJB721TokenUriResolver tokenUriResolver,
    string memory contractUri,
    JB721InitTiersConfig memory tiersConfig,
    JB721TiersHookFlags memory flags
)
    external;
```

### setDiscountPercentOf


```solidity
function setDiscountPercentOf(uint256 tierId, uint256 discountPercent) external;
```

### setDiscountPercentsOf


```solidity
function setDiscountPercentsOf(JB721TiersSetDiscountPercentConfig[] calldata configs) external;
```

### mintFor


```solidity
function mintFor(uint16[] calldata tierIds, address beneficiary) external returns (uint256[] memory tokenIds);
```

### mintPendingReservesFor


```solidity
function mintPendingReservesFor(JB721TiersMintReservesConfig[] calldata reserveMintConfigs) external;
```

### mintPendingReservesFor


```solidity
function mintPendingReservesFor(uint256 tierId, uint256 count) external;
```

### setMetadata


```solidity
function setMetadata(
    string calldata baseUri,
    string calldata contractMetadataUri,
    IJB721TokenUriResolver tokenUriResolver,
    uint256 encodedIPFSUriTierId,
    bytes32 encodedIPFSUri
)
    external;
```

## Events
### AddPayCredits

```solidity
event AddPayCredits(uint256 indexed amount, uint256 indexed newTotalCredits, address indexed account, address caller);
```

### AddTier

```solidity
event AddTier(uint256 indexed tierId, JB721TierConfig tier, address caller);
```

### Mint

```solidity
event Mint(
    uint256 indexed tokenId,
    uint256 indexed tierId,
    address indexed beneficiary,
    uint256 totalAmountPaid,
    address caller
);
```

### MintReservedNft

```solidity
event MintReservedNft(uint256 indexed tokenId, uint256 indexed tierId, address indexed beneficiary, address caller);
```

### RemoveTier

```solidity
event RemoveTier(uint256 indexed tierId, address caller);
```

### SetBaseUri

```solidity
event SetBaseUri(string indexed baseUri, address caller);
```

### SetContractUri

```solidity
event SetContractUri(string indexed uri, address caller);
```

### SetDiscountPercent

```solidity
event SetDiscountPercent(uint256 indexed tierId, uint256 discountPercent, address caller);
```

### SetEncodedIPFSUri

```solidity
event SetEncodedIPFSUri(uint256 indexed tierId, bytes32 encodedUri, address caller);
```

### SetTokenUriResolver

```solidity
event SetTokenUriResolver(IJB721TokenUriResolver indexed resolver, address caller);
```

### UsePayCredits

```solidity
event UsePayCredits(uint256 indexed amount, uint256 indexed newTotalCredits, address indexed account, address caller);
```

