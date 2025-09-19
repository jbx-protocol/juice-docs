# JBSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/JBSucker.sol)

**Inherits:**
ERC2771Context, JBPermissioned, Initializable, ERC165, [IJBSuckerExtended](/docs/dev/v4/api/suckers/interfaces/IJBSuckerExtended.md)

An abstract contract for bridging a Juicebox project's tokens and the corresponding funds to and from a
remote chain.

*Beneficiaries and balances are tracked on two merkle trees: the outbox tree is used to send from the local
chain to the remote chain, and the inbox tree is used to receive from the remote chain to the local chain.*

*Throughout this contract, "terminal token" refers to any token accepted by a project's terminal.*

*This contract does *NOT* support tokens that have a fee on regular transfers and rebasing tokens.*


## State Variables
### MESSENGER_BASE_GAS_LIMIT
A reasonable minimum gas limit for a basic cross-chain call. The minimum amount of gas required to call
the `fromRemote` (successfully/safely) on the remote chain.


```solidity
uint32 public constant override MESSENGER_BASE_GAS_LIMIT = 300_000;
```


### MESSENGER_ERC20_MIN_GAS_LIMIT
A reasonable minimum gas limit used when bridging ERC-20s. The minimum amount of gas required to
(successfully/safely) perform a transfer on the remote chain.


```solidity
uint32 public constant override MESSENGER_ERC20_MIN_GAS_LIMIT = 200_000;
```


### _TREE_DEPTH
The depth of the merkle tree used to store the outbox and inbox.


```solidity
uint32 constant _TREE_DEPTH = 32;
```


### ADD_TO_BALANCE_MODE
Whether the `amountToAddToBalance` gets added to the project's balance automatically when `claim` is
called or manually by calling `addOutstandingAmountToBalance`.


```solidity
JBAddToBalanceMode public immutable override ADD_TO_BALANCE_MODE;
```


### DEPLOYER
The address of this contract's deployer.


```solidity
address public immutable override DEPLOYER;
```


### DIRECTORY
The directory of terminals and controllers for projects.


```solidity
IJBDirectory public immutable override DIRECTORY;
```


### TOKENS
The contract that manages token minting and burning.


```solidity
IJBTokens public immutable override TOKENS;
```


### _deprecatedAfter
The timestamp after which the sucker is entirely deprecated.


```solidity
uint256 internal _deprecatedAfter;
```


### _localProjectId
The ID of the project (on the local chain) that this sucker is associated with.


```solidity
uint256 private _localProjectId;
```


### _executedFor
Tracks whether individual leaves in a given token's merkle tree have been executed (to prevent
double-spending).

*A leaf is "executed" when the tokens it represents are minted for its beneficiary.*


```solidity
mapping(address token => BitMaps.BitMap) internal _executedFor;
```


### _inboxOf
The inbox merkle tree root for a given token.


```solidity
mapping(address token => JBInboxTreeRoot root) internal _inboxOf;
```


### _outboxOf
The outbox merkle tree for a given token.


```solidity
mapping(address token => JBOutboxTree) internal _outboxOf;
```


### _remoteTokenFor
Information about the token on the remote chain that the given token on the local chain is mapped to.


```solidity
mapping(address token => JBRemoteToken remoteToken) internal _remoteTokenFor;
```


## Functions
### constructor


```solidity
constructor(
    IJBDirectory directory,
    IJBPermissions permissions,
    IJBTokens tokens,
    JBAddToBalanceMode addToBalanceMode,
    address trusted_forwarder
)
    ERC2771Context(trusted_forwarder)
    JBPermissioned(permissions);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`directory`|`IJBDirectory`|A contract storing directories of terminals and controllers for each project.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`tokens`|`IJBTokens`|A contract that manages token minting and burning.|
|`addToBalanceMode`|`JBAddToBalanceMode`|The mode of adding tokens to balance.|
|`trusted_forwarder`|`address`||


### amountToAddToBalanceOf

The outstanding amount of tokens to be added to the project's balance by `claim` or
`addOutstandingAmountToBalance`.


```solidity
function amountToAddToBalanceOf(address token) public view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The local terminal token to get the amount to add to balance for.|


