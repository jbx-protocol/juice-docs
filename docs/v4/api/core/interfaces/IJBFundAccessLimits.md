# IJBFundAccessLimits
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBFundAccessLimits.sol)


## Functions
### payoutLimitOf


```solidity
function payoutLimitOf(
    uint256 projectId,
    uint256 rulesetId,
    address terminal,
    address token,
    uint256 currency
)
    external
    view
    returns (uint256 payoutLimit);
```

### payoutLimitsOf


```solidity
function payoutLimitsOf(
    uint256 projectId,
    uint256 rulesetId,
    address terminal,
    address token
)
    external
    view
    returns (JBCurrencyAmount[] memory payoutLimits);
```

### surplusAllowanceOf


```solidity
function surplusAllowanceOf(
    uint256 projectId,
    uint256 rulesetId,
    address terminal,
    address token,
    uint256 currency
)
    external
    view
    returns (uint256 surplusAllowance);
```

### surplusAllowancesOf


```solidity
function surplusAllowancesOf(
    uint256 projectId,
    uint256 rulesetId,
    address terminal,
    address token
)
    external
    view
    returns (JBCurrencyAmount[] memory surplusAllowances);
```

### setFundAccessLimitsFor


```solidity
function setFundAccessLimitsFor(
    uint256 projectId,
    uint256 rulesetId,
    JBFundAccessLimitGroup[] memory fundAccessLimitGroups
)
    external;
```

## Events
### SetFundAccessLimits

```solidity
event SetFundAccessLimits(
    uint256 indexed rulesetId, uint256 indexed projectId, JBFundAccessLimitGroup fundAccessLimitGroup, address caller
);
```
