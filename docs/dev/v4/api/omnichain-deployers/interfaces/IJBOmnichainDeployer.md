# IJBOmnichainDeployer
[Git Source](https://github.com/Bananapus/nana-deployers/blob/dc045309f0ca1acdbd53439eb118f40013d3f5b4/src/interfaces/IJBOmnichainDeployer.sol)


## Functions
### dataHookOf


```solidity
function dataHookOf(
    uint256 projectId,
    uint256 rulesetId
)
    external
    view
    returns (bool useDataHookForPay, bool useDataHookForCashout, IJBRulesetDataHook dataHook);
```

### launchProjectFor


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

### launch721ProjectFor


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

### launchRulesetsFor


```solidity
function launchRulesetsFor(
    uint256 projectId,
    JBRulesetConfig[] calldata rulesetConfigurations,
    JBTerminalConfig[] memory terminalConfigurations,
    string calldata memo
)
    external
    returns (uint256 rulesetId);
```

### queueRulesetsOf


```solidity
function queueRulesetsOf(
    uint256 projectId,
    JBRulesetConfig[] calldata rulesetConfigurations,
    string calldata memo
)
    external
    returns (uint256 rulesetId);
```

### queue721RulesetsOf


```solidity
function queue721RulesetsOf(
    uint256 projectId,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    JBQueueRulesetsConfig memory queueRulesetsConfig,
    IJBController controller,
    bytes32 salt
)
    external
    returns (uint256 rulesetId, IJB721TiersHook hook);
```

