# JBCCIPSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/JBCCIPSucker.sol)

**Inherits:**
[JBSucker](/docs/dev/v4/api/suckers/JBSucker.md), IAny2EVMMessageReceiver

A `JBSucker` implementation to suck tokens between chains with Chainlink CCIP


## State Variables
### CCIP_ROUTER

```solidity
ICCIPRouter public immutable CCIP_ROUTER;
```


### REMOTE_CHAIN_ID

```solidity
uint256 public immutable REMOTE_CHAIN_ID;
```


### REMOTE_CHAIN_SELECTOR

```solidity
uint64 public immutable REMOTE_CHAIN_SELECTOR;
```


## Functions
### constructor


```solidity
constructor(
    JBCCIPSuckerDeployer deployer,
    IJBDirectory directory,
    IJBTokens tokens,
    IJBPermissions permissions,
    JBAddToBalanceMode addToBalanceMode,
    address trusted_forwarder
)
    JBSucker(directory, permissions, tokens, addToBalanceMode, trusted_forwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`JBCCIPSuckerDeployer`|A contract that deploys the clones for this contracts.|
|`directory`|`IJBDirectory`|A contract storing directories of terminals and controllers for each project.|
|`tokens`|`IJBTokens`|A contract that manages token minting and burning.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`addToBalanceMode`|`JBAddToBalanceMode`|The mode of adding tokens to balance.|
|`trusted_forwarder`|`address`||


### peerChainId

Returns the chain on which the peer is located.


```solidity
function peerChainId() external view virtual override returns (uint256 chainId);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`chainId`|`uint256`|of the peer.|


### getRouter

Return the current router


```solidity
function getRouter() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|CCIP router address|


### supportsInterface

IERC165 supports an interfaceId

*Should indicate whether the contract implements IAny2EVMMessageReceiver
e.g. return interfaceId == type(IAny2EVMMessageReceiver).interfaceId || interfaceId == type(IERC165).interfaceId
This allows CCIP to check if ccipReceive is available before calling it.
If this returns false or reverts, only tokens are transferred to the receiver.
If this returns true, tokens are transferred and ccipReceive is called atomically.
Additionally, if the receiver address does not have code associated with
it at the time of execution (EXTCODESIZE returns 0), only tokens will be transferred.*


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`interfaceId`|`bytes4`|The interfaceId to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true if the interfaceId is supported|


### ccipReceive

The entrypoint for the CCIP router to call. This function should
never revert, all errors should be handled internally in this contract.

*Extremely important to ensure only router calls this.*


```solidity
function ccipReceive(Client.Any2EVMMessage calldata any2EvmMessage) external override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`any2EvmMessage`|`Client.Any2EVMMessage`|The message to process.|


### _isRemotePeer

Unused in this context.


```solidity
function _isRemotePeer(address sender) internal view override returns (bool _valid);
```

### _sendRootOverAMB




```solidity
function _sendRootOverAMB(
    uint256 transportPayment,
    uint256,
    address token,
    uint256 amount,
    JBRemoteToken memory remoteToken,
    JBMessageRoot memory sucker_message
)
    internal
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`transportPayment`|`uint256`|the amount of `msg.value` that is going to get paid for sending this message.|
|`<none>`|`uint256`||
|`token`|`address`|The token to bridge the outbox tree for.|
|`amount`|`uint256`||
|`remoteToken`|`JBRemoteToken`|Information about the remote token being bridged to.|
|`sucker_message`|`JBMessageRoot`||


### _validateTokenMapping

Allow sucker implementations to add/override mapping rules to suite their specific needs.


```solidity
function _validateTokenMapping(JBTokenMapping calldata map) internal pure virtual override;
```

## Errors
### JBCCIPSucker_FailedToRefundFee

```solidity
error JBCCIPSucker_FailedToRefundFee();
```

### JBCCIPSucker_InvalidRouter

```solidity
error JBCCIPSucker_InvalidRouter(address router);
```

### JBCCIPSucker_UnexpectedAmountOfTokens

```solidity
error JBCCIPSucker_UnexpectedAmountOfTokens(uint256 nOfTokens);
```

