# IJBTiered721Delegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/331ed61b7ae1a4c4536bcd78f5e0b7d4a67c2869/contracts/interfaces/IJBTiered721Delegate.sol)

Inherits: [`IJB721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijb721delegate.md)

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
function adjustTiers(JB721TierParams[] memory _tierDataToAdd, uint256[] memory _tierIdsToRemove) external;
```

### mintReservesFor

```solidity
function mintReservesFor(JBTiered721MintReservesForTiersData[] memory _mintReservesForTiersData) external;
```

### mintReservesFor

```solidity
function mintReservesFor(uint256 _tierId, uint256 _count) external;
```

### mintFor

```solidity
function mintFor(uint16[] calldata _tierIds, address _beneficiary) external returns (uint256[] memory tokenIds);
```

### setMetadata

```solidity
function setMetadata(
    string memory _baseUri,
    string calldata _contractMetadataUri,
    IJBTokenUriResolver _tokenUriResolver,
    uint256 _encodedIPFSUriTierId,
    bytes32 _encodedIPFSUri
) external;
```

### initialize

```solidity
function initialize(
    uint256 _projectId,
    IJBDirectory _directory,
    string memory _name,
    string memory _symbol,
    IJBFundingCycleStore _fundingCycleStore,
    string memory _baseUri,
    IJBTokenUriResolver _tokenUriResolver,
    string memory _contractUri,
    JB721PricingParams memory _pricing,
    IJBTiered721DelegateStore _store,
    JBTiered721Flags memory _flags
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

### SetDefaultReservedTokenBeneficiary

```solidity
event SetDefaultReservedTokenBeneficiary(address indexed beneficiary, address caller);
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
event SetTokenUriResolver(IJBTokenUriResolver indexed newResolver, address caller);
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

