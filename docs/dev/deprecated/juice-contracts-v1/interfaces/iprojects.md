# IProjects

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IProjects.sol)

Inherits: [`IERC721`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721)

## Functions

### count

```solidity
function count() external view returns (uint256);
```

### uriOf

```solidity
function uriOf(uint256 _projectId) external view returns (string memory);
```

### handleOf

```solidity
function handleOf(uint256 _projectId) external returns (bytes32 handle);
```

### projectFor

```solidity
function projectFor(bytes32 _handle) external returns (uint256 projectId);
```

### transferAddressFor

```solidity
function transferAddressFor(bytes32 _handle) external returns (address receiver);
```

### challengeExpiryOf

```solidity
function challengeExpiryOf(bytes32 _handle) external returns (uint256);
```

### exists

```solidity
function exists(uint256 _projectId) external view returns (bool);
```

### create

```solidity
function create(address _owner, bytes32 _handle, string calldata _uri, ITerminal _terminal)
    external
    returns (uint256 id);
```

### setHandle

```solidity
function setHandle(uint256 _projectId, bytes32 _handle) external;
```

### setUri

```solidity
function setUri(uint256 _projectId, string calldata _uri) external;
```

### transferHandle

```solidity
function transferHandle(uint256 _projectId, address _to, bytes32 _newHandle) external returns (bytes32 _handle);
```

### claimHandle

```solidity
function claimHandle(bytes32 _handle, address _for, uint256 _projectId) external;
```

## Events

### Create

```solidity
event Create(
    uint256 indexed projectId,
    address indexed owner,
    bytes32 indexed handle,
    string uri,
    ITerminal terminal,
    address caller
);
```

### SetHandle

```solidity
event SetHandle(uint256 indexed projectId, bytes32 indexed handle, address caller);
```

### SetUri

```solidity
event SetUri(uint256 indexed projectId, string uri, address caller);
```

### TransferHandle

```solidity
event TransferHandle(
    uint256 indexed projectId, address indexed to, bytes32 indexed handle, bytes32 newHandle, address caller
);
```

### ClaimHandle

```solidity
event ClaimHandle(address indexed account, uint256 indexed projectId, bytes32 indexed handle, address caller);
```

### ChallengeHandle

```solidity
event ChallengeHandle(bytes32 indexed handle, uint256 challengeExpiry, address caller);
```

### RenewHandle

```solidity
event RenewHandle(bytes32 indexed handle, uint256 indexed projectId, address caller);
```

