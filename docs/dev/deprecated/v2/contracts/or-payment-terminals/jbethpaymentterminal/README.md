# JBETHPaymentTerminal

_Manages all inflows and outflows of ETH into the protocol ecosystem._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHPaymentTerminal.sol

#### Addresses

Ethereum mainnet: [`0x7Ae63FBa045Fec7CaE1a75cF7Aa14183483b8397`](https://etherscan.io/address/0x7Ae63FBa045Fec7CaE1a75cF7Aa14183483b8397)

Ethereum rinkeby: [`0x765A8b9a23F58Db6c8849315C04ACf32b2D55cF8`](https://rinkeby.etherscan.io/address/0x765A8b9a23F58Db6c8849315C04ACf32b2D55cF8)

#### Inheritance

| Contract                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/dev/deprecated/v2/interfaces/ijbpayoutredemptionpaymentterminal.md) | Generic terminal managing all inflows and outflows of funds into the protocol ecosystem. |

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

* `_baseWeightCurrency` is the currency to base token issuance on. From [`JBCurrencies`](/dev/deprecated/v2/libraries/jbcurrencies.md).
* `_operatorStore` is an [`IJBOperatorStore`](/dev/deprecated/v2/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/deprecated/v2/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_splitsStore` is an [`IJBSplitsStore`](/dev/deprecated/v2/interfaces/ijbsplitsstore/) contract that stores splits for each project.
* `_prices` is an [`IJBPrices`](/dev/deprecated/v2/interfaces/ijbprices.md) contract that exposes price feeds.
* `_store` is a contract that stores the terminal's data.
* `_owner` is the address that will own this contract.

#### Write

| Function                                                  | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`_transferFrom`**](/dev/deprecated/v2/contracts/or-payment-terminals/jbethpaymentterminal/write/-_transferfrom.md) | <p><strong>Traits</strong></p><ul><li><code>internal</code></li></ul> <p><strong>Params</strong></p><ul><li><code>address _from</code></li><li><code>address payable _to</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                                                                                  |
| [**`_beforeTransferTo`**](/dev/deprecated/v2/contracts/or-payment-terminals/jbethpaymentterminal/write/-_beforetransferto.md) | <p><strong>Traits</strong></p><ul><li><code>internal</code></li><li><code>virtual</code></li></ul> <p><strong>Params</strong></p><ul><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                                                                                  |
