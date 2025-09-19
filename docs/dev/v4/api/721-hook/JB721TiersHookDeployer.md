# JB721TiersHookDeployer
[Git Source](https://github.com/Bananapus/nana-721-hook/blob/e813fb5b7d17cd3d18023137d70a7b2f3911ad99/src/JB721TiersHookDeployer.sol)

**Inherits:**
ERC2771Context, [IJB721TiersHookDeployer](/docs/dev/v4/api/721-hook/interfaces/IJB721TiersHookDeployer.md)

Deploys a `JB721TiersHook` for an existing project.


## State Variables
### ADDRESS_REGISTRY
A registry which stores references to contracts and their deployers.


```solidity
IJBAddressRegistry public immutable ADDRESS_REGISTRY;
```


### HOOK
A 721 tiers hook.


```solidity
JB721TiersHook public immutable HOOK;
```


### STORE
The contract that stores and manages data for this contract's NFTs.


```solidity
IJB721TiersHookStore public immutable STORE;
```


### _nonce
This contract's current nonce, used for the Juicebox address registry.


```solidity
uint256 internal _nonce;
```


## Functions
### constructor


```solidity
constructor(
    JB721TiersHook hook,
    IJB721TiersHookStore store,
    IJBAddressRegistry addressRegistry,
    address trustedForwarder
)
    ERC2771Context(trustedForwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hook`|`JB721TiersHook`|Reference copy of a hook.|
|`store`|`IJB721TiersHookStore`|The contract that stores and manages data for this contract's NFTs.|
|`addressRegistry`|`IJBAddressRegistry`|A registry which stores references to contracts and their deployers.|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### deployHookFor

Deploys a 721 tiers hook for the specified project.


```solidity
function deployHookFor(
    uint256 projectId,
    JBDeploy721TiersHookConfig calldata deployTiersHookConfig,
    bytes32 salt
)
    external
    override
    returns (IJB721TiersHook newHook);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to deploy the hook for.|
|`deployTiersHookConfig`|`JBDeploy721TiersHookConfig`|The config to deploy the hook with, which determines its behavior.|
|`salt`|`bytes32`|A salt to use for the deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newHook`|`IJB721TiersHook`|The address of the newly deployed hook.|


