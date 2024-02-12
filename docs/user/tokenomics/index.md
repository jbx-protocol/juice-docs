---
title: Juicebox Tokenomics
---

Juicebox projects have a unique token model based on *continuous token issuance*. As long as your project's rules allow it, new tokens can be issued at any time by paying your project. And if your project has redemptions enabled, tokens can be burned at any time to reclaim some of your project's ETH. This means that your token has a *variable supply* – just like your project's ETH balance, the total number of tokens can go up or down over time as the demand for your token changes.

## Fixed Token Supplies

New project creators sometimes ask if it's possible to limit the total number of tokens their project can issue (this is called a "fixed supply"). Although it would be straightforward to support a fixed supply model with Juicebox, we recommend against it: **in almost every case, continuous issuance is better.**

This is because it is very hard to predict how much demand there will be for your token ahead of time:
- If you pick a fixed supply which is too large, you'll fail to "sell out", which makes your project look bad to supporters.
- If you pick a fixed supply which is too small, you'll sell out early, and miss out on some funding which you could have received.

With a continuous issuance, your token's supply can grow or shrink to meet demand perfectly, which means your treasury scales perfectly as well. This is why Juicebox can work so well for small experiments and huge crowdfunding campaigns: as of February 2024, 35 projects have raised more than 100 ETH, 8 projects have raised more than 1,000 ETH, and 2 projects have raised more than 10,000 ETH!

Unlike some simpler continuous issuance models, Juicebox lets you fine-tune how tokens are issued and distributed over time. Instead of being stuck with the setup you started with, you can change your project's rules over time.

## Creating Demand

In response, project creators sometimes ask: *If I don't have a limited supply, how do I create demand for my token?*

For context, a *ruleset* is a set of rules which determines how your project behaves (more on these later). Juicebox rulesets give you a few tools to manage demand:

