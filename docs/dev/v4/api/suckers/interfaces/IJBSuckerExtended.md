# IJBSuckerExtended
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/interfaces/IJBSuckerExtended.sol)

**Inherits:**
[IJBSucker](/docs/dev/v4/api/suckers/interfaces/IJBSucker.md)


## Functions
### enableEmergencyHatchFor


```solidity
function enableEmergencyHatchFor(address[] calldata tokens) external;
```

### exitThroughEmergencyHatch


```solidity
function exitThroughEmergencyHatch(JBClaim calldata claimData) external;
```

### setDeprecation


```solidity
function setDeprecation(uint40 timestamp) external;
```

## Events
### EmergencyHatchOpened

```solidity
event EmergencyHatchOpened(address[] tokens, address caller);
```

### DeprecationTimeUpdated

```solidity
event DeprecationTimeUpdated(uint40 timestamp, address caller);
```

