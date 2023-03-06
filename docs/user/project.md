---
title: Setting Up Your Project
sidebar_position: 2
---

:::tip
We also have a [video tutorial](https://www.youtube.com/watch?v=2s2OyxG_rvo). If you need help, [contact onboarding](https://juicebox.money/contact).
:::

What to know beforehand:

- You can edit all of your project's rules over time — this allows your project to evolve as your community does.
- When you create a Juicebox project, an *Owner NFT* is minted to your wallet. Only the holder of that NFT (you, the "project owner") can edit the project's rules. Nobody else can edit your project's rules — not even JuiceboxDAO.
- This guide is based on [juicebox.money](https://juicebox.money). If you're setting up your project somewhere else, the steps might be different.

## Project Settings

#### Project details

Your project's name, logo, and description. Tell people what your project is about, and why they should support it! You can edit these later. For an animated logo, upload a `.gif`.

#### Cycles

With unlocked cycles, you can edit your project's rules at any time.

With locked cycles, you can lock your project's rules for a period of time (like 3 minutes, 2 years, or 14 days), helping you build trust with your supporters.

If you try to edit your rules in the middle of a locked cycle, the edits get *queued* for the next cycle. In other words: instead of going into effect immediately, they go into effect when your next cycle starts. If your don't queue a new cycle, Juicebox copies your current rules over.

*How to choose:* If you **need** the flexibility, you can use unlocked cycles — otherwise, locked cycles are the better option for building confidence with your supporters.

#### Payouts

The amount of ETH which can be paid out from your project during the cycle. Payouts reset each cycle.

- Having no payouts means you can't pay out any ETH.
- 3 ETH of payouts lets you pay out 3 ETH.
- $4,500 of payouts lets you pay out $4,500 worth of ETH.
- "Unlimited payouts" lets you pay out all of the ETH in the project.

The ETH not needed for a cycle's payouts will:

1. Serve as a runway. Your payouts reset every cycle, so leaving ETH in the project gives you a head-start for next cycle.
2. Allow your supporters to redeem their tokens to receive some ETH back from the project. You can choose the amount of ETH they receive by setting up a [redemption rate](#redemption-rate).

*How to choose:* The lower you set your payouts, the more ETH will be available for redemptions, making supporters more likely to trust your project — and if you start with **no** payouts, you can offer your supporters a full refund. Keep in mind that payouts are the only way for you to access funds. If you need more flexibility, set this to a higher amount.

#### Payout Recipients

This is where your payouts are sent. By default, payouts go to your wallet (the project owner), but you can set up any number of Ethereum wallets or Juicebox projects to pay ETH to.

You can define payouts by percentage (50% of funds go to `vitalik.eth`) or by amount (3 ETH goes to the `@peel` project, or $2,500 worth of ETH goes to `jango.eth`). You can use these payouts to manage your organization's entire payroll — JuiceboxDAO does.

:::tip
Payouts to wallets (like `vitalik.eth`) will incur a 2.5% fee, which is paid to JuiceboxDAO. In exchange, your project will receive JuiceboxDAO's project token ($JBX), allowing you to govern the protocol. You can also redeem these tokens to reclaim some of the fees. Payouts to Juicebox projects don't incur any fees. To learn more, read [JBX & Fees](/dao/reference/jbx/).
:::

#### Edit deadline

Edits must be made before this deadline. This gives token holders time to verify the edits before they take effect, and assures them that you can't edit the cycle at the last second.

For example: with a 3-day edit deadline, edits must be made at least 3 days before a cycle starts. Otherwise, those edits won't take effect until the cycle *after* the next one.

*How to choose:* The longer your edit deadline, the easier it will be for supporters to check your edits, but the harder it will be to move quickly. A 3-day deadline is a good starting point for most projects.

## Token

:::tip
Project tokens are not ERC-20 tokens by default. Once you create your project, you can create an ERC-20 for your supporters to claim, making them compatible with tools like Uniswap. This is optional.
:::

#### Total mint rate

The total number of tokens minted when this project is paid 1 ETH. Some of these tokens may be reserved by the project, and the rest are sent to the payer.

*How to choose:* The protocol calculates everything proportionately, so this number doesn't matter too much. 1,000,000 is a good starting point for most projects.

#### Reserved rate

As tokens are minted, you can set aside a percentage of them for the wallets and Juicebox projects of your choosing. With a reserved rate of 20%, 20% of tokens are redirected towards whoever is on your list.

*How to choose:* If you need to offer full refunds, set this to 0%. Reserved rates can vary widely — projects set this anywhere from 0% to 50%.

#### Mint rate reduction

This makes your token more expensive over time. With a 5% mint rate reduction, your tokens will get 5% more expensive each cycle, even if you don't edit the cycle.

*How to choose:* A mint rate reduction can have a dramatic effect: the higher you set it, the more you reward earlier supporters over later ones. Most projects will keep this disabled, or use a rate from 1-3%.

#### Redemption rate

Supporters can burn their tokens to reclaim some of the ETH not needed for payouts. The amount of ETH they receive depends on the redemption rate.

At 100%, redemptions are 1:1 — somebody redeeming 10% of all project tokens will receive 10% of the ETH not needed for payouts. At 0%, redemptions are turned off. Anywhere else, redemptions take place along a bonding curve, meaning earlier redeemers will get less ETH per token redeemed, and later redeemers will get more.

The lower this rate is, the less of an incentive there is to redeem tokens before others.

*How to choose:* To start, you should keep this rate at 100% (redemptions on) or 0% (redemptions off), and then adjust from there.

#### Owner token minting

If this is enabled, you (the project owner) can mint tokens on demand.

*How to choose:* This will appear risky to supporters, so keep this off unless you're completely sure you need to enable it.

## NFTs

Juicebox also lets you reward your supporters with one or more custom NFT tiers:

- **You can use NFTs for redemption instead of using tokens.**
- You can set up tiers when creating your project, and can also add or remove tiers over time.
- Each tier can have unique metadata, as well as a unique price, maximum supply, reserved rate, and governance voting power.

You can use NFTs for off-chain governance with a tool like [Snapshot](/user/resources/snapshot/), or for on-chain governance with Governor Contracts — Juicebox NFTs adhere to the [`ERC721Votes`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Votes) standard. [*Learn more about on-chain governance.*](#on-chain-governance)

:::tip
These NFTs are a great way to create an NFT collection for your artwork — some projects use Juicebox for this alone, turning off tokens entirely. 
:::

:::caution
Adding NFTs may increase the gas fee for creating your project.
:::

#### Tiers

You need to have at least one tier for your project to have NFTs. To add a tier, click `Add NFT`. Each tier can have:

- A unique image, name, description, and link.
- A price. If this is set to 1 ETH, somebody who pays your project 1 ETH will receive 1 ETH worth of project tokens **and** an NFT.
- A limited supply — the maximum number of NFTs that can be minted from this tier. You can use this to encourage people to be within the first 50 supporters, or you can make an expensive 1/1 NFT. Each tier can have a different supply.

You can also set advanced options:

- **Reserved NFTs.** For every `N` NFTs minted, mint an extra one to the address of your choosing. This can be a helpful way to reward your collaborators.
- **Voting weight.** Give each tier a custom voting weight, which can be used for off-chain governance (with a tool like [Snapshot](/user/resources/snapshot/), or for on-chain governance.
- **External link.** Link minters to your project's website, Discord, or somewhere else.

#### Collection Settings

These settings apply to all of your NFTs:

- "Collection Name", "Collection Symbol", and "Collection Description" are each a different piece of collection metadata which will be displayed in wallets and on websites like [Zora](https://zora.co/) and [OpenSea](https://opensea.io/).
- The **Payment Success Pop-up** is an optional pop-up shown when people mint an NFT. You can use this to direct contributors to your project's website, Discord, or somewhere else.

#### On-chain Governance

:::tip
Snapshot strategies can read each NFT's voting power, even if your project is set to `No on-chain governance`. See [*Using Snapshot With Juicebox*](/user/resources/snapshot/).
:::

Juicebox NFTs adhere to the [`ERC721Votes`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Votes) standard, meaning you can use them with on-chain governance tools like [Tally](https://tally.xyz/).

This works by tracking an NFT's ownership over time as it is minted, burned, traded, or transferred, meaning that you can calculate the voting power of any address at any time (even for times in the past).

[juicebox.money](https://juicebox.money) lists three on-chain governance options:

| Option | Description |
| --- | --- |
| **No on-chain governance** | Your project won't track voting power over time. |
| **Standard on-chain governance** | Track the total voting power of each address over time. |
| **Tier-based on-chain governance** | Instead of tracking total voting power, the contract tracks each address' voting power within each NFT tier over time. This can be useful for running multiple voting processes out of one treasury, or for complex on-chain governance. |
