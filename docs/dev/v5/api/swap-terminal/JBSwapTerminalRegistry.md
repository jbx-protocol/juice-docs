# JBSwapTerminalRegistry
[Git Source](https://github.com/Bananapus/nana-swap-terminal-v5/blob/7a817baa29705288afdaa7c9853735b3b6130173/src/JBSwapTerminalRegistry.sol)

**Inherits:**
[IJBSwapTerminalRegistry](/docs/dev/v5/api/swap-terminal/interfaces/IJBSwapTerminalRegistry.md), JBPermissioned, Ownable, ERC2771Context


## State Variables
### PROJECTS
The project registry.


```solidity
IJBProjects public immutable override PROJECTS;
```


### PERMIT2
The permit2 utility.


```solidity
IPermit2 public immutable PERMIT2;
```


### defaultTerminal
The default hook to use.


```solidity
IJBTerminal public override defaultTerminal;
```


### hasLockedTerminal
Whether the terminal for the given project is locked.


```solidity
mapping(uint256 projectId => bool) public override hasLockedTerminal;
```


### terminalOf
The terminal for the given project.


```solidity
mapping(uint256 projectId => IJBTerminal) public override terminalOf;
```


### isTerminalAllowed
The address of each project's token.


```solidity
mapping(IJBTerminal terminal => bool) public override isTerminalAllowed;
```


## Functions
### constructor


```solidity
constructor(
    IJBPermissions permissions,
    IJBProjects projects,
    IPermit2 permit2,
    address owner,
    address trustedForwarder
)
    JBPermissioned(permissions)
    ERC2771Context(trustedForwarder)
    Ownable(owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`IJBPermissions`|The permissions contract.|
|`projects`|`IJBProjects`|The project registry.|
|`permit2`|`IPermit2`|The permit2 utility.|
|`owner`|`address`|The owner of the contract.|
|`trustedForwarder`|`address`|The trusted forwarder for the contract.|


### accountingContextForTokenOf

Get the accounting context for the specified project ID and token.

*Accounting contexts are set up in `addDefaultPool(...)`.*


```solidity
function accountingContextForTokenOf(
    uint256 projectId,
    address token
)
    external
    view
    override
    returns (JBAccountingContext memory context);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to get the accounting context for.|
|`token`|`address`|The address of the token to get the accounting context for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`context`|`JBAccountingContext`|A `JBAccountingContext` containing the accounting context for the project ID and token.|


### accountingContextsOf

Return all the accounting contexts for a specified project ID.

*This includes both project-specific and generic accounting contexts, with the project-specific contexts
taking precedence.*


```solidity
function accountingContextsOf(uint256 projectId)
    external
    view
    override
    returns (JBAccountingContext[] memory contexts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to get the accounting contexts for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`contexts`|`JBAccountingContext[]`|An array of `JBAccountingContext` containing the accounting contexts for the project ID.|


### currentSurplusOf

Empty implementation to satisfy the interface. This terminal has no surplus.


```solidity
function currentSurplusOf(
    uint256 projectId,
    JBAccountingContext[] memory accountingContexts,
    uint256 decimals,
    uint256 currency
)
    external
    view
    returns (uint256);
```

### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public pure override returns (bool);
```

### _contextSuffixLength

*`ERC-2771` specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view override(ERC2771Context, Context) returns (uint256);
```

### _msgData

The calldata. Preferred to use over `msg.data`.


```solidity
function _msgData() internal view override(ERC2771Context, Context) returns (bytes calldata);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|calldata The `msg.data` of this call.|


### _msgSender

The message's sender. Preferred to use over `msg.sender`.


```solidity
function _msgSender() internal view override(ERC2771Context, Context) returns (address sender);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address which sent this call.|


### addAccountingContextsFor

Empty implementation to satisfy the interface. Accounting contexts are set in `addDefaultPool(...)`.


```solidity
function addAccountingContextsFor(
    uint256 projectId,
    JBAccountingContext[] calldata accountingContexts
)
    external
    override;
```

### addToBalanceOf

Accepts funds for a given project, swaps them if necessary, and adds them to the project's balance in
the specified terminal.

*This function handles the token in transfer, potentially swaps the tokens to the desired output token, and
then adds the swapped tokens to the project's balance in the specified terminal.*


```solidity
function addToBalanceOf(
    uint256 projectId,
    address token,
    uint256 amount,
    bool shouldReturnHeldFees,
    string calldata memo,
    bytes calldata metadata
)
    external
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project for which funds are being accepted and added to its balance.|
|`token`|`address`|The address of the token being paid in.|
|`amount`|`uint256`|The amount of tokens being paid in.|
|`shouldReturnHeldFees`|`bool`|A boolean to indicate whether held fees should be returned.|
|`memo`|`string`|A memo to pass along to the emitted event.|
|`metadata`|`bytes`|Bytes in `JBMetadataResolver`'s format which can contain additional data for the swap and adding to balance.|


### allowTerminal

Allow a hook.

*Only the owner can allow a hook.*


```solidity
function allowTerminal(IJBTerminal terminal) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`terminal`|`IJBTerminal`|The terminal to allow.|


### disallowTerminal

Disallow a terminal.

*Only the owner can disallow a hook.*


```solidity
function disallowTerminal(IJBTerminal terminal) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`terminal`|`IJBTerminal`|The terminal to disallow.|


### lockTerminalFor

Lock a terminal for a project.

*Only the project's owner or an address with the `JBPermissionIds.ADD_SWAP_TERMINAL_POOL` permission from
the
owner can lock a terminal for a project.*


```solidity
function lockTerminalFor(uint256 projectId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to lock the terminal for.|


### migrateBalanceOf

Empty implementation to satisfy the interface.


```solidity
function migrateBalanceOf(
    uint256 projectId,
    address token,
    IJBTerminal to
)
    external
    override
    returns (uint256 balance);
```

### pay

Pay a project by swapping the incoming tokens for tokens that one of the project's other terminals
accepts, passing along the funds received from the swap and the specified parameters.


```solidity
function pay(
    uint256 projectId,
    address token,
    uint256 amount,
    address beneficiary,
    uint256 minReturnedTokens,
    string calldata memo,
    bytes calldata metadata
)
    external
    payable
    virtual
    override
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project being paid.|
|`token`|`address`|The address of the token being paid in.|
|`amount`|`uint256`|The amount of tokens being paid in, as a fixed point number with the same amount of decimals as the `token`. If `token` is the native token, `amount` is ignored and `msg.value` is used in its place.|
|`beneficiary`|`address`|The beneficiary address to pass along to the other terminal. If the other terminal mints tokens, for example, they will be minted for this address.|
|`minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with the same number of decimals as the other terminal. This value will be passed along to the other terminal.|
|`memo`|`string`|A memo to pass along to the emitted event.|
|`metadata`|`bytes`|Bytes in `JBMetadataResolver`'s format which can contain a quote from the user/client. The quote should contain a minimum amount of tokens to receive from the swap and the pool to use. This metadata is also passed to the other terminal's emitted event, as well as its data hook and pay hook if applicable.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of tokens received from the swap, as a fixed point number with the same amount of decimals as that token.|


### setDefaultTerminal

Set the default terminal.

*Only the owner can set the default hook.*


```solidity
function setDefaultTerminal(IJBTerminal terminal) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`terminal`|`IJBTerminal`|The terminal to set as the default.|


### setTerminalFor

Set the terminal for a project.

*Only the project's owner or an address with the `JBPermissionIds.ADD_SWAP_TERMINAL_POOL` permission from
the
owner can set the terminal for a project.*


```solidity
function setTerminalFor(uint256 projectId, IJBTerminal terminal) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project to set the terminal for.|
|`terminal`|`IJBTerminal`|The terminal to set for the project.|


### _acceptFundsFor

Accepts a token being paid in.


```solidity
function _acceptFundsFor(address token, uint256 amount, bytes calldata metadata) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token being paid in.|
|`amount`|`uint256`|The amount of tokens being paid in.|
|`metadata`|`bytes`|The metadata in which `permit2` context is provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amount The amount of tokens that have been accepted.|


### _beforeTransferFor

Logic to be triggered before transferring tokens from this terminal.


```solidity
function _beforeTransferFor(address to, address token, uint256 amount) internal virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to transfer tokens to.|
|`token`|`address`|The token being transfered.|
|`amount`|`uint256`|The amount of tokens to transfer, as a fixed point number with the same number of decimals as the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|payValue The amount that'll be paid as a `msg.value`.|


### _transferFrom

Transfers tokens.


```solidity
function _transferFrom(address from, address payable to, address token, uint256 amount) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The address to transfer tokens from.|
|`to`|`address payable`|The address to transfer tokens to.|
|`token`|`address`|The address of the token being transfered.|
|`amount`|`uint256`|The amount of tokens to transfer, as a fixed point number with the same number of decimals as the token.|


## Errors
### JBSwapTerminalRegistry_NoMsgValueAllowed

```solidity
error JBSwapTerminalRegistry_NoMsgValueAllowed(uint256 value);
```

### JBSwapTerminalRegistry_PermitAllowanceNotEnough

```solidity
error JBSwapTerminalRegistry_PermitAllowanceNotEnough(uint256 amount, uint256 allowanceAmount);
```

### JBSwapTerminalRegistry_TerminalLocked

```solidity
error JBSwapTerminalRegistry_TerminalLocked(uint256 projectId);
```

### JBSwapTerminalRegistry_TerminalNotAllowed

```solidity
error JBSwapTerminalRegistry_TerminalNotAllowed(IJBTerminal terminal);
```

### JBSwapTerminalRegistry_TerminalNotSet

```solidity
error JBSwapTerminalRegistry_TerminalNotSet(uint256 projectId);
```

