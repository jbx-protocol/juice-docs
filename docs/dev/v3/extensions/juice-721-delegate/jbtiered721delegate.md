# JBTiered721Delegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/JBTiered721Delegate.sol)

Inherits: [`JBOwnable`](/docs/dev/v3/extensions/juice-ownable/README.md), [`JB721Delegate`](/docs/dev/v3/extensions/juice-721-delegate/abstract/jb721delegate.md), [`IJBTiered721Delegate`](/docs/dev/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)

This delegate makes multiple NFT tiers with custom price floors available to a project's contributors upon payment, and allows project owners to enable NFT redemption for treasury assets based on the price floors of those NFTs.

## State Variables

### \_firstOwnerOf

The first owner of each token ID, stored on first transfer out.

```solidity
mapping(uint256 => address) internal _firstOwnerOf;
```

### \_packedPricingContext

Info that contextualizes the pricing of tiers, packed into a uint256: currency in bits 0-47 (48 bits), pricing decimals in bits 48-95 (48 bits), and prices contract in bits 96-255 (160 bits).

```solidity
uint256 internal _packedPricingContext;
```

### codeOrigin

The address of the original JBTiered721Delegate - used in `initialize(...)` to check if this is the original JBTiered721Delegate, and to revert initialization if it is.

```solidity
address public override codeOrigin;
```

### store

The contract that stores and manages data for this contract's NFTs.

```solidity
IJBTiered721DelegateStore public override store;
```

### fundingCycleStore

The contract storing all funding cycle configurations.

```solidity
IJBFundingCycleStore public override fundingCycleStore;
```

### creditsOf

The amount each address has paid which did not go towards minting an NFT. These credits can be redeemed to mint NFTs.

```solidity
mapping(address => uint256) public override creditsOf;
```

### baseURI

The common base for the tokenUris.

```solidity
string public override baseURI;
```

### contractURI

Contract metadata uri.

```solidity
string public override contractURI;
```

## Functions

### firstOwnerOf

The first owner of each token ID, which corresponds to the address that originally contributed to the project to receive the NFT.

```solidity
function firstOwnerOf(uint256 _tokenId) external view override returns (address);
```

**Parameters**

| Name       | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `_tokenId` | `uint256` | The ID of the token to get the first owner of. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | The first owner of the token. |

### pricingContext

Info that contextualizes the pricing of tiers.

```solidity
function pricingContext() external view override returns (uint256 currency, uint256 decimals, IJBPrices prices);
```

**Returns**

| Name       | Type                                                 | Description                                                       |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| `currency` | `uint256`                                            | The currency being used.                                          |
| `decimals` | `uint256`                                            | The amount of decimals being used.                                |
| `prices`   | [`IJBPrices`](/docs/dev/v3/api/interfaces/ijbprices.md) | The prices contract being used to resolve currency discrepancies. |

### balanceOf

The total number of tokens owned by an address across all tiers.

```solidity
function balanceOf(address _owner) public view override returns (uint256 balance);
```

**Parameters**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `_owner` | `address` | The address to check the balance of. |

**Returns**

| Name      | Type      | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| `balance` | `uint256` | The number of tokens owned by the address across all tiers. |

### tokenURI

The metadata URI of the provided token ID.

_Defer to the tokenUriResolver if it is set. Otherwise, use the tokenUri corresponding with the token's tier._

```solidity
function tokenURI(uint256 _tokenId) public view virtual override returns (string memory);
```

**Parameters**

| Name       | Type      | Description                                      |
| ---------- | --------- | ------------------------------------------------ |
| `_tokenId` | `uint256` | The ID of the token to get the metadata URI for. |

**Returns**

| Name     | Type     | Description                                                                                  |
| -------- | -------- | -------------------------------------------------------------------------------------------- |
| `<none>` | `string` | The token URI corresponding with the token's tier, or the tokenUriResolver URI if it is set. |

### redemptionWeightOf

