---
sidebar_position: 2
---

# Basics

#### Workflows

The first transaction to call when getting started is [`JBController3_1.launchProjectFor(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor).

```
function launchProjectFor(
  address _owner,
  JBProjectMetadata calldata _projectMetadata,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] calldata _fundAccessConstraints,
  IJBPaymentTerminal[] calldata _terminals,
  string memory _memo
) external override returns (uint256 projectId) { ... }
```

Check out the [Treasury design](/v4/deprecated/v3/build/programmable-treasury.md) page for more info on how to build projects treasuries to various specifications.

<details>

<summary>View project info</summary>

Launching a project will mint a new NFT in the [`JBProjects`](/v4/deprecated/v3/api/contracts/jbprojects/README.md) contract. The owner can be found using [`JBProjects.ownerOf(...)`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721-ownerOf-uint256-).

```
function ownerOf(uint256 _projectId) external returns (address owner) { ... }
```

The project's metadata can be found using [`JBProjects.metadataContentOf(...)`](/v4/deprecated/v3/api/contracts/jbprojects/properties/metadatacontentof.md).

```
function metadataContentOf(uint256 _projectId, uint256 _domain)
  external
  view
  returns (string memory) { ... }
```

</details>

<details>

<summary>View funding cycles</summary>

Funding cycle data can be found in the [`JBFundingCycleStore`](/v4/deprecated/v3/api/contracts/jbfundingcyclestore/README.md) contract. A funding cycle configuration can be found using [`JBFundingCycleStore.get(...)`](/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/get.md), where `_configuration` is the block timestamp when the funding cycle was configured, or using [`JBController3_1.getFundingCycleOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#getfundingcycleof) if the funding cycle's metadata is needed alongside.

```
function get(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

```
function getFundingCycleOf(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata) { ... }
```

The project's current funding cycle can be found using [`JBFundingCycleStore.currentOf(...)`](/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/currentof.md), or using [`JBController3_1.currentFundingCycleOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#currentfundingcycleof) if the funding cycle's metadata is needed alongside.

```
function currentOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

```
function currentFundingCycleOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata) { ... }
```

The project's queued funding cycle can be found using [`JBFundingCycleStore.queuedOf(...)`](/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/queuedof.md), or using [`JBController3_1.queuedFundingCycleOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#queuedfundingcycleof) if the funding cycle's metadata is needed alongside.

By default, the queued cycle is a copy of the current one that starts immediately afterwards, using a discounted weight.

If the project has proposed a reconfiguration, the queued cycle will reflect the changes once they are approved by the current cycle's ballot. Reconfigurations during a funding cycle with no ballot are automatically queued.

The project has no queued cycle if the current cycle has no duration.

```
function queuedOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

```
function queuedFundingCycleOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata) { ... }
```

The project's latest configured funding cycle can be found using [`JBFundingCycleStore.latestConfiguredOf(...)`](/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/latestconfiguredof.md), or using [`JBController3_1.latestConfiguredFundingCycleOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#latestconfiguredfundingcycleof) if the funding cycle's metadata is needed alongside. These calls also return the current ballot status for the configuration.

If the latest configured funding cycle's ballot is `Approved`, the configuration should also be queued or current.

```
function latestConfiguredOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBBallotState ballotState) { ... }
```

```
function latestConfiguredFundingCycleOf(uint256 _projectId)
  external
  view
  override
  returns (
    JBFundingCycle memory fundingCycle,
    JBFundingCycleMetadata memory metadata,
    JBBallotState ballotState
  ) { ... }
```

</details>

<details>

<summary>View splits</summary>

A project's splits data can be found in the [`JBSplitStore`](/v4/deprecated/v3/api/contracts/jbsplitsstore/README.md) contract. A group of splits belonging to any particular group during any particular funding cycle configuration can be found using [`JBSplitStore.splitsOf(...)`](/v4/deprecated/v3/api/contracts/jbsplitsstore/read/splitsof.md). The funding cycle's configuration is used as the `_domain` within which the splits apply.

```
function splitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) external view override returns (JBSplit[] memory) { ... }
```

</details>

<details>

<summary>View fund access constraints</summary>

Constraints on accessing a project's funds can found in the [`JBFundAccessConstraintsStore`](/v4/deprecated/v3/api/contracts/jbfundaccessconstraintsstore/) contract associated with the [`JBController3_1`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1) contract used to launch the project. You can find the [`JBFundAccessConstraintsStore`](/v4/deprecated/v3/api/contracts/jbfundaccessconstraintsstore/) contract by calling [`JBController3_1.fundAccessConstraintsStore`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#fundaccessconstraintsstore). The distribution limit of any payment terminal during any funding cycle configuration can be found using [`JBFundAccessConstraintsStore.distributionLimitOf(...)`](/v4/deprecated/v3/api/contracts/jbfundaccessconstraintsstore/#distributionlimitof). The currency being used for this distribution limit is returned alongside.

