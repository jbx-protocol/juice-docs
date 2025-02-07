# Banny721TokenUriResolver
[Git Source](https://github.com/mejango/banny-contract/blob/b8fd68f37fbb8d85a53ed051250e6280a383daf8/src/Banny721TokenUriResolver.sol)

**Inherits:**
Ownable, ERC2771Context, ReentrancyGuard, IJB721TokenUriResolver, [IBanny721TokenUriResolver](/docs/v4/api/banny/interfaces/IBanny721TokenUriResolver.sol/interface.IBanny721TokenUriResolver.md), IERC721Receiver

Banny asset manager. Stores and shows Naked Bannys in worlds with outfits on.


## State Variables
### _ONE_BILLION
Just a kind reminder to our readers.

*Used in 721 token ID generation.*


```solidity
uint256 private constant _ONE_BILLION = 1_000_000_000;
```


### _LOCK_DURATION
The duration that naked Bannys can be locked for.


```solidity
uint256 private constant _LOCK_DURATION = 7 days;
```


### _NAKED_CATEGORY

```solidity
uint8 private constant _NAKED_CATEGORY = 0;
```


### _WORLD_CATEGORY

```solidity
uint8 private constant _WORLD_CATEGORY = 1;
```


### _BACKSIDE_CATEGORY

```solidity
uint8 private constant _BACKSIDE_CATEGORY = 2;
```


### _NECKLACE_CATEGORY

```solidity
uint8 private constant _NECKLACE_CATEGORY = 3;
```


### _HEAD_CATEGORY

```solidity
uint8 private constant _HEAD_CATEGORY = 4;
```


### _GLASSES_CATEGORY

```solidity
uint8 private constant _GLASSES_CATEGORY = 5;
```


### _MOUTH_CATEGORY

```solidity
uint8 private constant _MOUTH_CATEGORY = 6;
```


### _LEGS_CATEGORY

```solidity
uint8 private constant _LEGS_CATEGORY = 7;
```


### _SUIT_CATEGORY

```solidity
uint8 private constant _SUIT_CATEGORY = 8;
```


### _SUIT_BOTTOM_CATEGORY

```solidity
uint8 private constant _SUIT_BOTTOM_CATEGORY = 9;
```


### _SUIT_TOP_CATEGORY

```solidity
uint8 private constant _SUIT_TOP_CATEGORY = 10;
```


### _HEADTOP_CATEGORY

```solidity
uint8 private constant _HEADTOP_CATEGORY = 11;
```


### _HAND_CATEGORY

```solidity
uint8 private constant _HAND_CATEGORY = 12;
```


### _SPECIAL_SUIT_CATEGORY

```solidity
uint8 private constant _SPECIAL_SUIT_CATEGORY = 13;
```


### _SPECIAL_LEGS_CATEGORY

```solidity
uint8 private constant _SPECIAL_LEGS_CATEGORY = 14;
```


### _SPECIAL_HEAD_CATEGORY

```solidity
uint8 private constant _SPECIAL_HEAD_CATEGORY = 15;
```


### _SPECIAL_BODY_CATEGORY

```solidity
uint8 private constant _SPECIAL_BODY_CATEGORY = 16;
```


### ALIEN_UPC

```solidity
uint8 private constant ALIEN_UPC = 1;
```


### PINK_UPC

```solidity
uint8 private constant PINK_UPC = 2;
```


### ORANGE_UPC

```solidity
uint8 private constant ORANGE_UPC = 3;
```


### ORIGINAL_UPC

```solidity
uint8 private constant ORIGINAL_UPC = 4;
```


### outfitLockedUntil
The amount of time each naked banny is currently locked for.


```solidity
mapping(address hook => mapping(uint256 upc => uint256)) public override outfitLockedUntil;
```


### svgBaseUri
The base of the domain hosting the SVG files that can be lazily uploaded to the contract.


```solidity
string public override svgBaseUri;
```


### svgHashOf
The Naked Banny and outfit SVG hash files.


```solidity
mapping(uint256 upc => bytes32) public override svgHashOf;
```


### DEFAULT_ALIEN_EYES

```solidity
string public override DEFAULT_ALIEN_EYES;
```


### DEFAULT_MOUTH

```solidity
string public override DEFAULT_MOUTH;
```


### DEFAULT_NECKLACE

```solidity
string public override DEFAULT_NECKLACE;
```


### DEFAULT_STANDARD_EYES

```solidity
string public override DEFAULT_STANDARD_EYES;
```


### NAKED_BANNY

```solidity
string public override NAKED_BANNY;
```


### _attachedOutfitIdsOf
The outfits currently attached to each Naked Banny.

*Nakes Banny's will only be shown with outfits currently owned by the owner of the Naked Banny.*


```solidity
mapping(address hook => mapping(uint256 nakedBannyId => uint256[])) internal _attachedOutfitIdsOf;
```


### _attachedWorldIdOf
The world currently attached to each Naked Banny.

*Nakes Banny's will only be shown with a world currently owned by the owner of the Naked Banny.*


```solidity
mapping(address hook => mapping(uint256 nakedBannyId => uint256)) internal _attachedWorldIdOf;
```


### _customProductNameOf
The name of each product.


```solidity
mapping(uint256 upc => string) internal _customProductNameOf;
```


### _svgContentOf
The Naked Banny and outfit SVG files.


```solidity
mapping(uint256 upc => string) internal _svgContentOf;
```


### _userOf
The ID of the naked banny each world is being used by.


```solidity
mapping(address hook => mapping(uint256 worldId => uint256)) internal _userOf;
```


### _wearerOf
The ID of the naked banny each outfit is being worn by.


```solidity
mapping(address hook => mapping(uint256 outfitId => uint256)) internal _wearerOf;
```


## Functions
### constructor


```solidity
constructor(
    string memory nakedBanny,
    string memory defaultNecklace,
    string memory defaultMouth,
    string memory defaultStandardEyes,
    string memory defaultAlienEyes,
    address owner,
    address trustedForwarder
)
    Ownable(owner)
    ERC2771Context(trustedForwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`nakedBanny`|`string`|The SVG of the naked banny.|
|`defaultNecklace`|`string`|The SVG of the default necklace.|
|`defaultMouth`|`string`|The SVG of the default mouth.|
|`defaultStandardEyes`|`string`|The SVG of the default standard eyes.|
|`defaultAlienEyes`|`string`|The SVG of the default alien eyes.|
|`owner`|`address`|The owner allowed to add SVG files that correspond to product IDs.|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### tokenUriOf

Returns the SVG showing a dressed Naked Banny in a world.


```solidity
function tokenUriOf(address hook, uint256 tokenId) external view override returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`||
|`tokenId`|`uint256`|The ID of the token to show. If the ID belongs to a Naked Banny, it will be shown with its current outfits in its current world.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|tokenUri The URI representing the SVG.|


### assetIdsOf

The assets currently attached to each Naked Banny.


```solidity
function assetIdsOf(
    address hook,
    uint256 nakedBannyId
)
    public
    view
    override
    returns (uint256 worldId, uint256[] memory outfitIds);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook address of the collection.|
|`nakedBannyId`|`uint256`|The ID of the naked banny shows with the associated assets.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`worldId`|`uint256`|The world attached to the Naked Banny.|
|`outfitIds`|`uint256[]`|The outfits attached to the Naked Banny.|


### namesOf

Returns the name of the token.


```solidity
function namesOf(
    address hook,
    uint256 tokenId
)
    public
    view
    override
    returns (string memory, string memory, string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook storing the assets.|
|`tokenId`|`uint256`|The ID of the token to show.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|fullName The full name of the token.|
|`<none>`|`string`|categoryName The name of the token's category.|
|`<none>`|`string`|productName The name of the token's product.|


### svgOf

Returns the SVG showing either a naked banny with/without outfits and a world, or the stand alone outfit
or world.


```solidity
function svgOf(
    address hook,
    uint256 tokenId,
    bool shouldDressNakedBanny,
    bool shouldIncludeWorldOnNakedBanny
)
    public
    view
    override
    returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook storing the assets.|
|`tokenId`|`uint256`|The ID of the token to show. If the ID belongs to a Naked Banny, it will be shown with its current outfits in its current world if specified.|
|`shouldDressNakedBanny`|`bool`|Whether the naked banny should be dressed.|
|`shouldIncludeWorldOnNakedBanny`|`bool`|Whether the world should be included on the naked banny.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|svg The SVG.|


### userOf

Checks to see which naked banny is currently using a particular world.


```solidity
function userOf(address hook, uint256 worldId) public view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook address of the collection.|
|`worldId`|`uint256`|The ID of the world being used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the naked banny using the world.|


### wearerOf

Checks to see which naked banny is currently wearing a particular outfit.


```solidity
function wearerOf(address hook, uint256 outfitId) public view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook address of the collection.|
|`outfitId`|`uint256`|The ID of the outfit being worn.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the naked banny wearing the outfit.|


### _categoryNameOf

The name of each token's category.


```solidity
function _categoryNameOf(uint256 category) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`category`|`uint256`|The category of the token being named.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|name The token's category name.|


### _contextSuffixLength

*ERC-2771 specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view virtual override(ERC2771Context, Context) returns (uint256);
```

### _checkIfSenderIsOwner

Make sure the message sender own's the token.


```solidity
function _checkIfSenderIsOwner(address hook, uint256 upc) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract of the token having ownership checked.|
|`upc`|`uint256`|The product's UPC to check ownership of.|


### _fillsFor

The fills for a product.


```solidity
function _fillsFor(uint256 upc)
    internal
    pure
    returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`upc`|`uint256`|The ID of the token whose product's fills are being returned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|fills The fills for the product.|
|`<none>`|`string`||
|`<none>`|`string`||
|`<none>`|`string`||
|`<none>`|`string`||
|`<none>`|`string`||
|`<none>`|`string`||


### _fullNameOf

The full name of each product, including category and inventory.


```solidity
function _fullNameOf(uint256 tokenId, JB721Tier memory product) internal view returns (string memory name);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|The ID of the token being named.|
|`product`|`JB721Tier`|The product of the token being named.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`name`|`string`|The full name.|


### _layeredSvg

Returns the standard dimension SVG containing dynamic contents and SVG metadata.


```solidity
function _layeredSvg(string memory contents) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`contents`|`string`|The contents of the SVG|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|svg The SVG contents.|


### _mannequinBannySvg

The SVG contents for a mannequin banny.


```solidity
function _mannequinBannySvg() internal view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|contents The SVG contents of the mannequin banny.|


### _msgData

Returns the calldata, prefered to use over `msg.data`


```solidity
function _msgData() internal view override(ERC2771Context, Context) returns (bytes calldata);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|calldata the `msg.data` of this call|


### _msgSender

Returns the sender, prefered to use over `msg.sender`


```solidity
function _msgSender() internal view override(ERC2771Context, Context) returns (address sender);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|the sender address of this call.|


### _nakedBannySvgOf

The SVG contents for a naked banny.


```solidity
function _nakedBannySvgOf(uint256 upc) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`upc`|`uint256`|The ID of the token whose product's SVG is being returned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|contents The SVG contents of the naked banny.|


### _outfitContentsFor

The SVG contents for a list of outfit IDs.


```solidity
function _outfitContentsFor(address hook, uint256[] memory outfitIds) internal view returns (string memory contents);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the product belongs to.|
|`outfitIds`|`uint256[]`|The IDs of the outfits that'll be associated with the specified banny.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`contents`|`string`|The SVG contents of the outfits.|


### _productNameOf

The name of each token's product type.


```solidity
function _productNameOf(uint256 upc) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`upc`|`uint256`|The ID of the token whose product type is being named.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|name The item's product name.|


### _productOfTokenId

Get the product of the 721 with the provided token ID in the provided 721 contract.


```solidity
function _productOfTokenId(address hook, uint256 tokenId) internal view returns (JB721Tier memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the product belongs to.|
|`tokenId`|`uint256`|The token ID of the 721 to get the product of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JB721Tier`|product The product.|


### _storeOf

The store of the hook.


```solidity
function _storeOf(address hook) internal view returns (IJB721TiersHookStore);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook to get the store of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IJB721TiersHookStore`|store The store of the hook.|


### _svgOf

The Naked Banny and outfit SVG files.


```solidity
function _svgOf(address hook, uint256 upc) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract that the product belongs to.|
|`upc`|`uint256`|The universal product code of the product that the SVG contents represent.|


### decorateBannyWith

Dress your Naked Banny with outfits.

*The caller must own the naked banny being dressed and all outfits being worn.*


```solidity
function decorateBannyWith(
    address hook,
    uint256 nakedBannyId,
    uint256 worldId,
    uint256[] calldata outfitIds
)
    external
    override
    nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook storing the assets.|
|`nakedBannyId`|`uint256`|The ID of the Naked Banny being dressed.|
|`worldId`|`uint256`|The ID of the world that'll be associated with the specified banny.|
|`outfitIds`|`uint256[]`|The IDs of the outfits that'll be associated with the specified banny. Only one outfit per outfit category allowed at a time and they must be passed in order.|


### lockOutfitChangesFor

Locks a naked banny ID so that it can't change its outfit for a period of time.


```solidity
function lockOutfitChangesFor(address hook, uint256 nakedBannyId) public override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook address of the collection.|
|`nakedBannyId`|`uint256`|The ID of the Naked Banny to lock.|


### onERC721Received

*Make sure tokens can be receieved if the transaction was initiated by this contract.*


```solidity
function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
)
    external
    view
    override
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|The address that initiated the transaction.|
|`from`|`address`|The address that initiated the transfer.|
|`tokenId`|`uint256`|The ID of the token being transferred.|
|`data`|`bytes`|The data of the transfer.|


