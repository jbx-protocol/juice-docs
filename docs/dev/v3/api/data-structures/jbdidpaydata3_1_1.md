# JBDidPayData3_1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d45af6f3e4786ae53b9c9248af7f5f8ee832bece/contracts/structs/JBDidPayData3_1_1.sol)

```solidity
struct JBDidPayData3_1_1 {
    address payer;
    uint256 projectId;
    uint256 currentFundingCycleConfiguration;
    JBTokenAmount amount;
    JBTokenAmount forwardedAmount;
    uint256 projectTokenCount;
    address beneficiary;
    bool preferClaimedTokens;
    string memo;
    bytes dataSourceMetadata;
    bytes payerMetadata;
}
```

