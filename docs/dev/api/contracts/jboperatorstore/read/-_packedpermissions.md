# _packedPermissions

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBOperatorStore`](/dev/api/contracts/jboperatorstore/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Converts an array of permission indexes to a packed `uint256`.**

#### Definition

```
function _packedPermissions(uint256[] calldata _indexes) private pure returns (uint256 packed) {...}
```

* `_indexes` are the indexes of the permissions to pack.
* The view function is private to the contract.
* The view function does not modify or reference state variables outside the function.
* The function returns the packed value.

#### Body

1.  Loop through the provided indexes.

    ```
    for (uint256 _i; _i < _indexes.length; ) { ... }
    ```

    1.  Get a reference to the permission index being iterated on.

        ```
        uint256 _index = _indexes[_i];
        ```
    2.  Make sure the permission index is one of the 255 indexes in a `uint256`.

        ```
        if (_index > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();
        ```
    3.  Flip the bit at the specified index of the packed value being returned to indicate a truthy permission.

        ```
        // Turn the bit at the index on.
        packed |= 1 << _index;
        ```

    4. Increment the loop counter.

       ```
       unchecked {
        ++_i;
       }
       ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Converts an array of permission indexes to a packed `uint256`.

  @param _indexes The indexes of the permissions to pack.

  @return packed The packed value.
*/
function _packedPermissions(uint256[] calldata _indexes) private pure returns (uint256 packed) {
  for (uint256 _i; _i < _indexes.length; ) {
    uint256 _index = _indexes[_i];

    if (_index > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();

    // Turn the bit at the index on.
    packed |= 1 << _index;

    unchecked {
    ++_i;
    }
  }
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
