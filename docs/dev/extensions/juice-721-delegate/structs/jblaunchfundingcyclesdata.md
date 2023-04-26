# JBLaunchFundingCyclesData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/structs/JBLaunchFundingCyclesData.sol)

```solidity
struct JBLaunchFundingCyclesData {
    JBFundingCycleData data;
    JBPayDataSourceFundingCycleMetadata metadata;
    uint256 mustStartAtOrAfter;
    JBGroupedSplits[] groupedSplits;
    JBFundAccessConstraints[] fundAccessConstraints;
    IJBPaymentTerminal[] terminals;
    string memo;
}
```

