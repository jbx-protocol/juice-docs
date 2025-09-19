# IOPStandardBridge
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IOPStandardBridge.sol)


## Functions
### bridgeERC20To

Sends ERC20 tokens to a receiver's address on the other chain. Note that if the
ERC20 token on the other chain does not recognize the local token as the correct
pair token, the ERC20 bridge will fail and the tokens will be returned to sender on
this chain.


```solidity
function bridgeERC20To(
    address localToken,
    address remoteToken,
    address to,
    uint256 amount,
    uint32 minGasLimit,
    bytes calldata extraData
)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`localToken`|`address`| Address of the ERC20 on this chain.|
|`remoteToken`|`address`|Address of the corresponding token on the remote chain.|
|`to`|`address`|         Address of the receiver.|
|`amount`|`uint256`|     Amount of local tokens to deposit.|
|`minGasLimit`|`uint32`|Minimum amount of gas that the bridge can be relayed with.|
|`extraData`|`bytes`|  Extra data to be sent with the transaction. Note that the recipient will not be triggered with this data, but it will be emitted and can be used to identify the transaction.|


