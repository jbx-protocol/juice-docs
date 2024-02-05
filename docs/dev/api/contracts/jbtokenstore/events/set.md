# Set

Emitted from:

* [`setfor`](/dev/api/contracts/jbtokenstore/write/setfor.md)

#### Definition

```
event Set(uint256 indexed projectId, IJBToken indexed newToken, address caller);
```

* `projectId` is the ID of the project to which the set token should be used for.
* `newToken` is the new token that is being used by the project.
* `caller` is the address that issued the transaction within which the event was emitted.
