# IJBPrices
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBPrices.sol)


## Functions
### DEFAULT_PROJECT_ID


```solidity
function DEFAULT_PROJECT_ID() external view returns (uint256);
```

### PROJECTS


```solidity
function PROJECTS() external view returns (IJBProjects);
```

### priceFeedFor


```solidity
function priceFeedFor(
    uint256 projectId,
    uint256 pricingCurrency,
    uint256 unitCurrency
)
    external
    view
    returns (IJBPriceFeed);
```

### pricePerUnitOf


```solidity
function pricePerUnitOf(
    uint256 projectId,
    uint256 pricingCurrency,
    uint256 unitCurrency,
    uint256 decimals
)
    external
    view
    returns (uint256);
```

### addPriceFeedFor


```solidity
function addPriceFeedFor(
    uint256 projectId,
    uint256 pricingCurrency,
    uint256 unitCurrency,
    IJBPriceFeed feed
)
    external;
```

## Events
### AddPriceFeed

```solidity
event AddPriceFeed(
    uint256 indexed projectId,
    uint256 indexed pricingCurrency,
    uint256 indexed unitCurrency,
    IJBPriceFeed feed,
    address caller
);
```

