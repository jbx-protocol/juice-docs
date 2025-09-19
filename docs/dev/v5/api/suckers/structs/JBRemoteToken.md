# JBRemoteToken
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/structs/JBRemoteToken.sol)

A struct that represents a token on the remote chain.

*Invarient: If the `emergencyHatch` is true then the `enabled` is always false.*

**Notes:**
- member: enabled Whether the token is enabled.

- member: emergencyHatchOpened Whether the emergency hatch is opened.

- member: minGas The minimum gas to use when bridging.

- member: addr The address of the token on the remote chain.

- member: minBridgeAmount The minimum amount to bridge.


```solidity
struct JBRemoteToken {
    bool enabled;
    bool emergencyHatch;
    uint32 minGas;
    address addr;
    uint256 minBridgeAmount;
}
```

