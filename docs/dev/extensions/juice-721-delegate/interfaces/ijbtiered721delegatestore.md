# IJBTiered721DelegateStore

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/interfaces/IJBTiered721DelegateStore.sol)

## Functions

### totalSupplyOf

```solidity
function totalSupplyOf(address _nft) external view returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address _nft, address _owner) external view returns (uint256);
```

### maxTierIdOf

```solidity
function maxTierIdOf(address _nft) external view returns (uint256);
```

### tiersOf

```solidity
function tiersOf(
    address nft,
    uint256[] calldata categories,
    bool includeResolvedUri,
    uint256 startingSortIndex,
    uint256 size
) external view returns (JB721Tier[] memory tiers);
```

### tierOf

```solidity
function tierOf(address nft, uint256 id, bool includeResolvedUri) external view returns (JB721Tier memory tier);
```

### tierBalanceOf

```solidity
function tierBalanceOf(address nft, address owner, uint256 tier) external view returns (uint256);
```

### tierOfTokenId

```solidity
function tierOfTokenId(address nft, uint256 tokenId, bool includeResolvedUri)
    external
    view
    returns (JB721Tier memory tier);
```

### tierIdOfToken

```solidity
function tierIdOfToken(uint256 tokenId) external pure returns (uint256);
```

### encodedIPFSUriOf

```solidity
function encodedIPFSUriOf(address nft, uint256 tierId) external view returns (bytes32);
```

### redemptionWeightOf

```solidity
function redemptionWeightOf(address nft, uint256[] memory tokenIds) external view returns (uint256 weight);
```

### totalRedemptionWeight

```solidity
function totalRedemptionWeight(address nft) external view returns (uint256 weight);
```

### numberOfReservedTokensOutstandingFor

```solidity
function numberOfReservedTokensOutstandingFor(address nft, uint256 tierId) external view returns (uint256);
```

### numberOfReservesMintedFor

```solidity
function numberOfReservesMintedFor(address nft, uint256 tierId) external view returns (uint256);
```

### numberOfBurnedFor

```solidity
function numberOfBurnedFor(address nft, uint256 tierId) external view returns (uint256);
```

### isTierRemoved

```solidity
function isTierRemoved(address nft, uint256 tierId) external view returns (bool);
```

### flagsOf

```solidity
function flagsOf(address nft) external view returns (JBTiered721Flags memory);
```

### votingUnitsOf

```solidity
function votingUnitsOf(address nft, address account) external view returns (uint256 units);
```

### tierVotingUnitsOf

```solidity
function tierVotingUnitsOf(address nft, address account, uint256 tierId) external view returns (uint256 units);
```

### defaultReservedTokenBeneficiaryOf

```solidity
function defaultReservedTokenBeneficiaryOf(address nft) external view returns (address);
```

### reservedTokenBeneficiaryOf

```solidity
function reservedTokenBeneficiaryOf(address nft, uint256 tierId) external view returns (address);
```

### tokenUriResolverOf

```solidity
function tokenUriResolverOf(address nft) external view returns (IJB721TokenUriResolver);
```

### encodedTierIPFSUriOf

```solidity
function encodedTierIPFSUriOf(address nft, uint256 tokenId) external view returns (bytes32);
```

### recordAddTiers

```solidity
function recordAddTiers(JB721TierParams[] memory tierData) external returns (uint256[] memory tierIds);
```

### recordMintReservesFor

```solidity
function recordMintReservesFor(uint256 tierId, uint256 count) external returns (uint256[] memory tokenIds);
```

### recordBurn

```solidity
function recordBurn(uint256[] memory tokenIds) external;
```

### recordMint

```solidity
function recordMint(uint256 amount, uint16[] calldata tierIds, bool isManualMint)
    external
    returns (uint256[] memory tokenIds, uint256 leftoverAmount);
```

### recordTransferForTier

```solidity
function recordTransferForTier(uint256 tierId, address from, address to) external;
```

### recordRemoveTierIds

```solidity
function recordRemoveTierIds(uint256[] memory tierIds) external;
```

### recordSetTokenUriResolver

```solidity
function recordSetTokenUriResolver(IJB721TokenUriResolver resolver) external;
```

### recordSetEncodedIPFSUriOf

```solidity
function recordSetEncodedIPFSUriOf(uint256 tierId, bytes32 encodedIPFSUri) external;
```

### recordFlags

```solidity
function recordFlags(JBTiered721Flags calldata flag) external;
```

### cleanTiers

```solidity
function cleanTiers(address nft) external;
```

## Events

### CleanTiers

```solidity
event CleanTiers(address indexed nft, address caller);
```
