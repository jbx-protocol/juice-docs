# JBETHPaymentTerminal

_Manages all inflows and outflows of ETH into the protocol ecosystem._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBETHPaymentTerminal.sol

#### Addresses

Ethereum mainnet: [`0x594Cb208b5BB48db1bcbC9354d1694998864ec63`](https://etherscan.io/address/0x594Cb208b5BB48db1bcbC9354d1694998864ec63)

Goerli testnet: [`0x55d4dfb578daA4d60380995ffF7a706471d7c719`](https://goerli.etherscan.io/address/0x55d4dfb578daA4d60380995ffF7a706471d7c719)

#### Inheritance

| Contract                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/docs/dev/v3/interfaces/ijbpayoutredemptionpaymentterminal.md) | Generic terminal managing all inflows and outflows of funds into the protocol ecosystem. |

#### Constructor

```
/**
  @param _baseWeightCurrency The currency to base token issuance on.
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _splitsStore A contract that stores splits for each project.
  @param _prices A contract that exposes price feeds.
  @param _store A contract that stores the terminal's data.
  @param _owner The address that will own this contract.
*/
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
  JBPayoutRedemptionPaymentTerminal(
    JBTokens.ETH,
    18, // 18 decimals.
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
  )
{}
```

* `_baseWeightCurrency` is the currency to base token issuance on. From [`JBCurrencies`](/docs/dev/v3/api/libraries/jbcurrencies.md).
* `_operatorStore` is an [`IJBOperatorStore`](/docs/dev/v3/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/docs/dev/v3/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/docs/dev/v3/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_splitsStore` is an [`IJBSplitsStore`](/docs/dev/v3/api/interfaces/ijbsplitsstore.md) contract that stores splits for each project.
* `_prices` is an [`IJBPrices`](/docs/dev/v3/api/interfaces/ijbprices.md) contract that exposes price feeds.
* `_store` is a contract that stores the terminal's data.
* `_owner` is the address that will own this contract.
