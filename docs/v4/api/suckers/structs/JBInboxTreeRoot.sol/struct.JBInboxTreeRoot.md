# JBInboxTreeRoot
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBInboxTreeRoot.sol)

The root of an inbox tree for a given token in a `JBSucker`.

*Inbox trees are used to receive from the remote chain to the local chain. Tokens can be `claim`ed from the
inbox tree.*

**Notes:**
- member: nonce Tracks the nonce of the tree. The nonce cannot decrease.

- member: root The root of the tree.


```solidity
struct JBInboxTreeRoot {
    uint64 nonce;
    bytes32 root;
}
```

