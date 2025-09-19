# JBBaseSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/JBBaseSucker.sol)

**Inherits:**
[JBOptimismSucker](/docs/dev/v5/api/suckers/JBOptimismSucker.md)


## Functions
### constructor


```solidity
constructor(
    JBOptimismSuckerDeployer deployer,
    IJBDirectory directory,
    IJBPermissions permissions,
    IJBTokens tokens,
    JBAddToBalanceMode addToBalanceMode,
    address trusted_forwarder
)
    JBOptimismSucker(deployer, directory, permissions, tokens, addToBalanceMode, trusted_forwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`JBOptimismSuckerDeployer`|A contract that deploys the clones for this contracts.|
|`directory`|`IJBDirectory`|A contract storing directories of terminals and controllers for each project.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`tokens`|`IJBTokens`|A contract that manages token minting and burning.|
|`addToBalanceMode`|`JBAddToBalanceMode`|The mode of adding tokens to balance.|
|`trusted_forwarder`|`address`||


### peerChainId

Returns the chain on which the peer is located.


```solidity
function peerChainId() external view virtual override returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|chainId of the peer.|


