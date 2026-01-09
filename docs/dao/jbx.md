---
title: JBX Accounting
sidebar_position: 3
---

### Why JBX  

Juicebox is developed by an open organization of JBX holders. JBX has no CEO, no hiring department, and no Board of Directors; instead, it is operated by JBX token holders with financial stake in its success. By using tokens and the Juicebox protocol itself, the organization is able to manage strategic decisions and build the Juicebox protocol and ecosystem at a global scale entirely through the internet.

### How JBX Works

JBX is the organization's ownership token. Up until the approval of [JBP 484](https://nance.app/s/juicebox/484), it was created when people paid the [JBX project on Juicebox](https://juicebox.money/@juicebox), and destroyed when people cash out JBX to reclaim ETH from this project. Through the V3 protocol, JBX also received [protocol fees](#about-fees), which created JBX in the same way. After JBP 484, JBX supply is fixed and inbound funds and fees to the V3 JBX project have been used to buy JBX on Uniswap.

JBX is the first project on each early version (versions 1-3) of the Juicebox protocol, with project ID of 1. You can find its current V2/3 project [here](https://juicebox.money/@juicebox), and its old V1 project [here](https://juicebox.money/p/juicebox). Old JBX (from its old project) can be [migrated to the new JBX](/blog/jbx-v3-migration-guide/).

1. JBX: [`0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2`](https://etherscan.io/token/0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2)[^1].
2. Old JBX (deprecated): [`0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66`](https://etherscan.io/token/0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66).

JBX decision making on [Nance](https://nance.app/s/) decides all JBX rules, including the amount of JBX which gets created when paid, as well as the amount of ETH JBX holders can get back by cashing out their tokens. Approved proposals are implemented by the 6/9 multisig counsel, which exists as a [Gnosis Safe Multisig](https://app.safe.global/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/). Signers are elected by JBX decisions. See the full Decision Process [here](https://docs.juicebox.money/dao/process/) — this process is also decided upon and ratified by JBX owners.

JBX is no longer a built-in component of the Juicebox V4/5's fee process. Instead, project ID 1 on V4 and V5 is the NANA [revnet](https://docs.juicebox.money/v5/learn/revnet/) that is used to collect fees. JBX owns 62% of NANA issuance, and therefor 62% of all fees collected on Juicebox V4/5 – the rest is owned by fee payers.

### Buyback Hook 

After it was approved by JBX voting in [JBP 408](https://nance.app/s/juicebox/408), the buyback hook was added to JBX project. Now when JBX is paid on V2/3, this contract checks if the Uniswap JBX price is cheaper than the price to create new JBX from the project. If it is the payment is sent to Uniswap instead to buyback JBX. Since [JBP 484](https://nance.app/s/juicebox/484), the buyback hook services all inbound payments since the issuance rate is fixed at 0.

This means that the JBX supply is capped until otherwise decided by JBX owners. 

1. Uniswap pool: [ETH - JBX](https://app.uniswap.org/tokens/ethereum/0x4554cc10898f92d45378b98d6d6c2dd54c687fb2).
2. Uniswap pool contract: [`0xC9a2afE879b5283931DC89Bd27759a12749BCd0C`](https://etherscan.io/address/0xC9a2afE879b5283931DC89Bd27759a12749BCd0C)
3. CoinGecko pool chart: [GeckoTerminal](https://www.geckoterminal.com/eth/pools/0xc9a2afe879b5283931dc89bd27759a12749bcd0c)

### Current JBX Parameters

JBX runs as a Juicebox project itself. This means its issuance, cash out, and distribution are all subject to the project's parameters. As of [JBP 484](https://nance.app/s/juicebox/484), the project has the following rules:

| Parameter | What it Means |
| --- | --- |
| **Ruleset Length:** 14 days | JBX holders can only update the project's rules every 14 days. It also sends payouts every 14 days. |
| **JBX Issuance Rate:** 0 JBX/ETH | For every ETH paid into the project, 0 JBX are issued. |
| **Reserved Rate:** 50% | Half of the JBX being issued or bought back is reserved for the organization's balance sheet, the other half is sent to the payer. |
| **Cash Out Tax Rate:** 70% | JBX can be cashed out along a 70% bonding curve.[^2] |

JBX's old V1 project has been disabled. This information may be out of date — to see the current configuration, visit the [JBX project page](https://juicebox.money/@juicebox).

You can see the current JBX distribution in the chart below (or on [Dune](https://dune.com/queries/2331798)).

<style>{`iframe {
  width: 100%;
  min-height: 400px;
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: 0px;
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

### About Fees

Juicebox projects pay a 2.5% JBX membership fee and receive JBX (v1-3) or NANA (v4-5) when

1. They send a payout to a wallet outside of the Juicebox ecosystem, or when
2. Funds are cashed out while a project's cash out tax rate is greater than 0%.

To be clear:

- There are no fees when projects receive payments.
- There are no fees on cash outs if the cash out tax rate is 0%.
- There are no fees on payouts to other Juicebox projects, they are only incurred when funds leave the ecosystem.

These fees are used to buy JBX on Uniswap, or feed the NANA revnet. The project owner paying the fee gets 50% of the JBX, or 38% of the NANA, and the rest goes to JBX's balance sheet.

The fee is fixed at 2.5%. The Juicebox protocol itself has very minimal power over the protocol's levers, which you can learn about [here](https://docs.juicebox.money/v5/learn/administration/).

Projects can also temporarily set fees on payouts aside with [Hold fees](https://docs.juicebox.money/v5/glossary/hold-fees/). This can be useful if a project needs to temporarily pull funds out of their project, but plans to return those funds to the project later on and does not want to pay fees in the interim. If the project does not return the funds in 28 days, the fees are processed.

### Initial Supply 

A total of 144,246,772 (old) JBX was premined to pay for the initial development of the Juicebox and the libraries/tools which made it possible. You can learn about this in [this blog post](/blog/premine/). This premine constitutes ~7.02% of the JBX supply as of December 7th, 2023.

[^1]: The `totalSupply` of v3 JBX includes the supplies of v1/v2 JBX.
[^2]: For a clearer understanding, look at this [bonding curve calculator on Desmos](https://www.desmos.com/calculator/9pewqesyj5). Use `r = 0.7`.
