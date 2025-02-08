# JBBuybackHook
[Git Source](https://github.com/Bananapus/nana-buyback-hook/blob/9137c87bcd7400fb4252d57a5052a3c2a4978154/src/JBBuybackHook.sol)

**Inherits:**
JBPermissioned, [IJBBuybackHook](/docs/v4/api/buyback-hook/interfaces/IJBBuybackHook.md)

The buyback hook allows beneficiaries of a payment to a project to either:
- Get tokens by paying the project through its terminal OR
- Buy tokens from the configured Uniswap v3 pool.
Depending on which route would yield more tokens for the beneficiary. The project's reserved rate applies to either
route.

*Compatible with any `JBTerminal` and any project token that can be pooled on Uniswap v3.*

**Note:**
benediction: DEVS BENEDICAT ET PROTEGAT CONTRACTVS MEAM


## State Variables
### MAX_TWAP_SLIPPAGE_TOLERANCE
Projects cannot specify a TWAP slippage tolerance larger than this constant (out of `MAX_SLIPPAGE`).

*This prevents TWAP slippage tolerances so high that they would result in highly unfavorable trade
conditions for the payer unless a quote was specified in the payment metadata.*


```solidity
uint256 public constant override MAX_TWAP_SLIPPAGE_TOLERANCE = 9000;
```


### MIN_TWAP_SLIPPAGE_TOLERANCE
Projects cannot specify a TWAP slippage tolerance smaller than this constant (out of `MAX_SLIPPAGE`).

*This prevents TWAP slippage tolerances so low that the swap always reverts to default behavior unless a
quote is specified in the payment metadata.*


```solidity
uint256 public constant override MIN_TWAP_SLIPPAGE_TOLERANCE = 100;
```


### MAX_TWAP_WINDOW
Projects cannot specify a TWAP window longer than this constant.

*This serves to avoid excessively long TWAP windows that could lead to outdated pricing information and
higher gas costs due to increased computational requirements.*


```solidity
uint256 public constant override MAX_TWAP_WINDOW = 2 days;
```


### MIN_TWAP_WINDOW
Projects cannot specify a TWAP window shorter than this constant.

*This serves to avoid extremely short TWAP windows that could be manipulated or subject to high volatility.*


```solidity
uint256 public constant override MIN_TWAP_WINDOW = 2 minutes;
```


### TWAP_SLIPPAGE_DENOMINATOR
The denominator used when calculating TWAP slippage percent values.


```solidity
uint256 public constant override TWAP_SLIPPAGE_DENOMINATOR = 10_000;
```


### CONTROLLER
The controller used to mint and burn tokens.


```solidity
IJBController public immutable override CONTROLLER;
```


### DIRECTORY
The directory of terminals and controllers.


```solidity
IJBDirectory public immutable override DIRECTORY;
```


### PRICES
The contract that exposes price feeds.


```solidity
IJBPrices public immutable override PRICES;
```


### PROJECTS
The project registry.


```solidity
IJBProjects public immutable override PROJECTS;
```


### UNISWAP_V3_FACTORY
The address of the Uniswap v3 factory. Used to calculate pool addresses.


```solidity
address public immutable override UNISWAP_V3_FACTORY;
```


### WETH
The wETH contract.


```solidity
IWETH9 public immutable override WETH;
```


### poolOf
The Uniswap pool where a given project's token and terminal token pair are traded.


```solidity
mapping(uint256 projectId => mapping(address terminalToken => IUniswapV3Pool)) public override poolOf;
```


### projectTokenOf
The address of each project's token.


```solidity
mapping(uint256 projectId => address) public override projectTokenOf;
```


### _twapParamsOf
The TWAP parameters used for the given project when the payer does not specify a quote.
See the README for further information.

*This includes the TWAP slippage tolerance and TWAP window, packed into a `uint256`.*


```solidity
mapping(uint256 projectId => uint256) internal _twapParamsOf;
```


## Functions
### constructor


```solidity
constructor(
    IJBDirectory directory,
    IJBController controller,
    IJBPrices prices,
    IWETH9 weth,
    address factory
)
    JBPermissioned(IJBPermissioned(address(controller)).PERMISSIONS());
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|The directory of terminals and controllers.|
|`controller`|`IJBController`|The controller used to mint and burn tokens.|
|`prices`|`IJBPrices`|The contract that exposes price feeds.|
|`weth`|`IWETH9`|The WETH contract.|
|`factory`|`address`|The address of the Uniswap v3 factory. Used to calculate pool addresses.|


### beforePayRecordedWith

The `IJBRulesetDataHook` implementation which determines whether tokens should be minted from the
project or bought from the pool.


```solidity
function beforePayRecordedWith(JBBeforePayRecordedContext calldata context)
    external
    view
    override
    returns (uint256 weight, JBPayHookSpecification[] memory hookSpecifications);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforePayRecordedContext`|Payment context passed to the data hook by `terminalStore.recordPaymentFrom(...)`. `context.metadata` can specify a Uniswap quote and specify how much of the payment should be used to swap. If `context.metadata` does not specify a quote, one will be calculated based on the TWAP. If `context.metadata` does not specify how much of the payment should be used, the hook uses the full amount paid in.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The weight to use. If tokens are being minted from the project, this is the original weight. If tokens are being bought from the pool, the weight is 0. If tokens are being minted AND bought from the pool, this weight is adjusted to take both into account.|
|`hookSpecifications`|`JBPayHookSpecification[]`|Specifications containing pay hooks, as well as the amount and metadata to send to them. Fulfilled by the terminal. If tokens are only being minted, `hookSpecifications` will be empty.|


### beforeCashOutRecordedWith

To fulfill the `IJBRulesetDataHook` interface.

*Pass cash out context back to the terminal without changes.*


```solidity
function beforeCashOutRecordedWith(JBBeforeCashOutRecordedContext calldata context)
    external
    pure
    override
    returns (uint256, uint256, uint256, JBCashOutHookSpecification[] memory hookSpecifications);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforeCashOutRecordedContext`|The cash out context passed in by the terminal.|


### hasMintPermissionFor

Required by the `IJBRulesetDataHook` interfaces. Return false to not leak any permissions.


```solidity
function hasMintPermissionFor(uint256, address) external pure override returns (bool);
```

### twapSlippageToleranceOf

Get the TWAP slippage tolerance for a given project ID.

*The "TWAP slippage tolerance" is the maximum negative spread between the TWAP and the expected return from
a swap.
If the expected return unfavourably exceeds the TWAP slippage tolerance, the swap will revert.*


```solidity
function twapSlippageToleranceOf(uint256 projectId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project which the TWAP slippage tolerance applies to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|tolerance The maximum slippage allowed relative to the TWAP, as a percent out of `TWAP_SLIPPAGE_DENOMINATOR`.|


### twapWindowOf

Get the TWAP window for a given project ID.

*The "TWAP window" is the period over which the TWAP is computed.*


```solidity
function twapWindowOf(uint256 projectId) external view override returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project which the TWAP window applies to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|secondsAgo The TWAP window in seconds.|


### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public pure override returns (bool);
```

### _getQuote

Get a quote based on the TWAP, using the TWAP window and slippage tolerance for the specified project.


```solidity
function _getQuote(
    uint256 projectId,
    address projectToken,
    uint256 amountIn,
    address terminalToken
)
    internal
    view
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project which the swap is associated with.|
|`projectToken`|`address`|The project token being swapped for.|
|`amountIn`|`uint256`|The number of terminal tokens being used to swap.|
|`terminalToken`|`address`|The terminal token being paid in and used to swap.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The minimum number of tokens to receive based on the TWAP and its params.|


### afterPayRecordedWith

Swap the specified amount of terminal tokens for project tokens, using any leftover terminal tokens to
mint from the project.

*This function is only called if the minimum return from the swap exceeds the return from minting by paying
the project.
If the swap reverts (due to slippage, insufficient liquidity, or something else),
then the hook mints the number of tokens which a payment to the project would have minted.*


```solidity
function afterPayRecordedWith(JBAfterPayRecordedContext calldata context) external payable override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterPayRecordedContext`|The pay context passed in by the terminal.|


### setPoolFor

Set the pool to use for a given project and terminal token (the default for the project's token
terminal token pair).

*Uses create2 for callback auth and to allow adding pools which haven't been deployed yet.
This can be called by the project's owner or an address which has the `JBPermissionIds.SET_BUYBACK_POOL`
permission from the owner.*


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
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the pool for.|
|`fee`|`uint24`|The fee used in the pool being set, as a fixed-point number of basis points with 2 decimals. A 0.01% fee is `100`, a 0.05% fee is `500`, a 0.3% fee is `3000`, and a 1% fee is `10000`.|
|`twapWindow`|`uint32`|The period of time over which the TWAP is computed.|
|`twapSlippageTolerance`|`uint256`|The maximum spread allowed between the amount received and the TWAP.|
|`terminalToken`|`address`|The address of the terminal token that payments to the project are made in.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newPool`|`IUniswapV3Pool`|The pool that was set for the project and terminal token.|


### setTwapSlippageToleranceOf

Set the TWAP slippage tolerance for a project.
The TWAP slippage tolerance is the maximum spread allowed between the amount received and the TWAP.

*This can be called by the project's owner or an address with `JBPermissionIds.SET_BUYBACK_TWAP`
permission from the owner.*


```solidity
function setTwapSlippageToleranceOf(uint256 projectId, uint256 newSlippageTolerance) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the TWAP slippage tolerance of.|
|`newSlippageTolerance`|`uint256`|The new TWAP slippage tolerance, out of `TWAP_SLIPPAGE_DENOMINATOR`.|


### setTwapWindowOf

Change the TWAP window for a project.
The TWAP window is the period of time over which the TWAP is computed.

*This can be called by the project's owner or an address with `JBPermissionIds.SET_BUYBACK_TWAP`
permission from the owner.*


```solidity
function setTwapWindowOf(uint256 projectId, uint32 newWindow) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the TWAP window of.|
|`newWindow`|`uint32`|The new TWAP window.|


### uniswapV3SwapCallback

The Uniswap v3 pool callback where the token transfer is expected to happen.


```solidity
function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes calldata data) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount0Delta`|`int256`|The amount of token 0 being used for the swap.|
|`amount1Delta`|`int256`|The amount of token 1 being used for the swap.|
|`data`|`bytes`|Data passed in by the swap operation.|


### _swap

Swap the terminal token to receive project tokens.


```solidity
function _swap(
    JBAfterPayRecordedContext calldata context,
    bool projectTokenIs0
)
    internal
    returns (uint256 amountReceived);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterPayRecordedContext`|The `afterPayRecordedContext` passed in by the terminal.|
|`projectTokenIs0`|`bool`|A flag indicating whether the pool references the project token as the first in the pair.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountReceived`|`uint256`|The amount of project tokens received from the swap.|


## Errors
### JBBuybackHook_CallerNotPool

```solidity
error JBBuybackHook_CallerNotPool(address caller);
```

### JBBuybackHook_InsufficientPayAmount

```solidity
error JBBuybackHook_InsufficientPayAmount(uint256 swapAmount, uint256 totalPaid);
```

### JBBuybackHook_InvalidTwapSlippageTolerance

```solidity
error JBBuybackHook_InvalidTwapSlippageTolerance(uint256 value, uint256 min, uint256 max);
```

### JBBuybackHook_InvalidTwapWindow

```solidity
error JBBuybackHook_InvalidTwapWindow(uint256 value, uint256 min, uint256 max);
```

### JBBuybackHook_PoolAlreadySet

```solidity
error JBBuybackHook_PoolAlreadySet(IUniswapV3Pool pool);
```

### JBBuybackHook_SpecifiedSlippageExceeded

```solidity
error JBBuybackHook_SpecifiedSlippageExceeded(uint256 amount, uint256 minimum);
```

### JBBuybackHook_TerminalTokenIsProjectToken

```solidity
error JBBuybackHook_TerminalTokenIsProjectToken(address terminalToken, address projectToken);
```

### JBBuybackHook_Unauthorized

```solidity
error JBBuybackHook_Unauthorized(address caller);
```

### JBBuybackHook_ZeroProjectToken

```solidity
error JBBuybackHook_ZeroProjectToken();
```

### JBBuybackHook_ZeroTerminalToken

```solidity
error JBBuybackHook_ZeroTerminalToken();
```

