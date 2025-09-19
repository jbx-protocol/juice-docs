# IJBAddressRegistry
[Git Source](https://github.com/Bananapus/nana-address-registry/blob/922b48185d8a792b44854cf6d3257339a9d73eaa/src/interfaces/IJBAddressRegistry.sol)


## Functions
### deployerOf


```solidity
function deployerOf(address addr) external view returns (address deployer);
```

### registerAddress


```solidity
function registerAddress(address deployer, uint256 nonce) external;
```

### registerAddress


```solidity
function registerAddress(address deployer, bytes32 salt, bytes calldata bytecode) external;
```

## Events
### AddressRegistered

```solidity
event AddressRegistered(address indexed addr, address indexed deployer, address caller);
```

