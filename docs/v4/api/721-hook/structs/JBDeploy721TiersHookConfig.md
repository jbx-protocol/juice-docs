# JBDeploy721TiersHookConfig
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/structs/JBDeploy721TiersHookConfig.sol)

**Notes:**
- member: name The NFT collection's name.

- member: symbol The NFT collection's symbol.

- member: baseUri The URI to use as a base for full NFT URIs.

- member: tokenUriResolver The contract responsible for resolving the URI for each NFT.

- member: contractUri The URI where this contract's metadata can be found.

- member: tiersConfig The NFT tiers and pricing config to launch the hook with.

- member: reserveBeneficiary The default reserved beneficiary for all tiers.

- member: flags A set of boolean options to configure the hook with.


```solidity
struct JBDeploy721TiersHookConfig {
    string name;
    string symbol;
    string baseUri;
    IJB721TokenUriResolver tokenUriResolver;
    string contractUri;
    JB721InitTiersConfig tiersConfig;
    address reserveBeneficiary;
    JB721TiersHookFlags flags;
}
```

