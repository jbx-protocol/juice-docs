# ITicketBooth

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/ITicketBooth.sol)

## Functions

### ticketsOf

```solidity
function ticketsOf(uint256 _projectId) external view returns (ITickets);
```

### projects

```solidity
function projects() external view returns (IProjects);
```

### lockedBalanceOf

```solidity
function lockedBalanceOf(address _holder, uint256 _projectId) external view returns (uint256);
```

### lockedBalanceBy

```solidity
function lockedBalanceBy(address _operator, address _holder, uint256 _projectId) external view returns (uint256);
```

### stakedBalanceOf

```solidity
function stakedBalanceOf(address _holder, uint256 _projectId) external view returns (uint256);
```

### stakedTotalSupplyOf

```solidity
function stakedTotalSupplyOf(uint256 _projectId) external view returns (uint256);
```

### totalSupplyOf

```solidity
function totalSupplyOf(uint256 _projectId) external view returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address _holder, uint256 _projectId) external view returns (uint256 _result);
```

### issue

```solidity
function issue(uint256 _projectId, string calldata _name, string calldata _symbol) external;
```

### print

```solidity
function print(address _holder, uint256 _projectId, uint256 _amount, bool _preferUnstakedTickets) external;
```

### redeem

```solidity
function redeem(address _holder, uint256 _projectId, uint256 _amount, bool _preferUnstaked) external;
```

### stake

```solidity
function stake(address _holder, uint256 _projectId, uint256 _amount) external;
```

### unstake

```solidity
function unstake(address _holder, uint256 _projectId, uint256 _amount) external;
```

### lock

```solidity
function lock(address _holder, uint256 _projectId, uint256 _amount) external;
```

### unlock

```solidity
function unlock(address _holder, uint256 _projectId, uint256 _amount) external;
```

### transfer

```solidity
function transfer(address _holder, uint256 _projectId, uint256 _amount, address _recipient) external;
```

## Events

### Issue

```solidity
event Issue(uint256 indexed projectId, string name, string symbol, address caller);
```

### Print

```solidity
event Print(
    address indexed holder,
    uint256 indexed projectId,
    uint256 amount,
    bool convertedTickets,
    bool preferUnstakedTickets,
    address controller
);
```

### Redeem

```solidity
event Redeem(
    address indexed holder,
    uint256 indexed projectId,
    uint256 amount,
    uint256 stakedTickets,
    bool preferUnstaked,
    address controller
);
```

### Stake

```solidity
event Stake(address indexed holder, uint256 indexed projectId, uint256 amount, address caller);
```

### Unstake

```solidity
event Unstake(address indexed holder, uint256 indexed projectId, uint256 amount, address caller);
```

### Lock

```solidity
event Lock(address indexed holder, uint256 indexed projectId, uint256 amount, address caller);
```

### Unlock

```solidity
event Unlock(address indexed holder, uint256 indexed projectId, uint256 amount, address caller);
```

### Transfer

```solidity
event Transfer(
    address indexed holder, uint256 indexed projectId, address indexed recipient, uint256 amount, address caller
);
```

