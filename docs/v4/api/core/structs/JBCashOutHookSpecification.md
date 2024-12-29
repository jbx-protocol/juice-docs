# JBCashOutHookSpecification
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBCashOutHookSpecification.sol)

A cash out hook specification sent from the ruleset's data hook back to the terminal. This specification is
fulfilled by the terminal.

**Notes:**
- member: hook The cash out hook to use when fulfilling this specification.

- member: amount The amount to send to the hook.

- member: metadata Metadata to pass to the hook.


```solidity
struct JBCashOutHookSpecification {
    IJBCashOutHook hook;
    uint256 amount;
    bytes metadata;
}
```

