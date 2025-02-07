# CTProjectOwner
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/CTProjectOwner.sol)

**Inherits:**
IERC721Receiver, [ICTProjectOwner](/docs/v4/api/croptop/interfaces/ICTProjectOwner.sol/interface.ICTProjectOwner.md)

A contract that can be sent a project to be burned, while still allowing croptop posts.


## State Variables
### PERMISSIONS
The contract where operator permissions are stored.


```solidity
IJBPermissions public immutable override PERMISSIONS;
```


### PROJECTS
The contract from which project are minted.


```solidity
IJBProjects public immutable override PROJECTS;
```


### PUBLISHER
The Croptop publisher.


```solidity
ICTPublisher public immutable override PUBLISHER;
```


## Functions
### constructor


```solidity
constructor(IJBPermissions permissions, IJBProjects projects, ICTPublisher publisher);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`IJBPermissions`|The contract where operator permissions are stored.|
|`projects`|`IJBProjects`|The contract from which project are minted.|
|`publisher`|`ICTPublisher`|The Croptop publisher.|


### onERC721Received

Give the croptop publisher permission to post to the project on this contract's behalf.

*Make sure to first configure certain posts before sending this contract ownership.*


```solidity
function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
)
    external
    override
    returns (bytes4);
```