### inboxOf

The inbox merkle tree root for a given token.


```solidity
function inboxOf(address token) external view returns (JBInboxTreeRoot memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The local terminal token to get the inbox for.|


### isMapped

Checks whether the specified token is mapped to a remote token.


```solidity
function isMapped(address token) external view override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The terminal token to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean which is `true` if the token is mapped to a remote token and `false` if it is not.|


### outboxOf

Information about the token on the remote chain that the given token on the local chain is mapped to.


```solidity
function outboxOf(address token) external view returns (JBOutboxTree memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The local terminal token to get the remote token for.|


### peerChainId

Returns the chain on which the peer is located.


```solidity
function peerChainId() external view virtual returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|chain ID of the peer.|


### remoteTokenFor

Information about the token on the remote chain that the given token on the local chain is mapped to.


```solidity
function remoteTokenFor(address token) external view returns (JBRemoteToken memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The local terminal token to get the remote token for.|


### peer

The peer sucker on the remote chain.


```solidity
function peer() public view virtual returns (address);
```

### projectId

This can be overridden by the inheriting contract to return a different address. This is fully supported by
the sucker implementation and all its off-chain infrastructure, This does however break some
invariants/assumptions, for revnets it would break the assumption of matching configurations on both chains,
for this reason we only support a matching address.

The ID of the project (on the local chain) that this sucker is associated with.


```solidity
function projectId() public view returns (uint256);
```

### state

Reports the deprecation state of the sucker.


```solidity
function state() public view override returns (JBSuckerState);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JBSuckerState`|state The current deprecation state|


### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool);
```

### _balanceOf

Helper to get the `addr`'s balance for a given `token`.


```solidity
function _balanceOf(address token, address addr) internal view returns (uint256 balance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The token to get the balance for.|
|`addr`|`address`|The address to get the `token` balance of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The address' `token` balance.|


### _buildTreeHash

Builds a hash as they are stored in the merkle tree.


```solidity
function _buildTreeHash(
    uint256 projectTokenCount,
    uint256 terminalTokenAmount,
    address beneficiary
)
    internal
    pure
    returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectTokenCount`|`uint256`|The number of project tokens being cashed out.|
|`terminalTokenAmount`|`uint256`|The amount of terminal tokens being reclaimed by the cash out.|
|`beneficiary`|`address`|The beneficiary which will receive the project tokens.|


### _validateTokenMapping

Allow sucker implementations to add/override mapping rules to suite their specific needs.


```solidity
function _validateTokenMapping(JBTokenMapping calldata map) internal pure virtual;
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


### _contextSuffixLength

*ERC-2771 specifies the context as being a single address (20 bytes).*


```solidity
function _contextSuffixLength() internal view virtual override(ERC2771Context, Context) returns (uint256);
```

### initialize

Initializes the sucker with the project ID and peer address.


```solidity
function initialize(uint256 __projectId) public initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`__projectId`|`uint256`|The ID of the project (on the local chain) that this sucker is associated with.|


### addOutstandingAmountToBalance

Adds the reclaimed `token` balance to the projects terminal. Can only be used if `ADD_TO_BALANCE_MODE`
is
`MANUAL`.


```solidity
function addOutstandingAmountToBalance(address token) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the terminal token to add to the project's balance.|


### claim

Performs multiple claims.


```solidity
function claim(JBClaim[] calldata claims) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claims`|`JBClaim[]`|A list of claims to perform (including the terminal token, merkle tree leaf, and proof for each claim).|


### claim

`JBClaim` project tokens which have been bridged from the remote chain for their beneficiary.


```solidity
function claim(JBClaim calldata claimData) public override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claimData`|`JBClaim`|The terminal token, merkle tree leaf, and proof for the claim.|


### fromRemote

Receive a merkle root for a terminal token from the remote project.

*This can only be called by the messenger contract on the local chain, with a message from the remote peer.*


