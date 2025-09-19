# CTPublisher
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/CTPublisher.sol)

**Inherits:**
JBPermissioned, ERC2771Context, [ICTPublisher](/docs/dev/v5/api/croptop/interfaces/ICTPublisher.md)

A contract that facilitates the permissioned publishing of NFT posts to a Juicebox project.


## State Variables
### FEE_DIVISOR
The divisor that describes the fee that should be taken.

*This is equal to 100 divided by the fee percent.*


```solidity
uint256 public constant override FEE_DIVISOR = 20;
```


### CONTROLLER
The controller that directs the projects being posted to.


```solidity
IJBController public immutable override CONTROLLER;
```


### FEE_PROJECT_ID
The ID of the project to which fees will be routed.


```solidity
uint256 public immutable override FEE_PROJECT_ID;
```


### tierIdForEncodedIPFSUriOf
The ID of the tier that an IPFS metadata has been saved to.


```solidity
mapping(address hook => mapping(bytes32 encodedIPFSUri => uint256)) public override tierIdForEncodedIPFSUriOf;
```


### _allowedAddresses
Stores addresses that are allowed to post onto a hook category.


```solidity
mapping(address hook => mapping(uint256 category => address[])) internal _allowedAddresses;
```


### _packedAllowanceFor
Packed values that determine the allowance of posts.


```solidity
mapping(address hook => mapping(uint256 category => uint256)) internal _packedAllowanceFor;
```


## Functions
### constructor


```solidity
constructor(
    IJBController controller,
    IJBPermissions permissions,
    uint256 feeProjectId,
    address trustedForwarder
)
    JBPermissioned(permissions)
    ERC2771Context(trustedForwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`IJBController`|The controller that directs the projects being posted to.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`feeProjectId`|`uint256`|The ID of the project to which fees will be routed.|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### tiersFor

Get the tiers for the provided encoded IPFS URIs.


```solidity
function tiersFor(
    address hook,
    bytes32[] memory encodedIPFSUris
)
    external
    view
    override
    returns (JB721Tier[] memory tiers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook from which to get tiers.|
|`encodedIPFSUris`|`bytes32[]`|The URIs to get tiers of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tiers`|`JB721Tier[]`|The tiers that correspond to the provided encoded IPFS URIs. If there's no tier yet, an empty tier is returned.|


### allowanceFor

Post allowances for a particular category on a particular hook.


```solidity
function allowanceFor(
    address hook,
    uint256 category
)
    public
    view
    override
    returns (
        uint256 minimumPrice,
        uint256 minimumTotalSupply,
        uint256 maximumTotalSupply,
        address[] memory allowedAddresses
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook contract for which this allowance applies.|
|`category`|`uint256`|The category for which this allowance applies.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minimumPrice`|`uint256`|The minimum price that a poster must pay to record a new NFT.|
|`minimumTotalSupply`|`uint256`|The minimum total number of available tokens that a minter must set to record a new NFT.|
|`maximumTotalSupply`|`uint256`|The max total supply of NFTs that can be made available when minting. Leave as 0 for max.|
|`allowedAddresses`|`address[]`|The addresses allowed to post. Returns empty if all addresses are allowed.|


### _contextSuffixLength

*ERC-2771 specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view virtual override(ERC2771Context, Context) returns (uint256);
```

### _isAllowed

Check if an address is included in an allow list.


```solidity
function _isAllowed(address addrs, address[] memory addresses) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addrs`|`address`|The candidate address.|
|`addresses`|`address[]`|An array of allowed addresses.|


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


### configurePostingCriteriaFor

Collection owners can set the allowed criteria for publishing a new NFT to their project.


```solidity
function configurePostingCriteriaFor(CTAllowedPost[] memory allowedPosts) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`allowedPosts`|`CTAllowedPost[]`|An array of criteria for allowed posts.|


### mintFrom

Publish an NFT to become mintable, and mint a first copy.

*A fee is taken into the appropriate treasury.*


```solidity
function mintFrom(
    IJB721TiersHook hook,
    CTPost[] calldata posts,
    address nftBeneficiary,
    address feeBeneficiary,
    bytes calldata additionalPayMetadata,
    bytes calldata feeMetadata
)
    external
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`IJB721TiersHook`|The hook to mint from.|
|`posts`|`CTPost[]`|An array of posts that should be published as NFTs to the specified project.|
|`nftBeneficiary`|`address`|The beneficiary of the NFT mints.|
|`feeBeneficiary`|`address`|The beneficiary of the fee project's token.|
|`additionalPayMetadata`|`bytes`|Metadata bytes that should be included in the pay function's metadata. This prepends the payload needed for NFT creation.|
|`feeMetadata`|`bytes`|The metadata to send alongside the fee payment.|


### _setupPosts

Setup the posts.


```solidity
function _setupPosts(
    IJB721TiersHook hook,
    CTPost[] memory posts
)
    internal
    returns (JB721TierConfig[] memory tiersToAdd, uint256[] memory tierIdsToMint, uint256 totalPrice);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`IJB721TiersHook`|The NFT hook on which the posts will apply.|
|`posts`|`CTPost[]`|An array of posts that should be published as NFTs to the specified project.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tiersToAdd`|`JB721TierConfig[]`|The tiers that will be created to represent the posts.|
|`tierIdsToMint`|`uint256[]`|The tier IDs of the posts that should be minted once published.|
|`totalPrice`|`uint256`|The total price being paid.|


## Errors
### CTPublisher_EmptyEncodedIPFSUri

```solidity
error CTPublisher_EmptyEncodedIPFSUri();
```

### CTPublisher_InsufficientEthSent

```solidity
error CTPublisher_InsufficientEthSent(uint256 expected, uint256 sent);
```

### CTPublisher_MaxTotalSupplyLessThanMin

```solidity
error CTPublisher_MaxTotalSupplyLessThanMin(uint256 min, uint256 max);
```

### CTPublisher_NotInAllowList

```solidity
error CTPublisher_NotInAllowList(address addr, address[] allowedAddresses);
```

### CTPublisher_PriceTooSmall

```solidity
error CTPublisher_PriceTooSmall(uint256 price, uint256 minimumPrice);
```

### CTPublisher_TotalSupplyTooBig

```solidity
error CTPublisher_TotalSupplyTooBig(uint256 totalSupply, uint256 maximumTotalSupply);
```

### CTPublisher_TotalSupplyTooSmall

```solidity
error CTPublisher_TotalSupplyTooSmall(uint256 totalSupply, uint256 minimumTotalSupply);
```

### CTPublisher_UnauthorizedToPostInCategory

```solidity
error CTPublisher_UnauthorizedToPostInCategory();
```

### CTPublisher_ZeroTotalSupply

```solidity
error CTPublisher_ZeroTotalSupply();
```

