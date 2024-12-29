# IWETH

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IWETH.sol)

## Functions

### decimals

```solidity
function decimals() external view returns (uint256);
```

### deposit

```solidity
function deposit() external payable;
```

### withdraw

```solidity
function withdraw(uint256 wad) external;
```

## Events

### Deposit

```solidity
event Deposit(address indexed dst, uint256 wad);
```

### Withdrawal

```solidity
event Withdrawal(address indexed src, uint256 wad);
```

