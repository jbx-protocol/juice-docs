# JBSuckerDeployerConfig
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBSuckerDeployerConfig.sol)

**Notes:**
- member: deployer The deployer to use.

- member: mappings The token mappings to use.


```solidity
struct JBSuckerDeployerConfig {
    IJBSuckerDeployer deployer;
    JBTokenMapping[] mappings;
}
```

