---
slug: 23-07-25
title: July 25th, 2023
authors: [zhape]
image: https://docs.juicebox.money/img/townhall.webp
tags: [town-hall]
---

![Town Hall banner by Sage Kellyn](https://docs.juicebox.money/img/townhall.webp)

## Ripple Case Discussions and Q&A

On this town hall, we had a guest, Rob, a securities attorney, to come over and share his thoughts on the recent Ripple Case which was considered to have great implications on the cryptocurrency industry.

*Please be noted that any discussions concerning legal affairs in this town hall are only personal opinions and do not constitute any investment advices.*

### Introduction of the trial results

Rob thought that one of the main reasons for the SEC being quite hostile towards crytocurrency stemmed from the concerns that sales of garbage tokens to retail customers might result in lost of their savings and make them "ward of state" which incurs burden to the state.

In this trial, the SEC sued Ripple Labs and its two senior leaders as engaging in unlawful offer and sale of securities in violation of securities law, and the judge Analisa Torres ruled that Ripple's sales of XRP to institutional buyers were considered as securities, but XRP itself is not a security.

The judge also distinguished three categories of sales.

- Institutional sale, to large investors like VCs, hedge funds, etc.
- Programmatic sales, which were made through digital asset exchanges to retail investors.
- Distribution of tokens to employees or partners.

While the institutional sales were regarded as securties and in violation of securities law, the judge ruled that the programmatic sales to retail investors were not against the law, because buyers couldn't tell if they were buying directly from Ripple Inc. or from a secondary seller. And because the buyers didn't know who they were buying from, they couldn't reasonably expect profits from Ripple Inc, so the these kind of sales didn't pass the Howey Test as being securities.

The judge also ruled that the distribution of tokens to employees or partners didn't pass the Howey Test either, because there was no exchange of money involved.

If we take Judge Torres' opinion on this literally, it seems like tokens might be able to be issued by  being put in a liquidity pool in AMMs like Uniswap, instead of being sold directly from a corporation or its issuer. Since people don't know for sure who they are buying from, the token doesn't meet the requirements of being a security.

### Programmatic Distribution of Tokens

Jango was wondering if we could have a clear definition of the programmatic distribution of token, and if it's just a general term that has more layers of interpretation underneath.

Rob responded that in the legal opinions of this case, a programmatic distribution equals to a blind bid/ask, where you don't really know who's on the other side of the equation.

And he thought of a permissionless decentralized cryptocurrency more as a bearer asset , instead of a contractual right that a court can rule over its ownership.  So Howey Test can't be applied here unless there's an exchange of money and a reasonable expectation of profit from the managerial or entrepreneurial efforts of others.

Even the SEC had admitted the secondary sale can't be defined as investment contracts. It doesn't make sense from a legal perspective because people just can't automatically be contractually bound for buying something from other random people.

### Legal Implications on Juicebox Community

Jango said this was a very interesting case to us, since we had spent a lot of time building these open protocols that have hard-coded contractual locks set in different ways. He thought that a lot of what we did was open-ended and could be expressed in various ways, and each way might have different implications from a legal perspective.

Now in Juicebox ecosystem, we have projects where their owners can make edits over time depending on how the parameters are configured, and also projects that are ownerless and running itself as an independent entity besides the will of the people involved. There are lots of ambiguity and probable forthcoming questions with regard to different setups.

Rob thought that we might still need to wait until this case runs through all these legal procedures, when legal opinions of judges finally be turned into the law of the land.

### Global Implications of This Case

LJ asked for Rob's opinios on whether this case would have some more effects from a global perspective, as people on Juicebox or other platoforms in Ethereum might be based in other jurisdictions. He wondered if Rob think this case would be called for action in those other jurisdictions, esp. those more crypto-friendly like Dubai, Singapore or Hong Kong, etc.

Rob thought that this case might probably help to ease the geoblock by some companies on American participants, which had been set due to the uncertain regulatory landscape and government's hostility towards crypto.

He didn't think other jurisdictions like Dubai and Hong Kong would likely look to the U.S. for what to do next. Also the Howey Test is a very very American style, and other jurisdictions might not agree with this interpretation of laws. They might probably be structuring their crypto policy based on their onw interests.

### Possible Impact on DAOs

Kenbot from StudioDAO was wondering if this trial would have any impact on the DAOs, and Rob said this case might make it harder for DAOs to defend themselves against regulatory agencies, esp. those with limited resources.

And for the UNA (Unincorporated Nonprofit Association) that many DAOs like to take as their organizational structure, it may help in limiting the liability of its members, implementing some kind of governance, and even appointing a manager and hiring legal representation.

If the legal opinions of Judge Torres become the law of the land someday in the future, DAOs may be able to issue their tokens by selling to institutional clients and filing for a private placement exemption before even letting those institutions do the secondary sales, while also distributing the tokens as incentives to their contributors or partners, etc. It seems to be an easy way of proceeding with a token launch.

### Impact on Designing Treasuries And Decentralized Projects

Jango said that it would be interesting considering from the point of view of designing treasuries that are trying to renegotiate pre-programmed relationships between all kinds of internet parties. In the case of blockchain, it's intermediated by a pre-agreed upon set of rules.

He thought that it might be tempting to only create things following the model of the Ripple case because it has provided some sense of clarity.  However, he thought there would still be plenty of room for creativity and exploration, and various kinds of expressions for these relationships to play out.

Rob added that this was a very well litigated case by a very influential judge, so we might be able to take it as a fair notice of laws concening whether a certain token should be considered a security.

## Migration to Payment Terminal 3.1.1 by Filipv

The [proposal to deploy buyback delegate for JuiceboxDAO](https://www.jbdao.org/s/juicebox/408) had been approved by the DAO last week. The first step in the execution of this proposal woud be to migrate the payment terminal of JuiceboxDAO from 3.1 to 3.1.1.

This new version of payment terminal fixed a few bugs and optimized gas usage, while also introducing a Juicebox membership fees on redemptions when the redemption rate is set at lower than 100%.

On the town hall, Filipv executed the switching of payment terminals successfully in real time.

## Hold Fees Calculation Error Postmortem by Filipv & Jango

We had a medium severity error in the hold fees calculation on the `JBPayoutRedemptionPaymentTerminal3_1`, which was discovered during the fundraising campaign of the project [Legend](https://juicebox.money/v2/p/548). This project had the Hold fees enabled and transferred the raised funds out for an auction. When the funds were returned back to the project for full refunding after the auction, a discrepancy occurred due to a erroneous calculation of the payment terminal, which resulted in a slightly lower refunding than the expected 100%.

Filipv had published a [postmortem on this issue](https://docs.juicebox.money/v4/deprecated/v3/resources/post-mortem/2023-07-24/) to explain in detail the reason of this error and the remedy to it.

![Hold fees buy explanation](hold_fees_bug.webp)

By the time of this town hall, Jango had created a [PR](https://github.com/jbx-protocol/juice-contracts-v3/pull/51) to update the payment terminal to 3.1.2 to fix this bug. Filipv suggested that project owners should avoid using the Hold fees feature before the new version of payment terminal 3.1.2 is deployed.

## Buyback Delegate Updates by Filipv & Jango

The audit report for buyback delegate by Code4rena was expected to be published very soon. After some last improvements and updates that needs to be made to the contract, hopefully the buyback delegate should be deployed within a few funding cycles.

Jango expressed his appreciation to 0xBA5ED for his great contributions in contract reviews during the last period of time, as well as to Viraz and Dr.Gorilla for their very foundational contributions to the open source set of protocol components.









