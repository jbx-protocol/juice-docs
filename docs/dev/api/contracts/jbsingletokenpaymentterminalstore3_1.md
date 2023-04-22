---
sidebar_position: 9
---

# JBSingleTokenPaymentTerminalStore3_1

Manages all bookkeeping for inflows and outflows of funds from any [`IJBSingleTokenPaymentTerminal`](/dev/api/interfaces/ijbsingletokenpaymentterminal/).

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/JBSingleTokenPaymentTerminalStore3_1.sol)

Mainnet: [`0x77b0A81AeB61d08C0b23c739969d22c5C9950336`](https://etherscan.io/address/0x77b0A81AeB61d08C0b23c739969d22c5C9950336)

Goerli: [`0x101cA528F6c2E35664529eB8aa0419Ae1f724b49`](https://goerli.etherscan.io/address/0x101cA528F6c2E35664529eB8aa0419Ae1f724b49)

Inherits: [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard), [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore/)

Adheres to:

- [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore/): General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

Inherits from:

- [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard): Contract module that helps prevent reentrant calls to a function.

This Store expects a project's controller to be an [`IJBController3_1`](/dev/api/interfaces/ijbcontroller3_1/). This is the only difference between this version and [the original](/dev/api/contracts/jbsingletokenpaymentterminalstore/).

## State Variables

### _MAX_FIXED_POINT_FIDELITY

Ensures a maximum number of decimal points of persisted fidelity on mulDiv operations of fixed point numbers.

```solidity
uint256 private constant _MAX_FIXED_POINT_FIDELITY = 18;
```

### directory

The directory of terminals and controllers for projects.

```solidity
IJBDirectory public immutable override directory;
```

### fundingCycleStore

The contract storing all funding cycle configurations.

```solidity
IJBFundingCycleStore public immutable override fundingCycleStore;
```

### prices

The contract that exposes price feeds.

```solidity
IJBPrices public immutable override prices;
```

### balanceOf

The amount of tokens that each project has for each terminal, in terms of the terminal's token.

The used distribution limit is represented as a fixed point number with the same amount of decimals as its relative terminal.
- _terminal The terminal to which the balance applies.
- _projectId The ID of the project to get the balance of.

```solidity
mapping(IJBSingleTokenPaymentTerminal => mapping(uint256 => uint256)) public override balanceOf;
```

### usedDistributionLimitOf

The amount of funds that a project has distributed from its limit during the current funding cycle for each terminal, in terms of the distribution limit's currency.

Increases as projects use their preconfigured distribution limits.

The used distribution limit is represented as a fixed point number with the same amount of decimals as its relative terminal.

- _terminal The terminal to which the used distribution limit applies.
- _projectId The ID of the project to get the used distribution limit of.
- _fundingCycleNumber The number of the funding cycle during which the distribution limit was used.

```solidity
mapping(IJBSingleTokenPaymentTerminal => mapping(uint256 => mapping(uint256 => uint256))) public override
    usedDistributionLimitOf;
```

### usedOverflowAllowanceOf

The amount of funds that a project has used from its allowance during the current funding cycle configuration for each terminal, in terms of the overflow allowance's currency.

Increases as projects use their allowance.

The used allowance is represented as a fixed point number with the same amount of decimals as its relative terminal.

- _terminal The terminal to which the overflow allowance applies.
- _projectId The ID of the project to get the used overflow allowance of.
- _configuration The configuration of the during which the allowance was used.

```solidity
mapping(IJBSingleTokenPaymentTerminal => mapping(uint256 => mapping(uint256 => uint256))) public override
    usedOverflowAllowanceOf;
```

## Functions

### currentOverflowOf

Gets the current overflowed amount in a terminal for a specified project.

The current overflow is represented as a fixed point number with the same amount of decimals as the specified terminal.

```solidity
function currentOverflowOf(IJBSingleTokenPaymentTerminal _terminal, uint256 _projectId)
    external
    view
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminal`|[`IJBSingleTokenPaymentTerminal`](docs/dev/api/interfaces/ijbsingletokenpaymentterminal.md)|The terminal for which the overflow is being calculated.|
|`_projectId`|`uint256`|The ID of the project to get overflow for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current amount of overflow that project has in the specified terminal.|

### currentTotalOverflowOf

Gets the current overflowed amount for a specified project across all terminals.

```solidity
function currentTotalOverflowOf(uint256 _projectId, uint256 _decimals, uint256 _currency)
    external
    view
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get total overflow for.|
|`_decimals`|`uint256`|The number of decimals that the fixed point overflow should include.|
|`_currency`|`uint256`|The currency that the total overflow should be in terms of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current total amount of overflow that project has across all terminals.|

### currentReclaimableOverflowOf

The current amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens, using the total token supply and overflow in the ecosystem.

If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used.

The current reclaimable overflow is returned in terms of the specified terminal's currency.

The reclaimable overflow is represented as a fixed point number with the same amount of decimals as the specified terminal.

```solidity
function currentReclaimableOverflowOf(
    IJBSingleTokenPaymentTerminal _terminal,
    uint256 _projectId,
    uint256 _tokenCount,
    bool _useTotalOverflow
) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminal`|[`IJBSingleTokenPaymentTerminal`](docs/dev/api/interfaces/ijbsingletokenpaymentterminal.md)|The terminal from which the reclaimable amount would come.|
|`_projectId`|`uint256`|The ID of the project to get the reclaimable overflow amount for.|
|`_tokenCount`|`uint256`|The number of tokens to make the calculation with, as a fixed point number with 18 decimals.|
|`_useTotalOverflow`|`bool`|A flag indicating whether the overflow used in the calculation should be summed from all of the project's terminals. If false, overflow should be limited to the amount in the specified `_terminal`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the provided `_terminal`.|

### currentReclaimableOverflowOf

The current amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens, using the specified total token supply and overflow amounts.

If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used.

```solidity
function currentReclaimableOverflowOf(uint256 _projectId, uint256 _tokenCount, uint256 _totalSupply, uint256 _overflow)
    external
    view
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get the reclaimable overflow amount for.|
|`_tokenCount`|`uint256`|The number of tokens to make the calculation with, as a fixed point number with 18 decimals.|
|`_totalSupply`|`uint256`|The total number of tokens to make the calculation with, as a fixed point number with 18 decimals.|
|`_overflow`|`uint256`|The amount of overflow to make the calculation with, as a fixed point number.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the provided `_overflow`.|

### constructor

```solidity
constructor(IJBDirectory _directory, IJBFundingCycleStore _fundingCycleStore, IJBPrices _prices);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](docs/dev/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|
|`_fundingCycleStore`|[`IJBFundingCycleStore`](docs/dev/api/interfaces/ijbfundingcyclestore.md)|A contract storing all funding cycle configurations.|
|`_prices`|[`IJBPrices`](docs/dev/api/interfaces/ijbprices.md)|A contract that exposes price feeds.|

### recordPaymentFrom

Records newly contributed tokens to a project.

Mints the project's tokens according to values provided by a configured data source. If no data source is configured, mints tokens proportional to the amount of the contribution.

The msg.sender must be an IJBSingleTokenPaymentTerminal. The amount specified in the params is in terms of the msg.sender's tokens.

```solidity
function recordPaymentFrom(
    address _payer,
    JBTokenAmount calldata _amount,
    uint256 _projectId,
    uint256 _baseWeightCurrency,
    address _beneficiary,
    string calldata _memo,
    bytes memory _metadata
)
    external
    override
    nonReentrant
    returns (
        JBFundingCycle memory fundingCycle,
        uint256 tokenCount,
        JBPayDelegateAllocation[] memory delegateAllocations,
        string memory memo
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_payer`|`address`|The original address that sent the payment to the terminal.|
|`_amount`|[`JBTokenAmount`](docs/dev/api/data-structures/jbtokenamount.md)|The amount of tokens being paid. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.|
|`_projectId`|`uint256`|The ID of the project being paid.|
|`_baseWeightCurrency`|`uint256`|The currency to base token issuance on.|
|`_beneficiary`|`address`|The specified address that should be the beneficiary of anything that results from the payment.|
|`_memo`|`string`|A memo to pass along to the emitted event, and passed along to the funding cycle's data source.|
|`_metadata`|`bytes`|Bytes to send along to the data source, if one is provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The project's funding cycle during which payment was made.|
|`tokenCount`|`uint256`|The number of project tokens that were minted, as a fixed point number with 18 decimals.|
|`delegateAllocations`|[`JBPayDelegateAllocation[]`](docs/dev/api/data-structures/jbpaydelegateallocation.md)|The amount to send to delegates instead of adding to the local balance.|
|`memo`|`string`|A memo that should be passed along to the emitted event.|

### recordRedemptionFor

Records newly redeemed tokens of a project.

Redeems the project's tokens according to values provided by a configured data source. If no data source is configured, redeems tokens along a redemption bonding curve that is a function of the number of tokens being burned.

The msg.sender must be an IJBSingleTokenPaymentTerminal. The amount specified in the params is in terms of the msg.senders tokens.

```solidity
function recordRedemptionFor(
    address _holder,
    uint256 _projectId,
    uint256 _tokenCount,
    string memory _memo,
    bytes memory _metadata
)
    external
    override
    nonReentrant
    returns (
        JBFundingCycle memory fundingCycle,
        uint256 reclaimAmount,
        JBRedemptionDelegateAllocation[] memory delegateAllocations,
        string memory memo
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The account that is having its tokens redeemed.|
|`_projectId`|`uint256`|The ID of the project to which the tokens being redeemed belong.|
|`_tokenCount`|`uint256`|The number of project tokens to redeem, as a fixed point number with 18 decimals.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Bytes to send along to the data source, if one is provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The funding cycle during which the redemption was made.|
|`reclaimAmount`|`uint256`|The amount of terminal tokens reclaimed, as a fixed point number with 18 decimals.|
|`delegateAllocations`|[`JBRedemptionDelegateAllocation[]`](docs/dev/api/data-structures/jbredemptiondelegateallocation.md)|The amount to send to delegates instead of sending to the beneficiary.|
|`memo`|`string`|A memo that should be passed along to the emitted event.|

### recordDistributionFor

Records newly distributed funds for a project.

The msg.sender must be an IJBSingleTokenPaymentTerminal.

```solidity
function recordDistributionFor(uint256 _projectId, uint256 _amount, uint256 _currency)
    external
    override
    nonReentrant
    returns (JBFundingCycle memory fundingCycle, uint256 distributedAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is having funds distributed.|
|`_amount`|`uint256`|The amount to use from the distribution limit, as a fixed point number.|
|`_currency`|`uint256`|The currency of the `_amount`. This must match the project's current funding cycle's currency.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The funding cycle during which the distribution was made.|
|`distributedAmount`|`uint256`|The amount of terminal tokens distributed, as a fixed point number with the same amount of decimals as its relative terminal.|

### recordUsedAllowanceOf

Records newly used allowance funds of a project.

The msg.sender must be an IJBSingleTokenPaymentTerminal.

```solidity
function recordUsedAllowanceOf(uint256 _projectId, uint256 _amount, uint256 _currency)
    external
    override
    nonReentrant
    returns (JBFundingCycle memory fundingCycle, uint256 usedAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to use the allowance of.|
|`_amount`|`uint256`|The amount to use from the allowance, as a fixed point number.|
|`_currency`|`uint256`|The currency of the `_amount`. Must match the currency of the overflow allowance.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The funding cycle during which the overflow allowance is being used.|
|`usedAmount`|`uint256`|The amount of terminal tokens used, as a fixed point number with the same amount of decimals as its relative terminal.|

### recordAddedBalanceFor

Records newly added funds for the project.

The msg.sender must be an IJBSingleTokenPaymentTerminal.

```solidity
function recordAddedBalanceFor(uint256 _projectId, uint256 _amount) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funds being added belong.|
|`_amount`|`uint256`|The amount of terminal tokens added, as a fixed point number with the same amount of decimals as its relative terminal.|

### recordMigration

Records the migration of funds from this store.

The msg.sender must be an IJBSingleTokenPaymentTerminal. The amount returned is in terms of the msg.senders tokens.

```solidity
function recordMigration(uint256 _projectId) external override nonReentrant returns (uint256 balance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being migrated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The project's migrated balance, as a fixed point number with the same amount of decimals as its relative terminal.|

### _reclaimableOverflowDuring

The amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens when measured from the specified.

If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used.

```solidity
function _reclaimableOverflowDuring(
    uint256 _projectId,
    JBFundingCycle memory _fundingCycle,
    uint256 _tokenCount,
    uint256 _totalSupply,
    uint256 _overflow
) private view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get the reclaimable overflow amount for.|
|`_fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The funding cycle during which reclaimable overflow is being calculated.|
|`_tokenCount`|`uint256`|The number of tokens to make the calculation with, as a fixed point number with 18 decimals.|
|`_totalSupply`|`uint256`|The total supply of tokens to make the calculation with, as a fixed point number with 18 decimals.|
|`_overflow`|`uint256`|The amount of overflow to make the calculation with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of overflowed tokens that can be reclaimed.|

### _overflowDuring

Gets the amount that is overflowing when measured from the specified funding cycle.

This amount changes as the value of the balance changes in relation to the currency being used to measure the distribution limit.

```solidity
function _overflowDuring(
    IJBSingleTokenPaymentTerminal _terminal,
    uint256 _projectId,
    JBFundingCycle memory _fundingCycle,
    uint256 _balanceCurrency
) private view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminal`|[`IJBSingleTokenPaymentTerminal`](docs/dev/api/interfaces/ijbsingletokenpaymentterminal.md)|The terminal for which the overflow is being calculated.|
|`_projectId`|`uint256`|The ID of the project to get overflow for.|
|`_fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The ID of the funding cycle to base the overflow on.|
|`_balanceCurrency`|`uint256`|The currency that the stored balance is expected to be in terms of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|overflow The overflow of funds, as a fixed point number with 18 decimals.|

### _currentTotalOverflowOf

Gets the amount that is currently overflowing across all of a project's terminals.

This amount changes as the value of the balances changes in relation to the currency being used to measure the project's distribution limits.

```solidity
function _currentTotalOverflowOf(uint256 _projectId, uint256 _decimals, uint256 _currency)
    private
    view
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get the total overflow for.|
|`_decimals`|`uint256`|The number of decimals that the fixed point overflow should include.|
|`_currency`|`uint256`|The currency that the overflow should be in terms of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|overflow The total overflow of a project's funds.|

## Errors

### INVALID_AMOUNT_TO_SEND_DELEGATE

```solidity
error INVALID_AMOUNT_TO_SEND_DELEGATE();
```

### CURRENCY_MISMATCH

```solidity
error CURRENCY_MISMATCH();
```

### DISTRIBUTION_AMOUNT_LIMIT_REACHED

```solidity
error DISTRIBUTION_AMOUNT_LIMIT_REACHED();
```

### FUNDING_CYCLE_PAYMENT_PAUSED

```solidity
error FUNDING_CYCLE_PAYMENT_PAUSED();
```

### FUNDING_CYCLE_DISTRIBUTION_PAUSED

```solidity
error FUNDING_CYCLE_DISTRIBUTION_PAUSED();
```

### FUNDING_CYCLE_REDEEM_PAUSED

```solidity
error FUNDING_CYCLE_REDEEM_PAUSED();
```

### INADEQUATE_CONTROLLER_ALLOWANCE

```solidity
error INADEQUATE_CONTROLLER_ALLOWANCE();
```

### INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE

```solidity
error INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();
```

### INSUFFICIENT_TOKENS

```solidity
error INSUFFICIENT_TOKENS();
```

### INVALID_FUNDING_CYCLE

```solidity
error INVALID_FUNDING_CYCLE();
```

### PAYMENT_TERMINAL_MIGRATION_NOT_ALLOWED

```solidity
error PAYMENT_TERMINAL_MIGRATION_NOT_ALLOWED();
```
