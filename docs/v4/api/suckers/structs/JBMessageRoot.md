# JBMessageRoot
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBMessageRoot.sol)

Information about the remote (inbox) tree's root, passed in a message from the remote chain.

**Notes:**
- member: token The address of the terminal token that the tree tracks.

- member: amount The amount of tokens being sent.

- member: remoteRoot The root of the merkle tree.


```solidity
struct JBMessageRoot {
    address token;
    uint256 amount;
    JBInboxTreeRoot remoteRoot;
}
```