1. You can set up a *decay rate*: each ruleset, your decay rate reduces the number of tokens your project issues per ETH paid in. If your project issues 1,000 tokens per ETH in its first ruleset, and you have a 5% decay rate, your project will issue 950 tokens per ETH in its next ruleset, and 902.5 tokens per ETH in the ruleset after that. This encourages people to pay your project earlier, when they can get more tokens for their ETH.
2. As a more aggressive option, you can completely turn off token issuance after a period of time: pick a number of tokens to issue per ETH for a ruleset lasting anywhere from 3-30 days, and set up your next ruleset so it disables payments. This creates a lot of excitement as the first ruleset comes to a close – projects like [CryoDAO](https://juicebox.money/@cryodao) and [MoonDAO](https://juicebox.money/p/moondao) have used this strategy to raise thousands of ETH, and they both received the majority of their funding closer to the end of their campaigns.

These tools can be used along with other token perks (like voting power, or access to private websites or chatrooms) to make people want your token and pay your project.

## Preventing Takeover

Another common question: *If new tokens can be issued at any time, couldn't someone pay my project lots of money and take over my project's governance?*

To address this problem, and to let you manage how your token is distributed over time, Juicebox lets you reserve a portion of tokens **as they get issued** with a *reserved rate*: if your project issues 1,000 tokens per ETH and you have a 30% reserved rate, someone who pays your project 1 ETH will only get 700 tokens, and the other 300 tokens will be set aside for a list of addresses that you choose.

If your project's governance requires 60% approval for a proposal to pass and you have a reserved rate of 41%, governance takeover becomes *impossible* (assuming that the people who get the reserved tokens have good intentions). Even with a smaller reserved rate, the cost of hostile takeover becomes many times more expensive.

The way you set up your reserved rate setup determines where your token distribution tends towards over time: if you have a 50% reserved rate, and you're reserving half of that for your friend Jeff (and thus 25% of total issuance), Jeff will get closer to owning 25% of all tokens over time as new tokens are issued.

## Building Trust

Another question: *How do I keep people confident in the token and project if new tokens can be issued at any time?*

The solution is part of what makes Juicebox special – **all of your project's rules are tools you can use to find the right balance between your control (as the project owner) and guarantees you make to your supporters.**

### Rulesets and Deadlines

If your project's rules were permanently locked in place, you wouldn't have the flexibility to improve the project's setup over time. But if you could change your project's rules at any time, you could rugpull your supporters without any warning, and people would trust your project less. Juicebox lets you find a middle ground with *rulesets* and an *edit deadline*:

1. A "ruleset" is a set of rules which define how your project works (including all of the parameters we've mentioned here). You decide how long your ruleset lasts – if it doesn't have a specific duration, you can change the rules at any time. But let's say you use a duration of 7 days – that means that your project's rules can't be changed until that 7-day period is over. When you try to change the rules in the middle of the 7 days, those changes get *queued* as the next ruleset, and go into effect once the current ruleset ends. This way, everybody can see changes to your project's rules ahead of time. If you don't queue a new ruleset, the current one gets copied over with the same duration.
2. This still leaves the question: *what if I change my project's rules at the last second?* That's why you should use an *edit deadline*. With a 3-day edit deadline, you have to queue the changes to your project's rules **at least 3 days** before they would go into effect. If you miss that deadline, your current ruleset (and its duration) gets copied over, and your changes take effect in the ruleset *after* the next one. If you used the 7-day ruleset described above, you would need to queue your changes by the end of day 4 at the latest. If you missed that deadline, the 7-day ruleset would get copied over, and your changes wouldn't go into effect until the end of *that* ruleset.

Another option is to not use a specific duration for your rulesets, and to only use an edit deadline to build trust. This lets you queue a new ruleset at any time, which will go into effect exactly 72 hours later. This gives you the flexibility to make changes relatively quickly, but still gives your community the guarantee that they can see changes before they happen.

### Token Redemptions

A final question: *even if people can see changes before they happen, what can they do if they don't like them?*

Some projects will have tokens which are popular enough for holders to sell on markets like Uniswap, but what can other projects do?

Like with other options in Juicebox, you can choose how much safety to guarantee to your token's holders with *redemptions*, which let people redeem their tokens to reclaim some ETH from your project (destroying the tokens in the process).

- Some project owners keep redemptions disabled (a 0% redemption rate).
- Some project owners fully enable redemptions (a 100% redemption rate). This means that someone with 10% of your project's tokens can redeem their tokens to get 10% of the ETH currently in your project.
- You can set your redemption rate somewhere between 0% and 100% to enable redemptions along a bonding curve, meaning people who redeem first will get less ETH per token, and people who redeem later will get more ETH per token. This encourages people to hold onto your token longer, and to wait for others to redeem first.

ETH that you're using for payouts won't be available for redemptions. If you're using unlimited payouts (paying out all the ETH from your project), redemptions will be impossible. Keep in mind that token holders will only get a full refund if all the ETH is still in the project. If you've used some of it, they'll only get a partial refund. Although this isn't perfect, it's much better than nothing at all.

## Token Stability

In practice, having ongoing token issuance and redemptions from your project can work out like this:

![A chart showing a Uniswap token price fluctuating between an issuance price and a redemption price.](token-rice.png)

When your project first launches, people will have to pay your project to get tokens, funding your project's treasury with ETH. Typically, once there are enough tokens out there, someone will launch a market for your tokens (usually on Uniswap). From then on out, whenever the Uniswap price becomes more expensive than the price to issue new tokens from your project, people will pay your project instead of buying tokens on Uniswap. And whenever the Uniswap price falls below the redemption "price" (how much ETH they can get back by redeeming), people will redeem from your project instead of selling their tokens on Uniswap.

The result is that the token's price will have a "ceiling" and "floor", making the token much less volatile than other tokens with a similar supply and demand. This can lead to more stable governance and make people more confident when deciding to support your project.

## Final Tips

- You can turn on "project owner token minting" to manually mint arbitrary amounts of tokens. Although we usually recommend keeping this off (since it makes people afraid of being rug-pulled), some projects use this when negotiating private deals or for minting tokens to use before publicly opening payments to their project.
- You can manually set the issuance rate (the number of tokens issued per ETH paid in) each ruleset.

There are surprising and creative ways to combine these tools to make your project successful – each option lets you control a different incentive, and therefore encourage different actions from your community.
