# Cash Out Tax Rate

#### What everyone needs to know

* The cash out tax rate determines what proportion of a project's assets can be reclaimed by a token holder by cashing out their tokens, with a portion withheld as tax.
* By default, all of a project's assets that are considered surplus can be reclaimed by token holders by cashing out. This can be modified using [data hook](/docs/dev/v4/learn/glossary/ruleset-data-hook.md) extensions.
* A project's cash out tax rate and hooks can be reconfigured each ruleset.
* A cash out tax rate of 0 means no tax is withheld, and holders can cash out all of their tokens for their proportional share of a project's available surplus.
* A cash out tax rate of 1 will completely disable cash outs, meaning surplus cannot be accessed by token holders.
* A cash out tax rate of `x` where 0 < `x` < 1 will leave some assets in the project's balance to share between those who wait longer to cash out. The larger the `x`, the fewer assets can be reclaimed (*see note below*).
* Cash outs incur the JBX membership fee of 2.5% when the cash out tax rate is greater than 0%.

<details>

<summary>Cash out when the tax is 0 &lt; x &lt; 100</summary>

With a cash out tax rate of 0.5, a holder with 10% of the token supply can cash out their tokens for *slightly more* than 50% of the project's available assets.

The other ~5% will remain in the project's balance, thereby increasing the cash out value of everyone else's tokens by increasing the ratio of assets to tokens. This encourages holders to cash out later than others – the first holders to cash out will receive the fewest assets in return.

The reason that slightly more than 5% of assets would be returned: a cash out tax rate of 0 < `x` < 1 allows for cash outs along a *bonding curve*. Specifically, the formula is:

![](/img/misc/redemption-formula.png)

Where:

- **r** is the cash out tax rate (from 0 to 1),
- **o** is the *surplus*, or the funds not being paid out from the project's balance during that ruleset,
- **s** is the current token supply, and
- **x** is the amount of tokens being cashed out.

Here is an example bonding curve with a surplus of 100 ETH, a total supply of 200 tokens, and a cash out tax rate of 0.71. The X axis represents the number of tokens being cashed out, and the Y axis represents the ETH that would be returned. You can try [editing the variables yourself](https://www.desmos.com/calculator/ygmmje1s2l).

<iframe src="https://www.desmos.com/calculator/ygmmje1s2l" width="500" height="500"></iframe>

</details>

#### What you'll want to know if you're building

* Token holders can cash out their tokens by calling [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/dev/v4/api/core/JBMultiTerminal.md#cashouttokensof).
* A cash out tax rate can be specified in a ruleset through the [`JBController4_1.launchProjectFor(...)`](/docs/dev/v4/api/core/JBController.md#launchprojectfor) or [`JBController4_1.queueRulesetsOf(...)`](/docs/dev/v4/api/core/JBController.md#queuerulesetsof) transactions.

