# JBArbitrumSuckerDeployer
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/deployers/JBArbitrumSuckerDeployer.sol)

**Inherits:**
[JBSuckerDeployer](/docs/v4/api/suckers/deployers/JBSuckerDeployer.sol/abstract.JBSuckerDeployer.md), [IJBArbitrumSuckerDeployer](/docs/v4/api/suckers/interfaces/IJBArbitrumSuckerDeployer.sol/interface.IJBArbitrumSuckerDeployer.md)

An `IJBSuckerDeployerFeeless` implementation to deploy `JBOptimismSucker` contracts.


## State Variables
### arbLayer
The layer that this contract is on.


```solidity
JBLayer public arbLayer;
```


### arbInbox
The inbox used to send messages between the local and remote sucker.


```solidity
IInbox public override arbInbox;
```


### arbGatewayRouter
The gateway router for the specific chain


```solidity
IArbGatewayRouter public override arbGatewayRouter;
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
    JBSuckerDeployer(directory, permissions, tokens, configurator, trusted_forwarder);
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
function _layerSpecificConfigurationIsSet() internal view override returns (bool);
```

### setChainSpecificConstants

handles some layer specific configuration that can't be done in the constructor otherwise deployment
addresses would change.

messenger the OPMesssenger on this layer.

bridge the OPStandardBridge on this layer.


```solidity
function setChainSpecificConstants(JBLayer layer, IInbox inbox, IArbGatewayRouter gatewayRouter) external;
```

