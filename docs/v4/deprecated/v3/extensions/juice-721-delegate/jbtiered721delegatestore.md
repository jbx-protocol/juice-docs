# JBTiered721DelegateStore

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/JBTiered721DelegateStore.sol)

Inherits: [`IJBTiered721DelegateStore`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegatestore.md)

This contract stores and manages data for an IJBTiered721Delegate's NFTs.

## State Variables

### \_ONE_BILLION

Just a kind reminder to our readers.

_Used in token ID generation._

```solidity
uint256 private constant _ONE_BILLION = 1_000_000_000;
```

### \_tierIdAfter

Returns the tier ID which should come after the provided tier ID when sorting by contribution floor.

_If empty, assume the next tier ID should come after._

```solidity
mapping(address => mapping(uint256 => uint256)) internal _tierIdAfter;
```

### \_reservedTokenBeneficiaryOf

Returns optional reserved token beneficiary addresses for the provided tier and NFT contract.

```solidity
mapping(address => mapping(uint256 => address)) internal _reservedTokenBeneficiaryOf;
```

### \_storedTierOf

Returns the tier at the provided contract and tier ID.

```solidity
mapping(address => mapping(uint256 => JBStored721Tier)) internal _storedTierOf;
```

### \_flagsOf

Returns flags that influence the behavior of each NFT contract.

```solidity
mapping(address => JBTiered721Flags) internal _flagsOf;
```

### \_isTierRemovedBitmapWord

For each tier ID, return a bitmap containing flags indicating whether the tier has been removed.

```solidity
mapping(address => mapping(uint256 => uint256)) internal _isTierRemovedBitmapWord;
```

### \_trackedLastSortTierIdOf

For each NFT, return the tier ID that comes last when sorting.

_If not set, it is assumed the `maxTierIdOf` is the last sorted._

```solidity
mapping(address => uint256) internal _trackedLastSortTierIdOf;
```

### \_startingTierIdOfCategory

Returns the ID of the first tier in the provided NFT contract and category.

```solidity
mapping(address => mapping(uint256 => uint256)) internal _startingTierIdOfCategory;
```

### maxTierIdOf

Returns the largest tier ID used on the provided NFT contract.

_This may not include the last tier ID if it has been removed._

```solidity
mapping(address => uint256) public override maxTierIdOf;
```

### tierBalanceOf

Returns the number of NFTs held by the provided address which belong to the provided tier and NFT contract.

```solidity
mapping(address => mapping(address => mapping(uint256 => uint256))) public override tierBalanceOf;
```

### numberOfReservesMintedFor

Returns the number of reserved tokens which have been minted within the provided tier and NFT contract.

```solidity
mapping(address => mapping(uint256 => uint256)) public override numberOfReservesMintedFor;
```

### numberOfBurnedFor

Returns the number of tokens belonging to the provided tier and NFT contract which have been burned.

```solidity
mapping(address => mapping(uint256 => uint256)) public override numberOfBurnedFor;
```

### defaultReservedTokenBeneficiaryOf

Returns the reserved token beneficiary address used when a tier doesn't specify a beneficiary.

```solidity
mapping(address => address) public override defaultReservedTokenBeneficiaryOf;
```

### tokenUriResolverOf

Returns a custom token URI resolver which supersedes the base URI.

```solidity
mapping(address => IJB721TokenUriResolver) public override tokenUriResolverOf;
```

### encodedIPFSUriOf

Returns the encoded IPFS URI for the provided tier and NFT contract.

_Token URIs managed by this contract are stored as 32 bytes and based on stripped down IPFS hashes._

```solidity
mapping(address => mapping(uint256 => bytes32)) public override encodedIPFSUriOf;
```

## Functions

### tiersOf

Gets an array of active tiers.

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

| Name                  | Type        | Description                                                                                              |
| --------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `_nft`                | `address`   | The NFT contract to get tiers for.                                                                       |
| `_categories`         | `uint256[]` | The categories of the tiers to get. Send empty for all categories.                                       |
| `_includeResolvedUri` | `bool`      | If enabled, if there's a token URI resolver, the content will be resolved and included.                  |
| `_startingId`         | `uint256`   | The starting tier ID of the array of tiers sorted by contribution floor. Send 0 to get all active tiers. |
| `_size`               | `uint256`   | The number of tiers to include.                                                                          |

