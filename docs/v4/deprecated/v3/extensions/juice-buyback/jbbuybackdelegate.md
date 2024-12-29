# JBBuybackDelegate

[Git Source](https://github.com/jbx-protocol/juice-buyback/blob/9188f091347816c201097ae704fbf2c66b22d495/contracts/JBBuybackDelegate.sol)

Inherits: [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable), [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165), [`JBDelegateMetadataHelper`](/docs/v4/deprecated/v3/extensions/juice-delegate-metadata-lib/jbdelegatemetadatahelper.md), [`IJBFundingCycleDataSource3_1_1`](/docs/v4/deprecated/v3/api/interfaces/ijbfundingcycledatasource3_1_1.md), [`IJBPayDelegate3_1_1`](/docs/v4/deprecated/v3/api/interfaces/ijbpaydelegate3_1_1.md), [`IUniswapV3SwapCallback`](https://docs.uniswap.org/contracts/v3/reference/core/interfaces/callback/IUniswapV3SwapCallback)

Datasource and delegate allowing pay beneficiary to get the highest amount of project tokens between minting using the project weigh and swapping in a given Uniswap V3 pool.

This only supports ETH terminal. The pool is fixed, if a new pool offers deeper liquidity, this delegate needs to be redeployed.

## State Variables

### PROJECT_TOKEN_IS_TOKEN0

Address project token < address terminal token ?

```solidity
bool immutable PROJECT_TOKEN_IS_TOKEN0;
```

### SLIPPAGE_DENOMINATOR

The unit of the max slippage (expressed in 1/10000th)

```solidity
uint256 constant SLIPPAGE_DENOMINATOR = 10000;
```

### PROJECT_TOKEN

The project token address

_In this context, this is the tokenOut_

```solidity
IERC20 public immutable PROJECT_TOKEN;
```

### POOL

The uniswap pool corresponding to the project token-other token market (this should be carefully chosen liquidity wise)

```solidity
IUniswapV3Pool public immutable POOL;
```

### DIRECTORY

The JB Directory

```solidity
IJBDirectory public immutable DIRECTORY;
```

### CONTROLLER

The project controller

```solidity
IJBController3_1 public immutable CONTROLLER;
```

### WETH

The WETH contract

```solidity
IWETH9 public immutable WETH;
```

### delegateId

The 4bytes ID of this delegate, used for metadata parsing

```solidity
bytes4 public immutable delegateId;
```

### secondsAgo

```solidity
uint32 public secondsAgo;
```

### twapDelta

```solidity
uint256 public twapDelta;
```

### sweepBalanceOf

```solidity
mapping(address => uint256) public sweepBalanceOf;
```

### sweepBalance

```solidity
uint256 public sweepBalance;
```

## Functions

### constructor

_No other logic besides initializing the immutables_

```solidity
constructor(
    IERC20 _projectToken,
    IWETH9 _weth,
    address _factory,
    uint24 _fee,
    uint32 _secondsAgo,
    uint256 _twapDelta,
    IJBDirectory _directory,
    IJBController3_1 _controller,
    bytes4 _delegateId
);
```

### payParams

The datasource implementation

```solidity
function payParams(JBPayParamsData calldata _data)
    external
    view
    override
    returns (uint256 weight, string memory memo, JBPayDelegateAllocation3_1_1[] memory delegateAllocations);
```

**Parameters**

| Name    | Type                                                                  | Description                                                                                                                                                                            |
| ------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_data` | [`JBPayParamsData`](/docs/v4/deprecated/v3/api/data-structures/jbpayparamsdata.md) | the data passed to the data source in terminal.pay(..). \_data.metadata need to have the Uniswap quote this quote should be set as 0 if the user wants to use the vanilla minting path |

**Returns**

| Name                  | Type                                                                                              | Description                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `weight`              | `uint256`                                                                                         | the weight to use (the one passed if not max reserved rate, 0 if swapping or the one corresponding to the reserved token to mint if minting) |
| `memo`                | `string`                                                                                          | the original memo passed                                                                                                                     |
| `delegateAllocations` | [`JBPayDelegateAllocation3_1_1[]`](/docs/v4/deprecated/v3/api/data-structures/jbpaydelegateallocation3_1_1.md) | The amount to send to delegates instead of adding to the local balance.                                                                      |

### didPay

Delegate to either swap to the beneficiary or mint to the beneficiary

This delegate is called only if the quote for the swap is bigger than the lowest received when minting. If the swap reverts (slippage, liquidity, etc), the delegate will then mint the same amount of token as if the delegate was not used. If the beneficiary requests non claimed token, the swap is not used (as it is, per definition, claimed token)

```solidity
function didPay(JBDidPayData3_1_1 calldata _data) external payable override;
```

**Parameters**

| Name    | Type                                                                      | Description                              |
| ------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| `_data` | [`JBDidPayData3_1_1`](/docs/v4/deprecated/v3/api/data-structures/jbdidpaydata3_1_1.md) | the delegate data passed by the terminal |

### uniswapV3SwapCallback

The Uniswap V3 pool callback (where token transfer should happens)

_Slippage controle is achieved here_

```solidity
function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes calldata data) external override;
```

### redeemParams

Generic redeem params, for interface completion

_This is a passthrough of the redemption parameters_

```solidity
function redeemParams(JBRedeemParamsData calldata _data)
    external
    pure
    override
    returns (
        uint256 reclaimAmount,
        string memory memo,
        JBRedemptionDelegateAllocation3_1_1[] memory delegateAllocations
    );
```

**Parameters**

| Name    | Type                                                                        | Description                            |
| ------- | --------------------------------------------------------------------------- | -------------------------------------- |
| `_data` | [`JBRedeemParamsData`](/docs/v4/deprecated/v3/api/data-structures/jbredeemparamsdata.md) | the redeem data passed by the terminal |

### increaseSecondsAgo

Increase the period over which the twap is computed

```solidity
function increaseSecondsAgo(uint32 _newSecondsAgo) external onlyOwner;
```

**Parameters**

| Name             | Type     | Description    |
| ---------------- | -------- | -------------- |
| `_newSecondsAgo` | `uint32` | the new period |

### setTwapDelta

Set the maximum deviation allowed between amount received and twap

```solidity
function setTwapDelta(uint256 _newDelta) external onlyOwner;
```

**Parameters**

| Name        | Type      | Description                |
| ----------- | --------- | -------------------------- |
| `_newDelta` | `uint256` | the new delta, in 10_000th |

### sweep

Sweep the eth left-over in this contract

```solidity
function sweep(address _beneficiary) external;
```

### \_getQuote

Get a quote based on twap over a secondsAgo period, taking into account a twapDelta max deviation

```solidity
function _getQuote(uint256 _amountIn) internal view returns (uint256 _amountOut);
```

**Parameters**

| Name        | Type      | Description        |
| ----------- | --------- | ------------------ |
| `_amountIn` | `uint256` | the amount to swap |

**Returns**

| Name         | Type      | Description                                       |
| ------------ | --------- | ------------------------------------------------- |
| `_amountOut` | `uint256` | the minimum amount received according to the twap |

### \_swap

Swap the terminal token to receive the project token `_beforeTransfer`

1. This delegate first receive the whole amount of project token,
2. then send the non-reserved token to the beneficiary,
3. then burn the rest of this delegate balance (ie the amount of reserved token),
4. then mint the same amount as received (this will add the reserved token, following the fc rate)
5. then burn the difference (ie this delegate balance)

-> End result is having the correct balances (beneficiary and reserve), according to the reserve rate

```solidity
function _swap(JBDidPayData3_1_1 calldata _data, uint256 _minimumReceivedFromSwap)
    internal
    returns (uint256 _amountReceived);
```

**Parameters**

| Name                       | Type                                                                      | Description                                      |
| -------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| `_data`                    | [`JBDidPayData3_1_1`](/docs/v4/deprecated/v3/api/data-structures/jbdidpaydata3_1_1.md) | the didPayData passed by the terminal            |
| `_minimumReceivedFromSwap` | `uint256`                                                                 | the minimum amount received, to prevent slippage |

### \_mint

Mint the token out, sending back the token in the terminal

```solidity
function _mint(JBDidPayData3_1_1 calldata _data, uint256 _amount) internal;
```

**Parameters**

| Name      | Type                                                                      | Description                           |
| --------- | ------------------------------------------------------------------------- | ------------------------------------- |
| `_data`   | [`JBDidPayData3_1_1`](/docs/v4/deprecated/v3/api/data-structures/jbdidpaydata3_1_1.md) | the didPayData passed by the terminal |
| `_amount` | `uint256`                                                                 | the amount of token out to mint       |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) public view override(ERC165, IERC165) returns (bool);
```

## Events

### BuybackDelegate_Swap

```solidity
event BuybackDelegate_Swap(uint256 projectId, uint256 amountEth, uint256 amountOut);
```

### BuybackDelegate_Mint

```solidity
event BuybackDelegate_Mint(uint256 projectId);
```

### BuybackDelegate_SecondsAgoIncrease

```solidity
event BuybackDelegate_SecondsAgoIncrease(uint256 oldSecondsAgo, uint256 newSecondsAgo);
```

### BuybackDelegate_TwapDeltaChanged

```solidity
event BuybackDelegate_TwapDeltaChanged(uint256 oldTwapDelta, uint256 newTwapDelta);
```

### BuybackDelegate_PendingSweep

```solidity
event BuybackDelegate_PendingSweep(address indexed beneficiary, uint256 amount);
```

## Errors

### JuiceBuyback_Unauthorized

```solidity
error JuiceBuyback_Unauthorized();
```

### JuiceBuyback_MaximumSlippage

```solidity
error JuiceBuyback_MaximumSlippage();
```

### JuiceBuyback_NewSecondsAgoTooLow

```solidity
error JuiceBuyback_NewSecondsAgoTooLow();
```

### JuiceBuyback_TransferFailed

```solidity
error JuiceBuyback_TransferFailed();
```
