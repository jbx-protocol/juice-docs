# IProxyPaymentAddressManager

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IProxyPaymentAddressManager.sol)

## Functions

### terminalDirectory

```solidity
function terminalDirectory() external returns (ITerminalDirectory);
```

### ticketBooth

```solidity
function ticketBooth() external returns (ITicketBooth);
```

### addressesOf

```solidity
function addressesOf(uint256 _projectId) external view returns (IProxyPaymentAddress[] memory);
```

### deploy

```solidity
function deploy(uint256 _projectId, string memory _memo) external returns (address);
```

## Events

### Deploy

```solidity
event Deploy(uint256 indexed projectId, string memo, address indexed caller);
```

