---
title: About $JBX
sidebar_position: 3
---

## About JuiceboxDAO

Juicebox is developed by JuiceboxDAO. JuiceboxDAO has no CEO, no hiring department, and no Board of Directors; instead, it is self-governed by the $JBX token. "DAO" stands for *Decentralized Autonomous Organization* — by using token governance and the Juicebox platform, JuiceboxDAO is able to manage strategic decisions, pay contributors, and build the Juicebox protocol and ecosystem.

## How JBX Works

$JBX is JuiceboxDAO's *project token*. This means it is created when people pay [JuiceboxDAO's project on Juicebox](https://juicebox.money/@juicebox), and destroyed when people redeem $JBX to reclaim ETH from JuiceboxDAO's project. Many people pay JuiceboxDAO directly. JuiceboxDAO also receives [protocol fees](#about-fees), which creates $JBX in the same way.

JuiceboxDAO has the first project on each version of the Juicebox protocol. You can find our current project [here](https://juicebox.money/@juicebox), and our old project [here](https://juicebox.money/p/juicebox). Old $JBX (from our old project) can be [migrated to the new JBX](/blog/jbx-v3-migration-guide/).

1. JBX: [`0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2`](https://etherscan.io/token/0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2)[^1].
2. Old JBX (deprecated): [`0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66`](https://etherscan.io/token/0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66).

$JBX voting on [Snapshot](https://snapshot.org/#/jbdao.eth/) decides the amount of $JBX which gets created when JuiceboxDAO is paid, as well as the amount of ETH $JBX holders can get back by redeeming their tokens. Approved proposals are implemented by the DAO's 6/9 [Gnosis Safe Multisig](https://app.safe.global/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/), which has signers who are elected by $JBX voters. You can see the our full Governance Process [here](https://docs.juicebox.money/dao/process/) — this process is also decided upon and ratified by JBX voters.

## Buyback Contract

After it was approved by $JBX voting, the [buyback contract](https://snapshot.org/#/jbdao.eth/proposal/0x25dc6459f1c7871326ea5469daef0b237b1e2a8be9631389c703464a25b10346) was added to JuiceboxDAO's project. Now when JuiceboxDAO's project is paid, this contract checks if the Uniswap $JBX price is cheaper than the price to create new $JBX from the project. If it is the payment is sent to Uniswap instead.

This means that the JBX supply is capped until the Uniswap price becomes more expensive than the price to create new $JBX.

1. Uniswap pool: [ETH - JBX](https://app.uniswap.org/tokens/ethereum/0x4554cc10898f92d45378b98d6d6c2dd54c687fb2).
2. Uniswap pool contract: [`0xC9a2afE879b5283931DC89Bd27759a12749BCd0C`](https://etherscan.io/address/0xC9a2afE879b5283931DC89Bd27759a12749BCd0C)
3. CoinGecko pool chart: [GeckoTerminal](https://www.geckoterminal.com/eth/pools/0xc9a2afe879b5283931dc89bd27759a12749bcd0c)

## Current JuiceboxDAO Parameters

$JBX is JuiceboxDAO's project token. This means its issuance, redemption, and distribution are all subject to the JuiceboxDAO project's parameters. As of 2023-12-07, the project has the following rules:

| Parameter | What it Means |
| --- | --- |
| **Ruleset Length:** 14 days | The DAO can only update the project's rules every 14 days. It also sends payouts every 14 days. |
| **$JBX Issuance Rate:** 53,804 JBX/ETH | For every ETH paid into the project, 53,804 JBX are issued. |
| **Reserved Rate:** 50% | Half of the JBX being issued is reserved for the DAO's reserved list. This means 26,902 JBX will be issued to the payer, and the other 26,902 JBX will be split between [the recipients elected by $JBX voting](https://juicebox.money/v2/p/1?tabid=tokens). |
| **Decay Rate:** 0.5% | The token issuance rate will decrease by 0.5% each ruleset (every 14 days). |
| **Redemption Rate:** 70% | JBX can be redeemed along a 70% bonding curve.[^2] |

JuiceboxDAO's old projects have been disabled. This information may be out of date — to see the current configuration, visit the [JuiceboxDAO project page](https://juicebox.money/@juicebox).

You can see the current JBX distribution in the chart below (or on [Dune](https://dune.com/queries/2331798)).

<style>{`iframe {
  width: 100%;
  min-height: 400px;
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.wrapper {
  display: grid;
  gap: 20px;
}

`}</style>

<div class="wrapper">
  <iframe src="https://dune.com/embeds/2331798/3817364"/>
  <iframe src="https://dune.com/embeds/2331798/3817394"/>
</div>

## About Fees

Juicebox projects pay a 2.5% fee when

1. They send a payout to a wallet outside of the Juicebox ecosystem, or when
2. Funds are redeemed while a project's redemption rate is less than 100%.

To be clear:

- There are no fees when projects receive payments.
- There are no fees on redemptions if the redemption rate is 100%.
- There are no fees on payouts to other Juicebox projects.

These fees are used to buy $JBX on Uniswap. The project owner paying the fee gets 50% of the $JBX, and the rest goes to JuiceboxDAO. If the project owner immediately sells that $JBX, it's as if they paid a ~1.25% fee. In practice, project owners usually hold onto their $JBX and influence [JuiceboxDAO governance](/dao/process/).

The fee can be set anywhere between 0% and 5% by $JBX voting. The Juicebox protocol has very minimal global governance, which you can learn about [here](https://docs.juicebox.money/v4/deprecated/v3/learn/administration/).

Projects can also temporarily set fees on payouts aside with [Hold fees](https://docs.juicebox.money/v4/deprecated/v3/learn/glossary/hold-fees/). This can be useful if a project needs to temporarily pull funds out of their project, but plans to return those funds to the project later on and does not want to pay fees in the interim.

## Premine

A total of 144,246,772 (old) $JBX was premined to pay for the initial development of the Juicebox and the libraries/tools which made it possible. You can learn about this in [this blog post](/blog/premine/). This premine constitutes ~7.02% of the $JBX supply as of December 7th, 2023.

[^1]: The `totalSupply` of v3 JBX includes the supplies of v1/v2 JBX.
[^2]: For a clearer understanding, look at this [bonding curve calculator on Desmos](https://www.desmos.com/calculator/9pewqesyj5). Use `r = 0.7`.
