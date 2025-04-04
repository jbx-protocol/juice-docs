# JBSingleTokenPaymentTerminalStore

_Manages all bookkeeping for inflows and outflows of funds from any [`IJBSingleTokenPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminal.md)._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBSingleTokenPaymentTerminalStore.sol

#### Addresses

Ethereum mainnet: [`0xdF7Ca703225c5da79A86E08E03A206c267B7470C`](https://etherscan.io/address/0xdF7Ca703225c5da79A86E08E03A206c267B7470C)

Goerli testnet: [`0x5b62ccB7fdA139185374c8f36FAa388c20E1387F`](https://goerli.etherscan.io/address/0x5b62ccB7fdA139185374c8f36FAa388c20E1387F)

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSingleTokenPaymentTerminalStore`**](/docs/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ReentrancyGuard`**](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) | Contract module that helps prevent reentrant calls to a function. |

#### Constructor

```
/**
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _fundingCycleStore A contract storing all funding cycle configurations.
  @param _prices A contract that exposes price feeds.
*/
constructor(
  IJBDirectory _directory,
  IJBFundingCycleStore _fundingCycleStore,
  IJBPrices _prices
) {
  directory = _directory;
  fundingCycleStore = _fundingCycleStore;
  prices = _prices;
}
```

* `_directory` is an [`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_fundingCycleStore` is an [`IJBFundingCycleStore`](/docs/v4/deprecated/v3/api/interfaces/ijbfundingcyclestore.md) contract storing all funding cycle configurations.
* `_prices` is an [`IJBPrices`](/docs/v4/deprecated/v3/api/interfaces/ijbprices.md) contract that exposes price feeds.

#### Properties

| Function                                                                 | Definition                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`directory`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/directory.md)                               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBDirectory](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md)</code></li></ul>                         |
| [**`fundingCycleStore`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/fundingcyclestore.md)               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/docs/v4/deprecated/v3/api/interfaces/ijbfundingcyclestore.md)</code></li></ul> |
| [**`prices`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/prices.md)                                     | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPrices](/docs/v4/deprecated/v3/api/interfaces/ijbprices.md)</code></li></ul>                                  |
| [**`balanceOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/balanceof.md)                               | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                                                                     |
| [**`usedOverflowAllowanceOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/usedoverflowallowanceof.md)   | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _configuration</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                           |
| [**`usedDistributionLimitOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/useddistributionlimitof.md) | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _fundingCycleId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                       |

#### Read

| Function                                                       | Definition                                                                                                                                                                                                      |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`currentOverflowOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/read/currentoverflowof.md)           | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currentOverflow</code></li></ul>                                            |
| [**`currentTotalOverflowOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/read/currenttotaloverflowof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currentTotalOverflow</code></li></ul>                                       |
| [**`currentReclaimableOverflowOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/read/currentreclaimableoverflowof1.md)       | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>bool _useTotalOverflow</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 reclaimableOverflow</code></li></ul> |
| [**`currentReclaimableOverflowOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/read/currentreclaimableoverflowof2.md)       | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>uint256 _totalSupply</code></li><li><code>uint256 _overflow</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 reclaimableOverflow</code></li></ul> |

#### Write

| Function                                                      | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`recordPaymentFrom`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/write/recordpaymentfrom.md)         | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _payer</code></li><li><code>[JBTokenAmount](/docs/v4/deprecated/v3/api/data-structures/jbtokenamount.md) _amount</code></li><li><code>uint256 _projectId</code></li><li><code>address _beneficiary</code></li><li><code>uint256 _baseWeightCurrency</code></li><li><code>address _beneficiary</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/docs/v4/deprecated/v3/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 tokenCount</code></li><li><code>[JBPayDelegateAllocation](/docs/v4/deprecated/v3/api/data-structures/jbpaydelegateallocation.md)[] delegateAllocations</code></li><li><code>string memo</code></li></ul> |
| [**`recordDistributionFor`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/write/recorddistributionfor.md) | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _currency</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/docs/v4/deprecated/v3/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 distributedAmount</code></li></ul>                                                                                                                                                                                                                |
| [**`recordUsedAllowanceOf`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/write/recordusedallowanceof.md) | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _currency</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/docs/v4/deprecated/v3/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 usedAmount</code></li></ul>                                                                                                                                                                                                                |
| [**`recordRedemptionFor`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/write/recordredemptionfor.md)     | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>address payable _beneficiary</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/docs/v4/deprecated/v3/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 reclaimAmount</code></li><li><code>[JBRedemptionDelegateAllocation](/docs/v4/deprecated/v3/api/data-structures/jbredemptiondelegateallocation.md)[] delegateAllocations</code></li><li><code>string memo</code></li></ul>                                                |
| [**`recordAddedBalanceFor`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/write/recordaddedbalancefor.md) | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                                                                                                                                                                                                                 |
| [**`recordMigration`**](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/write/recordmigration.md)             | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