The cumulative redemption weight the given token IDs have compared to the `_totalRedemptionWeight`.

```solidity
function redemptionWeightOf(uint256[] memory _tokenIds, JBRedeemParamsData calldata)
    public
    view
    virtual
    override
    returns (uint256);
```

**Parameters**

| Name        | Type                                                                        | Description                                                       |
| ----------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `_tokenIds` | `uint256[]`                                                                 | The IDs of the tokens to get the cumulative redemption weight of. |
| `<none>`    | [`JBRedeemParamsData`](/docs/dev/v3/api/data-structures/jbredeemparamsdata.md) |                                                                   |

**Returns**

| Name     | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| `<none>` | `uint256` | The redemption weight of the \_tokenIds. |

### totalRedemptionWeight

The cumulative redemption weight across all token IDs.

```solidity
function totalRedemptionWeight(JBRedeemParamsData calldata) public view virtual override returns (uint256);
```

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The cumulative redemption weight. |

### supportsInterface

Indicates if this contract adheres to the specified interface.

_See IERC165-supportsInterface._

```solidity
function supportsInterface(bytes4 _interfaceId) public view override returns (bool);
```

**Parameters**

| Name           | Type     | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| `_interfaceId` | `bytes4` | The ID of the interface to check for adherence to. |

### constructor

```solidity
constructor(
    IJBDirectory _directory,
    IJBOperatorStore _operatorStore,
    bytes4 _payMetadataDelegateId,
    bytes4 _redeemMetadataDelegateId
)
    JBOwnable(_directory.projects(), _operatorStore)
    JB721Delegate(_directory, _payMetadataDelegateId, _redeemMetadataDelegateId);
```

**Parameters**

| Name                        | Type                                                               | Description                                                      |
| --------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `_directory`                | [`IJBDirectory`](/docs/dev/v3/api/interfaces/ijbdirectory.md)         | A directory of terminals and controllers for projects.           |
| `_operatorStore`            | [`IJBOperatorStore`](/docs/dev/v3/api/interfaces/ijboperatorstore.md) | A contract which stores operator assignments.                    |
| `_payMetadataDelegateId`    | `bytes4`                                                           | The 4bytes ID of this delegate, used for pay metadata parsing    |
| `_redeemMetadataDelegateId` | `bytes4`                                                           | The 4bytes ID of this delegate, used for redeem metadata parsing |

### initialize

Initializes a cloned copy of the original JB721Delegate contract.

```solidity
function initialize(
    uint256 _projectId,
    string memory _name,
    string memory _symbol,
    IJBFundingCycleStore _fundingCycleStore,
    string memory _baseUri,
    IJB721TokenUriResolver _tokenUriResolver,
    string memory _contractUri,
    JB721PricingParams memory _pricing,
    IJBTiered721DelegateStore _store,
    JBTiered721Flags memory _flags
) public override;
```

**Parameters**

| Name                 | Type                                                                                                           | Description                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `_projectId`         | `uint256`                                                                                                      | The ID of the project this contract's functionality applies to.                                                                                |
| `_name`              | `string`                                                                                                       | The name of the NFT collection distributed through this contract.                                                                              |
| `_symbol`            | `string`                                                                                                       | The symbol that the NFT collection should be represented by.                                                                                   |
| `_fundingCycleStore` | [`IJBFundingCycleStore`](/docs/dev/v3/api/interfaces/ijbfundingcyclestore.md)                                     | A contract storing all funding cycle configurations.                                                                                           |
| `_baseUri`           | `string`                                                                                                       | A URI to use as a base for full token URIs.                                                                                                    |
| `_tokenUriResolver`  | [`IJB721TokenUriResolver`](/docs/dev/v3/extensions/juice-721-delegate/interfaces/ijb721tokenuriresolver.md)       | A contract responsible for resolving the token URI for each token ID.                                                                          |
| `_contractUri`       | `string`                                                                                                       | A URI where this contract's metadata can be found.                                                                                             |
| `_pricing`           | [`JB721PricingParams`](/docs/dev/v3/extensions/juice-721-delegate/structs/jb721pricingparams.md)                  | NFT tier pricing parameters according to which token distribution will be made. Must be sorted by contribution floor (from least to greatest). |
| `_store`             | [`IJBTiered721DelegateStore`](/docs/dev/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegatestore.md) | The contract which stores the NFT's data.                                                                                                      |
| `_flags`             | [`JBTiered721Flags`](/docs/dev/v3/extensions/juice-721-delegate/structs/jbtiered721flags.md)                      | A set of flags that help to define how this contract works.                                                                                    |

