# JBAccountingContext
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBAccountingContext.sol)

**Notes:**
- member: token The address of the token that accounting is being done with.

- member: decimals The number of decimals expected in that token's fixed point accounting.

- member: currency The currency that the token is priced in terms of. By convention, this is
`uint32(uint160(tokenAddress))` for tokens, or a constant ID from e.g. `JBCurrencyIds` for other currencies.


```solidity
struct JBAccountingContext {
    address token;
    uint8 decimals;
    uint32 currency;
}
```

