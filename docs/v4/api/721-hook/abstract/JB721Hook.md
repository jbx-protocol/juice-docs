# JB721Hook
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/abstract/JB721Hook.sol)

**Inherits:**
[ERC721](/docs/v4/api/721-hook/abstract/ERC721.md), [IJB721Hook](/docs/v4/api/721-hook/interfaces/IJB721Hook.md)

When a project which uses this hook is paid, this hook may mint NFTs to the payer, depending on this hook's
setup, the amount paid, and information specified by the payer. The project's owner can enable NFT cash outs.
through this hook, allowing the NFT holders to burn their NFTs to reclaim funds from the project (in proportion to
the NFT's price).


## State Variables
### DIRECTORY
The directory of terminals and controllers for projects.


```solidity
IJBDirectory public immutable override DIRECTORY;
```


### METADATA_ID_TARGET
The ID used when parsing metadata.


```solidity
address public immutable override METADATA_ID_TARGET;
```


### PROJECT_ID
The ID of the project that this contract is associated with.


```solidity
uint256 public override PROJECT_ID;
```


## Functions
### constructor


```solidity
constructor(IJBDirectory directory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|A directory of terminals and controllers for projects.|


### beforePayRecordedWith

The data calculated before a payment is recorded in the terminal store. This data is provided to the
terminal's `pay(...)` transaction.

*Sets this contract as the pay hook. Part of `IJBRulesetDataHook`.*


```solidity
function beforePayRecordedWith(JBBeforePayRecordedContext calldata context)
    public
    view
    virtual
    override
    returns (uint256 weight, JBPayHookSpecification[] memory hookSpecifications);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforePayRecordedContext`|The payment context passed to this contract by the `pay(...)` function.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The new `weight` to use, overriding the ruleset's `weight`.|
|`hookSpecifications`|`JBPayHookSpecification[]`|The amount and data to send to pay hooks (this contract) instead of adding to the terminal's balance.|


### beforeCashOutRecordedWith

The data calculated before a cash out is recorded in the terminal store. This data is provided to the
terminal's `cashOutTokensOf(...)` transaction.

*Sets this contract as the cash out hook. Part of `IJBRulesetDataHook`.*

*This function is used for NFT cash outs, and will only be called if the project's ruleset has
`useDataHookForCashOut` set to `true`.*


```solidity
function beforeCashOutRecordedWith(JBBeforeCashOutRecordedContext calldata context)
    public
    view
    virtual
    override
    returns (
        uint256 cashOutTaxRate,
        uint256 cashOutCount,
        uint256 totalSupply,
        JBCashOutHookSpecification[] memory hookSpecifications
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforeCashOutRecordedContext`|The cash out context passed to this contract by the `cashOutTokensOf(...)` function.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`cashOutTaxRate`|`uint256`|The cash out tax rate influencing the reclaim amount.|
|`cashOutCount`|`uint256`|The amount of tokens that should be considered cashed out.|
|`totalSupply`|`uint256`|The total amount of tokens that are considered to be existing.|
|`hookSpecifications`|`JBCashOutHookSpecification[]`|The amount and data to send to cash out hooks (this contract) instead of returning to the beneficiary.|


### hasMintPermissionFor

Required by the IJBRulesetDataHook interfaces. Return false to not leak any permissions.


```solidity
function hasMintPermissionFor(uint256, address) external pure returns (bool);
```

### cashOutWeightOf

Returns the cumulative cash out weight of the specified token IDs relative to the
`totalCashOutWeight`.


```solidity
function cashOutWeightOf(
    uint256[] memory tokenIds,
    JBBeforeCashOutRecordedContext calldata context
)
    public
    view
    virtual
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The NFT token IDs to calculate the cumulative cash out weight of.|
|`context`|`JBBeforeCashOutRecordedContext`|The cash out context passed to this contract by the `cashOutTokensOf(...)` function.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The cumulative cash out weight of the specified token IDs.|


### supportsInterface

Indicates if this contract adheres to the specified interface.

*See [IERC165-supportsInterface](/docs/v4/api/721-hook/JB721TiersHook.md#supportsinterface).*


```solidity
function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC721, IERC165) returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherence to.|


### totalCashOutWeight

Calculates the cumulative cash out weight of all NFT token IDs.


```solidity
function totalCashOutWeight(JBBeforeCashOutRecordedContext calldata context) public view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforeCashOutRecordedContext`|The cash out context passed to this contract by the `cashOutTokensOf(...)` function.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total cumulative cash out weight of all NFT token IDs.|


### _initialize

Initializes the contract by associating it with a project and adding ERC721 details.


```solidity
function _initialize(uint256 projectId, string memory name, string memory symbol) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project that this contract is associated with.|
|`name`|`string`|The name of the NFT collection.|
|`symbol`|`string`|The symbol representing the NFT collection.|


### afterPayRecordedWith

Mints one or more NFTs to the `context.benficiary` upon payment if conditions are met. Part of
`IJBPayHook`.

*Reverts if the calling contract is not one of the project's terminals.*


```solidity
function afterPayRecordedWith(JBAfterPayRecordedContext calldata context) external payable virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterPayRecordedContext`|The payment context passed in by the terminal.|


### afterCashOutRecordedWith

Burns the specified NFTs upon token holder cash out, reclaiming funds from the project's balance for
`context.beneficiary`. Part of `IJBCashOutHook`.

*Reverts if the calling contract is not one of the project's terminals.*


```solidity
function afterCashOutRecordedWith(JBAfterCashOutRecordedContext calldata context) external payable virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterCashOutRecordedContext`|The cash out context passed in by the terminal.|


### _didBurn

Executes after NFTs have been burned via cash out.


```solidity
function _didBurn(uint256[] memory tokenIds) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|The token IDs of the NFTs that were burned.|


### _processPayment

Process a received payment.


```solidity
function _processPayment(JBAfterPayRecordedContext calldata context) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAfterPayRecordedContext`|The payment context passed in by the terminal.|


## Errors
### JB721Hook_InvalidPay

```solidity
error JB721Hook_InvalidPay();
```

### JB721Hook_InvalidCashOut

```solidity
error JB721Hook_InvalidCashOut();
```

### JB721Hook_UnauthorizedToken

```solidity
error JB721Hook_UnauthorizedToken(uint256 tokenId, address holder);
```

### JB721Hook_UnexpectedTokenCashedOut

```solidity
error JB721Hook_UnexpectedTokenCashedOut();
```

