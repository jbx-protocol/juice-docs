# JBTiered721Delegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/JBTiered721Delegate.sol)

Mainnet: [`0x27ACA2b923CeF119D2414b4E400e7173f34294C8`](https://etherscan.io/address/0x27ACA2b923CeF119D2414b4E400e7173f34294C8)

Goerli: [`0x151a80b5a1Ffc16AFCB32688dB9a5850Df15027b`](https://goerli.etherscan.io/address/0x151a80b5a1Ffc16AFCB32688dB9a5850Df15027b)

Inherits: [`JB721Delegate`](/docs/dev/extensions/juice-721-delegate/abstract/jb721delegate.md), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable), [`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md), [`IERC2981`](https://docs.openzeppelin.com/contracts/4.x/api/interfaces#IERC2981)

Delegate that offers project contributors NFTs with tiered price floors upon payment and the ability to redeem NFTs for treasury assets based based on price floor.

Adheres to -
- [`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.
- [`IERC2981`](https://docs.openzeppelin.com/contracts/4.x/api/interfaces#IERC2981):  Royalty standard.

Inherits from -
- [`JB721Delegate`](/docs/dev/extensions/juice-721-delegate/abstract/jb721delegate.md):  A generic NFT delegate.
- [`Votes`](/docs/dev/extensions/juice-721-delegate/abstract/votes.md):  A helper for voting balance snapshots.
- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable):  Includes convenience functionality for checking a message sender's permissions before executing certain transactions.

## State Variables

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

### prices

The contract that exposes price feeds.

```solidity
IJBPrices public override prices;
```

### pricingCurrency

The currency that is accepted when minting tier NFTs.

```solidity
uint256 public override pricingCurrency;
```

### pricingDecimals

The currency that is accepted when minting tier NFTs.

```solidity
uint256 public override pricingDecimals;
```

### creditsOf

The amount that each address has paid that has not yet contribute to the minting of an NFT.
- _address The address to which the credits belong.

```solidity
mapping(address => uint256) public override creditsOf;
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

### royaltyInfo

Royalty info conforming to EIP-2981.

```solidity
function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view override returns (address, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenId`|`uint256`|The ID of the token that the royalty is for.|
|`_salePrice`|`uint256`|The price being paid for the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the royalty's receiver.|
|`<none>`|`uint256`|The amount of the royalty.|

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

### contractURI

Returns the URI where contract metadata can be found.

```solidity
function contractURI() external view virtual override returns (string memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The contract's metadata URI.|

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
function supportsInterface(bytes4 _interfaceId) public view override(JB721Delegate, IERC165) returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherence to.|

### constructor

```solidity
constructor();
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

### mintReservesFor

Mint reserved tokens within the tier for the provided value.

```solidity
function mintReservesFor(JBTiered721MintReservesForTiersData[] calldata _mintReservesForTiersData) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mintReservesForTiersData`|[`JBTiered721MintReservesForTiersData[]`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721mintreservesfortiersdata.md)|Contains information about how many reserved tokens to mint for each tier.|

### mintFor

Mint tokens within the tier for the provided beneficiaries.

```solidity
function mintFor(JBTiered721MintForTiersData[] calldata _mintForTiersData) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mintForTiersData`|[`JBTiered721MintForTiersData[]`](/docs/dev/extensions/juice-721-delegate/structs/jbtiered721mintfortiersdata.md)|Contains information about how who to mint tokens for from each tier.|

### adjustTiers

Adjust the tiers mintable through this contract, adhering to any locked tier constraints.

*Only the contract's owner can adjust the tiers.*

```solidity
function adjustTiers(JB721TierParams[] calldata _tiersToAdd, uint256[] calldata _tierIdsToRemove)
    external
    override
    onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tiersToAdd`|[`JB721TierParams[]`](/docs/dev/extensions/juice-721-delegate/structs/jb721tierparams.md)|An array of tier data to add.|
|`_tierIdsToRemove`|`uint256[]`|An array of tier IDs to remove.|

### setDefaultReservedTokenBeneficiary

Sets the beneficiary of the reserved tokens for tiers where a specific beneficiary isn't set.

*Only the contract's owner can set the default reserved token beneficiary.*

```solidity
function setDefaultReservedTokenBeneficiary(address _beneficiary) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address`|The default beneficiary of the reserved tokens.|

### setBaseUri

Set a base token URI.

*Only the contract's owner can set the base URI.*

```solidity
function setBaseUri(string calldata _baseUri) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseUri`|`string`|The new base URI.|

### setContractUri

Set a contract metadata URI to contain opensea-style metadata.

*Only the contract's owner can set the contract URI.*

```solidity
function setContractUri(string calldata _contractUri) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_contractUri`|`string`|The new contract URI.|

### setTokenUriResolver

Set a token URI resolver.

*Only the contract's owner can set the token URI resolver.*

```solidity
function setTokenUriResolver(IJBTokenUriResolver _tokenUriResolver) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenUriResolver`|[`IJBTokenUriResolver`](/docs/dev/api/interfaces/ijbtokenuriresolver.md)|The new URI resolver.|

### setEncodedIPFSUriOf

Set an encoded IPFS uri of a tier.

*Only the contract's owner can set the encoded IPFS uri.*

```solidity
function setEncodedIPFSUriOf(uint256 _tierId, bytes32 _encodedIPFSUri) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierId`|`uint256`|The ID of the tier to set the encoded IPFS uri of.|
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

### mintFor

Manually mint NFTs from tiers.

```solidity
function mintFor(uint16[] calldata _tierIds, address _beneficiary)
    public
    override
    onlyOwner
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

### NOT_AVAILABLE

```solidity
error NOT_AVAILABLE();
```

### OVERSPENDING

```solidity
error OVERSPENDING();
```

### PRICING_RESOLVER_CHANGES_PAUSED

```solidity
error PRICING_RESOLVER_CHANGES_PAUSED();
```

### RESERVED_TOKEN_MINTING_PAUSED

```solidity
error RESERVED_TOKEN_MINTING_PAUSED();
```

### TRANSFERS_PAUSED

```solidity
error TRANSFERS_PAUSED();
```

