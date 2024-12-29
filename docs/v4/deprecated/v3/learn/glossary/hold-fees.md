# Hold fees

#### What everyone needs to know

- By default, JBX membership fees are paid automatically when funds are distributed out of the ecosystem from a project's treasury.[^1]
- During funding cycles configured to hold fees, this fee amount is set aside instead of being immediately processed. Projects can get their held fees returned by adding the same amount of withdrawn funds back to their treasury (using the "Add to Balance" transaction).
- Otherwise, JuiceboxDAO or the project can process these held fees at any point to get JBX at the current rate.
- Processing held fees will pay the fees to [`JuiceboxDAO`](https://juicebox.money/v2/p/1) and mint JBX to the project owner's address.
- Using hold fees allows a project to withdraw funds and later add them back into their Juicebox treasury without incurring fees.
- It applies to both distributions from the distribution limit and from the overflow allowance.

#### What you'll want to know if you're building

- Held fees can be viewed and processed from your project's Tools drawer (click the spanner in top-right of your project's Juicebox page).
- To pay off held fees, you will have to use the "Add to Balance" (also in the Tools drawer) transaction to add the same amount of funds you initially distributed from the treasury.
- For example, if you distributed 1 ETH from the treasury (incurring 0.025 ETH of fees, now in your Held Fees balance), you will have to "Add to Balance" 1 ETH to reset your Held Fees balance.

[^1]: Fees are also incurred when funds are redeemed from a project with a redemption rate less than 100%. The hold fees flag does not apply to those fees.
