# FundingCycleProperties

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IFundingCycles.sol)

```solidity
struct FundingCycleProperties {
    uint256 target;
    uint256 currency;
    uint256 duration;
    uint256 cycleLimit;
    uint256 discountRate;
    IFundingCycleBallot ballot;
}
```

