# JBCurrencyAmount
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBCurrencyAmount.sol)

**Notes:**
- member: amount The amount of the currency.

- member: currency The currency. By convention, this is `uint32(uint160(tokenAddress))` for tokens, or a
constant ID from e.g. `JBCurrencyIds` for other currencies.


```solidity
struct JBCurrencyAmount {
    uint224 amount;
    uint32 currency;
}
```

