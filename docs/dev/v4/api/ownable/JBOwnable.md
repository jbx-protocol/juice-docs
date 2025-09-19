# JBOwnable
[Git Source](https://github.com/Bananapus/nana-ownable/blob/a74b3181e75adaf0ee0c93cb00bcc5709ca8f314/src/JBOwnable.sol)

**Inherits:**
[JBOwnableOverrides](/docs/dev/v4/api/ownable/JBOwnableOverrides.md)

A function restricted by `JBOwnable` can only be called by a Juicebox project's owner, a specified owner
address (if set), or addresses with permission from the owner.

*A function with the `onlyOwner` modifier from `JBOwnable` can only be called by addresses with owner access
based on a `JBOwner` struct:
1. If `JBOwner.projectId` isn't zero, the address holding the `JBProjects` NFT with the `JBOwner.projectId` ID is
the owner.
2. If `JBOwner.projectId` is set to `0`, the `JBOwner.owner` address is the owner.
3. The owner can give other addresses access with `JBPermissions.setPermissionsFor(...)`, using the
`JBOwner.permissionId` permission.*

*To use `onlyOwner`, inherit this contract and apply the modifier to a function.*


## Functions
### constructor

*To make a Juicebox project's owner this contract's owner, pass that project's ID as the
`initialProjectIdOwner`.*

*To make a specific address the owner, pass that address as the `initialOwner` and `0` as the
`initialProjectIdOwner`.*

*The owner can give other addresses owner access through the `permissions` contract.*


```solidity
constructor(
    IJBPermissions permissions,
    IJBProjects projects,
    address initialOwner,
    uint88 initialProjectIdOwner
)
    JBOwnableOverrides(permissions, projects, initialOwner, initialProjectIdOwner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`projects`|`IJBProjects`|Mints ERC-721s that represent project ownership and transfers.|
|`initialOwner`|`address`|An address with owner access (until ownership is transferred).|
|`initialProjectIdOwner`|`uint88`|The ID of the Juicebox project whose owner has owner access (until ownership is transferred).|


### onlyOwner

Reverts if called by an address without owner access.


```solidity
modifier onlyOwner() virtual;
```

### _emitTransferEvent

Either `newOwner` or `newProjectId` is non-zero or both are zero. But they can never both be non-zero.

*This function exists because some contracts will try to deploy contracts for a project before*


```solidity
function _emitTransferEvent(address previousOwner, address newOwner, uint88 newProjectId) internal virtual override;
```

