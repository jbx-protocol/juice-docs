# IJBSplitHook
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBSplitHook.sol)

**Inherits:**
IERC165

Allows processing a single split with custom logic.

*The split hook's address should be set as the `hook` in the relevant split.*


## Functions
### processSplitWith

If a split has a split hook, payment terminals and controllers call this function while processing the
split.

*Critical business logic should be protected by appropriate access control. The tokens and/or native tokens
are optimistically transferred to the split hook when this function is called.*


```solidity
function processSplitWith(JBSplitHookContext calldata context) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBSplitHookContext`|The context passed by the terminal/controller to the split hook as a `JBSplitHookContext` struct:|


