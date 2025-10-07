---
title: 1. Custody
sidebar_position: 1
---

# Custody

When you create a Juicebox project, the project's NFT is minted to your wallet. Only the holder of that NFT (the "project owner") can change your project's rules. In other words, **you are the only person who owns your project.** Nobody else can change your project's rules — not even JuiceboxDAO.

You can transfer this NFT to another wallet for safe-keeping and administration:

1. Open your project's page on [juicebox.money](https://juicebox.money).
2. Connect the wallet which currently owns the project.
3. Open your project settings by clicking the gear in the upper right-hand corner.
4. Select `Transfer Ownership` in the left-hand sidebar.

Most projects use one of three options:

## 1. EOA

EOA stands for *Externally Owned Account*. Put more simply, this means holding your project's NFT in a regular wallet (like Metamask or Ledger).

This is the most centralized option: it gives you full control over the project, and the ability to make changes whenever you want (according to your project's rules). Your community will need to trust you!

## 2. Safe / Multisig (Recommended)

Multisigs are smart contract wallets that require a minimum number of people to approve a transaction before it can occur. For example, if you have 3 main collaborators, you can set up the wallet to require approval from all 3 people before the transaction is sent. This assures that no single person could compromise the project or its funds.

A multisig protects you and your community:

- If one wallet becomes compromised, the attacker cannot take over your Juicebox project.
- With a multisig, nobody can unilaterally execute malicious transactions affecting your Juicebox project.

A multisig is an extra shield to protect your project from harmful or faulty reconfigurations. It does come with risks though—if you cannot meet the multisig's threshold, you will lose access to everything inside of it.

The most popular multisig for managing Juicebox projects is [Gnosis Safe](https://safe.global/), which comes with a pre-built Juicebox integration: open the `Apps` menu, and open the Juicebox app to use it. You can even deploy your project from a Safe.

:::info
JuiceboxDAO contributors have also built:

- A Gnosis Safe integration into [juicebox.money](https://juicebox.money/@juicebox/safe)
- A Gnosis Safe [reconfiguration helper](https://juicetool.xyz/juicebox) for Juicebox projects
- An [alternative Safe UI](https://juicetool.xyz/safe/0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e)
:::

## 3. Smart Contract

A Juicebox project can also be owned by a smart contract to facilitate on-chain governance. See:

- [revnets](https://app.revnet.eth.sucks/), a tool to launch trustless juiceboxes.
- [Defifa](https://defifa.net), an onchain sports prediction game built with Juicebox. If you're interested in running a similar competition, inquire in their [Discord](https://discord.gg/hrZnvs65Nh).
