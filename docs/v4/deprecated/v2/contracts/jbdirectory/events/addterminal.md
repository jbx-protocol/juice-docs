# AddTerminal

Emitted from:

* [`_addTerminalIfNeeded`](/docs/v4/deprecated/v2/contracts/jbdirectory/write/-_addterminalifneeded.md)

Definition:

```
event AddTerminal(uint256 indexed projectId, IJBPaymentTerminal indexed terminal, address caller);
```

* `projectId` is the ID of the project that added a terminal.
* `terminal` is the address of the terminal that was added.
* `caller` is the address that issued the transaction within which the event was emitted.
