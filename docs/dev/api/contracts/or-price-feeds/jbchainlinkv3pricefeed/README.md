# JBChainlinkV3PriceFeed

_Manages and normalizes price feeds._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBChainlinkV3PriceFeed.sol

#### Addresses

Ethereum mainnet: [`0x87Ee2F4b8eE8F4C79523f36fEcBb5f76B23e7d6F`](https://etherscan.io/address/0x87Ee2F4b8eE8F4C79523f36fEcBb5f76B23e7d6F)

Goerli testnet: [`0x47C6072ccDb899C016ED07ae8aEb7b2cfFe3C82e`](https://goerli.etherscan.io/address/0x47C6072ccDb899C016ED07ae8aEb7b2cfFe3C82e)

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPriceFeed`**](/dev/api/interfaces/ijbpricefeed.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Constructor

```
/**
  @param _feed The feed to report prices from.
*/
constructor(AggregatorV3Interface _feed) {
  feed = _feed;
}
```

* `_feed` is the feed to report prices from.

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`feed`**](/dev/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/properties/feed.md)                            | <p><strong>Returns</strong></p><ul><li><code>[AggregatorV3Interface](https://docs.chain.link/price-feeds-api-reference/)</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`currentPrice`**](/dev/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/read/currentprice.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _decimals</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 price</code></li></ul> |
