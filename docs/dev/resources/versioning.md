---
title: Versioning History
sidebar_position: 5
---

## v1

Juicebox was first deployed to Ethereum mainnet on July 15, 2021. We now refer to this version of the protocol as "Juicebox v1" – you can find an archive of its original documentation [here](/dev/deprecated/v1/), and recent v1 API documentation [here](/dev/deprecated/juice-contracts-v1/). Its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v1). The v1 contracts were published alongside the article: [Juicebox has been deployed](/updates/juicebox-deployed/).

## v1.1

[`TerminalV1_1`](/dev/deprecated/juice-contracts-v1/terminalv1_1/), called Juicebox v1.1, introduced:

- [`payIsPaused`](/dev/deprecated/juice-contracts-v1/interfaces/fundingcyclemetadata2/), a funding cycle metadata flag which allows project creators to pause payments to their project when [`deploy`](/dev/deprecated/juice-contracts-v1/terminalv1_1/#deploy)ing [`configure`](/dev/deprecated/juice-contracts-v1/terminalv1_1/#configure)ing a project.
- [`ticketPrintingIsAllowed`](/dev/deprecated/juice-contracts-v1/interfaces/fundingcyclemetadata2/), a funding cycle metadata flag which allows project creators to mint arbitrary amounts of their project token on-demand. In v1, this behavior was only possible before a project had received its first payment.
- The ability to redeem a project's token when no funds were available to reclaim, thus burning them, was added.
- The [`treasuryExtension`](/dev/deprecated/juice-contracts-v1/interfaces/fundingcyclemetadata2/) option was added to funding cycle metadata. This allowed project owners to designate an [`ITreasuryExtension`](/dev/deprecated/juice-contracts-v1/interfaces/itreasuryextension/) contract to tell the protocol how much ETH the project is storing outside of the protocol, and to take this ETH into account when calculating token redemptions.
- Protocol fees were capped at 5%.
- [A bug](/dev/resources/post-mortem/2021-08-18/) which caused extra reserved issuance when changing the reserved rate from 0% to another number was fixed.
- A bug which caused issues with overflow calculation when a new cycle had begun and newly availble funds still had not been paid out was fixed.
- In v1, the [`Governance`](/dev/deprecated/juice-contracts-v1/governance/) contract provisioned terminal migrations, price feed updates, and fee changes. In v1.1, this functionality was handled directly within the [`TerminalV1_1`](/dev/deprecated/juice-contracts-v1/terminalv1_1/) contract.

[JBP-71 - Juicebox V1.1 deploy](https://www.jbdao.org/p/71) was approved on January 7th, 2022, and Juicebox v1.1 was deployed to Ethereum mainnet on January 10th, 2022. Its API documentation is available [here](/dev/deprecated/juice-contracts-v1/terminalv1_1/), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v1/tree/version/1.1-deploy). For more information, see the [Juicebox V1.1 Change log](/updates/juicebox-v1-1-change-log/).

## TerminalV1Rescue

[`TerminalV1Rescue`](/dev/deprecated/juice-contracts-v1/terminalv1rescue/) allowed allow-listed projects with one-time funding cycles to rescue stuck ETH. A [proposal to deploy it](https://snapshot.org/#/jbdao.eth/proposal/0x9aa1e823d8157a74cba36107f31e8a88d4e6638b2f2387c3aad3ef57cb3d54c8) was approved on February 4th, 2022, and the terminal was deployed to Ethereum mainnet on February 16th, 2022. Its API documentation is available [here](/dev/deprecated/juice-contracts-v1/terminalv1rescue/), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v1/tree/version/rescue).

## v2

Juicebox v2 was a complete re-write of the protocol – its architecture and functionality significantly differ from v1.

Key functionality changes:

- v2 introduced the ability for one project to use multiple [payment terminals](/dev/learn/glossary/payment-terminal/). This opens the door to projects accepting multiple currencies, and to projects using custom terminals which function as vaults, perform swaps, or interact with other contracts in unique ways.
- v2 enabled new types of protocol extensions: [data sources](/dev/learn/glossary/data-source/) and [delegates](/dev/learn/glossary/delegate/). A data source allows a project to provide custom data to a payment terminal's pay/redeem functions. Data sources can revert under custom circumstances, which can be used to create a gated treasury, a maximum token supply, a minimum contribution amount, or something else. Delegates are contracts which can define custom functions which are executed after payment or redemption logic has been completed, but before funds and tokens are transferred.
- v2 introduced the [operator](/dev/learn/glossary/operator/) system which allows addresses to grant other addresses permission to take specific Juicebox-related actions on their behalf. For a full list of operator permission types, see [Namespaces & Indices](/dev/build/namespace/#operator-permissions).

[JBP-152: Deploy v2](https://www.jbdao.org/p/132) was approved on April 29, 2022, and Juicebox v2 was first deployed to Ethereum mainnet on May 7th, 2022. Its API documentation is available [here](/dev/deprecated/v2/), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v2). A [medium severity bug](/dev/resources/post-mortem/2022-05-24/) was identified on May 24th, 2022, and several v2 contracts were fixed and re-deployed on May 25th, 2022.

## v3

Juicebox v2 was audited by [PeckShield](/assets/files/peckshield-audit-report-ab36ee2b5dfb2a387410b4d64276f6ba.pdf/) and [Certik](/assets/files/certik-audit-report-12b48328d22ac38207dad74162cac1db.pdf/) before being deployed, and was audited by a [Code4rena contest](https://code4rena.com/contests/2022-07-juicebox-v2-contest) after it was deployed. This audit identified several bugs and inefficiencies, which were addressed in Juicebox v3 – a re-deploy of several (but not all) protocol contracts. Juicebox v3 was deployed to Ethereum mainnet on September 20th, 2022. Its API documentation is available [here](/dev/deprecated/v3/), and its source code is available on [GitHub](https://github.com/jbx-protocol/juice-contracts-v3).

## v3.1

A [high severity bug](/dev/resources/post-mortem/2023-01-27/) was identified when deploying the [v3 JBX migration contracts](/dev/extensions/juice-v3-migration/). The bug was mitigated for [JuiceboxDAO's project](https://juicebox.money/@juicebox) by adopting [JBController3_0_1](/dev/deprecated/v3/or-controllers/jbcontroller3_0_1/), which was followed up by a more robust fix to address other risks and inefficiencies: [`JBETHPaymentTerminal3_1`](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal3_1/) and [`JBController3_1`](/dev/api/contracts/or-controllers/jbcontroller3_1/).

[JBP-341 - Finish versioning migration](https://snapshot.org/#/jbdao.eth/proposal/0xb7b3ccd64f9b27ed001e7d086b11ae1dc78c56bd525840636a1a79d62ba14ccc) was approved by the DAO on February 17, 2023, and Juicebox v3.1 was deployed to Ethereum mainnet on February 21st, 2023.
