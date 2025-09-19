# JBLeaf
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBLeaf.sol)

A leaf in the inbox or outbox tree of a `JBSucker`. Used to `claim` tokens from the inbox tree.

**Notes:**
- member: index The index of the leaf.

- member: beneficiary The beneficiary of the leaf.

- member: projectTokenCount The number of project tokens to claim.

- member: terminalTokenAmount The amount of terminal tokens to claim.


```solidity
struct JBLeaf {
    uint256 index;
    address beneficiary;
    uint256 projectTokenCount;
    uint256 terminalTokenAmount;
}
```

