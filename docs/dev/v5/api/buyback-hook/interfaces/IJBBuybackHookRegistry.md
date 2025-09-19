# IJBBuybackHookRegistry
[Git Source](https://github.com/Bananapus/nana-buyback-hook-v5/blob/0ff73aee4ae7a3a75f75129bcf8bbef59b4c3bb1/src/interfaces/IJBBuybackHookRegistry.sol)

**Inherits:**
IJBRulesetDataHook


## Functions
### PROJECTS


```solidity
function PROJECTS() external view returns (IJBProjects);
```

### defaultHook


```solidity
function defaultHook() external view returns (IJBRulesetDataHook);
```

### hasLockedHook


```solidity
function hasLockedHook(uint256 projectId) external view returns (bool);
```

### hookOf


```solidity
function hookOf(uint256 projectId) external view returns (IJBRulesetDataHook);
```

### isHookAllowed


```solidity
function isHookAllowed(IJBRulesetDataHook hook) external view returns (bool);
```

### allowHook


```solidity
function allowHook(IJBRulesetDataHook hook) external;
```

### disallowHook


```solidity
function disallowHook(IJBRulesetDataHook hook) external;
```

### lockHookFor


```solidity
function lockHookFor(uint256 projectId) external;
```

### setDefaultHook


```solidity
function setDefaultHook(IJBRulesetDataHook hook) external;
```

### setHookFor


```solidity
function setHookFor(uint256 projectId, IJBRulesetDataHook hook) external;
```

## Events
### JBBuybackHookRegistry_AllowHook

```solidity
event JBBuybackHookRegistry_AllowHook(IJBRulesetDataHook hook);
```

### JBBuybackHookRegistry_DisallowHook

```solidity
event JBBuybackHookRegistry_DisallowHook(IJBRulesetDataHook hook);
```

### JBBuybackHookRegistry_LockHook

```solidity
event JBBuybackHookRegistry_LockHook(uint256 projectId);
```

### JBBuybackHookRegistry_SetDefaultHook

```solidity
event JBBuybackHookRegistry_SetDefaultHook(IJBRulesetDataHook hook);
```

### JBBuybackHookRegistry_SetHook

```solidity
event JBBuybackHookRegistry_SetHook(uint256 indexed projectId, IJBRulesetDataHook hook);
```

