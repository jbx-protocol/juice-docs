# IJBCCIPSuckerDeployer
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IJBCCIPSuckerDeployer.sol)


## Functions
### ccipRouter


```solidity
function ccipRouter() external view returns (ICCIPRouter);
```

### ccipRemoteChainId


```solidity
function ccipRemoteChainId() external view returns (uint256);
```

### ccipRemoteChainSelector


```solidity
function ccipRemoteChainSelector() external view returns (uint64);
```

## Events
### CCIPConstantsSet

```solidity
event CCIPConstantsSet(address ccipRouter, uint256 ccipRemoteChainId, uint64 ccipRemoteChainSelector, address caller);
```

