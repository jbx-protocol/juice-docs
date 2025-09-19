# JBClaim
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBClaim.sol)

**Notes:**
- member: token The token to claim.

- member: leaf The leaf to claim from.

- member: proof The proof to claim with. Must be of length `JBSucker._TREE_DEPTH`.


```solidity
struct JBClaim {
    address token;
    JBLeaf leaf;
    bytes32[32] proof;
}
```

