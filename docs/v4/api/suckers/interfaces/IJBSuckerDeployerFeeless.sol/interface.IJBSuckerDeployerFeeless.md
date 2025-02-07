# IJBSuckerDeployerFeeless
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IJBSuckerDeployerFeeless.sol)

**Inherits:**
[IJBSuckerDeployer](/docs/v4/api/suckers/interfaces/IJBSuckerDeployer.sol/interface.IJBSuckerDeployer.md)


## Functions
### useAllowanceFeeless


```solidity
function useAllowanceFeeless(
    uint256 projectId,
    IJBPayoutTerminal terminal,
    address token,
    uint32 currency,
    uint256 amount,
    uint256 minTokensReclaimed
)
    external
    returns (uint256);
```

