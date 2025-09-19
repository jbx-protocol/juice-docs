# Token Store

#### What everyone needs to know

- A token store contract manages project token balances, as well as minting and burning.
- All projects using the protocol share a token store (within one protocol version). It is a [core protocol contract](/docs/dev/v3/learn/architecture/README.md) – for Juicebox, this is [`JBTokenStore`](/docs/dev/v3/api/contracts/jbtokenstore/README.md).
- [`JBTokenStore`](/docs/dev/v3/api/contracts/jbtokenstore/README.md) contains several useful read methods: [`JBTokenStore.balanceOf(...)`](/docs/dev/v3/api/contracts/jbtokenstore/read/balanceof.md) returns a holder's total token balance for a project (including claimed and unclaimed tokens), and [`JBTokenStore.totalSupplyOf(...)`](/docs/dev/v3/api/contracts/jbtokenstore/read/totalsupplyof.md) returns a project token's total supply (also including claimed and unclaimed tokens).
- Project owners can call [`JBTokenStore.issueFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/issuefor.md) to issue a claimable ERC-20 for their project token.

#### What you'll want to know if you're building

- A token store is a [core protocol contract](/docs/dev/v3/learn/architecture/README.md) which must adhere to the [`IJBTokenStore`](/docs/dev/v3/api/interfaces/ijbtokenstore.md) interface.
- A project's token store address can be accessed via [`JBController3_1.tokenStore`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#tokenstore).
- Projects do not typically interact directly with [`JBTokenStore`](/docs/dev/v3/api/contracts/jbtokenstore/README.md), instead using methods on the project's controller. For new projects, this is [`JBController3_1`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md).
