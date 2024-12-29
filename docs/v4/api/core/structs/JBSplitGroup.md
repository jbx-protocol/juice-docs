# JBSplitGroup
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBSplitGroup.sol)

**Notes:**
- member: groupId An identifier for the group. By convention, this ID is `uint256(uint160(tokenAddress))` for
payouts and `1` for reserved tokens.

- member: splits The splits in the group.


```solidity
struct JBSplitGroup {
    uint256 groupId;
    JBSplit[] splits;
}
```

