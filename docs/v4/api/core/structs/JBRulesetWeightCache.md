# JBRulesetWeightCache
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBRulesetWeightCache.sol)

**Notes:**
- member: weight The cached weight value.

- member: weightCutMultiple The weight cut multiple that produces the given weight.


```solidity
struct JBRulesetWeightCache {
    uint112 weight;
    uint168 weightCutMultiple;
}
```

