# IJBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/331ed61b7ae1a4c4536bcd78f5e0b7d4a67c2869/contracts/interfaces/IJBTiered721DelegateDeployer.sol)

## Functions

### deployDelegateFor

```solidity
function deployDelegateFor(
    uint256 _projectId,
    JBDeployTiered721DelegateData memory _deployTieredNFTRewardDelegateData,
    IJBDirectory _directory
) external returns (IJBTiered721Delegate delegate);
```

## Events

### DelegateDeployed

```solidity
event DelegateDeployed(
    uint256 indexed projectId,
    IJBTiered721Delegate newDelegate,
    JB721GovernanceType governanceType,
    IJBDirectory directory
);
```

