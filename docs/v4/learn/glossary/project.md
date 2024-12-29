# Project

#### What everyone needs to know

* Each project within the Juicebox protocol is represented as an ERC-721 NFT.
* Whoever is the owner of a project's NFT has access to [admin functionality](/v4/learn/glossary/permissions.md) for that project within the protocol, which ultimately gives it control over the project's funds.

#### What you'll want to know if you're building

* Projects can be created either within the context of Juicebox with a call to [`JBController.launchProjectFor(...)`](/v4/api/core/contracts/jbcontroller/#launchprojectfor) which also configures its ruleset properties and sets it up to receive payments, or by itself with a call to [`JBProjects.createFor(...)`](/v4/api/core/contracts/jbprojects.md/#createfor.md). The `launchProjectFor(...)` transaction calls `createFor(...)` as part of its routine.
* Look through the [`JBProjects`](/v4/api/core/contracts/jbprojects/) contract for a complete list of relevant read functions, write functions, and emitted events.
