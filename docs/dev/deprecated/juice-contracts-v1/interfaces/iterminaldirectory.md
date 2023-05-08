# ITerminalDirectory

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/ITerminalDirectory.sol)

## Functions

### projects

```solidity
function projects() external view returns (IProjects);
```

### terminalOf

```solidity
function terminalOf(uint256 _projectId) external view returns (ITerminal);
```

### beneficiaryOf

```solidity
function beneficiaryOf(address _account) external returns (address);
```

### unstakedTicketsPreferenceOf

```solidity
function unstakedTicketsPreferenceOf(address _account) external returns (bool);
```

### addressesOf

```solidity
function addressesOf(uint256 _projectId) external view returns (IDirectPaymentAddress[] memory);
```

### deployAddress

```solidity
function deployAddress(uint256 _projectId, string calldata _memo) external;
```

### setTerminal

```solidity
function setTerminal(uint256 _projectId, ITerminal _terminal) external;
```

### setPayerPreferences

```solidity
function setPayerPreferences(address _beneficiary, bool _preferUnstakedTickets) external;
```

## Events

### DeployAddress

```solidity
event DeployAddress(uint256 indexed projectId, string memo, address indexed caller);
```

### SetTerminal

```solidity
event SetTerminal(uint256 indexed projectId, ITerminal indexed terminal, address caller);
```

### SetPayerPreferences

```solidity
event SetPayerPreferences(address indexed account, address beneficiary, bool preferUnstakedTickets);
```

