# JB721TiersHookProjectDeployer
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/JB721TiersHookProjectDeployer.sol)

**Inherits:**
ERC2771Context, JBPermissioned, [IJB721TiersHookProjectDeployer](/docs/dev/v4/api/721-hook/interfaces/IJB721TiersHookProjectDeployer.md)

Deploys a project and a 721 tiers hook for it. Can be used to queue rulesets for the project if given
`JBPermissionIds.QUEUE_RULESETS`.


## State Variables
### DIRECTORY
The directory of terminals and controllers for projects.


```solidity
IJBDirectory public immutable override DIRECTORY;
```


### HOOK_DEPLOYER
The 721 tiers hook deployer.


```solidity
IJB721TiersHookDeployer public immutable override HOOK_DEPLOYER;
```


## Functions
### constructor


```solidity
constructor(
    IJBDirectory directory,
    IJBPermissions permissions,
    IJB721TiersHookDeployer hookDeployer,
    address trustedForwarder
)
    JBPermissioned(permissions)
    ERC2771Context(trustedForwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|The directory of terminals and controllers for projects.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`hookDeployer`|`IJB721TiersHookDeployer`|The 721 tiers hook deployer.|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### launchProjectFor

Launches a new project with a 721 tiers hook attached.


```solidity
function launchProjectFor(
    address owner,
    JBDeploy721TiersHookConfig calldata deployTiersHookConfig,
    JBLaunchProjectConfig calldata launchProjectConfig,
    IJBController controller,
    bytes32 salt
)
    external
    override
    returns (uint256 projectId, IJB721TiersHook hook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address to set as the owner of the project. The ERC-721 which confers this project's ownership will be sent to this address.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|Configuration which dictates the behavior of the 721 tiers hook which is being deployed.|
|`launchProjectConfig`|`JBLaunchProjectConfig`|Configuration which dictates the behavior of the project which is being launched.|
|`controller`|`IJBController`|The controller that the project's rulesets will be queued with.|
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the newly launched project.|
|`hook`|`IJB721TiersHook`|The 721 tiers hook that was deployed for the project.|


### launchRulesetsFor

Launches rulesets for a project with an attached 721 tiers hook.

*Only a project's owner or an operator with the `QUEUE_RULESETS & SET_TERMINALS` permission can launch its
rulesets.*


```solidity
function launchRulesetsFor(
    uint256 projectId,
    JBDeploy721TiersHookConfig calldata deployTiersHookConfig,
    JBLaunchRulesetsConfig calldata launchRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    override
    returns (uint256 rulesetId, IJB721TiersHook hook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project that rulesets are being launched for.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|Configuration which dictates the behavior of the 721 tiers hook which is being deployed.|
|`launchRulesetsConfig`|`JBLaunchRulesetsConfig`|Configuration which dictates the project's new rulesets.|
|`controller`|`IJBController`|The controller that the project's rulesets will be queued with.|
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rulesetId`|`uint256`|The ID of the successfully created ruleset.|
|`hook`|`IJB721TiersHook`|The 721 tiers hook that was deployed for the project.|


### queueRulesetsOf

Queues rulesets for a project with an attached 721 tiers hook.

*Only a project's owner or an operator with the `QUEUE_RULESETS` permission can queue its rulesets.*


```solidity
function queueRulesetsOf(
    uint256 projectId,
    JBDeploy721TiersHookConfig calldata deployTiersHookConfig,
    JBQueueRulesetsConfig calldata queueRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    override
    returns (uint256 rulesetId, IJB721TiersHook hook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project that rulesets are being queued for.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|Configuration which dictates the behavior of the 721 tiers hook which is being deployed.|
|`queueRulesetsConfig`|`JBQueueRulesetsConfig`|Configuration which dictates the project's newly queued rulesets.|
|`controller`|`IJBController`|The controller that the project's rulesets will be queued with.|
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rulesetId`|`uint256`|The ID of the successfully created ruleset.|
|`hook`|`IJB721TiersHook`|The 721 tiers hook that was deployed for the project.|


### _launchProjectFor

Launches a project.


```solidity
function _launchProjectFor(
    address owner,
    JBLaunchProjectConfig memory launchProjectConfig,
    IJB721TiersHook dataHook,
    IJBController controller
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that will own the project.|
|`launchProjectConfig`|`JBLaunchProjectConfig`|Configuration which dictates the behavior of the project which is being launched.|
|`dataHook`|`IJB721TiersHook`|The data hook to use for the project.|
|`controller`|`IJBController`|The controller that the project's rulesets will be queued with.|


### _launchRulesetsFor

Launches rulesets for a project.


```solidity
function _launchRulesetsFor(
    uint256 projectId,
    JBLaunchRulesetsConfig memory launchRulesetsConfig,
    IJB721TiersHook dataHook,
    IJBController controller
)
    internal
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to launch rulesets for.|
|`launchRulesetsConfig`|`JBLaunchRulesetsConfig`|Configuration which dictates the behavior of the project's rulesets.|
|`dataHook`|`IJB721TiersHook`|The data hook to use for the project.|
|`controller`|`IJBController`|The controller that the project's rulesets will be queued with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|rulesetId The ID of the successfully created ruleset.|


### _queueRulesetsOf

Queues rulesets for a project.


```solidity
function _queueRulesetsOf(
    uint256 projectId,
    JBQueueRulesetsConfig memory queueRulesetsConfig,
    IJB721TiersHook dataHook,
    IJBController controller
)
    internal
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to queue rulesets for.|
|`queueRulesetsConfig`|`JBQueueRulesetsConfig`|Configuration which dictates the behavior of the project's rulesets.|
|`dataHook`|`IJB721TiersHook`|The data hook to use for the project.|
|`controller`|`IJBController`|The controller that the project's rulesets will be queued with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the successfully created ruleset.|


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

