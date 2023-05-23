# JB721Tier

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/structs/JB721Tier.sol)

```solidity
struct JB721Tier {
    uint256 id;
    uint256 price;
    uint256 remainingQuantity;
    uint256 initialQuantity;
    uint256 votingUnits;
    uint256 reservedRate;
    address reservedTokenBeneficiary;
    bytes32 encodedIPFSUri;
    uint256 category;
    bool allowManualMint;
    bool transfersPausable;
    string resolvedUri;
}
```

