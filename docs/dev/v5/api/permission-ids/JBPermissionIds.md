# JBPermissionIds
[Git Source](https://github.com/Bananapus/nana-permission-ids/blob/974399902b3cfbcd70b9efc0018d50667b9fe0c7/src/JBPermissionIds.sol)

Permission IDs for `JBPermissions`, used throughout the Bananapus ecosystem. See
[`JBPermissions`](https://github.com/Bananapus/nana-core/blob/main/src/JBPermissions.sol)

*`JBPermissions` allows one address to grant another address permission to call functions in Juicebox contracts
on their behalf. Each ID in `JBPermissionIds` grants access to a specific set of these functions.*


## State Variables
### ROOT

```solidity
uint8 internal constant ROOT = 1;
```


### QUEUE_RULESETS

```solidity
uint8 internal constant QUEUE_RULESETS = 2;
```


### CASH_OUT_TOKENS

```solidity
uint8 internal constant CASH_OUT_TOKENS = 3;
```


### SEND_PAYOUTS

```solidity
uint8 internal constant SEND_PAYOUTS = 4;
```


### MIGRATE_TERMINAL

```solidity
uint8 internal constant MIGRATE_TERMINAL = 5;
```


### SET_PROJECT_URI

```solidity
uint8 internal constant SET_PROJECT_URI = 6;
```


### DEPLOY_ERC20

```solidity
uint8 internal constant DEPLOY_ERC20 = 7;
```


### SET_TOKEN

```solidity
uint8 internal constant SET_TOKEN = 8;
```


### MINT_TOKENS

```solidity
uint8 internal constant MINT_TOKENS = 9;
```


### BURN_TOKENS

```solidity
uint8 internal constant BURN_TOKENS = 10;
```


### CLAIM_TOKENS

```solidity
uint8 internal constant CLAIM_TOKENS = 11;
```


### TRANSFER_CREDITS

```solidity
uint8 internal constant TRANSFER_CREDITS = 12;
```


### SET_CONTROLLER

```solidity
uint8 internal constant SET_CONTROLLER = 13;
```


### SET_TERMINALS

```solidity
uint8 internal constant SET_TERMINALS = 14;
```


### SET_PRIMARY_TERMINAL

```solidity
uint8 internal constant SET_PRIMARY_TERMINAL = 15;
```


### USE_ALLOWANCE

```solidity
uint8 internal constant USE_ALLOWANCE = 16;
```


### SET_SPLIT_GROUPS

```solidity
uint8 internal constant SET_SPLIT_GROUPS = 17;
```


### ADD_PRICE_FEED

```solidity
uint8 internal constant ADD_PRICE_FEED = 18;
```


### ADD_ACCOUNTING_CONTEXTS

```solidity
uint8 internal constant ADD_ACCOUNTING_CONTEXTS = 19;
```


### ADJUST_721_TIERS

```solidity
uint8 internal constant ADJUST_721_TIERS = 20;
```


### SET_721_METADATA

```solidity
uint8 internal constant SET_721_METADATA = 21;
```


### MINT_721

```solidity
uint8 internal constant MINT_721 = 22;
```


### SET_721_DISCOUNT_PERCENT

```solidity
uint8 internal constant SET_721_DISCOUNT_PERCENT = 23;
```


### SET_BUYBACK_TWAP

```solidity
uint8 internal constant SET_BUYBACK_TWAP = 24;
```


### SET_BUYBACK_POOL

```solidity
uint8 internal constant SET_BUYBACK_POOL = 25;
```


### ADD_SWAP_TERMINAL_POOL

```solidity
uint8 internal constant ADD_SWAP_TERMINAL_POOL = 26;
```


### ADD_SWAP_TERMINAL_TWAP_PARAMS

```solidity
uint8 internal constant ADD_SWAP_TERMINAL_TWAP_PARAMS = 27;
```


### MAP_SUCKER_TOKEN

```solidity
uint8 internal constant MAP_SUCKER_TOKEN = 28;
```


### DEPLOY_SUCKERS

```solidity
uint8 internal constant DEPLOY_SUCKERS = 29;
```


### SUCKER_SAFETY

```solidity
uint8 internal constant SUCKER_SAFETY = 30;
```


