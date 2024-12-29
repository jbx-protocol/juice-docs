# JBOwnable

[Git Source](https://github.com/jbx-protocol/juice-ownable/blob/b2f98133c7bea013db967e8a204ce0d9cc06d21f/src/JBOwnable.sol)

Inherits: [`JBOwnableOverrides`](/docs/v4/deprecated/v3/extensions/juice-ownable/jbownableoverrides.md)

## Functions

### constructor

```solidity
constructor(IJBProjects _projects, IJBOperatorStore _operatorStore) JBOwnableOverrides(_projects, _operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IJBProjects`](/docs/v4/deprecated/v3/api/interfaces/ijbprojects.md)|the JBProjects to use to get the owner of the project|
|`_operatorStore`|[`IJBOperatorStore`](/docs/v4/deprecated/v3/api/interfaces/ijboperatorstore.md)|the operatorStore to use for the permissions|

### onlyOwner

*Throws if called by an account that is not the owner and does not have permission to act as the owner*

```solidity
modifier onlyOwner() virtual;
```

### _emitTransferEvent

```solidity
function _emitTransferEvent(address previousOwner, address newOwner) internal virtual override;
```

## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

