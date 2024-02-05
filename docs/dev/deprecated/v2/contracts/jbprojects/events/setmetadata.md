# SetMetadata

Emitted from:

* [`setMetadataOf`](/dev/deprecated/v2/contracts/jbprojects/write/setmetadataof.md)

#### Definition

```
event SetMetadata(uint256 indexed projectId, JBProjectMetadata metadata, address caller);
```

* `projectId` is the token ID of the NFT (ERC-721) that represents the project who's URI was set.
* `metadata` is the metadata that that was associated with the project upon its creation. It can be found using the [`metadataContentOf`](/dev/deprecated/v2/contracts/jbprojects/properties/metadatacontentof.md) property.
* `caller` is the address that issued the transaction within which the event was emitted.
