# IJBSplits
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBSplits.sol)


## Functions
### FALLBACK_RULESET_ID


```solidity
function FALLBACK_RULESET_ID() external view returns (uint256);
```

### splitsOf


```solidity
function splitsOf(uint256 projectId, uint256 rulesetId, uint256 groupId) external view returns (JBSplit[] memory);
```

### setSplitGroupsOf


```solidity
function setSplitGroupsOf(uint256 projectId, uint256 rulesetId, JBSplitGroup[] memory splitGroups) external;
```

## Events
### SetSplit

```solidity
event SetSplit(
    uint256 indexed projectId, uint256 indexed rulesetId, uint256 indexed groupId, JBSplit split, address caller
);
```

