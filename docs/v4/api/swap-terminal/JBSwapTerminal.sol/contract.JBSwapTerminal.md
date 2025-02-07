# JBSwapTerminal
[Git Source](https://github.com/Bananapus/nana-swap-terminal/blob/4a28a64a13cddc45d16438f876b10e41975e1a79/src/JBSwapTerminal.sol)

**Inherits:**
JBPermissioned, Ownable, IJBTerminal, IJBPermitTerminal, [IJBSwapTerminal](/docs/v4/api/swap-terminal/interfaces/IJBSwapTerminal.sol/interface.IJBSwapTerminal.md), IUniswapV3SwapCallback

The `JBSwapTerminal` accepts payments in any token. When the `JBSwapTerminal` is paid, it uses a Uniswap
pool to exchange the tokens it received for tokens that another one of its project's terminals can accept. Then, it
pays that terminal with the tokens it got from the pool, forwarding the specified beneficiary to receive any tokens
or NFTs minted by that payment, as well as payment metadata and other arguments.

*To prevent excessive slippage, the user/client can specify a minimum quote and a pool to use in their payment's
metadata using the `JBMetadataResolver` format. If they don't, a quote is calculated for them based on the TWAP
oracle for the project's default pool for that token (set by the project's owner).*

**Notes:**
- metadata-id-used: quoteForSwap and permit2

- benediction: DEVS BENEDICAT ET PROTEGAT CONTRACTVS MEAM


## State Variables
### DEFAULT_PROJECT_ID
The ID to store default values in.


```solidity
uint256 public constant override DEFAULT_PROJECT_ID = 0;
```


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


### SLIPPAGE_DENOMINATOR
The denominator used when calculating TWAP slippage tolerance values.


```solidity
uint160 public constant override SLIPPAGE_DENOMINATOR = 10_000;
```


### MIN_DEFAULT_POOL_CARDINALITY
The minimum cardinality for a pool to be configured as a default pool.

*The cardinality is automatically increased to this number when added as a default pool.*


```solidity
uint16 public constant override MIN_DEFAULT_POOL_CARDINALITY = 10;
```


### DIRECTORY
The directory of terminals and controllers for `PROJECTS`.


```solidity
IJBDirectory public immutable DIRECTORY;
```


### FACTORY
The factory to use for creating new pools

*We rely on "a" factory, vanilla uniswap v3 or potential fork*


```solidity
IUniswapV3Factory public immutable FACTORY;
```


### PERMIT2
The permit2 utility.


```solidity
IPermit2 public immutable PERMIT2;
```


### PROJECTS
Mints ERC-721s that represent project ownership and transfers.


```solidity
IJBProjects public immutable PROJECTS;
```


### TOKEN_OUT
The token which flows out of this terminal (JBConstants.NATIVE_TOKEN for the chain native token)


```solidity
address public immutable TOKEN_OUT;
```


### WETH
The ERC-20 wrapper for the native token.

*"wETH" is used as a generic term throughout, but any native token wrapper can be used.*


```solidity
IWETH9 public immutable WETH;
```


### _OUT_IS_NATIVE_TOKEN
A flag indicating if the token out is the chain native token (eth on mainnet for instance)

*If so, the token out should be unwrapped before being sent to the next terminal*


```solidity
bool internal immutable _OUT_IS_NATIVE_TOKEN;
```


### _accountingContextFor
A mapping which stores accounting contexts to use for a given project ID and token.

*Accounting contexts are set up for a project ID and token when the project's owner uses
`addDefaultPool(...)` for that token.*


```solidity
mapping(uint256 projectId => mapping(address token => JBAccountingContext)) internal _accountingContextFor;
```


### _poolFor
A mapping which stores the default pool to use for a given project ID and token.

*Default pools are set by the project owner with `addDefaultPool(...)`, the project 0 acts as a wildcard*

*Default pools are used when a payer doesn't specify a pool in their payment's metadata.*


```solidity
mapping(uint256 projectId => mapping(address tokenIn => IUniswapV3Pool)) internal _poolFor;
```


### _tokensWithAContext
A mapping which stores the tokens that have an accounting context for a given project ID.

*This is used to retrieve all the accounting contexts for a project ID.*


```solidity
mapping(uint256 projectId => address[]) internal _tokensWithAContext;
```


### _twapParamsOf
The twap params for each project's pools.


```solidity
mapping(uint256 projectId => mapping(IUniswapV3Pool pool => uint256 params)) internal _twapParamsOf;
```


## Functions
### constructor


