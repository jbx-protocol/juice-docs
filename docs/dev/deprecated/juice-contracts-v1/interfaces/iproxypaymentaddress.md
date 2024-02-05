# IProxyPaymentAddress

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IProxyPaymentAddress.sol)

## Functions

### terminalDirectory

```solidity
function terminalDirectory() external returns (ITerminalDirectory);
```

### ticketBooth

```solidity
function ticketBooth() external returns (ITicketBooth);
```

### projectId

```solidity
function projectId() external returns (uint256);
```

### memo

```solidity
function memo() external returns (string memory);
```

### tap

```solidity
function tap() external;
```

### transferTickets

```solidity
function transferTickets(address _beneficiary, uint256 _amount) external;
```

## Events

### Receive

```solidity
event Receive(address indexed caller, uint256 value);
```

### Tap

```solidity
event Tap(address indexed caller, uint256 value);
```

### TransferTickets

```solidity
event TransferTickets(address indexed caller, address indexed beneficiary, uint256 indexed projectId, uint256 amount);
```

