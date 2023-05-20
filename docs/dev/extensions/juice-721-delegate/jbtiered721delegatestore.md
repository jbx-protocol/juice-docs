# JBTiered721DelegateStore

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/331ed61b7ae1a4c4536bcd78f5e0b7d4a67c2869/contracts/JBTiered721DelegateStore.sol)

Mainnet: [`0x67C31B9557201A341312CF78d315542b5AD83074`](https://etherscan.io/address/0x67C31B9557201A341312CF78d315542b5AD83074)

Goerli: [`0xAe4a9ad78c14b1a94fc4A51Ef1a593e8a0ce6E0a`](https://goerli.etherscan.io/address/0xAe4a9ad78c14b1a94fc4A51Ef1a593e8a0ce6E0a)

Inherits: [`IJBTiered721DelegateStore`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatestore.md)

The contract that stores and manages the NFT's data.

Adheres to -
- [`IJBTiered721DelegateStore`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatestore.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

## State Variables

### _ONE_BILLION

```solidity
uint256 private constant _ONE_BILLION = 1_000_000_000;
```

### _tierIdAfter

The tier ID that should come after the given tier ID when sorting by contribution floor.

*If empty, assume the next tier ID should come after.
- _nft The NFT contract to get ordered tier ID from.
- _tierId The tier ID to get a tier after relative to.

```solidity
mapping(address => mapping(uint256 => uint256)) internal _tierIdAfter;
```

### _reservedTokenBeneficiaryOf

An optional beneficiary for the reserved token of a given tier.
- _nft The NFT contract to which the reserved token beneficiary belongs.
- _tierId the ID of the tier.

```solidity
mapping(address => mapping(uint256 => address)) internal _reservedTokenBeneficiaryOf;
```

### _storedTierOf

The stored reward tier.
- _nft The NFT contract to which the tiers belong.
- _tierId The incremental ID of the tier, starting with 1.

```solidity
mapping(address => mapping(uint256 => JBStored721Tier)) internal _storedTierOf;
```

### _flagsOf

Flags that influence the behavior of each NFT.
- _nft The NFT for which the flags apply.

```solidity
mapping(address => JBTiered721Flags) internal _flagsOf;
```

### _isTierRemovedBitmapWord

For each tier ID, a bitmap containing flags indicating if the tier has been removed.
- _nft The NFT contract to which the tier belong.
- _depth The bitmap row.
- _word The row content bitmap.

```solidity
mapping(address => mapping(uint256 => uint256)) internal _isTierRemovedBitmapWord;
```

### _trackedLastSortTierIdOf

For each NFT, the tier ID that comes last when sorting.

*If not set, it is assumed the `maxTierIdOf` is the last sorted.
- _nft The NFT contract to which the tier belongs.

```solidity
mapping(address => uint256) internal _trackedLastSortTierIdOf;
```

### _startingTierIdOfCategory

The ID of the first tier in each category.
- _nft The NFT contract to get the tier ID of.
- _category The category to get the first tier ID of.

```solidity
mapping(address => mapping(uint256 => uint256)) internal _startingTierIdOfCategory;
```

### maxTierIdOf

The biggest tier ID used.

*This may not include the last tier ID if it has been removed.
- _nft The NFT contract to get the number of tiers.

```solidity
mapping(address => uint256) public override maxTierIdOf;
```

### tierBalanceOf

Each account's balance within a specific tier.
- _nft The NFT contract to which the tier balances belong.
- _owner The address to get a balance for.
- _tierId The ID of the tier to get a balance within.

```solidity
mapping(address => mapping(address => mapping(uint256 => uint256))) public override tierBalanceOf;
```

### numberOfReservesMintedFor

The number of reserved tokens that have been minted for each tier.
- _nft The NFT contract to which the reserve data belong.
- _tierId The ID of the tier to get a minted reserved token count for.

```solidity
mapping(address => mapping(uint256 => uint256)) public override numberOfReservesMintedFor;
```

### numberOfBurnedFor

The number of tokens that have been burned for each tier.
- _nft The NFT contract to which the burned data belong.
- _tierId The ID of the tier to get a burned token count for.

```solidity
mapping(address => mapping(uint256 => uint256)) public override numberOfBurnedFor;
```

### defaultReservedTokenBeneficiaryOf

The beneficiary of reserved tokens when the tier doesn't specify a beneficiary.
- _nft The NFT contract to which the reserved token beneficiary applies.

```solidity
mapping(address => address) public override defaultReservedTokenBeneficiaryOf;
```

### tokenUriResolverOf

Custom token URI resolver, supersedes base URI.
- _nft The NFT for which the token URI resolver applies.

```solidity
mapping(address => IJBTokenUriResolver) public override tokenUriResolverOf;
```

### encodedIPFSUriOf

When using this contract to manage token uri's, those are stored as 32bytes, based on IPFS hashes stripped down.
- _nft The NFT contract to which the encoded upfs uri belongs.
- _tierId the ID of the tier

```solidity
mapping(address => mapping(uint256 => bytes32)) public override encodedIPFSUriOf;
```

## Functions

### tiersOf

Gets an array of all the active tiers.

```solidity
function tiersOf(
    address _nft,
    uint256[] calldata _categories,
    bool _includeResolvedUri,
    uint256 _startingId,
    uint256 _size
) external view override returns (JB721Tier[] memory _tiers);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT contract to get tiers for.|
|`_categories`|`uint256[]`|The categories of the tiers to get. Send empty for any category.|
|`_includeResolvedUri`|`bool`|If there's a token URI resolver, the content will be resolved and included.|
|`_startingId`|`uint256`|The starting tier ID of the array of tiers sorted by contribution floor. Send 0 to start at the beginning.|
|`_size`|`uint256`|The number of tiers to include.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_tiers`|[`JB721Tier[]`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|All the tiers.|

### tierOf

Return the tier for the specified ID.

```solidity
function tierOf(address _nft, uint256 _id, bool _includeResolvedUri) public view override returns (JB721Tier memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get a tier within.|
|`_id`|`uint256`|The ID of the tier to get.|
|`_includeResolvedUri`|`bool`|If there's a token URI resolver, the content will be resolved and included.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|The tier.|

### tierOfTokenId

Return the tier for the specified token ID.

```solidity
function tierOfTokenId(address _nft, uint256 _tokenId, bool _includeResolvedUri)
    external
    view
    override
    returns (JB721Tier memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get a tier within.|
|`_tokenId`|`uint256`|The ID of token to return the tier of.|
|`_includeResolvedUri`|`bool`|If there's a token URI resolver, the content will be resolved and included.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|The tier.|

### totalSupply

The total supply of issued NFTs from all tiers.

```solidity
function totalSupply(address _nft) external view override returns (uint256 supply);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get a total supply of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`supply`|`uint256`|The total number of NFTs between all tiers.|

### numberOfReservedTokensOutstandingFor

The number of reserved tokens that can currently be minted within the tier.

```solidity
function numberOfReservedTokensOutstandingFor(address _nft, uint256 _tierId) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get a number of reserved tokens outstanding.|
|`_tierId`|`uint256`|The ID of the tier to get a number of reserved tokens outstanding.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The outstanding number of reserved tokens within the tier.|

### votingUnitsOf

The voting units for an account from its NFTs across all tiers. NFTs have a tier-specific preset number of voting units.

```solidity
function votingUnitsOf(address _nft, address _account) external view virtual override returns (uint256 units);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get voting units within.|
|`_account`|`address`|The account to get voting units for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`units`|`uint256`|The voting units for the account.|

### tierVotingUnitsOf

The voting units for an account from its NFTs across all tiers. NFTs have a tier-specific preset number of voting units.

```solidity
function tierVotingUnitsOf(address _nft, address _account, uint256 _tierId)
    external
    view
    virtual
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get voting units within.|
|`_account`|`address`|The account to get voting units for.|
|`_tierId`|`uint256`|The ID of the tier to get voting units for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The voting units for the account.|

### encodedTierIPFSUriOf

Resolves the encoded tier IPFS URI of the tier for the given token.

```solidity
function encodedTierIPFSUriOf(address _nft, uint256 _tokenId) external view override returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT contract to which the encoded IPFS URI belongs.|
|`_tokenId`|`uint256`|the ID of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The encoded IPFS URI.|

### flagsOf

Flags that influence the behavior of each NFT.

```solidity
function flagsOf(address _nft) external view override returns (JBTiered721Flags memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT for which the flags apply.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`JBTiered721Flags`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721flags.md)|The flags.|

### isTierRemoved

Check if the tier removed from the current set of tiers.

```solidity
function isTierRemoved(address _nft, uint256 _tierId) external view override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT for which the removed tier is being queried.|
|`_tierId`|`uint256`|The tier ID to check if removed.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the tier has been removed|

### balanceOf

The total number of tokens owned by the given owner.

```solidity
function balanceOf(address _nft, address _owner) public view override returns (uint256 balance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get a balance from.|
|`_owner`|`address`|The address to check the balance of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The number of tokens owners by the owner across all tiers.|

### redemptionWeightOf

The cumulative weight the given token IDs have in redemptions compared to the `totalRedemptionWeight`.

```solidity
function redemptionWeightOf(address _nft, uint256[] calldata _tokenIds) public view override returns (uint256 weight);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT for which the redemption weight is being calculated.|
|`_tokenIds`|`uint256[]`|The IDs of the tokens to get the cumulative redemption weight of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The weight.|

### totalRedemptionWeight

The cumulative weight that all token IDs have in redemptions.

```solidity
function totalRedemptionWeight(address _nft) public view override returns (uint256 weight);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT for which the redemption weight is being calculated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The total weight.|

### tierIdOfToken

The tier number of the provided token ID.

*Tier's are 1 indexed from the `tiers` array, meaning the 0th element of the array is tier 1.*

```solidity
function tierIdOfToken(uint256 _tokenId) public pure override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenId`|`uint256`|The ID of the token to get the tier number of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The tier number of the specified token ID.|

### reservedTokenBeneficiaryOf

The reserved token beneficiary for each tier.

```solidity
function reservedTokenBeneficiaryOf(address _nft, uint256 _tierId) public view override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get the reserved token beneficiary within.|
|`_tierId`|`uint256`|The ID of the tier to get a reserved token beneficiary of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The reserved token beneficiary.|

### recordAddTiers

Adds tiers.

```solidity
function recordAddTiers(JB721TierParams[] calldata _tiersToAdd) external override returns (uint256[] memory tierIds);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tiersToAdd`|[`JB721TierParams[]`](/docs/dev/extensions/juice-721-delegate/structs/jb721tierparams.md)|The tiers to add.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tierIds`|`uint256[]`|The IDs of the tiers added.|

### recordMintReservesFor

Mint a token within the tier for the provided value.

*Only a project owner can mint tokens.*

```solidity
function recordMintReservesFor(uint256 _tierId, uint256 _count) external override returns (uint256[] memory tokenIds);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierId`|`uint256`|The ID of the tier to mint within.|
|`_count`|`uint256`|The number of reserved tokens to mint.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The IDs of the tokens being minted as reserves.|

### recordTransferForTier

Record a token transfer.

```solidity
function recordTransferForTier(uint256 _tierId, address _from, address _to) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierId`|`uint256`|The ID the tier being transferred.|
|`_from`|`address`|The sender of the token.|
|`_to`|`address`|The recipient of the token.|

### recordRemoveTierIds

Remove tiers.

```solidity
function recordRemoveTierIds(uint256[] calldata _tierIds) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierIds`|`uint256[]`|The tiers IDs to remove.|

### recordMint

Mints a token in all provided tiers.

```solidity
function recordMint(uint256 _amount, uint16[] calldata _tierIds, bool _isManualMint)
    external
    override
    returns (uint256[] memory tokenIds, uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount to base the mints on. All mints' price floors must fit in this amount.|
|`_tierIds`|`uint16[]`|The IDs of the tier to mint from.|
|`_isManualMint`|`bool`|A flag indicating if the mint is being made manually by the NFT's owner.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The IDs of the tokens minted.|
|`leftoverAmount`|`uint256`|The amount leftover after the mint.|

### recordBurn

Records burned tokens.

```solidity
function recordBurn(uint256[] calldata _tokenIds) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIds`|`uint256[]`|The IDs of the tokens burned.|

### recordSetTokenUriResolver

Sets the token URI resolver.

```solidity
function recordSetTokenUriResolver(IJBTokenUriResolver _resolver) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_resolver`|[`IJBTokenUriResolver`](/docs/dev/api/interfaces/ijbtokenuriresolver.md)|The resolver to set.|

### recordSetEncodedIPFSUriOf

Sets the encoded IPFS URI of a tier.

```solidity
function recordSetEncodedIPFSUriOf(uint256 _tierId, bytes32 _encodedIPFSUri) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierId`|`uint256`|The ID of the tier to set the encoded IPFS uri of.|
|`_encodedIPFSUri`|`bytes32`|The encoded IPFS uri to set.|

### recordFlags

Sets flags.

```solidity
function recordFlags(JBTiered721Flags calldata _flags) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_flags`|[`JBTiered721Flags`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721flags.md)|The flag to sets.|

### cleanTiers

Removes removed tiers from sequencing.

```solidity
function cleanTiers(address _nft) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT contract to clean tiers for.|

### _getTierFrom

Returns a tier from a stored tier.

```solidity
function _getTierFrom(address _nft, uint256 _tierId, JBStored721Tier memory _storedTier, bool _includeResolvedUri)
    internal
    view
    returns (JB721Tier memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get the tier from.|
|`_tierId`|`uint256`|The ID of the tier to get.|
|`_storedTier`|[`JBStored721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jbstored721tier.md)|The stored tier to base the tier on.|
|`_includeResolvedUri`|`bool`|If there's a token URI resolver, the content will be resolved and included.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|tier The tier object.|

### _isTierRemovedWithRefresh

Check if a tier is removed from the current set of tiers, while reusing a bitmap word.

```solidity
function _isTierRemovedWithRefresh(address _nft, uint256 _tierId, JBBitmapWord memory _bitmapWord)
    internal
    view
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT for which the removed tier is being queried.|
|`_tierId`|`uint256`|The tier ID to check if removed.|
|`_bitmapWord`|[`JBBitmapWord`](/docs/dev/extensions/juice-721-delegate/structs/jbbitmapword.md)|The bitmap word to reuse.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the tier has been removed|

### _numberOfReservedTokensOutstandingFor

The number of reserved tokens that can currently be minted within the tier.

```solidity
function _numberOfReservedTokensOutstandingFor(address _nft, uint256 _tierId, JBStored721Tier memory _storedTier)
    internal
    view
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get reserved tokens outstanding.|
|`_tierId`|`uint256`|The ID of the tier to get a number of reserved tokens outstanding.|
|`_storedTier`|[`JBStored721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jbstored721tier.md)|The tier to get a number of reserved tokens outstanding.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|numberReservedTokensOutstanding The outstanding number of reserved tokens within the tier.|

### _generateTokenId

Finds the token ID and tier given a contribution amount.

```solidity
function _generateTokenId(uint256 _tierId, uint256 _tokenNumber) internal pure returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierId`|`uint256`|The ID of the tier to generate an ID for.|
|`_tokenNumber`|`uint256`|The number of the token in the tier.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the token.|

### _nextSortedTierIdOf

The next sorted tier ID.

```solidity
function _nextSortedTierIdOf(address _nft, uint256 _id, uint256 _max) internal view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT for which the sorted tier ID applies.|
|`_id`|`uint256`|The ID relative to which the next sorted ID will be returned.|
|`_max`|`uint256`|The maximum possible ID.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID.|

### _firstSortedTierIdOf

The first sorted tier ID of an NFT.

```solidity
function _firstSortedTierIdOf(address _nft, uint256 _category) internal view returns (uint256 id);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get the first sorted tier ID of.|
|`_category`|`uint256`|The category to get the first sorted tier ID of. Send 0 for the first overall sorted ID, which might not be of the 0 category if there isn't a tier of the 0 category.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`id`|`uint256`|The first sorted tier ID.|

### _lastSortedTierIdOf

The last sorted tier ID of an NFT.

```solidity
function _lastSortedTierIdOf(address _nft) internal view returns (uint256 id);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nft`|`address`|The NFT to get the last sorted tier ID of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`id`|`uint256`|The last sorted tier ID.|

### _packBools

Pack three bools into a single uint8.

```solidity
function _packBools(bool _allowManualMint, bool _transfersPausable, bool _useVotingUnits)
    internal
    pure
    returns (uint8 _packed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_allowManualMint`|`bool`|Whether or not manual mints are allowed.|
|`_transfersPausable`|`bool`|Whether or not transfers are pausable.|
|`_useVotingUnits`|`bool`|A flag indicating if the voting units override should be used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_packed`|`uint8`|The packed bools.|

### _unpackBools

Unpack three bools from a single uint8.

```solidity
function _unpackBools(uint8 _packed)
    internal
    pure
    returns (bool _allowManualMint, bool _transfersPausable, bool _useVotingUnits);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_packed`|`uint8`|The packed bools.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_allowManualMint`|`bool`|Whether or not manual mints are allowed.|
|`_transfersPausable`|`bool`|Whether or not transfers are pausable.|
|`_useVotingUnits`|`bool`|A flag indicating if the voting units override should be used.|

## Errors

### CANT_MINT_MANUALLY

```solidity
error CANT_MINT_MANUALLY();
```

### INSUFFICIENT_AMOUNT

```solidity
error INSUFFICIENT_AMOUNT();
```

### INSUFFICIENT_RESERVES

```solidity
error INSUFFICIENT_RESERVES();
```

### INVALID_CATEGORY_SORT_ORDER

```solidity
error INVALID_CATEGORY_SORT_ORDER();
```

### INVALID_QUANTITY

```solidity
error INVALID_QUANTITY();
```

### INVALID_TIER

```solidity
error INVALID_TIER();
```

### MAX_TIERS_EXCEEDED

```solidity
error MAX_TIERS_EXCEEDED();
```

### NO_QUANTITY

```solidity
error NO_QUANTITY();
```

### OUT

```solidity
error OUT();
```

### RESERVED_RATE_NOT_ALLOWED

```solidity
error RESERVED_RATE_NOT_ALLOWED();
```

### MANUAL_MINTING_NOT_ALLOWED

```solidity
error MANUAL_MINTING_NOT_ALLOWED();
```

### TIER_REMOVED

```solidity
error TIER_REMOVED();
```

### VOTING_UNITS_NOT_ALLOWED

```solidity
error VOTING_UNITS_NOT_ALLOWED();
```

