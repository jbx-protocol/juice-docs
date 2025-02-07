---
sidebar_position: 4
---

# Risks

The following are risks that everyone should be aware of before interacting with the Juicebox V4 omnichain protocol. The protocol's design exposes these risks in consequence to its normal operating procedures.

### 1. Smart contract risk

The protocol runs entirely on public smart contracts explained in detail throughout these docs. The Juicebox protocol is public infrastructure running well-known code, all consequences from interacting with networks running the protocol are borne by the entities who sign each transaction. The protocol works according to the specifications outlined in these docs to the extent the code is written and deployed correctly, which is a collective responsibility and not guaranteed. There is a major risk that this is not the case. Please do your own research.

### 2. Project owner risk

Ownership of each project on the Juicebox protocol belongs to the address possessing a [`JBProjects`](/docs/v4/api/core/JBProjects.sol/contract.JBProjects.md) NFT with a unique token ID, which also serves as the project's ID. The address that owns this token can reconfigure a project's rulesets, which empower it to manipulate a project's finances both productively and maliciously.

The following values can be reconfigured by a project's owner on a per-funding cycle basis:

- #### 2.1 Setting a distribution limit and payout splits
	With a distribution limit of zero, all of a project's funds either stay locked or can be reclaimed by token holders. If the project's current ruleset's redemption bonding curve rate allows it, token holders can cash out their tokens to reclaim their share of the project's balance.

	A non-zero distribution limit earmarks a portion of the project's balance for distribution to payout splits.

	A project owner can also change the split allocations that are bound by the ruleset's distribution limit at any time, unless the split was explicitly locked until a specified date during its creation.

	🟢 Used productively, a distribution limit can be used to withdraw funds to a community wallet, distribute funds to contributors, channel funds to other projects operating treasuries on the protocol, or fund anything else that can be expressed as a smart contract.

	🔴 Used maliciously this can be used to rug the project's balance into an arbitrary wallet.

- #### 2.2 Setting a surplus allowance

	With a surplus allowance of zero, all of a project's funds belonging to the community – funds in excess of the distribution limit – cannot be accessed by the project owner. The only way funds can leave the project is through token cash outs.

	A non-zero surplus allowance gives the project owner access to a portion of the community's funds for on-demand distribution to arbitrary addresses.

	🟢 Used productively this can be used to manage discretionary spending.

	🔴 Used maliciously this can be used to rug the project's balance into an arbitrary wallet.

- #### 2.3 Allowing project owner token minting

	While allowing project owner token minting is not allowed, the only way for new project tokens to be minted and distributed is for the project to receive new funds into its balance. Tokens will get minted in accordance to the current ruleset.

	If token minting is allowed, an arbitrary number of tokens can be minted and distributed by the project owner, possibly diluting the redemption value of all outstanding tokens.

	🟢 Used productively this can be used to premint tokens to members, or satisfy other agreed upon inflationary strategies.

	🔴 Used maliciously this can be used to mint extra tokens and cash out to reclaim project funds into an arbitrary wallet, rugging the project.

- #### 2.4 Setting the ruleset's weight

	A ruleset's weight determines how many tokens will be minted and distributed when a project receives funds. By default, a ruleset has the same weight as the one that preceded it after applying the preceding ruleset's decay rate.

	🟢 Used productively this can be used to manage how tokens are issued over time.

	🔴 Used maliciously this can be used to manipulate token issuance, and rug the project's balance into an arbitrary wallet.

- #### 2.5 Adding a custom ERC-20 as the project's token, or deploying a new one.

	While adding an ERC-20 token isn't allowed, the project will issue token credits that are baked in to the protocol.

	If adding an ERC-20 is allowed, a project owner can bring their own ERC-20 that outstanding token credits can be claimed into.

	🟢 Used productively this can be used to create custom token mechanisms associated with a Juicebox project.

	🔴 Used maliciously this can be used to cut off a community of token holders from their project while using the cashing out of a new token to reclaim project funds into an arbitrary wallet.

- #### 2.6 Pause payments

	While payments aren't paused, the standard pay functionality will be accessible.

	If payments are paused to a project, the protocol will reject any inbound payments. 

	🟢 Used productively this can be used to allow projects to creatively tune how its balance can be accessed.

	🔴 Used maliciously this can be used to cut off a community of token holders from standard project functionality.

