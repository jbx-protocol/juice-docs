# hasPermissions

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBOperatorStore`](/dev/api/contracts/jboperatorstore/README.md)​‌

Interface: [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Whether or not an operator has the permission to take certain actions pertaining to the specified domain.**

#### Definition

```
function hasPermissions(
  address _operator,
  address _account,
  uint256 _domain,
  uint256[] calldata _permissionIndexes
) external view override returns (bool) { ... }
```

* `_operator` is the operator to check
* `_account` is the account that has given out permission to the operator.
* `_domain` is the domain that the operator has been given permissions to operate.
* `_permissionIndexes` is an array of permission indexes to check for.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md) interface.
* The function returns a flag indicating whether the operator has all specified permissions.

#### Body

1.  Loop through the provided `_permissionIndexes`.

    ```
    for (uint256 _i; _i < _permissionIndexes.length; ) { ... }
    ```

    1.  Get a reference to the `_permissionIndex` being iterated on.

        ```
        uint256 _permissionIndex = _permissionIndexes[_i];
        ```
    2.  Make sure the `_permissionIndex` is one of the 255 indexes in a `uint256`.

        ```
        if (_permissionIndex > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();
        ```
    3.  If the bit at the specified permission index of the packed permissions of the operator for the specified account and within the specified domain is off, return `false` because all provided permissions are not on.

        ```
        if (((permissionsOf[_operator][_account][_domain] >> _permissionIndex) & 1) == 0)
          return false;
        ```

        _Internal references:_

        * [`permissionsOf`](/dev/api/contracts/jboperatorstore/properties/permissionsof.md)

    4.  Increment the loop counter.

        ```
        unchecked {
          ++_i;
        }
        ```

2.  After the loop, return `true` since the loop checked all specified permissions without returning `false`.

    ```
    return true;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Whether or not an operator has the permission to take certain actions pertaining to the specified domain.

  @param _operator The operator to check.
  @param _account The account that has given out permissions to the operator.
  @param _domain The domain that the operator has been given permissions to operate.
  @param _permissionIndexes An array of permission indexes to check for.

  @return A flag indicating whether the operator has all specified permissions.
*/
function hasPermissions(
  address _operator,
  address _account,
  uint256 _domain,
  uint256[] calldata _permissionIndexes
) external view override returns (bool) {
  for (uint256 _i; _i < _permissionIndexes.length; ) {
    uint256 _permissionIndex = _permissionIndexes[_i];

    if (_permissionIndex > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();

    if (((permissionsOf[_operator][_account][_domain] >> _permissionIndex) & 1) == 0)
      return false;

    unchecked {
      ++_i;
    }
  }
  return true;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                               | Description                                                               |
| ------------------------------------ | ------------------------------------------------------------------------- |
| **`PERMISSION_INDEX_OUT_OF_BOUNDS`** | Thrown if the provided index is more than whats supported in a `uint256`. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