### mintFor

Manually mint NFTs from the provided tiers .

```solidity
function mintFor(uint16[] calldata _tierIds, address _beneficiary)
    external
    override
    requirePermission(owner(), projectId, JB721Operations.MINT)
    returns (uint256[] memory tokenIds);
```

**Parameters**

| Name           | Type       | Description                        |
| -------------- | ---------- | ---------------------------------- |
| `_tierIds`     | `uint16[]` | The IDs of the tiers to mint from. |
| `_beneficiary` | `address`  | The address to mint to.            |

**Returns**

| Name       | Type        | Description                         |
| ---------- | ----------- | ----------------------------------- |
| `tokenIds` | `uint256[]` | The IDs of the newly minted tokens. |

### mintReservesFor

Mint reserved tokens within the tier for the provided value.

```solidity
function mintReservesFor(JBTiered721MintReservesForTiersData[] calldata _mintReservesForTiersData) external override;
```

**Parameters**

| Name                        | Type                                                                                                                              | Description                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `_mintReservesForTiersData` | [`JBTiered721MintReservesForTiersData[]`](/docs/dev/v3/extensions/juice-721-delegate/structs/jbtiered721mintreservesfortiersdata.md) | Contains information about how many reserved tokens to mint for each tier. |

### adjustTiers

Adjust the tiers which are mintable through this contract, adhering to any locked tier constraints.

_Only the contract's owner or an operator with ADJUST_TIERS can adjust the tiers._

```solidity
function adjustTiers(JB721TierParams[] calldata _tiersToAdd, uint256[] calldata _tierIdsToRemove)
    external
    override
    requirePermission(owner(), projectId, JB721Operations.ADJUST_TIERS);
```

**Parameters**

| Name               | Type                                                                                      | Description                     |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------- |
| `_tiersToAdd`      | [`JB721TierParams[]`](/docs/dev/v3/extensions/juice-721-delegate/structs/jb721tierparams.md) | An array of tier data to add.   |
| `_tierIdsToRemove` | `uint256[]`                                                                               | An array of tier IDs to remove. |

### setMetadata

Set a contract's URI metadata properties.

_Only the contract's owner can set the URI metadata._

```solidity
function setMetadata(
    string calldata _baseUri,
    string calldata _contractUri,
    IJB721TokenUriResolver _tokenUriResolver,
    uint256 _encodedIPFSUriTierId,
    bytes32 _encodedIPFSUri
) external override requirePermission(owner(), projectId, JB721Operations.UPDATE_METADATA);
```

**Parameters**

| Name                    | Type                                                                                                     | Description                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `_baseUri`              | `string`                                                                                                 | The new base URI.                                  |
| `_contractUri`          | `string`                                                                                                 | The new contract URI.                              |
| `_tokenUriResolver`     | [`IJB721TokenUriResolver`](/docs/dev/v3/extensions/juice-721-delegate/interfaces/ijb721tokenuriresolver.md) | The new URI resolver.                              |
| `_encodedIPFSUriTierId` | `uint256`                                                                                                | The ID of the tier to set the encoded IPFS URI of. |
| `_encodedIPFSUri`       | `bytes32`                                                                                                | The encoded IPFS URI to set.                       |

### mintReservesFor

Mint reserved tokens within the provided tier.

