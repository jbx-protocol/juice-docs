# Cash Out Hook

#### What everyone needs to know

* A cash out hook delegate contract provides extensions to a project that augment the default [`JBMultiTerminal`](/docs/v4/api/core/JBMultiTerminal.sol/contract.JBMultiTerminal.md) behavior.
* Cash out hooks include a custom `afterCashOutRecordedWith(...)` hook that executes after all default protocol cash out logic has successfully executed in the terminal contract. The hook is passed contextual information via a [`JBAfterCashOutRecordedContext`](/docs/v4/api/core/structs/JBAfterCashOutRecordedContext.sol/struct.JBAfterCashOutRecordedContext.md) data structure. The `afterCashOutRecordedWith(...)` hook is called before any reclaimed tokens are transferred out of the terminal contract.
* Each [`IJBTerminal`](/docs/v4/api/core/interfaces/IJBTerminal.sol/interface.IJBTerminal.md) fork can leverage cash out hooks in unique ways.

#### What you'll want to know if you're building

* Cash out hooks must adhere to the [`IJBCashOutHook`](/docs/v4/api/core/interfaces/IJBCashOutHook.sol/interface.IJBCashOutHook.md) interface. Any contract implementing this interface can be used as a cash out hook in a project's rulesets.
* The rulesets's [`dataHook`](ruleset-data-hook.md) specifies the active cash out hook contract.
* The [`IJBCashOutHook`](/docs/v4/api/core/interfaces/IJBCashOutHook.sol/interface.IJBCashOutHook.md)'s `afterCashOutRecordedWith(...)` hook is triggered in [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/v4/api/core/JBMultiTerminal.sol/contract.JBMultiTerminal.md#cashouttokensof).
* The cash out hook is called before funds are dispersed.

[Get started building cash out hooks](/docs/v4/build/hooks/cash-out-hook.md).

