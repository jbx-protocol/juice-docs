# FundingCycleMetadata2

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/ITerminalV1_1.sol)

```solidity
struct FundingCycleMetadata2 {
    uint256 reservedRate;
    uint256 bondingCurveRate;
    uint256 reconfigurationBondingCurveRate;
    bool payIsPaused;
    bool ticketPrintingIsAllowed;
    ITreasuryExtension treasuryExtension;
}
```

