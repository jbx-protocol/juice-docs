# JB721TiersRulesetMetadata
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JB721TiersRulesetMetadata.sol)

`JB721TiersHook` options which are packed and stored in the corresponding `JBRulesetMetadata.metadata` on a
per-ruleset basis.

**Notes:**
- member: pauseTransfers A boolean indicating whether NFT transfers are paused during this ruleset.

- member: pauseMintPendingReserves A boolean indicating whether pending/outstanding NFT reserves can be minted
during this ruleset.


```solidity
struct JB721TiersRulesetMetadata {
    bool pauseTransfers;
    bool pauseMintPendingReserves;
}
```

