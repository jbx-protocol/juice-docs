# JB721Tier
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JB721Tier.sol)

**Notes:**
- member: id The tier's ID.

- member: price The price to buy an NFT in this tier, in terms of the currency in its `JBInitTiersConfig`.

- member: remainingSupply The remaining number of NFTs which can be minted from this tier.

- member: initialSupply The total number of NFTs which can be minted from this tier.

- member: votingUnits The number of votes that each NFT in this tier gets.

- member: reserveFrequency The frequency at which an extra NFT is minted for the `reserveBeneficiary` from this
tier. With a `reserveFrequency` of 5, an extra NFT will be minted for the `reserveBeneficiary` for every 5 NFTs
purchased.

- member: reserveBeneficiary The address which receives any reserve NFTs from this tier.

- member: encodedIPFSUri The IPFS URI to use for each NFT in this tier.

- member: category The category that NFTs in this tier belongs to. Used to group NFT tiers.

- member: discountPercent The discount that should be applied to the tier.

- member: allowOwnerMint A boolean indicating whether the contract's owner can mint NFTs from this tier
on-demand.

- member: cannotBeRemoved A boolean indicating whether attempts to remove this tier will revert.

- member: cannotIncreaseDiscountPercent If the tier cannot have its discount increased.

- member: transfersPausable A boolean indicating whether transfers for NFTs in tier can be paused.

- member: resolvedUri A resolved token URI for NFTs in this tier. Only available if the NFT this tier belongs
to has a resolver.


```solidity
struct JB721Tier {
    uint32 id;
    uint104 price;
    uint32 remainingSupply;
    uint32 initialSupply;
    uint104 votingUnits;
    uint16 reserveFrequency;
    address reserveBeneficiary;
    bytes32 encodedIPFSUri;
    uint24 category;
    uint8 discountPercent;
    bool allowOwnerMint;
    bool transfersPausable;
    bool cannotBeRemoved;
    bool cannotIncreaseDiscountPercent;
    string resolvedUri;
}
```

