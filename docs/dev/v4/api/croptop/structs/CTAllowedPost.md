# CTAllowedPost
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/structs/CTAllowedPost.sol)

Criteria for allowed posts.

**Notes:**
- member: hook The hook to which this allowance applies.

- member: category A category that should allow posts.

- member: minimumPrice The minimum price that a post to the specified category should cost.

- member: minimumTotalSupply The minimum total supply of NFTs that can be made available when minting.

- member: maxTotalSupply The max total supply of NFTs that can be made available when minting. Leave as 0 for
max.

- member: allowedAddresses A list of addresses that are allowed to post on the category through Croptop.


```solidity
struct CTAllowedPost {
    address hook;
    uint24 category;
    uint104 minimumPrice;
    uint32 minimumTotalSupply;
    uint32 maximumTotalSupply;
    address[] allowedAddresses;
}
```

