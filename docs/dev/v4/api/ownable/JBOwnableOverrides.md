# JBOwnableOverrides
[Git Source](https://github.com/Bananapus/nana-ownable/blob/a74b3181e75adaf0ee0c93cb00bcc5709ca8f314/src/JBOwnableOverrides.sol)

**Inherits:**
Context, JBPermissioned, [IJBOwnable](/docs/dev/v4/api/ownable/interfaces/IJBOwnable.md)

An abstract base for `JBOwnable`, which restricts functions so they can only be called by a Juicebox
project's owner or a specific owner address. The owner can give access permission to other addresses with
`JBPermissions`.


## State Variables
### PROJECTS
Mints ERC-721s that represent project ownership and transfers.


```solidity
IJBProjects public immutable override PROJECTS;
```


### jbOwner
This contract's owner information.


```solidity
JBOwner public override jbOwner;
```


## Functions
### constructor

*To restrict access to a Juicebox project's owner, pass that project's ID as the `initialProjectIdOwner` and
the zero address as the `initialOwner`.
To restrict access to a specific address, pass that address as the `initialOwner` and `0` as the
`initialProjectIdOwner`.*

*The owner can give owner access to other addresses through the `permissions` contract.*


```solidity
constructor(
    IJBPermissions permissions,
    IJBProjects projects,
    address initialOwner,
    uint88 initialProjectIdOwner
)
    JBPermissioned(permissions);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`projects`|`IJBProjects`|Mints ERC-721s that represent project ownership and transfers.|
|`initialOwner`|`address`|The owner if the `intialProjectIdOwner` is 0 (until ownership is transferred).|
|`initialProjectIdOwner`|`uint88`|The ID of the Juicebox project whose owner is this contract's owner (until ownership is transferred).|


### owner

Returns the owner's address based on this contract's `JBOwner`.


```solidity
function owner() public view virtual returns (address);
```

### _checkOwner

Reverts if the sender is not the owner.


```solidity
function _checkOwner() internal view virtual;
```

### renounceOwnership

Gives up ownership of this contract, making it impossible to call `onlyOwner` and `_checkOwner`
functions.

This can only be called by the current owner.


```solidity
function renounceOwnership() public virtual override;
```

### setPermissionId

Sets the permission ID the owner can use to give other addresses owner access.

This can only be called by the current owner.


```solidity
function setPermissionId(uint8 permissionId) public virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissionId`|`uint8`|The permission ID to use for `onlyOwner`.|


### transferOwnership

Transfers ownership of this contract to a new address (the `newOwner`). Can only be called by the
current owner.

This can only be called by the current owner.


```solidity
function transferOwnership(address newOwner) public virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newOwner`|`address`|The address to transfer ownership to.|


### transferOwnershipToProject

Transfer ownership of this contract to a new Juicebox project.

This can only be called by the current owner.

*The `projectId` must fit within a `uint88`.*


```solidity
function transferOwnershipToProject(uint256 projectId) public virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to transfer ownership to.|


### _emitTransferEvent

Either `newOwner` or `newProjectId` is non-zero or both are zero. But they can never both be non-zero.

*This function exists because some contracts will try to deploy contracts for a project before*


```solidity
function _emitTransferEvent(address previousOwner, address newOwner, uint88 newProjectId) internal virtual;
```

### _setPermissionId

Sets the permission ID the owner can use to give other addresses owner access.

*Internal function without access restriction.*


```solidity
function _setPermissionId(uint8 permissionId) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissionId`|`uint8`|The permission ID to use for `onlyOwner`.|


### _transferOwnership

Helper to allow for drop-in replacement of OpenZeppelin `Ownable`.


```solidity
function _transferOwnership(address newOwner) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newOwner`|`address`|The address that should receive ownership of this contract.|


### _transferOwnership

Transfers this contract's ownership to an address (`newOwner`) OR a Juicebox project (`projectId`).

*Updates this contract's `JBOwner` owner information and resets the `JBOwner.permissionId`.*

*If both `newOwner` and `projectId` are set, this will revert.*

*Internal function without access restriction.*


```solidity
function _transferOwnership(address newOwner, uint88 projectId) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newOwner`|`address`|The address that should become this contract's owner.|
|`projectId`|`uint88`|The ID of the project whose owner should become this contract's owner.|


## Errors
### JBOwnableOverrides_InvalidNewOwner

```solidity
error JBOwnableOverrides_InvalidNewOwner();
```

