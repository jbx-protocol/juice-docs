# IFundingCycles

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IFundingCycles.sol)

## Functions

### latestIdOf

```solidity
function latestIdOf(uint256 _projectId) external view returns (uint256);
```

### count

```solidity
function count() external view returns (uint256);
```

### BASE_WEIGHT

```solidity
function BASE_WEIGHT() external view returns (uint256);
```

### MAX_CYCLE_LIMIT

```solidity
function MAX_CYCLE_LIMIT() external view returns (uint256);
```

### get

```solidity
function get(uint256 _fundingCycleId) external view returns (FundingCycle memory);
```

### queuedOf

```solidity
function queuedOf(uint256 _projectId) external view returns (FundingCycle memory);
```

### currentOf

```solidity
function currentOf(uint256 _projectId) external view returns (FundingCycle memory);
```

### currentBallotStateOf

```solidity
function currentBallotStateOf(uint256 _projectId) external view returns (BallotState);
```

### configure

```solidity
function configure(
    uint256 _projectId,
    FundingCycleProperties calldata _properties,
    uint256 _metadata,
    uint256 _fee,
    bool _configureActiveFundingCycle
) external returns (FundingCycle memory fundingCycle);
```

### tap

```solidity
function tap(uint256 _projectId, uint256 _amount) external returns (FundingCycle memory fundingCycle);
```

## Events

### Configure

```solidity
event Configure(
    uint256 indexed fundingCycleId,
    uint256 indexed projectId,
    uint256 reconfigured,
    FundingCycleProperties _properties,
    uint256 metadata,
    address caller
);
```

### Tap

```solidity
event Tap(
    uint256 indexed fundingCycleId, uint256 indexed projectId, uint256 amount, uint256 newTappedAmount, address caller
);
```

### Init

```solidity
event Init(
    uint256 indexed fundingCycleId,
    uint256 indexed projectId,
    uint256 number,
    uint256 previous,
    uint256 weight,
    uint256 start
);
```

