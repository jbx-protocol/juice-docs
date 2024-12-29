# JBTerminalConfig
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/structs/JBTerminalConfig.sol)

**Notes:**
- member: terminal The terminal to configure.

- member: accountingContextsToAccept The accounting contexts to accept from the terminal.


```solidity
struct JBTerminalConfig {
    IJBTerminal terminal;
    JBAccountingContext[] accountingContextsToAccept;
}
```

