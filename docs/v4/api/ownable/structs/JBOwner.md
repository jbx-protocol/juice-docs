# JBOwner
[Git Source](https://github.com/Bananapus/nana-ownable/blob/a74b3181e75adaf0ee0c93cb00bcc5709ca8f314/src/struct/JBOwner.sol)

Owner information for a given instance of `JBOwnableOverrides`.

**Notes:**
- member: owner If `projectId` is 0, this address has owner access.

- member: projectId The owner of the `JBProjects` ERC-721 with this ID has owner access. If this is 0, the
`owner` address has owner access.

- member: permissionId The permission ID which corresponds to owner access. See `JBPermissions` in `nana-core`
and `nana-permission-ids`.


```solidity
struct JBOwner {
    address owner;
    uint88 projectId;
    uint8 permissionId;
}
```