```solidity
function fromRemote(JBMessageRoot calldata root) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`root`|`JBMessageRoot`|The merkle root, token, and amount being received.|


### mapToken

Map an ERC-20 token on the local chain to an ERC-20 token on the remote chain, allowing that token to be
bridged.


```solidity
function mapToken(JBTokenMapping calldata map) public payable override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`map`|`JBTokenMapping`|The local and remote terminal token addresses to map, and minimum amount/gas limits for bridging them.|


### mapTokens

Map multiple ERC-20 tokens on the local chain to ERC-20 tokens on the remote chain, allowing those
tokens to be bridged.


```solidity
function mapTokens(JBTokenMapping[] calldata maps) external payable override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`maps`|`JBTokenMapping[]`|A list of local and remote terminal token addresses to map, and minimum amount/gas limits for bridging them.|


### enableEmergencyHatchFor

Enables the emergency hatch for a list of tokens, allowing users to exit on the chain they deposited on.

*For use when a token or a few tokens are no longer compatible with a bridge.*


```solidity
function enableEmergencyHatchFor(address[] calldata tokens) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokens`|`address[]`|The terminal tokens to enable the emergency hatch for.|


### prepare

Prepare project tokens and the cash out amount backing them to be bridged to the remote chain.

*This adds the tokens and funds to the outbox tree for the `token`. They will be bridged by the next call to
`toRemote` for the same `token`.*


```solidity
function prepare(
    uint256 projectTokenCount,
    address beneficiary,
    uint256 minTokensReclaimed,
    address token
)
    external
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectTokenCount`|`uint256`|The number of project tokens to prepare for bridging.|
|`beneficiary`|`address`|The address of the recipient of the tokens on the remote chain.|
|`minTokensReclaimed`|`uint256`|The minimum amount of terminal tokens to cash out for. If the amount cashed out is less than this, the transaction will revert.|
|`token`|`address`|The address of the terminal token to cash out for.|


### toRemote

Bridge the project tokens, cashed out funds, and beneficiary information for a given `token` to the
remote
chain.

*This sends the outbox root for the specified `token` to the remote chain.*


```solidity
function toRemote(address token) external payable override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The terminal token being bridged.|


### exitThroughEmergencyHatch

Lets user exit on the chain they deposited in a scenario where the bridge is no longer functional.


```solidity
function exitThroughEmergencyHatch(JBClaim calldata claimData) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claimData`|`JBClaim`|The terminal token, merkle tree leaf, and proof for the claim|


### setDeprecation

Set or remove the time after which this sucker will be deprecated, once deprecated the sucker will no
longer be functional and it will let all users exit.


