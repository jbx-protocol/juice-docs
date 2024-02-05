# AddFeed

Emitted from:

* [`addFeedFor`](/dev/deprecated/v2/contracts/jbprices/write/addfeed.md)

#### Definition

```
event AddFeed(uint256 indexed currency, uint256 indexed base, IJBPriceFeed feed);
```

* `currency` is the currency the feed was added for.
* `base` is the currency that the feed's price will be reported based on.
* `feed` is the [`IJBPriceFeed`](/dev/deprecated/v2/interfaces/ijbpricefeed.md) feed contract that was added.
