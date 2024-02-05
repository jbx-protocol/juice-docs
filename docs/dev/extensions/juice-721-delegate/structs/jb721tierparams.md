# JB721TierParams

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/structs/JB721TierParams.sol)

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
