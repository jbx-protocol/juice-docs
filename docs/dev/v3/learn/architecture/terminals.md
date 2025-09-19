---
title: Payment Terminals
---

# Payment Terminal Architecture

Juicebox project can be configured to use any contract that adheres to [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) to manage inflows and outflows of tokens. To understand the basics, read the [glossary](/docs/dev/v3/learn/glossary/payment-terminal.md).

In practice, terminal functionality is implemented across several interfaces, abstract contracts, and implementation contracts. This modular architecture allows for greater flexibility when extending the protocol.[^1]

#### Interfaces

The basic interfaces are:

- [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) - exposes the capacity to take inbound payments.
- [`IJBPayoutTerminal3_1`](/docs/dev/v3/api/interfaces/ijbpayoutterminal3_1.md) - exposes the capacity to distribute payouts.
- [`IJBAllowanceTerminal3_1`](/docs/dev/v3/api/interfaces/ijballowanceterminal3_1.md) - exposes the capacity for discretionary allocation of funds.
- [`IJBRedemptionTerminal`](/docs/dev/v3/api/interfaces/ijbredemptionterminal.md) - exposes the capacity to redeem tokens.

Which are extended by:

- [`IJBSingleTokenPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbsingletokenpaymentterminal.md) (is `IJBPaymentTerminal`) - an extension interface that constrains inbound payments to only one token type.
- [`IJBPayoutRedemptionPaymentTerminal3_1_1`](/docs/dev/v3/api/interfaces/ijbpayoutredemptionpaymentterminal3_1_1.md) (is `IJBPaymentTerminal`, `IJBPayoutTerminal3_1`, `IJBAllowanceTerminal3_1`, `IJBRedemptionTerminal`) - an extension interface that has the capacity to take inbound payments, distribute payouts, allocate discretionary funds, and redeem tokens.

#### Abstract implementation contracts

These interfaces are implemented in the abstract contracts:

- [`JBSingleTokenPaymentTerminal`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/README.md) (is `IJBSingleTokenPaymentTerminal`) - an implementation of a payment terminal that only accepts one token type.
- [`JBPayoutRedemptionPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md) (is `JBSingleTokenPaymentTerminal`, `IJBPayoutRedemptionPaymentTerminal3_1_1`) - an implementation of a payment terminal that has the capacity to take inbound payments of a particular token, distribute payouts of the same particular token, allocate discretionary funds of the same particular token, and make redemptions for the same particular token.

#### Implementation contracts

Finally, these contracts implement the abstract contracts above:

- [`JBETHPaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1.md) (is `JBPayoutRedemptionPaymentTerminal3_1_1`) - an implementation of a fully capable ETH terminal.
- [`JBERC20PaymentTerminal3_1_1`](/docs/dev/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1.md) (is `JBPayoutRedemptionPaymentTerminal3_1_1`) - an implementation of a fully capable ERC-20 terminal.

[^1]: To register a terminal with [`JBDirectory`](/docs/dev/v3/api/contracts/jbdirectory/README.md), that terminal only needs to adhere to [`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md), a basic interface which requires a consistent way of sending funds to the terminal (via `pay` or `addToBalance`). Protocol extensions can ensure their unique requirements are met by utilizing a different interface or abstract contract – for example, an extension which depends on standard redemption functionality can ensure adherence to [`IJBRedemptionTerminal`](/docs/dev/v3/api/interfaces/ijbredemptionterminal.md). This allows for easier extension interoperability.
