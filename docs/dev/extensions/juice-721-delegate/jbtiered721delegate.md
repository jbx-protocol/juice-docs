# JBTiered721Delegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/JBTiered721Delegate.sol)

Mainnet: [`0x2B4991520AC9a18E4d139aD1EAd5cA359E745a32`](https://etherscan.io/address/0x2B4991520AC9a18E4d139aD1EAd5cA359E745a32)

Goerli: [`0x0d97311d948635147AF8797A0B86Fc4b7F42f72A`](https://goerli.etherscan.io/address/0x0d97311d948635147AF8797A0B86Fc4b7F42f72A)

Inherits: [`JBOwnable`](/), [`JB721Delegate`](/docs/dev/extensions/juice-721-delegate/abstract/jb721delegate.md), [`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)

Delegate that offers project contributors NFTs with tiered price floors upon payment and the ability to redeem NFTs for treasury assets based based on price floor.

Adheres to -
- [`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

Inherits from -
- [`JB721Delegate`](/docs/dev/extensions/juice-721-delegate/abstract/jb721delegate.md):  A generic NFT delegate.
- [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md):  A helper for voting balance snapshots.
- [`JBOwnable`](/):  Includes convenience functionality for checking a message sender's permissions before executing certain transactions.

## State Variables

### _firstOwnerOf

The first owner of each token ID, stored on first transfer out.
- _nft The NFT contract to which the token belongs.
- _tokenId The ID of the token to get the stored first owner of.

```solidity
mapping(uint256 => address) internal _firstOwnerOf;
```

### _packedPricingContext

Info that contextualized the pricing of tiers, packed into a uint256.

```solidity
uint256 internal _packedPricingContext;
```

### codeOrigin

The address of the origin 'JBTiered721Delegate', used to check in the init if the contract is the original or not

```solidity
address public override codeOrigin;
```

### store

The contract that stores and manages the NFT's data.

```solidity
IJBTiered721DelegateStore public override store;
```

### fundingCycleStore

The contract storing all funding cycle configurations.

```solidity
IJBFundingCycleStore public override fundingCycleStore;
```

### creditsOf

The amount that each address has paid that has not yet contribute to the minting of an NFT.
- _address The address to which the credits belong.

```solidity
mapping(address => uint256) public override creditsOf;
```

### baseURI

The common base for the tokenUri's
- _nft The NFT for which the base URI applies.

```solidity
string public override baseURI;
```

### contractURI

Contract metadata uri.
- _nft The NFT for which the contract URI resolver applies.

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

|Name|Type|Description|
|----|----|-----------|
|`_tokenId`|`uint256`|The ID of the token to get the first owner of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The first owner of the token.|

### pricingContext

Info that contextualized the pricing of tiers.

```solidity
function pricingContext() external view override returns (uint256 currency, uint256 decimals, IJBPrices prices);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`uint256`|The currency being used.|
|`decimals`|`uint256`|The amount of decimals being used.|
|`prices`|[`IJBPrices`](/docs/dev/api/interfaces/ijbprices.md)|The prices contract being used to resolve currency discrepancies.|

### balanceOf

The total number of tokens owned by the given owner across all tiers.

```solidity
function balanceOf(address _owner) public view override returns (uint256 balance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The address to check the balance of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The number of tokens owners by the owner across all tiers.|

### tokenURI

The metadata URI of the provided token ID.

*Defer to the tokenUriResolver if set, otherwise, use the tokenUri set with the token's tier.*

```solidity
function tokenURI(uint256 _tokenId) public view virtual override returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenId`|`uint256`|The ID of the token to get the tier URI for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The token URI corresponding with the tier or the tokenUriResolver URI.|

### redemptionWeightOf

The cumulative weight the given token IDs have in redemptions compared to the `_totalRedemptionWeight`.

```solidity
function redemptionWeightOf(uint256[] memory _tokenIds, JBRedeemParamsData calldata)
    public
    view
    virtual
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIds`|`uint256[]`|The IDs of the tokens to get the cumulative redemption weight of.|
|`<none>`|[`JBRedeemParamsData`](/docs/dev/api/data-structures/jbredeemparamsdata.md)||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The weight.|

### totalRedemptionWeight

The cumulative weight that all token IDs have in redemptions.

```solidity
function totalRedemptionWeight(JBRedeemParamsData calldata) public view virtual override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total weight.|

### supportsInterface

Indicates if this contract adheres to the specified interface.

*See {IERC165-supportsInterface}.*

```solidity
function supportsInterface(bytes4 _interfaceId) public view override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherence to.|

### constructor

```solidity
constructor(IJBProjects _projects, IJBOperatorStore _operatorStore) JBOwnable(_projects, _operatorStore);
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
) public override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project this contract's functionality applies to.|
|`_directory`|[`IJBDirectory`](/docs/dev/api/interfaces/ijbdirectory.md)|The directory of terminals and controllers for projects.|
|`_name`|`string`|The name of the token.|
|`_symbol`|`string`|The symbol that the token should be represented by.|
|`_fundingCycleStore`|[`IJBFundingCycleStore`](/docs/dev/api/interfaces/ijbfundingcyclestore.md)|A contract storing all funding cycle configurations.|
|`_baseUri`|`string`|A URI to use as a base for full token URIs.|
|`_tokenUriResolver`|[`IJBTokenUriResolver`](/docs/dev/api/interfaces/ijbtokenuriresolver.md)|A contract responsible for resolving the token URI for each token ID.|
|`_contractUri`|`string`|A URI where contract metadata can be found.|
|`_pricing`|[`JB721PricingParams`](/docs/dev/extensions/juice-721-delegate/structs/jb721pricingparams.md)|The tier pricing according to which token distribution will be made. Must be passed in order of contribution floor, with implied increasing value.|
|`_store`|[`IJBTiered721DelegateStore`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatestore.md)|A contract that stores the NFT's data.|
|`_flags`|[`JBTiered721Flags`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721flags.md)|A set of flags that help define how this contract works.|

### mintFor

Manually mint NFTs from tiers.

```solidity
function mintFor(uint16[] calldata _tierIds, address _beneficiary)
    external
    override
    requirePermission(owner(), projectId, JB721Operations.MINT)
    returns (uint256[] memory tokenIds);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierIds`|`uint16[]`|The IDs of the tiers to mint from.|
|`_beneficiary`|`address`|The address to mint to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The IDs of the newly minted tokens.|

### mintReservesFor

Mint reserved tokens within the tier for the provided value.

```solidity
function mintReservesFor(JBTiered721MintReservesForTiersData[] calldata _mintReservesForTiersData) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mintReservesForTiersData`|[`JBTiered721MintReservesForTiersData[]`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721mintreservesfortiersdata.md)|Contains information about how many reserved tokens to mint for each tier.|

### adjustTiers

Adjust the tiers mintable through this contract, adhering to any locked tier constraints.

*Only the contract's owner can adjust the tiers.*

```solidity
function adjustTiers(JB721TierParams[] calldata _tiersToAdd, uint256[] calldata _tierIdsToRemove)
    external
    override
    requirePermission(owner(), projectId, JB721Operations.ADJUST_TIERS);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tiersToAdd`|[`JB721TierParams[]`](/docs/dev/extensions/juice-721-delegate/structs/jb721tierparams.md)|An array of tier data to add.|
|`_tierIdsToRemove`|`uint256[]`|An array of tier IDs to remove.|

### setMetadata

Set a contract's URI metadata properties.

*Only the contract's owner can set the URI metadata.*

```solidity
function setMetadata(
    string calldata _baseUri,
    string calldata _contractUri,
    IJBTokenUriResolver _tokenUriResolver,
    uint256 _encodedIPFSUriTierId,
    bytes32 _encodedIPFSUri
) external override requirePermission(owner(), projectId, JB721Operations.UPDATE_METADATA);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseUri`|`string`|The new base URI.|
|`_contractUri`|`string`|The new contract URI.|
|`_tokenUriResolver`|[`IJBTokenUriResolver`](/docs/dev/api/interfaces/ijbtokenuriresolver.md)|The new URI resolver.|
|`_encodedIPFSUriTierId`|`uint256`|The ID of the tier to set the encoded IPFS uri of.|
|`_encodedIPFSUri`|`bytes32`|The encoded IPFS uri to set.|

### mintReservesFor

Mint reserved tokens within the tier for the provided value.

```solidity
function mintReservesFor(uint256 _tierId, uint256 _count) public override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierId`|`uint256`|The ID of the tier to mint within.|
|`_count`|`uint256`|The number of reserved tokens to mint.|

### _processPayment

Mints for a given contribution to the beneficiary.

```solidity
function _processPayment(JBDidPayData calldata _data) internal virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBDidPayData`](/docs/dev/api/data-structures/jbdidpaydata.md)|The Juicebox standard project contribution data.|

### _didBurn

A function that will run when tokens are burned via redemption.

```solidity
function _didBurn(uint256[] memory _tokenIds) internal virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIds`|`uint256[]`|The IDs of the tokens that were burned.|

### _mintAll

Mints a token in all provided tiers.

```solidity
function _mintAll(uint256 _amount, uint16[] memory _mintTierIds, address _beneficiary)
    internal
    returns (uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount to base the mints on. All mints' price floors must fit in this amount.|
|`_mintTierIds`|`uint16[]`|An array of tier IDs that are intended to be minted.|
|`_beneficiary`|`address`|The address to mint for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|The amount leftover after the mint.|

### _beforeTokenTransfer

User the hook to register the first owner if it's not yet registered.

```solidity
function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address where the transfer is originating.|
|`_to`|`address`|The address to which the transfer is being made.|
|`_tokenId`|`uint256`|The ID of the token being transferred.|

### _afterTokenTransfer

Transfer voting units after the transfer of a token.

```solidity
function _afterTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address where the transfer is originating.|
|`_to`|`address`|The address to which the transfer is being made.|
|`_tokenId`|`uint256`|The ID of the token being transferred.|

### _afterTokenTransferAccounting

Custom hook to handle token/tier accounting, this way we can reuse the '_tier' instead of fetching it again.

```solidity
function _afterTokenTransferAccounting(address _from, address _to, uint256 _tokenId, JB721Tier memory _tier)
    internal
    virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The account to transfer voting units from.|
|`_to`|`address`|The account to transfer voting units to.|
|`_tokenId`|`uint256`|The ID of the token for which voting units are being transferred.|
|`_tier`|[`JB721Tier`](/docs/dev/extensions/juice-721-delegate/structs/jb721tier.md)|The tier the token ID is part of.|

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

