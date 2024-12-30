# JBAccountingContext
[Git Source](https://github.com/Bananapus/nana-core/blob/5edded029d8594f0ad136b3b553b028d36196e84/src/structs/JBAccountingContext.sol)


```solidity
struct JBAccountingContext {
    address token;
    uint8 decimals;
    uint32 currency;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token that accounting is being done with.|
|`decimals`|`uint8`|The number of decimals expected in that token's fixed point accounting.|
|`currency`|`uint32`|The currency that the token is priced in terms of. By convention, this is `uint32(uint160(tokenAddress))` for tokens, or a constant ID from e.g. `JBCurrencyIds` for other currencies.|