**Returns**

| Name     | Type                                                                          | Description               |
| -------- | ----------------------------------------------------------------------------- | ------------------------- |
| `_tiers` | [`JB721Tier[]`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jb721tier.md) | An array of active tiers. |

### tierOf

Return the tier for the provided tier ID and NFT contract.

```solidity
function tierOf(address _nft, uint256 _id, bool _includeResolvedUri) public view override returns (JB721Tier memory);
```

**Parameters**

| Name                  | Type      | Description                                                                             |
| --------------------- | --------- | --------------------------------------------------------------------------------------- |
| `_nft`                | `address` | The NFT contract to get a tier from.                                                    |
| `_id`                 | `uint256` | The tier ID of the tier to get.                                                         |
| `_includeResolvedUri` | `bool`    | If enabled, if there's a token URI resolver, the content will be resolved and included. |

**Returns**

| Name     | Type                                                                        | Description |
| -------- | --------------------------------------------------------------------------- | ----------- |
| `<none>` | [`JB721Tier`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jb721tier.md) | The tier.   |

### tierOfTokenId

Return the tier for the provided token ID and NFT contract.

```solidity
function tierOfTokenId(address _nft, uint256 _tokenId, bool _includeResolvedUri)
    external
    view
    override
    returns (JB721Tier memory);
```

**Parameters**

| Name                  | Type      | Description                                                                             |
| --------------------- | --------- | --------------------------------------------------------------------------------------- |
| `_nft`                | `address` | The NFT contract to get a tier from.                                                    |
| `_tokenId`            | `uint256` | The token ID to return the tier of.                                                     |
| `_includeResolvedUri` | `bool`    | If enabled, if there's a token URI resolver, the content will be resolved and included. |

**Returns**

| Name     | Type                                                                        | Description |
| -------- | --------------------------------------------------------------------------- | ----------- |
| `<none>` | [`JB721Tier`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jb721tier.md) | The tier.   |

### totalSupplyOf

The total number of NFTs issued from all tiers of the provided NFT contract.

```solidity
function totalSupplyOf(address _nft) external view override returns (uint256 supply);
```

**Parameters**

| Name   | Type      | Description                                |
| ------ | --------- | ------------------------------------------ |
| `_nft` | `address` | The NFT contract to get a total supply of. |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `supply` | `uint256` | The total number of NFTs issued from all tiers. |

### numberOfReservedTokensOutstandingFor

Returns the number of currently mintable reserved tokens for the provided tier ID and NFT contract.

```solidity
function numberOfReservedTokensOutstandingFor(address _nft, uint256 _tierId) external view override returns (uint256);
```

**Parameters**

| Name      | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `_nft`    | `address` | The NFT contract to check for mintable reserved tokens. |
| `_tierId` | `uint256` | The tier ID to check for mintable reserved tokens.      |

**Returns**

| Name     | Type      | Description                                                                       |
| -------- | --------- | --------------------------------------------------------------------------------- |
| `<none>` | `uint256` | The number of currently outstanding reserved tokens within the tier and contract. |

### votingUnitsOf

Returns the total voting units from all of an addresses' NFTs (across all tiers) for the provided NFT contract. NFTs have a tier-specific number of voting units.

```solidity
function votingUnitsOf(address _nft, address _account) external view virtual override returns (uint256 units);
```

**Parameters**

| Name       | Type      | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| `_nft`     | `address` | The NFT contract to get voting units within. |
| `_account` | `address` | The address to get the voting units of.      |

**Returns**

| Name    | Type      | Description                             |
| ------- | --------- | --------------------------------------- |
| `units` | `uint256` | The total voting units for the address. |

### tierVotingUnitsOf

Returns the voting units for an addresses' NFTs in one tier. NFTs have a tier-specific number of voting units.

```solidity
function tierVotingUnitsOf(address _nft, address _account, uint256 _tierId)
    external
    view
    virtual
    override
    returns (uint256);
```

