# JBPayDataSourceFundingCycleMetadata

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/structs/JBPayDataSourceFundingCycleMetadata.sol)

```solidity
struct JBPayDataSourceFundingCycleMetadata {
    JBGlobalFundingCycleMetadata global;
    uint256 reservedRate;
    uint256 redemptionRate;
    uint256 ballotRedemptionRate;
    bool pausePay;
    bool pauseDistributions;
    bool pauseRedeem;
    bool pauseBurn;
    bool allowMinting;
    bool allowTerminalMigration;
    bool allowControllerMigration;
    bool holdFees;
    bool preferClaimedTokenOverride;
    bool useTotalOverflowForRedemptions;
    bool useDataSourceForRedeem;
    uint256 metadata;
}
```

