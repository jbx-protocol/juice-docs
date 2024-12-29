---
sidebar_position: 2
---

# Contract basics

To launch a project, call [`JBController.launchProjectFor(...)`](/v4/api/core/contracts/jbcontroller/#launchprojectfor).

```
function launchProjectFor(
  address owner,
  string calldata projectUri,
  JBRulesetConfig[] calldata rulesetConfigurations,
  JBTerminalConfig[] calldata terminalConfigurations,
  string calldata memo
) external override returns (uint256 projectId) { ... }
```

Check out the [Examples](/v4/build/examples.md) page for more info on how to build projects treasuries to various specifications.

<details>

<summary>View project info</summary>

Launching a project will mint a new ERC-721 in the [`JBProjects`](/v4/api/core/contracts/jbprojects) contract. The owner can be found using [`JBProjects.ownerOf(...)`](https://docs.openzeppelin.com/contracts/4.x/api/core/token/erc721#IERC721-ownerOf-uint256-).

```
function ownerOf(uint256 projectId) external returns (address owner) { ... }
```

A link to the project's metadata can be found using [`JBController.uriOf(...)`](/v4/api/core/contracts/jbcontroller/#uriof).

```
function uriOf(uint256 projectId) external view returns (string memory)
```

</details>

<details>

<summary>View rulesets</summary>

Ruleset data can be found in the [`JBController`](/v4/api/core/contracts/jbcontroller/) contract. 

```
function getRulesetOf(
  uint256 projectId,
  uint256 rulesetId
) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The project's current ruleset can be found using [`JBController.currentRulesetOf(...)`](/v4/api/core/contracts/jbcontroller/#currentrulesetof).

```
function currentRulesetOf(uint256 projectId) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The project's upcoming ruleset can be found using [`JBController.upcomingRulesetOf(...)`](/v4/api/core/contracts/jbcontroller/#upcomingrulesetof).

By default, the upcoming ruleset is a copy of the current one that starts immediately afterwards, using a discounted weight if applicable.

If the project has proposed a reconfiguration, the upcoming ruleset will reflect the changes once they are approved by the current ruleset's ballot. Reconfigurations during a ruleset with no ballot are automatically queued.

The project has no upcoming ruleset if the current ruleset has no duration.

```
function upcomingRulesetOf(uint256 projectId) external view returns (JBRuleset memory ruleset, JBRulesetMetadata memory metadata)
```

The project's latest configured ruleset can be found using [`JBController.latestConfiguredRulesetOf(...)`](/v4/api/core/contracts/jbcontroller/#latestconfiguredrulesetof).

```
function latestQueuedRulesetOf(uint256 projectId) external view returns (JBRuleset memory, JBRulesetMetadata memory metadata, JBApprovalStatus);
```

All of a project's rulesets can be found using [`JBController.allRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#allrulesetsof).

```
function allRulesetsOf(uint256 projectId) external view returns (JBRuleset[] memory rulesets, JBRulesetMetadata[] memory metadata);
```

</details>

<details>

<summary>View splits</summary>

A project's splits data can be found in the [`JBSplits`](/v4/api/core/contracts/jbsplits) contract. A set of splits used for any particular functionality during any particular rulesets configuration can be found using [`JBSplit.splitsOf(...)`](/v4/api/core/contracts/jbsplitsstore/#splitsof). 

```
function splitsOf(uint256 projectId, uint256 rulesetId, uint256 groupId) external view returns (JBSplit[] memory)
```

</details>

<details>

<summary>View accounting contexts</summary>

A project's accounting contexts data can be found in its [`IJBTerminal`](/v4/api/core/interfaces/ijbterminal) contracts. For example, if a project is using the [`JBMultiTerminal`](/v4/api/core/contracts/jbmultiterminal) contract, its accounting contexts can be found through its [`JBMultiTerminal.accountingContextsOf(...)`](/v4/api/core/contracts/jbmultiterminal/#accountingcontextsof) transaction.

```javascript
function accountingContextsOf(uint256 projectId) external view returns (JBAccountingContext[] memory) { ... }
```

Or, through the [`JBMultiTerminal.accountingContextForTokenOf(...)`](/v4/api/core/contracts/jbmultiterminal/#accountingcontextfortokenof) transaction.

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

Constraints on accessing a project's funds can found in the [`JBFundAccessLimits`](/v4/api/core/contracts/jbfundaccesslimits/) contract. The payout limit of any terminal during any ruleset using any token with any currency can be found using [`JBFundAccessLimits.payoutLimitOf(...)`](/v4/api/core/contracts/jbfundaccesslimits/#payoutlimitof). 

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

The surplus allowance from any terminal during any ruleset using any token with any currency can be found using [`JBFundAccessLimits.surplusAllowanceOf`](/v4/api/core/contracts/jbfundaccesslimits/#surplusallowanceof).

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

The [`JBDirectory`](/v4/api/core/contracts/jbdirectory/) contract stores addresses of terminals that a project is currently accepting funds through. A project's currently set terminals can be found using [`JBDirectory.terminalsOf(...)`](/v4/api/core/contracts/jbdirectory.md/#terminalsof), and the address of the terminal to which payments to projects should be sent for any token can be found using [`JBDirectory.primaryTerminalOf(...)`](/v4/api/core/contracts/jbdirectory.md/#primaryterminalof).

```
function terminalsOf(uint256 projectId) external view returns (IJBTerminal[] memory) { ... }
```

```
function primaryTerminalOf(uint256 projectId, address token) external view returns (IJBTerminal)
```

The [`JBDirectory`](/v4/api/core/contracts/jbdirectory/) contract also stores the address of the controller that is managing a project's rulesets and tokens. A projects current controller can be found using [`JBDirectory.controllerOf(...)`](/v4/api/core/contracts/jbdirectory/#controllerof).

```
function controllerOf(uint256 projectId) external view returns (IERC165) { ... }
```

</details>

Once a project has been created, it can begin accepting funds from anyone through any terminal it has added, using any token that it has specified accounting contexts for. For example, if the project has added the [`JBMultiTerminal`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbmultiterminal) with only an ETH accounting context, only ETH can be sent to the project by calling its [`JBMultiTerminal.pay(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbmultiterminal/#pay) transaction.

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


<details>

<summary>View treasury balance</summary>

A project's treasury balance can be found in the [`JBTerminalStore`](/v4/api/core/contracts/jbterminalstore) contract.

```
function balanceOf(address terminal, uint256 projectId, address token) external view returns (uint256);
```

The project's current surplus for a terminal can also be found in the [`JBTerminalStore`](/v4/api/core/contracts/jbterminalstore) contract.

```
function currentSurplusOf(
  address terminal,
  uint256 projectId,
  JBAccountingContext[] calldata accountingContexts,
  uint256 decimals,
  uint256 currency
) external view returns (uint256);
```

The [`JBTerminalStore`](/v4/api/core/contracts/jterminalStore) can also resolve the total amount of overflow in all of a project's terminals using [`JBTerminalStore.currentTotalSurplusOf(...)`](/v4/api/core/contracts/jbsingletokenpaymentterminalstore3_1_1/#currenttotalsurplusof). 

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

<summary>View reserved token balance</summary>

A project's undistributed reserved token balance can be found in the project's current controller. For example in the [`JBController`](/v4/api/core/contracts/jbcontroller/), this balance can be found using [`JBController.pendingReservedTokenBalanceOf(...)`](/v4/api/core/contracts/jbcontroller3_1/#pendingreservedtokenbalancesof).

```
function pendingReservedTokenBalanceOf(uint256 projectId) external view returns (uint256) { ... }
```

For projects using [`JBController`](/v4/api/core/contracts/jbcontroller/), the project token's total supply including any allocated reserved tokens that have yet to be distributed can be found in using [`JBController.totalTokenSupplyWithReservedTokensOf(...)`](/v4/api/core/contracts/jbcontroller/#totaltokensupplywithreservedtokens).

```
function totalTokenSupplyWithReservedTokensOf(uint256 projectId) external view returns (uint256) { ... }
```
</details>

<details>

<summary>View project token balance</summary>

Each holder's balance of a project's token can be found in the [`JBTokens`](/v4/api/core/contracts/jbtokens) contract. The balance can be found using [`JBTokens.totalBalanceOf(...)`](/v4/api/core/contracts/jbtokens.md/#totalBalanceof).

```
function totalBalanceOf(address holder, uint256 projectId) external view returns (uint256 result) { ... }
```

To only retrieve a holder's internally tracked token credit balance, use [`JBTokens.creditBalanceOf(...)`](/v4/api/core/contracts/jbtokens/#creditbalanceof)

```
function creditBalanceOf(address holder, uint256 projectId) external view returns (uint256) { ... }
```

</details>

<details>

<summary>View price conversions</summary>

The protocol uses price feeds to convert values from one currency to another when sending payouts, using surplus allowances, issuing project tokens when payments are received in various currencies, and more. Current currency indexes can be found in [`JBCurrencyIds`](/v4/api/core/libraries/JBCurrencyIds.md). If the currency strongly correlates to an ERC-20, it is cusom to use the first 32 bytes of its address as the currency. Since ETH is treated using [`JBConstants.NATIVE_TOKEN`](/div/api/core/libraries/jbconstants), its currency is `61166`. New currencies and price feeds can be added in the future.

The same price feeds the protocol uses internally can be accessed externally through the [`JBPrices`](/v4/api/core/contracts/jbprices) contract using [`JBPrices.pricePerUnitOf(...)`](/v4/api/core/contracts/jbprices/#priceperunitof.md). 

```
function pricePerUnitOf(
  uint256 projectId,
  uint256 pricingCurrency,
  uint256 unitCurrency,
  uint256 decimals
) external view returns (uint256) { ... }
```

</details>


At any point, anyone can distribute a project's reserved tokens to the project's preprogrammed reserved token splits by calling [`JBController.sendReservedTokensToSplitsOf(...)`](/v4/api/core/contracts/jbcontroller/#sendreservedtokenstosplitsof).

```
function sendReservedTokensToSplitsOf(uint256 projectId) external returns (uint256) { ... }
```

At any time after the project has been created, its owner can issue ERC-20 tokens for the protocol by calling [`JBController.deployERC20For(...)`](/v4/api/core/contracts/jbcontroller/#deployerc20for).

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

A project can instead bring their own token, so long as the token adheres to the [`IJBToken`](/v4/api/core/interfaces/IJBToken.md) interface, uses 18 decimals fixed point accounting, and isn't already being used by another project. They can do so by calling [`JBController.setTokenFor(...)`](/v4/api/core/contracts/jbcontroller.md/#settokenfor). This makes it easy to use ERC-1155s or custom contracts.

```
function setTokenFor(uint256 projectId, IJBToken token) external  { ... };
```

For projects who don't issue ERC-20's right away, holders can claim their credit balance into a project's ERC-20 once one has been made using the [`JBTokens.claimTokensFor(...)`](/v4/api/core/contracts/jbtokens/claimtokensfor)

```
function claimTokensFor(address holder, uint256 projectId, uint256 count, address beneficiary) external { ... }
```

<details>

<summary>View the project's token</summary>

The token currently being used by a project can be found in the [`JBTokens`](/v4/api/core/contracts/JBTokens.md) contract by using [`JBTokens.tokenOf(...)`](/v4/api/core/contracts/jbtokens.md/#tokenof). This will return a zero address if the project hasn't yet issued tokens or changed into a custom token.

```
function tokenOf(uint256 _projectId) external view override returns (IJBToken) { ... }
```

</details>

Anyone can distribute a project's payouts from a terminal up to its current ruleset's payout limit to its preprogrammed payout splits at any time. For example, if the project has added the [`JBMultiTerminal`](/v4/api/core/contracts/or-payment-terminals/)jbmultiterminal, funds can be distributed by calling [`JBMultiTerminal.sendPayoutsOf(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbmultiterminal/#sendpayoutsof).

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

Any payout limit used by a project can be found in the terminal store contract for each terminal by calling [`JBTerminalStore.usedPayoutLimitOf(...)`](/v4/api/core/contracts/jbterminalstore/#usedpayoutlimitof).

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

A project's owner can distribute additional funds from its treasury's surplus for each of its terminals up until its preconfigured allowance by calling its [`JBMultiTerminal.useAllowanceOf(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#useallowanceof) transaction.

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

Any surplus allowance used can also be found in the terminal store contracts for each terminal using [`JBTerminalStore.usedSurplusAllowanceOf(...)`](/v4/api/core/contracts/jbterminalstore/#usedSurplusAllowanceof).

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

Anyone who holds a project's tokens can cash them out at one of the project's terminals for a proportional share of the project's surplus. For example, if the project has funds in the [`JBMultiTerminal`](/v4/api/core/contracts/jbmultiterminal), ETH can be reclaimed by redeeming project tokens in its [`JBMultiTerminal.cashOutTokensOf(...)`](/v4/api/core/contracts/jbmultiterminal/#cashouttokensof) transaction. The surplus amount is the terminal's balance minus the current ruleset's payout limit, and can be set to include the project's balance across all terminals.

Cashing out tokens allows a project's token holders to exit the community at any time with their share of the funds. If the project's [cash out tax rate](/v4/learn/glossary/cash-out-rate/) is more than 0%, cash outs incur a 2.5% JBX membership fee.

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

If a project's current ruleset allow, project's owner can issue more of the project's token on demand lby calling [`JBController.mintTokensOf(...)`](/v4/api/core/contracts/or-controller/jbcontroller.md/#mintTokensOf). Anyone can burn their tokens by calling [`JBController.burnTokensOf(...)`](/v4/api/core/contracts/jbtokens.md/#burnTokensOf).

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

<details>

<summary>View cash out values</summary>

Any surplus allowance used can also be found in the terminal store contracts for each terminal using [`JBTerminalStore.usedSurplusAllowanceOf(...)`](/v4/api/core/contracts/jbterminalstore/#usedSurplusAllowanceof).

```
function currentReclaimableSurplusOf(
  uint256 projectId,
  uint256 tokenCount,
  uint256 totalSupply,
  uint256 surplus
)
  external view returns (uint256) { ... }
```

or, to determine the surplus of a project from its terminals, use [`JBTerminalStore.currentReclaimableSurplusOf(...)`](/v4/api/core/contracts/jbterminalstore/#currentreclaimablesurplusof).

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

A project's owner can queue new rulesets at any time by calling [`JBController.queueRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#queueRulesetsof). If the project is in the middle of a ruleset with a duration, the update will be queued to take effect next ruleset, otherwise it will start right away. If the current ruleset has an attached approval hook contract, it must approve the reconfiguration before taking effect.

```
function queueRulesetsOf(
  uint256 projectId,
  JBRulesetConfig[] calldata rulesetConfigurations,
  string calldata memo
)
  external
  returns (uint256 rulesetId){ ... }
```


At any point, anyone can inject funds into one of a project's terminals by calling the terminal's [`JBMultiTerminal.addToBalanceOf(...)`](/v4/api/core/contracts/jbmultiterminal/#addtobalanceof) transaction.

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
