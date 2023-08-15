# JBLaunchFundingCyclesData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/structs/JBLaunchFundingCyclesData.sol)

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
