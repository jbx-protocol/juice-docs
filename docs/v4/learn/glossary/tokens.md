# Tokens

#### What everyone needs to know

* By default, all payments that come in to a Juicebox project issue tokens. These tokens are distributed to a beneficiary specified by the payer, and to any addresses specified in the project's reserved token list. The amount of tokens minted depends on the amount paid and the `weight` (i.e. exchange rate) of the project's current funding cycle. Projects can override or extended this default behavior using [data sources](/docs/v4/learn/glossary/ruleset-data-hook.md).
* By default, the protocol allocates tokens to recipients using an internal accounting mechanism in [`JBTokens`](/docs/v4/api/core/JBTokens.md). These are fungible but do not conform to the ERC-20 standard, and as such cannot be composed with ecosystem ERC-20 marketplaces like AMMs. Their balances can still be used for voting on various platforms.
* Projects can issue their own ERC-20 token directly from the protocol to use as its token. Projects can also bring their own token as long as it conforms to the [`IJBToken`](/docs/v4/api/core/interfaces/IJBToken.md) interface and uses 18 decimal fixed point accounting. This makes it possible to use ERC-1155's or custom tokens.
* Once a project has issued a token, token holders can claim tokens from the protocol's internal accounting mechanism in [`JBTokens`](/docs/v4/api/core/JBTokens.md) to their wallet to use across the Ethereum global computer. 
* By default, tokens can be [cashed out](/docs/v4/learn/glossary/cash-out-tax-rate.md) by holders to reclaim a portion of what's in the project's [surplus](/docs/v4/learn/glossary/surplus.md). The amount of surplus claimable is determined by the [`cashOutTaxRate`](/docs/v4/learn/glossary/cash-out-tax-rate.md) of the project's current ruleset. Projects can override or extend this default behavior. Cashing out tokens burns them, shrinking the total supply.
* A project owner can issue and distribute more of the project's tokens on demand. This behavior must be explicitly allowed on a per-ruleset basis.
* A project can use its tokens however it wishes. It can be purely ceremonial, used for governance, used for airdrops, or whatever.

#### What you'll want to know if you're building

* Tokens can be issued on-demand by project owners or their operators by calling [`JBController.deployERC20For(...)`](/docs/v4/api/core/JBController.md#deployerc20for). The ability to do so must be explicitly turned on via a ruleset configuration metadata parameter.
* Tokens can be burned on-demand by holders by calling [`JBController.burnTokensOf(...)`](/docs/v4/api/core/JBController.md#burntokensof).
