# JBStored721Tier
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JBStored721Tier.sol)

**Notes:**
- member: price The price to buy an NFT in this tier, in terms of the currency in its `JBInitTiersConfig`.

- member: remainingSupply The remaining number of NFTs which can be minted from this tier.

- member: initialSupply The total number of NFTs which can be minted from this tier.

- member: votingUnits The number of votes that each NFT in this tier gets.

- member: category The category that NFTs in this tier belongs to. Used to group NFT tiers.

- member: discountPercent The discount that should be applied to the tier.

- member: reserveFrequency The frequency at which an extra NFT is minted for the `reserveBeneficiary` from this
tier. With a `reserveFrequency` of 5, an extra NFT will be minted for the `reserveBeneficiary` for every 5 NFTs
purchased.

- member: allowOwnerMint A boolean indicating whether the contract's owner can mint NFTs from this tier
on-demand.

- member: transfersPausable A boolean indicating whether transfers for NFTs in tier can be paused.

- member: useVotingUnits A boolean indicating whether the `votingUnits` should be used to calculate voting
power. If `useVotingUnits` is false, voting power is based on the tier's price.


```solidity
struct JBStored721Tier {
    uint104 price;
    uint32 remainingSupply;
    uint32 initialSupply;
    uint32 votingUnits;
    uint24 category;
    uint8 discountPercent;
    uint16 reserveFrequency;
    uint8 packedBools;
}
```

