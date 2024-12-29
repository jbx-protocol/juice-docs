# JBETHPaymentTerminal3_1

Manages all inflows and outflows of ETH funds into the protocol ecosystem.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/JBETHPaymentTerminal3_1.sol)

Mainnet: [`0xFA391De95Fcbcd3157268B91d8c7af083E607A5C`](https://etherscan.io/address/0xFA391De95Fcbcd3157268B91d8c7af083E607A5C)

Goerli: [`0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29`](https://goerli.etherscan.io/address/0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29)

Inherits: [`JBPayoutRedemptionPaymentTerminal3_1`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1.md)

Inherits from:

- [`JBPayoutRedemptionPaymentTerminal3_1`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1.md): Generic terminal managing all inflows and outflows of funds into the protocol ecosystem.

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
    uint256 _baseWeightCurrency,
    IJBOperatorStore _operatorStore,
    IJBProjects _projects,
    IJBDirectory _directory,
    IJBSplitsStore _splitsStore,
    IJBPrices _prices,
    IJBSingleTokenPaymentTerminalStore _store,
    address _owner
)
    JBPayoutRedemptionPaymentTerminal3_1(
        JBTokens.ETH,
        18,
        JBCurrencies.ETH,
        _baseWeightCurrency,
        JBSplitsGroups.ETH_PAYOUT,
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
|`_baseWeightCurrency`|`uint256`|The currency to base token issuance on.|
|`_operatorStore`|[`IJBOperatorStore`](/docs/v4/deprecated/v3/api/interfaces/ijboperatorstore.md)|A contract storing operator assignments.|
|`_projects`|[`IJBProjects`](/docs/v4/deprecated/v3/api/interfaces/ijbprojects.md)|A contract which mints ERC-721's that represent project ownership and transfers.|
|`_directory`|[`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|
|`_splitsStore`|[`IJBSplitsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitsstore.md)|A contract that stores splits for each project.|
|`_prices`|[`IJBPrices`](/docs/v4/deprecated/v3/api/interfaces/ijbprices.md)|A contract that exposes price feeds.|
|`_store`|[`IJBSingleTokenPaymentTerminalStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md)|A contract that stores the terminal's data.|
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
