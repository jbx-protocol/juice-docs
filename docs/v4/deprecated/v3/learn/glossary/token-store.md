# Token Store

#### What everyone needs to know

- A token store contract manages project token balances, as well as minting and burning.
- All projects using the protocol share a token store (within one protocol version). It is a [core protocol contract](/v4/deprecated/v3/learn/architecture/) – for Juicebox, this is [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/).
- [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/) contains several useful read methods: [`JBTokenStore.balanceOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/read/balanceof/) returns a holder's total token balance for a project (including claimed and unclaimed tokens), and [`JBTokenStore.totalSupplyOf(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/read/totalsupplyof/) returns a project token's total supply (also including claimed and unclaimed tokens).
- Project owners can call [`JBTokenStore.issueFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/issuefor/) to issue a claimable ERC-20 for their project token.

#### What you'll want to know if you're building

- A token store is a [core protocol contract](/v4/deprecated/v3/learn/architecture/) which must adhere to the [`IJBTokenStore`](/v4/deprecated/v3/api/interfaces/ijbtokenstore/) interface.
- A project's token store address can be accessed via [`JBController3_1.tokenStore`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#tokenstore).
- Projects do not typically interact directly with [`JBTokenStore`](/v4/deprecated/v3/api/contracts/jbtokenstore/), instead using methods on the project's controller. For new projects, this is [`JBController3_1`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/).
