# CTPost
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/structs/CTPost.sol)

A post to be published.

**Notes:**
- member: encodedIPFSUri The encoded IPFS URI of the post that is being published.

- member: totalSupply The number of NFTs that should be made available, including the 1 that will be minted
alongside this transaction.

- member: price The price being paid for buying the post that is being published.

- member: category The category that the post should be published in.


```solidity
struct CTPost {
    bytes32 encodedIPFSUri;
    uint32 totalSupply;
    uint104 price;
    uint24 category;
}
```