**Parameters**

| Name       | Type      | Description                                  |
| ---------- | --------- | -------------------------------------------- |
| `_nft`     | `address` | The NFT contract to get voting units within. |
| `_account` | `address` | The address to get the voting units of.      |
| `_tierId`  | `uint256` | The tier ID to get voting units within.      |

**Returns**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `<none>` | `uint256` | The voting units for the address within the tier. |

### encodedTierIPFSUriOf

Resolves the encoded IPFS URI of the tier for the provided token ID and NFT contract.

```solidity
function encodedTierIPFSUriOf(address _nft, uint256 _tokenId) external view override returns (bytes32);
```

**Parameters**

| Name       | Type      | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| `_nft`     | `address` | The NFT contract to which the encoded IPFS URI belongs. |
| `_tokenId` | `uint256` | The token ID to get the encoded IPFS URI of.            |

**Returns**

| Name     | Type      | Description           |
| -------- | --------- | --------------------- |
| `<none>` | `bytes32` | The encoded IPFS URI. |

### flagsOf

Flags that influence the behavior of each NFT.

```solidity
function flagsOf(address _nft) external view override returns (JBTiered721Flags memory);
```

**Parameters**

| Name   | Type      | Description                                 |
| ------ | --------- | ------------------------------------------- |
| `_nft` | `address` | The NFT contract for which the flags apply. |

**Returns**

| Name     | Type                                                                                      | Description |
| -------- | ----------------------------------------------------------------------------------------- | ----------- |
| `<none>` | [`JBTiered721Flags`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbtiered721flags.md) | The flags.  |

### isTierRemoved

Check if the provided tier has been removed from the current set of tiers.

```solidity
function isTierRemoved(address _nft, uint256 _tierId) external view override returns (bool);
```

**Parameters**

| Name      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| `_nft`    | `address` | The NFT contract of the tier to check for removal. |
| `_tierId` | `uint256` | The tier ID to check for removal.                  |

**Returns**

| Name     | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| `<none>` | `bool` | True if the tier has been removed. |

### balanceOf

The total number of tokens owned by the provided address.

```solidity
function balanceOf(address _nft, address _owner) public view override returns (uint256 balance);
```

**Parameters**

| Name     | Type      | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `_nft`   | `address` | The NFT contract to check the balance within. |
| `_owner` | `address` | The address to check the balance of.          |

**Returns**

| Name      | Type      | Description                                                                       |
| --------- | --------- | --------------------------------------------------------------------------------- |
| `balance` | `uint256` | The number of tokens owned by the owner across all tiers within the NFT contract. |

### redemptionWeightOf

The cumulative redemption weight of the given token IDs compared to the `totalRedemptionWeight`.

```solidity
function redemptionWeightOf(address _nft, uint256[] calldata _tokenIds) public view override returns (uint256 weight);
```

**Parameters**

| Name        | Type        | Description                                                              |
| ----------- | ----------- | ------------------------------------------------------------------------ |
| `_nft`      | `address`   | The NFT contract which the redemption weight is being calculated within. |
| `_tokenIds` | `uint256[]` | The IDs of the tokens to get the cumulative redemption weight of.        |

**Returns**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `weight` | `uint256` | The weight. |

### totalRedemptionWeight

The cumulative redemption weight for all token IDs.

```solidity
function totalRedemptionWeight(address _nft) public view override returns (uint256 weight);
```

**Parameters**

| Name   | Type      | Description                                                           |
| ------ | --------- | --------------------------------------------------------------------- |
| `_nft` | `address` | The NFT contract for which the redemption weight is being calculated. |

**Returns**

| Name     | Type      | Description       |
| -------- | --------- | ----------------- |
| `weight` | `uint256` | The total weight. |

### tierIdOfToken

The tier ID of the provided token ID.

_Tiers are 1-indexed from the `tiers` array, meaning the 0th element of the array is tier 1._

```solidity
function tierIdOfToken(uint256 _tokenId) public pure override returns (uint256);
```

**Parameters**

| Name       | Type      | Description                         |
| ---------- | --------- | ----------------------------------- |
| `_tokenId` | `uint256` | The token ID to get the tier ID of. |