```
function distributionLimitOf(
    uint256 _projectId,
    uint256 _configuration,
    IJBPaymentTerminal _terminal,
    address _token
) external view override returns (uint256, uint256);
```

The overflow allowance from any payment terminal during any funding cycle configuration can be found using [`JBFundAccessConstraintsStore.overflowAllowanceOf`](/v4/deprecated/v3/api/contracts/jbfundaccessconstraintsstore/#overflowallowanceof). The currency being used for this overflow allowance is returned alongside.

```
function overflowAllowanceOf(
    uint256 _projectId,
    uint256 _configuration,
    IJBPaymentTerminal _terminal,
    address _token
) external view override returns (uint256, uint256);
```

</details>

<details>

<summary>View terminals and controller</summary>

The [`JBDirectory`](/v4/deprecated/v3/api/contracts/jbdirectory/) contract stores addresses of payment terminals that a project is currently accepting funds through. A project's currently set terminals can be found using [`JBDirectory.terminalsOf(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/read/terminalsof.md).

```
function terminalsOf(uint256 _projectId) external view override returns (IJBPaymentTerminal[] memory) { ... }
```

If a project has multiple terminals for the same token, the primary terminal that it wishes to accept that token type through can be found using [`JBDirectory.primaryTerminalOf(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/read/primaryterminalof.md).

```
function primaryTerminalOf(uint256 _projectId, address _token)
  public
  view
  override
  returns (IJBPaymentTerminal) { ... }
```

The [`JBDirectory`](/v4/deprecated/v3/api/contracts/jbdirectory/) contract also stores the address of the controller that is managing a project's funding cycles and tokens. A projects current terminal can be found using [`JBDirectory.controllerOf(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/properties/controllerof.md).

```
function controllerOf(uint256 _projectId) external view override returns (IJBController3_1) { ... }
```

</details>

Once a project has been created, it can begin accepting funds from anyone through any terminal it has added. For example, if the project has added the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1), ETH can be sent to the project by calling its [`JBETHPaymentTerminal3_1_1.pay(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#pay) transaction.

```
function pay(
  uint256 _projectId,
  uint256 _amount,
  address,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) returns (uint256) { ... }
```

<details>

<summary>View treasury balance</summary>

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1), such as [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1)'s and [`JBERC20PaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1/)'s, a project's treasury balance can be found in its store contract. For example, in the [`JBSingleTokenPaymentTerminalStore3_1_1`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/), the balance can be found using [`JBSingleTokenPaymentTerminalStore3_1_1.balanceOf(...)`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#balanceof).

```
function balanceOf(IJBPaymentTerminal _terminal, uint256 _projectId)
  external
  view
  override
  returns (uint256) { ... }
```

The project's current overflow for a terminal can also be found in the store contracts. For example, in the [`JBSingleTokenPaymentTerminalStore3_1_1`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1), the terminal's overflow can be found using [`JBSingleTokenPaymentTerminalStore3_1_1.currentOverflowOf(...)`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#currentoverflowof).

```
function currentOverflowOf(IJBSingleTokenPaymentTerminal _terminal, uint256 _projectId)
  external
  view
  override
  returns (uint256) { ... }
```

A terminal store can also resolve the total amount of overflow in all of a project's terminals. For example, in the [`JBSingleTokenPaymentTerminalStore3_1_1`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1), the project's overall overflow can be found using [`JBSingleTokenPaymentTerminalStore3_1_1.currentTotalOverflowOf(...)`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#currentoverflowof). You will need to send the number of decimals you're expecting the returned fixed point number to include, and the currency it is in terms of.

```
function currentTotalOverflowOf(
  uint256 _projectId,
  uint256 _decimals,
  uint256 _currency
) external view override returns (uint256) { ... }
```

</details>

<details>

<summary>View project token distribution</summary>

Each holder's balance of a project's token can be found in the [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore) contract. The balance can be found using [`JBTokenStore.balanceOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/read/balanceof.md).

```
function balanceOf(address _holder, uint256 _projectId) external view returns (uint256 _result) { ... }
```

The project token's total supply can also be found in the [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore) contract using [`JBTokenStore.totalSupplyOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/read/totalsupplyof.md)

```
function totalSupplyOf(uint256 _projectId) external view returns (uint256) { ... }
```

</details>

<details>

<summary>View reserved token balance</summary>

A project's undistributed reserved token balance can be found in the project's current controller. For example in the [`JBController3_1`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/), this balance can be found using [`JBController3_1.reservedTokenBalanceOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#reservedtokenbalanceof).

```
function reservedTokenBalanceOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  returns (uint256) { ... }
```

For projects using [`JBController3_1`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/), the project token's total supply including any allocated reserved tokens that have yet to be distributed can be found in using [`JBController3_1.totalOutstandingTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#totaloutstandingtokensof).

```
function totalOutstandingTokensOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  override
  returns (uint256) { ... }
```
</details>

Anyone can distribute a project's funds from a terminal up to its current funding cycle's distribution limit to its preprogrammed payout splits at any time. For example, if the project has added the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1), funds can be distributed by calling [`JBETHPaymentTerminal3_1_1.distributePayoutsOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#distributepayoutsof).

```
function distributePayoutsOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  uint256 _minReturnedTokens,
  string calldata _memo
) external virtual override returns (uint256 netLeftoverDistributionAmount)  { ... }
```

<details>

<summary>View used distribution limit</summary>

Any distribution limit used by a project can be found in the terminal store contract for each terminal. For example, in the [`JBSingleTokenPaymentTerminalStore3_1_1`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/), the distribution limit used during a funding cycle can be found by calling [`JBSingleTokenPaymentTerminalStore3_1_1.usedDistributionLimitOf(...)`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#useddistributionlimitof).

```
function usedDistributionLimitOf(
  IJBPaymentTerminal _terminal,
  uint256 _projectId,
  uint256 _fundingCycleNumber
) external view override returns (uint256) { ... }
```

</details>

A project's owner can distribute additional funds from its treasury's overflow for each of its terminals up until its preconfigured allowance. For example, if the project has added the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1), funds can be distributed by calling its [`JBETHPaymentTerminal3_1_1.useAllowanceOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#useallowanceof) transaction.

```
function useAllowanceOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  uint256 _minReturnedTokens,
  address payable _beneficiary,
  string memory _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.USE_ALLOWANCE)
  returns (uint256 netDistributedAmount) { ... }
```

<details>

<summary>View used overflow allowance</summary>

Any overflow allowance used can also be found in the terminal store contracts for each terminal. For example, in the [`JBSingleTokenPaymentTerminalStore3_1_1`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/), the overflow allowance used during a funding cycle can be found using [`JBSingleTokenPaymentTerminalStore3_1_1.usedOverflowAllowanceOf(...)`](/v4/deprecated/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#usedoverflowallowanceof).

```
function usedOverflowAllowanceOf(
  IJBPaymentTerminal _terminal,
  uint256 _projectId,
  uint256 _fundingCycleNumber
) external view override returns (uint256) { ... }
```

</details>

The protocol uses price feeds to convert values from one currency to another when distributing payouts, using overflow allowances, issuing project tokens when payments are received in various currencies, and more. Current currency indexes can be found in [`JBCurrencies`](/v4/deprecated/v3/api/libraries/jbcurrencies.md). New currencies and price feeds can be added in the future.

<details>

<summary>View price conversions</summary>

The same price feeds the protocol uses internally can be accessed externally through the [`JBPrices`](/v4/deprecated/v3/api/contracts/jbprices/README.md) contract using [`JBPrices.priceFor(...)`](/v4/deprecated/v3/api/contracts/jbprices/read/pricefor.md). This will revert if a feed is not found for the currency pair provided.

```
function priceFor(
  uint256 _currency,
  uint256 _base,
  uint256 _decimals
) external view override returns (uint256) { ... }
```

</details>

A project's owner can mint more of the project's token by calling [`JBController3_1.mintTokensOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/mintfor.md). Anyone can burn their tokens by calling [`JBController3_1.burnFrom(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/burnfrom.md).

```
function mintTokensOf(
  uint256 _projectId,
  uint256 _tokenCount,
  address _beneficiary,
  string calldata _memo,
  bool _preferClaimedTokens,
  bool _useReservedRate
)
  external
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.MINT,
    directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender))
  ) { ... }
```

```
function burnTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  string calldata _memo,
  bool _preferClaimedTokens
)
  external
  override
  nonReentrant
  requirePermissionAllowingOverride(
    _holder,
    _projectId,
    JBOperations.BURN,
    directory.isTerminalDelegateOf(_projectId, msg.sender)
  ) { ... }
```

At any point, anyone can distribute a project's reserved tokens to the project's preprogrammed reserved token splits by calling [`JBController3_1.distributeReservedTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#distributereservedtokensof).

```
function distributeReservedTokensOf(uint256 _projectId, string memory _memo)
  external
  nonReentrant
  returns (uint256) { ... }
```

Anyone who holds a project's tokens can redeem them at one of the project's terminals for a proportional share of the project's overflow. For example, if the project has added the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1), ETH can be reclaimed by redeeming project tokens in its [`JBETHPaymentTerminal3_1_1.redeemTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof) transaction. The overflow amount is the terminal's balance minus the current funding cycle's distribution limit, and can be set to include the project's balance across all terminals.

Redeeming tokens allows a project's token holders to exit the community at any time with their share of the funds. If the project's [redemption rate](/v4/deprecated/v3/learn/glossary/redemption-rate/) is less than 100%, redemptions incur a 2.5% JBX membership fee.

```
function redeemTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  uint256 _minReturnedTokens,
  address payable _beneficiary,
  string memory _memo,
  bytes memory _metadata
)
  external
  virtual
  override
  requirePermission(_holder, _projectId, JBOperations.REDEEM)
  returns (uint256 reclaimAmount) { ... }
```

A project's owner can reconfigure the project's funding cycle at any time by calling [`JBController3_1.reconfigureFundingCyclesOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof). If the project is in the middle of a funding cycle with a duration, the update will be queued to take effect next cycle. If the current funding cycle has an attached ballot contract, the reconfiguration must be approved by it before taking effect.

```
function reconfigureFundingCyclesOf(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] calldata _fundAccessConstraints,
  string calldata _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
  returns (uint256 configuration){ ... }
```

<details>

<summary>View reconfiguration ballot status</summary>

Reconfigurations are subject to the approval of the ballot contract included in the current funding cycle. The current ballot state can be found using [`JBFundingCycleStore.ballotStateOf(...)`](/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/currentballotstateof.md).

```
function currentBallotStateOf(uint256 _projectId) external view override returns (JBBallotState) { ... }
```

</details>

At any point, anyone can inject funds into a project's treasury via one of its terminals. For example, if the project has added the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1), someone can add ETH to a treasury by calling the terminal's [`JBETHPaymentTerminal3_1_1.addToBalanceOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#addtobalanceof) transaction.

```
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) { ... }
```

By default the protocol uses an internal accounting mechanism to account for projects' tokens. At any time after the project has been created, its owner can issue ERC-20 tokens for the protocol to use as its community token by calling [`JBController3_1.issueTokenFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/issuefor.md).

A project can instead bring their own token, so long as the token adheres to the [`IJBToken`](/v4/deprecated/v3/api/interfaces/ijbtoken.md) interface, uses 18 decimals fixed point accounting, and isn't already being used by another project. They can do so by calling [`JBController3_1.setFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/setfor.md) This makes it easy to use ERC-1155s or custom contracts, or to change tokens over time to achieve a more creative design.

```
function issueFor(
  uint256 _projectId,
  string calldata _name,
  string calldata _symbol
)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.ISSUE)
  returns (IJBToken token) { ... }
```

```
function setFor(
  uint256 _projectId,
  IJBToken _token
)
  external
  nonReentrant
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.SET_TOKEN) { ... }
```

<details>

<summary>View the project's token</summary>

The token currently being used by a project can be found in the [`JBTokensStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/README.md) contract by using [`JBTokenStore.tokenOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/properties/tokenof.md). This will return a zero address if the project hasn't yet issued tokens or changed into a custom token.

```
function tokenOf(uint256 _projectId) external view override returns (IJBToken) { ... }
```

The project a token is currently being used for can be found by calling [`JBTokenStore.projectOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/properties/projectof.md).

```
function projectOf(IJBToken _token) external view override returns (uint256) { ... }
```
</details>

If a project has issued an ERC-20s or is using a custom [`IJBToken`](/v4/deprecated/v3/api/interfaces/ijbtoken.md), a holder can claim tokens that are being represented via the internal accounting mechanism into the ERC-20 or custom `IJBToken` by calling [`JBTokenStore.claimFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/claimfor.md).

```
function claimFor(
  address _holder,
  uint256 _projectId,
  uint256 _amount
) external override requirePermission(_holder, _projectId, JBOperations.CLAIM) { ... }
```

<details>

<summary>View a holder's unclaimed project token balance</summary>

Each project token holder's unclaimed balance can be found in the [`JBTokensStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/README.md) contract using [`JBTokenStore.unclaimedBalanceOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/properties/unclaimedbalanceof.md).

```
function unclaimedBalanceOf(address _holder, uint256 _projectId) external view override returns (uint256) { ... }
```

A project's total unclaimed token supply can be found using [`JBTokenStore.unclaimedTotalSupplyOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md)

```
function unclaimedTotalSupplyOf(uint256 _projectId) external view override returns (uint256) { ... }
```

</details>
