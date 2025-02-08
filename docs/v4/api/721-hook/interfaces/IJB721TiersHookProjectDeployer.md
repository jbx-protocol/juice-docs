# IJB721TiersHookProjectDeployer
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/interfaces/IJB721TiersHookProjectDeployer.sol)


## Functions
### DIRECTORY


```solidity
function DIRECTORY() external view returns (IJBDirectory);
```

### HOOK_DEPLOYER


```solidity
function HOOK_DEPLOYER() external view returns (IJB721TiersHookDeployer);
```

### launchProjectFor


```solidity
function launchProjectFor(
    address owner,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    JBLaunchProjectConfig memory launchProjectConfig,
    IJBController controller,
    bytes32 salt
)
    external
    returns (uint256 projectId, IJB721TiersHook hook);
```

### launchRulesetsFor


```solidity
function launchRulesetsFor(
    uint256 projectId,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    JBLaunchRulesetsConfig memory launchRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    returns (uint256 rulesetId, IJB721TiersHook hook);
```

### queueRulesetsOf


```solidity
function queueRulesetsOf(
    uint256 projectId,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    JBQueueRulesetsConfig memory queueRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    returns (uint256 rulesetId, IJB721TiersHook hook);
```

