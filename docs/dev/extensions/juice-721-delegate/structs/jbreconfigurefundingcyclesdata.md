# JBReconfigureFundingCyclesData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/structs/JBReconfigureFundingCyclesData.sol)

```solidity
struct JBReconfigureFundingCyclesData {
    JBFundingCycleData data;
    JBPayDataSourceFundingCycleMetadata metadata;
    uint256 mustStartAtOrAfter;
    JBGroupedSplits[] groupedSplits;
    JBFundAccessConstraints[] fundAccessConstraints;
    string memo;
}
```

