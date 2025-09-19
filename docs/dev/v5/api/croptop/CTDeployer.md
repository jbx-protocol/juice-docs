# CTDeployer
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/CTDeployer.sol)

**Inherits:**
ERC2771Context, IERC721Receiver, [ICTDeployer](/docs/dev/v5/api/croptop/interfaces/ICTDeployer.md)

A contract that facilitates deploying a simple Juicebox project to receive posts from Croptop templates.


## State Variables
### CONTROLLER
The controller that projects are made from.


```solidity
IJBController public immutable override CONTROLLER;
```


### DEPLOYER
The deployer to launch Croptop recorded collections from.


```solidity
IJB721TiersHookProjectDeployer public immutable override DEPLOYER;
```


### PUBLISHER
The Croptop publisher.


```solidity
ICTPublisher public immutable override PUBLISHER;
```


## Functions
### constructor


```solidity
constructor(
    IJBController controller,
    IJB721TiersHookProjectDeployer deployer,
    ICTPublisher publisher,
    address trusted_forwarder
)
    ERC2771Context(trusted_forwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`IJBController`|The controller that projects are made from.|
|`deployer`|`IJB721TiersHookProjectDeployer`|The deployer to launch Croptop projects from.|
|`publisher`|`ICTPublisher`|The croptop publisher.|
|`trusted_forwarder`|`address`||


### onERC721Received

*Make sure only mints can be received.*


```solidity
function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
)
    external
    view
    returns (bytes4);
```

### deployProjectFor

Deploy a simple project meant to receive posts from Croptop templates.


```solidity
function deployProjectFor(
    address owner,
    JBTerminalConfig[] memory terminalConfigurations,
    string memory projectUri,
    CTDeployerAllowedPost[] memory allowedPosts,
    string memory contractUri,
    string memory name,
    string memory symbol,
    bytes32 salt
)
    external
    returns (uint256 projectId, IJB721TiersHook hook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that'll own the project.|
|`terminalConfigurations`|`JBTerminalConfig[]`|The terminals that the network uses to accept payments through.|
|`projectUri`|`string`|The metadata URI containing project info.|
|`allowedPosts`|`CTDeployerAllowedPost[]`|The type of posts that the project should allow.|
|`contractUri`|`string`|A link to the collection's metadata.|
|`name`|`string`|The name of the collection where posts will go.|
|`symbol`|`string`|The symbol of the collection where posts will go.|
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the newly created project.|
|`hook`|`IJB721TiersHook`|The hook that was created.|


### _configurePostingCriteriaFor

Configure croptop posting.


```solidity
function _configurePostingCriteriaFor(address hook, CTDeployerAllowedPost[] memory allowedPosts) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`address`|The hook that will be posted to.|
|`allowedPosts`|`CTDeployerAllowedPost[]`|The type of posts that should be allowed.|


