# Data source

#### What everyone needs to know

* A data source contract is a way of providing extensions to a treasury that either override or augment the default [`JBPayoutRedemptionPaymentTerminal3_1_1`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/) functionality.
* A data source contract can be used to provide custom data to the [`JBPayoutRedemptionPaymentTerminal3_1_1.pay(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#pay) transaction and/or the [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof) transaction.
* A data source is passed contextual information from the transactions, from which it can derive custom data for the protocol to use to affect subsequent behaviors in the pay and redeem transactions. Contextual information from the pay transaction is passed to the data source in the form of [`JBPayParamsData`](/dev/api/data-structures/jbpayparamsdata.md) , and contextual information from the redeem transaction is passed to the data source in the form of [`JBRedeemParamsData`](/dev/api/data-structures/jbredeemparamsdata.md).
* Data sources can revert under custom circumstances, which can be used to create a gated treasury, max token supply, min contribution amount, etc.
* A data source is responsible for specifying any [delegate](delegate.md) hooks that should be triggered after the core functionality of a [`pay(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#pay) or [`redeemTokensOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof) transaction executes successfully.
* Each [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) fork can leverage data sources in unique ways.

#### What you'll want to know if you're building

* A data source must adhere to the [`IJBFundingCycleDataSource3_1_1`](/dev/api/interfaces/ijbfundingcycledatasource3_1_1/) interface.
* A data source contract can be specified in a funding cycle, along with flags that indicate if the funding cycle should `useDataSourceForPay` and/or `useDataSourceForRedeem`. These are set either in [`JBController3_1.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor) or [`JBController3_1.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof).
* A funding cycle's data source is called upon in [`JBSingleTokenPaymentTerminalStore3_1_1.recordPaymentFrom(...)`](/dev/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#recordpaymentfrom) and in [`JBSingleTokenPaymentTerminalStore3_1_1.recordRedemptionFor(...)`](/dev/api/contracts/jbsingletokenpaymentterminalstore3_1_1/#recordredemptionfor).
* A data source has implicit permissions to [`JBController3_1.mintTokensFor(...)`](/dev/api/contracts/or-controllers/jbcontroller3_1/#minttokensfor) on a project's behalf.
* If a data source is not specified in a funding cycle, or if flags aren't explicitly set, default protocol data will be used.

[Get started building data sources](/dev/build/treasury-extensions/data-source.md).
