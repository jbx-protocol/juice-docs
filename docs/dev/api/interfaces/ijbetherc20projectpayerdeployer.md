# IJBETHERC20ProjectPayerDeployer

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/interfaces/IJBETHERC20ProjectPayerDeployer.sol)

## Functions

### deployProjectPayer

```solidity
function deployProjectPayer(
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _preferAddToBalance,
    address _owner
) external returns (IJBProjectPayer projectPayer);
```

## Events

### DeployProjectPayer

```solidity
event DeployProjectPayer(
    IJBProjectPayer indexed projectPayer,
    uint256 defaultProjectId,
    address defaultBeneficiary,
    bool defaultPreferClaimedTokens,
    string defaultMemo,
    bytes defaultMetadata,
    bool preferAddToBalance,
    IJBDirectory directory,
    address owner,
    address caller
);
```

