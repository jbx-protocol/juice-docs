---
sidebar_position: 1
---

# Life of a revnet

A revnet is a Juicebox project owned by a special contract that enforces a certain set of rules. The result is a capital formation engine for revenue-backed tokens, without risks of mismanaged payouts. 

To launch a revnet, call [`REVDeployer.deployFor(...)`](/docs/dev/v5/api/revnet/REVDeployer.md#deployfor).

Revnets should use `JBTerminal` address within the `terminalConfigurations`, **NOT** `JBTerminal5_1`. See [`Addresses`](/docs/dev/v5/addresses.md).
  
```
function deployFor(
    uint256 revnetId,
    REVConfig calldata configuration,
    JBTerminalConfig[] calldata terminalConfigurations,
    REVBuybackHookConfig calldata buybackHookConfiguration,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration
)
    external
    override
    returns (uint256 revnetId) { ... }
```

Check out the [Launching a revnet](/docs/dev/v5/build/examples/launch-revnet.md) example page for more info on how to build revnets to various specifications.

<details>

<summary>View revnet info</summary>

Launching a revnet will mint a new ERC-721 in the [`JBProjects`](/docs/dev/v5/api/core/JBProjects.md) contract. The owner will remain the [`REVDeployer`](/docs/dev/v5/api/revnet/REVDeployer.md) contract.

```
function ownerOf(uint256 projectId) external returns (address owner) { ... }
```

A link to the revnet's metadata can be found using [`JBController.uriOf(...)`](/docs/dev/v5/api/core/JBController.md#uriof).

```
function uriOf(uint256 projectId) external view returns (string memory)
```

</details>

<details>

<summary>View stages</summary>

Stages data can be found in the [`JBController`](/docs/dev/v5/api/core/JBController.md) contract. Stages are modeled as rulesets.

```
function getRulesetOf(
  uint256 projectId,
  uint256 rulesetId
) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The revnet's current stage can be found using [`JBController.currentRulesetOf(...)`](/docs/dev/v5/api/core/JBController.md#currentrulesetof).

```
function currentRulesetOf(uint256 projectId) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The revnet's upcoming stage can be found using [`JBController.upcomingRulesetOf(...)`](/docs/dev/v5/api/core/JBController.md#upcomingrulesetof).

By default, the upcoming stage is a copy of the current one that starts immediately afterwards, using a discounted weight if applicable.

If the revnet has queued a new stage, the upcoming stage will reflect the changes once its start time is reached. Stages queued during a stage with no ballot are automatically queued.

The revnet has no upcoming stage if the current stage has no duration, meaning the stage lasts forever.

```
function upcomingRulesetOf(uint256 projectId) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The revnet's latest queued stage can be found using [`JBController.latestQueuedRulesetOf(...)`](/docs/dev/v5/api/core/JBController.md#latestqueuedrulesetof).

```
function latestQueuedRulesetOf(uint256 projectId) external view returns (JBRuleset memory, JBRulesetMetadata memory metadata, JBApprovalStatus);
```

All of a revnet's stages can be found using [`JBController.allRulesetsOf(...)`](/docs/dev/v5/api/core/JBController.md#allrulesetsof).

```
function allRulesetsOf(uint256 projectId) external view returns (JBRuleset[] memory rulesets, JBRulesetMetadata[] memory metadata);
```

</details>

<details>

<summary>View splits</summary>

A revnet's splits data can be found in the [`JBSplits`](/docs/dev/v5/api/core/JBSplits.md) contract. A set of splits used for any particular functionality during any particular stage configuration can be found using [`JBSplits.splitsOf(...)`](/docs/dev/v5/api/core/JBSplits.md#splitsof).

```
function splitsOf(uint256 projectId, uint256 rulesetId, uint256 groupId) external view returns (JBSplit[] memory)
```

</details>

<details>

<summary>View accounting contexts</summary>

A revnet's accounting contexts data can be found in its [`IJBTerminal`](/docs/dev/v5/api/core/interfaces/IJBTerminal.md) contracts. For example, if a revnet is using the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md) contract, its accounting contexts can be found through its [`JBMultiTerminal.accountingContextsOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#accountingcontextsof) transaction.

```javascript
function accountingContextsOf(uint256 projectId) external view returns (JBAccountingContext[] memory) { ... }
```

Or, through the [`JBMultiTerminal.accountingContextForTokenOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#accountingcontextfortokenof) transaction.

```javascript
function accountingContextForTokenOf(
    uint256 projectId,
    address token
)
    external view returns (JBAccountingContext memory) { ... }
```

</details>
<details>

<summary>View terminals and controller</summary>

The [`JBDirectory`](/docs/dev/v5/api/core/JBDirectory.md) contract stores addresses of terminals that a revnet accepts funds through. A revnet's permanently set terminals can be found using [`JBDirectory.terminalsOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#terminalsof), and the address of the terminal to which payments to revnets should be sent for any token can be found using [`JBDirectory.primaryTerminalOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#primaryterminalof).

```
function terminalsOf(uint256 projectId) external view returns (IJBTerminal[] memory) { ... }
```

```
function primaryTerminalOf(uint256 projectId, address token) external view returns (IJBTerminal)
```

The [`JBDirectory`](/docs/dev/v5/api/core/f the controller that is managing a revnet's stages and tokens. The revnet's controller can be found using [`JBDirectory.controllerOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#controllerof).

```
function controllerOf(uint256 projectId) external view returns (IERC165) { ... }
```

</details>

Once a revnet has been created, it can begin accepting funds from anyone through any terminal it has added, using any token that it has specified accounting contexts for. For example, if the revnet has added the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md) with only an ETH accounting context, only ETH can be sent to the revnet by calling its [`JBMultiTerminal.pay(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#pay) transaction.

```
function pay(
  uint256 projectId,
  address token,
  uint256 amount,
  address beneficiary,
  uint256 minReturnedTokens,
  string calldata memo,
  bytes calldata metadata
) external payable returns (uint256 beneficiaryTokenCount);
```

Check out the [Paying a project](/docs/dev/v5/build/examples/pay.md) example page for more info on how to pay a revnet.

<details>

<summary>View revnet balance</summary>

A revnet's balance can be found in the [`JBTerminalStore`](/docs/dev/v5/api/core/JBTerminalStore.md) contract.

```
function balanceOf(address terminal, uint256 projectId, address token) external view returns (uint256);
```

The [`JBTerminalStore`](/docs/dev/v5/api/core/JBTerminalStore.md) can also resolve the total amount in all of a revnet's terminals using [`JBTerminalStore.currentTotalSurplusOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#currenttotalsurplusof). 

```
function currentTotalSurplusOf(
  uint256 projectId,
  uint256 decimals,
  uint256 currency
)
  external
  view
  returns (uint256);
```

</details>

<details>

<summary>View revnet token balance</summary>

Each holder's balance of a revnet's token can be found in the [`JBTokens`](/docs/dev/v5/api/core/JBTokens.md) contract. The balance can be found using [`JBTokens.totalBalanceOf(...)`](/docs/dev/v5/api/core/JBTokens.md#totalbalanceof).

```
function totalBalanceOf(address holder, uint256 projectId) external view returns (uint256 result) { ... }
```

To only retrieve a holder's internally tracked token credit balance, use [`JBTokens.creditBalanceOf(...)`](/docs/dev/v5/api/core/JBTokens.md#creditbalanceof)

```
function creditBalanceOf(address holder, uint256 projectId) external view returns (uint256) { ... }
```

</details>

<details>

<summary>View price conversions</summary>

The protocol uses price feeds to convert values from one currency to another when sending payouts, using surplus allowances, issuing revnet tokens when payments are received in various currencies, and more. Current currency indexes can be found in [`JBCurrencyIds`](/docs/dev/v5/api/core/libraries/JBCurrencyIds.md). If the currency strongly correlates to an ERC-20, it is cusom to use the first 32 bytes of its address as the currency. Since ETH is treated using [`JBConstants.NATIVE_TOKEN`](/docs/dev/v5/api/core/libraries/JBConstants.md), its currency is `61166`. New currencies and price feeds can be added in the future.

The same price feeds the protocol uses internally can be accessed externally through the [`JBPrices`](/docs/dev/v5/api/core/JBPrices.md) contract using [`JBPrices.pricePerUnitOf(...)`](/docs/dev/v5/api/core/JBPrices.md#priceperunitof). 

```
function pricePerUnitOf(
  uint256 projectId,
  uint256 pricingCurrency,
  uint256 unitCurrency,
  uint256 decimals
) external view returns (uint256) { ... }
```

</details>


A revnet automatically issues an ERC-20 token for itself when it is created. 

<details>

<summary>View the revnet's token</summary>

The token currently being used by a revnet can be found in the [`JBTokens`](/docs/dev/v5/api/core/JBTokens.md) contract by using [`JBTokens.tokenOf(...)`](/docs/dev/v5/api/core/JBTokens.md#tokenof).

```
function tokenOf(uint256 projectId) external view override returns (IJBToken) { ... }
```

</details>

At any point, anyone can distribute a revnet's split tokens to the revnet's preprogrammed splits by calling [`JBController.sendReservedTokensToSplitsOf(...)`](/docs/dev/v5/api/core/JBController.md#sendreservedtokenstosplitsof).

```
function sendReservedTokensToSplitsOf(uint256 projectId) external returns (uint256) { ... }
```

<details>

<summary>View split token balance</summary>

A project's undistributed split token balance can be found in the revnet's current controller. For example in the [`JBController`](/docs/dev/v5/api/core/JBController.md), this balance can be found using [`JBController.pendingReservedTokenBalanceOf(...)`](/docs/dev/v5/api/core/JBController.md#pendingreservedtokenbalanceof).

```
function pendingReservedTokenBalanceOf(uint256 projectId) external view returns (uint256) { ... }
```

For revnets using [`JBController`](/docs/dev/v5/api/core/JBController.md), the revnet token's total supply including any allocated split tokens that have yet to be distributed can be found in using [`JBController.totalTokenSupplyWithReservedTokensOf(...)`](/docs/dev/v5/api/core/JBController.md#totaltokensupplywithreservedtokensof).

```
function totalTokenSupplyWithReservedTokensOf(uint256 projectId) external view returns (uint256) { ... }
```
</details>

Anyone who holds a revnet's tokens can cash them out at one of the revnet's terminals for a proportional share of the revnet's balance. For example, if the revnet has funds in the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md), ETH can be reclaimed by redeeming revnet tokens in its [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#cashouttokensof) transaction. The surplus amount is the terminal's balance minus the current ruleset's payout limit, and can be set to include the revnet's balance across all terminals.

Cashing out tokens allows a revnet's token holders to exit the community at any time with their share of the funds. If the revnet's [cash out tax rate](/docs/dev/v5/learn/glossary/cash-out-tax-rate.md) is more than 0%, cash outs incur a 2.5% NANA membership fee, and a 2.5% REV membership fee. Both NANA and REV are revnets themselves, so fee payers will receive a proportional share of the respective networks.

```
function cashOutTokensOf(
  address holder,
  uint256 projectId,
  uint256 cashOutCount,
  address tokenToReclaim,
  uint256 minTokensReclaimed,
  address payable beneficiary,
  bytes calldata metadata
)
  external
  returns (uint256 reclaimAmount);
```

<details>

<summary>View cash out values</summary>

Any surplus allowance used can also be found in the terminal store contracts for each terminal using [`JBTerminalStore.usedSurplusAllowanceOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#usedsurplusallowanceof).

```
function currentReclaimableSurplusOf(
  uint256 projectId,
  uint256 tokenCount,
  uint256 totalSupply,
  uint256 surplus
)
  external view returns (uint256) { ... }
```

or, to determine the surplus of a revnet from its terminals, use [`JBTerminalStore.currentReclaimableSurplusOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#currentreclaimablesurplusof).

```
function currentReclaimableSurplusOf(
  uint256 projectId,
  uint256 cashOutCount,
  IJBTerminal[] calldata terminals,
  JBAccountingContext[] calldata accountingContexts,
  uint256 decimals,
  uint256 currency
)
  external view returns (uint256) { ... }
```

</details>

 Anyone can burn their tokens by calling [`JBController.burnTokensOf(...)`](/docs/dev/v5/api/core/JBController.md#burntokensof).

```
function burnTokensOf(address holder, uint256 projectId, uint256 tokenCount, string calldata memo) external;
```

At any point, anyone can inject funds into one of a revnet's terminals by calling the terminal's [`JBMultiTerminal.addToBalanceOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#addtobalanceof) transaction.

```
function addToBalanceOf(
  uint256 projectId,
  address token,
  uint256 amount,
  bool shouldReturnHeldFees,
  string calldata memo,
  bytes calldata metadata
) external payable;
```
