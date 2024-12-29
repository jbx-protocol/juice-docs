# Project

#### What everyone needs to know

* Each project within the Juicebox protocol is represented as an ERC-721 NFT.
* Whoever is the owner of a project's NFT has access to [admin functionality](/docs/v4/learn/glossary/permissions.md) for that project within the protocol, which ultimately gives it control over the project's funds.

#### What you'll want to know if you're building

* Projects can be created either within the context of Juicebox with a call to [`JBController.launchProjectFor(...)`](/docs/v4/api/core/contracts/JBController.md#launchprojectfor) which also configures its ruleset properties and sets it up to receive payments, or by itself with a call to [`JBProjects.createFor(...)`](/docs/v4/api/core/contracts/JBProjects.md#createfor). The `launchProjectFor(...)` transaction calls `createFor(...)` as part of its routine.
* Look through the [`JBProjects`](/docs/v4/api/core/contracts/JBProjects.md) contract for a complete list of relevant read functions, write functions, and emitted events.
