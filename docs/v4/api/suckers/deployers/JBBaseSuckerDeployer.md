# JBBaseSuckerDeployer
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/deployers/JBBaseSuckerDeployer.sol)

**Inherits:**
[JBOptimismSuckerDeployer](/docs/v4/api/suckers/deployers/JBOptimismSuckerDeployer.md)


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
    JBOptimismSuckerDeployer(directory, permissions, tokens, configurator, trusted_forwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|The directory of terminals and controllers for projects.|
|`permissions`|`IJBPermissions`|The permissions contract for the deployer.|
|`tokens`|`IJBTokens`|The contract that manages token minting and burning.|
|`configurator`|`address`|The address of the configurator.|
|`trusted_forwarder`|`address`||