```solidity
constructor(
    IJBDirectory directory,
    IJBPermissions permissions,
    IJBProjects projects,
    IPermit2 permit2,
    address owner,
    IWETH9 weth,
    address tokenOut,
    IUniswapV3Factory factory
)
    JBPermissioned(permissions)
    Ownable(owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|A contract storing directories of terminals and controllers for each project.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`projects`|`IJBProjects`|A contract which mints ERC-721s that represent project ownership and transfers.|
|`permit2`|`IPermit2`|A permit2 utility.|
|`owner`|`address`|The owner of the contract.|
|`weth`|`IWETH9`|A contract which wraps the native token.|
|`tokenOut`|`address`|The token which flows out of this terminal (JBConstants.NATIVE_TOKEN for the chain native token)|
|`factory`|`IUniswapV3Factory`|A factory which creates Uniswap V3 pools.|


### accountingContextForTokenOf

Get the accounting context for the specified project ID and token.

*Accounting contexts are set up in `addDefaultPool(...)`.*


```solidity
function accountingContextForTokenOf(
    uint256 projectId,
    address token
)
    external
    view
    override
    returns (JBAccountingContext memory context);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to get the accounting context for.|
|`token`|`address`|The address of the token to get the accounting context for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAccountingContext`|A `JBAccountingContext` containing the accounting context for the project ID and token.|


### accountingContextsOf

Return all the accounting contexts for a specified project ID.

*This includes both project-specific and generic accounting contexts, with the project-specific contexts
taking precedence.*


```solidity
function accountingContextsOf(uint256 projectId)
    external
    view
    override
    returns (JBAccountingContext[] memory contexts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to get the accounting contexts for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`contexts`|`JBAccountingContext[]`|An array of `JBAccountingContext` containing the accounting contexts for the project ID.|


### currentSurplusOf

Empty implementation to satisfy the interface. This terminal has no surplus.


```solidity
function currentSurplusOf(
    uint256 projectId,
    JBAccountingContext[] memory accountingContexts,
    uint256 decimals,
    uint256 currency
)
    external
    view
    returns (uint256);
```

### getPoolFor

Returns the default pool for a given project and token or, if a project has no default pool for the
token, the overal default pool for the token


```solidity
function getPoolFor(uint256 projectId, address tokenIn) external view returns (IUniswapV3Pool pool, bool zeroForOne);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to retrieve the default pool for.|
|`tokenIn`|`address`|The address of the token to retrieve the default pool for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`IUniswapV3Pool`|The default pool for the token, or the overall default pool for the token if the|
|`zeroForOne`|`bool`||


### supportsInterface

Indicates if this contract adheres to the specified interface.

*See [IERC165-supportsInterface](https://docs.openzeppelin.com/contracts/2.x/api/introspection#IERC165-supportsInterface-bytes4-).*


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`interfaceId`|`bytes4`|The ID of the interface to check for adherance to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A flag indicating if the provided interface ID is supported.|


### twapParamsOf

Returns the default twap parameters for a given pool project.


```solidity
function twapParamsOf(uint256 projectId, IUniswapV3Pool pool) public view returns (uint32, uint160);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to retrieve TWAP parameters for.|
|`pool`|`IUniswapV3Pool`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|twapWindow The period of time in the past to calculate the TWAP from.|
|`<none>`|`uint160`|slippageTolerance The maximum allowed slippage tolerance when calculating the TWAP, as a fraction out of `SLIPPAGE_DENOMINATOR`.|


### _normalizedTokenOut

Returns the token that flows out of this terminal, wrapped as an ERC-20 if needed.

*If the token out is the chain native token (ETH on mainnet), wrapped ETH is returned*


```solidity
function _normalizedTokenOut() internal view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The token that flows out of this terminal.|


### _pickPoolAndQuote

Picks the pool and quote for the swap.


```solidity
function _pickPoolAndQuote(
    bytes calldata metadata,
    uint256 projectId,
    address normalizedTokenIn,
    uint256 amount,
    address normalizedTokenOut
)
    internal
    view
    returns (uint256 minAmountOut, IUniswapV3Pool pool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`metadata`|`bytes`|The metadata in which `quoteForSwap` context is provided.|
|`projectId`|`uint256`|The ID of the project for which the swap is being performed.|
|`normalizedTokenIn`|`address`|The address of the token being swapped, normalized to the wrapped native token.|
|`amount`|`uint256`|The amount of tokens to swap.|
|`normalizedTokenOut`|`address`|The address of the token to receive from the swap, normalized to the wrapped native token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minAmountOut`|`uint256`|The minimum amount of tokens to receive from the swap.|
|`pool`|`IUniswapV3Pool`|The pool to perform the swap in.|


### addAccountingContextsFor

Empty implementation to satisfy the interface. Accounting contexts are set in `addDefaultPool(...)`.


```solidity
function addAccountingContextsFor(
    uint256 projectId,
    JBAccountingContext[] calldata accountingContexts
)
    external
    override;
```

### addDefaultPool

Set a project's default pool and accounting context for the specified token. Only the project's owner,
an address with `ADD_SWAP_TERMINAL_POOL` permission from the owner or the terminal owner can call this function.

*The pool should have been deployed by the factory associated to this contract. We don't rely on create2
address
as this terminal might be used on other chain, where the factory bytecode might differ or the main dex be a
fork.*


```solidity
function addDefaultPool(uint256 projectId, address token, IUniswapV3Pool pool) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the default pool for. The project 0 acts as a catch-all, where non-set pools are defaulted to.|
|`token`|`address`|The address of the token to set the default pool for.|
|`pool`|`IUniswapV3Pool`|The Uniswap V3 pool to set as the default for the specified token.|


### addToBalanceOf

Accepts funds for a given project, swaps them if necessary, and adds them to the project's balance in
the specified terminal.

*This function handles the token in transfer, potentially swaps the tokens to the desired output token, and
then adds the swapped tokens to the project's balance in the specified terminal.*


```solidity
function addToBalanceOf(
    uint256 projectId,
    address token,
    uint256 amount,
    bool shouldReturnHeldFees,
    string calldata memo,
    bytes calldata metadata
)
    external
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project for which funds are being accepted and added to its balance.|
|`token`|`address`|The address of the token being paid in.|
|`amount`|`uint256`|The amount of tokens being paid in.|
|`shouldReturnHeldFees`|`bool`|A boolean to indicate whether held fees should be returned.|
|`memo`|`string`|A memo to pass along to the emitted event.|
|`metadata`|`bytes`|Bytes in `JBMetadataResolver`'s format which can contain additional data for the swap and adding to balance.|


### addTwapParamsFor

Set the specified project's rules for calculating a quote based on the TWAP. Only the project's owner or
an address with `MODIFY_TWAP_PARAMS` permission from the owner  or the terminal owner can call this function.


```solidity
function addTwapParamsFor(
    uint256 projectId,
    IUniswapV3Pool pool,
    uint256 twapWindow,
    uint256 slippageTolerance
)
    external
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the TWAP-based quote rules for.|
|`pool`|`IUniswapV3Pool`||
|`twapWindow`|`uint256`|The period of time over which the TWAP is calculated, in seconds.|
|`slippageTolerance`|`uint256`|The maximum spread allowed between the amount received and the TWAP (as a fraction out of `SLIPPAGE_DENOMINATOR`).|


### migrateBalanceOf

Empty implementation to satisfy the interface.


```solidity
function migrateBalanceOf(
    uint256 projectId,
    address token,
    IJBTerminal to
)
    external
    override
    returns (uint256 balance);
```

### pay

Pay a project by swapping the incoming tokens for tokens that one of the project's other terminals
accepts, passing along the funds received from the swap and the specified parameters.


```solidity
function pay(
    uint256 projectId,
    address token,
    uint256 amount,
    address beneficiary,
    uint256 minReturnedTokens,
    string calldata memo,
    bytes calldata metadata
)
    external
    payable
    virtual
    override
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project being paid.|
|`token`|`address`|The address of the token being paid in.|
|`amount`|`uint256`|The amount of tokens being paid in, as a fixed point number with the same amount of decimals as the `token`. If `token` is the native token, `amount` is ignored and `msg.value` is used in its place.|
|`beneficiary`|`address`|The beneficiary address to pass along to the other terminal. If the other terminal mints tokens, for example, they will be minted for this address.|
|`minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with the same number of decimals as the other terminal. This value will be passed along to the other terminal.|
|`memo`|`string`|A memo to pass along to the emitted event.|
|`metadata`|`bytes`|Bytes in `JBMetadataResolver`'s format which can contain a quote from the user/client. The quote should contain a minimum amount of tokens to receive from the swap and the pool to use. This metadata is also passed to the other terminal's emitted event, as well as its data hook and pay hook if applicable.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of tokens received from the swap, as a fixed point number with the same amount of decimals as that token.|


### uniswapV3SwapCallback

The Uniswap v3 pool callback where the token transfer is expected to happen.

*Only an uniswap v3 pool can call this function*


```solidity
function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes calldata data) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount0Delta`|`int256`|The amount of token 0 being used for the swap.|
|`amount1Delta`|`int256`|The amount of token 1 being used for the swap.|
|`data`|`bytes`|Data passed in by the swap operation.|


### receive

Fallback to prevent native tokens being sent to this terminal.

*Native tokens should only be sent to this terminal when being unwrapped from a swap.*


```solidity
receive() external payable;
```

### _acceptFundsFor

Accepts a token being paid in.


```solidity
function _acceptFundsFor(address token, uint256 amount, bytes calldata metadata) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token being paid in.|
|`amount`|`uint256`|The amount of tokens being paid in.|
|`metadata`|`bytes`|The metadata in which `permit2` context is provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amount The amount of tokens that have been accepted.|


### _beforeTransferFor

Logic to be triggered before transferring tokens from this terminal.


```solidity
function _beforeTransferFor(address to, address token, uint256 amount) internal virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to transfer tokens to.|
|`token`|`address`|The token being transfered.|
|`amount`|`uint256`|The amount of tokens to transfer, as a fixed point number with the same number of decimals as the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|payValue The amount that'll be paid as a `msg.value`.|


### _handleTokenTransfersAndSwap

Handles token transfers and swaps for a given project.

*This function is responsible for transferring tokens from the sender to this terminal and performing a
swap.*


```solidity
function _handleTokenTransfersAndSwap(
    uint256 projectId,
    address tokenIn,
    uint256 amount,
    bytes calldata metadata
)
    internal
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project for which tokens are being transferred and possibly swapped.|
|`tokenIn`|`address`|The address of the token coming to this terminal.|
|`amount`|`uint256`||
|`metadata`|`bytes`|Additional data to be used in the swap.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amountToSend The amount of tokens to send after the swap, to the next terminal|


### _swap

Swaps tokens based on the provided swap configuration.


```solidity
function _swap(
    address tokenIn,
    uint256 amountIn,
    uint256 minAmountOut,
    bool zeroForOne,
    uint256 projectId,
    IUniswapV3Pool pool
)
    internal
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|The address of the token being swapped.|
|`amountIn`|`uint256`|The amount of tokens to swap.|
|`minAmountOut`|`uint256`|The minimum amount of tokens to receive from the swap.|
|`zeroForOne`|`bool`|The order of the token values being passed into the swap.|
|`projectId`|`uint256`|The ID of the project for which the swap is being performed.|
|`pool`|`IUniswapV3Pool`|The pool to perform the swap in.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The amount of tokens received from the swap.|


### _transferFor

Transfers tokens.


```solidity
function _transferFor(address from, address payable to, address token, uint256 amount) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The address to transfer tokens from.|
|`to`|`address payable`|The address to transfer tokens to.|
|`token`|`address`|The address of the token being transfered.|
|`amount`|`uint256`|The amount of tokens to transfer, as a fixed point number with the same number of decimals as the token.|


## Errors
### JBSwapTerminal_CallerNotPool

```solidity
error JBSwapTerminal_CallerNotPool(address caller);
```

### JBSwapTerminal_InvalidTwapSlippageTolerance

```solidity
error JBSwapTerminal_InvalidTwapSlippageTolerance(
    uint256 slippageTolerance, uint256 minSlippageTolerance, uint256 maxSlippageTolerance
);
```

### JBSwapTerminal_InvalidTwapWindow

```solidity
error JBSwapTerminal_InvalidTwapWindow(uint256 window, uint256 minWindow, uint256 maxWindow);
```

### JBSwapTerminal_SpecifiedSlippageExceeded

```solidity
error JBSwapTerminal_SpecifiedSlippageExceeded(uint256 amount, uint256 minimum);
```

### JBSwapTerminal_NoDefaultPoolDefined

```solidity
error JBSwapTerminal_NoDefaultPoolDefined(uint256 projectId, address token);
```

### JBSwapTerminal_NoMsgValueAllowed

```solidity
error JBSwapTerminal_NoMsgValueAllowed(uint256 value);
```

### JBSwapTerminal_PermitAllowanceNotEnough

```solidity
error JBSwapTerminal_PermitAllowanceNotEnough(uint256 amount, uint256 allowance);
```

### JBSwapTerminal_TokenNotAccepted

```solidity
error JBSwapTerminal_TokenNotAccepted(uint256 projectId, address token);
```

### JBSwapTerminal_UnexpectedCall

```solidity
error JBSwapTerminal_UnexpectedCall(address caller);
```

### JBSwapTerminal_WrongPool

```solidity
error JBSwapTerminal_WrongPool(address pool, address expectedPool);
```

### JBSwapTerminal_ZeroToken

```solidity
error JBSwapTerminal_ZeroToken();
```

