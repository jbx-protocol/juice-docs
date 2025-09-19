---
sidebar_position: 6
---
# Change Log

### August 23, 2025 - JBSwapTerminal1_1 

Proposal to deploy `JBSwapTerminal1_1` which works for non-ETH based projects, for example allowing a USDC-based project to get paid in ETH.

### July 23, 2025 - REVLoans1_1 

Proposal to deploy `REVLoans1_1` and use it for all new projects.

Currently `REVLoan` does not work for non-ETH based revnets unless the fee projects accepts that token. 

`REVLoans1_1` fixes this so that the fee is bypassed if the fee project does not accept the token backing the revnet that is paying the fee.

### May 23, 2025 - JBController4_1 and JBOmnichainDeployer4_1 

Proposal to deploy `JBController4_1` and `JBOmniController4_1`. 

Currently, in order to update an omnichain project, a user must give the [`JBOmnichainDeployer`](/docs/dev/v4/api/omnichain-deployers/JBOmnichainDeployer.md) permission on each chain, without the ability to aggregate as a [Relayr](/docs/dev/v4/learn/glossary/relayr.md) transaction. This is not a fun UX.

We can fork and make a few updates to the [`JBController`](/docs/dev/v4/api/core/JBController.md) in order to allow omnichain projects to queue rulesets from it directly. This will make updating omnichain projects one call to [Relayr](/docs/dev/v4/learn/glossary/relayr.md). 

We'll also deploy a fork of [`JBOmnichainDeployer`](/docs/dev/v4/api/omnichain-deployers/JBOmnichainDeployer.md) that allows deployments to `JBController4_1`.

The address of [`JBOmnichainDeployer4_1`](/docs/dev/v4/api/omnichain-deployers/JBOmnichainDeployer4_1.md) is stored in [`JBController4_1`](/docs/dev/v4/api/core/JBController4_1.md), allowing privileged access to [`queueRulesetsOf`](/docs/dev/v4/api/core/JBController4_1.md#queuerulesetsof) and [`launchRulesetsFor`](/docs/dev/v4/api/core/JBController4_1.md#launchrulesetsfor). 

Once deployed, web clients should use the new [`JBController4_1`](/docs/dev/v4/api/core/JBController4_1.md) and [`JBOmnichainDeployer4_1`](/docs/dev/v4/api/omnichain-deployers/JBOmnichainDeployer4_1.md) to deploy projects going forward, and consider giving users on the current controller an option to migrate to [`JBController4_1`](/docs/dev/v4/api/core/JBController4_1.md).

A new Buyback Hook and Croptop contracts will also be deployed for future projects to use, since the currently deployed one has a strong dependency on the project using the controller immutably written to it.

This will also require a transaction by JuiceboxDAO to [`JBDirectory.setIsAllowedToSetFirstController(...)`](/docs/dev/v4/api/core/JBDirectory.md#setisallowedtosetfirstcontroller), see [Administration](/docs/dev/v4/learn/administration.md).

### April 16, 2025 - USD/ETH price feed on JBCurrencyIds = 3.

Proposal to deploy a new USD/ETH price feed on [`JBCurrencyIds`](/docs/dev/v4/api/core/libraries/JBCurrencyIds.md) 3. The one that was deployed on 2 was deployed inverted, interpreting the USD/ETH price as ETH/USD, and is therefor innaccruate and unusable.