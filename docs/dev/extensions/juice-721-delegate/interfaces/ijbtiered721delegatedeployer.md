# IJBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/42d3a6d91f96ac82ae443fb9b5a22dd1ff8d398e/contracts/interfaces/IJBTiered721DelegateDeployer.sol)

## Functions

### deployDelegateFor

```solidity
function deployDelegateFor(
    uint256 projectId,
    JBDeployTiered721DelegateData memory deployTieredNFTRewardDelegateData,
    IJBDirectory directory
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

