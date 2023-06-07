---
title: Snapshot Strategies
sidebar_position: 3
---

# Using Snapshot With Juicebox

:::info
Most projects ratify some type of Governance Process to use alongside Snapshot voting. Feel free to use [our process](https://docs.juicebox.money/dao/process/) as a starting point. You can also [contact onboarding](https://juicebox.money/contact), or join the [Juicebox Discord](https://discord.gg/juicebox) and tag `filipvv` and `0xSTVG.eth#7744` for help!
:::

## What's Snapshot?

From the [Snapshot Docs](https://docs.snapshot.org/):
> Snapshot is a decentralized voting system. It provides flexibility on how voting power is calculated for a vote. Snapshot supports various voting types to cater to the needs of organizations. Creating proposals and voting on Snapshot is user-friendly and does not cost gas as the process is performed off-chain.
>
> In short, Snapshot is an off-chain gasless multi-governance client with easy to verify and hard to contest results.

## How to set up a Snapshot space

You can deploy a Snapshot space for your project on [snapshot.org](https://snapshot.org/#/setup), or you can:

1. Visit your project's page on [juicebox.money](https://juicebox.money).
2. Open your project settings by clicking the gear in the upper right-hand corner.
3. Selecting `Governance` in the left-hand sidebar.

Both of these options will require you to have an ENS address (this is a short name ending with `.eth` that refers to your wallet). If you don't have an ENS, visit [app.ens.domains](https://app.ens.domains).

Once your space is created, visit it on [Snapshot.org](https://snapshot.org/#/) and open the `Settings`. Here, you can change your space's name & avatar, and configure how voting power is calculated with one or more **Strategies**.

Several strategies have been prepared for you below. Make sure you follow the TODO notes, and delete the notes once you do. If you need help customizing your parameters or are looking for a different strategy, send a message in the [Juicebox Discord](https://discord.gg/juicebox).

You can have up to 8 strategies, and voting power is cumulative across them.

## Strategies

### Project Token Voting

This strategy gives each address one vote per project token held, taking both claimed ERC-20s and unclaimed tokens into account. If you want to add delegation, use this **AND** the [Project Token Delegation strategy](#project-token-delegation).

1. Add a `contract-call` strategy.
2. Use these parameters:

```json
{
	"args": [
		"%{address}",
		"0x01" // TODO: REPLACE WITH YOUR PROJECT ID HEX ENCODED.
	],
	"symbol": "JBX", // TODO: REPLACE WITH YOUR TOKEN SYMBOL.
	"address": "0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7",
	"decimals": 18,
	"methodABI": {
	"name": "balanceOf",
	"type": "function",
	"inputs": [
		{
			"name": "",
			"type": "address",
			"internalType": "address"
		},
		{
			"name": "",
			"type": "uint256",
			"internalType": "uint256"
		}
	],
	"outputs": [
		{
			"name": "",
			"type": "uint256",
			"internalType": "uint256"
		}
	],
	"stateMutability": "view"
	}
}
```

### Project Token Delegation

This strategy allows voters to delegate their project token votes to somebody else. When Bobby delegates his voting power to Alice, Alice gets all of Bobby's voting power in addition to her own, but only when Bobby doesn't vote. If Bobby votes, he reclaims all of his voting power (for that vote). If you use this strategy, **you must also add the [Project Token Voting strategy](#project-token-voting).**

1. Add a `delegation` strategy.
2. Use these parameters:

```json
{
  "symbol": "JBX (delegated)", // TODO: REPLACE WITH YOUR TOKEN SYMBOL.
  "strategies": [
    {
      "name": "contract-call",
      "params": {
        "args": [
          "%{address}",
          "0x01" // TODO: REPLACE WITH YOUR PROJECT ID HEX ENCODED.
        ],
        "symbol": "JBX", // TODO: REPLACE WITH YOUR TOKEN SYMBOL.
        "address": "0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7",
        "decimals": 18,
        "methodABI": {
          "name": "balanceOf",
          "type": "function",
          "inputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        }
      }
    }
  ]
}
```

### NFT Voting Weight

This strategy gives each address votes based on their NFT's [Voting Weight](/user/configuration/#tiers).

1. Add a `contract-call` strategy.
2. Use the following parameters:

```json
{
  "args": [
    "0x33f37dda8936568456d630dc6a41886bfdda4a2d", // TODO: REPLACE WITH YOUR NFT'S ADDRESS.
    "%{address}"
  ],
  "address": "0xffB2Cd8519439A7ddcf2C933caedd938053067D2",
  "symbol": "MONKEY", // TODO: REPLACE WITH YOUR SYMBOL.
  "decimals": 0,
  "methodABI": {
    "inputs": [
      {
        "name": "_nft",
        "internalType": "address",
        "type": "address"
      },
      {
        "name": "_account",
        "internalType": "address",
        "type": "address"
      }
    ],
    "name": "votingUnitsOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "units",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
}
```

### NFT Balance

This strategy gives each address one vote per NFT held, taking all tiers into account.

1. Add a `contract-call` strategy.
2. Use the following parameters:

```json
{
  "args": [
    "0x33f37dda8936568456d630dc6a41886bfdda4a2d", // TODO: REPLACE WITH YOUR NFT'S ADDRESS.
    "%{address}"
  ],
  "address": "0xffB2Cd8519439A7ddcf2C933caedd938053067D2",
  "symbol": "MONKEY", // TODO: REPLACE WITH YOUR SYMBOL.
  "decimals": 0,
  "methodABI": {
    "inputs": [
      {
        "name": "_nft",
        "internalType": "address",
        "type": "address"
      },
      {
        "name": "_owner",
        "internalType": "address",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
}
```
