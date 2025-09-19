# IJBSplitsPayer

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/interfaces/IJBSplitsPayer.sol)

Inherits: [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165)

## Functions

### defaultSplitsProjectId

```solidity
function defaultSplitsProjectId() external view returns (uint256);
```

### defaultSplitsDomain

```solidity
function defaultSplitsDomain() external view returns (uint256);
```

### defaultSplitsGroup

```solidity
function defaultSplitsGroup() external view returns (uint256);
```

### splitsStore

```solidity
function splitsStore() external view returns (IJBSplitsStore);
```

### initialize

```solidity
function initialize(
    uint256 _defaultSplitsProjectId,
    uint256 _defaultSplitsDomain,
    uint256 _defaultSplitsGroup,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _preferAddToBalance,
    address _owner
) external;
```

### setDefaultSplitsReference

```solidity
function setDefaultSplitsReference(uint256 _projectId, uint256 _domain, uint256 _group) external;
```

### setDefaultSplits

```solidity
function setDefaultSplits(
    uint256 _projectId,
    uint256 _domain,
    uint256 _group,
    JBGroupedSplits[] memory _splitsGroup
) external;
```

## Events

### SetDefaultSplitsReference

```solidity
event SetDefaultSplitsReference(
    uint256 indexed projectId, uint256 indexed domain, uint256 indexed group, address caller
);
```

### Pay

```solidity
event Pay(
    uint256 indexed projectId,
    address beneficiary,
    address token,
    uint256 amount,
    uint256 decimals,
    uint256 leftoverAmount,
    uint256 minReturnedTokens,
    bool preferClaimedTokens,
    string memo,
    bytes metadata,
    address caller
);
```

### AddToBalance

```solidity
event AddToBalance(
    uint256 indexed projectId,
    address beneficiary,
    address token,
    uint256 amount,
    uint256 decimals,
    uint256 leftoverAmount,
    string memo,
    bytes metadata,
    address caller
);
```

### DistributeToSplitGroup

```solidity
event DistributeToSplitGroup(
    uint256 indexed projectId, uint256 indexed domain, uint256 indexed group, address caller
);
```

### DistributeToSplit

```solidity
event DistributeToSplit(JBSplit split, uint256 amount, address defaultBeneficiary, address caller);
```

