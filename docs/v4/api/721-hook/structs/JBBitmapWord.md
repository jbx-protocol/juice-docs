# JBBitmapWord
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JBBitmapWord.sol)

*A "word" is a 256-bit integer that stores the status of 256 bits (true/false values). Each row of the
`JBBitmap` matrix is a "word".*

**Notes:**
- member: The information stored at the index.

- member: The index.


```solidity
struct JBBitmapWord {
    uint256 currentWord;
    uint256 currentDepth;
}
```