- #### 2.7 Custom hooks

	If a project's rulesets have no data hook, pay hook, redemption hook, split hook, or ruleset approval hook attached, the consequences of each interaction with the protocol are predictable, consistent, and specified within these docs.

	If a project has attached one of the above hooks, the protocol will access information from them and call functionality within them at specific moments during the execution of various transactions within the regular operation of the protocol.

	🟢 Used productively this can be used to customize what happens when a project receives funds, what happens when the project pays out funds, under what conditions funds can leave a project, and under what conditions queued rulesets can take effect.

	🔴 Used maliciously this can be used to mint excess tokens, rug the project's balance into an arbitrary wallet, trick users into compromising their individual wallets, create arbitrary unwanted and extractive behavior, brick transactions that should otherwise work, or introduce smart contract bugs into otherwise productive extension designs. Do not interact with a project that is using an untrusted hook.

- #### 2.8 Add and remove payment terminals

	While setting payment terminals isn't allowed, a project can only receive funds and offer token cash outs from within the payment terminals it has already attached.

	If setting payment terminals is allowed, projects can begin managing inflows and outflows of funds from new contracts, or remove current contracts where they are doing so.

	🟢 Used productively this can be used to create totally custom project behavior.

	🔴 Used maliciously this can be used to cut off a community of token holders from the project, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs. Do not interact with a projects using untrusted payment terminals.

- #### 2.9 Add accounting contexts to a terminal

	While allowing new accounting contexts to a terminal, a project can start accepting new tokens as payments, using new tokens for payouts, and allowing new tokens to be reclaimed from the project's balance from cash outs.

	🟢 Used productively this can be used to diversify a project's reserve asset.

	🔴 Used maliciously this can be used to cut off a community of token holders from the project, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs. Do not interact with a projects using untrusted accounting contexts.

- #### 2.10 Setting the controller

	While setting the controller isn't allowed, a project can only operate according to the rules of its currently set controller.

	If setting the controller is allowed, projects can bring new rules according to which it'll operate.

	🟢 Used productively this can be used to create totally custom project behavior.

	🔴 Used maliciously this can be used to cut off a community of token holders from the project, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs. Do not interact with a projects using an untrusted controller.

- #### 2.11 Migrating funds between terminals

	While migrating funds between terminals isn't allowed, a project's funds in a terminal cannot be migrated to another terminal which may have alternate constraints.

	If migrating funds between terminals is allowed, a project can move its funds from one terminal to another.

	🟢 Used productively this can be used to move a project into a totally custom environment, or to trusted upgraded versions of the protocol.

	🔴 Used maliciously this can be used to cut off a community of token holders from the project, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs.

- #### 2.12 Cross-chain risk

	If a project is operating using V4's cross-chain utilities (called Suckers), it should make sure its rulesets have a data hook added that allow its funds to be transfered from one network to another without incurring the cash out bonding curve.

	🟢 Used productively this can be used to synchronize a project's dynamics across several blockchains, allowing it to receive funds and operate widely.

	🔴 Used maliciously this can be used to cut off a community of token holders from the project, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs.

- #### 2.13 Multi-hook risks

	If a project is using multiple individually trusted extensions or terminals, there's a chance they could affect one another in a way that requires re-auditing expectations. 

	For example, if a Swap Terminal is used alongside the 721-hook, credits cannot be used to mint NFTs. See [this](https://github.com/TheSyntegrity/Juicebox_V4_Findings/issues/41) audit finding for more information.

- #### 2.14 721-hook cash out risk

	If a project is using the 721-hook for cash outs, it likely also wants to have made sure outstanding NFTs map cleanly to underlying project funds. Otherwise, NFT may be able to access more. 

	🟢 Used productively this can be used to allow a project to issue NFTs when it receives funds, and offer refunds or access to the project according to expected rules.

	🔴 Used maliciously this can be used to cut off a community of token holders from the project, or create arbitrary unwanted and extractive behavior.

- #### 2.15 Buyback-hook pool risk

	If a project is using the buyback-hook, it must choose a fee option for a pool which it cannot change afterwards without using a new buyback hook during a subsequent ruleset. This limits a project owner from forcing issuance instead of buybacks by switching to a low-liquidity pool in real time, but may also prevent buybacks going to a pool with deeper liquidity if it's not the one programmed into the hook. The expectation is that liquidity will form around the pool that is guarenteed to be used for buybacks.

- #### 2.16 Identitcal locked splits risk

	If a project includes two identical splits that are both locked, only one lock will be honored. To fulfill the same intent, the project should instead combine the two splits into one locked split. 

### 3. Price oracle risk

The protocol uses price oracles to normalize prices throughout the its standard operations. These oracles are smart contract mechanisms external to the core Juicebox protocol. Projects using multiple currencies for certain functionality bare the risk of these external oracle systems misreporting price values, or halting all together. To avoid this risk, projects should account distribution limits in the same currency as the token being collected. -->


