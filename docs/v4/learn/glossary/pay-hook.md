# Pay Hook

#### What everyone needs to know

* A pay hook contract provides extensions to a project that augments the default [`JBMultiTerminal`](/docs/v4/api/core/contracts/JBMultiTerminal.md) behavior.
* Pay hooks include a custom `afterPayRecordedWith(...)` hook that executes after all default protocol pay logic has successfully executed in the terminal contract. The hook is passed contextual information via a [`JBAfterPayRecordedContext`](/docs/v4/api/core/structs/JBAfterPayRecordedContext.md) data structure.
* Each [`IJBTerminal`](/docs/v4/api/core/interfaces/IJBTerminal.md) fork can leverage pay hooks in unique ways.

#### What you'll want to know if you're building

* Pay hooks must adhere to the [`IJBPayHook`](/docs/v4/api/core/interfaces/IJBPayHook.md) interface.
* The ruleset's [`dataHook`](data-hook.md) specifies the active pay hook contract.
* The [`IJBPayHook`](/docs/v4/api/core/interfaces/IJBPayHook.md)'s `afterPayRecordedWith(...)` hook is triggered in [`JBMultiTerminal._pay(...)`](/docs/v4/api/core/contracts/JBMultiTerminal.md#_pay).

[Get started building pay hooks](/docs/v4/build/hooks/pay-hook.md).

