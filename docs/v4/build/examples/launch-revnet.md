---
sidebar_position: 1
---

# Launching a revnet

In order to understand what Revnets can do, all you have to do is fully understand how one transaction works: [`JBController4_1.deployFor(...)`](/docs/v4/api/revnet/REVDeployer.md#deployfor), which creates a revnet, queues all its stages, and specifies where it can begin receiving funds. 

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

Here's a complete example of how a revnet deployment can look:

*   For `revnetId` send the ID of the revnet to deploy, if a project already exists but does not yet have rulesets queued. Send 0 to make a new revnet.

    ```javascript
    Example:

    1
    ```

*   For `configuration` send a [`REVConfig`](/docs/v4/api/revnet/structs/REVConfig.md):

    ```javascript
    Example:

    {
        description: {
            name: "My Revnet",
            ticker: "MYREV",
            uri: "ipfs://QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw",
            salt: 1234567890 // A salt to use for deploying a revnet token to a deterministic address.
        },
        baseCurrency: 1, // ETH currency. 
        splitOperator: 0x0000000000000000000000000000000000000000, // The address that will be able to adjust the revnet's splits within the fixed split limit.
        stageConfigurations: [{
          startsAtOrAfter: 0, // The timestamp after which this stage will be eligible to start.
          autoIssuances: [{
            chainId: 1, // The chain on which the auto issuance should be honored.
            count: 1000000000000000000, // The amount of tokens to make available for issuance at the start of this stage. Fixed point 18 decimals.
            beneficiary: 0x0000000000000000000000000000000000000000 // The address that will receive the auto issued tokens.
          }],
          splitPercent: 1000, // The percentage of token issuance that will be issued to the splits below during this stage. Out of 10_000.
          splits: [{
            percent: 50_000_000, // 5%, out of 1_000_000_000
            projectId: 0, // Not used.
            preferAddToBalance: false, // Not used, since projectId is 0.
            beneficiary: 0x0123456789012345678901234567890123456789, // The beneficiary of the split.
            lockedUntil: 0, // The split is not locked, meaning the project owner can remove it or change it at any time.
            hook: 0x0000000000000000000000000000000000000000 // Not used.
          }],
          initialIssuance: 1000000000000000000, // The amount of tokens to issue per base currency unit at the start of this stage. Fixed point 18 decimals.
          issuanceCutFrequency: 30 * 86400, // The frequency (in seconds) of issuance cuts.
          issuanceCutPercent: 1000000, // The percentage of issuance that will be cut from the issuance during this stage. Out of 1_000_000_000.
          cashOutTaxRate: 1000, // The tax rate on cashouts. Out of 10_000.
          extraMetadata: 0 // Extra metadata to attach to this stage.
        }],
        loanSources: [{
          token: 0x000000000000000000000000000000000000EEEe, // The token that is being loaned.
          terminal: <address of JBMultiTerminal>, // The terminal that the loan is being made from.
        }],
        loans: <address of REVLoans1_1>, // The address of the loans contract.
    }
    ```

*   For `terminalConfigurations` send the following  [`JBTerminalConfig`](/docs/v4/api/core/structs/JBTerminalConfig.md):

    ```javascript
    Example:

    [{
      terminal: <address of JBMultiTerminal>, // A terminal to access funds through.
      // The tokens to accept through the given terminal, and how they should be accounted for.
      accountingContextsToAccept: [{
        token: 0x000000000000000000000000000000000000EEEe, // The token to accept through the given terminal.
        decimals: 18, // The number of decimals the token is accounted with as a fixed point number.
        currency: 61166 // The currency used with the token is NATIVE_CURRENCY. This ensures proper price conversion when necessary.
      }]
    }]
    ```


*   For `buybackHookConfiguration` send the following  [`REVBuybackHookConfig`](/docs/v4/api/revnet/structs/REVBuybackHookConfig.md):

    ```javascript
    Example:

    [{
      hook: <address of JBBuybackHook>, // The address of the buyback hook to use.
      poolConfigurations: [{
        token: 0x000000000000000000000000000000000000EEEe, // The token to setup a pool for, relative to the revnet's token.
        fee: 10000, // The fee of the pool in which swaps occur when seeking the best price for a new participant. Out of 1_000_000. A common value is 1%, or 10_000. Other passible values are 0.3% and 0.1%.
        twapWindow: 86400, // The time window to take into account when quoting a price based on TWAP.
        twapSlippageTolerance: 10000 // The pricetolerance to accept when quoting a price based on TWAP.
      }]
    }]
    ```
   ```

*   For `suckerDeploymentConfiguration` send a [`REVSuckerDeploymentConfig`](/docs/v4/api/revnet/structs/REVSuckerDeploymentConfig.md) that specifies a salt and a set of sucker deployers.

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
