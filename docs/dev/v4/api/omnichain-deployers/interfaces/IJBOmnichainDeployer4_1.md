# IJBOmnichainDeployer4_1
[Git Source](https://github.com/Bananapus/nana-omnichain-deployers/blob/42d39e1442cba9e916ad812112755629711fb759/src/interfaces/IJBOmnichainDeployer4_1.sol)


## Functions
### dataHookOf


```solidity
function dataHookOf(
    uint256 projectId,
    uint256 rulesetId
)
    external
    view
    returns (bool useDataHookForPay, bool useDataHookForCashout, IJBRulesetDataHook4_1 dataHook);
```

### deploySuckersFor


```solidity
function deploySuckersFor(
    uint256 projectId,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration
)
    external
    returns (address[] memory suckers);
```

### launchProjectFor


```solidity
function launchProjectFor(
    address owner,
    string calldata projectUri,
    JBRulesetConfig[] calldata rulesetConfigurations,
    JBTerminalConfig[] calldata terminalConfigurations,
    string calldata memo,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration,
    IJBController controller
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
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration,
    IJBController controller
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
    string calldata memo,
    IJBController controller
)
    external
    returns (uint256 rulesetId);
```

### launch721RulesetsFor


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

### queueRulesetsOf


```solidity
function queueRulesetsOf(
    uint256 projectId,
    JBRulesetConfig[] calldata rulesetConfigurations,
    string calldata memo,
    IJBController controller
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

