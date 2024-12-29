# Cash Out Hook

#### What everyone needs to know

* A cash out hook delegate contract provides extensions to a treasury that augment the default [`JBMultiTerminal`](/v4/api/core/contracts/jbmultiterminal/) behavior.
* Cash out hooks include a custom `afterCashOutRecordedWith(...)` hook that executes after all default protocol cash out logic has successfully executed in the terminal contract. The hook is passed contextual information via a [`JBAfterCashOutRecordedContext`](/v4/api/core/structs/jbaftercashoutrecordedcontext) data structure. The `afterCashOutRecordedWith(...)` hook is called before any reclaimed tokens are transferred out of the terminal contract.
* Each [`IJBTerminal`](/v4/api/core/interfaces/ijbterminal) fork can leverage cash out hooks in unique ways.

#### What you'll want to know if you're building

* Cash out hooks must adhere to the [`IJBCashOutHook`](/v4/api/core/interfaces/ijbcashouthook/) interface. Any contract implementing this interface can be used as a cash out hook in a project's rulesets.
* The rulesets's [`dataHook`](data-hook.md) specifies the active cash out hook contract.
* The [`IJBCashOutHook`](/v4/api/core/interfaces/ijbcashouthook/)'s `afterCashOutRecordedWith(...)` hook is triggered in [`JBMultiTerminal.cashOutTokensOf(...)`](/v4/api/core/contracts/jbmultiterminal/#cashouttokensof).
* The cash out hook is called before funds are dispersed.

<!-- [Get started building cash out hooks](/v4/build/treasury-extensions/cash-out-hook.md). -->

