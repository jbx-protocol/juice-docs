# IJBTiered721DelegateStore

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/interfaces/IJBTiered721DelegateStore.sol)

## Functions

### MAX_ROYALTY_RATE

```solidity
function MAX_ROYALTY_RATE() external view returns (uint256);
```

### totalSupply

```solidity
function totalSupply(address _nft) external view returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address _nft, address _owner) external view returns (uint256);
```

### maxTierIdOf

```solidity
function maxTierIdOf(address _nft) external view returns (uint256);
```

### tiers

```solidity
function tiers(address _nft, uint256 _category, uint256 _startingSortIndex, uint256 _size)
    external
    view
    returns (JB721Tier[] memory tiers);
```

### tier

```solidity
function tier(address _nft, uint256 _id) external view returns (JB721Tier memory tier);
```

### tierBalanceOf

```solidity
function tierBalanceOf(address _nft, address _owner, uint256 _tier) external view returns (uint256);
```

### tierOfTokenId

```solidity
function tierOfTokenId(address _nft, uint256 _tokenId) external view returns (JB721Tier memory tier);
```

### tierIdOfToken

```solidity
function tierIdOfToken(uint256 _tokenId) external pure returns (uint256);
```

### encodedIPFSUriOf

```solidity
function encodedIPFSUriOf(address _nft, uint256 _tierId) external view returns (bytes32);
```

### firstOwnerOf

```solidity
function firstOwnerOf(address _nft, uint256 _tokenId) external view returns (address);
```

### redemptionWeightOf

```solidity
function redemptionWeightOf(address _nft, uint256[] memory _tokenIds) external view returns (uint256 weight);
```

### totalRedemptionWeight

```solidity
function totalRedemptionWeight(address _nft) external view returns (uint256 weight);
```

### numberOfReservedTokensOutstandingFor

```solidity
function numberOfReservedTokensOutstandingFor(address _nft, uint256 _tierId) external view returns (uint256);
```

### numberOfReservesMintedFor

```solidity
function numberOfReservesMintedFor(address _nft, uint256 _tierId) external view returns (uint256);
```

### numberOfBurnedFor

```solidity
function numberOfBurnedFor(address _nft, uint256 _tierId) external view returns (uint256);
```

### isTierRemoved

```solidity
function isTierRemoved(address _nft, uint256 _tierId) external view returns (bool);
```

### flagsOf

```solidity
function flagsOf(address _nft) external view returns (JBTiered721Flags memory);
```

### votingUnitsOf

```solidity
function votingUnitsOf(address _nft, address _account) external view returns (uint256 units);
```

### tierVotingUnitsOf

```solidity
function tierVotingUnitsOf(address _nft, address _account, uint256 _tierId) external view returns (uint256 units);
```

### defaultReservedTokenBeneficiaryOf

```solidity
function defaultReservedTokenBeneficiaryOf(address _nft) external view returns (address);
```

### defaultRoyaltyBeneficiaryOf

```solidity
function defaultRoyaltyBeneficiaryOf(address _nft) external view returns (address);
```

### reservedTokenBeneficiaryOf

```solidity
function reservedTokenBeneficiaryOf(address _nft, uint256 _tierId) external view returns (address);
```

### baseUriOf

```solidity
function baseUriOf(address _nft) external view returns (string memory);
```

### contractUriOf

```solidity
function contractUriOf(address _nft) external view returns (string memory);
```

### tokenUriResolverOf

```solidity
function tokenUriResolverOf(address _nft) external view returns (IJBTokenUriResolver);
```

### encodedTierIPFSUriOf

```solidity
function encodedTierIPFSUriOf(address _nft, uint256 _tokenId) external view returns (bytes32);
```

### royaltyInfo

```solidity
function royaltyInfo(address _nft, uint256 _tokenId, uint256 _salePrice)
    external
    view
    returns (address receiver, uint256 royaltyAmount);
```

### recordAddTiers

```solidity
function recordAddTiers(JB721TierParams[] memory _tierData) external returns (uint256[] memory tierIds);
```

### recordMintReservesFor

```solidity
function recordMintReservesFor(uint256 _tierId, uint256 _count) external returns (uint256[] memory tokenIds);
```

### recordBurn

```solidity
function recordBurn(uint256[] memory _tokenIds) external;
```

### recordSetDefaultReservedTokenBeneficiary

```solidity
function recordSetDefaultReservedTokenBeneficiary(address _beneficiary) external;
```

### recordMint

```solidity
function recordMint(uint256 _amount, uint16[] calldata _tierIds, bool _isManualMint)
    external
    returns (uint256[] memory tokenIds, uint256 leftoverAmount);
```

### recordTransferForTier

```solidity
function recordTransferForTier(uint256 _tierId, address _from, address _to) external;
```

### recordRemoveTierIds

```solidity
function recordRemoveTierIds(uint256[] memory _tierIds) external;
```

### recordSetFirstOwnerOf

```solidity
function recordSetFirstOwnerOf(uint256 _tokenId, address _owner) external;
```

### recordSetBaseUri

```solidity
function recordSetBaseUri(string memory _uri) external;
```

### recordSetContractUri

```solidity
function recordSetContractUri(string memory _uri) external;
```

### recordSetTokenUriResolver

```solidity
function recordSetTokenUriResolver(IJBTokenUriResolver _resolver) external;
```

### recordSetEncodedIPFSUriOf

```solidity
function recordSetEncodedIPFSUriOf(uint256 _tierId, bytes32 _encodedIPFSUri) external;
```

### recordFlags

```solidity
function recordFlags(JBTiered721Flags calldata _flag) external;
```

### cleanTiers

```solidity
function cleanTiers(address _nft) external;
```

## Events

### CleanTiers

```solidity
event CleanTiers(address indexed nft, address caller);
```

