# JBLaunchProjectConfig
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JBLaunchProjectConfig.sol)

**Notes:**
- member: projectUri Metadata URI to associate with the project. This can be updated any time by the owner of
the project.

- member: rulesetConfigurations The ruleset configurations to queue.

- member: terminalConfigurations The terminal configurations to add for the project.

- member: memo A memo to pass along to the emitted event.


```solidity
struct JBLaunchProjectConfig {
    string projectUri;
    JBPayDataHookRulesetConfig[] rulesetConfigurations;
    JBTerminalConfig[] terminalConfigurations;
    string memo;
}
```

