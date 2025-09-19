---
sidebar_position: 1
---

# Launching a project

In order to understand what Juicebox can do, all you have to do is fully understand how one transaction works: [`JBController4_1.launchProjectFor(...)`](/docs/dev/v4/api/core/JBController4_1.md#launchprojectfor), which creates a project, queues its first rulesets, and specifies where it can begin receiving and managing funds from. 

```
function launchProjectFor(
  address owner,
  string calldata projectUri,
  JBRulesetConfig[] calldata rulesetConfigurations,
  JBTerminalConfig[] calldata terminalConfigurations,
  string calldata memo
)
  external returns (uint256 projectId) { ... }
```

For projects deploying omnichain, the [`JBOmnichainDeployer4_1.launchProjectFor(...)`](/docs/dev/v4/api/omnichain-deployers/JBOmnichainDeployer4_1.md#launchprojectfor) transaction is a wrapper that also takes in information about deploying [suckers](/docs/dev/v4/learn/glossary/omnichain.md) for each chain pair.

```
function launchProjectFor(
    address owner,
    string calldata projectUri,
    JBRulesetConfig[] calldata rulesetConfigurations,
    JBTerminalConfig[] calldata terminalConfigurations,
    string calldata memo,
    REVSuckerDeploymentConfig calldata suckerDeploymentConfiguration,
    IJBController controller
)
    external
    returns (uint256 projectId, address[] memory suckers) { ... }
```


Here's a complete example of how a project launch can look:

*   For `projectUri` send a string that points to a JSON file on IPFS:

    ```javascript
    Example:

    "ipfs://QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw"
    ```

*   For `rulesetConfigurations` send the following [`JBRulesetConfig`](/docs/dev/v4/api/core/structs/JBRulesetConfig.md).

    ```javascript
    Example:

    [{
      mustStartAtOrAfter: 0, // A 0 timestamp means the ruleset will start right away, or as soon as possible if there are already other rulesets queued.
      duration: 0, // A duration of 0 means the ruleset will last indefinitely until the next ruleset is queued. Any non-zero value would be the number of seconds this ruleset will last before the next ruleset is queued. If no new rulesets are queued, this ruleset will cycle over to another period with the same duration.
      weight: 1_000_000_000_000_000_000_000_000, // 1,000,000 tokens issued per unit of `baseCurrency` set below.
      weightCutPercent: 0, // 0% weight cut. If the `duration` property above is set to a non-zero value, the `weightCutPercent` property will be used to determine how much of the weight is cut from this ruleset to the next cycle.
      approvalHook: 0x0000000000000000000000000000000000000000, // No approval hook contract is attached to this ruleset, meaning new rulesets can be queued at any time and will take effect as soon as possible given the current ruleset's `duration`.
      metadata: {
        reservedPercent: 5_000, // 50% of tokens are reserved, to be split according to the `splitGroups` property below.
        cashOutTaxRate: 0, // 0% tax on cashouts.
        baseCurrency: 1, // ETH currency. Together with the `weight` property, this determines how many tokens are issued per ETH received. If the project receives a different token, say USDC, a price feed will determine the ETH value of the USDC at the time of the transaction in order to determine how many tokens are issued per USDC received.
        pausePay: false, // Payouts are not paused.
        pauseCreditTransfers: false, // Credit transfers are not paused.
        allowOwnerMinting: false, // The project owner cannot mint new tokens.
        allowSetCustomToken: false, // The project cannot set a custom token.
        allowTerminalMigration: false, // The project cannot move funds between terminals.
        allowSetTerminals: false, // The project cannot set new terminals.
        allowSetController: false, // The project cannot set a new controller.
        allowAddAccountingContext: false, // The project cannot add new accounting contexts to its terminals.
        allowAddPriceFeed: false, // The project cannot add new price feeds.
        ownerMustSendPayouts: false, // Anyone can send this project's payouts to the splits specified in the `splitGroups` property below.
        holdFees: false, // Fees are not held.
        useTotalSurplusForCashOuts: false, // Cash outs are made from each terminal independently.
        useDataHookForPay: false, // The project does not use a data hook for payouts.
        useDataHookForCashOut: false, // The project does not use a data hook for cashouts.
        dataHook: 0x0000000000000000000000000000000000000000, // No data hook contract is attached to this ruleset.
        metadata: 0 // No metadata is attached to this ruleset.
      }
      splitGroups: [{
        groupId: 0x000000000000000000000000000000000000EEEe, // This is the group ID of splits for ETH payouts.
        // Any leftover split percent amount after all with the group are taken into account will go to the project owner.
        splits: [{
          percent: 50_000_000, // 5%, out of 1_000_000_000
          projectId: 0, // Not used.
          preferAddToBalance: false, // Not used, since projectId is 0.
          beneficiary: 0x0123456789012345678901234567890123456789, // The beneficiary of the split.
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000 // Not used.
        },
        {
          percent: 60_000_000, // 6%, out of 1_000_000_000
          projectId: 420, // The projectId of the project to send the split to.
          preferAddToBalance: false, // The payment will go to the `pay` function of the project's primary terminal, not the `addToBalanceOf` function.
          beneficiary: 0x0123456789012345678901234567890123456789, // The beneficiary of the payment made to the project's primary terminal. This is the address that will receive the project's tokens issued from the payment.
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000 // Not used.
        },
        {
          percent: 60_000_000, // 6%, out of 1_000_000_000
          projectId: 421, // The projectId of the project to send the split to.
          preferAddToBalance: true, // The payment will go to the `addToBalance` function of the project's primary terminal, not the `pay` function.
          beneficiary: 0x0000000000000000000000000000000000000000, // Not used, since this split has the `preferAddToBalance` true. 
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000
        },
        {
          percent: 70_000_000, // 7%, out of 1_000_000_000
          projectId: 0, // Not used.
          preferAddToBalance: false, // Not used, since projectId is 0.
          beneficiary: 0x0123456789012345678901234567890123456789, // A beneficary address to send along to the `hook`.
          lockedUntil: 1644543173, // The split is locked until the timestamp 1644543173, meaning the project owner cannot remove it or change it before this timestamp while the ruleset is active.
          hook: 0x6969696969696969696969696969696969696969 // The hook contract that will receive the split's tokens through the `allocate` function.
        },
        // Since the following hook doesn't specify a destination, its funds will go to the address that triggered the `sendPayoutsOf` transaction.
        {
          percent: 10_000_000, // 1%, out of 1_000_000_000
          projectId: 0, // Not used.
          preferAddToBalance: false, // Not used, since projectId is 0.
          beneficiary: 0x0000000000000000000000000000000000000000, // Not used.
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000 // Not used.
        }]
      }, {
        groupId: 1, // This is the group ID of splits for reserved token distribution. 
        // Any leftover split percent amount after all with the group are taken into account will go to the project owner.
        splits: [{
          percent: 50_000_000, // 5%, out of 1_000_000_000
          projectId: 0, // Not used.
          preferAddToBalance: false, // Not used, since projectId is 0.
          beneficiary: 0x0123456789012345678901234567890123456789, // The beneficiary of the split.
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000 // Not used.
        },
        {
          percent: 60_000_000, // 6%, out of 1_000_000_000
          projectId: 420, // The projectId of the project to send the split to.
          preferAddToBalance: false, // The payment will go to the `pay` function of the project's primary terminal, not the `addToBalanceOf` function.
          beneficiary: 0x0123456789012345678901234567890123456789, // The beneficiary of the payment made to the project's primary terminal. This is the address that will receive the project's tokens issued from the payment.
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000 // Not used.
        },
        {
          percent: 70_000_000, // 7%, out of 1_000_000_000
          projectId: 0, // Not used.
          preferAddToBalance: false, // Not used, since projectId is 0.
          beneficiary: 0x0123456789012345678901234567890123456789, // A beneficary address to send along to the `hook`.
          lockedUntil: 1644543173, // The split is locked until the timestamp 1644543173, meaning the project owner cannot remove it or change it before this timestamp while the ruleset is active.
          hook: 0x6969696969696969696969696969696969696969 // The hook contract that will receive the split's tokens through the `allocate` function.
        },
        // Since the following hook doesn't specify a destination, its funds will go to the address that triggered the `sendPayoutsOf` transaction.
        {
          percent: 10_000_000, // 1%, out of 1_000_000_000
          projectId: 0, // Not used.
          preferAddToBalance: false, // Not used, since projectId is 0.
          beneficiary: 0x0000000000000000000000000000000000000000, // Not used.
          lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
          hook: 0x0000000000000000000000000000000000000000 // Not used.
        }] 
      }],
      // Below are the rules according to which funds can be accessed during this ruleset.
      fundAccessLimitGroups: [{
        terminal: <address of JBMultiTerminal> // The terminal to create access limit rules for.
        token: 0x000000000000000000000000000000000000EEEe, // Rules for accessing ETH from the terminal.
        payoutLimits: [{
          amount: 4_200_000_000_000_000_000, // 4.2 ETH can be paid out.
          currency: 1 // ETH
        }, {
          amount: 6_900_000_000_000_000_000, // 6.9 USD worth of ETH can be paid out.
          currency: 1 // ETH 
        }],
        surplusAllowances: [{
          amount: 700_000_000_000_000_000_000, // 700 USD worth of ETH can be used by the project owner discretionarily from the project's surplus.
          currency: 1 // ETH
        }]
      }]
    }]
    ```

*   For `terminalConfigurations` send the following  [`JBTerminalConfig`](/docs/dev/v4/api/core/structs/JBTerminalConfig.md):

    ```javascript
    Example:

    [{
      terminal: <address of JBMultiTerminal>, // A terminal to access funds through.
      // The tokens to accept through the given terminal, and how they should be accounted for.
      accountingContextsToAccept: [{
        token: 0x000000000000000000000000000000000000EEEe, // The token to accept through the given terminal.
        decimals: 18, // The number of decimals the token is accounted with as a fixed point number.
        currency: 61166 // The currency used with the token is ETH. This ensures proper price conversion when necessary.
      }]
    }]
    ```

*   For `memo` send a string that will be attached to the transaction as a memo.

    ```javascript
    Example:

    "I love you"
    ```

*   For `suckerDeploymentConfiguration` send a [`REVSuckerDeploymentConfig`](/docs/dev/v4/api/revnet/structs/REVSuckerDeploymentConfig.md) that specifies a salt and a set of sucker deployers.

    ```javascript
    Example:

    {
      salt: 1234567890, // A salt to use for deploying suckers to a deterministic address.
      deployerConfigurations: [{
        deployer: <address of sucker deployer>,
        mappings: [{
          localToken: <address of local token>,
          minGas: <minimum gas amount used to bridge>,
          remoteToken: <address of remote token>,
          minBridgeAmount: <minimum bridge amount>
        }]
      }]
    }
    ```
