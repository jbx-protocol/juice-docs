# Relayr

#### What everyone needs to know

* Relayr is a cross-chain transaction service that enables gasless, multi-chain transaction bundling.
* With Relayr, you sign transactions for each target chain, then pay gas on just one chain of your choice. Relayr's relayers execute the transactions on all other chains for you.
* This is how [omnichain](/docs/dev/v5/learn/glossary/omnichain.md) project deployments and cross-chain ruleset updates work in Juicebox—one payment triggers deployments across Ethereum, Optimism, Arbitrum, and Base simultaneously.

#### What you'll want to know if you're building

* Relayr uses [ERC-2771](https://eips.ethereum.org/EIPS/eip-2771) meta-transactions. Users sign transactions without paying gas, then a trusted forwarder executes them.
* The flow is: **get quote** (sign each chain's tx) → **select payment chain** → **send payment** → **poll for completion**.
* The SDK provides three hooks: [`useGetRelayrTxQuote`](/docs/dev/v5/build/relayr.md#usegetrelayrtxquote) for signing and getting gas estimates, [`useSendRelayrTx`](/docs/dev/v5/build/relayr.md#usesendrelayrtx) for submitting payment, and [`useGetRelayrTxBundle`](/docs/dev/v5/build/relayr.md#usegetrelayrtxbundle) for tracking execution status.
* Transaction bundles are identified by a `bundle_uuid`. Individual transactions progress through statuses: `Pending` → `Included` → `Completed` → `Success` (or `Failed`).
* See the [Relayr build guide](/docs/dev/v5/build/relayr.md) for complete integration examples.
* Built by [0xBa5ed](https://x.com/0xba5ed). API endpoint: `https://api.relayr.ba5ed.com`
