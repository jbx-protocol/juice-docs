# Juicebox Language Revisions

We've updated the language we use to describe the Juicebox protocol several times, and as a result, our docs, our resources, and juicebox.money have grown inconsistent with each other. This makes the protocol more difficult to understand for new users. For example, the terms _funding target_, _distribution limit_, _overflow_, and _payout limit_ all refer to the same concept — how much ETH can be paid out from a project.

In [this PR to juicebox.money](https://github.com/jbx-protocol/juice-interface/pull/3130) and [this PR to docs.juicebox.money](https://github.com/jbx-protocol/juice-docs/pull/122), Juicebox protocol terminology has been updated to address these issues.[^1] The goal is to improve consistency, accuracy, and clarity, and to minimize jargon wherever possible.

A summary of the changes:

| Original Phrase                                      | Revised Phrase        |
| ---------------------------------------------------- | --------------------- |
| Funding Cycle                                        | Cycle                 |
| Configuration                                        | Rules                 |
| Reconfigure                                          | Edit                  |
| Reconfiguration Delay                                | Edit Deadline         |
| Treasury                                             | Project               |
| Funds                                                | ETH                   |
| Project NFT                                          | Owner NFT             |
| Distributions/Distribution Limit/Funding Target      | Payouts               |
| Distribute                                           | Send                  |
| Allocation                                           | Recipient             |
| Overflow                                             | Contextual[^2]        |
| Contribute                                           | Pay                   |
| Contributors (people who have paid a project)        | Supporters            |
| Initial Mint Rate, Token Minting Rate                | Total Mint Rate       |
| Contributor Rate                                     | Payer Mint Rate       |
| Reserved Rate (when referring to # of tokens minted) | Reserved Mint Rate    |
| Discount Rate                                        | Mint Rate Reduction   |
| Token Minting                                        | Owner Token Minting   |
| Payment Address                                      | Project Payer Address |
| Deploy/Launch/Issue                                  | Create                |

To see the terms in context, read the updated [project guide](/user/project/). **We should consistently use the updated terms in content we make and messages we send.**

[^1]: The create flow on [juicebox.money](https://juicebox.money) has not been updated yet. Wraeth is working on this.
[^2]: Replace overflow with simple explanations. Overflow is the ETH available for redemption. Instead of saying a project has no overflow, you can say that it is using all of its ETH for payouts, or has no ETH.
