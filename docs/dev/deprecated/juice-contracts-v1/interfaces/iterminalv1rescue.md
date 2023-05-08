# ITerminalV1Rescue

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/ITerminalV1Rescue.sol)

## Functions

### projects

```solidity
function projects() external view returns (IProjects);
```

### fundingCycles

```solidity
function fundingCycles() external view returns (IFundingCycles);
```

### ticketBooth

```solidity
function ticketBooth() external view returns (ITicketBooth);
```

### rescueAllowed

```solidity
function rescueAllowed(uint256 _projectId) external view returns (bool);
```

### balanceOf

```solidity
function balanceOf(uint256 _projectId) external view returns (uint256);
```

### rescue

```solidity
function rescue(uint256 _projectId, address payable _beneficiary, uint256 _amount) external;
```

### toggleRescue

```solidity
function toggleRescue(uint256 _projectId) external;
```

### printTickets

```solidity
function printTickets(
    uint256 _projectId,
    uint256 _amount,
    address _beneficiary,
    string memory _memo,
    bool _preferUnstakedTickets
) external;
```

## Events

### AddToBalance

```solidity
event AddToBalance(uint256 indexed projectId, uint256 value, address caller);
```

### PrintTickets

```solidity
event PrintTickets(uint256 indexed projectId, address indexed beneficiary, uint256 amount, string memo, address caller);
```

### Rescued

```solidity
event Rescued(uint256 projectId, address beneficiary, uint256 originalBalance, uint256 amount, address caller);
```

### ToggleRescue

```solidity
event ToggleRescue(uint256 projectId, bool newValue, address caller);
```