**Returns**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `<none>` | `uint256` | The tier ID for the provided token ID. |

### reservedTokenBeneficiaryOf

The reserved token beneficiary address for the provided tier ID and NFT contract.

```solidity
function reservedTokenBeneficiaryOf(address _nft, uint256 _tierId) public view override returns (address);
```

**Parameters**

| Name      | Type      | Description                                                      |
| --------- | --------- | ---------------------------------------------------------------- |
| `_nft`    | `address` | The NFT contract to check the reserved token beneficiary within. |
| `_tierId` | `uint256` | The tier ID to get the reserved token beneficiary of.            |

**Returns**

| Name     | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| `<none>` | `address` | The reserved token beneficiary address. |

### recordAddTiers

Adds tiers.

```solidity
function recordAddTiers(JB721TierParams[] calldata _tiersToAdd) external override returns (uint256[] memory tierIds);
```

**Parameters**

| Name          | Type                                                                                      | Description       |
| ------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| `_tiersToAdd` | [`JB721TierParams[]`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jb721tierparams.md) | The tiers to add. |

**Returns**

| Name      | Type        | Description                 |
| --------- | ----------- | --------------------------- |
| `tierIds` | `uint256[]` | The IDs of the tiers added. |

### recordMintReservesFor

Record reserved token mints within the provided tier.

```solidity
function recordMintReservesFor(uint256 _tierId, uint256 _count) external override returns (uint256[] memory tokenIds);
```

**Parameters**

| Name      | Type      | Description                                      |
| --------- | --------- | ------------------------------------------------ |
| `_tierId` | `uint256` | The ID of the tier to mint reserved tokens from. |
| `_count`  | `uint256` | The number of reserved tokens to mint.           |

**Returns**

| Name       | Type        | Description                                     |
| ---------- | ----------- | ----------------------------------------------- |
| `tokenIds` | `uint256[]` | The IDs of the tokens being minted as reserves. |

### recordTransferForTier

Record a token transfer.

```solidity
function recordTransferForTier(uint256 _tierId, address _from, address _to) external override;
```

**Parameters**

| Name      | Type      | Description                                      |
| --------- | --------- | ------------------------------------------------ |
| `_tierId` | `uint256` | The tier ID of the token being transferred.      |
| `_from`   | `address` | The address the token is being transferred from. |
| `_to`     | `address` | The address the token is being transferred to.   |

### recordRemoveTierIds

Record removing the provided tiers.

```solidity
function recordRemoveTierIds(uint256[] calldata _tierIds) external override;
```

**Parameters**

| Name       | Type        | Description              |
| ---------- | ----------- | ------------------------ |
| `_tierIds` | `uint256[]` | The tiers IDs to remove. |

### recordMint

Record token mints in the provided tiers.

```solidity
function recordMint(uint256 _amount, uint16[] calldata _tierIds, bool _isManualMint)
    external
    override
    returns (uint256[] memory tokenIds, uint256 leftoverAmount);
```

**Parameters**

| Name            | Type       | Description                                                                           |
| --------------- | ---------- | ------------------------------------------------------------------------------------- |
| `_amount`       | `uint256`  | The amount to base the mints on. All mints' price floors must fit within this amount. |
| `_tierIds`      | `uint16[]` | The tier IDs to mint from.                                                            |
| `_isManualMint` | `bool`     | A flag indicating if the mint is being made manually by the NFT contract's owner.     |

**Returns**

| Name             | Type        | Description                          |
| ---------------- | ----------- | ------------------------------------ |
| `tokenIds`       | `uint256[]` | The IDs of the minted tokens.        |
| `leftoverAmount` | `uint256`   | The amount left over after the mint. |

### recordBurn

Records token burns.

```solidity
function recordBurn(uint256[] calldata _tokenIds) external override;
```

**Parameters**

| Name        | Type        | Description                         |
| ----------- | ----------- | ----------------------------------- |
| `_tokenIds` | `uint256[]` | The IDs of the tokens being burned. |

### recordSetTokenUriResolver

Sets the token URI resolver.

