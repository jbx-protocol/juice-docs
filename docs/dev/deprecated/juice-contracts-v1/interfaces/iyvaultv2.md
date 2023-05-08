# IyVaultV2

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IyVaultV2.sol)

Inherits: [`IERC20`](/)

## Functions

### token

```solidity
function token() external view returns (address);
```

### deposit

```solidity
function deposit() external returns (uint256);
```

### deposit

```solidity
function deposit(uint256) external returns (uint256);
```

### deposit

```solidity
function deposit(uint256, address) external returns (uint256);
```

### withdraw

```solidity
function withdraw() external returns (uint256);
```

### withdraw

```solidity
function withdraw(uint256) external returns (uint256);
```

### withdraw

```solidity
function withdraw(uint256, address) external returns (uint256);
```

### withdraw

```solidity
function withdraw(uint256, address, uint256) external returns (uint256);
```

### permit

```solidity
function permit(address, address, uint256, uint256, bytes32) external view returns (bool);
```

### pricePerShare

```solidity
function pricePerShare() external view returns (uint256);
```

### apiVersion

```solidity
function apiVersion() external view returns (string memory);
```

### totalAssets

```solidity
function totalAssets() external view returns (uint256);
```

### maxAvailableShares

```solidity
function maxAvailableShares() external view returns (uint256);
```

### debtOutstanding

```solidity
function debtOutstanding() external view returns (uint256);
```

### debtOutstanding

```solidity
function debtOutstanding(address strategy) external view returns (uint256);
```

### creditAvailable

```solidity
function creditAvailable() external view returns (uint256);
```

### creditAvailable

```solidity
function creditAvailable(address strategy) external view returns (uint256);
```

### availableDepositLimit

```solidity
function availableDepositLimit() external view returns (uint256);
```

### expectedReturn

```solidity
function expectedReturn() external view returns (uint256);
```

### expectedReturn

```solidity
function expectedReturn(address strategy) external view returns (uint256);
```

### name

```solidity
function name() external view returns (string memory);
```

### symbol

```solidity
function symbol() external view returns (string memory);
```

### decimals

```solidity
function decimals() external view returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address owner) external view override returns (uint256);
```

### totalSupply

```solidity
function totalSupply() external view override returns (uint256);
```

### governance

```solidity
function governance() external view returns (address);
```

### management

```solidity
function management() external view returns (address);
```

### guardian

```solidity
function guardian() external view returns (address);
```

### guestList

```solidity
function guestList() external view returns (address);
```

### strategies

```solidity
function strategies(address)
    external
    view
    returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256);
```

### withdrawalQueue

```solidity
function withdrawalQueue(uint256) external view returns (address);
```

### emergencyShutdown

```solidity
function emergencyShutdown() external view returns (bool);
```

### depositLimit

```solidity
function depositLimit() external view returns (uint256);
```

### debtRatio

```solidity
function debtRatio() external view returns (uint256);
```

### totalDebt

```solidity
function totalDebt() external view returns (uint256);
```

### lastReport

```solidity
function lastReport() external view returns (uint256);
```

### activation

```solidity
function activation() external view returns (uint256);
```

### rewards

```solidity
function rewards() external view returns (address);
```

### managementFee

```solidity
function managementFee() external view returns (uint256);
```

### performanceFee

```solidity
function performanceFee() external view returns (uint256);
```

