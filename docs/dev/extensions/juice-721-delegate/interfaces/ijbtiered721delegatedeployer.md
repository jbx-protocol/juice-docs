# IJBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/interfaces/IJBTiered721DelegateDeployer.sol)

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