_Only currently outstanding reserved tokens can be minted._

```solidity
function mintReservesFor(uint256 _tierId, uint256 _count) public override;
```

**Parameters**

| Name      | Type      | Description                            |
| --------- | --------- | -------------------------------------- |
| `_tierId` | `uint256` | The ID of the tier to mint from.       |
| `_count`  | `uint256` | The number of reserved tokens to mint. |

### \_processPayment

Mints for a given contribution to the beneficiary.

```solidity
function _processPayment(JBDidPayData3_1_1 calldata _data) internal virtual override;
```

**Parameters**

| Name    | Type                                                                      | Description                                              |
| ------- | ------------------------------------------------------------------------- | -------------------------------------------------------- |
| `_data` | [`JBDidPayData3_1_1`](/docs/dev/v3/api/data-structures/jbdidpaydata3_1_1.md) | The standard data passed when paying a Juicebox project. |

### \_didBurn

A function that runs when tokens are burned via redemption.

```solidity
function _didBurn(uint256[] memory _tokenIds) internal virtual override;
```

**Parameters**

| Name        | Type        | Description                             |
| ----------- | ----------- | --------------------------------------- |
| `_tokenIds` | `uint256[]` | The IDs of the tokens that were burned. |

### \_mintAll

Mints a token in all provided tiers.

```solidity
function _mintAll(uint256 _amount, uint16[] memory _mintTierIds, address _beneficiary)
    internal
    returns (uint256 leftoverAmount);
```

**Parameters**

| Name           | Type       | Description                                                                                                        |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `_amount`      | `uint256`  | The amount to base the mints on. The combined price floors of all tokens to be minted must fit within this amount. |
| `_mintTierIds` | `uint16[]` | An array of tier IDs to be minted.                                                                                 |
| `_beneficiary` | `address`  | The address to mint for.                                                                                           |

**Returns**

| Name             | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| `leftoverAmount` | `uint256` | The amount leftover after the mint. |

### \_beforeTokenTransfer

Hook to register a token's first owner (if necessary) before transferring it.

```solidity
function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override;
```

**Parameters**

| Name       | Type      | Description                             |
| ---------- | --------- | --------------------------------------- |
| `_from`    | `address` | The address to transfer the token from. |
| `_to`      | `address` | The address to transfer the token to.   |
| `_tokenId` | `uint256` | The ID of the token being transferred.  |

### \_afterTokenTransfer

Transfer voting units after the transfer of a token.

```solidity
function _afterTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override;
```

**Parameters**

| Name       | Type      | Description                             |
| ---------- | --------- | --------------------------------------- |
| `_from`    | `address` | The address to transfer the token from. |
| `_to`      | `address` | The address to transfer the token to.   |
| `_tokenId` | `uint256` | The ID of the token being transferred.  |

### \_afterTokenTransferAccounting

Custom hook to handle token/tier accounting, this way we can reuse the '\_tier' instead of fetching it again.

```solidity
function _afterTokenTransferAccounting(address _from, address _to, uint256 _tokenId, JB721Tier memory _tier)
    internal
    virtual;
```

**Parameters**

| Name       | Type                                                                        | Description                                                       |
| ---------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `_from`    | `address`                                                                   | The address to transfer voting units from.                        |
| `_to`      | `address`                                                                   | The address to transfer voting units to.                          |
| `_tokenId` | `uint256`                                                                   | The ID of the token for which voting units are being transferred. |
| `_tier`    | [`JB721Tier`](/docs/dev/v3/extensions/juice-721-delegate/structs/jb721tier.md) | The tier the token ID is part of.                                 |

## Errors

### OVERSPENDING

```solidity
error OVERSPENDING();
```

### RESERVED_TOKEN_MINTING_PAUSED

```solidity
error RESERVED_TOKEN_MINTING_PAUSED();
```

### TRANSFERS_PAUSED

```solidity
error TRANSFERS_PAUSED();
```
