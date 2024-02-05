# tokenOf

Contract: [`JBTokenStore`](/dev/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md)

**Each project's attached token contract.**

#### Definition

```
/**
  @notice
  Each project's attached token contract.

  _projectId The ID of the project to which the token belongs.
*/
mapping(uint256 => IJBToken) public override tokenOf;
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md) interface.
