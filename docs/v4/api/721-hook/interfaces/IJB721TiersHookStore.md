# IJB721TiersHookStore
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/interfaces/IJB721TiersHookStore.sol)


## Functions
### balanceOf


```solidity
function balanceOf(address hook, address owner) external view returns (uint256);
```

### cashOutWeightOf


```solidity
function cashOutWeightOf(address hook, uint256[] calldata tokenIds) external view returns (uint256 weight);
```

### defaultReserveBeneficiaryOf


```solidity
function defaultReserveBeneficiaryOf(address hook) external view returns (address);
```

### encodedIPFSUriOf


```solidity
function encodedIPFSUriOf(address hook, uint256 tierId) external view returns (bytes32);
```

### encodedTierIPFSUriOf


```solidity
function encodedTierIPFSUriOf(address hook, uint256 tokenId) external view returns (bytes32);
```

### flagsOf


```solidity
function flagsOf(address hook) external view returns (JB721TiersHookFlags memory);
```

### isTierRemoved


```solidity
function isTierRemoved(address hook, uint256 tierId) external view returns (bool);
```

### maxTierIdOf


```solidity
function maxTierIdOf(address hook) external view returns (uint256);
```

### numberOfBurnedFor


```solidity
function numberOfBurnedFor(address hook, uint256 tierId) external view returns (uint256);
```

### numberOfPendingReservesFor


```solidity
function numberOfPendingReservesFor(address hook, uint256 tierId) external view returns (uint256);
```

### numberOfReservesMintedFor


```solidity
function numberOfReservesMintedFor(address hook, uint256 tierId) external view returns (uint256);
```

### reserveBeneficiaryOf


```solidity
function reserveBeneficiaryOf(address hook, uint256 tierId) external view returns (address);
```

### tierBalanceOf


```solidity
function tierBalanceOf(address hook, address owner, uint256 tier) external view returns (uint256);
```

### tierIdOfToken


```solidity
function tierIdOfToken(uint256 tokenId) external pure returns (uint256);
```

### tierOf


```solidity
function tierOf(address hook, uint256 id, bool includeResolvedUri) external view returns (JB721Tier memory tier);
```

### tierOfTokenId


```solidity
function tierOfTokenId(
    address hook,
    uint256 tokenId,
    bool includeResolvedUri
)
    external
    view
    returns (JB721Tier memory tier);
```

### tiersOf


```solidity
function tiersOf(
    address hook,
    uint256[] calldata categories,
    bool includeResolvedUri,
    uint256 startingSortIndex,
    uint256 size
)
    external
    view
    returns (JB721Tier[] memory tiers);
```

### tierVotingUnitsOf


```solidity
function tierVotingUnitsOf(address hook, address account, uint256 tierId) external view returns (uint256 units);
```

### tokenUriResolverOf


```solidity
function tokenUriResolverOf(address hook) external view returns (IJB721TokenUriResolver);
```

### totalCashOutWeight


```solidity
function totalCashOutWeight(address hook) external view returns (uint256 weight);
```

### totalSupplyOf


```solidity
function totalSupplyOf(address hook) external view returns (uint256);
```

### votingUnitsOf


```solidity
function votingUnitsOf(address hook, address account) external view returns (uint256 units);
```

### cleanTiers


```solidity
function cleanTiers(address hook) external;
```

### recordAddTiers


```solidity
function recordAddTiers(JB721TierConfig[] calldata tierData) external returns (uint256[] memory tierIds);
```

### recordBurn


```solidity
function recordBurn(uint256[] calldata tokenIds) external;
```

### recordFlags


```solidity
function recordFlags(JB721TiersHookFlags calldata flag) external;
```

### recordMint


```solidity
function recordMint(
    uint256 amount,
    uint16[] calldata tierIds,
    bool isOwnerMint
)
    external
    returns (uint256[] memory tokenIds, uint256 leftoverAmount);
```

### recordMintReservesFor


```solidity
function recordMintReservesFor(uint256 tierId, uint256 count) external returns (uint256[] memory tokenIds);
```

### recordRemoveTierIds


```solidity
function recordRemoveTierIds(uint256[] calldata tierIds) external;
```

### recordSetEncodedIPFSUriOf


```solidity
function recordSetEncodedIPFSUriOf(uint256 tierId, bytes32 encodedIPFSUri) external;
```

### recordSetDiscountPercentOf


```solidity
function recordSetDiscountPercentOf(uint256 tierId, uint256 discountPercent) external;
```

### recordSetTokenUriResolver


```solidity
function recordSetTokenUriResolver(IJB721TokenUriResolver resolver) external;
```

### recordTransferForTier


```solidity
function recordTransferForTier(uint256 tierId, address from, address to) external;
```

## Events
### CleanTiers

```solidity
event CleanTiers(address indexed hook, address caller);
```