```solidity
function setDeprecation(uint40 timestamp) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`timestamp`|`uint40`|The time after which the sucker will be deprecated. Or `0` to remove the upcoming deprecation.|


### receive

Used to receive cashed out native tokens.


```solidity
receive() external payable;
```

### _addToBalance

Adds funds to the projects balance.


```solidity
function _addToBalance(address token, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The terminal token to add to the project's balance.|
|`amount`|`uint256`|The amount of terminal tokens to add to the project's balance.|


### _handleClaim

The action(s) to perform after a user has succesfully proven their claim.


```solidity
function _handleClaim(
    address terminalToken,
    uint256 terminalTokenAmount,
    uint256 projectTokenAmount,
    address beneficiary
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`terminalToken`|`address`|The terminal token being sucked.|
|`terminalTokenAmount`|`uint256`|The amount of terminal tokens.|
|`projectTokenAmount`|`uint256`|The amount of project tokens.|
|`beneficiary`|`address`|The beneficiary of the project tokens.|


### _insertIntoTree

Inserts a new leaf into the outbox merkle tree for the specified `token`.


```solidity
function _insertIntoTree(
    uint256 projectTokenCount,
    address token,
    uint256 terminalTokenAmount,
    address beneficiary
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectTokenCount`|`uint256`|The amount of project tokens being cashed out.|
|`token`|`address`|The terminal token being cashed out for.|
|`terminalTokenAmount`|`uint256`|The amount of terminal tokens reclaimed by cashing out.|
|`beneficiary`|`address`|The beneficiary of the project tokens on the remote chain.|


### _isRemotePeer

Checks if the `sender` (`_msgSender`) is a valid representative of the remote peer.


```solidity
function _isRemotePeer(address sender) internal virtual returns (bool valid);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The message's sender.|


### _mapToken

Map an ERC-20 token on the local chain to an ERC-20 token on the remote chain, allowing that token to be
bridged or disabled.


```solidity
function _mapToken(JBTokenMapping calldata map, uint256 transportPaymentValue) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`map`|`JBTokenMapping`|The local and remote terminal token addresses to map, and minimum amount/gas limits for bridging them.|
|`transportPaymentValue`|`uint256`|The amount of `msg.value` to send for the token mapping.|


### _pullBackingAssets

Cash out project tokens for terminal tokens.


```solidity
function _pullBackingAssets(
    IERC20 projectToken,
    uint256 count,
    address token,
    uint256 minTokensReclaimed
)
    internal
    virtual
    returns (uint256 reclaimedAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectToken`|`IERC20`|The project token being cashed out.|
|`count`|`uint256`|The number of project tokens to cash out.|
|`token`|`address`|The terminal token to cash out for.|
|`minTokensReclaimed`|`uint256`|The minimum amount of terminal tokens to reclaim. If the amount reclaimed is less than this, the transaction will revert.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimedAmount`|`uint256`|The amount of terminal tokens reclaimed by the cash out.|


### _sendRoot

Send the outbox root for the specified token to the remote peer.

*The call may have a `transportPayment` for bridging native tokens. Require it to be `0` if it is not
needed. Make sure if a value being paid to the bridge is expected to revert if the given value is `0`.*


```solidity
function _sendRoot(uint256 transportPayment, address token, JBRemoteToken memory remoteToken) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`transportPayment`|`uint256`|the amount of `msg.value` that is going to get paid for sending this message. (usually derived from `msg.value`)|
|`token`|`address`|The terminal token to bridge the merkle tree of.|
|`remoteToken`|`JBRemoteToken`|The remote token which the `token` is mapped to.|


### _sendRootOverAMB

Performs the logic to send a message to the peer over the AMB.

*This is chain/sucker/bridge specific logic.*


```solidity
function _sendRootOverAMB(
    uint256 transportPayment,
    uint256 index,
    address token,
    uint256 amount,
    JBRemoteToken memory remoteToken,
    JBMessageRoot memory message
)
    internal
    virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`transportPayment`|`uint256`|The amount of `msg.value` that is going to get paid for sending this message.|
|`index`|`uint256`|The index of the most recent message that is part of the root.|
|`token`|`address`|The terminal token being bridged.|
|`amount`|`uint256`|The amount of terminal tokens being bridged.|
|`remoteToken`|`JBRemoteToken`|The remote token which the terminal token is mapped to.|
|`message`|`JBMessageRoot`|The message/root to send to the remote chain.|


### _maxMessagingDelay

What is the maximum time it takes for a message to be received on the other side.

*Be sure to keep in mind if a message fails having to retry and the time it takes to retry.*


```solidity
function _maxMessagingDelay() internal pure virtual returns (uint40);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint40`|The maximum time it takes for a message to be received on the other side.|


### _validate

Validates a leaf as being in the inbox merkle tree and registers the leaf as executed (to prevent
double-spending).

*Reverts if the leaf is invalid.*


```solidity
function _validate(
    uint256 projectTokenCount,
    address terminalToken,
    uint256 terminalTokenAmount,
    address beneficiary,
    uint256 index,
    bytes32[_TREE_DEPTH] calldata leaves
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectTokenCount`|`uint256`|The number of project tokens which were cashed out.|
|`terminalToken`|`address`|The terminal token that the project tokens were cashed out for.|
|`terminalTokenAmount`|`uint256`|The amount of terminal tokens reclaimed by the cash out.|
|`beneficiary`|`address`|The beneficiary which will receive the project tokens.|
|`index`|`uint256`|The index of the leaf being proved in the terminal token's inbox tree.|
|`leaves`|`bytes32[_TREE_DEPTH]`|The leaves that prove that the leaf at the `index` is in the tree (i.e. the merkle branch that the leaf is on).|


### _validateForEmergencyExit

Validates a leaf as being in the outbox merkle tree and not being send over the amb, and registers the
leaf as executed (to prevent double-spending).

*Reverts if the leaf is invalid.*


```solidity
function _validateForEmergencyExit(
    uint256 projectTokenCount,
    address terminalToken,
    uint256 terminalTokenAmount,
    address beneficiary,
    uint256 index,
    bytes32[_TREE_DEPTH] calldata leaves
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectTokenCount`|`uint256`|The number of project tokens which were cashed out.|
|`terminalToken`|`address`|The terminal token that the project tokens were cashed out for.|
|`terminalTokenAmount`|`uint256`|The amount of terminal tokens reclaimed by the cash out.|
|`beneficiary`|`address`|The beneficiary which will receive the project tokens.|
|`index`|`uint256`|The index of the leaf being proved in the terminal token's inbox tree.|
|`leaves`|`bytes32[_TREE_DEPTH]`|The leaves that prove that the leaf at the `index` is in the tree (i.e. the merkle branch that the leaf is on).|


### _validateBranchRoot

Validates a branch root against the expected root.

*This is a virtual function to allow a tests to override the behavior, it should never be overwritten
otherwise.*


```solidity
function _validateBranchRoot(
    bytes32 expectedRoot,
    uint256 projectTokenCount,
    uint256 terminalTokenAmount,
    address beneficiary,
    uint256 index,
    bytes32[_TREE_DEPTH] calldata leaves
)
    internal
    virtual;
```

## Errors
### JBSucker_BelowMinGas

```solidity
error JBSucker_BelowMinGas(uint256 minGas, uint256 minGasLimit);
```

### JBSucker_InsufficientBalance

```solidity
error JBSucker_InsufficientBalance(uint256 amount, uint256 balance);
```

### JBSucker_InvalidNativeRemoteAddress

```solidity
error JBSucker_InvalidNativeRemoteAddress(address remoteToken);
```

### JBSucker_InvalidProof

```solidity
error JBSucker_InvalidProof(bytes32 root, bytes32 inboxRoot);
```

### JBSucker_LeafAlreadyExecuted

```solidity
error JBSucker_LeafAlreadyExecuted(address token, uint256 index);
```

### JBSucker_ManualNotAllowed

```solidity
error JBSucker_ManualNotAllowed(JBAddToBalanceMode mode);
```

### JBSucker_DeprecationTimestampTooSoon

```solidity
error JBSucker_DeprecationTimestampTooSoon(uint256 givenTime, uint256 minimumTime);
```

### JBSucker_NoTerminalForToken

```solidity
error JBSucker_NoTerminalForToken(uint256 projectId, address token);
```

### JBSucker_NotPeer

```solidity
error JBSucker_NotPeer(address caller);
```

### JBSucker_QueueInsufficientSize

```solidity
error JBSucker_QueueInsufficientSize(uint256 amount, uint256 minimumAmount);
```

### JBSucker_TokenNotMapped

```solidity
error JBSucker_TokenNotMapped(address token);
```

### JBSucker_TokenHasInvalidEmergencyHatchState

```solidity
error JBSucker_TokenHasInvalidEmergencyHatchState(address token);
```

### JBSucker_TokenAlreadyMapped

```solidity
error JBSucker_TokenAlreadyMapped(address localToken, address mappedTo);
```

### JBSucker_UnexpectedMsgValue

```solidity
error JBSucker_UnexpectedMsgValue(uint256 value);
```

### JBSucker_ExpectedMsgValue

```solidity
error JBSucker_ExpectedMsgValue();
```

### JBSucker_InsufficientMsgValue

```solidity
error JBSucker_InsufficientMsgValue(uint256 received, uint256 expected);
```

### JBSucker_ZeroBeneficiary

```solidity
error JBSucker_ZeroBeneficiary();
```

### JBSucker_ZeroERC20Token

```solidity
error JBSucker_ZeroERC20Token();
```

### JBSucker_Deprecated

```solidity
error JBSucker_Deprecated();
```

