# IJBGenericBuybackDelegate

[Git Source](https://github.com/jbx-protocol/juice-buyback/blob/9188f091347816c201097ae704fbf2c66b22d495/contracts/interfaces/IJBGenericBuybackDelegate.sol)

Inherits: [`IJBPayDelegate3_1_1`](/docs/dev/api/interfaces/ijbpaydelegate3_1_1.md), [`IJBFundingCycleDataSource3_1_1`](/docs/dev/api/interfaces/ijbfundingcycledatasource3_1_1.md), [`IUniswapV3SwapCallback`](https://docs.uniswap.org/contracts/v3/reference/core/interfaces/callback/IUniswapV3SwapCallback)

## Functions

### SLIPPAGE_DENOMINATOR

```solidity
function SLIPPAGE_DENOMINATOR() external view returns (uint256);
```

### MIN_TWAP_DELTA

```solidity
function MIN_TWAP_DELTA() external view returns (uint256);
```

### MAX_TWAP_DELTA

```solidity
function MAX_TWAP_DELTA() external view returns (uint256);
```

### MIN_SECONDS_AGO

```solidity
function MIN_SECONDS_AGO() external view returns (uint256);
```

### MAX_SECONDS_AGO

```solidity
function MAX_SECONDS_AGO() external view returns (uint256);
```

### UNISWAP_V3_FACTORY

```solidity
function UNISWAP_V3_FACTORY() external view returns (address);
```

### DIRECTORY

```solidity
function DIRECTORY() external view returns (IJBDirectory);
```

### CONTROLLER

```solidity
function CONTROLLER() external view returns (IJBController3_1);
```

### PROJECTS

```solidity
function PROJECTS() external view returns (IJBProjects);
```

### WETH

```solidity
function WETH() external view returns (IWETH9);
```

### delegateId

```solidity
function delegateId() external view returns (bytes4);
```

### poolOf

```solidity
function poolOf(uint256 _projectId, address _terminalToken) external view returns (IUniswapV3Pool _pool);
```

### secondsAgoOf

```solidity
function secondsAgoOf(uint256 _projectId) external view returns (uint32 _seconds);
```

### twapDeltaOf

```solidity
function twapDeltaOf(uint256 _projectId) external view returns (uint256 _delta);
```

### projectTokenOf

```solidity
function projectTokenOf(uint256 _projectId) external view returns (address projectTokenOf);
```

### sweepBalanceOf

```solidity
function sweepBalanceOf(address _beneficiary, address _token) external view returns (uint256 _balance);
```

### totalSweepBalance

```solidity
function totalSweepBalance(address _token) external view returns (uint256 _contractBalance);
```

### setPoolFor

```solidity
function setPoolFor(uint256 _projectId, uint24 _fee, uint32 _secondsAgo, uint256 _twapDelta, address _terminalToken)
    external
    returns (IUniswapV3Pool _newPool);
```

### changeSecondsAgo

```solidity
function changeSecondsAgo(uint256 _projectId, uint32 _newSecondsAgo) external;
```

### setTwapDelta

```solidity
function setTwapDelta(uint256 _projectId, uint256 _newDelta) external;
```

### sweep

```solidity
function sweep(address _beneficiary, address _token) external;
```

## Events

### BuybackDelegate_Swap

```solidity
event BuybackDelegate_Swap(uint256 indexed projectId, uint256 amountEth, uint256 amountOut);
```

### BuybackDelegate_Mint

```solidity
event BuybackDelegate_Mint(uint256 indexed projectId);
```

### BuybackDelegate_SecondsAgoChanged

```solidity
event BuybackDelegate_SecondsAgoChanged(uint256 indexed projectId, uint256 oldSecondsAgo, uint256 newSecondsAgo);
```

### BuybackDelegate_TwapDeltaChanged

```solidity
event BuybackDelegate_TwapDeltaChanged(uint256 indexed projectId, uint256 oldTwapDelta, uint256 newTwapDelta);
```

### BuybackDelegate_PendingSweep

```solidity
event BuybackDelegate_PendingSweep(address indexed beneficiary, address indexed token, uint256 amount);
```

### BuybackDelegate_PoolAdded

```solidity
event BuybackDelegate_PoolAdded(uint256 indexed projectId, address indexed terminalToken, address newPool);
```

## Errors

### JuiceBuyback_MaximumSlippage

```solidity
error JuiceBuyback_MaximumSlippage();
```

### JuiceBuyback_NewSecondsAgoTooLow

```solidity
error JuiceBuyback_NewSecondsAgoTooLow();
```

### JuiceBuyback_NoProjectToken

```solidity
error JuiceBuyback_NoProjectToken();
```

### JuiceBuyback_PoolAlreadySet

```solidity
error JuiceBuyback_PoolAlreadySet();
```

### JuiceBuyback_TransferFailed

```solidity
error JuiceBuyback_TransferFailed();
```

### JuiceBuyback_InvalidTwapDelta

```solidity
error JuiceBuyback_InvalidTwapDelta();
```

### JuiceBuyback_InvalidTwapPeriod

```solidity
error JuiceBuyback_InvalidTwapPeriod();
```

### JuiceBuyback_Unauthorized

```solidity
error JuiceBuyback_Unauthorized();
```
