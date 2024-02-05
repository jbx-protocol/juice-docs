# IYielder

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IYielder.sol)

## Functions

### deposited

```solidity
function deposited() external view returns (uint256);
```

### getCurrentBalance

```solidity
function getCurrentBalance() external view returns (uint256);
```

### deposit

```solidity
function deposit() external payable;
```

### withdraw

```solidity
function withdraw(uint256 _amount, address payable _beneficiary) external;
```

### withdrawAll

```solidity
function withdrawAll(address payable _beneficiary) external returns (uint256);
```

