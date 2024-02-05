---
slug: dao-tooling-101
title: DAO Tooling 101
authors: [aeolian]
tags: [guide, tooling]
---

Entering the world of decentralized autonomous organizations (DAOs) is kind of like opening the gates to Narnia: it's thrilling, it's confusing, and because real money is involved, it's somewhat scary.

Late 2021 appears to be the frontier of DAOs, and best practices and playbooks for starting and governing DAOs are being written as I write this.

In particular, the DAO stack - the set of software tools required to run a DAO - is beginning to mature. One such example is Juicebox - a DAO treasury protocol - which was recently picked by the [ConstitutionDAO](https://juicebox.money/#/p/constitutiondao) to raise almost ~47million USD in an attempt to buy a copy of the United States Constitution.

In this article, we'll define the fundamental functions of a DAO and describe the tools required to fulfill these functions. The content is a derivative of Juicebox contributor `@nnnnicholas` 's episode on The Fintech Blueprint Podcast; if audio is your thing, [check it out](https://twitter.com/nnnnicholas/status/1460661895879348232?s=20&t=uUoFXuazXWYqRUgHLflMfQ)!
![](c3kCNED.webp)

## **What's a DAO do?**

At present, a DAO is more of a concept rather than a strict organizational definition. We'll talk about DAOs as they are being used today in the crypto/NFT world. In this world, a DAO has 2 main functions:

1. Building a treasury of assets (NFTs, Ethereum (ETH), or some other token)
2. Governing the treasury

Let's say your favorite podcaster decides to set up a DAO for their podcast. They need assets (read: money) to keep the podcast going and do bigger and better things like merch and in-person events. So, they need a way to build a treasury of assets. They'll issue an ERC20 token (let's call this token `$PODC`), and anyone who contributes funds to the treasury will receive `$PODC` token in exchange. You, the listener, believe in this podcaster and want to be a part of their success. So you buy some `$PODC` token and contribute to the treasury.

As a `$PODC` token holder, you have perks. You can propose changes to the podcast format and make guest proposals, and you can also vote on other proposals. You and the other token holders now have skin in the game - or skin in the podcast - and have a meaningful impact on the podcast and its success. The DAO can be creative here, too. Holding a token might grant you access to a private discord, private meetings, or airdrops. In a successful DAO, the DAO may vote to distribute excess funds to token holders.

Don't like what the DAO is doing? No worries! Your tokens are 100% backed by the treasury, meaning you can sell your token back to the DAO and receive your original investment (less gas and other fees).

An attractive characteristic of a DAO when compared to a traditional private company is transparency. Every aspect of the DAO is available on and verified by, the blockchain. Any eager individual can observe the flow of assets and call out dodgy activity. Importantly, no accountants or lawyers are required!

## **The DAO stack**

To achieve the 2 functions of a DAO, we're going to need some tools. Luckily, smart folks are putting in the leg work and the DAO stack is maturing rapidly. Below, we'll discuss Juicebox, Gnosis, Snapshot, and Aragon - 4 key tools in the DAO stack - and how they fit together to form a DAO.

### **Juicebox**

The [Juicebox](https://juicebox.money/) protocol is a programmable treasury. In practice, you can think of Juicebox as a decentralized alternative to Kickstarter; a way to raise funds on the blockchain. It fulfills the first function of the DAO: building the treasury. Technically speaking, Juicebox is a [set of smart contracts](https://github.com/jbx-protocol) deployed on the Ethereum blockchain that handles the issuance of tokens and the building of the treasury.

In our podcast DAO example, the podcaster would create a Juicebox project. They can define various parameters that dictate how the project will operate, like funding targets, the exchange rate, payouts, and the number of tokens reserved for founders. The Juicebox project has an associated token: `$PODC`. To contribute to the podcast DAO's treasury, I would head to the project's page on [https://juicebox.money](https://juicebox.money), connect my Metamask wallet and contribute ETH. In exchange, I would get some `$PODC` token based on the Juicebox project's predefined exchange rate.

### **Gnosis**

Who "owns" the treasury? A single person *could* own the treasury, but nothing is stopping them from running off with the bag besides reputational risk.

Enter: the multi-signature wallet, commonly known as a "multisig". A multisig is fundamentally a contract that can hold assets and execute transactions, with one exception: it requires the signature of *more than one* address to execute transactions. Just like a business where you need multiple signatures to do anything, a multisig requires some number of signatures (typically `m` of `n`, say, 2 signatures out of 3 signatories) to execute a given transaction.

So, when setting up the podcast DAO, we would create a multisig between the podcast founders (say, the 2 podcasts hosts and any other significant contributors). The multisig would be the owner of the Juicebox project. This allows us to have multiple individuals controlling the parameters for fundraising so that no individual can go rogue.

[Gnosis](https://gnosis-safe.io/) is the go-to tool for creating and managing multisigs. It provides a clean and simple UI to enable the management of a multisig. Signatories connect their Metamask wallet and can approve and reject transactions from Gnosis.

### **Snapshot**

How do you vote with your DAO tokens? [Snapshot.org](https://Snapshot.org)! Snapshot is an off-chain voting tool used to propose and vote on changes to the DAO. It leverages IPFS to store votes.

A proposal is just a document that lays out some change to the DAO and gives a single choice amongst multiple options in a voting mechanism. Anybody holding the DAO's token can vote on a proposal for which result they prefer. For example, someone might create a proposal on Snapshot that a certain person is interviewed as a guest on the podcast. As a `$PODC` holder, I can navigate to the proposal on [Snapshot.org](http://Snapshot.org) and vote yes or no. The weighting of my vote is proportional to the amount of `$PODC` I hold.

A proposal is accepted by the DAO when a certain number of votes is reached (say, two-thirds, or 67%). When a proposal is accepted, it is the responsibility of the multisig signatories to carry out the proposal.

Importantly, there is an element of trust required for this to work effectively. At the end of the day, the multisig signatories have complete control over the treasury, and they have to be willing to carry out the wishes of the DAO. This risk is mitigated by the nature of the multisig: because it requires multiple signatures, the likelihood of coordination amongst bad-acting signatories is somewhat mitigated. Reputation is on the line, too, so signatories are somewhat incentivized to act in the best interest of the DAO.

### **Aragon**

As noted above, Snapshot voting happens off-chain, but on-chain voting is possible. In comparison, [Aragon](https://aragon.org/) provides on-chain voting. With Aragon, no aspect of the DAO is happening in your web browser. Instead, absolutely everything would be executed as a transaction on the blockchain. In some sense, this makes the DAO more decentralized, but also a little bit less agile and quite a bit more expensive to interact with.

## **Takeaways**

DAOs are becoming more and more popular, and there is no single playbook for creating a DAO. We are in an ecosystem of DAO tooling. Juicebox, Gnosis, Snapshot, Aragon are composable tools that can be mixed and matched with each other to create the infrastructure that is a single DAO. Each DAO will make different choices about which pieces of tooling and what level of decentralization is appropriate for their project and goals.

---

Follow [[@aeolianeth](https://twitter.com/aeolianeth)] on Twitter.
