---
sidebar_position: 2
---

# IJBDelegatesRegistry

[Git Source](https://github.com/jbx-protocol/juice-delegates-registry/blob/d836dddcf1d83bfd5212a19996368fae61c2301d/src/interfaces/IJBDelegatesRegistry.sol)

## Functions

### deployerOf

```solidity
function deployerOf(address _delegate) external view returns (address _deployer);
```

### addDelegate

```solidity
function addDelegate(address _deployer, uint256 _nonce) external;
```

### addDelegateCreate2

```solidity
function addDelegateCreate2(address _deployer, bytes32 _salt, bytes calldata _bytecode) external;
```

