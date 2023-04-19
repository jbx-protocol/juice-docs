# IJBETHERC20SplitsPayerDeployer

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/interfaces/IJBETHERC20SplitsPayerDeployer.sol)

## Functions

### deploySplitsPayer

```solidity
function deploySplitsPayer(
    uint256 _defaultSplitsProjectId,
    uint256 _defaultSplitsDomain,
    uint256 _defaultSplitsGroup,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string calldata _defaultMemo,
    bytes calldata _defaultMetadata,
    bool _preferAddToBalance,
    address _owner
) external returns (IJBSplitsPayer splitsPayer);
```

### deploySplitsPayerWithSplits

```solidity
function deploySplitsPayerWithSplits(
    uint256 _defaultSplitsProjectId,
    JBSplit[] memory _defaultSplits,
    IJBSplitsStore _splitsStore,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _defaultPreferAddToBalance,
    address _owner
) external returns (IJBSplitsPayer splitsPayer);
```

## Events

### DeploySplitsPayer

```solidity
event DeploySplitsPayer(
    IJBSplitsPayer indexed splitsPayer,
    uint256 defaultSplitsProjectId,
    uint256 defaultSplitsDomain,
    uint256 defaultSplitsGroup,
    IJBSplitsStore splitsStore,
    uint256 defaultProjectId,
    address defaultBeneficiary,
    bool defaultPreferClaimedTokens,
    string defaultMemo,
    bytes defaultMetadata,
    bool preferAddToBalance,
    address owner,
    address caller
);
```
