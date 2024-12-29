# JBAfterPayRecordedContext
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBAfterPayRecordedContext.sol)

**Notes:**
- member: payer The address the payment originated from.

- member: projectId The ID of the project being paid.

- member: rulesetId The ID of the ruleset the payment is being made during.

- member: amount The payment's token amount. Includes the token being paid, the value, the number of decimals
included, and the currency of the amount.

- member: forwardedAmount The token amount being forwarded to the pay hook. Includes the token
being paid, the value, the number of decimals included, and the currency of the amount.

- member: weight The current ruleset's weight (used to determine how many tokens should be minted).

- member: newlyIssuedTokenCount The number of project tokens minted for the beneficiary.

- member: beneficiary The address which receives any tokens this payment yields.

- member: hookMetadata Extra data specified by the data hook, which is sent to the pay hook.

- member: payerMetadata Extra data specified by the payer, which is sent to the pay hook.


```solidity
struct JBAfterPayRecordedContext {
    address payer;
    uint256 projectId;
    uint256 rulesetId;
    JBTokenAmount amount;
    JBTokenAmount forwardedAmount;
    uint256 weight;
    uint256 newlyIssuedTokenCount;
    address beneficiary;
    bytes hookMetadata;
    bytes payerMetadata;
}
```

