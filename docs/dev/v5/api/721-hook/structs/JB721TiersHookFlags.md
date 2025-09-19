# JB721TiersHookFlags
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JB721TiersHookFlags.sol)

**Notes:**
- member: noNewTiersWithReserves A boolean indicating whether attempts to add new tiers with a non-zero
`reserveFrequency` will revert.

- member: noNewTiersWithVotes A boolean indicating whether attempts to add new tiers with non-zero
`votingUnits` will revert.

- member: noNewTiersWithOwnerMinting A boolean indicating whether attempts to add new tiers with
`allowOwnerMint` set to true will revert.

- member: preventOverspending A boolean indicating whether payments attempting to spend more than the price of
the NFTs being minted will revert.


```solidity
struct JB721TiersHookFlags {
    bool noNewTiersWithReserves;
    bool noNewTiersWithVotes;
    bool noNewTiersWithOwnerMinting;
    bool preventOverspending;
}
```

