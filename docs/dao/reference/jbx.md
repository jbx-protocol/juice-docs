---
title: JBX & Fees
sidebar_position: 1
---

## About JuiceboxDAO

The Juicebox protocol is developed by JuiceboxDAO. JuiceboxDAO has no CEO, no hiring department, and no Board of Directors; instead, it is self-governed via the JBX token. "DAO" stands for *Decentralized Autonomous Organization* — by utilizing token governance and the Juicebox protocol itself, JuiceboxDAO is able to manage strategic decisions, payouts to contributors, and to consistently deliver upgrades to the Juicebox protocol, along with a suite of tools to support it.

## How it Works

JuiceboxDAO's project has project ID #1 on each version of the Juicebox protocol. You can find our current v2 project [here](https://juicebox.money/@juicebox), and our old v1 project [here](https://juicebox.money/p/juicebox).

The DAO is funded through a combination of direct contributions and [protocol fees](#about-fees). When people pay JuiceboxDAO, either directly or through fees, JBX tokens are minted. JBX tokens work in the exact same way as other Juicebox project tokens: by default, they are internally managed by the protocol (in order to save on gas fees), but they can be claimed as an [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token if desired.

JBX can be issued at any time, according to the rules of JuiceboxDAO's projects. It can also be redeemed at any time to reclaim some of the ETH from the DAO's projects (also according to their rules).

These rules are decided upon by JBX token voting on [Snapshot](https://snapshot.org/#/jbdao.eth/). Approved proposals are then implemented by the DAO's 9/14 [Gnosis Safe Multisig](https://app.safe.global/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/), which has signers who are elected through DAO governance. You can see the our full Governance Process [here](https://docs.juicebox.money/dao/process/) — this process is also decided upon and ratified by JBX voters.

## About JBX

As explained above, the JBX token is JuiceboxDAO's project token. This means its issuance, redemption, and distribution are all subject to the rules of the Juicebox protocol. As of 2023-02-24, the DAO's v3 project has the following rules:

| Configuration | What it Means |
| --- | --- |
| **Cycle:** 14 days | The DAO can only update the project's rules every 14 days. It also makes payouts along this cadence. |
| **Token Issuance Rate:** 59,777 JBX/ETH | For every ETH paid into the treasury, 59,777 JBX are issued. |
| **Reserved Rate:** 50% | Half of the JBX being issued is reserved for the DAO's reserved list. This means 29,888.5 JBX will be issued to the payer, and the other 29,888.5 JBX will be split between DAO contributors and the DAO's JBX reserve. |
| **Issuance Reduction Rate:** 0.5% | The token issuance rate will decrease by 0.5% each cycle. |
| **Redemption Rate:** 0% | JBX cannot be redeemed for ETH from the treasury right now. |

The [v1 project](https://juicebox.money/p/juicebox) has a similar configuration, but with redemptions turned on. This information may be out of date — to see the current configuration, visit the [JuiceboxDAO project page](https://juicebox.money/@juicebox).

You can find information about JBX holders and distribution on the [v3](https://juicebox.money/@juicebox) and [v1](https://juicebox.money/p/juicebox) project pages, as well as on our [Dune JBX Dashboard](https://dune.com/juicebox/jbx).[^1]

JuiceboxDAO is now consolidating all JBX and DAO operations into its [v3 project](https://juicebox.money/@juicebox). v1/v2 JBX holders can [exchange their tokens for v3 JBX](/updates/jbx-v3-migration-guide/), and all ETH is being moved into the v3 project. Redemptions for v3 JBX may also be enabled soon (if a proposal is made to do so).

- v1 JBX is claimable as a [`Tickets`](/dev/deprecated/v1/ticketbooth/tickets/) ERC-20: [`0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66`](https://etherscan.io/token/0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66)
- v2 JBX cannot be claimed as an ERC-20
- v3 JBX is claimable as a [`JBV3Token`](/dev/extensions/juice-v3-migration/jbv3token/) ERC-20: [`0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2`](https://etherscan.io/address/0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2)

You can see current JBX holders ranked below:

<style>{`iframe {
  width: 100%;
  min-height: 400px;
  display: inline-block;
}

tr {
  background-color: white;
}`}</style>

<iframe src="https://dune.com/embeds/2331798/3817364"></iframe>

<iframe src="https://dune.com/embeds/2331798/3817394"></iframe>

## About Fees

Juicebox projects pay a 2.5% fee when they pay a wallet outside of the Juicebox ecosystem. To be clear:

- There are no fees when projects receive payments.
- There are no fees on redemptions.
- There are no fees on payouts from a Juicebox project to another Juicebox project.
- When a project has a payout to an external wallet address, a 2.5% fee is automatically paid to JuiceboxDAO's project.

In exchange for paying this fee, projects receive JBX at the current issuance rate, thereby partially governing the protocol.

The fee can be set anywhere between 0% and 5%, as decided by JuiceboxDAO governance. The protocol has very minimal global governance, which you can learn about [here](https://docs.juicebox.money/dev/learn/administration/).

Projects can also temporarily set fees aside with [Hold fees](https://docs.juicebox.money/dev/learn/glossary/hold-fees/). This can be useful if a project needs to temporarily pull funds out of their project, but plans to return those funds to the project later on and does not want to pay fees in the interim.

[^1]: You may see some anomalies in issuance — these were caused by a [v3 JBX deployment bug](https://docs.juicebox.money/updates/v3-jbx-postmortem/), which has since been mitigated.
