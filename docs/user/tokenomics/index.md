---
title: Juicebox Tokenomics
---

Juicebox projects have a unique token model based on *continuous token issuance*. As long as your project's rules allow it, new tokens can be minted at any time by paying your project. And if your project has redemptions enabled, tokens can be burned at any time to reclaim some of your project's ETH. This means that your token has a *variable supply* – just like your project's ETH balance, the total number of tokens can go up or down over time as the demand for your token changes.

## Fixed Token Supplies

New project creators sometimes ask if it's possible to limit the total number of tokens their project can mint (this is called a "fixed supply"). Although it would be straightforward to support a fixed supply model with Juicebox, we recommend against it: **in almost every case, continuous issuance is better.**

This is because it is very hard to predict how much demand there will be for your token ahead of time:
- If you pick a fixed supply which is too large, you'll fail to "sell out", which makes your project look bad to supporters.
- If you pick a fixed supply which is too small, you'll sell out early, and miss out on funding which you could have received.

With a continuous issuance, your token's supply can grow or shrink to meet demand perfectly, which means your treasury scales perfectly as well. This is why Juicebox works so well for large fundraisers: as of February 2024, 35 projects have raised more than 100 ETH, 8 projects have raised more than 1,000 ETH, and 2 projects have raised more than 10,000 ETH!

## Creating Demand

In response, project creators sometimes ask: *If I don't have a limited supply, how do I create demand for my token?*

Juicebox gives you a few tools to manage this:

1. You can set up an *issuance reduction rate*, which does what you would expect – over time, it reduces the number of tokens minted per ETH paid in. If your project mints 1,000 tokens per ETH in its first cycle, and you have a 5% issuance reduction rate, your project will mint 950 tokens per ETH in its next cycle, and 902.5 tokens per ETH in the cycle after that. This encourages people to pay your project earlier, when they can get more tokens.