```solidity
function recordSetTokenUriResolver(IJB721TokenUriResolver _resolver) external override;
```

**Parameters**

| Name        | Type                                                                                                     | Description          |
| ----------- | -------------------------------------------------------------------------------------------------------- | -------------------- |
| `_resolver` | [`IJB721TokenUriResolver`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijb721tokenuriresolver.md) | The resolver to set. |

### recordSetEncodedIPFSUriOf

Sets the encoded IPFS URI of a tier.

```solidity
function recordSetEncodedIPFSUriOf(uint256 _tierId, bytes32 _encodedIPFSUri) external override;
```

**Parameters**

| Name              | Type      | Description                                 |
| ----------------- | --------- | ------------------------------------------- |
| `_tierId`         | `uint256` | The tier ID to set the encoded IPFS URI of. |
| `_encodedIPFSUri` | `bytes32` | The encoded IPFS URI to set.                |

### recordFlags

Sets flags.

```solidity
function recordFlags(JBTiered721Flags calldata _flags) external override;
```

**Parameters**

| Name     | Type                                                                                      | Description       |
| -------- | ----------------------------------------------------------------------------------------- | ----------------- |
| `_flags` | [`JBTiered721Flags`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbtiered721flags.md) | The flags to set. |

### cleanTiers

Removes an NFT contract's removed tiers from sequencing.

```solidity
function cleanTiers(address _nft) external override;
```

**Parameters**

| Name   | Type      | Description                          |
| ------ | --------- | ------------------------------------ |
| `_nft` | `address` | The NFT contract to clean tiers for. |

### \_getTierFrom

Returns a tier given a provided stored tier.

```solidity
function _getTierFrom(address _nft, uint256 _tierId, JBStored721Tier memory _storedTier, bool _includeResolvedUri)
    internal
    view
    returns (JB721Tier memory);
```

**Parameters**

| Name                  | Type                                                                                    | Description                                                                          |
| --------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `_nft`                | `address`                                                                               | The NFT contract to get the tier from.                                               |
| `_tierId`             | `uint256`                                                                               | The tier ID of the tier to get.                                                      |
| `_storedTier`         | [`JBStored721Tier`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbstored721tier.md) | The stored tier to base the tier on.                                                 |
| `_includeResolvedUri` | `bool`                                                                                  | If true, if there's a token URI resolver, the content will be resolved and included. |

**Returns**

| Name     | Type                                                                        | Description           |
| -------- | --------------------------------------------------------------------------- | --------------------- |
| `<none>` | [`JB721Tier`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jb721tier.md) | tier The tier object. |

### \_isTierRemovedWithRefresh

Check if a tier is removed from the current set of tiers, while reusing a bitmap word.

```solidity
function _isTierRemovedWithRefresh(address _nft, uint256 _tierId, JBBitmapWord memory _bitmapWord)
    internal
    view
    returns (bool);
```

**Parameters**

| Name          | Type                                                                              | Description                                                |
| ------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `_nft`        | `address`                                                                         | The NFT contract on which to check if the tier is removed. |
| `_tierId`     | `uint256`                                                                         | The tier ID to check for removal.                          |
| `_bitmapWord` | [`JBBitmapWord`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbbitmapword.md) | The bitmap word to reuse.                                  |

**Returns**

| Name     | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| `<none>` | `bool` | True if the tier has been removed. |

### \_numberOfReservedTokensOutstandingFor

The number of mintable reserved tokens within the provided tier.

```solidity
function _numberOfReservedTokensOutstandingFor(address _nft, uint256 _tierId, JBStored721Tier memory _storedTier)
    internal
    view
    returns (uint256);
```

**Parameters**

| Name          | Type                                                                                    | Description                                                        |
| ------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `_nft`        | `address`                                                                               | The NFT contract to check mintable reserved tokens on.             |
| `_tierId`     | `uint256`                                                                               | The tier ID to check the number of mintable reserved tokens for.   |
| `_storedTier` | [`JBStored721Tier`](/docs/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbstored721tier.md) | The stored tier to get the number of mintable reserved tokens for. |

**Returns**

