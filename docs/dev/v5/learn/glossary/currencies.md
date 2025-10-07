# Currencies

#### What everyone needs to know

* Juicebox uses a dual currency system: standard currency IDs (like 1 for ETH, 2 for USD) and token-specific currencies derived from token addresses.
* A project's token issuance is always relative to a base currency defined in its ruleset metadata, regardless of which tokens it accepts payments in.
* It is custom to calculate token currencies as `uint32(uint256(tokenAddress))`, making the native token (0x000000000000000000000000000000000000EEEe) have currency ID 61166.
* Projects can accept payments in multiple tokens across different blockchains, each with their own currency ID, while maintaining consistent token issuance relative to their base currency.
* The [JBPrices](/docs/dev/v5/api/core/JBPrices.md) contract handles price conversion between the currency of received tokens and the project's base currency for token issuance.

#### How currencies work

Juicebox projects operate with two types of currency identifiers:

**Standard Currency IDs:**
- `1` = ETH
- `2` = USD
- These represent abstract currency concepts that remain consistent across all blockchains

**Token Currency IDs:**
- Calculated as `uint32(uint256(tokenAddress))`
- Each token address has its own unique currency ID
- Examples:
  - Native token (0x000000000000000000000000000000000000EEEe) = currency ID `61166`
  - USDC on Ethereum = currency ID based on USDC's Ethereum address
  - USDC on Base = currency ID based on USDC's Base address

#### Project token issuance

A project's token issuance is always relative to its `baseCurrency` defined in the [ruleset metadata](/docs/dev/v5/api/core/structs/JBRulesetMetadata.md):

```
// Example: 1,000 project tokens per 1 ETH
{
  baseCurrency: 1, // ETH
  weight: 1_000_000_000_000_000_000_000_000 // 1,000 tokens per ETH unit
}
```

This means:
- If someone pays 1 ETH → receives 1,000 project tokens
- If someone pays 1 USD → receives 100 project tokens (assuming 1:10 ETH/USD ratio)
- If someone pays 1 USDC → receives 100 project tokens (assuming 1:1 USDC/USD ratio)

#### Multi-chain currency management

Projects can accept payments in different tokens across different blockchains while maintaining consistent token issuance:

**Accounting Contexts:**
Each terminal's accounting contexts specify which tokens the project accepts and their associated currencies:

```javascript
accountingContextsToAccept: [{
  token: 0x000000000000000000000000000000000000EEEe, // Native token
  decimals: 18,
  currency: 61166 // Currency ID of the native token
}, {
  token: 0xA0b86a33E6441c8C06DdD4D4c4c4c4c4c4c4c4c4, // Example, USDC on Ethereum
  decimals: 6,
  currency: 1234567890 // Example, currency ID of USDC on Ethereum
}]
```

**Price Resolution:**
The [JBPrices](/docs/dev/v5/api/core/JBPrices.md) contract handles conversion between different currencies:
- When a payment is made in USDC (currency 1234567890)
- But the project issues tokens relative to ETH (currency 1)
- JBPrices provides the ETH/USDC exchange rate
- Token issuance is calculated based on the ETH equivalent value

#### Cross-chain considerations

The same token can have different addresses on different chains:
- USDC on Ethereum: `0xA0b86a33E6441c8C06DdD4D4c4c4c4c4c4c4c4c4`
- USDC on Polygon: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174`
- Each has its own currency ID

Native tokens also vary by chain:
- Ethereum: ETH (0x000000000000000000000000000000000000EEEe) = currency 61166
- Polygon: MATIC (different address) = different currency ID
- Arbitrum: ETH (same address) = same currency ID 61166

This system allows projects to maintain consistent token economics across all supported blockchains while accepting payments in the most convenient tokens for each chain's users.

#### What you'll want to know if you're building

* Currency IDs are used in [`JBRulesetMetadata.baseCurrency`](/docs/dev/v5/api/core/structs/JBRulesetMetadata.md#basecurrency) to define token issuance rates.
* Token currencies are specified in [`JBAccountingContext.currency`](/docs/dev/v5/api/core/structs/JBAccountingContext.md#currency) for each accepted token.
* Price conversion is handled by the [`JBPrices`](/docs/dev/v5/api/core/JBPrices.md) contract when payments are made in currencies different from the project's base currency.
* The native token address `0x000000000000000000000000000000000000EEEe` always maps to currency ID 61166 across all chains where it exists.