### setProductNames

Allows the owner to set the product's name.


```solidity
function setProductNames(uint256[] memory upcs, string[] memory names) external override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`upcs`|`uint256[]`|The universal product codes of the products having their name stored.|
|`names`|`string[]`|The names of the products.|


### setSvgBaseUri

Allows the owner of this contract to specify the base of the domain hosting the SVG files.


```solidity
function setSvgBaseUri(string calldata baseUri) external override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`baseUri`|`string`|The base URI of the SVG files.|


### setSvgContentsOf

The owner of this contract can store SVG files for product IDs.


```solidity
function setSvgContentsOf(uint256[] memory upcs, string[] calldata svgContents) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`upcs`|`uint256[]`|The universal product codes of the products having SVGs stored.|
|`svgContents`|`string[]`|The svg contents being stored, not including the parent <svg></svg> element.|


### setSvgHashsOf

Allows the owner of this contract to upload the hash of an svg file for a universal product code.

*This allows anyone to lazily upload the correct svg file.*


```solidity
function setSvgHashsOf(uint256[] memory upcs, bytes32[] memory svgHashs) external override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`upcs`|`uint256[]`|The universal product codes of the products having SVG hashes stored.|
|`svgHashs`|`bytes32[]`|The svg hashes being stored, not including the parent <svg></svg> element.|


