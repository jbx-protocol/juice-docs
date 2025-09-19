# Cash Out Hook

#### What everyone needs to know

* A cash out hook delegate contract provides extensions to a project that augment the default [`JBMultiTerminal`](/docs/dev/v4/api/core/JBMultiTerminal.md) behavior.
* Cash out hooks include a custom `afterCashOutRecordedWith(...)` hook that executes after all default protocol cash out logic has successfully executed in the terminal contract. The hook is passed contextual information via a [`JBAfterCashOutRecordedContext`](/docs/dev/v4/api/core/structs/JBAfterCashOutRecordedContext.md) data structure. The `afterCashOutRecordedWith(...)` hook is called before any reclaimed tokens are transferred out of the terminal contract.
* Each [`IJBTerminal`](/docs/dev/v4/api/core/interfaces/IJBTerminal.md) fork can leverage cash out hooks in unique ways.

#### What you'll want to know if you're building

* Cash out hooks must adhere to the [`IJBCashOutHook`](/docs/dev/v4/api/core/interfaces/IJBCashOutHook.md) interface. Any contract implementing this interface can be used as a cash out hook in a project's rulesets.
* The rulesets's [`dataHook`](ruleset-data-hook.md) specifies the active cash out hook contract.
* The [`IJBCashOutHook`](/docs/dev/v4/api/core/interfaces/IJBCashOutHook.md)'s `afterCashOutRecordedWith(...)` hook is triggered in [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/dev/v4/api/core/JBMultiTerminal.md#cashouttokensof).
* The cash out hook is called before funds are dispersed.

[Get started building cash out hooks](/docs/dev/v4/build/hooks/cash-out-hook.md).

