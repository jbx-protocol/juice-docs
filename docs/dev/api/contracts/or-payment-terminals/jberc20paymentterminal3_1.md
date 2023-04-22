# JBERC20PaymentTerminal3_1

Manages the inflows and outflows of an ERC-20 token.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/JBERC20PaymentTerminal3_1.sol)

Mainnet: Not deployed.

Goerli: Not deployed.

Inherits: [`JBPayoutRedemptionPaymentTerminal3_1`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/)

Inherits from:

- [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/): Includes convenience functionality for checking a message sender's permissions before executing certain transactions.

## Functions

### _balance

Checks the balance of tokens in this contract.

```solidity
function _balance() internal view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The contract's balance, as a fixed point number with the same amount of decimals as this terminal.|

### constructor

```solidity
constructor(
    IERC20Metadata _token,
    uint256 _currency,
    uint256 _baseWeightCurrency,
    uint256 _payoutSplitsGroup,
    IJBOperatorStore _operatorStore,
    IJBProjects _projects,
    IJBDirectory _directory,
    IJBSplitsStore _splitsStore,
    IJBPrices _prices,
    IJBSingleTokenPaymentTerminalStore _store,
    address _owner
)
    JBPayoutRedemptionPaymentTerminal3_1(
        address(_token),
        _token.decimals(),
        _currency,
        _baseWeightCurrency,
        _payoutSplitsGroup,
        _operatorStore,
        _projects,
        _directory,
        _splitsStore,
        _prices,
        _store,
        _owner
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_token`|`IERC20Metadata`|The token that this terminal manages.|
|`_currency`|`uint256`|The currency that this terminal's token adheres to for price feeds.|
|`_baseWeightCurrency`|`uint256`|The currency to base token issuance on.|
|`_payoutSplitsGroup`|`uint256`|The group that denotes payout splits from this terminal in the splits store.|
|`_operatorStore`|[`IJBOperatorStore`](docs/dev/api/interfaces/ijboperatorstore.md)|A contract storing operator assignments.|
|`_projects`|[`IJBProjects`](docs/dev/api/interfaces/ijbprojects.md)|A contract which mints ERC-721's that represent project ownership and transfers.|
|`_directory`|[`IJBDirectory`](docs/dev/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|
|`_splitsStore`|[`IJBSplitsStore`](docs/dev/api/interfaces/ijbsplitsstore.md)|A contract that stores splits for each project.|
|`_prices`|[`IJBPrices`](docs/dev/api/interfaces/ijbprices.md)|A contract that exposes price feeds.|
|`_store`|[`IJBSingleTokenPaymentTerminalStore`](docs/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)|A contract that stores the terminal's data.|
|`_owner`|`address`|The address that will own this contract.|

### _transferFrom

Transfers tokens.

```solidity
function _transferFrom(address _from, address payable _to, uint256 _amount) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address from which the transfer should originate.|
|`_to`|`address payable`|The address to which the transfer should go.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.|

### _beforeTransferTo

Logic to be triggered before transferring tokens from this terminal.

```solidity
function _beforeTransferTo(address _to, uint256 _amount) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to which the transfer is going.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.|

### _cancelTransferTo

Logic to be triggered if a transfer should be undone

```solidity
function _cancelTransferTo(address _to, uint256 _amount) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to which the transfer went.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.|
