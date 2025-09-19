# JBProjectHandles
[Git Source](https://github.com/Bananapus/nana-project-handles/blob/53556219071dc0b4c7411da3160eeb155cfebf78/src/JBProjectHandles.sol)

**Inherits:**
[IJBProjectHandles](/docs/dev/v4/api/project-handles/interfaces/IJBProjectHandles.md), ERC2771Context

`JBProjectHandles` allows Juicebox project owners to associate their project with an ENS node. If that ENS
node has a matching text record which points back to the project, clients will treat that ENS node as the project's
handle.

*By convention, clients read the `juicebox` text field of the ENS node with the format `chainId:projectId`.
For example, project ID #5 on Optimism mainnet would be represented by a `juicebox` text record of `10:5`.*


## State Variables
### TEXT_KEY
The key of the ENS text record which points back to a project.


```solidity
string public constant override TEXT_KEY = "juicebox";
```


### ENS_REGISTRY
The ENS registry contract address.

*Same on Ethereum mainnet and most of its testnets.*


```solidity
ENS public constant override ENS_REGISTRY = ENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);
```


### _ensNamePartsOf
A private mapping storing ENS name parts set by different owner addresses for different projects.

*The `ensParts` ["jbx", "dao", "foo"] represents foo.dao.jbx.eth.*


```solidity
mapping(uint256 chainId => mapping(uint256 projectId => mapping(address setter => string[] ensParts))) private
    _ensNamePartsOf;
```


## Functions
### constructor


```solidity
constructor(address trustedForwarder) ERC2771Context(trustedForwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`trustedForwarder`|`address`|The trusted forwarder for the ERC2771Context.|


### ensNamePartsOf

The parts of the stored ENS name of a project.


```solidity
function ensNamePartsOf(
    uint256 chainId,
    uint256 projectId,
    address setter
)
    external
    view
    override
    returns (string[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The chain ID of the network on which the project ID exists.|
|`projectId`|`uint256`|The ID of the project to get the ENS name of.|
|`setter`|`address`|The address that set the requested record in this contract.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string[]`|The parts of the ENS name parts of a project.|


### handleOf

Returns a project's verified handle. If the handle isn't verified, returns the empty string.

*The ENS record text record with the `TEXT_KEY` record containing `chainId:projectId`.*


```solidity
function handleOf(uint256 chainId, uint256 projectId, address setter) external view override returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The chain ID of the network the project is on.|
|`projectId`|`uint256`|The ID of the project to get the handle of.|
|`setter`|`address`|The address which set the requested handle. This should be the project's current owner.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|handle The project's verified handle.|


### _contextSuffixLength

*ERC-2771 specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view virtual override returns (uint256);
```

### _formatHandle

Formats ENS name parts into a handle.


```solidity
function _formatHandle(string[] memory ensNameParts) internal pure returns (string memory handle);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ensNameParts`|`string[]`|The ENS name parts to format into a handle.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`handle`|`string`|The formatted ENS handle.|


### _namehash

Returns a namehash for an ENS name.

*See https://eips.ethereum.org/EIPS/eip-137.*


```solidity
function _namehash(string[] memory ensNameParts) internal pure returns (bytes32 namehash);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ensNameParts`|`string[]`|The parts of an ENS name to hash.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`namehash`|`bytes32`|The namehash for an ENS name parts.|


### _msgSender

Returns the sender, prefered to use over `msg.sender`


```solidity
function _msgSender() internal view override returns (address sender);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|the sender address of this call.|


### _msgData

Returns the calldata, prefered to use over `msg.data`


```solidity
function _msgData() internal view override returns (bytes calldata);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|calldata the `msg.data` of this call|


### setEnsNamePartsFor

Point from a Juicebox project to an ENS node.

*The `parts` ["jbx", "dao", "foo"] represents foo.dao.jbx.eth.*

*The project's owner must call this function to set its ENS name parts.*


```solidity
function setEnsNamePartsFor(uint256 chainId, uint256 projectId, string[] memory parts) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|The chain ID of the network the project is on.|
|`projectId`|`uint256`|The ID of the project to set an ENS handle for.|
|`parts`|`string[]`|The parts of the ENS domain to use as the project handle, excluding the trailing .eth.|


## Errors
### JBProjectHandles_EmptyNamePart

```solidity
error JBProjectHandles_EmptyNamePart(string[] parts);
```

### JBProjectHandles_InvalidNamePart

```solidity
error JBProjectHandles_InvalidNamePart(string part);
```

### JBProjectHandles_NoParts

```solidity
error JBProjectHandles_NoParts();
```

