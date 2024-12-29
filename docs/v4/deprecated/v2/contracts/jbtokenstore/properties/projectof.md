# projectOf

Contract: [`JBTokenStore`](/v4/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/v4/deprecated/v2/interfaces/ijbtokenstore.md)

**The ID of the project that each token belongs to.**

#### Definition

```
/**
  @notice
  The ID of the project that each token belongs to.

  _token The token to check the project association of.
*/
mapping(IJBToken => uint256) public override projectOf;
```

* Arguments:
  * `_token` is token to check the project association of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/v4/deprecated/v2/interfaces/ijbtokenstore.md) interface.
