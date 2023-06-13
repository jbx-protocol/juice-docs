# JBOwnableOverrides

[Git Source](https://github.com/jbx-protocol/juice-ownable/blob/b2f98133c7bea013db967e8a204ce0d9cc06d21f/src/JBOwnableOverrides.sol)

Inherits: [`Context`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Context.sol), [`IJBOwnable`](/docs/dev/extensions/juice-ownable/interfaces/ijbownable.md), [`IJBOperatable`](/docs/dev/api/interfaces/ijboperatable.md)

Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions and can grant other users permission to those functions. This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner or an approved address. Supports meta-transactions.

## State Variables

### operatorStore

A contract storing operator assignments.

```solidity
IJBOperatorStore public immutable operatorStore;
```

### projects

The IJBProjects to use to get the owner of a project.

```solidity
IJBProjects public immutable projects;
```

### jbOwner

The JBOwner information.

```solidity
JBOwner public override jbOwner;
```

## Functions

### constructor

```solidity
constructor(IJBProjects _projects, IJBOperatorStore _operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IJBProjects`](/docs/dev/api/interfaces/ijbprojects.md)|the JBProjects to use to get the owner of the project|
|`_operatorStore`|[`IJBOperatorStore`](/docs/dev/api/interfaces/ijboperatorstore.md)|the operatorStore to use for the permissions|

### requirePermission

Only allows the speficied account or an operator of the account to proceed.

```solidity
modifier requirePermission(address _account, uint256 _domain, uint256 _permissionIndex);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to check for.|
|`_domain`|`uint256`|The domain namespace to look for an operator within.|
|`_permissionIndex`|`uint256`|The index of the permission to check for.|

### requirePermissionFromProject

Only allows callers that have received permission from the projectOwner for this project.

*If the owner is not a project then this will always revert*

```solidity
modifier requirePermissionFromProject(uint256 _permissionIndex);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_permissionIndex`|`uint256`|The index of the permission to check for.|

### requirePermissionAllowingOverride

Only allows the speficied account, an operator of the account to proceed, or a truthy override flag.

```solidity
modifier requirePermissionAllowingOverride(address _account, uint256 _domain, uint256 _permissionIndex, bool _override);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to check for.|
|`_domain`|`uint256`|The domain namespace to look for an operator within.|
|`_permissionIndex`|`uint256`|The index of the permission to check for.|
|`_override`|`bool`|A condition to force allowance for.|

### owner

Returns the address of the current project owner.

```solidity
function owner() public view virtual returns (address);
```

### renounceOwnership

Leaves the contract without owner. It will not be possible to call `onlyOwner`/`_checkOwner` functions anymore. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

```solidity
function renounceOwnership() public virtual;
```

### transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.

```solidity
function transferOwnership(address _newOwner) public virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newOwner`|`address`|the static address that should receive ownership|

### transferOwnershipToProject

Transfer ownership of the contract to a (Juicebox) project.

*ProjectID is limited to a uint88*

```solidity
function transferOwnershipToProject(uint256 _projectId) public virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|the project that should receive ownership|

### setPermissionIndex

Sets the permission index that allows other callers to perform operations on behave of the project owner.

```solidity
function setPermissionIndex(uint8 _permissionIndex) public virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_permissionIndex`|`uint8`|the permissionIndex to use for 'onlyOwner' calls|

### _setPermissionIndex

Sets the permission index that allows other callers to perform operations on behave of the project owner.

Internal function without access restriction.

```solidity
function _setPermissionIndex(uint8 _permissionIndex) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_permissionIndex`|`uint8`|the permissionIndex to use for 'onlyOwner' calls|

### _transferOwnership

*helper to allow for drop-in replacement of OZ*

```solidity
function _transferOwnership(address _newOwner) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newOwner`|`address`|the static address that should become the owner of this contract|

### _transferOwnership

Transfers ownership of the contract to a new account (`_newOwner`) OR a project (`_projectID`).

Internal function without access restriction.

```solidity
function _transferOwnership(address _newOwner, uint88 _projectId) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newOwner`|`address`|the static owner address that should receive ownership|
|`_projectId`|`uint88`|the projectId this contract should follow ownership of|

### _checkOwner

*Throws if the sender is not the owner.*

```solidity
function _checkOwner() internal view virtual;
```

### _requirePermission

*Require the message sender is either the account or has the specified permission.*

```solidity
function _requirePermission(address _account, uint256 _domain, uint256 _permissionIndex) internal view virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to allow.|
|`_domain`|`uint256`|The domain namespace within which the permission index will be checked.|
|`_permissionIndex`|`uint256`|The permission index that an operator must have within the specified domain to be allowed.|

### _requirePermissionAllowingOverride

*Require the message sender is either the account, has the specified permission, or the override condition is true.*

```solidity
function _requirePermissionAllowingOverride(address _account, uint256 _domain, uint256 _permissionIndex, bool _override)
    internal
    view
    virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to allow.|
|`_domain`|`uint256`|The domain namespace within which the permission index will be checked.|
|`_permissionIndex`|`uint256`||
|`_override`|`bool`|The override condition to allow.|

### _emitTransferEvent

```solidity
function _emitTransferEvent(address previousOwner, address newOwner) internal virtual;
```

## Errors

### UNAUTHORIZED

```solidity
error UNAUTHORIZED();
```

### INVALID_NEW_OWNER

```solidity
error INVALID_NEW_OWNER(address ownerAddress, uint256 projectId);
```

