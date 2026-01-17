# Bendystraw

#### What everyone needs to know

* Bendystraw is a GraphQL API for querying Juicebox protocol data across all supported chains.
* It indexes on-chain events in real-time, providing access to projects, payments, token holders, NFTs, loans, and activity feeds.
* For [omnichain](/docs/dev/v5/learn/glossary/omnichain.md) projects, Bendystraw aggregates data across all chains via `suckerGroup` queries—get total balance, token supply, and contributor counts in one request.

#### What you'll want to know if you're building

* **Endpoints**: Mainnet at `bendystraw.xyz`, testnet at `testnet.bendystraw.xyz`. Contact [@peripheralist](https://x.com/peripheralist) for an API key.
* **Key entities**: `project` (config & stats), `participant` (token holders), `suckerGroup` (cross-chain aggregates), `activityEvent` (unified timeline), `nft`/`nftTier` (NFT data), `loan` (Revnet loans).
* Always include `version: 5` in queries for V5 protocol data.
* The SDK provides `useBendystrawQuery` for React integration with built-in caching and polling.
* **Important**: API keys should not be exposed in client-side code. Use a server-side proxy for frontend applications.
* See the [Bendystraw build guide](/docs/dev/v5/build/bendystraw.md) for complete query examples and SDK integration.
* Interactive playgrounds: [mainnet](https://bendystraw.xyz/schema) | [testnet](https://testnet.bendystraw.xyz/schema)
