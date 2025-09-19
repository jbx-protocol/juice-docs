# JB721TiersHookStore
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/JB721TiersHookStore.sol)

**Inherits:**
[IJB721TiersHookStore](/docs/dev/v4/api/721-hook/interfaces/IJB721TiersHookStore.md)

This contract stores and manages data for many `IJB721TiersHook`s and their NFTs.


## State Variables
### _ONE_BILLION
Just a kind reminder to our readers.

*Used in 721 token ID generation.*


```solidity
uint256 private constant _ONE_BILLION = 1_000_000_000;
```


### defaultReserveBeneficiaryOf
Returns the default reserve beneficiary for the provided 721 contract.

*If a tier has a reserve beneficiary set, it will override this value.*


```solidity
mapping(address hook => address) public override defaultReserveBeneficiaryOf;
```


### encodedIPFSUriOf
Returns the encoded IPFS URI for the provided tier ID of the provided 721 contract.

*Token URIs managed by this contract are stored in 32 bytes, based on stripped down IPFS hashes.*

**Note:**
returns: The encoded IPFS URI.


```solidity
mapping(address hook => mapping(uint256 tierId => bytes32)) public override encodedIPFSUriOf;
```


### maxTierIdOf
Returns the largest tier ID currently used on the provided 721 contract.

*This may not include the last tier ID if it has been removed.*


```solidity
mapping(address hook => uint256) public override maxTierIdOf;
```


### numberOfBurnedFor
Returns the number of NFTs which have been burned from the provided tier ID of the provided 721
contract.


```solidity
mapping(address hook => mapping(uint256 tierId => uint256)) public override numberOfBurnedFor;
```


### numberOfReservesMintedFor
Returns the number of reserve NFTs which have been minted from the provided tier ID of the provided 721
contract.


```solidity
mapping(address hook => mapping(uint256 tierId => uint256)) public override numberOfReservesMintedFor;
```


### tierBalanceOf
Returns the number of NFTs which the provided owner address owns from the provided 721 contract and tier
ID.


```solidity
mapping(address hook => mapping(address owner => mapping(uint256 tierId => uint256))) public override tierBalanceOf;
```


### tokenUriResolverOf
Returns the custom token URI resolver which overrides the default token URI resolver for the provided
721 contract.


```solidity
mapping(address hook => IJB721TokenUriResolver) public override tokenUriResolverOf;
```


### _flagsOf
Returns the flags which dictate the behavior of the provided `IJB721TiersHook` contract.

**Note:**
returns: The flags.


```solidity
mapping(address hook => JB721TiersHookFlags) internal _flagsOf;
```


### _lastTrackedSortedTierIdOf
Return the ID of the last sorted tier from the provided 721 contract.

*If not set, it is assumed the `maxTierIdOf` is the last sorted tier ID.*


```solidity
mapping(address hook => uint256) internal _lastTrackedSortedTierIdOf;
```


### _removedTiersBitmapWordOf
Get the bitmap word at the provided depth from the provided 721 contract's tier removal bitmap.

*See `JBBitmap` for more information.*

**Note:**
returns: word The bitmap row's content.


```solidity
mapping(address hook => mapping(uint256 depth => uint256 word)) internal _removedTiersBitmapWordOf;
```


### _reserveBeneficiaryOf
Returns the reserve beneficiary (if there is one) for the provided tier ID on the provided
`IJB721TiersHook` contract.

**Note:**
returns: The address of the reserved token beneficiary.


```solidity
mapping(address hook => mapping(uint256 tierId => address)) internal _reserveBeneficiaryOf;
```


### _startingTierIdOfCategory
Returns the ID of the first tier in the provided category on the provided 721 contract.


```solidity
mapping(address hook => mapping(uint256 category => uint256)) internal _startingTierIdOfCategory;
```


### _storedTierOf
Returns the stored tier of the provided tier ID on the provided `IJB721TiersHook` contract.

**Note:**
returns: The stored tier, as a `JBStored721Tier` struct.


```solidity
mapping(address hook => mapping(uint256 tierId => JBStored721Tier)) internal _storedTierOf;
```


### _tierIdAfter
Returns the ID of the tier which comes after the provided tier ID (sorted by price).

