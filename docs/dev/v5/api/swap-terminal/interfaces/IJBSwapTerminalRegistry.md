# IJBSwapTerminalRegistry
[Git Source](https://github.com/Bananapus/nana-swap-terminal-v5/blob/7a817baa29705288afdaa7c9853735b3b6130173/src/interfaces/IJBSwapTerminalRegistry.sol)

**Inherits:**
IJBTerminal


## Functions
### PROJECTS


```solidity
function PROJECTS() external view returns (IJBProjects);
```

### defaultTerminal


```solidity
function defaultTerminal() external view returns (IJBTerminal);
```

### hasLockedTerminal


```solidity
function hasLockedTerminal(uint256 projectId) external view returns (bool);
```

### terminalOf


```solidity
function terminalOf(uint256 projectId) external view returns (IJBTerminal);
```

### isTerminalAllowed


```solidity
function isTerminalAllowed(IJBTerminal terminal) external view returns (bool);
```

### allowTerminal


```solidity
function allowTerminal(IJBTerminal terminal) external;
```

### disallowTerminal


```solidity
function disallowTerminal(IJBTerminal terminal) external;
```

### lockTerminalFor


```solidity
function lockTerminalFor(uint256 projectId) external;
```

### setDefaultTerminal


```solidity
function setDefaultTerminal(IJBTerminal terminal) external;
```

### setTerminalFor


```solidity
function setTerminalFor(uint256 projectId, IJBTerminal terminal) external;
```

## Events
### JBSwapTerminalRegistry_AllowTerminal

```solidity
event JBSwapTerminalRegistry_AllowTerminal(IJBTerminal terminal);
```

### JBSwapTerminalRegistry_DisallowTerminal

```solidity
event JBSwapTerminalRegistry_DisallowTerminal(IJBTerminal terminal);
```

### JBSwapTerminalRegistry_LockTerminal

```solidity
event JBSwapTerminalRegistry_LockTerminal(uint256 projectId);
```

### JBSwapTerminalRegistry_SetDefaultTerminal

```solidity
event JBSwapTerminalRegistry_SetDefaultTerminal(IJBTerminal terminal);
```

### JBSwapTerminalRegistry_SetTerminal

```solidity
event JBSwapTerminalRegistry_SetTerminal(uint256 indexed projectId, IJBTerminal terminal);
```

