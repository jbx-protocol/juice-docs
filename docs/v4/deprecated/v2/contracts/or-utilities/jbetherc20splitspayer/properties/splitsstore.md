# splitStore

Contract: [`JBETHERC20SplitsPayer`](/docs/v4/deprecated/v2/contracts/or-utilities/jbetherc20splitspayer/README.md)

Interface: [`IJBSplitsPayer`](/docs/v4/deprecated/v2/interfaces/ijbsplitspayer.md)

**The contract that stores splits for each project.**

#### Definition

```
/**
  @notice
  The contract that stores splits for each project.
*/
IJBSplitsStore public immutable override splitsStore;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSplitsPayer`](/docs/v4/deprecated/v2/interfaces/ijbsplitspayer.md) interface.
