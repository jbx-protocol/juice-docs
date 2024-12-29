# JBETHPaymentTerminal3_1_2

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/5ae86dba2f27dee2dfe2235d20c3a070b7413ff6/contracts/JBETHPaymentTerminal3_1_2.sol)

Mainnet: [`0x1d9619E10086FdC1065B114298384aAe3F680CC0`](https://etherscan.io/address/0x1d9619E10086FdC1065B114298384aAe3F680CC0)

Goerli: [`0xd89Ed8008961F68Aab849f49e122f9a1266240Db`](https://goerli.etherscan.io/address/0xd89Ed8008961F68Aab849f49e122f9a1266240Db)

Inherits: [`JBPayoutRedemptionPaymentTerminal3_1_2`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_2/)

Manages all inflows and outflows of ETH funds into the protocol ecosystem.

## Functions

### \_balance

Checks the balance of tokens in this contract.

```solidity
function _balance() internal view override returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                                                        |
| -------- | --------- | -------------------------------------------------------------------------------------------------- |
| `<none>` | `uint256` | The contract's balance, as a fixed point number with the same amount of decimals as this terminal. |

### constructor

```solidity
constructor(
    uint256 _baseWeightCurrency,
    IJBOperatorStore _operatorStore,
    IJBProjects _projects,
    IJBDirectory _directory,
    IJBSplitsStore _splitsStore,
    IJBPrices _prices,
    address _store,
    address _owner
)
    JBPayoutRedemptionPaymentTerminal3_1_2(
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

| Name                  | Type                                                               | Description                                                                      |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `_baseWeightCurrency` | `uint256`                                                          | The currency to base token issuance on.                                          |
| `_operatorStore`      | [`IJBOperatorStore`](/v4/deprecated/v3/api/interfaces/ijboperatorstore.md) | A contract storing operator assignments.                                         |
| `_projects`           | [`IJBProjects`](/v4/deprecated/v3/api/interfaces/ijbprojects.md)           | A contract which mints ERC-721's that represent project ownership and transfers. |
| `_directory`          | [`IJBDirectory`](/v4/deprecated/v3/api/interfaces/ijbdirectory.md)         | A contract storing directories of terminals and controllers for each project.    |
| `_splitsStore`        | [`IJBSplitsStore`](/v4/deprecated/v3/api/interfaces/ijbsplitsstore.md)     | A contract that stores splits for each project.                                  |
| `_prices`             | [`IJBPrices`](/v4/deprecated/v3/api/interfaces/ijbprices.md)               | A contract that exposes price feeds.                                             |
| `_store`              | `address`                                                          | A contract that stores the terminal's data.                                      |
| `_owner`              | `address`                                                          | The address that will own this contract.                                         |

### \_transferFrom

Transfers tokens.

```solidity
function _transferFrom(address _from, address payable _to, uint256 _amount) internal override;
```

**Parameters**

| Name      | Type              | Description                                                                                            |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| `_from`   | `address`         | The address from which the transfer should originate.                                                  |
| `_to`     | `address payable` | The address to which the transfer should go.                                                           |
| `_amount` | `uint256`         | The amount of the transfer, as a fixed point number with the same number of decimals as this terminal. |
