# feed

Contract: [`JBChainlinkV3PriceFeed`](/dev/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/README.md)

**The available [`AggregatorV3Interface`](https://docs.chain.link/price-feeds-api-reference/) price feeds.**

#### Definition

```
/**
  @notice
  The feed that prices are reported from.
*/
AggregatorV3Interface public immutable feed;
```

* The resulting view function can be accessed externally by anyone.
