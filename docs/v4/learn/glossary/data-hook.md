# Data Hook

#### What everyone needs to know

* A data hook contract provides extensions to a treasury that either override or augment the default [`JBMultiTerminal`](/docs/v4/api/core/contracts/JBMultiTerminal.md) functionality.
* A data hook can provide custom data to the [`JBMultiTerminal.pay(...)`](/docs/v4/api/core/contracts/JBMultiTerminal.md#pay) transaction and/or the [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/v4/api/core/contracts/JBMultiTerminal.md#cashouttokensof) transaction.
* The data hook is passed contextual information from the transactions, which it uses to derive custom data for the protocol to affect subsequent behaviors in the pay and cash out transactions. Contextual information from the pay transaction is passed in the form of [`JBBeforePayRecordedContext`](/docs/v4/api/core/structs/JBBeforePayRecordedContext.md), and contextual information from the cash out transaction is passed in the form of [`JBBeforeCashOutRecordedContext`](/docs/v4/api/core/structs/JBBeforeCashOutRecordedContext.md).
* Data hooks can revert under custom circumstances, enabling functionality such as gated treasuries, max token supplies, or minimum contribution amounts.
* A data hook is responsible for specifying any [pay hook](pay-hook.md) that should be triggered after the core functionality of a [`pay(...)`](/docs/v4/api/core/contracts/JBMultiTerminal.md#pay) or [`cashOutTokensOf(...)`](/docs/v4/api/core/contracts/JBMultiTerminal.md#cashouttokensof) transaction executes successfully.
* Each [`IJBTerminal`](/docs/v4/api/core/interfaces/IJBTerminal.md) fork can leverage data hooks in unique ways.

#### What you'll want to know if you're building

* A data hook must adhere to the [`IJBRulesetDataHook`](/docs/v4/api/core/interfaces/IJBRulesetDataHook.md) interface.
* A data hook can be specified in a ruleset, along with flags that indicate if the ruleset should `useDataHookForPay` and/or `useDataHookForCashOut`. These are set either in [`JBController.launchProjectFor(...)`](/docs/v4/api/core/contracts/JBController.md#launchprojectfor) or [`JBController.queueRulesetsOf(...)`](/docs/v4/api/core/contracts/JBController.md#queuerulesetsof).
* A ruleset's data hook is called upon in [`JBTerminalStore.recordPaymentFrom(...)`](/docs/v4/api/core/contracts/JBTerminalStore.md#recordpaymentfrom) and in [`JBTerminal.recordCashOutFor(...)`](/docs/v4/api/core/contracts/JBTerminalStore.md#recordcashoutfor).
* A data hook has implicit permissions to [`JBController.mintTokensFor(...)`](/docs/v4/api/core/contracts/JBController.md#minttokensfor) on a project's behalf.
* If a data hook is not specified in a ruleset, or if flags aren't explicitly set, default protocol data will be used.

<!-- [Get started building data hooks](/docs/v4/build/treasury-extensions/data-hook.md). -->

