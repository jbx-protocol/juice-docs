# JBBuybackHookRegistry
[Git Source](https://github.com/Bananapus/nana-buyback-hook-v5/blob/0ff73aee4ae7a3a75f75129bcf8bbef59b4c3bb1/src/JBBuybackHookRegistry.sol)

**Inherits:**
[IJBBuybackHookRegistry](/docs/dev/v5/api/buyback-hook/interfaces/IJBBuybackHookRegistry.md), ERC2771Context, JBPermissioned, Ownable


## State Variables
### PROJECTS
The project registry.


```solidity
IJBProjects public immutable override PROJECTS;
```


### defaultHook
The default hook to use.


```solidity
IJBRulesetDataHook public override defaultHook;
```


### hasLockedHook
Whether the hook for the given project is locked.


```solidity
mapping(uint256 projectId => bool) public override hasLockedHook;
```


### hookOf
The hook for the given project.


```solidity
mapping(uint256 projectId => IJBRulesetDataHook) public override hookOf;
```


### isHookAllowed
The address of each project's token.


```solidity
mapping(IJBRulesetDataHook hook => bool) public override isHookAllowed;
```


## Functions
### constructor


```solidity
constructor(
    IJBPermissions permissions,
    IJBProjects projects,
    address owner,
    address trustedForwarder
)
    JBPermissioned(permissions)
    ERC2771Context(trustedForwarder)
    Ownable(owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`IJBPermissions`|The permissions contract.|
|`projects`|`IJBProjects`|The project registry.|
|`owner`|`address`|The owner of the contract.|
|`trustedForwarder`|`address`|A trusted forwarder of transactions to this contract.|


### beforePayRecordedWith

Forward the call to the hook for the project.


```solidity
function beforePayRecordedWith(JBBeforePayRecordedContext calldata context)
    external
    view
    override
    returns (uint256 weight, JBPayHookSpecification[] memory hookSpecifications);
```

### beforeCashOutRecordedWith

To fulfill the `IJBRulesetDataHook` interface.

*Pass cash out context back to the terminal without changes.*


```solidity
function beforeCashOutRecordedWith(JBBeforeCashOutRecordedContext calldata context)
    external
    pure
    override
    returns (uint256, uint256, uint256, JBCashOutHookSpecification[] memory hookSpecifications);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBBeforeCashOutRecordedContext`|The cash out context passed in by the terminal.|


### hasMintPermissionFor

Make sure the hook has mint permission.


```solidity
function hasMintPermissionFor(
    uint256 projectId,
    JBRuleset memory,
    address addr
)
    external
    view
    override
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to check the mint permission for.|
|`<none>`|`JBRuleset`||
|`addr`|`address`|The address to check the mint permission for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the address has mint permission.|


### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public pure override returns (bool);
```

### _contextSuffixLength

*`ERC-2771` specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view override(ERC2771Context, Context) returns (uint256);
```

### _msgData

The calldata. Preferred to use over `msg.data`.


```solidity
function _msgData() internal view override(ERC2771Context, Context) returns (bytes calldata);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|calldata The `msg.data` of this call.|


### _msgSender

The message's sender. Preferred to use over `msg.sender`.


```solidity
function _msgSender() internal view override(ERC2771Context, Context) returns (address sender);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address which sent this call.|


### allowHook

Allow a hook.

*Only the owner can allow a hook.*


```solidity
function allowHook(IJBRulesetDataHook hook) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`IJBRulesetDataHook`|The hook to allow.|


### disallowHook

Disallow a hook.

*Only the owner can disallow a hook.*


```solidity
function disallowHook(IJBRulesetDataHook hook) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`IJBRulesetDataHook`|The hook to disallow.|


### lockHookFor

Lock a hook for a project.

*Only the project's owner or an address with the `JBPermissionIds.SET_BUYBACK_POOL` permission from the
owner can lock a hook for a project.*


```solidity
function lockHookFor(uint256 projectId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to lock the hook for.|


### setDefaultHook

Set the default hook.

*Only the owner can set the default hook.*


```solidity
function setDefaultHook(IJBRulesetDataHook hook) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`IJBRulesetDataHook`|The hook to set as the default.|


### setHookFor

Set the hook for a project.

*Only the project's owner or an address with the `JBPermissionIds.SET_BUYBACK_POOL` permission from the
owner can set the hook for a project.*


```solidity
function setHookFor(uint256 projectId, IJBRulesetDataHook hook) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the hook for.|
|`hook`|`IJBRulesetDataHook`|The hook to set for the project.|


## Errors
### JBBuybackHookRegistry_HookLocked

```solidity
error JBBuybackHookRegistry_HookLocked(uint256 projectId);
```

### JBBuybackHookRegistry_HookNotAllowed

```solidity
error JBBuybackHookRegistry_HookNotAllowed(IJBRulesetDataHook hook);
```

### JBBuybackHookRegistry_HookNotSet

```solidity
error JBBuybackHookRegistry_HookNotSet(uint256 projectId);
```

