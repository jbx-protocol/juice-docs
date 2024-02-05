---
title: Multisig Process
sidebar_position: 5
---

# JuiceboxDAO Multisig Process

The JuiceboxDAO Multisig, [`0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e`](https://etherscan.io/address/0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e), is responsible for interpreting and executing the outcomes of the [Governance Process](https://docs.juicebox.money/dao/process/).

## Rules

1. Multisig signers must agree to execute the will of JBX token holders, as expressed through the Governance Process.
2. The Multisig threshold must be at or above 60% of signers at all times.
3. The Multisig can reimburse gas fees paid to execute previous Multisig transactions.
4. In an emergency, the Multisig can execute transactions according to the [Juicebox Emergency Procedures](https://docs.juicebox.money/dao/security/emergency/).

## Process

During Offchain Snapshot voting, the Multisig should internally decide which signer(s) will be responsible for queuing project reconfigurations and any other necessary transactions. The Multisig should also designate a backup signer in the event that the first signer is unable to fulfill the following steps.

Less than 12 hours after Snapshot voting finalizes, the designated signer(s) should queue all necessary transactions, create a Discord thread for each transaction, and then notify other Multisig members by tagging the `@Multisig` role. Each thread should contain a link to the relevant proposal(s), a transaction simulation, and a plain-language description of the proposed changes. If appropriate, the thread should also contain a link to a Juicetool configuration diff or other resources.

Over the following 12 hours, each signer should independently verify and sign the proposed transactions. If a signer finds errors in or is unsure about a proposed transaction, that signer should voice their concerns in the appropriate Discord thread, tagging the signer which queued that transaction. Those signers should then work together to queue transactions which resolve those concerns (in the same manner as described above).

The last signer to approve the queued transactions (thereby meeting the threshold) should also execute or batch execute those transactions after approving them. If the queued transactions have still not been executed within 24 hours of the next reconfiguration delay cutoff, the designated signer should execute them.

