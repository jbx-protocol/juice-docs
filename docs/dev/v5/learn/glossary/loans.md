# Loans

#### What everyone needs to know

* Revnet loans allow token holders to borrow against their tokens as collateral while maintaining their ownership stake in the revnet.
* The borrowable amount is calculated using the same formula as cash outs, but with the loan collateral added to the total token supply and the amount loaned out added to the surplus. This means new loans are made assuming all current outstanding loans will be paid back, in effect not favoring future borrowers over previous borrowers with all else equal.
* Loans include multiple fees: a 2.5% NANA fee from the juicebox protocol, a 1% REV fee from the revnet protocol, and a variable source fee from the revnet being borrowed from that can be prepaid.
* The more you prepay in fees upfront, the longer you can hold the loan without additional charges.
* After the prepaid duration expires, additional fees accumulate over time until the loan reaches its 10-year liquidation limit.
* Collateral tokens are burned when creating a loan and reminted when the loan is repaid, keeping the revnet's token structure orderly.

#### How loans work relative to cash outs

Revnet loans use the same underlying mechanism as cash outs but with an important modification. When calculating the borrowable amount, the loan collateral is added to the total token supply:

```
borrowableAmount = cashOutFrom(
    surplus: totalSurplus + totalBorrowed,
    cashOutCount: collateralCount,
    totalSupply: totalSupply + totalCollateral,
    cashOutTaxRate: currentStage.cashOutTaxRate()
)
```

This means:
- The more collateral you provide, the more you can borrow.
- The borrowable amount is proportional to your collateral relative to the total supply (including other loan collateral).
- The cash out tax rate still applies, meaning loans benefit the value of the revnet's token.

#### How loan fees work

Revnet loans have a multi-layered fee structure:

**Upfront fees (taken when loan is created):**
- **Protocol fee**: 2.5% $NANA fee charged by the underlying Juicebox protocol
- **REV fee**: 1% charged by the $REV revnet
- **Source fee**: Variable amount (prepayable from 2.5% to 50%) chosen by the borrower

**Prepaid duration calculation:**
The prepaid fee percent determines how long you can hold the loan without additional fees:

```
prepaidDuration = (prepaidFeePercent / MAX_PREPAID_FEE_PERCENT) × LOAN_LIQUIDATION_DURATION
```

Where:
- `MAX_PREPAID_FEE_PERCENT = 500` (50%)
- `LOAN_LIQUIDATION_DURATION = 3650 days` (10 years)

**Examples:**
- Pay 2.5% upfront → 0.5 years (6 months) prepaid duration. This is the minimum required upfront fee to the source revnet.
- Pay 25% upfront → 5 years prepaid duration  
- Pay 50% upfront → 10 years prepaid duration

**Additional fees after prepaid duration:**
If you don't repay within the prepaid duration, additional source fees accumulate:

```
additionalFee = (timeSinceLoanCreated - prepaidDuration) / (LOAN_LIQUIDATION_DURATION - prepaidDuration) × (loanAmount - prepaidAmount)
```

This means:
- After 10 years, the total cost reaches 100% of the loan amount
- The loan becomes liquidated and collateral cannot be recovered
- The more you prepay upfront, the longer you have before additional fees start accumulating

#### What you'll want to know if you're building

* Loans are created by calling [`REVLoans.borrowFrom(...)`](/docs/dev/v5/api/revnet/REVLoans.md#borrowfrom).
* Loans can be repaid or adjusted by calling [`REVLoans.repayLoan(...)`](/docs/dev/v5/api/revnet/REVLoans.md#repayloan).
* Each loan is represented as an ERC-721 NFT, allowing for easy tracking and transfer.
* Loans can be refinanced by calling [`REVLoans.reallocateCollateralFromLoan(...)`](/docs/dev/v5/api/revnet/REVLoans.md#reallocatecollateralfromloan).
* Expired loans can be liquidated by calling [`REVLoans.liquidateExpiredLoansFrom(...)`](/docs/dev/v5/api/revnet/REVLoans.md#liquidateexpiredloansfrom).
