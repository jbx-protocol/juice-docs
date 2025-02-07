# IJBSuckerDeployer
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IJBSuckerDeployer.sol)


## Functions
### DIRECTORY


```solidity
function DIRECTORY() external view returns (IJBDirectory);
```

### TOKENS


```solidity
function TOKENS() external view returns (IJBTokens);
```

### LAYER_SPECIFIC_CONFIGURATOR


```solidity
function LAYER_SPECIFIC_CONFIGURATOR() external view returns (address);
```

### isSucker


```solidity
function isSucker(address sucker) external view returns (bool);
```

### createForSender


```solidity
function createForSender(uint256 localProjectId, bytes32 salt) external returns (IJBSucker sucker);
```

## Errors
### JBSuckerDeployer_AlreadyConfigured

```solidity
error JBSuckerDeployer_AlreadyConfigured();
```

### JBSuckerDeployer_DeployerIsNotConfigured

```solidity
error JBSuckerDeployer_DeployerIsNotConfigured();
```

### JBSuckerDeployer_InvalidLayerSpecificConfiguration

```solidity
error JBSuckerDeployer_InvalidLayerSpecificConfiguration();
```

### JBSuckerDeployer_LayerSpecificNotConfigured

```solidity
error JBSuckerDeployer_LayerSpecificNotConfigured();
```

### JBSuckerDeployer_Unauthorized

```solidity
error JBSuckerDeployer_Unauthorized(address caller, address expected);
```

### JBSuckerDeployer_ZeroConfiguratorAddress

```solidity
error JBSuckerDeployer_ZeroConfiguratorAddress();
```

