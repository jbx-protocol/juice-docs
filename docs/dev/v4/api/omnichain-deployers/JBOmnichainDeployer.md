# JBOmnichainDeployer
[Git Source](https://github.com/Bananapus/nana-deployers/blob/dc045309f0ca1acdbd53439eb118f40013d3f5b4/src/JBOmnichainDeployer.sol)

**Inherits:**
ERC2771Context, JBPermissioned, [IJBOmnichainDeployer](/docs/dev/v4/api/omnichain-deployers/interfaces/IJBOmnichainDeployer.md), IJBRulesetDataHook, IERC721Receiver

Deploys, manages, and operates Juicebox projects with suckers.


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


### HOOK_DEPLOYER
Deploys tiered ERC-721 hooks for projects.


```solidity
IJB721TiersHookDeployer public immutable HOOK_DEPLOYER;
```


### SUCKER_REGISTRY
Deploys and tracks suckers for projects.


```solidity
IJBSuckerRegistry public immutable SUCKER_REGISTRY;
```


### dataHookOf
Each project's data hook provided on deployment.


```solidity
mapping(uint256 projectId => mapping(uint256 rulesetId => JBDeployerHookConfig)) public override dataHookOf;
```


## Functions
### constructor


```solidity
constructor(
    IJBController controller,
    IJBSuckerRegistry suckerRegistry,
    IJB721TiersHookDeployer hookDeployer,
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
|`hookDeployer`|`IJB721TiersHookDeployer`|The deployer to use for project's tiered ERC-721 hooks.|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### beforePayRecordedWith

Forward the call to the original data hook.

*This function is part of `IJBRulesetDataHook`, and gets called before the revnet processes a payment.*


```solidity
function beforePayRecordedWith(JBBeforePayRecordedContext calldata context)
    external
    view
    override
    returns (uint256 weight, JBPayHookSpecification[] memory hookSpecifications);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforePayRecordedContext`|Standard Juicebox payment context. See `JBBeforePayRecordedContext`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The weight which project tokens are minted relative to. This can be used to customize how many tokens get minted by a payment.|
|`hookSpecifications`|`JBPayHookSpecification[]`|Amounts (out of what's being paid in) to be sent to pay hooks instead of being paid into the project. Useful for automatically routing funds from a treasury as payments come in.|


### beforeCashOutRecordedWith

Allow cash outs from suckers without a tax.

*This function is part of `IJBRulesetDataHook`, and gets called before the revnet processes a cash out.*


```solidity
function beforeCashOutRecordedWith(JBBeforeCashOutRecordedContext calldata context)
    external
    view
    override
    returns (
        uint256 cashOutTaxRate,
        uint256 cashOutCount,
        uint256 totalSupply,
        JBCashOutHookSpecification[] memory hookSpecifications
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforeCashOutRecordedContext`|Standard Juicebox cash out context. See `JBBeforeCashOutRecordedContext`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`cashOutTaxRate`|`uint256`|The cash out tax rate, which influences the amount of terminal tokens which get cashed out.|
|`cashOutCount`|`uint256`|The number of project tokens that are cashed out.|
|`totalSupply`|`uint256`|The total project token supply.|
|`hookSpecifications`|`JBCashOutHookSpecification[]`|The amount of funds and the data to send to cash out hooks (this contract).|


### hasMintPermissionFor

A flag indicating whether an address has permission to mint a project's tokens on-demand.

*A project's data hook can allow any address to mint its tokens.*


```solidity
function hasMintPermissionFor(uint256 projectId, address addr) external view returns (bool flag);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project whose token can be minted.|
|`addr`|`address`|The address to check the token minting permission of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`flag`|`bool`|A flag indicating whether the address has permission to mint the project's tokens on-demand.|


### supportsInterface

Indicates if this contract adheres to the specified interface.

*See `IERC165.supportsInterface`.*


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A flag indicating if the provided interface ID is supported.|


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
    JBRulesetConfig[] memory rulesetConfigurations,
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


### launchRulesetsFor

Launches new rulesets for a project, using this contract as the data hook.


```solidity
function launchRulesetsFor(
    uint256 projectId,
    JBRulesetConfig[] calldata rulesetConfigurations,
    JBTerminalConfig[] calldata terminalConfigurations,
    string calldata memo
)
    external
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to launch the rulesets for.|
|`rulesetConfigurations`|`JBRulesetConfig[]`|The rulesets to launch.|
|`terminalConfigurations`|`JBTerminalConfig[]`|The terminals to set up for the project.|
|`memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|rulesetId The ID of the newly launched rulesets.|


### launch721RulesetsFor

Launches new rulesets for a project with a 721 tiers hook attached, using this contract as the data
hook.


```solidity
function launch721RulesetsFor(
    uint256 projectId,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    JBLaunchRulesetsConfig calldata launchRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    returns (uint256 rulesetId, IJB721TiersHook hook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to launch the rulesets for.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|Configuration which dictates the behavior of the 721 tiers hook which is being deployed.|
|`launchRulesetsConfig`|`JBLaunchRulesetsConfig`|Configuration which dictates the behavior of the rulesets which are being launched.|
|`controller`|`IJBController`||
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rulesetId`|`uint256`|The ID of the newly launched rulesets.|
|`hook`|`IJB721TiersHook`|The 721 tiers hook that was deployed for the project.|


### queueRulesetsOf

Queues new rulesets for a project, using this contract as the data hook.


```solidity
function queueRulesetsOf(
    uint256 projectId,
    JBRulesetConfig[] calldata rulesetConfigurations,
    string calldata memo
)
    external
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to queue the rulesets for.|
|`rulesetConfigurations`|`JBRulesetConfig[]`|The rulesets to queue.|
|`memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|rulesetId The ID of the newly queued rulesets.|


### queue721RulesetsOf

Queues new rulesets for a project with a 721 tiers hook attached, using this contract as the data hook.


```solidity
function queue721RulesetsOf(
    uint256 projectId,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    JBQueueRulesetsConfig calldata queueRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    returns (uint256 rulesetId, IJB721TiersHook hook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to queue the rulesets for.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|Configuration which dictates the behavior of the 721 tiers hook which is being deployed.|
|`queueRulesetsConfig`|`JBQueueRulesetsConfig`|Configuration which dictates the behavior of the rulesets which are being queued.|
|`controller`|`IJBController`||
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rulesetId`|`uint256`|The ID of the newly queued rulesets.|
|`hook`|`IJB721TiersHook`|The 721 tiers hook that was deployed for the project.|


### onERC721Received

*Make sure this contract can only receive project NFTs from `JBProjects`.*


```solidity
function onERC721Received(address, address, uint256, bytes calldata) external view returns (bytes4);
```

### _setup

Sets up a project's rulesets.


```solidity
function _setup(
    uint256 projectId,
    JBRulesetConfig[] memory rulesetConfigurations
)
    internal
    returns (JBRulesetConfig[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set up.|
|`rulesetConfigurations`|`JBRulesetConfig[]`|The rulesets to set up.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JBRulesetConfig[]`|rulesetConfigurations The rulesets that were set up.|


### _from721Config

Converts a 721 ruleset configuration to a regular ruleset configuration.


```solidity
function _from721Config(
    JBPayDataHookRulesetConfig[] calldata launchProjectConfig,
    IJB721TiersHook dataHook
)
    internal
    pure
    returns (JBRulesetConfig[] memory rulesetConfigurations);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`launchProjectConfig`|`JBPayDataHookRulesetConfig[]`|The 721 ruleset configuration to convert.|
|`dataHook`|`IJB721TiersHook`|The data hook to use for the ruleset.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rulesetConfigurations`|`JBRulesetConfig[]`|The converted ruleset configuration.|


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

