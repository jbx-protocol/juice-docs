# JBStored721Tier

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/structs/JBStored721Tier.sol)

```solidity
struct JBStored721Tier {
    uint80 contributionFloor;
    uint40 lockedUntil;
    uint40 remainingQuantity;
    uint40 initialQuantity;
    uint16 votingUnits;
    uint16 reservedRate;
    uint8 royaltyRate;
    uint8 category;
    bool allowManualMint;
    bool transfersPausable;
}
```

