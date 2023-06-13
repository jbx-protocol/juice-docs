# JBLaunchProjectData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/42d3a6d91f96ac82ae443fb9b5a22dd1ff8d398e/contracts/structs/JBLaunchProjectData.sol)

```solidity
struct JBLaunchProjectData {
    JBProjectMetadata projectMetadata;
    JBFundingCycleData data;
    JBPayDataSourceFundingCycleMetadata metadata;
    uint256 mustStartAtOrAfter;
    JBGroupedSplits[] groupedSplits;
    JBFundAccessConstraints[] fundAccessConstraints;
    IJBPaymentTerminal[] terminals;
    string memo;
}
```

