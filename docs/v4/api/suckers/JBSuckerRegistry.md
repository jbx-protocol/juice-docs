# JBSuckerRegistry
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/JBSuckerRegistry.sol)

**Inherits:**
ERC2771Context, Ownable, JBPermissioned, [IJBSuckerRegistry](/docs/v4/api/suckers/interfaces/IJBSuckerRegistry.md)


## State Variables
### _SUCKER_EXISTS
A constant indicating that this sucker exists and belongs to a specific project.


```solidity
uint256 internal constant _SUCKER_EXISTS = 1;
```


### DIRECTORY
The juicebox directory.


```solidity
IJBDirectory public immutable override DIRECTORY;
```


### PROJECTS
A contract which mints ERC-721s that represent project ownership and transfers.


```solidity
IJBProjects public immutable override PROJECTS;
```


### suckerDeployerIsAllowed
Tracks whether the specified sucker deployer is approved by this registry.

**Note:**
member: deployer The address of the deployer to check.


```solidity
mapping(address deployer => bool) public override suckerDeployerIsAllowed;
```


### _suckersOf
Tracks the suckers for the specified project.


```solidity
mapping(uint256 => EnumerableMap.AddressToUintMap) internal _suckersOf;
```


## Functions
### constructor


```solidity
constructor(
    IJBDirectory directory,
    IJBPermissions permissions,
    address initialOwner,
    address trusted_forwarder
)
    ERC2771Context(trusted_forwarder)
    JBPermissioned(permissions)
    Ownable(initialOwner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|The juicebox directory.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`initialOwner`|`address`|The initial owner of this contract.|
|`trusted_forwarder`|`address`||


### isSuckerOf

Returns true if the specified sucker belongs to the specified project, and was deployed through this
registry.


```solidity
function isSuckerOf(uint256 projectId, address addr) external view override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to check for.|
|`addr`|`address`|The address of the sucker to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|flag A flag indicating if the sucker belongs to the project, and was deployed through this registry.|


### getSuckerPairsOf

Helper function for retrieving the projects suckers and their metadata.


```solidity
function getSuckerPairsOf(uint256 projectId) external view override returns (JBSuckersPair[] memory pairs);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to get the suckers of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`pairs`|`JBSuckersPair[]`|The pairs of suckers and their metadata.|


### suckersOf

Gets all of the specified project's suckers which were deployed through this registry.


```solidity
function suckersOf(uint256 projectId) external view override returns (address[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to get the suckers of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|suckers The addresses of the suckers.|


### _msgData

The calldata. Preferred to use over `msg.data`.


```solidity
function _msgData() internal view override(ERC2771Context, Context) returns (bytes calldata);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|calldata The `msg.data` of this call.|


### _msgSender

The message's sender. Preferred to use over `msg.sender`.


```solidity
function _msgSender() internal view override(ERC2771Context, Context) returns (address sender);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address which sent this call.|


### _contextSuffixLength

*ERC-2771 specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view virtual override(ERC2771Context, Context) returns (uint256);
```

### allowSuckerDeployer

Adds a suckers deployer to the allowlist.

*Can only be called by this contract's owner (initially project ID 1, or JuiceboxDAO).*


```solidity
function allowSuckerDeployer(address deployer) public override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`address`|The address of the deployer to add.|


### allowSuckerDeployers

Adds multiple suckers deployer to the allowlist.

*Can only be called by this contract's owner (initially project ID 1, or JuiceboxDAO).*


```solidity
function allowSuckerDeployers(address[] calldata deployers) public override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployers`|`address[]`|The address of the deployer to add.|


### deploySuckersFor

Deploy one or more suckers for the specified project.

*The caller must be the project's owner or have `JBPermissionIds.DEPLOY_SUCKERS` from the project's owner.*


```solidity
function deploySuckersFor(
    uint256 projectId,
    bytes32 salt,
    JBSuckerDeployerConfig[] calldata configurations
)
    public
    override
    returns (address[] memory suckers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to deploy suckers for.|
|`salt`|`bytes32`|The salt used to deploy the contract. For the suckers to be peers, this must be the same value on each chain where suckers are deployed.|
|`configurations`|`JBSuckerDeployerConfig[]`|The sucker deployer configs to use to deploy the suckers.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`suckers`|`address[]`|The addresses of the deployed suckers.|


### removeDeprecatedSucker

Lets anyone remove a deprecated sucker from a project.


```solidity
function removeDeprecatedSucker(uint256 projectId, address sucker) public override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to remove the sucker from.|
|`sucker`|`address`|The address of the deprecated sucker to remove.|


### removeSuckerDeployer

Removes a sucker deployer from the allowlist.

*Can only be called by this contract's owner (initially project ID 1, or JuiceboxDAO).*


```solidity
function removeSuckerDeployer(address deployer) public override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`address`|The address of the deployer to remove.|


## Errors
### JBSuckerRegistry_InvalidDeployer

```solidity
error JBSuckerRegistry_InvalidDeployer(IJBSuckerDeployer deployer);
```

### JBSuckerRegistry_RulesetDoesNotAllowAddingSucker

```solidity
error JBSuckerRegistry_RulesetDoesNotAllowAddingSucker(uint256 projectId);
```

### JBSuckerRegistry_SuckerDoesNotBelongToProject

```solidity
error JBSuckerRegistry_SuckerDoesNotBelongToProject(uint256 projectId, address sucker);
```

### JBSuckerRegistry_SuckerIsNotDeprecated

```solidity
error JBSuckerRegistry_SuckerIsNotDeprecated(address sucker, JBSuckerState suckerState);
```

