# Payment terminal

#### What everyone needs to know

* A project can be configured to use any contract(s) that adheres to [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) to manage its inflows and outflows of token funds.
* Each payment terminal can have a unique distribution limit and overflow allowance.
* Each payment terminal can behave differently when it receives payments.

#### What you'll want to know if you're building

* A project can set its terminals using [`JBDirectory.setTerminalsOf(...)`](/dev/api/contracts/jbdirectory/write/setterminalsof.md).
* If a project uses multiple terminals to manage funds for the same token, it can set the primary one (where other Web3 contracts should send funds to) using [`JBDirectory.setPrimaryTerminalOf(...)`](/dev/api/contracts/jbdirectory/write/setprimaryterminalof.md).
* To pay a project with a certain token, get its preferred payment terminal using [`JBDirectory.primaryTerminalOf(...)`](/dev/api/contracts/jbdirectory/read/primaryterminalof.md). If no terminal is returned, the project is not currently accepting the specified token.
