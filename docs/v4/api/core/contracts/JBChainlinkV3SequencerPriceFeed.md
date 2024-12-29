# JBChainlinkV3SequencerPriceFeed
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/JBChainlinkV3SequencerPriceFeed.sol)

**Inherits:**
[JBChainlinkV3PriceFeed](/docs/v4/api/core/contracts/JBChainlinkV3PriceFeed.md)

An `IJBPriceFeed` implementation that reports prices from a Chainlink `AggregatorV3Interface` from
optimistic sequencers.


## State Variables
### GRACE_PERIOD_TIME
How long the sequencer must be re-active in order to return a price.


```solidity
uint256 public immutable GRACE_PERIOD_TIME;
```


### SEQUENCER_FEED
The Chainlink sequencer feed that prices are reported from.


```solidity
AggregatorV2V3Interface public immutable SEQUENCER_FEED;
```


## Functions
### constructor


```solidity
constructor(
    AggregatorV3Interface feed,
    uint256 gracePeriod,
    AggregatorV2V3Interface sequencerFeed,
    uint256 threshold
)
    JBChainlinkV3PriceFeed(feed, threshold);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feed`|`AggregatorV3Interface`|The Chainlink feed to report prices from.|
|`gracePeriod`|`uint256`|How long the sequencer should have been re-active before returning prices.|
|`sequencerFeed`|`AggregatorV2V3Interface`|The Chainlink feed to report sequencer status.|
|`threshold`|`uint256`|How many blocks old a price update may be.|


### currentUnitPrice

Gets the current price (per 1 unit) from the feed.


```solidity
function currentUnitPrice(uint256 decimals) public view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`decimals`|`uint256`|The number of decimals the return value should use.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current unit price from the feed, as a fixed point number with the specified number of decimals.|


## Errors
### JBChainlinkV3SequencerPriceFeed_SequencerDownOrRestarting

```solidity
error JBChainlinkV3SequencerPriceFeed_SequencerDownOrRestarting(
    uint256 timestamp, uint256 gradePeriodTime, uint256 startedAt
);
```

