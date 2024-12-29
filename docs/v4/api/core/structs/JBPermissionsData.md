# JBPermissionsData
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBPermissionsData.sol)

**Notes:**
- member: operator The address that permissions are being given to.

- member: projectId The ID of the project the operator is being given permissions for. Operators only have
permissions under this project's scope. An ID of 0 is a wildcard, which gives an operator permissions across all
projects.

- member: permissionIds The IDs of the permissions being given. See the `JBPermissionIds` library.


```solidity
struct JBPermissionsData {
    address operator;
    uint56 projectId;
    uint8[] permissionIds;
}
```

