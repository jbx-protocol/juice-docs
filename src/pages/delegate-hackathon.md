---
slug: /delegate-hackathon
---

# NFT Delegate Hackathon

Build a [Juicebox NFT Delegate](/dev/learn/glossary/delegate/) for the [Buidl Guidl Juicebox project](https://juicebox.money/@buidlguidl). Open to teams and individuals.

- Over $`N` in prizes.
- Starts at 12:00 EDT on June 9th and ends at 12:00 EDT on June 23rd.
- Facilitated with love by [Buidl Guidl](https://buidlguidl.com/) and [JuiceboxDAO](/dao/).
- Join the [Hackathon Telegram chat](https://t.me/delegatehackathon) if you have questions or are looking for teammates.

## What's an NFT Delegate?

By default, payments to (and redemptions from) Juicebox projectsare handled by the project's [payment terminal](/dev/learn/glossary/payment-terminal/) – a contract which manages token inflows, outflows, and accounting for one or more projects.

A [*delegate contract*](/dev/learn/glossary/delegate/) allows you to extend default payment/redemption behavior by defining custom post-pay/redeem hooks.

- Payment terminal functionality is implemented [across several contracts and interfaces](/dev/learn/architecture/terminals/).
- Juicebox projects can use multiple payment terminals.
- Project payments and redemptions happen via the [`pay(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#pay) and [`redeemTokensOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1/#redeemtokensof) functions, which invoke the [`IJBPayDelegate.didPay(...)`](/dev/api/interfaces/ijbpaydelegate/) and [`IJBRedemptionDelegate.didRedeem(...)`](/dev/api/interfaces/ijbredemptiondelegate/) functions after the default pay/redeem logic has been executed in the terminal contract.
- The active pay/redemption delegates are defined by a project's [data source](/dev/learn/glossary/data-source/).

## Resources

- The [glossary](/dev/learn/glossary/).
- Our guides on [building a data source](/dev/build/treasury-extensions/data-source/), [building a pay delegate](/dev/build/treasury-extensions/pay-delegate/), and [building a redemption delegate](/dev/build/treasury-extensions/redemption-delegate/).
- Our guide on [payment terminal architecture](/dev/learn/architecture/terminals/).
- Our documentation for [`juice-721-delegate`](/dev/extensions/juice-721-delegate/), an NFT delegate which is also the most popular delegate thus far.
- The [`juice-contract-template`](https://github.com/jbx-protocol/juice-contract-template) repository.

If the resources above don't answer your questions, ask in the [Hackathon's Telegram chat](https://t.me/delegatehackathon) or the [JuiceboxDAO Discord server](https://discord.gg/juicebox).

## Criteria

Make an interesting and useful project – criteria is subjective and up to the judges.

Some ideas:

## Rules

All projects must be open source and use an [open source license](https://opensource.org/licenses).
