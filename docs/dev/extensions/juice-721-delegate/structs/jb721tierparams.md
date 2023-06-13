# JB721TierParams

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/42d3a6d91f96ac82ae443fb9b5a22dd1ff8d398e/contracts/structs/JB721TierParams.sol)

```solidity
struct JB721TierParams {
    uint104 price;
    uint32 initialQuantity;
    uint32 votingUnits;
    uint16 reservedRate;
    address reservedTokenBeneficiary;
    bytes32 encodedIPFSUri;
    uint24 category;
    bool allowManualMint;
    bool shouldUseReservedTokenBeneficiaryAsDefault;
    bool transfersPausable;
    bool useVotingUnits;
}
```

