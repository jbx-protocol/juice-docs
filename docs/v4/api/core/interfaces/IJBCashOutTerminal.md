# IJBCashOutTerminal
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBCashOutTerminal.sol)

**Inherits:**
[IJBTerminal](/docs/v4/api/core/interfaces/IJBTerminal.md)

A terminal that can be cashed out from.


## Functions
### cashOutTokensOf


```solidity
function cashOutTokensOf(
    address holder,
    uint256 projectId,
    uint256 cashOutCount,
    address tokenToReclaim,
    uint256 minTokensReclaimed,
    address payable beneficiary,
    bytes calldata metadata
)
    external
    returns (uint256 reclaimAmount);
```

## Events
### HookAfterRecordCashOut

```solidity
event HookAfterRecordCashOut(
    IJBCashOutHook indexed hook,
    JBAfterCashOutRecordedContext context,
    uint256 specificationAmount,
    uint256 fee,
    address caller
);
```

### CashOutTokens

```solidity
event CashOutTokens(
    uint256 indexed rulesetId,
    uint256 indexed rulesetCycleNumber,
    uint256 indexed projectId,
    address holder,
    address beneficiary,
    uint256 cashOutCount,
    uint256 cashOutTaxRate,
    uint256 reclaimAmount,
    bytes metadata,
    address caller
);
```
