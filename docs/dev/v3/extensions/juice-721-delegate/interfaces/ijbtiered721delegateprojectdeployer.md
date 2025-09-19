# IJBTiered721DelegateProjectDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/interfaces/IJBTiered721DelegateProjectDeployer.sol)

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
    address owner,
    JBDeployTiered721DelegateData memory deployTiered721DelegateData,
    JBLaunchProjectData memory launchProjectData,
    IJBController3_1 controller
) external returns (uint256 projectId);
```

### launchFundingCyclesFor

```solidity
function launchFundingCyclesFor(
    uint256 projectId,
    JBDeployTiered721DelegateData memory deployTiered721DelegateData,
    JBLaunchFundingCyclesData memory launchFundingCyclesData,
    IJBController3_1 controller
) external returns (uint256 configuration);
```

### reconfigureFundingCyclesOf

```solidity
function reconfigureFundingCyclesOf(
    uint256 projectId,
    JBDeployTiered721DelegateData memory deployTiered721DelegateData,
    JBReconfigureFundingCyclesData memory reconfigureFundingCyclesData,
    IJBController3_1 controller
) external returns (uint256 configuration);
```
