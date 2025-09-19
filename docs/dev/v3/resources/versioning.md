---
title: Versioning History
sidebar_position: 5
---

## v1

Juicebox was first deployed to Ethereum mainnet on July 15, 2021. We now refer to this version of the protocol as "Juicebox v1" – you can find an archive of its original documentation [here]((/docs/dev/v1/README.md), and recent v1 API documentation [here](/docs/dev/v1/api/README.md). Its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v1). The v1 contracts were published alongside the article: [Juicebox has been deployed](https://docs.juicebox.money/blog/juicebox-deployed/).

## v1.1

[`TerminalV1_1`](/docs/dev/v1/api/terminalv1_1.md), called Juicebox v1.1, introduced:

- [`payIsPaused`](/docs/dev/v1/api/interfaces/fundingcyclemetadata2.md), a funding cycle metadata flag which allows project creators to pause payments to their project when [`deploy`](/docs/dev/v1/api/terminalv1_1.md#deploy)ing [`configure`](/docs/dev/v1/api/terminalv1_1.md#configure)ing a project.
- [`ticketPrintingIsAllowed`](/docs/dev/v1/api/interfaces/fundingcyclemetadata2.md), a funding cycle metadata flag which allows project creators to mint arbitrary amounts of their project token on-demand. In v1, this behavior was only possible before a project had received its first payment.
- The ability to redeem a project's token when no funds were available to reclaim, thus burning them, was added.
- The [`treasuryExtension`](/docs/dev/v1/api/interfaces/fundingcyclemetadata2.md) option was added to funding cycle metadata. This allowed project owners to designate an [`ITreasuryExtension`](/docs/dev/v1/api/interfaces/itreasuryextension.md) contract to tell the protocol how much ETH the project is storing outside of the protocol, and to take this ETH into account when calculating token redemptions.
- Protocol fees were capped at 5%.
- [A bug](https://docs.juicebox.money/v4/deprecated/resources/post-mortem/2021-08-18/) which caused extra reserved issuance when changing the reserved rate from 0% to another number was fixed.
- A bug which caused issues with overflow calculation when a new cycle had begun and newly availble funds still had not been paid out was fixed.
- In v1, the [`Governance`](/docs/dev/v1/api/governance.md) contract provisioned terminal migrations, price feed updates, and fee changes. In v1.1, this functionality was handled directly within the [`TerminalV1_1`](/docs/dev/v1/api/terminalv1_1.md) contract.

[JBP-71 - Juicebox V1.1 deploy](https://www.jbdao.org/p/71) was approved on January 7th, 2022, and Juicebox v1.1 was deployed to Ethereum mainnet on January 10th, 2022. Its API documentation is available [here](/docs/dev/v1/api/terminalv1_1.md), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v1/tree/version/1.1-deploy). For more information, see the [Juicebox V1.1 Change log](https://docs.juicebox.money/blog/juicebox-v1-1-change-log/).

## TerminalV1Rescue

[`TerminalV1Rescue`](/docs/dev/v1/api/terminalv1rescue.md) allowed allow-listed projects with one-time funding cycles to rescue stuck ETH. A [proposal to deploy it](https://snapshot.org/#/jbdao.eth/proposal/0x9aa1e823d8157a74cba36107f31e8a88d4e6638b2f2387c3aad3ef57cb3d54c8) was approved on February 4th, 2022, and the terminal was deployed to Ethereum mainnet on February 16th, 2022. Its API documentation is available [here](/docs/dev/v1/api/terminalv1rescue.md), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v1/tree/version/rescue).

## v2

Juicebox v2 was a complete re-write of the protocol – its architecture and functionality significantly differ from v1.

Key functionality changes:

- v2 introduced the ability for one project to use multiple [payment terminals](/docs/dev/v3/learn/glossary/payment-terminal.md). This opens the door to projects accepting multiple currencies, and to projects using custom terminals which function as vaults, perform swaps, or interact with other contracts in unique ways.
- v2 enabled new types of protocol extensions: [data sources](/docs/dev/v3/learn/glossary/data-source.md) and [delegates](/docs/dev/v3/learn/glossary/delegate.md). A data source allows a project to provide custom data to a payment terminal's pay/redeem functions. Data sources can revert under custom circumstances, which can be used to create a gated treasury, a maximum token supply, a minimum contribution amount, or something else. Delegates are contracts which can define custom functions which are executed after payment or redemption logic has been completed, but before funds and tokens are transferred.
- v2 introduced the [operator](/docs/dev/v3/learn/glossary/operator.md) system which allows addresses to grant other addresses permission to take specific Juicebox-related actions on their behalf. For a full list of operator permission types, see [Namespaces & Indices](/docs/dev/v3/build/namespace.md#operator-permissions).

[JBP-152: Deploy v2](https://www.jbdao.org/p/132) was approved on April 29, 2022, and Juicebox v2 was first deployed to Ethereum mainnet on May 7th, 2022. Its API documentation is available [here]((/docs/dev/v2/README.md), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v2). A [medium severity bug](/docs/dev/v3/resources/post-mortem/2022-05-24.md) was identified on May 24th, 2022, and several v2 contracts were fixed and re-deployed on May 25th, 2022.

## v3

Juicebox v2 was audited by [PeckShield](/pdf/peckshield-audit-report.pdf) and [Certik](/pdf/certik-audit-report.pdf) before being deployed, and was audited by a [Code4rena contest](https://code4rena.com/contests/2022-07-juicebox-v2-contest) after it was deployed. This audit identified several bugs and inefficiencies, which were addressed in Juicebox v3 – a re-deploy of several (but not all) protocol contracts. Juicebox v3 was deployed to Ethereum mainnet on September 20th, 2022. Its API documentation is available [here](/docs/dev/v3/README.md), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v3).

## v3.1

A [high severity bug](/docs/dev/v3/resources/post-mortem/2023-01-27.md) was identified when deploying the [v3 JBX migration contracts](/docs/dev/v3/extensions/juice-v3-migration/README.md). The bug was mitigated for [JuiceboxDAO's project](https://juicebox.money/@juicebox) by adopting [JBController3_0_1](/docs/dev/v3/deprecated/or-controllers/jbcontroller3_0_1.md), which was followed up by a more robust fix to address other risks and inefficiencies: [`JBETHPaymentTerminal3_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1.md) and [`JBController3_1`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md).

[JBP-341 - Finish versioning migration](https://snapshot.org/#/jbdao.eth/proposal/0xb7b3ccd64f9b27ed001e7d086b11ae1dc78c56bd525840636a1a79d62ba14ccc) was approved by the DAO on February 17, 2023, and Juicebox v3.1 was deployed to Ethereum mainnet on February 21st, 2023.

## v3.1.1

`JBETHPaymentTerminal3_1_1` was deployed on June 30th, 2023 in [this PR](https://github.com/jbx-protocol/juice-contracts-v3/pull/44).

As described on [jango.eth.limo](https://jango.eth.limo/486B02AA-1D39-44B3-8927-942EE3448A38/README.md), the 3.1.1 terminal:

1. Is fully backward compatible with the 3.1 terminal interface.
2. Uses a new 3.1.1 Payment Terminal Store, whose views are fully backward compatible with the 3.1 Store interface.
3. Enforces the JBX membership fee when funds leave a treasury through redemptions while the project’s redemption rate or ballot redemption rate is less than 100%. This is currently a 2.5% membership fee, changeable by JBX holders up to 5%.
4. Adds the ability for data sources to pass arbitrary bytes to the delegates it specifies.
5. Fixes a low severity bug - there was still one case where a project’s payouts could be reverted if sent when a recipient project didn’t have a terminal installed.
6. Optimizes gas further - the fee property was being loaded from storage often, and is now cached better.
7. Improves all contracts’ natspec documentation.
8. Specifies all imports explicitly in the files from which they’re used.
9. Removes the leading underscore from function argument names in interfaces.

## v3.1.2

`JBETHPaymentTerminal3_1_2` was deployed on August 15th, 2023 in [this PR](https://github.com/jbx-protocol/juice-contracts-v3/pull/51), in which Jango contextualizes its changes:

> [@filipviz](https://github.com/filipviz) and I discovered a bug July 24, 2023 while helping project #548 raise funds for an auction.
>
> The project had `heldFees` on. After failing to win the auction and upon returned the funds, the project was not made whole.
>
> The bug is that the protocol expected a deposit equivalent to the amount paid out. In other words, if 10 ETH was paid out (before the fee), the protocol was expected a deposit of 10 ETH to return the full fee amount. The problem is the recipient doesn't have the full 10 ETH, they only have the amount after the fee. The protocol should only expect the a deposit of the amount paid out after fees... the amount the recipient actually has.
>
> This PR introduces `JBPayoutRedemptionTerminal3_1_2` that fixes this issue.
>
> It also
>
> - moved fee calculations into a `JBFees` library
> - removes the `isTerminalOf` check from `pay` and `addToBalance` to reduce contract size to be deployable. In `pay` these checks are already made when minting tokens. Clients are now responsible for making sure this check is correct, otherwise the project can access the funds from the terminal by setting distribution limits in a subsequent cycle.
