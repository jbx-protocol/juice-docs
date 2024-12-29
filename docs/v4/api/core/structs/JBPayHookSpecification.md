# JBPayHookSpecification
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBPayHookSpecification.sol)

A pay hook specification sent from the ruleset's data hook back to the terminal. This specification is
fulfilled by the terminal.

**Notes:**
- member: hook The pay hook to use when fulfilling this specification.

- member: amount The amount to send to the hook.

- member: metadata Metadata to pass the hook.


```solidity
struct JBPayHookSpecification {
    IJBPayHook hook;
    uint256 amount;
    bytes metadata;
}
```

