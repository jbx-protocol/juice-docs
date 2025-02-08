# IJBSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IJBSucker.sol)

**Inherits:**
IERC165


## Functions
### MESSENGER_BASE_GAS_LIMIT


```solidity
function MESSENGER_BASE_GAS_LIMIT() external view returns (uint32);
```

### MESSENGER_ERC20_MIN_GAS_LIMIT


```solidity
function MESSENGER_ERC20_MIN_GAS_LIMIT() external view returns (uint32);
```

### ADD_TO_BALANCE_MODE


```solidity
function ADD_TO_BALANCE_MODE() external view returns (JBAddToBalanceMode);
```

### DEPLOYER


```solidity
function DEPLOYER() external view returns (address);
```

### DIRECTORY


```solidity
function DIRECTORY() external view returns (IJBDirectory);
```

### TOKENS


```solidity
function TOKENS() external view returns (IJBTokens);
```

### peer


```solidity
function peer() external view returns (address);
```

### projectId


```solidity
function projectId() external view returns (uint256);
```

### amountToAddToBalanceOf


```solidity
function amountToAddToBalanceOf(address token) external view returns (uint256 amount);
```

### inboxOf


```solidity
function inboxOf(address token) external view returns (JBInboxTreeRoot memory);
```

### isMapped


```solidity
function isMapped(address token) external view returns (bool);
```

### outboxOf


```solidity
function outboxOf(address token) external view returns (JBOutboxTree memory);
```

### peerChainId


```solidity
function peerChainId() external view returns (uint256 chainId);
```

### remoteTokenFor


```solidity
function remoteTokenFor(address token) external view returns (JBRemoteToken memory);
```

### state


```solidity
function state() external view returns (JBSuckerState);
```

### addOutstandingAmountToBalance


```solidity
function addOutstandingAmountToBalance(address token) external;
```

### claim


```solidity
function claim(JBClaim[] calldata claims) external;
```

### claim


```solidity
function claim(JBClaim calldata claimData) external;
```

### mapToken


```solidity
function mapToken(JBTokenMapping calldata map) external payable;
```

### mapTokens


```solidity
function mapTokens(JBTokenMapping[] calldata maps) external payable;
```

### prepare


```solidity
function prepare(uint256 projectTokenAmount, address beneficiary, uint256 minTokensReclaimed, address token) external;
```

### toRemote


```solidity
function toRemote(address token) external payable;
```

## Events
### Claimed

```solidity
event Claimed(
    address beneficiary,
    address token,
    uint256 projectTokenCount,
    uint256 terminalTokenAmount,
    uint256 index,
    bool autoAddedToBalance,
    address caller
);
```

### InsertToOutboxTree

```solidity
event InsertToOutboxTree(
    address indexed beneficiary,
    address indexed token,
    bytes32 hashed,
    uint256 index,
    bytes32 root,
    uint256 projectTokenCount,
    uint256 terminalTokenAmount,
    address caller
);
```

### NewInboxTreeRoot

```solidity
event NewInboxTreeRoot(address indexed token, uint64 nonce, bytes32 root, address caller);
```

### RootToRemote

```solidity
event RootToRemote(bytes32 indexed root, address indexed token, uint256 index, uint64 nonce, address caller);
```

