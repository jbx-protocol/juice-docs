# JBOptimismSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/JBOptimismSucker.sol)

**Inherits:**
[JBSucker](/docs/v4/api/suckers/JBSucker.md), [IJBOptimismSucker](/docs/v4/api/suckers/interfaces/IJBOptimismSucker.md)

A `JBSucker` implementation to suck tokens between two chains connected by an OP Bridge.


## State Variables
### OPBRIDGE
The bridge used to bridge tokens between the local and remote chain.


```solidity
IOPStandardBridge public immutable override OPBRIDGE;
```


### OPMESSENGER
The messenger used to send messages between the local and remote sucker.


```solidity
IOPMessenger public immutable override OPMESSENGER;
```


## Functions
### constructor


```solidity
constructor(
    JBOptimismSuckerDeployer deployer,
    IJBDirectory directory,
    IJBPermissions permissions,
    IJBTokens tokens,
    JBAddToBalanceMode addToBalanceMode,
    address trusted_forwarder
)
    JBSucker(directory, permissions, tokens, addToBalanceMode, trusted_forwarder);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployer`|`JBOptimismSuckerDeployer`|A contract that deploys the clones for this contracts.|
|`directory`|`IJBDirectory`|A contract storing directories of terminals and controllers for each project.|
|`permissions`|`IJBPermissions`|A contract storing permissions.|
|`tokens`|`IJBTokens`|A contract that manages token minting and burning.|
|`addToBalanceMode`|`JBAddToBalanceMode`|The mode of adding tokens to balance.|
|`trusted_forwarder`|`address`||


### peerChainId

Returns the chain on which the peer is located.


```solidity
function peerChainId() external view virtual override returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|chainId of the peer.|


### _isRemotePeer

Checks if the `sender` (`_msgSender()`) is a valid representative of the remote peer.


```solidity
function _isRemotePeer(address sender) internal override returns (bool valid);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The message's sender.|


### _sendRootOverAMB

Use the `OPMESSENGER` to send the outbox tree for the `token` and the corresponding funds to the peer
over the `OPBRIDGE`.


```solidity
function _sendRootOverAMB(
    uint256 transportPayment,
    uint256,
    address token,
    uint256 amount,
    JBRemoteToken memory remoteToken,
    JBMessageRoot memory message
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
|`message`|`JBMessageRoot`||


