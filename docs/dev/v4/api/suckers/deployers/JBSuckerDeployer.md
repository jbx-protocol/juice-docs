# JBSuckerDeployer
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/deployers/JBSuckerDeployer.sol)

**Inherits:**
ERC2771Context, JBPermissioned, [IJBSuckerDeployer](/docs/dev/v4/api/suckers/interfaces/IJBSuckerDeployer.md)

A base implementation for deploying suckers.


## State Variables
### DIRECTORY
The directory of terminals and controllers for projects.


```solidity
IJBDirectory public immutable override DIRECTORY;
```


### LAYER_SPECIFIC_CONFIGURATOR
Only this address can configure this deployer, can only be used once.


```solidity
address public immutable override LAYER_SPECIFIC_CONFIGURATOR;
```


### TOKENS
The contract that manages token minting and burning.


```solidity
IJBTokens public immutable override TOKENS;
```


### isSucker
A mapping of suckers deployed by this contract.


```solidity
mapping(address => bool) public override isSucker;
```


### singleton
The singleton used to clone suckers.


```solidity
JBSucker public singleton;
```


## Functions
### constructor


```solidity
constructor(
    IJBDirectory directory,
    IJBPermissions permissions,
    IJBTokens tokens,
    address configurator,
    address trusted_forwarder
)
    ERC2771Context(trusted_forwarder)
    JBPermissioned(permissions);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|The directory of terminals and controllers for projects.|
|`permissions`|`IJBPermissions`|The permissions contract for the deployer.|
|`tokens`|`IJBTokens`|The contract that manages token minting and burning.|
|`configurator`|`address`|The address of the configurator.|
|`trusted_forwarder`|`address`||


### _layerSpecificConfigurationIsSet

Check if the layer specific configuration is set or not. Used as a sanity check.


```solidity
function _layerSpecificConfigurationIsSet() internal view virtual returns (bool);
```

### _msgSender

The message's sender. Preferred to use over `msg.sender`.


```solidity
function _msgSender() internal view override(ERC2771Context, Context) returns (address sender);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address which sent this call.|


### _msgData

The calldata. Preferred to use over `msg.data`.


```solidity
function _msgData() internal view override(ERC2771Context, Context) returns (bytes calldata);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|calldata The `msg.data` of this call.|


### _contextSuffixLength

*ERC-2771 specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view virtual override(ERC2771Context, Context) returns (uint256);
```

### configureSingleton

Configure the singleton instance that is used to clone suckers.

*Can only be called *once* by the layer specific configurator.*


```solidity
function configureSingleton(JBSucker _singleton) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_singleton`|`JBSucker`|The address of the singleton.|


### createForSender

Create a new `JBSucker` for a specific project.

*Uses the sender address as the salt, which means the same sender must call this function on both chains.*


```solidity
function createForSender(
    uint256 localProjectId,
    bytes32 salt
)
    external
    override(IJBSuckerDeployer)
    returns (IJBSucker sucker);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`localProjectId`|`uint256`|The project's ID on the local chain.|
|`salt`|`bytes32`|The salt to use for the `create2` address.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sucker`|`IJBSucker`|The address of the new sucker.|


