# IOPMessenger
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IOPMessenger.sol)


## Functions
### xDomainMessageSender


```solidity
function xDomainMessageSender() external returns (address);
```

### bridgeERC20To


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

### sendMessage


```solidity
function sendMessage(address target, bytes memory message, uint32 gasLimit) external payable;
```

