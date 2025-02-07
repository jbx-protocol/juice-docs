# JBOutboxTree
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBOutboxTree.sol)

A merkle tree used to track the outbox for a given token in a `JBSucker`.

*The outbox is used to send from the local chain to the remote chain.*

**Notes:**
- member: nonce The nonce of the outbox.

- member: balance The balance of the outbox.

- member: tree The merkle tree.

- member: numberOfClaimsSent the number of claims that have been sent to the peer. Used to determine which
claims have been sent.


```solidity
struct JBOutboxTree {
    uint64 nonce;
    uint256 balance;
    MerkleLib.Tree tree;
    uint256 numberOfClaimsSent;
}
```

