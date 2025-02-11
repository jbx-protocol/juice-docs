# JBOmnichainDeployer
[Git Source](https://github.com/Bananapus/nana-deployers/blob/51cdc7805c1eb529cb5607259609b5ae967e94be/src/JBOmnichainDeployer.sol)

**Inherits:**
ERC2771Context, JBPermissioned

`JBOmnichainDeployer` deploys, manages, and operates Juicebox projects with suckers.


## State Variables
### CONTROLLER
The controller used to create and manage Juicebox projects.


```solidity
IJBController public immutable CONTROLLER;
```


### PROJECTS
Mints ERC-721s that represent Juicebox project ownership and transfers.


```solidity
IJBProjects public immutable PROJECTS;
```


### HOOK_PROJECT_DEPLOYER
Deploys tiered ERC-721 hooks for projects.


```solidity
IJB721TiersHookProjectDeployer public immutable HOOK_PROJECT_DEPLOYER;
```


### SUCKER_REGISTRY
Deploys and tracks suckers for projects.


```solidity
IJBSuckerRegistry public immutable SUCKER_REGISTRY;
```


## Functions
### constructor


```solidity
constructor(
    IJBController controller,
    IJBSuckerRegistry suckerRegistry,
    IJB721TiersHookProjectDeployer hookProjectDeployer,
    address trustedForwarder
)
    JBPermissioned(IJBPermissioned(address(controller)).PERMISSIONS())
    ERC2771Context(trustedForwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`IJBController`|The controller to use for launching and operating the Juicebox projects.|
|`suckerRegistry`|`IJBSuckerRegistry`|The registry to use for deploying and tracking each project's suckers.|
|`hookProjectDeployer`|`IJB721TiersHookProjectDeployer`|The deployer to use for project's tiered ERC-721 hooks.|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### deploySuckersFor

Deploy new suckers for an existing project.

*Only the juicebox's owner can deploy new suckers.*


```solidity
function deploySuckersFor(
    uint256 projectId,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration
)
    external
    returns (address[] memory suckers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to deploy suckers for.|
|`suckerDeploymentConfiguration`|`REVSuckerDeploymentConfig`|The suckers to set up for the project.|


### launchProjectFor

Creates a project with suckers.

*This will mint the project's ERC-721 to the `owner`'s address, queue the specified rulesets, and set up the
specified splits and terminals. Each operation within this transaction can be done in sequence separately.*

*Anyone can deploy a project to any `owner`'s address.*


```solidity
function launchProjectFor(
    address owner,
    string calldata projectUri,
    JBRulesetConfig[] calldata rulesetConfigurations,
    JBTerminalConfig[] calldata terminalConfigurations,
    string calldata memo,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration
)
    external
    returns (uint256 projectId, address[] memory suckers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The project's owner. The project ERC-721 will be minted to this address.|
|`projectUri`|`string`|The project's metadata URI. This is typically an IPFS hash, optionally with the `ipfs://` prefix. This can be updated by the project's owner.|
|`rulesetConfigurations`|`JBRulesetConfig[]`|The rulesets to queue.|
|`terminalConfigurations`|`JBTerminalConfig[]`|The terminals to set up for the project.|
|`memo`|`string`|A memo to pass along to the emitted event.|
|`suckerDeploymentConfiguration`|`REVSuckerDeploymentConfig`|The suckers to set up for the project. Suckers facilitate cross-chain token transfers between peer projects on different networks.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The project's ID.|
|`suckers`|`address[]`||


### launch721ProjectFor

Launches a new project with a 721 tiers hook attached, and with suckers.


```solidity
function launch721ProjectFor(
    address owner,
    JBDeploy721TiersHookConfig calldata deployTiersHookConfig,
    JBLaunchProjectConfig calldata launchProjectConfig,
    bytes32 salt,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration
)
    external
    returns (uint256 projectId, IJB721TiersHook hook, address[] memory suckers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address to set as the owner of the project. The ERC-721 which confers this project's ownership will be sent to this address.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|Configuration which dictates the behavior of the 721 tiers hook which is being deployed.|
|`launchProjectConfig`|`JBLaunchProjectConfig`|Configuration which dictates the behavior of the project which is being launched.|
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|
|`suckerDeploymentConfiguration`|`REVSuckerDeploymentConfig`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the newly launched project.|
|`hook`|`IJB721TiersHook`|The 721 tiers hook that was deployed for the project.|
|`suckers`|`address[]`||


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

