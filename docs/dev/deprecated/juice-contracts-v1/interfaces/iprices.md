# IPrices

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IPrices.sol)

## Functions

### feedDecimalAdjuster

```solidity
function feedDecimalAdjuster(uint256 _currency) external returns (uint256);
```

### targetDecimals

```solidity
function targetDecimals() external returns (uint256);
```

### feedFor

```solidity
function feedFor(uint256 _currency) external returns (AggregatorV3Interface);
```

### getETHPriceFor

```solidity
function getETHPriceFor(uint256 _currency) external view returns (uint256);
```

### addFeed

```solidity
function addFeed(AggregatorV3Interface _priceFeed, uint256 _currency) external;
```

## Events

### AddFeed

```solidity
event AddFeed(uint256 indexed currency, AggregatorV3Interface indexed feed);
```