| Name     | Type      | Description                                                                                         |
| -------- | --------- | --------------------------------------------------------------------------------------------------- |
| `<none>` | `uint256` | numberReservedTokensOutstanding The number of outstanding mintable reserved tokens within the tier. |

### \_generateTokenId

Finds the token ID given a tier ID and a token number within that tier.

```solidity
function _generateTokenId(uint256 _tierId, uint256 _tokenNumber) internal pure returns (uint256);
```

**Parameters**

| Name           | Type      | Description                               |
| -------------- | --------- | ----------------------------------------- |
| `_tierId`      | `uint256` | The ID of the tier to generate an ID for. |
| `_tokenNumber` | `uint256` | The number of the token in the tier.      |

**Returns**

| Name     | Type      | Description          |
| -------- | --------- | -------------------- |
| `<none>` | `uint256` | The ID of the token. |

### \_nextSortedTierIdOf

The next sorted tier ID.

```solidity
function _nextSortedTierIdOf(address _nft, uint256 _id, uint256 _max) internal view returns (uint256);
```

**Parameters**

| Name   | Type      | Description                                                   |
| ------ | --------- | ------------------------------------------------------------- |
| `_nft` | `address` | The NFT contract for which the sorted tier ID applies.        |
| `_id`  | `uint256` | The ID relative to which the next sorted ID will be returned. |
| `_max` | `uint256` | The maximum possible ID.                                      |

**Returns**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `<none>` | `uint256` | The ID.     |

### \_firstSortedTierIdOf

The first sorted tier ID of an NFT contract.

```solidity
function _firstSortedTierIdOf(address _nft, uint256 _category) internal view returns (uint256 id);
```

**Parameters**

| Name        | Type      | Description                                                                                                                                                            |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_nft`      | `address` | The NFT contract to get the first sorted tier ID of.                                                                                                                   |
| `_category` | `uint256` | The category to get the first sorted tier ID of. Send 0 for the first overall sorted ID, which might not be of the 0 category if there isn't a tier of the 0 category. |

**Returns**

| Name | Type      | Description               |
| ---- | --------- | ------------------------- |
| `id` | `uint256` | The first sorted tier ID. |

### \_lastSortedTierIdOf

The last sorted tier ID of an NFT.

```solidity
function _lastSortedTierIdOf(address _nft) internal view returns (uint256 id);
```

**Parameters**

| Name   | Type      | Description                                         |
| ------ | --------- | --------------------------------------------------- |
| `_nft` | `address` | The NFT contract to get the last sorted tier ID of. |

**Returns**

| Name | Type      | Description              |
| ---- | --------- | ------------------------ |
| `id` | `uint256` | The last sorted tier ID. |

### \_packBools

Pack three bools into a single uint8.

```solidity
function _packBools(bool _allowManualMint, bool _transfersPausable, bool _useVotingUnits)
    internal
    pure
    returns (uint8 _packed);
```

**Parameters**

| Name                 | Type   | Description                                                         |
| -------------------- | ------ | ------------------------------------------------------------------- |
| `_allowManualMint`   | `bool` | Whether or not manual mints are allowed.                            |
| `_transfersPausable` | `bool` | Whether or not transfers are pausable.                              |
| `_useVotingUnits`    | `bool` | A flag indicating whether the voting units override should be used. |

**Returns**

| Name      | Type    | Description       |
| --------- | ------- | ----------------- |
| `_packed` | `uint8` | The packed bools. |

### \_unpackBools

Unpack three bools from a single uint8.

```solidity
function _unpackBools(uint8 _packed)
    internal
    pure
    returns (bool _allowManualMint, bool _transfersPausable, bool _useVotingUnits);
```

**Parameters**

| Name      | Type    | Description       |
| --------- | ------- | ----------------- |
| `_packed` | `uint8` | The packed bools. |

**Returns**

| Name                 | Type   | Description                                                         |
| -------------------- | ------ | ------------------------------------------------------------------- |
| `_allowManualMint`   | `bool` | Whether or not manual mints are allowed.                            |
| `_transfersPausable` | `bool` | Whether or not transfers are pausable.                              |
| `_useVotingUnits`    | `bool` | A flag indicating whether the voting units override should be used. |

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
