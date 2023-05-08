# Operatable

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/abstract/Operatable.sol)

Inherits: [`IOperatable`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ioperatable.md)

## State Variables

### operatorStore

A contract storing operator assignments.

```solidity
IOperatorStore public immutable override operatorStore;
```

## Functions

### requirePermission

```solidity
modifier requirePermission(address _account, uint256 _domain, uint256 _index);
```

### requirePermissionAllowingWildcardDomain

```solidity
modifier requirePermissionAllowingWildcardDomain(address _account, uint256 _domain, uint256 _index);
```

### requirePermissionAcceptingAlternateAddress

```solidity
modifier requirePermissionAcceptingAlternateAddress(
    address _account,
    uint256 _domain,
    uint256 _index,
    address _alternate
);
```

### constructor

```solidity
constructor(IOperatorStore _operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operatorStore`|[`IOperatorStore`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ioperatorstore.md)|A contract storing operator assignments.|

