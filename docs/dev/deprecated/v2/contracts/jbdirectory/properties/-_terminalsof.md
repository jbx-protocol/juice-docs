# _terminalsOf

Contract: [`JBDirectory`](/dev/deprecated/v2/contracts/jbdirectory/README.md)‌

**For each project ID, the terminals that are currently managing its funds.**

#### Definition

```
/**
  @notice
  For each project ID, the terminals that are currently managing its funds.

  _projectId The ID of the project to get terminals of.
*/
mapping(uint256 => IJBPaymentTerminal[]) private _terminalsOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get terminals of.
* The resulting view function is private to this contract.
