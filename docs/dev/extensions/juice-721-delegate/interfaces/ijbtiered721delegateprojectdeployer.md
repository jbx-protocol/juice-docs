# IJBTiered721DelegateProjectDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/interfaces/IJBTiered721DelegateProjectDeployer.sol)

## Functions

### directory

```solidity
function directory() external view returns (IJBDirectory);
```

### delegateDeployer

```solidity
function delegateDeployer() external view returns (IJBTiered721DelegateDeployer);
```

### launchProjectFor

```solidity
function launchProjectFor(
    address _owner,
    JBDeployTiered721DelegateData memory _deployTieredNFTRewardDelegateData,
    JBLaunchProjectData memory _launchProjectData,
    IJBController3_1 _controller
) external returns (uint256 projectId);
```

### launchFundingCyclesFor

```solidity
function launchFundingCyclesFor(
    uint256 _projectId,
    JBDeployTiered721DelegateData memory _deployTieredNFTRewardDelegateData,
    JBLaunchFundingCyclesData memory _launchFundingCyclesData,
    IJBController3_1 _controller
) external returns (uint256 configuration);
```

### reconfigureFundingCyclesOf

```solidity
function reconfigureFundingCyclesOf(
    uint256 _projectId,
    JBDeployTiered721DelegateData memory _deployTieredNFTRewardDelegateData,
    JBReconfigureFundingCyclesData memory _reconfigureFundingCyclesData,
    IJBController3_1 _controller
) external returns (uint256 configuration);
```

