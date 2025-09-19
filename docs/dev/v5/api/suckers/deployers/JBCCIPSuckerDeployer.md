# JBCCIPSuckerDeployer
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/deployers/JBCCIPSuckerDeployer.sol)

**Inherits:**
[JBSuckerDeployer](/docs/dev/v5/api/suckers/deployers/JBSuckerDeployer.md), [IJBCCIPSuckerDeployer](/docs/dev/v5/api/suckers/interfaces/IJBCCIPSuckerDeployer.md)

An `IJBSuckerDeployer` implementation to deploy contracts.


## State Variables
### ccipRemoteChainId
Store the remote chain id


```solidity
uint256 public ccipRemoteChainId;
```


### ccipRemoteChainSelector
The remote chain selector target of all sucker deployed by this contract.


```solidity
uint64 public ccipRemoteChainSelector;
```


### ccipRouter
Store the address of the CCIP router for this chain.


```solidity
ICCIPRouter public ccipRouter;
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
TODO natspec


```solidity
function setChainSpecificConstants(uint256 remoteChainId, uint64 remoteChainSelector, ICCIPRouter router) external;
```

## Errors
### JBCCIPSuckerDeployer_InvalidCCIPRouter

```solidity
error JBCCIPSuckerDeployer_InvalidCCIPRouter(address router);
```

