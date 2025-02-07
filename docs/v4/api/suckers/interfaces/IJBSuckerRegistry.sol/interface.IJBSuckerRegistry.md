# IJBSuckerRegistry
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IJBSuckerRegistry.sol)


## Functions
### DIRECTORY


```solidity
function DIRECTORY() external view returns (IJBDirectory);
```

### PROJECTS


```solidity
function PROJECTS() external view returns (IJBProjects);
```

### getSuckerPairsOf


```solidity
function getSuckerPairsOf(uint256 projectId) external view returns (JBSuckersPair[] memory pairs);
```

### isSuckerOf


```solidity
function isSuckerOf(uint256 projectId, address addr) external view returns (bool);
```

### suckerDeployerIsAllowed


```solidity
function suckerDeployerIsAllowed(address deployer) external view returns (bool);
```

### suckersOf


```solidity
function suckersOf(uint256 projectId) external view returns (address[] memory);
```

### allowSuckerDeployer


```solidity
function allowSuckerDeployer(address deployer) external;
```

### allowSuckerDeployers


```solidity
function allowSuckerDeployers(address[] calldata deployers) external;
```

### deploySuckersFor


```solidity
function deploySuckersFor(
    uint256 projectId,
    bytes32 salt,
    JBSuckerDeployerConfig[] memory configurations
)
    external
    returns (address[] memory suckers);
```

### removeDeprecatedSucker


```solidity
function removeDeprecatedSucker(uint256 projectId, address sucker) external;
```

### removeSuckerDeployer


```solidity
function removeSuckerDeployer(address deployer) external;
```

## Events
### SuckerDeployedFor

```solidity
event SuckerDeployedFor(uint256 projectId, address sucker, JBSuckerDeployerConfig configuration, address caller);
```

### SuckerDeployerAllowed

```solidity
event SuckerDeployerAllowed(address deployer, address caller);
```

### SuckerDeployerRemoved

```solidity
event SuckerDeployerRemoved(address deployer, address caller);
```

### SuckerDeprecated

```solidity
event SuckerDeprecated(uint256 projectId, address sucker, address caller);
```

