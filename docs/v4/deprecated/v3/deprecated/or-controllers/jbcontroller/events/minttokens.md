# MintTokens

Emitted from:

* [`mintTokensOf`](/docs/v4/deprecated/v3/deprecated/or-controllers/jbcontroller/write/minttokensof.md)

#### Definition

```
event MintTokens(
  address indexed beneficiary,
  uint256 indexed projectId,
  uint256 tokenCount,
  uint256 beneficiaryTokenCount,
  string memo,
  uint256 reservedRate,
  address caller
);
```

* `beneficiary` is the address to which the tokens were minted.
* `projectId` is the ID of the token's project.
* `tokenCount` is the number of tokens that were minted in total, counting however many were reserved.
* `beneficiaryTokenCount` is the number of tokens that were minted for the beneficiary.
* `memo` is a note that was attached.
* `reservedRate` is the project's current reserved rate.
* `caller` is the address that issued the transaction within which the event was emitted.
