# JBERC20PaymentTerminal

_Manages all inflows and outflows of an ERC20 into the protocol ecosystem._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBERC20PaymentTerminal.sol

#### Addresses

Ethereum mainnet: _Not yet deployed_

#### Interfaces

| Contract                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/docs/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) | Generic terminal managing all inflows and outflows of funds into the protocol ecosystem. |

#### Constructor

```
/**
  @param _token The token that this terminal manages.
  @param _currency The currency that this terminal's token adheres to for price feeds.
  @param _baseWeightCurrency The currency to base token issuance on.
  @param _payoutSplitsGroup The group that denotes payout splits from this terminal in the splits store.
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _splitsStore A contract that stores splits for each project.
  @param _prices A contract that exposes price feeds.
  @param _store A contract that stores the terminal's data.
  @param _owner The address that will own this contract.
*/
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
  JBPayoutRedemptionPaymentTerminal(
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
  )
{}
```

* `_token` is the ERC20 token that this terminal manages.
* `_currency` is the currency that this terminal's token adheres to for price feeds. From [`JBCurrencies`](/docs/v4/deprecated/v3/api/libraries/jbcurrencies.md).
* `_baseWeightCurrency` is the currency to base token issuance on. From [`JBCurrencies`](/docs/v4/deprecated/v3/api/libraries/jbcurrencies.md).
* `_payoutSplitsGroup` is the group that denotes payout splits from this terminal in the splits store. From [`JBSplitGroups`](/docs/v4/deprecated/v3/api/libraries/jbsplitsgroups.md).
* `_operatorStore` is an [`IJBOperatorStore`](/docs/v4/deprecated/v3/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/docs/v4/deprecated/v3/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_splitsStore` is an [`IJBSplitsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitsstore.md) contract that stores splits for each project.
* `_prices` is an [`IJBPrices`](/docs/v4/deprecated/v3/api/interfaces/ijbprices.md) contract that exposes price feeds.
* `_store` is a contract that stores the terminal's data.
* `_owner` is the address that will own this contract.
