# JBConstants
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/libraries/JBConstants.sol)

Global constants used across Juicebox contracts.


## State Variables
### NATIVE_TOKEN
Each chain's native token address in Juicebox is represented by
0x000000000000000000000000000000000000EEEe.


```solidity
address public constant NATIVE_TOKEN = address(0x000000000000000000000000000000000000EEEe);
```


### MAX_RESERVED_PERCENT

```solidity
uint16 public constant MAX_RESERVED_PERCENT = 10_000;
```


### MAX_CASH_OUT_TAX_RATE

```solidity
uint16 public constant MAX_CASH_OUT_TAX_RATE = 10_000;
```


### MAX_WEIGHT_CUT_PERCENT

```solidity
uint32 public constant MAX_WEIGHT_CUT_PERCENT = 1_000_000_000;
```


### SPLITS_TOTAL_PERCENT

```solidity
uint32 public constant SPLITS_TOTAL_PERCENT = 1_000_000_000;
```


### MAX_FEE

```solidity
uint16 public constant MAX_FEE = 1000;
```


