# JBArbitrumSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/JBArbitrumSucker.sol)

**Inherits:**
[JBSucker](/docs/v4/api/suckers/JBSucker.md), [IJBArbitrumSucker](/docs/v4/api/suckers/interfaces/IJBArbitrumSucker.md)

A `JBSucker` implementation to suck tokens between two chains connected by an Arbitrum bridge.


## State Variables
### ARBINBOX
The inbox used to send messages between the local and remote sucker.


```solidity
IInbox public immutable override ARBINBOX;
```


### GATEWAYROUTER
The gateway router for the specific chain


```solidity
IArbGatewayRouter public immutable override GATEWAYROUTER;
```


### LAYER
The layer that this contract is on.


```solidity
JBLayer public immutable override LAYER;
```


## Functions
### constructor


```solidity
constructor(
    JBArbitrumSuckerDeployer deployer,
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
|`deployer`|`JBArbitrumSuckerDeployer`||
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
function _isRemotePeer(address sender) internal view override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The message's sender.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|valid A flag if the sender is a valid representative of the remote peer.|


### _sendRootOverAMB

Uses the L1/L2 gateway to send the root and assets over the bridge to the peer.


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


### _toL1

Bridge the `token` and data to the remote L1 chain.


```solidity
function _toL1(address token, uint256 amount, bytes memory data, JBRemoteToken memory remoteToken) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The token to bridge.|
|`amount`|`uint256`|The amount of tokens to bridge.|
|`data`|`bytes`|The calldata to send to the remote chain. This calls `JBSucker.fromRemote` on the remote peer.|
|`remoteToken`|`JBRemoteToken`|Information about the remote token to bridged to.|


### _toL2

Bridge the `token` and data to the remote L2 chain.


```solidity
function _toL2(
    address token,
    uint256 transportPayment,
    uint256 amount,
    bytes memory data,
    JBRemoteToken memory remoteToken
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The token to bridge.|
|`transportPayment`|`uint256`||
|`amount`|`uint256`|The amount of tokens to bridge.|
|`data`|`bytes`|The calldata to send to the remote chain. This calls `JBSucker.fromRemote` on the remote peer.|
|`remoteToken`|`JBRemoteToken`||


## Errors
### JBArbitrumSucker_ChainNotSupported

```solidity
error JBArbitrumSucker_ChainNotSupported(uint256 chainId);
```

### JBArbitrumSucker_NotEnoughGas

```solidity
error JBArbitrumSucker_NotEnoughGas(uint256 payment, uint256 cost);
```

