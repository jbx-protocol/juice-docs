# JBDidRedeemData3_1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d45af6f3e4786ae53b9c9248af7f5f8ee832bece/contracts/structs/JBDidRedeemData3_1_1.sol)

```solidity
struct JBDidRedeemData3_1_1 {
    address holder;
    uint256 projectId;
    uint256 currentFundingCycleConfiguration;
    uint256 projectTokenCount;
    JBTokenAmount reclaimedAmount;
    JBTokenAmount forwardedAmount;
    address payable beneficiary;
    string memo;
    bytes dataSourceMetadata;
    bytes redeemerMetadata;
}
```

