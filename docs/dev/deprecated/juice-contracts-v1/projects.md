# Projects

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/Projects.sol)

Mainnet: [`0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418`](https://etherscan.io/address/0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418)

Inherits: [`ERC721`](/), [`IProjects`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iprojects.md), [`Operatable`](/docs/dev/deprecated/juice-contracts-v1/abstract/operatable.md)

Stores project ownership and identifying information.

*Projects are represented as ERC-721's.*

## State Variables

### SECONDS_IN_YEAR

```solidity
uint256 private constant SECONDS_IN_YEAR = 31536000;
```

### count

A running count of project IDs.

```solidity
uint256 public override count = 0;
```

### uriOf

Optional mapping for project URIs

```solidity
mapping(uint256 => string) public override uriOf;
```

### handleOf

Each project's handle.

```solidity
mapping(uint256 => bytes32) public override handleOf;
```

### projectFor

The project that each unique handle represents.

```solidity
mapping(bytes32 => uint256) public override projectFor;
```

### transferAddressFor

Handles that have been transfered to the specified address.

```solidity
mapping(bytes32 => address) public override transferAddressFor;
```

### challengeExpiryOf

The timestamps when each handle is claimable. A value of 0 means a handle isn't being challenged.

```solidity
mapping(bytes32 => uint256) public override challengeExpiryOf;
```

## Functions

### exists

Whether the specified project exists.

```solidity
function exists(uint256 _projectId) external view override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project to check the existence of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A flag indicating if the project exists.|

### constructor

```solidity
constructor(IOperatorStore _operatorStore) ERC721("Juicebox project", "JUICEBOX PROJECT") Operatable(_operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operatorStore`|[`IOperatorStore`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ioperatorstore.md)|A contract storing operator assignments.|

### create

Create a new project.

*Anyone can create a project on an owner's behalf.*

```solidity
function create(address _owner, bytes32 _handle, string calldata _uri, ITerminal _terminal)
    external
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the project.|
|`_handle`|`bytes32`|A unique handle for the project.|
|`_uri`|`string`|An ipfs CID to more info about the project.|
|`_terminal`|[`ITerminal`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iterminal.md)|The terminal to set for this project so that it can start receiving payments.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The new project's ID.|

### setHandle

Allows a project owner to set the project's handle.

*Only a project's owner or operator can set its handle.*

```solidity
function setHandle(uint256 _projectId, bytes32 _handle)
    external
    override
    requirePermission(ownerOf(_projectId), _projectId, Operations.SetHandle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project.|
|`_handle`|`bytes32`|The new unique handle for the project.|

### setUri

Allows a project owner to set the project's uri.

*Only a project's owner or operator can set its uri.*

```solidity
function setUri(uint256 _projectId, string calldata _uri)
    external
    override
    requirePermission(ownerOf(_projectId), _projectId, Operations.SetUri);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project.|
|`_uri`|`string`|An ipfs CDN to more info about the project. Don't include the leading ipfs://|

### transferHandle

Allows a project owner to transfer its handle to another address.

*Only a project's owner or operator can transfer its handle.*

```solidity
function transferHandle(uint256 _projectId, address _to, bytes32 _newHandle)
    external
    override
    requirePermission(ownerOf(_projectId), _projectId, Operations.SetHandle)
    returns (bytes32 _handle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to transfer the handle from.|
|`_to`|`address`|The address that can now reallocate the handle.|
|`_newHandle`|`bytes32`|The new unique handle for the project that will replace the transfered one.|

### claimHandle

Allows an address to claim and handle that has been transfered to them and apply it to a project of theirs.

*Only a project's owner or operator can claim a handle onto it.*

```solidity
function claimHandle(bytes32 _handle, address _for, uint256 _projectId)
    external
    override
    requirePermissionAllowingWildcardDomain(_for, _projectId, Operations.ClaimHandle)
    requirePermission(ownerOf(_projectId), _projectId, Operations.ClaimHandle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_handle`|`bytes32`|The handle being claimed.|
|`_for`|`address`|The address that the handle has been transfered to.|
|`_projectId`|`uint256`|The ID of the project to use the claimed handle.|

### challengeHandle

Allows anyone to challenge a project's handle. After one year, the handle can be claimed by the public if the challenge isn't answered by the handle's project.
This can be used to make sure a handle belonging to an unattended to project isn't lost forever.

```solidity
function challengeHandle(bytes32 _handle) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_handle`|`bytes32`|The handle to challenge.|

### renewHandle

Allows a project to renew its handle so it can't be claimed until a year after its challenged again.

*Only a project's owner or operator can renew its handle.*

```solidity
function renewHandle(uint256 _projectId)
    external
    requirePermission(ownerOf(_projectId), _projectId, Operations.RenewHandle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that current has the handle being renewed.|

