---
sidebar_position: 6
---
# Updates 

### May 23, 2025 - JBOmniController 

Proposal to deploy `JBOmniController` which serves as both a project's controllers as well as an omnichain deployer.

Currently, in order to update an omnichain project, a user must give the [`JBOmnichainDeployer`](/docs/v4/api/omnichain-deployers/JBOmnichainDeployer.md) permission on each chain, without the ability to aggregate as a [Relayr](/docs/v4/learn/glossary/relayr.md) transaction. This is not a fun UX.

We can fork and make a few updates to the [`JBController`](/docs/v4/api/core/JBController.md) in order to allow omnichain projects to queue rulesets from it directly. This will make updating omnichain projects one call to [Relayr](/docs/v4/learn/glossary/relayr.md). We will add a `launchOmnichainProjectFor` function to it. This `JBOmniController` will be aware of [Suckers](/docs/v4/learn/glossary/suckers.md), whereas the current `JBController` is not.

Once deployed, web clients should use the new `JBOmniController` to deploy projects going forward, and consider giving users on the current controller an option to migrate to it.

A new Buyback Hook and Croptop contracts will also be deployed for future projects to use, since the currently deployed one has a strong dependency on the project using the controller immutably written to it.

This will also require a transaction by JuiceboxDAO to [`JBDirectory.setIsAllowedToSetFirstController(...)`](/docs/v4/api/core/JBDirectory.md#setisallowedtosetfirstcontroller), see [Administration](/docs/v4/learn/administration.md).

### April 16, 2025 - USD/ETH price feed on JBCurrencyIds = 3.

Proposal to deploy a new USD/ETH price feed on [`JBCurrencyIds`](/docs/v4/api/core/libraries/JBCurrencyIds.md) 3. The one that was deployed on 2 was deployed inverted, interpreting the USD/ETH price as ETH/USD, and is therefor innaccruate and unusable.