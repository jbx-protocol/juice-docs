# JBBeforePayRecordedContext
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBBeforePayRecordedContext.sol)

Context sent from the terminal to the ruleset's data hook upon payment.

**Notes:**
- member: terminal The terminal that is facilitating the payment.

- member: payer The address that the payment originated from.

- member: amount The payment's token amount, including the token being paid, the value, the number of decimals
included, and the currency of the amount.

- member: projectId The ID of the project being paid.

- member: rulesetId The ID of the ruleset the payment is being made during.

- member: beneficiary The specified address that should be the beneficiary of anything that this payment
yields.

- member: weight The weight of the ruleset during which the payment is being made.

- member: reservedPercent The reserved percent of the ruleset the payment is being made during.

- member: metadata Extra data specified by the payer.


```solidity
struct JBBeforePayRecordedContext {
    address terminal;
    address payer;
    JBTokenAmount amount;
    uint256 projectId;
    uint256 rulesetId;
    address beneficiary;
    uint256 weight;
    uint256 reservedPercent;
    bytes metadata;
}
```

