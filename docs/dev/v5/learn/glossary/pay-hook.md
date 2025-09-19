# Pay Hook

#### What everyone needs to know

* A pay hook contract provides extensions to a project that augments the default [`JBMultiTerminal`](/docs/dev/v5/api/core/JBMultiTerminal.md) behavior.
* Pay hooks include a custom `afterPayRecordedWith(...)` hook that executes after all default protocol pay logic has successfully executed in the terminal contract. The hook is passed contextual information via a [`JBAfterPayRecordedContext`](/docs/dev/v5/api/core/structs/JBAfterPayRecordedContext.md) data structure.
* Each [`IJBTerminal`](/docs/dev/v5/api/core/interfaces/IJBTerminal.md) fork can leverage pay hooks in unique ways.

#### What you'll want to know if you're building

* Pay hooks must adhere to the [`IJBPayHook`](/docs/dev/v5/api/core/interfaces/IJBPayHook.md) interface.
* The ruleset's [`dataHook`](ruleset-data-hook.md) specifies the active pay hook contract.
* The [`IJBPayHook`](/docs/dev/v5/api/core/interfaces/IJBPayHook.md)'s `afterPayRecordedWith(...)` hook is triggered in [`JBMultiTerminal._pay(...)`](/docs/dev/v5/api/core/JBMultiTerminal.md#_pay).

[Get started building pay hooks](/docs/dev/v5/build/hooks/pay-hook.md).

