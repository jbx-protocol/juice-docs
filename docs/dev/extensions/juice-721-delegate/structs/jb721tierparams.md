# JB721TierParams

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/structs/JB721TierParams.sol)

```solidity
struct JB721TierParams {
    uint80 contributionFloor;
    uint48 lockedUntil;
    uint40 initialQuantity;
    uint16 votingUnits;
    uint16 reservedRate;
    address reservedTokenBeneficiary;
    uint8 royaltyRate;
    address royaltyBeneficiary;
    bytes32 encodedIPFSUri;
    uint8 category;
    bool allowManualMint;
    bool shouldUseReservedTokenBeneficiaryAsDefault;
    bool shouldUseRoyaltyBeneficiaryAsDefault;
    bool transfersPausable;
}
```