### _decorateBannyWithOutfits

Add outfits to a naked banny.

*The caller must own the naked banny being dressed and all outfits being worn.*


```solidity
function _decorateBannyWithOutfits(address hook, uint256 nakedBannyId, uint256[] memory outfitIds) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook storing the assets.|
|`nakedBannyId`|`uint256`|The ID of the Naked Banny being dressed.|
|`outfitIds`|`uint256[]`|The IDs of the outfits that'll be associated with the specified banny. Only one outfit per outfit category allowed at a time and they must be passed in order.|


### _decorateBannyWithWorld

Add a world to a Naked Banny.


```solidity
function _decorateBannyWithWorld(address hook, uint256 nakedBannyId, uint256 worldId) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook storing the assets.|
|`nakedBannyId`|`uint256`|The ID of the Naked Banny being dressed.|
|`worldId`|`uint256`|The ID of the world that'll be associated with the specified banny.|


### _transferFrom

Transfer a token from one address to another.


```solidity
function _transferFrom(address hook, address from, address to, uint256 assetId) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The 721 contract of the token being transfered.|
|`from`|`address`|The address to transfer the token from.|
|`to`|`address`|The address to transfer the token to.|
|`assetId`|`uint256`|The ID of the token to transfer.|


## Errors
### Banny721TokenUriResolver_CantAccelerateTheLock

```solidity
error Banny721TokenUriResolver_CantAccelerateTheLock();
```

### Banny721TokenUriResolver_ContentsAlreadyStored

```solidity
error Banny721TokenUriResolver_ContentsAlreadyStored();
```

### Banny721TokenUriResolver_ContentsMismatch

```solidity
error Banny721TokenUriResolver_ContentsMismatch();
```

### Banny721TokenUriResolver_HashAlreadyStored

```solidity
error Banny721TokenUriResolver_HashAlreadyStored();
```

### Banny721TokenUriResolver_HashNotFound

```solidity
error Banny721TokenUriResolver_HashNotFound();
```

### Banny721TokenUriResolver_HeadAlreadyAdded

```solidity
error Banny721TokenUriResolver_HeadAlreadyAdded();
```

### Banny721TokenUriResolver_LockedNakedBanny

```solidity
error Banny721TokenUriResolver_LockedNakedBanny();
```

### Banny721TokenUriResolver_OutfitChangesLocked

```solidity
error Banny721TokenUriResolver_OutfitChangesLocked();
```

### Banny721TokenUriResolver_SuitAlreadyAdded

```solidity
error Banny721TokenUriResolver_SuitAlreadyAdded();
```

### Banny721TokenUriResolver_UnauthorizedNakedBanny

```solidity
error Banny721TokenUriResolver_UnauthorizedNakedBanny();
```

### Banny721TokenUriResolver_UnauthorizedOutfit

```solidity
error Banny721TokenUriResolver_UnauthorizedOutfit();
```

### Banny721TokenUriResolver_UnauthorizedWorld

```solidity
error Banny721TokenUriResolver_UnauthorizedWorld();
```

### Banny721TokenUriResolver_UnorderedCategories

```solidity
error Banny721TokenUriResolver_UnorderedCategories();
```

### Banny721TokenUriResolver_UnrecognizedCategory

```solidity
error Banny721TokenUriResolver_UnrecognizedCategory();
```

### Banny721TokenUriResolver_UnrecognizedWorld

```solidity
error Banny721TokenUriResolver_UnrecognizedWorld();
```

### Banny721TokenUriResolver_UnrecognizedProduct

```solidity
error Banny721TokenUriResolver_UnrecognizedProduct();
```

### Banny721TokenUriResolver_UnauthorizedTransfer

```solidity
error Banny721TokenUriResolver_UnauthorizedTransfer();
```

