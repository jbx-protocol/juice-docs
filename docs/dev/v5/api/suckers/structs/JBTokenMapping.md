# JBTokenMapping
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBTokenMapping.sol)

**Notes:**
- member: localToken The local token address.

- member: minGas The minimum gas amount to bridge.

- member: remoteToken The remote token address.

- member: minBridgeAmount The minimum bridge amount.


```solidity
struct JBTokenMapping {
    address localToken;
    uint32 minGas;
    address remoteToken;
    uint256 minBridgeAmount;
}
```

