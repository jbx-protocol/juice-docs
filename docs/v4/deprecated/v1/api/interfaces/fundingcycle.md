# FundingCycle

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IFundingCycles.sol)

The funding cycle structure represents a project stewarded by an address, and accounts for which addresses have helped sustain the project.

```solidity
struct FundingCycle {
    uint256 id;
    uint256 projectId;
    uint256 number;
    uint256 basedOn;
    uint256 configured;
    uint256 cycleLimit;
    uint256 weight;
    IFundingCycleBallot ballot;
    uint256 start;
    uint256 duration;
    uint256 target;
    uint256 currency;
    uint256 fee;
    uint256 discountRate;
    uint256 tapped;
    uint256 metadata;
}
```

