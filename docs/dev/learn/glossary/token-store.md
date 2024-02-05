# Token Store

#### What everyone needs to know

- A token store contract manages project token balances, as well as minting and burning.
- All projects using the protocol share a token store (within one protocol version). It is a [core protocol contract](/dev/learn/architecture/) – for Juicebox, this is [`JBTokenStore`](/dev/api/contracts/jbtokenstore/).
- [`JBTokenStore`](/dev/api/contracts/jbtokenstore/) contains several useful read methods: [`JBTokenStore.balanceOf(...)`](/dev/api/contracts/jbtokenstore/read/balanceof/) returns a holder's total token balance for a project (including claimed and unclaimed tokens), and [`JBTokenStore.totalSupplyOf(...)`](/dev/api/contracts/jbtokenstore/read/totalsupplyof/) returns a project token's total supply (also including claimed and unclaimed tokens).
- Project owners can call [`JBTokenStore.issueFor(...)`](/dev/api/contracts/jbtokenstore/write/issuefor/) to issue a claimable ERC-20 for their project token.

#### What you'll want to know if you're building

- A token store is a [core protocol contract](/dev/learn/architecture/) which must adhere to the [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore/) interface.
- A project's token store address can be accessed via [`JBController3_1.tokenStore`](/dev/api/contracts/or-controllers/jbcontroller3_1/#tokenstore).
- Projects do not typically interact directly with [`JBTokenStore`](/dev/api/contracts/jbtokenstore/), instead using methods on the project's controller. For new projects, this is [`JBController3_1`](/dev/api/contracts/or-controllers/jbcontroller3_1/).
