# IArbL1GatewayRouter
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IArbL1GatewayRouter.sol)


## Functions
### outboundTransferCustomRefund


```solidity
function outboundTransferCustomRefund(
    address token,
    address refundTo,
    address to,
    uint256 amount,
    uint256 maxGas,
    uint256 gasPriceBid,
    bytes calldata data
)
    external
    payable
    returns (bytes memory);
```

