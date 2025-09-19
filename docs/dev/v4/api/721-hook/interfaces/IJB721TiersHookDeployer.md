# IJB721TiersHookDeployer
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/interfaces/IJB721TiersHookDeployer.sol)


## Functions
### deployHookFor


```solidity
function deployHookFor(
    uint256 projectId,
    JBDeploy721TiersHookConfig memory deployTiersHookConfig,
    bytes32 salt
)
    external
    returns (IJB721TiersHook hook);
```

## Events
### HookDeployed

```solidity
event HookDeployed(uint256 indexed projectId, IJB721TiersHook hook, address caller);
```

