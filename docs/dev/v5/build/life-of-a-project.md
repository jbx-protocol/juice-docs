---
sidebar_position: 1
---

# Life of a project

To launch a project, call [`JBController.launchProjectFor(...)`](/docs/dev/v5/api/core/JBController.md#launchprojectfor).

New projects and integrations should use `JBController5_1` address, and `JBTerminal5_1` address within the `terminalConfigurations`. See [`Addresses`](/docs/dev/v5/addresses.md).

```
function launchProjectFor(
  address owner,
  string calldata projectUri,
  JBRulesetConfig[] calldata rulesetConfigurations,
  JBTerminalConfig[] calldata terminalConfigurations,
  string calldata memo
) external override returns (uint256 projectId) { ... }
```

If you're launching an omnichain project, you can use the [`JBOmnichainDeployer.launchProjectFor(...)`](/docs/dev/v5/api/omnichain-deployers/JBOmnichainDeployer.md#launchprojectfor) transaction, which will also take in information about deploying [suckers](/docs/dev/v5/learn/glossary/omnichain.md) for each chain pair.

```
function launchProjectFor(
    address owner,
    string calldata projectUri,
    JBRulesetConfig[] calldata rulesetConfigurations,
    JBTerminalConfig[] calldata terminalConfigurations,
    string calldata memo,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration
)
    external
    returns (uint256 projectId, address[] memory suckers) { ... }
```

Check out the [Launching a project](/docs/dev/v5/build/examples/launch-project.md) example page for more info on how to build projects treasuries to various specifications.

<details>

<summary>View project info</summary>

Launching a project will mint a new ERC-721 in the [`JBProjects`](/docs/dev/v5/api/core/JBProjects.md) contract. The owner can be found using [`JBProjects.ownerOf(...)`](https://docs.openzeppelin.com/4.x/api/core/token/erc721#IERC721-ownerOf-uint256-).

```
function ownerOf(uint256 projectId) external returns (address owner) { ... }
```

A link to the project's metadata can be found using [`JBController.uriOf(...)`](/docs/dev/v5/api/core/JBController.md#uriof).

```
function uriOf(uint256 projectId) external view returns (string memory)
```

</details>

<details>

<summary>View rulesets</summary>

Ruleset data can be found in the [`JBController`](/docs/dev/v5/api/core/JBController.md) contract. 

```
function getRulesetOf(
  uint256 projectId,
  uint256 rulesetId
) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The project's current ruleset can be found using [`JBController.currentRulesetOf(...)`](/docs/dev/v5/api/core/JBController.md#currentrulesetof).

```
function currentRulesetOf(uint256 projectId) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The project's upcoming ruleset can be found using [`JBController.upcomingRulesetOf(...)`](/docs/dev/v5/api/core/JBController.md#upcomingrulesetof).

By default, the upcoming ruleset is a copy of the current one that starts immediately afterwards, using a discounted weight if applicable.

If the project has queued a new ruleset, the upcoming ruleset will reflect the changes once they are approved by the current ruleset's ballot. Rulesets queued during a ruleset with no ballot are automatically queued.

The project has no upcoming ruleset if the current ruleset has no duration.

```
function upcomingRulesetOf(uint256 projectId) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The project's latest queued ruleset can be found using [`JBController.latestQueuedRulesetOf(...)`](/docs/dev/v5/api/core/JBController.md#latestqueuedrulesetof).

```
function latestQueuedRulesetOf(uint256 projectId) external view returns (JBRuleset memory, JBRulesetMetadata memory metadata, JBApprovalStatus);
```

All of a project's rulesets can be found using [`JBController.allRulesetsOf(...)`](/docs/dev/v5/api/core/JBController.md#allrulesetsof).

```
function allRulesetsOf(uint256 projectId) external view returns (JBRuleset[] memory rulesets, JBRulesetMetadata[] memory metadata);
```

</details>

<details>

<summary>View splits</summary>

A project's splits data can be found in the [`JBSplits`](/docs/dev/v5/api/core/JBSplits.md) contract. A set of splits used for any particular functionality during any particular rulesets configuration can be found using [`JBSplits.splitsOf(...)`](/docs/dev/v5/api/core/JBSplits.md#splitsof). 

```
function splitsOf(uint256 projectId, uint256 rulesetId, uint256 groupId) external view returns (JBSplit[] memory)
```

</details>

<details>

<summary>View accounting contexts</summary>

A project's accounting contexts data can be found in its [`IJBTerminal`](/docs/dev/v5/api/core/interfaces/IJBTerminal.md) contracts. For example, if a project is using the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md) contract, its accounting contexts can be found through its [`JBMultiTerminal.accountingContextsOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#accountingcontextsof) transaction.

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

<summary>View fund access limits</summary>

Constraints on accessing a project's funds can found in the [`JBFundAccessLimits`](/docs/dev/v5/api/core/JBFundAccessLimits.md) contract. The payout limit of any terminal during any ruleset using any token with any currency can be found using [`JBFundAccessLimits.payoutLimitOf(...)`](/docs/dev/v5/api/core/JBFundAccessLimits.md#payoutlimitof). 

```
function payoutLimitOf(
  uint256 projectId,
  uint256 rulesetId,
  address terminal,
  address token,
  uint256 currency
) external view returns (uint256 payoutLimit);
```

Or, get all limits for any currency 

```
function payoutLimitsOf(
  uint256 projectId,
  uint256 rulesetId,
  address terminal,
  address token
) external view returns (JBCurrencyAmount[] memory payoutLimits);
```

The surplus allowance from any terminal during any ruleset using any token with any currency can be found using [`JBFundAccessLimits.surplusAllowanceOf`](/docs/dev/v5/api/core/JBFundAccessLimits.md#surplusallowanceof).

```
function surplusAllowanceOf(
    uint256 projectId,
    uint256 rulesetId,
    address terminal,
    address token,
    uint256 currency
) external view returns (uint256 surplusAllowance);
```

</details>

<details>

<summary>View terminals and controller</summary>

The [`JBDirectory`](/docs/dev/v5/api/core/JBDirectory.md) contract stores addresses of terminals that a project is currently accepting funds through. A project's currently set terminals can be found using [`JBDirectory.terminalsOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#terminalsof), and the address of the terminal to which payments to projects should be sent for any token can be found using [`JBDirectory.primaryTerminalOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#primaryterminalof).

```
function terminalsOf(uint256 projectId) external view returns (IJBTerminal[] memory) { ... }
```

```
function primaryTerminalOf(uint256 projectId, address token) external view returns (IJBTerminal)
```

The [`JBDirectory`](/docs/dev/v5/api/core/f the controller that is managing a project's rulesets and tokens. A projects current controller can be found using [`JBDirectory.controllerOf(...)`](/docs/dev/v5/api/core/JBDirectory.md#controllerof).

```
function controllerOf(uint256 projectId) external view returns (IERC165) { ... }
```

</details>

Once a project has been created, it can begin accepting funds from anyone through any terminal it has added, using any token that it has specified accounting contexts for. For example, if the project has added the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md) with only an ETH accounting context, only ETH can be sent to the project by calling its [`JBMultiTerminal.pay(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#pay) transaction.

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

Check out the [Paying a project](/docs/dev/v5/build/examples/pay.md) example page for more info on how to pay a project.

<details>

<summary>View project balance</summary>

A project's balance can be found in the [`JBTerminalStore`](/docs/dev/v5/api/core/JBTerminalStore.md) contract.

```
function balanceOf(address terminal, uint256 projectId, address token) external view returns (uint256);
```

The project's current surplus for a terminal can also be found in the [`JBTerminalStore`](/docs/dev/v5/api/core/JBTerminalStore.md) contract.

```
function currentSurplusOf(
  address terminal,
  uint256 projectId,
  JBAccountingContext[] calldata accountingContexts,
  uint256 decimals,
  uint256 currency
) external view returns (uint256);
```

The [`JBTerminalStore`](/docs/dev/v5/api/core/JBTerminalStore.md) can also resolve the total amount of overflow in all of a project's terminals using [`JBTerminalStore.currentTotalSurplusOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#currenttotalsurplusof). 

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

<summary>View project token balance</summary>

Each holder's balance of a project's token can be found in the [`JBTokens`](/docs/dev/v5/api/core/JBTokens.md) contract. The balance can be found using [`JBTokens.totalBalanceOf(...)`](/docs/dev/v5/api/core/JBTokens.md#totalbalanceof).

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

The protocol uses price feeds to convert values from one currency to another when sending payouts, using surplus allowances, issuing project tokens when payments are received in various currencies, and more. Current currency indexes can be found in [`JBCurrencyIds`](/docs/dev/v5/api/core/libraries/JBCurrencyIds.md). If the currency strongly correlates to an ERC-20, it is cusom to use the first 32 bytes of its address as the currency. Since ETH is treated using [`JBConstants.NATIVE_TOKEN`](/docs/dev/v5/api/core/libraries/JBConstants.md), its currency is `61166`. New currencies and price feeds can be added in the future.

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


At any time after the project has been created, its owner can issue ERC-20 tokens for the protocol by calling [`JBController.deployERC20For(...)`](/docs/dev/v5/api/core/JBController.md#deployerc20for).

```
function deployERC20For(
  uint256 projectId,
  string calldata name,
  string calldata symbol,
  bytes32 salt
)
  external
  returns (IJBToken token) { ... }
```

A project can instead bring their own token, so long as the token adheres to the [`IJBToken`](/docs/dev/v5/api/core/interfaces/IJBToken.md) interface, uses 18 decimals fixed point accounting, and isn't already being used by another project. They can do so by calling [`JBController.setTokenFor(...)`](/docs/dev/v5/api/core/JBController.md#settokenfor). This makes it easy to use ERC-1155s or custom contracts.

```
function setTokenFor(uint256 projectId, IJBToken token) external  { ... };
```

For projects who don't issue ERC-20's right away, holders can claim their credit balance into a project's ERC-20 once one has been made using the [`JBTokens.claimTokensFor(...)`](/docs/dev/v5/api/core/JBTokens.md#claimtokensfor)

```
function claimTokensFor(address holder, uint256 projectId, uint256 count, address beneficiary) external { ... }
```

<details>

<summary>View the project's token</summary>

The token currently being used by a project can be found in the [`JBTokens`](/docs/dev/v5/api/core/JBTokens.md) contract by using [`JBTokens.tokenOf(...)`](/docs/dev/v5/api/core/JBTokens.md#tokenof). This will return a zero address if the project hasn't yet issued tokens or changed into a custom token.

```
function tokenOf(uint256 _projectId) external view override returns (IJBToken) { ... }
```

</details>

Anyone can distribute a project's payouts from a terminal up to its current ruleset's payout limit to its preprogrammed payout splits at any time. For example, if the project has added the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md), funds can be distributed by calling [`JBMultiTerminal.sendPayoutsOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#sendpayoutsof).

```
function sendPayoutsOf(
  uint256 projectId,
  address token,
  uint256 amount,
  uint256 currency,
  uint256 minTokensPaidOut
) external returns (uint256 netLeftoverPayoutAmount) { ... }
```

<details>

<summary>View used payout limit</summary>

Any payout limit used by a project can be found in the terminal store contract for each terminal by calling [`JBTerminalStore.usedPayoutLimitOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#usedpayoutlimitof).

```
function usedPayoutLimitOf(
  address terminal,
  uint256 projectId,
  address token,
  uint256 rulesetCycleNumber,
  uint256 currency
) external view returns (uint256) { ... }
```

</details>

A project's owner can distribute additional funds from its surplus for each of its terminals up until its preconfigured allowance by calling its [`JBMultiTerminal.useAllowanceOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#useallowanceof) transaction.

```
function useAllowanceOf(
  uint256 projectId,
  address token,
  uint256 amount,
  uint256 currency,
  uint256 minTokensPaidOut,
  address payable beneficiary,
  address payable feeBeneficiary,
  string calldata memo
) external returns (uint256 netAmountPaidOut) { ... }
```

<details>

<summary>View used surplus allowance</summary>

Any surplus allowance used can also be found in the terminal store contracts for each terminal using [`JBTerminalStore.usedSurplusAllowanceOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#usedsurplusallowanceof).

```
function usedSurplusAllowanceOf(
  address terminal,
  uint256 projectId,
  address token,
  uint256 rulesetId,
  uint256 currency
)
  external view returns (uint256) { ... }
```

</details>

At any point, anyone can distribute a project's reserved tokens to the project's preprogrammed reserved token splits by calling [`JBController.sendReservedTokensToSplitsOf(...)`](/docs/dev/v5/api/core/JBController.md#sendreservedtokenstosplitsof).

```
function sendReservedTokensToSplitsOf(uint256 projectId) external returns (uint256) { ... }
```

<details>

<summary>View reserved token balance</summary>

A project's undistributed reserved token balance can be found in the project's current controller. For example in the [`JBController`](/docs/dev/v5/api/core/JBController.md), this balance can be found using [`JBController.pendingReservedTokenBalanceOf(...)`](/docs/dev/v5/api/core/JBController.md#pendingreservedtokenbalanceof).

```
function pendingReservedTokenBalanceOf(uint256 projectId) external view returns (uint256) { ... }
```

For projects using [`JBController`](/docs/dev/v5/api/core/JBController.md), the project token's total supply including any allocated reserved tokens that have yet to be distributed can be found in using [`JBController.totalTokenSupplyWithReservedTokensOf(...)`](/docs/dev/v5/api/core/JBController.md#totaltokensupplywithreservedtokensof).

```
function totalTokenSupplyWithReservedTokensOf(uint256 projectId) external view returns (uint256) { ... }
```
</details>


Anyone who holds a project's tokens can cash them out at one of the project's terminals for a proportional share of the project's surplus. For example, if the project has funds in the [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md), ETH can be reclaimed by redeeming project tokens in its [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#cashouttokensof) transaction. The surplus amount is the terminal's balance minus the current ruleset's payout limit, and can be set to include the project's balance across all terminals.

Cashing out tokens allows a project's token holders to exit the community at any time with their share of the funds. If the project's [cash out tax rate](/docs/dev/v5/learn/glossary/cash-out-tax-rate.md) is more than 0%, cash outs incur a 2.5% JBX membership fee.

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

or, to determine the surplus of a project from its terminals, use [`JBTerminalStore.currentReclaimableSurplusOf(...)`](/docs/dev/v5/api/core/JBTerminalStore.md#currentreclaimablesurplusof).

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

If a project's current ruleset allow, project's owner can issue more of the project's token on demand lby calling [`JBController.mintTokensOf(...)`](/docs/dev/v5/api/core/JBController.md#minttokensof). Anyone can burn their tokens by calling [`JBController.burnTokensOf(...)`](/docs/dev/v5/api/core/JBController.md#burntokensof).

```
function mintTokensOf(
  uint256 projectId,
  uint256 tokenCount,
  address beneficiary,
  string calldata memo,
  bool useReservedPercent
)
  external
  returns (uint256 beneficiaryTokenCount) { ... }
```

```
function burnTokensOf(address holder, uint256 projectId, uint256 tokenCount, string calldata memo) external;
```

A project's owner can queue new rulesets at any time by calling [`JBController.queueRulesetsOf(...)`](/docs/dev/v5/api/core/JBController.md#queuerulesetsof). If the project is in the middle of a ruleset with a duration, the update will be queued to take effect next ruleset, otherwise it will start right away. If the current ruleset has an attached approval hook contract, it must approve the queue rulesets before taking effect.

```
function queueRulesetsOf(
  uint256 projectId,
  JBRulesetConfig[] calldata rulesetConfigurations,
  string calldata memo
)
  external
  returns (uint256 rulesetId){ ... }
```


At any point, anyone can inject funds into one of a project's terminals by calling the terminal's [`JBMultiTerminal.addToBalanceOf(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#addtobalanceof) transaction.

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
