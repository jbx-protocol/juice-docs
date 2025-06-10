# 721 Reward Tiers

#### What everyone needs to know

* 721 Reward Tiers can be attached to a project's rulesets, allowing any payment made towards the project to also qualify for the minting of an NFT along any number of tiers.
* Each project can deploy 721 reward tiers with customizable parameters. Each tier can be specified to have:
  * A price specified in ETH or USD, the minimum contribution necessary to mint an NFT from the tier.
  * Discount percent, specifying an amount to discount the price by.
  * Max quantity.
  * Reserved frequency, specifying the number of NFTs from the tier that can be minted to a predefined beneficiary address as a proportion of NFTs minted to contributors.
  * Voting units, specifying a number to associate with NFTs from each tier that can be used in on-chain or off-chain governance.
  * A URI, overridable by a URI resolver that can return dynamic values for each unit with the tier.
  * A flag specifying if the contract's owner can manually mint from the tier on-demand.
  * A flag indicating if the tier is transferable.
  * A flag indicating if the tier can be deleted.
  * A flag indicating if the tier's discount percent can be increased.
  * A category, which can be used to group tiers for display purposes.
* The 721 Reward Tiers contract's owner can add and remove tiers on demand, subject to flags passed in at the time of its creation:
  * If the contract is set to lock reserved frequency changes, new tiers cannot have a reserved reserved frequency.
  * If the contract is set to lock voting unit changes, new tiers cannot have voting units.
  * If the contract is set to lock manual minting changes, new tiers cannot allow manual minting.
  * If the contract is set to have transfers pausable, a ruleset metadata flag will determine if NFTs are transferable while the cycle is active.
* Incoming payments can directly specify any number of tiers to mint from within their [`JBAfterPayRecordedContext.payerMetadata`](/docs/v4/api/core/structs/JBAfterPayRecordedContext.md).
* If a payment received does not meet a minting threshold or is in excess of the minted tiers, the balance is stored as a pay credit which will be added to future payments and applied to mints at that time. A flag can also be passed alongside a payment to avoid accepting payments that aren't applied to mints in full.

#### What you'll want to know if you're building

* A project can be deployed with a new 721 Tiers contract attached using the [`JB721TiersHookProjectDeployer.launchProjectFor(...)`](/docs/v4/api/721-hook/JB721TiersHookProjectDeployer.md#launchprojectfor) transaction.
* A project's rulesets can be launched with a new 721 Tiers contract attached using the [`JB721TiersHookProjectDeployer.launchRulesetsFor(...)`](/docs/v4/api/721-hook/JB721TiersHookProjectDeployer.md#launchrulesetsfor) transaction.
* A project can be reconfigured with a new 721 Tiers contract using the [`JB721TiersHookProjectDeployer.queuerulesetsof(...)`](/docs/v4/api/721-hook/JB721TiersHookProjectDeployer.md#queuerulesetsof) transaction.
* An already-existing 721 reward tiers contract can be passed into the standard [`JBController4_1.launchProjectFor(...)`](/docs/v4/api/core/JBController.md#launchprojectfor), [`JBController4_1.launchRulesetsFor(...)`](/docs/v4/api/core/JBController.md#launchrulesetsfor), and [`JBController4_1.queueRulesetsOf(...)`](/docs/v4/api/core/JBController.md#queuerulesetsof) transactions in the ruleset's metadata.

