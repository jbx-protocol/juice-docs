# JBGenericBuybackDelegate

[Git Source](https://github.com/jbx-protocol/juice-buyback/blob/9188f091347816c201097ae704fbf2c66b22d495/contracts/JBGenericBuybackDelegate.sol)

Mainnet: [`0x6B700b54BBf7A93f453fFBF58Df0fE1ab2AADA08`](https://etherscan.io/address/0x6B700b54BBf7A93f453fFBF58Df0fE1ab2AADA08)

Goerli: [`0x31682096474BFD6704992b7C5f993639E372900e`](https://goerli.etherscan.io/address/0x31682096474BFD6704992b7C5f993639E372900e)

Inherits: [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165), [`JBOperatable`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/README.md), [`IJBGenericBuybackDelegate`](/docs/dev/v3/extensions/juice-buyback/interfaces/ijbgenericbuybackdelegate.md)

Datasource and delegate allowing pay beneficiary to get the highest amount of project tokens between minting using the project weigh and swapping in a given Uniswap V3 pool.

*This supports any terminal and token, as well as any number of projects using it.*

## State Variables

### SLIPPAGE_DENOMINATOR

The unit of the max slippage (expressed in 1/10000th)

```solidity
uint256 public constant SLIPPAGE_DENOMINATOR = 10000;
```

### MIN_TWAP_DELTA

The minimum twap deviation allowed (0.1%, in 1/10000th)

This is to avoid bypassing the swap when a quote is not provided (ie in fees/automated pay)

```solidity
uint256 public constant MIN_TWAP_DELTA = 100;
```

### MAX_TWAP_DELTA

The minimmaximum twap deviation allowed (9%, in 1/10000th)

This is to avoid bypassing the swap when a quote is not provided (ie in fees/automated pay)

```solidity
uint256 public constant MAX_TWAP_DELTA = 9000;
```

### MIN_SECONDS_AGO

The smallest TWAP period allowed, in seconds.

_This is to avoid having a too short twap, prone to pool manipulation_

```solidity
uint256 public constant MIN_SECONDS_AGO = 2 minutes;
```

### MAX_SECONDS_AGO

The biggest TWAP period allowed, in seconds.

_This is to avoid having a too long twap, bypassing the swap_

```solidity
uint256 public constant MAX_SECONDS_AGO = 2 days;
```

### UNISWAP_V3_FACTORY

The uniswap v3 factory

```solidity
address public immutable UNISWAP_V3_FACTORY;
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

### PROJECTS

The project registry

```solidity
IJBProjects public immutable PROJECTS;
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

### poolOf

The uniswap pool corresponding to the project token-terminal token market
(this should be carefully chosen liquidity wise)

```solidity
mapping(uint256 _projectId => mapping(address _terminalToken => IUniswapV3Pool _pool)) public poolOf;
```

### projectTokenOf

The project token

```solidity
mapping(uint256 _projectId => address projectTokenOf) public projectTokenOf;
```

### sweepBalanceOf

Any ETH left-over in this contract (from swap in the end of liquidity range)

```solidity
mapping(address _beneficiary => mapping(address _token => uint256 _balance)) public sweepBalanceOf;
```

### totalSweepBalance

Running cumulative sum of token left-over

```solidity
mapping(address _token => uint256 _contractBalance) public totalSweepBalance;
```

### twapParamsOf

The twap max deviation acepted (in 10_000th) and timeframe to use for the pool twap (from secondAgo to now)

_Params are uint128 and uint32 packed in a uint256, with the max deviation in the 128 most significant bits_

```solidity
mapping(uint256 _projectId => uint256 _params) internal twapParamsOf;
```

## Functions

### constructor

_No other logic besides initializing the immutables_

```solidity
constructor(IWETH9 _weth, address _factory, IJBDirectory _directory, IJBController3_1 _controller, bytes4 _delegateId)
    JBOperatable(IJBOperatable(address(_controller)).operatorStore());
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
| `_data` | [`JBPayParamsData`](/docs/dev/v3/api/data-structures/jbpayparamsdata.md) | the data passed to the data source in terminal.pay(..). \_data.metadata need to have the Uniswap quote this quote should be set as 0 if the user wants to use the vanilla minting path |

**Returns**

| Name                  | Type                                                                                              | Description                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `weight`              | `uint256`                                                                                         | the weight to use (the one passed if not max reserved rate, 0 if swapping or the one corresponding to the reserved token to mint if minting) |
| `memo`                | `string`                                                                                          | the original memo passed                                                                                                                     |
| `delegateAllocations` | [`JBPayDelegateAllocation3_1_1[]`](/docs/dev/v3/api/data-structures/jbpaydelegateallocation3_1_1.md) | The amount to send to delegates instead of adding to the local balance.                                                                      |

### secondsAgoOf

The timeframe to use for the pool twap (from secondAgo to now)

```solidity
function secondsAgoOf(uint256 _projectId) external view returns (uint32);
```

**Parameters**

| Name         | Type      | Description    |
| ------------ | --------- | -------------- |
| `_projectId` | `uint256` | the project id |

**Returns**

| Name     | Type     | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| `<none>` | `uint32` | \_secondsAgo the period over which the twap is computed |

### twapDeltaOf

The twap max deviation acepted (in 10_000th)

```solidity
function twapDeltaOf(uint256 _projectId) external view returns (uint256);
```

**Parameters**

| Name         | Type      | Description    |
| ------------ | --------- | -------------- |
| `_projectId` | `uint256` | the project id |

**Returns**

| Name     | Type      | Description                                                            |
| -------- | --------- | ---------------------------------------------------------------------- |
| `<none>` | `uint256` | \_delta the maximum deviation allowed between amount received and twap |

### didPay

Delegate to either swap to the beneficiary or mint to the beneficiary

This delegate is called only if the quote for the swap is bigger than the lowest received when minting. If the swap reverts (slippage, liquidity, etc), the delegate will then mint the same amount of token as if the delegate was not used. If the beneficiary requests non claimed token, the swap is not used (as it is, per definition, claimed token)

```solidity
function didPay(JBDidPayData3_1_1 calldata _data) external payable override;
```

**Parameters**

| Name    | Type                                                                      | Description                              |
| ------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| `_data` | [`JBDidPayData3_1_1`](/docs/dev/v3/api/data-structures/jbdidpaydata3_1_1.md) | the delegate data passed by the terminal |

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
| `_data` | [`JBRedeemParamsData`](/docs/dev/v3/api/data-structures/jbredeemparamsdata.md) | the redeem data passed by the terminal |

### setPoolFor

Add a pool for a given project. This pools the become the default one for a given token project-terminal token

Uses create2 for callback auth and allows adding a pool not deployed yet. This can be called by the project owner or an address having the SET_POOL permission in JBOperatorStore

```solidity
function setPoolFor(uint256 _projectId, uint24 _fee, uint32 _secondsAgo, uint256 _twapDelta, address _terminalToken)
    external
    requirePermission(PROJECTS.ownerOf(_projectId), _projectId, JBBuybackDelegateOperations.CHANGE_POOL)
    returns (IUniswapV3Pool _newPool);
```

**Parameters**

| Name             | Type      | Description                                                    |
| ---------------- | --------- | -------------------------------------------------------------- |
| `_projectId`     | `uint256` | the project id                                                 |
| `_fee`           | `uint24`  | the fee of the pool                                            |
| `_secondsAgo`    | `uint32`  | the period over which the twap is computed                     |
| `_twapDelta`     | `uint256` | the maximum deviation allowed between amount received and twap |
| `_terminalToken` | `address` | the terminal token                                             |

### changeSecondsAgo

Increase the period over which the twap is computed

_This can be called by the project owner or an address having the SET_TWAP_PERIOD permission in JBOperatorStore_

```solidity
function changeSecondsAgo(uint256 _projectId, uint32 _newSecondsAgo)
    external
    requirePermission(PROJECTS.ownerOf(_projectId), _projectId, JBBuybackDelegateOperations.SET_POOL_PARAMS);
```

**Parameters**

| Name             | Type      | Description    |
| ---------------- | --------- | -------------- |
| `_projectId`     | `uint256` |                |
| `_newSecondsAgo` | `uint32`  | the new period |

### setTwapDelta

Set the maximum deviation allowed between amount received and twap

_This can be called by the project owner or an address having the SET_POOL permission in JBOperatorStore_

```solidity
function setTwapDelta(uint256 _projectId, uint256 _newDelta)
    external
    requirePermission(PROJECTS.ownerOf(_projectId), _projectId, JBBuybackDelegateOperations.SET_POOL_PARAMS);
```

**Parameters**

| Name         | Type      | Description                |
| ------------ | --------- | -------------------------- |
| `_projectId` | `uint256` |                            |
| `_newDelta`  | `uint256` | the new delta, in 10_000th |

### sweep

Sweep the token left-over in this contract

```solidity
function sweep(address _beneficiary, address _token) external;
```

### \_getQuote

Get a quote based on twap over a secondsAgo period, taking into account a twapDelta max deviation

```solidity
function _getQuote(uint256 _projectId, IJBPaymentTerminal _terminal, address _projectToken, uint256 _amountIn)
    internal
    view
    returns (uint256 _amountOut);
```

**Parameters**

| Name            | Type                                                                   | Description        |
| --------------- | ---------------------------------------------------------------------- | ------------------ |
| `_projectId`    | `uint256`                                                              |                    |
| `_terminal`     | [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) |                    |
| `_projectToken` | `address`                                                              |                    |
| `_amountIn`     | `uint256`                                                              | the amount to swap |

**Returns**

| Name         | Type      | Description                                       |
| ------------ | --------- | ------------------------------------------------- |
| `_amountOut` | `uint256` | the minimum amount received according to the twap |

### \_swap

Swap the terminal token to receive the project toke_beforeTransferTon

This delegate first receive the whole amount of project token,
then send the non-reserved token to the beneficiary,
then burn the rest of this delegate balance (ie the amount of reserved token),
then mint the same amount as received (this will add the reserved token, following the fc rate)
then burn the difference (ie this delegate balance)
-> End result is having the correct balances (beneficiary and reserve), according to the reserve rate

```solidity
function _swap(JBDidPayData3_1_1 calldata _data, uint256 _minimumReceivedFromSwap, IERC20 _projectToken)
    internal
    returns (uint256 _amountReceived);
```

**Parameters**

| Name                       | Type                                                                      | Description                                      |
| -------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| `_data`                    | [`JBDidPayData3_1_1`](/docs/dev/v3/api/data-structures/jbdidpaydata3_1_1.md) | the didPayData passed by the terminal            |
| `_minimumReceivedFromSwap` | `uint256`                                                                 | the minimum amount received, to prevent slippage |
| `_projectToken`            | `IERC20`                                                                  |                                                  |

### \_mint

Mint the token out, sending back the token in the terminal

```solidity
function _mint(JBDidPayData3_1_1 calldata _data, uint256 _amount) internal;
```

**Parameters**

| Name      | Type                                                                      | Description                           |
| --------- | ------------------------------------------------------------------------- | ------------------------------------- |
| `_data`   | [`JBDidPayData3_1_1`](/docs/dev/v3/api/data-structures/jbdidpaydata3_1_1.md) | the didPayData passed by the terminal |
| `_amount` | `uint256`                                                                 | the amount of token out to mint       |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) public view override(ERC165, IERC165) returns (bool);
```
