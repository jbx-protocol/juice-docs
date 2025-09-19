# IJBBuybackHook
[Git Source](https://github.com/Bananapus/nana-buyback-hook/blob/9137c87bcd7400fb4252d57a5052a3c2a4978154/src/interfaces/IJBBuybackHook.sol)

**Inherits:**
IJBPayHook, IJBRulesetDataHook, IUniswapV3SwapCallback


## Functions
### CONTROLLER


```solidity
function CONTROLLER() external view returns (IJBController);
```

### DIRECTORY


```solidity
function DIRECTORY() external view returns (IJBDirectory);
```

### PRICES


```solidity
function PRICES() external view returns (IJBPrices);
```

### MAX_TWAP_SLIPPAGE_TOLERANCE


```solidity
function MAX_TWAP_SLIPPAGE_TOLERANCE() external view returns (uint256);
```

### MIN_TWAP_SLIPPAGE_TOLERANCE


```solidity
function MIN_TWAP_SLIPPAGE_TOLERANCE() external view returns (uint256);
```

### MAX_TWAP_WINDOW


```solidity
function MAX_TWAP_WINDOW() external view returns (uint256);
```

### MIN_TWAP_WINDOW


```solidity
function MIN_TWAP_WINDOW() external view returns (uint256);
```

### TWAP_SLIPPAGE_DENOMINATOR


```solidity
function TWAP_SLIPPAGE_DENOMINATOR() external view returns (uint256);
```

### PROJECTS


```solidity
function PROJECTS() external view returns (IJBProjects);
```

### UNISWAP_V3_FACTORY


```solidity
function UNISWAP_V3_FACTORY() external view returns (address);
```

### WETH


```solidity
function WETH() external view returns (IWETH9);
```

### poolOf


```solidity
function poolOf(uint256 projectId, address terminalToken) external view returns (IUniswapV3Pool pool);
```

### projectTokenOf


```solidity
function projectTokenOf(uint256 projectId) external view returns (address projectTokenOf);
```

### twapSlippageToleranceOf


```solidity
function twapSlippageToleranceOf(uint256 projectId) external view returns (uint256 slippageTolerance);
```

### twapWindowOf


```solidity
function twapWindowOf(uint256 projectId) external view returns (uint32 window);
```

### setPoolFor


```solidity
function setPoolFor(
    uint256 projectId,
    uint24 fee,
    uint32 twapWindow,
    uint256 twapSlippageTolerance,
    address terminalToken
)
    external
    returns (IUniswapV3Pool newPool);
```

### setTwapSlippageToleranceOf


```solidity
function setTwapSlippageToleranceOf(uint256 projectId, uint256 newSlippageTolerance) external;
```

### setTwapWindowOf


```solidity
function setTwapWindowOf(uint256 projectId, uint32 newWindow) external;
```

## Events
### Swap

```solidity
event Swap(
    uint256 indexed projectId, uint256 amountToSwapWith, IUniswapV3Pool pool, uint256 amountReceived, address caller
);
```

### Mint

```solidity
event Mint(uint256 indexed projectId, uint256 leftoverAmount, uint256 tokenCount, address caller);
```

### PoolAdded

```solidity
event PoolAdded(uint256 indexed projectId, address indexed terminalToken, address pool, address caller);
```

### TwapWindowChanged

```solidity
event TwapWindowChanged(uint256 indexed projectId, uint256 oldWindow, uint256 newWindow, address caller);
```

### TwapSlippageToleranceChanged

```solidity
event TwapSlippageToleranceChanged(
    uint256 indexed projectId, uint256 oldTolerance, uint256 newTolerance, address caller
);
```

