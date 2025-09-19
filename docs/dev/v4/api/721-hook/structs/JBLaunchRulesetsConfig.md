# JBLaunchRulesetsConfig
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JBLaunchRulesetsConfig.sol)

**Notes:**
- member: projectId The ID of the project to launch rulesets for.

- member: rulesetConfigurations The ruleset configurations to queue.

- member: terminalConfigurations The terminal configurations to add for the project.

- member: memo A memo to pass along to the emitted event.


```solidity
struct JBLaunchRulesetsConfig {
    uint56 projectId;
    JBPayDataHookRulesetConfig[] rulesetConfigurations;
    JBTerminalConfig[] terminalConfigurations;
    string memo;
}
```

