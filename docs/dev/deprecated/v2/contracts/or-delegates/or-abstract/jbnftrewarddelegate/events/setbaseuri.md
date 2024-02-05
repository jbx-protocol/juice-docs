# SetBaseUri

Emitted from:

* [`setBaseUri`](/dev/deprecated/v2/contracts/or-delegates/or-abstract/jbnftrewarddelegate/write/setbaseuri.md)

#### Definition

```
event SetBaseUri(string indexed baseUri, address caller);
```

* `baseUri` is the base URI to use for tokens if a URI resolver isn't provided.
* `caller` is the address that issued the transaction within which the event was emitted.
