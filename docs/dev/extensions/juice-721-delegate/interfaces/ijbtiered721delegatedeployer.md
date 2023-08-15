# IJBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/interfaces/IJBTiered721DelegateDeployer.sol)

## Functions

### deployDelegateFor

```solidity
function deployDelegateFor(uint256 projectId, JBDeployTiered721DelegateData memory deployTieredNFTRewardDelegateData)
    external
    returns (IJBTiered721Delegate delegate);
```

## Events

### DelegateDeployed

```solidity
event DelegateDeployed(uint256 indexed projectId, IJBTiered721Delegate newDelegate, JB721GovernanceType governanceType);
```
