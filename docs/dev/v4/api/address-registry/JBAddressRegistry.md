# JBAddressRegistry
[Git Source](https://github.com/Bananapus/nana-address-registry/blob/922b48185d8a792b44854cf6d3257339a9d73eaa/src/JBAddressRegistry.sol)

**Inherits:**
[IJBAddressRegistry](/docs/dev/v4/api/address-registry/interfaces/IJBAddressRegistry.md)

Frontend clients need a way to verify that a Juicebox contract has a deployer they trust. `JBAddressRegistry`
allows any contract deployed with `create` or `create2` to publicly register its deployer's address. Whoever deploys
a contract is reponsible for registering it.

*`JBAddressRegistry` is intended for registering the deployers of Juicebox pay/redeem hooks, but does not
enforce adherence to an interface, and can be used for any `create`/`create2` deployer.*

*The addresses of the deployed contracts are computed deterministically based on the deployer's address, and a
nonce (for `create`) or `create2` salt and deployment bytecode (for `create2`).*


## State Variables
### deployerOf
Returns the deployer of a given contract which has been registered.

*Whoever deploys a contract is responsible for registering it.*


```solidity
mapping(address addr => address deployer) public override deployerOf;
```


## Functions
### registerAddress

Register a deployed contract's address.

*The contract must be deployed using `create`.*


```solidity
function registerAddress(address deployer, uint256 nonce) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`address`|The address of the contract's deployer.|
|`nonce`|`uint256`|The nonce used to deploy the contract.|


### registerAddress

Register a deployed contract's address.

*The contract must be deployed using `create2`.*

*The `create2` salt is determined by the deployer's logic. The deployment bytecode can be retrieved offchain
(from the deployment transaction) or onchain (with `abi.encodePacked(type(deployedContract).creationCode,
abi.encode(constructorArguments))`).*


```solidity
function registerAddress(address deployer, bytes32 salt, bytes calldata bytecode) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`address`|The address of the contract's deployer.|
|`salt`|`bytes32`|The `create2` salt used to deploy the contract.|
|`bytecode`|`bytes`|The contract's deployment bytecode, including the constructor arguments.|


### _addressFrom

Compute the address of a contract deployed using `create` based on the deployer's address and nonce.

*Taken from https://ethereum.stackexchange.com/a/87840/68134 - this won't work for nonces > 2**32. If
you reach that nonce please: 1) ping us, because wow 2) use another deployer.*


```solidity
function _addressFrom(address origin, uint256 nonce) internal pure returns (address addr);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`origin`|`address`|The deployer's address.|
|`nonce`|`uint256`|The nonce used to deploy the contract.|


### _registerAddress

Register a contract's deployer in the `deployerOf` mapping.


```solidity
function _registerAddress(address addr, address deployer) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|The deployed contract's address.|
|`deployer`|`address`|The deployer's address.|


