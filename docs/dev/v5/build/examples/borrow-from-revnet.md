---
sidebar_position: 4
---

# Borrowing from a revnet

If you know the ID of the revnet you want to borrow from, the address of the [`REVLoans`](/docs/dev/v5/api/revloans/REVLoans.md) contract, and have tokens to use as collateral, you can borrow funds from the revnet. 

You can borrow from a revnet by calling [`REVLoans.borrowFrom(...)`](/docs/dev/v5/api/revloans/REVLoans.md#borrowfrom).

```javascript
function borrowFrom(
    uint256 revnetId,
    REVLoanSource calldata source,
    uint256 minBorrowAmount,
    uint256 collateralCount,
    address payable beneficiary,
    uint256 prepaidFeePercent
)
    external
    override
    returns (uint256 loanId, REVLoan memory)
```

Here's a complete example of how to borrow from a revnet:

*   For `revnetId` send the ID of the revnet to borrow from:

    ```javascript
    Example:

    123
    ```

*   For `source` send a [`REVLoanSource`](/docs/dev/v5/api/revloans/structs/REVLoanSource.md):

    ```javascript
    Example:

    {
        token: 0x000000000000000000000000000000000000EEEe, // The token to borrow. NATIVE_TOKEN is shown here.
        terminal: <address of JBMultiTerminal> // The terminal that the loan is being made from.
    }
    ```

*   For `minBorrowAmount` send the minimum amount you expect to borrow, denominated in the token of the source's accounting context:

    ```javascript
    Example:

    1_000_000_000_000_000_000 // 1 ETH minimum borrow amount (18 decimals)
    ```

*   For `collateralCount` send the amount of revnet tokens to use as collateral:

    ```javascript
    Example:

    100_000_000_000_000_000_000 // 100 revnet tokens as collateral (18 decimals)
    ```

*   For `beneficiary` send the address that will receive the borrowed funds and any tokens resulting from fee payments, and receive the NFT representing the loan position:

    ```javascript
    Example:

    0x0123456789012345678901234567890123456789
    ```

*   For `prepaidFeePercent` send the fee percent that will be charged upfront from the revnet being borrowed from (2.5% to 50%):

    ```javascript
    Example:

    25 // 2.5% prepaid fee (minimum required)
    ```

## Fee Structure

When borrowing from a revnet, multiple fees are applied:

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

## Complete Example

Here's a complete example of borrowing from a revnet:

```json
{
  revnetId: 123, // The ID of the revnet to borrow from
  source: {
    token: 0x000000000000000000000000000000000000EEEe, // ETH token
    terminal: "0x1234567890123456789012345678901234567890" // JBMultiTerminal address
  },
  minBorrowAmount: 1_000_000_000_000_000_000, // 1 ETH minimum
  collateralCount: 100_000_000_000_000_000_000, // 100 revnet tokens
  beneficiary: "0x0123456789012345678901234567890123456789", // Beneficiary address
  prepaidFeePercent: 25 // 2.5% prepaid fee (minimum)
}
```

## Managing Your Loan

Once you have a loan, you can:

* **Repay the loan** by calling [`REVLoans.repayLoan(...)`](/docs/dev/v5/api/revloans/REVLoans.md#repayloan)
* **Refinance the loan** by calling [`REVLoans.reallocateCollateralFromLoan(...)`](/docs/dev/v5/api/revloans/REVLoans.md#reallocatecollateralfromloan)
* **Check loan details** by calling [`REVLoans.loanOf(...)`](/docs/dev/v5/api/revloans/REVLoans.md#loanofloanid)

Each loan is represented as an ERC-721 NFT, allowing for easy tracking and transfer of loan ownership.

## Repaying a loan

When you repay a loan, you can choose to pay off the entire loan or just a portion of it. You can also choose to return some or all of your collateral. If you don't repay the full amount, a new loan will be created with the remaining balance and collateral.

The repayment amount includes any additional fees that have accumulated since the prepaid duration expired.

You can repay a loan by calling [`REVLoans.repayLoan(...)`](/docs/dev/v5/api/revloans/REVLoans.md#repayloan).

```javascript
function repayLoan(
    uint256 loanId,
    uint256 maxRepayBorrowAmount,
    uint256 collateralCountToReturn,
    address payable beneficiary,
    JBSingleAllowance calldata allowance
)
    external
    payable
    override
    returns (uint256 paidOffLoanId, REVLoan memory paidOffloan)
```

Here's a complete example of how to repay a loan:

```json
{
  loanId: 1234567890123456789012345678901234567890, // The ID of the loan to repay
  maxRepayBorrowAmount: 1_100_000_000_000_000_000, // 1.1 ETH maximum repay amount (includes fees)
  collateralCountToReturn: 50_000_000_000_000_000_000, // Return 50 revnet tokens as collateral
  beneficiary: "0x0123456789012345678901234567890123456789", // Address receiving returned collateral
  allowance: {
    amount: 0, // No permit2 allowance needed for ETH
    expiration: 0,
    nonce: 0,
    sigDeadline: 0,
    signature: "0x"
  }
}
```

## Refinancing a loan

Refinancing allows you to extract value from a loan when your collateral has increased in value since the loan was created. This is useful when the revnet's token cash out value has gone up, making your collateral worth more than when you originally borrowed.

When you refinance, you can transfer some of your collateral from the existing loan to create a new loan with better terms. The original loan will be burned and replaced with a reallocated loan that has reduced collateral. The transferred collateral (plus any additional collateral you add) will be used to create a completely new loan.

This process creates two new loans: one with the remaining collateral from the original loan, and one with the transferred collateral. Both loans will have the same creation timestamp and prepaid fee settings as the original loan.

You can refinance a loan by calling [`REVLoans.reallocateCollateralFromLoan(...)`](/docs/dev/v5/api/revloans/REVLoans.md#reallocatecollateralfromloan).

```javascript
function reallocateCollateralFromLoan(
    uint256 loanId,
    uint256 collateralCountToTransfer,
    REVLoanSource calldata source,
    uint256 minBorrowAmount,
    uint256 collateralCountToAdd,
    address payable beneficiary,
    uint256 prepaidFeePercent
)
    external
    payable
    override
    returns (uint256 reallocatedLoanId, uint256 newLoanId, REVLoan memory reallocatedLoan, REVLoan memory newLoan)
```

Here's a complete example of how to refinance a loan:

```json
{
  loanId: 1234567890123456789012345678901234567890, // The ID of the loan to refinance
  collateralCountToTransfer: 30_000_000_000_000_000_000, // Transfer 30 revnet tokens to new loan
  source: {
    token: 0x000000000000000000000000000000000000EEEe, // ETH token
    terminal: "0x1234567890123456789012345678901234567890" // JBMultiTerminal address
  },
  minBorrowAmount: 500_000_000_000_000_000, // 0.5 ETH minimum for new loan
  collateralCountToAdd: 20_000_000_000_000_000_000, // Add 20 more revnet tokens
  beneficiary: "0x0123456789012345678901234567890123456789", // Beneficiary address
  prepaidFeePercent: 50 // 5% prepaid fee for new loan
}
```
