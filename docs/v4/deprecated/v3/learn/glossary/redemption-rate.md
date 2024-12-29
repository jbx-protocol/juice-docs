# Redemption rate

#### What everyone needs to know

* The redemption rate determines what proportion of treasury assets can be reclaimed by a token holder by redeeming their tokens.
* By default, all treasury assets that are considered overflow can be reclaimed by token holders. This can be modified using [data source](/v4/deprecated/v3/learn/glossary/data-source.md) extensions.
* A project's redemption rate and extensions can be reconfigured each funding cycle.
* A redemption rate of 100% is linear, meaning a holder with 10% of the token supply can redeem all of their tokens for 10% of available treasury assets.
* A redemption rate of 0% will completely disable redemptions, meaning tokens cannot be redeemed.
* A redemption rate of `x`% where 0% < `x` < 100% will leave some assets in the treasury to share between those who wait longer to redeem. The smaller the `x`, the fewer assets can be reclaimed (*see note below*).
* A project can set a different redemption rate that takes effect only when the project's current funding cycle has an active [ballot](ballot.md).
* Redemptions incur a JBX membership fee when the redemption rate (or [ballot](ballot.md) redemption rate) is less than 100%. This fee can be set anywhere between 0% and 5%.

<details>

<summary>Redemption when 0% &lt; x &lt; 100%</summary>

With a redemption rate of 50%, a holder with 10% of the token supply can redeem their tokens for *slightly more* than 5% of available treasury assets.

The other ~5% will remain in the treasury, thereby increasing the redemption value of everyone else's tokens by increasing the ratio of assets to tokens. This encourages holders to redeem later than others – the first holders to redeem will receive the fewest assets in return.

The reason that slightly more than 5% of assets would be returned: a redemption rate of 0% < `x`% < 100% allows for redemptions along a *bonding curve*. Specifically, the formula is:

![](/img/misc/redemption-formula.png)

Where:

- **r** is the redemption rate (from 0 to 1),
- **o** is the *overflow*, or the funds not being paid out from the treasury that funding cycle,
- **s** is the current token supply, and
- **x** is the amount of tokens being redeemed

Here is an example bonding curve with an overflow of 100 ETH, a total supply of 200 tokens, and a redemption rate of 71.7%. The X axis represents the number of tokens being redeemed, and the Y axis represents the ETH that would be returned. You can try [editing the variables yourself](https://www.desmos.com/calculator/sp9ru6zbpk).

<iframe src="https://www.desmos.com/calculator/wqpqxwcnxi?embed" width="500" height="500"></iframe>

</details>

#### What you'll want to know if you're building

* Token holders can redeem their tokens by calling [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof).
* A redemption rate can be specified in a funding cycle through the [`JBController3_1.launchProjectFor(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor) or [`JBController3_1.reconfigureFundingCyclesOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof) transactions.
* A ballot redemption rate can be specified in a funding cycle through the [`JBController3_1.launchProjectFor(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#launchprojectfor) or [`JBController3_1.reconfigureFundingCyclesOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof) transactions, which will override the standard redemption rate if there is currently a [reconfiguration ballot active](/v4/deprecated/v3/learn/glossary/ballot.md).
