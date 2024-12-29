# IJBTiered721Delegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/interfaces/IJBTiered721Delegate.sol)

Inherits: [`IJB721Delegate`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijb721delegate.md)

## Functions

### codeOrigin

```solidity
function codeOrigin() external view returns (address);
```

### store

```solidity
function store() external view returns (IJBTiered721DelegateStore);
```

### fundingCycleStore

```solidity
function fundingCycleStore() external view returns (IJBFundingCycleStore);
```

### pricingContext

```solidity
function pricingContext() external view returns (uint256, uint256, IJBPrices);
```

### creditsOf

```solidity
function creditsOf(address _address) external view returns (uint256);
```

### firstOwnerOf

```solidity
function firstOwnerOf(uint256 _tokenId) external view returns (address);
```

### baseURI

```solidity
function baseURI() external view returns (string memory);
```

### contractURI

```solidity
function contractURI() external view returns (string memory);
```

### adjustTiers

```solidity
function adjustTiers(JB721TierParams[] memory tierDataToAdd, uint256[] memory tierIdsToRemove) external;
```

### mintReservesFor

```solidity
function mintReservesFor(JBTiered721MintReservesForTiersData[] memory mintReservesForTiersData) external;
```

### mintReservesFor

```solidity
function mintReservesFor(uint256 tierId, uint256 count) external;
```

### mintFor

```solidity
function mintFor(uint16[] calldata tierIds, address beneficiary) external returns (uint256[] memory tokenIds);
```

### setMetadata

```solidity
function setMetadata(
    string memory baseUri,
    string calldata contractMetadataUri,
    IJB721TokenUriResolver tokenUriResolver,
    uint256 encodedIPFSUriTierId,
    bytes32 encodedIPFSUri
) external;
```

### initialize

```solidity
function initialize(
    uint256 projectId,
    string memory name,
    string memory symbol,
    IJBFundingCycleStore fundingCycleStore,
    string memory baseUri,
    IJB721TokenUriResolver tokenUriResolver,
    string memory contractUri,
    JB721PricingParams memory pricing,
    IJBTiered721DelegateStore store,
    JBTiered721Flags memory flags
) external;
```

## Events

### Mint

```solidity
event Mint(
    uint256 indexed tokenId,
    uint256 indexed tierId,
    address indexed beneficiary,
    uint256 totalAmountContributed,
    address caller
);
```

### MintReservedToken

```solidity
event MintReservedToken(uint256 indexed tokenId, uint256 indexed tierId, address indexed beneficiary, address caller);
```

### AddTier

```solidity
event AddTier(uint256 indexed tierId, JB721TierParams data, address caller);
```

### RemoveTier

```solidity
event RemoveTier(uint256 indexed tierId, address caller);
```

### SetEncodedIPFSUri

```solidity
event SetEncodedIPFSUri(uint256 indexed tierId, bytes32 encodedIPFSUri, address caller);
```

### SetBaseUri

```solidity
event SetBaseUri(string indexed baseUri, address caller);
```

### SetContractUri

```solidity
event SetContractUri(string indexed contractUri, address caller);
```

### SetTokenUriResolver

```solidity
event SetTokenUriResolver(IJB721TokenUriResolver indexed newResolver, address caller);
```

### AddCredits

```solidity
event AddCredits(
    uint256 indexed changeAmount, uint256 indexed newTotalCredits, address indexed account, address caller
);
```

### UseCredits

```solidity
event UseCredits(
    uint256 indexed changeAmount, uint256 indexed newTotalCredits, address indexed account, address caller
);
```
