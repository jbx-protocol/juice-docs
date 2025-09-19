# Terminal

#### What everyone needs to know

* A project can be configured to use any contract(s) that adheres to [`IJBTerminal`](/docs/dev/v4/api/core/interfaces/IJBTerminal.md) to manage its inflows and outflows of token funds.
* Each terminal can have a unique payout limit and overflow allowance for each tokens they manage.
* Each terminal can behave differently when it receives payments.

#### What you'll want to know if you're building

* A project can set its terminals using [`JBDirectory.setTerminalsOf(...)`](/docs/dev/v4/api/core/JBDirectory.md#setterminalsof).
* If a project uses multiple terminals to manage funds for the same token, it can set the primary one (where other Web3 contracts should send funds to) using [`JBDirectory.setPrimaryTerminalOf(...)`](/docs/dev/v4/api/core/JBDirectory.md#setprimaryterminalof).
* To pay a project with a certain token, get its preferred terminal using [`JBDirectory.primaryTerminalOf(...)`](/docs/dev/v4/api/core/JBDirectory.md#primaryterminalof). If no terminal is returned, the project is not currently accepting the specified token.


