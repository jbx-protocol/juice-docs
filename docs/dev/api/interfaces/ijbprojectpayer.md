# IJBProjectPayer

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/interfaces/IJBProjectPayer.sol)

Inherits: [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165)

## Functions

### directory

```solidity
function directory() external view returns (IJBDirectory);
```

### projectPayerDeployer

```solidity
function projectPayerDeployer() external view returns (address);
```

### defaultProjectId

```solidity
function defaultProjectId() external view returns (uint256);
```

### defaultBeneficiary

```solidity
function defaultBeneficiary() external view returns (address payable);
```

### defaultPreferClaimedTokens

```solidity
function defaultPreferClaimedTokens() external view returns (bool);
```

### defaultMemo

```solidity
function defaultMemo() external view returns (string memory);
```

### defaultMetadata

```solidity
function defaultMetadata() external view returns (bytes memory);
```

### defaultPreferAddToBalance

```solidity
function defaultPreferAddToBalance() external view returns (bool);
```

### initialize

```solidity
function initialize(
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _defaultPreferAddToBalance,
    address _owner
) external;
```

### setDefaultValues

```solidity
function setDefaultValues(
    uint256 _projectId,
    address payable _beneficiary,
    bool _preferClaimedTokens,
    string memory _memo,
    bytes memory _metadata,
    bool _defaultPreferAddToBalance
) external;
```

### pay

```solidity
function pay(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    address _beneficiary,
    uint256 _minReturnedTokens,
    bool _preferClaimedTokens,
    string memory _memo,
    bytes memory _metadata
) external payable;
```

### addToBalanceOf

```solidity
function addToBalanceOf(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    string memory _memo,
    bytes memory _metadata
) external payable;
```

### receive

```solidity
receive() external payable;
```

## Events

### SetDefaultValues

```solidity
event SetDefaultValues(
    uint256 indexed projectId,
    address indexed beneficiary,
    bool preferClaimedTokens,
    string memo,
    bytes metadata,
    bool preferAddToBalance,
    address caller
);
```
