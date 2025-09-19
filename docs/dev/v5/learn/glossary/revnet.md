# Revnet

#### What everyone needs to know

* A revnet is just a Juicebox project owned by a contract that enforces specific rulesets.
* A revnet does not use payouts. Instead, all funds received can only be accessed by cashing out tokens. Because of this, revnet tokens are fully backed by the treasury.
* A revnet offers its token holders loans from its funds in exchange for its tokens as collateral and a fee.


#### What you'll want to know if you're building

* A revnet can be deployed by calling [`REVDeployer.deployFor(...)`](/docs/dev/v5/api/revnet/REVDeployer.md#deployfor), or [`REVDeployer.deployWith721sFor(...)`](/docs/dev/v5/api/revnet/REVDeployer.md#deploywith721sfor) if the revnet should accommodate sell NFTs. The revnet will remain owned by the contract that deployed it.

