# Data Hook

#### What everyone needs to know

* A data hook contract provides extensions to a treasury that either override or augment the default [`JBMultiTerminal`](/v4/api/core/contracts/jbmultiterminal/) functionality.
* A data hook can provide custom data to the [`JBMultiTerminal.pay(...)`](/v4/api/core/contracts/jbmultiterminal/#pay) transaction and/or the [`JBMultiTerminal.cashOutTokensOf(...)`](/v4/api/core/contracts/jbmultiterminal/#cashouttokensof) transaction.
* The data hook is passed contextual information from the transactions, which it uses to derive custom data for the protocol to affect subsequent behaviors in the pay and cash out transactions. Contextual information from the pay transaction is passed in the form of [`JBBeforePayRecordedContext`](/v4/api/core/structs/jbbeforepayrecordedcontext), and contextual information from the cash out transaction is passed in the form of [`JBBeforeCashOutRecordedContext`](/v4/api/core/structs/jbbeforecashoutrecordedcontext).
* Data hooks can revert under custom circumstances, enabling functionality such as gated treasuries, max token supplies, or minimum contribution amounts.
* A data hook is responsible for specifying any [pay hook](pay-hook.md) that should be triggered after the core functionality of a [`pay(...)`](/v4/api/core/contracts/jbmultiterminal/#pay) or [`cashOutTokensOf(...)`](/v4/api/core/contracts/or-payment-terminals/jbmultitermainl/#cashouttokensof) transaction executes successfully.
* Each [`IJBTerminal`](/v4/api/core/interfaces/ijbterminal) fork can leverage data hooks in unique ways.

#### What you'll want to know if you're building

* A data hook must adhere to the [`IJBRulesetDataHook`](/v4/api/core/interfaces/ijbrulesetdatahook/) interface.
* A data hook can be specified in a ruleset, along with flags that indicate if the ruleset should `useDataHookForPay` and/or `useDataHookForCashOut`. These are set either in [`JBController.launchProjectFor(...)`](/v4/api/core/contracts/jbcontroller/#launchprojectfor) or [`JBController.queueRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#queuerulesetsof).
* A ruleset's data hook is called upon in [`JBTerminalStore.recordPaymentFrom(...)`](/v4/api/core/contracts/jbterminalstore/#recordpaymentfrom) and in [`JBTerminal.recordCashOutFor(...)`](/v4/api/core/contracts/jbterminalstore/#recordcashoutfor).
* A data hook has implicit permissions to [`JBController.mintTokensFor(...)`](/v4/api/core/contracts/jbcontroller/#minttokensfor) on a project's behalf.
* If a data hook is not specified in a ruleset, or if flags aren't explicitly set, default protocol data will be used.

<!-- [Get started building data hooks](/v4/build/treasury-extensions/data-hook.md). -->

