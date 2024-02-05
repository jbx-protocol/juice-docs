# isAllowedToSetFirstController

Contract: [`JBDirectory`](/dev/deprecated/v2/contracts/jbdirectory/README.md)‌

Interface: [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md)

**Addresses that can set a project's first controller on their behalf. These addresses/contracts have been vetted and verified by this contract's owner.**

#### Definition

```
/**
  @notice
  Addresses that can set a project's first controller on their behalf. These addresses/contracts have been vetted and verified by this contract's owner.

  _address The address that is either allowed or not.
*/
mapping(address => bool) public override isAllowedToSetFirstController;
```

* Arguments:
  * `_address` is the address that is either allowed or not.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md) interface.

