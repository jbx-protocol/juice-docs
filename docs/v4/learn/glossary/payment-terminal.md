# Project

#### What everyone needs to know

* A payment terminal is a smart contract that processes inbound and out payments for projects.
* A project's funds are stored in its payment terminal.
* Most projects on Juicebox use the same payment terminal.

#### What you'll want to know if you're building

* A payment terminal must adhere to the [`IJBTerminal`](/docs/v4/api/core/interfaces/IJBTerminal.md).
* Projects set their payment terminals when the project is deployed using the [`JBController.launchProjectFor`](/docs/v4/api/core/JBController.md#launchprojectfor) transaction, and can edit their payment terminals with a call to [`JBDirectory.setTerminalsOf(...)`](/docs/v4/api/core/JBDirectory.md#setterminalsof). 
* The [`JBMultiTerminal`](/docs/v4/api/core/JBMultiTerminal.md) is the common terminal that supports ETH and any other ERC-20 that the project chooses to accept.
