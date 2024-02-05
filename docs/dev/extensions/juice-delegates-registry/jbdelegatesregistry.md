---
sidebar_position: 1
---

# JBDelegatesRegistry

This contract is used to register deployers of Juicebox Delegates. It is the deployer's responsibility to register their delegates in this registry and make sure their delegate implements [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165).

[Git Source](https://github.com/jbx-protocol/juice-delegates-registry/blob/d836dddcf1d83bfd5212a19996368fae61c2301d/src/JBDelegatesRegistry.sol)

Mainnet: [`0x7A53cAA1dC4d752CAD283d039501c0Ee45719FaC`](https://etherscan.io/address/0x7A53cAA1dC4d752CAD283d039501c0Ee45719FaC)

Goerli: [`0xCe3Ebe8A7339D1f7703bAF363d26cD2b15D23C23`](https://goerli.etherscan.io/address/0xCe3Ebe8A7339D1f7703bAF363d26cD2b15D23C23)

Inherits: [`IJBDelegatesRegistry`](/dev/extensions/juice-delegates-registry/ijbdelegatesregistry/)

*Mostly for front-end integration purposes. The delegate address is computed from the deployer address and the nonce used to deploy the delegate.*

## State Variables

### deployerOf
Track which deployer deployed a delegate, based on a
proactive deployer update

```solidity
mapping(address => address) public override deployerOf;
```

## Functions

### addDelegate

Add a delegate to the registry (needs to implement erc165, a delegate type and deployed using create)

*frontend might retrieve the correct nonce, for both contract and eoa, using
ethers provider.getTransactionCount(address) or web3js web3.eth.getTransactionCount just *before* the
delegate deployment (if adding a delegate at a later time, manual nonce counting might be needed)*

```solidity
function addDelegate(address _deployer, uint256 _nonce) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_deployer`|`address`|The address of the deployer of a given delegate|
|`_nonce`|`uint256`|   The nonce used to deploy the delegate|

### addDelegateCreate2

Add a delegate to the registry (needs to implement erc165, a delegate type and deployed using create2)

*_salt is based on the delegate deployer own internal logic while the deployment bytecode can be retrieved in
the deployment transaction (off-chain) or via
abi.encodePacked(type(delegateContract).creationCode, abi.encode(constructorArguments)) (on-chain)*

```solidity
function addDelegateCreate2(address _deployer, bytes32 _salt, bytes calldata _bytecode) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_deployer`|`address`|The address of the contract deployer|
|`_salt`|`bytes32`|    An unique salt used to deploy the delegate|
|`_bytecode`|`bytes`|The *deployment* bytecode used to deploy the delegate (ie including constructor and its arguments)|

### _checkAndAddDelegate

```solidity
function _checkAndAddDelegate(address _delegate, address _deployer) internal;
```

### _addressFrom

Compute the address of a contract deployed using create1, by an address at a given nonce

*Taken from https://ethereum.stackexchange.com/a/87840/68134 - this wouldn't work for nonce > 2**32,
if someone do reach that nonce please: 1) ping us, because wow 2) use another deployer*

```solidity
function _addressFrom(address _origin, uint256 _nonce) internal pure returns (address _address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`address`|  The address of the deployer|
|`_nonce`|`uint256`|   The nonce used to deploy the contract|

## Events

### DelegateAdded

Emitted when a deployed delegate is added

```solidity
event DelegateAdded(address indexed _delegate, address indexed _deployer);
```

## Errors

### JBDelegatesRegistry_incompatibleDelegate

Throws if the delegate is not compatible with the Juicebox protocol (based on ERC165)

```solidity
error JBDelegatesRegistry_incompatibleDelegate();
```

