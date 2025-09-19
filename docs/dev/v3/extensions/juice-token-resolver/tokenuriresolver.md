---
sidebar_position: 1
---

# TokenUriResolver

The registry serves metadata for all Juciebox Protocol v2 projects.

#### Code
https://github.com/jbx-protocol/juice-token-resolver/blob/main/src/TokenUriResolver.sol

#### Addresses

Ethereum mainnet: [`0x2c39bb41e2af6bec6c3bb102c07c15eda648a366`](https://etherscan.io/address/0x2c39bb41e2af6bec6c3bb102c07c15eda648a366)

Goerli testnet: [`0x082d3969f2b7988b0362e8bd4f2af9bbd2fed36c`](https://goerli.etherscan.io/address/0x082d3969f2b7988b0362e8bd4f2af9bbd2fed36c)

#### Notes

The default metadata for all projects can be updated by the contract owner.

Juicebox project owners and operators can override the default metadata for their project with their own IJBTokenUriResolver contracts. The [Token Resolver Template repo](https://github.com/nnnnicholas/juice-token-resolver-template) can help you get started writing a custom Juicebox project token resolver. To get started making onchain SVGs, consult the [Juice SVG Template repo](https://github.com/nnnnicholas/juice-svg-template).


#### Inheritance
Inherits: [`IJBTokenUriResolver`](/docs/dev/v3/api/interfaces/ijbtokenuriresolver.md), [`JBOperatable`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/README.md), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

## State Variables

### projects

The address of the Juicebox Projects contract.

```solidity
IJBProjects public immutable projects;
```

### MAX_RESOLVER_GAS_USAGE

The maximum amount of gas used by a resolver, to allow falling back on the default resolver.

```solidity
uint256 constant MAX_RESOLVER_GAS_USAGE = 50_000_000;
```

### tokenUriResolvers

Each project's IJBTokenUriResolver metadata contract.

*Mapping of projectId => tokenUriResolver*

*projectId 0 returns the default resolver address.*

```solidity
mapping(uint256 => IJBTokenUriResolver) public tokenUriResolvers;
```

## Functions

### constructor

TokenUriResolver constructor.

*Sets the default IJBTokenUriResolver. This resolver is used for all projects that do not have a custom resolver.*

*Sets immutable references to JBProjects and JBOperatorStore contracts.*

```solidity
constructor(IJBProjects _projects, IJBOperatorStore _operatorStore, IJBTokenUriResolver _defaultTokenUriResolver)
    JBOperatable(_operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|`IJBProjects`|The address of the Juicebox Projects contract.|
|`_operatorStore`|`IJBOperatorStore`|The address of the JBOperatorStore contract.|
|`_defaultTokenUriResolver`|`IJBTokenUriResolver`|The address of the default IJBTokenUriResolver.|

### getUri

Get the token uri for a project.

*Called by `JBProjects.tokenUri(uint256)`. If a project has a custom IJBTokenUriResolver, it is used instead of the default resolver.*

```solidity
function getUri(uint256 _projectId) external view override returns (string memory tokenUri);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The id of the project.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenUri`|`string`|The token uri for the project.|

### setTokenUriResolverForProject

Set the IJBTokenUriResolver for a project. This function is restricted to the project's owner and operators.

*Set the IJBTokenUriResolver for a project to 0 to use the default resolver.*

```solidity
function setTokenUriResolverForProject(uint256 _projectId, IJBTokenUriResolver _resolver)
    external
    requirePermission(projects.ownerOf(_projectId), _projectId, JBUriOperations.SET_TOKEN_URI);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The id of the project.|
|`_resolver`|`IJBTokenUriResolver`|The address of the IJBTokenUriResolver, or 0 to restore the default setting.|

### setDefaultTokenUriResolver

Set the default IJBTokenUriResolver.

*Only available to this contract's owner.*

```solidity
function setDefaultTokenUriResolver(IJBTokenUriResolver _resolver) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_resolver`|`IJBTokenUriResolver`|The address of the default token uri resolver.|

### defaultTokenUriResolver

Get the default IJBTokenUriResolver address.

*Convenience function for browsing contracts on block explorers.*

```solidity
function defaultTokenUriResolver() external view returns (IJBTokenUriResolver);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IJBTokenUriResolver`|IJBTokenURiResolver The address of the default token uri resolver.|

## Events

### DefaultTokenUriResolverSet

Emitted when the default IJBTokenUriResolver is set.

```solidity
event DefaultTokenUriResolverSet(IJBTokenUriResolver indexed tokenUriResolver);
```

### ProjectTokenUriResolverSet

Emitted when the Token Uri Resolver for a project is set.

```solidity
event ProjectTokenUriResolverSet(uint256 indexed projectId, IJBTokenUriResolver indexed tokenUriResolver);
```
