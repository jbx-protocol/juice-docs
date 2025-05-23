# Issue

Emitted from:

* [`issueFor`](/docs/v4/deprecated/v2/contracts/jbtokenstore/write/issuefor.md)

#### Definition

```
event Issue(
  uint256 indexed projectId,
  IJBToken indexed token,
  string name,
  string symbol,
  address caller
)
```

* `projectId` is the ID of the project to which the issued token belongs.
* `token` is the address of the newly issued token.
* `name` is the name of the token.
* `symbol` is the symbol of the token.
* `caller` is the address that issued the transaction within which the event was emitted.
