---
sidebar_position: 3
---
# Administration

The protocol has very minimal global governance. The following are the only global functions that can be accessed by a privileged administrating address, initially the [JuiceboxDAO multisig](https://gnosis-safe.io/app/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/home), a 9 of 14 multisig voted in by JBX members:

* **[`JBProjects.setTokenUriResolver(...)`](/v4/deprecated/v3/api/contracts/jbprojects/write/settokenuriresolver.md)**<br/>
  Allows the owner of the [`JBProjects`](/v4/deprecated/v3/api/contracts/jbprojects/README.md) contract to provide and change the [`IJBTokenUriResolver`](/v4/deprecated/v3/api/interfaces/ijbtokenuriresolver.md) used to resolve metadata for project NFTs in its [`tokenURI(...)`](/v4/deprecated/v3/api/contracts/jbprojects/read/tokenuri.md) function.
  <br/>
* **[`JBPrices.addFeedFor(...)`](/v4/deprecated/v3/api/contracts/jbprices/write/addfeed.md)**<br/>
  Allows the owner of the [`JBPrices`](/v4/deprecated/v3/api/contracts/jbprices/README.md) contract to add new price feeds used to convert amounts denoted in one currency to another. Once added, a price feed cannot be removed.
  <br/>
* **[`JBDirectory.setIsAllowedToSetFirstController(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/write/setisallowedtosetfirstcontroller.md)**<br/>
  Allows the owner of the [`JBDirectory`](/v4/deprecated/v3/api/contracts/jbdirectory/) contract to add/remove addresses that can set a project's first controller on its behalf.
  <br/>
* **[`JBETHPaymentTerminal3_1_1.setFee(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#setfee)**<br/>
  Allows the owner of the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/) (or any other terminal inheriting from [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/)) to change the protocol fee incurred when projects distribute their treasury funds outside of the protocol ecosystem or when funds are redeemed from a project with a redemption rate less than 100%. The max fee is 5%.
  <br/>
* **[`JBETHPaymentTerminal3_1_1.setFeeGauge(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#setfeegauge)**<br/>
  Allows the owner of the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/) (or any other terminal inheriting from [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/)) to change the fee gauge used to provide fee discounts on a per-project basis.
  <br/>
* **[`JBETHPaymentTerminal3_1_1.setFeelessAddress(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#setfeelessaddress)**<br/>
  Allows the owner of the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/) (or any other terminal inheriting from [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/)) to add/remove any other address used by other projects to/from a list of address to which distributed funds can be sent without incurring protocol fees, and from which funds can be added back to the project's balance without refunding held fees.
* **[`JBETHPaymentTerminal3_1_1.processFees(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_2/#processfees)**<br/>
Allows the owner of the [`JBETHPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/) (or any other terminal inheriting from [`JBPayoutRedemptionPaymentTerminal3_1_1`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/)) to process any project's [held fees](/v4/deprecated/v3/learn/glossary/hold-fees/).
  <br/>

Ownership for each contract is managed independently and can be transferred to a new owner by the current owner.