*If empty, assume the next tier ID should come after.*

**Note:**
returns: The following tier's ID.


```solidity
mapping(address hook => mapping(uint256 tierId => uint256)) internal _tierIdAfter;
```


## Functions
### encodedTierIPFSUriOf

Resolves the encoded IPFS URI for the tier of the 721 with the provided token ID from the provided 721
contract.


```solidity
function encodedTierIPFSUriOf(address hook, uint256 tokenId) external view override returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the encoded IPFS URI belongs to.|
|`tokenId`|`uint256`|The token ID of the 721 to get the encoded tier IPFS URI of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The encoded IPFS URI.|


### flagsOf

Get the flags that dictate the behavior of the provided 721 contract.


```solidity
function flagsOf(address hook) external view override returns (JB721TiersHookFlags memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the flags of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JB721TiersHookFlags`|The flags.|


### isTierRemoved

Check if the provided tier has been removed from the provided 721 contract.


```solidity
function isTierRemoved(address hook, uint256 tierId) external view override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract the tier belongs to.|
|`tierId`|`uint256`|The ID of the tier to check the removal status of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A bool which is `true` if the tier has been removed, and `false` otherwise.|


### numberOfPendingReservesFor

Get the number of pending reserve NFTs for the provided tier ID of the provided 721 contract.

*"Pending" means that the NFTs have been reserved, but have not been minted yet.*


```solidity
function numberOfPendingReservesFor(address hook, uint256 tierId) external view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to check for pending reserved NFTs.|
|`tierId`|`uint256`|The ID of the tier to get the number of pending reserves for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of pending reserved NFTs.|


### tierOf

Get the tier with the provided ID from the provided 721 contract.


```solidity
function tierOf(address hook, uint256 id, bool includeResolvedUri) public view override returns (JB721Tier memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the tier from.|
|`id`|`uint256`|The ID of the tier to get.|
|`includeResolvedUri`|`bool`|If set to `true`, if the contract has a token URI resolver, its content will be resolved and included.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JB721Tier`|The tier.|


### tierOfTokenId

Get the tier of the 721 with the provided token ID in the provided 721 contract.


```solidity
function tierOfTokenId(
    address hook,
    uint256 tokenId,
    bool includeResolvedUri
)
    external
    view
    override
    returns (JB721Tier memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the tier belongs to.|
|`tokenId`|`uint256`|The token ID of the 721 to get the tier of.|
|`includeResolvedUri`|`bool`|If set to `true`, if the contract has a token URI resolver, its content will be resolved and included.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JB721Tier`|The tier.|


### tierVotingUnitsOf

Returns the number of voting units an addresses has within the specified tier of the specified 721
contract.

*NFTs have a tier-specific number of voting units. If the tier does not have a custom number of voting
units, the price is used.*


```solidity
function tierVotingUnitsOf(
    address hook,
    address account,
    uint256 tierId
)
    external
    view
    virtual
    override
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the tier belongs to.|
|`account`|`address`|The address to get the voting units of within the tier.|
|`tierId`|`uint256`|The ID of the tier to get voting units within.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The address' voting units within the tier.|


### tiersOf

Gets an array of currently active 721 tiers for the provided 721 contract.


```solidity
function tiersOf(
    address hook,
    uint256[] calldata categories,
    bool includeResolvedUri,
    uint256 startingId,
    uint256 size
)
    external
    view
    override
    returns (JB721Tier[] memory tiers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the tiers of.|
|`categories`|`uint256[]`|An array tier categories to get tiers from. Send an empty array to get all categories.|
|`includeResolvedUri`|`bool`|If set to `true`, if the contract has a token URI resolver, its content will be resolved and included.|
|`startingId`|`uint256`|The ID of the first tier to get (sorted by price). Send 0 to get all active tiers.|
|`size`|`uint256`|The number of tiers to include.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tiers`|`JB721Tier[]`|An array of active 721 tiers.|


### totalSupplyOf

Get the number of NFTs which have been minted from the provided 721 contract (across all tiers).


```solidity
function totalSupplyOf(address hook) external view override returns (uint256 supply);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get a total supply of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`supply`|`uint256`|The total number of NFTs minted from all tiers on the contract.|


### votingUnitsOf

Get the number of voting units the provided address has for the provided 721 contract (across all
tiers).

*NFTs have a tier-specific number of voting units. If the tier does not have a custom number of voting
units, the price is used.*


```solidity
function votingUnitsOf(address hook, address account) external view virtual override returns (uint256 units);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the voting units within.|
|`account`|`address`|The address to get the voting unit total of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`units`|`uint256`|The total voting units the address has within the 721 contract.|


### balanceOf

Get the number of NFTs that the specified address has from the specified 721 contract (across all
tiers).


```solidity
function balanceOf(address hook, address owner) public view override returns (uint256 balance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the balance within.|
|`owner`|`address`|The address to check the balance of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The number of NFTs the owner has from the 721 contract.|


### cashOutWeightOf

The combined cash out weight of the NFTs with the provided token IDs.

*Cash out weight is based on 721 price.*

*Divide this result by the `totalCashOutWeight` to get the portion of funds that can be reclaimed by
cashing out these NFTs.*


```solidity
function cashOutWeightOf(address hook, uint256[] calldata tokenIds) public view override returns (uint256 weight);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the NFTs belong to.|
|`tokenIds`|`uint256[]`|The token IDs of the NFTs to get the cash out weight of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The cash out weight.|


### reserveBeneficiaryOf

The reserve beneficiary for the provided tier ID on the provided 721 contract.


```solidity
function reserveBeneficiaryOf(address hook, uint256 tierId) public view override returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the tier belongs to.|
|`tierId`|`uint256`|The ID of the tier to get the reserve beneficiary of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The reserve beneficiary for the tier.|


### tierIdOfToken

The tier ID for the 721 with the provided token ID.

*Tiers are 1-indexed from the `tiers` array, meaning the 0th element of the array is tier 1.*


```solidity
function tierIdOfToken(uint256 tokenId) public pure override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|The token ID of the 721 to get the tier ID of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the 721's tier.|


### totalCashOutWeight

The combined cash out weight for all NFTs from the provided 721 contract.


```solidity
function totalCashOutWeight(address hook) public view override returns (uint256 weight);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the total cash out weight of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The total cash out weight.|


### _firstSortedTierIdOf

Get the first tier ID from an 721 contract (when sorted by price) within a provided category.


```solidity
function _firstSortedTierIdOf(address hook, uint256 category) internal view returns (uint256 id);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the first sorted tier ID of.|
|`category`|`uint256`|The category to get the first sorted tier ID within. Send 0 for the first ID across all tiers, which might not be in the 0th category if the 0th category does not exist.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`id`|`uint256`|The first sorted tier ID within the provided category.|


### _generateTokenId

Generate a token ID for an 721 given a tier ID and a token number within that tier.


```solidity
function _generateTokenId(uint256 tierId, uint256 tokenNumber) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tierId`|`uint256`|The ID of the tier to generate a token ID for.|
|`tokenNumber`|`uint256`|The token number of the 721 within the tier.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The token ID of the 721.|


### _getTierFrom

Returns the tier corresponding to the stored tier provided.

*Translate `JBStored721Tier` to `JB721Tier`.*


```solidity
function _getTierFrom(
    address hook,
    uint256 tierId,
    JBStored721Tier memory storedTier,
    bool includeResolvedUri
)
    internal
    view
    returns (JB721Tier memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the tier from.|
|`tierId`|`uint256`|The ID of the tier to get.|
|`storedTier`|`JBStored721Tier`|The stored tier to get the corresponding tier for.|
|`includeResolvedUri`|`bool`|If set to `true`, if the contract has a token URI resolver, its content will be resolved and included.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JB721Tier`|tier The tier as a `JB721Tier` struct.|


### _isTierRemovedWithRefresh

Check whether a tier has been removed while refreshing the relevant bitmap word if needed.


```solidity
function _isTierRemovedWithRefresh(
    address hook,
    uint256 tierId,
    JBBitmapWord memory bitmapWord
)
    internal
    view
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to check for removals on.|
|`tierId`|`uint256`|The ID of the tier to check the removal status of.|
|`bitmapWord`|`JBBitmapWord`|The bitmap word to use.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean which is `true` if the tier has been removed.|


### _lastSortedTierIdOf

The last sorted tier ID from an 721 contract (when sorted by price).


```solidity
function _lastSortedTierIdOf(address hook) internal view returns (uint256 id);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the last sorted tier ID of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`id`|`uint256`|The last sorted tier ID.|


### _nextSortedTierIdOf

Get the tier ID which comes after the provided one when sorted by price.


```solidity
function _nextSortedTierIdOf(address hook, uint256 id, uint256 max) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to get the next sorted tier ID from.|
|`id`|`uint256`|The tier ID to get the next sorted tier ID relative to.|
|`max`|`uint256`|The maximum tier ID.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The next sorted tier ID.|


### _numberOfPendingReservesFor

Get the number of pending reserve NFTs for the specified tier ID.


```solidity
function _numberOfPendingReservesFor(
    address hook,
    uint256 tierId,
    JBStored721Tier memory storedTier
)
    internal
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the tier belongs to.|
|`tierId`|`uint256`|The ID of the tier to get the number of pending reserve NFTs for.|
|`storedTier`|`JBStored721Tier`|The stored tier to get the number of pending reserve NFTs for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|numberReservedTokensOutstanding The number of pending reserve NFTs for the tier.|


### _packBools

Pack five bools into a single uint8.


```solidity
function _packBools(
    bool allowOwnerMint,
    bool transfersPausable,
    bool useVotingUnits,
    bool cannotBeRemoved,
    bool cannotIncreaseDiscountPercent
)
    internal
    pure
    returns (uint8 packed);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`allowOwnerMint`|`bool`|Whether or not owner minting is allowed in new tiers.|
|`transfersPausable`|`bool`|Whether or not 721 transfers can be paused.|
|`useVotingUnits`|`bool`|Whether or not custom voting unit amounts are allowed in new tiers.|
|`cannotBeRemoved`|`bool`|Whether or not attempts to remove the tier will revert.|
|`cannotIncreaseDiscountPercent`|`bool`|Whether or not attempts to increase the discount percent will revert.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`packed`|`uint8`|The packed bools.|


### _unpackBools

Unpack five bools from a single uint8.


```solidity
function _unpackBools(uint8 packed)
    internal
    pure
    returns (
        bool allowOwnerMint,
        bool transfersPausable,
        bool useVotingUnits,
        bool cannotBeRemoved,
        bool cannotIncreaseDiscountPercent
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`packed`|`uint8`|The packed bools.|


### cleanTiers

Cleans an 721 contract's removed tiers from the tier sorting sequence.


```solidity
function cleanTiers(address hook) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract to clean tiers for.|


### recordAddTiers

Record newly added tiers.


```solidity
function recordAddTiers(JB721TierConfig[] calldata tiersToAdd) external override returns (uint256[] memory tierIds);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tiersToAdd`|`JB721TierConfig[]`|The tiers to add.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tierIds`|`uint256[]`|The IDs of the tiers being added.|


### recordBurn

Records 721 burns.


```solidity
function recordBurn(uint256[] calldata tokenIds) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The token IDs of the NFTs to burn.|


### recordFlags

Record newly set flags.


```solidity
function recordFlags(JB721TiersHookFlags calldata flags) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`flags`|`JB721TiersHookFlags`|The flags to set.|


### recordMint

Record 721 mints from the provided tiers.


```solidity
function recordMint(
    uint256 amount,
    uint16[] calldata tierIds,
    bool isOwnerMint
)
    external
    override
    returns (uint256[] memory tokenIds, uint256 leftoverAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount being spent on NFTs. The total price must not exceed this amount.|
|`tierIds`|`uint16[]`|The IDs of the tiers to mint from.|
|`isOwnerMint`|`bool`|A flag indicating whether this function is being directly called by the 721 contract's owner.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The token IDs of the NFTs which were minted.|
|`leftoverAmount`|`uint256`|The `amount` remaining after minting.|


### recordMintReservesFor

Record reserve 721 minting for the provided tier ID on the provided 721 contract.


```solidity
function recordMintReservesFor(uint256 tierId, uint256 count) external override returns (uint256[] memory tokenIds);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tierId`|`uint256`|The ID of the tier to mint reserves from.|
|`count`|`uint256`|The number of reserve NFTs to mint.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The token IDs of the reserve NFTs which were minted.|


### recordRemoveTierIds

Record tiers being removed.


```solidity
function recordRemoveTierIds(uint256[] calldata tierIds) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tierIds`|`uint256[]`|The IDs of the tiers being removed.|


### recordSetDiscountPercentOf

Records the setting of a discount for a tier.


```solidity
function recordSetDiscountPercentOf(uint256 tierId, uint256 discountPercent) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tierId`|`uint256`|The ID of the tier to record a discount for.|
|`discountPercent`|`uint256`|The new discount percent being applied.|


### recordSetEncodedIPFSUriOf

Record a new encoded IPFS URI for a tier.


```solidity
function recordSetEncodedIPFSUriOf(uint256 tierId, bytes32 encodedIPFSUri) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tierId`|`uint256`|The ID of the tier to set the encoded IPFS URI of.|
|`encodedIPFSUri`|`bytes32`|The encoded IPFS URI to set for the tier.|


### recordSetTokenUriResolver

Record a newly set token URI resolver.


```solidity
function recordSetTokenUriResolver(IJB721TokenUriResolver resolver) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`resolver`|`IJB721TokenUriResolver`|The resolver to set.|


### recordTransferForTier

Record an 721 transfer.


```solidity
function recordTransferForTier(uint256 tierId, address from, address to) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tierId`|`uint256`|The ID of the tier that the 721 being transferred belongs to.|
|`from`|`address`|The address that the 721 is being transferred from.|
|`to`|`address`|The address that the 721 is being transferred to.|


## Errors
### JB721TiersHookStore_CantMintManually

```solidity
error JB721TiersHookStore_CantMintManually();
```

### JB721TiersHookStore_CantRemoveTier

```solidity
error JB721TiersHookStore_CantRemoveTier();
```

### JB721TiersHookStore_DiscountPercentExceedsBounds

```solidity
error JB721TiersHookStore_DiscountPercentExceedsBounds(uint256 percent, uint256 limit);
```

### JB721TiersHookStore_DiscountPercentIncreaseNotAllowed

```solidity
error JB721TiersHookStore_DiscountPercentIncreaseNotAllowed(uint256 percent, uint256 storedPercent);
```

### JB721TiersHookStore_InsufficientPendingReserves

```solidity
error JB721TiersHookStore_InsufficientPendingReserves(uint256 count, uint256 numberOfPendingReserves);
```

### JB721TiersHookStore_InsufficientSupplyRemaining

```solidity
error JB721TiersHookStore_InsufficientSupplyRemaining();
```

### JB721TiersHookStore_InvalidCategorySortOrder

```solidity
error JB721TiersHookStore_InvalidCategorySortOrder(uint256 tierCategory, uint256 previousTierCategory);
```

### JB721TiersHookStore_InvalidQuantity

```solidity
error JB721TiersHookStore_InvalidQuantity(uint256 quantity, uint256 limit);
```

### JB721TiersHookStore_ManualMintingNotAllowed

```solidity
error JB721TiersHookStore_ManualMintingNotAllowed();
```

### JB721TiersHookStore_MaxTiersExceeded

```solidity
error JB721TiersHookStore_MaxTiersExceeded(uint256 numberOfTiers, uint256 limit);
```

### JB721TiersHookStore_PriceExceedsAmount

```solidity
error JB721TiersHookStore_PriceExceedsAmount(uint256 price, uint256 leftoverAmount);
```

### JB721TiersHookStore_ReserveFrequencyNotAllowed

```solidity
error JB721TiersHookStore_ReserveFrequencyNotAllowed();
```

### JB721TiersHookStore_TierRemoved

```solidity
error JB721TiersHookStore_TierRemoved(uint256 tierId);
```

### JB721TiersHookStore_UnrecognizedTier

```solidity
error JB721TiersHookStore_UnrecognizedTier();
```

### JB721TiersHookStore_VotingUnitsNotAllowed

```solidity
error JB721TiersHookStore_VotingUnitsNotAllowed();
```

### JB721TiersHookStore_ZeroInitialSupply

```solidity
error JB721TiersHookStore_ZeroInitialSupply();
```

