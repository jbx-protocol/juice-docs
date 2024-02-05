# IDirectPaymentAddress

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IDirectPaymentAddress.sol)

## Functions

### terminalDirectory

```solidity
function terminalDirectory() external returns (ITerminalDirectory);
```

### projectId

```solidity
function projectId() external returns (uint256);
```

### memo

```solidity
function memo() external returns (string memory);
```

## Events

### Forward

```solidity
event Forward(
    address indexed payer,
    uint256 indexed projectId,
    address beneficiary,
    uint256 value,
    string memo,
    bool preferUnstakedTickets
);
```

