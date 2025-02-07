# JB721InitTiersConfig
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JB721InitTiersConfig.sol)

Config to initialize a `JB721TiersHook` with tiers and price data.

*The `tiers` must be sorted by price (from least to greatest).*

**Notes:**
- member: tiers The tiers to initialize the hook with.

- member: currency The currency that the tier prices are denoted in. See `JBPrices`.

- member: decimals The number of decimals in the fixed point tier prices.

- member: prices A contract that exposes price feeds that can be used to calculate prices in different
currencies. To only accept payments in `currency`, set `prices` to the zero address. See `JBPrices`.


```solidity
struct JB721InitTiersConfig {
    JB721TierConfig[] tiers;
    uint32 currency;
    uint8 decimals;
    IJBPrices prices;
}
```

