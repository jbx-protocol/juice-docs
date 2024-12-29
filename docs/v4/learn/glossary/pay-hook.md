# Pay Hook

#### What everyone needs to know

* A pay hook contract provides extensions to a treasury that augments the default [`JBMultiTerminal`](/v4/api/core/contracts/jbmultiterminal/) behavior.
* Pay hooks include a custom `afterPayRecordedWith(...)` hook that executes after all default protocol pay logic has successfully executed in the terminal contract. The hook is passed contextual information via a [`JBAfterPayRecordedContext`](/v4/api/core/structs/jbafterpayrecordedcontext) data structure.
* Each [`IJBTerminal`](/v4/api/core/interfaces/ijbterminal) fork can leverage pay hooks in unique ways.

#### What you'll want to know if you're building

* Pay hooks must adhere to the [`IJBPayHook`](/v4/api/core/interfaces/ijbpayhook/) interface.
* The ruleset's [`dataHook`](data-hook.md) specifies the active pay hook contract.
* The [`IJBPayHook`](/v4/api/core/interfaces/ijbpayhook/)'s `afterPayRecordedWith(...)` hook is triggered in [`JBMultiTerminal._pay(...)`](/v4/api/core/contracts/jbmultiterminal/#_pay).

<!-- [Get started building pay hooks](/v4/build/treasury-extensions/pay-hook.md). -->

