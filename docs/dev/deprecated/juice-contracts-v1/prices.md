# Prices

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/Prices.sol)

Mainnet: [`0xa9537Cc42555564206D4E57c0eb6943d56E83A30`](https://etherscan.io/address/0xa9537Cc42555564206D4E57c0eb6943d56E83A30)

Inherits: [`IPrices`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iprices.md), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

Manage and normalizes ETH price feeds.

## State Variables

### targetDecimals

The target number of decimals the price feed results have.

```solidity
uint256 public constant override targetDecimals = 18;
```

### feedDecimalAdjuster

The number to multiply each price feed by to get to the target decimals.

```solidity
mapping(uint256 => uint256) public override feedDecimalAdjuster;
```

### feedFor

The available price feeds that can be used to get the price of ETH.

```solidity
mapping(uint256 => AggregatorV3Interface) public override feedFor;
```

## Functions

### getETHPriceFor

Gets the current price of ETH for the provided currency.

```solidity
function getETHPriceFor(uint256 _currency) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_currency`|`uint256`|The currency to get a price for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|price The price of ETH with 18 decimals.|

### addFeed

Add a price feed for the price of ETH.

*Current feeds can't be modified.*

```solidity
function addFeed(AggregatorV3Interface _feed, uint256 _currency) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_feed`|`AggregatorV3Interface`|The price feed being added.|
|`_currency`|`uint256`|The currency that the price feed is for.|

