# setOperator

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBOperatorStore`](/docs/v4/deprecated/v3/api/contracts/jboperatorstore/README.md)​‌

Interface: [`IJBOperatorStore`](/docs/v4/deprecated/v3/api/interfaces/ijboperatorstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Sets permissions for an operator.**

_Only an address can set its own operators._

#### Definition

```
 function setOperator(JBOperatorData calldata _operatorData) external override { ... }
```

* `_operatorData` is the [`JBOperatorData`](/docs/v4/deprecated/v3/api/data-structures/jboperatordata.md) that specifies the params for the operator being set.
* The function can be accessed externally by anyone.
* The function overrides a function definition from the [`IJBOperatorStore`](/docs/v4/deprecated/v3/api/interfaces/ijboperatorstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Pack the provided permissions into a `uint256`. Each bit of the resulting value represents whether or not permission has been granted for that index.

    ```
    // Pack the indexes into a uint256.
    uint256 _packed = _packedPermissions(_operatorData.permissionIndexes);
    ```

    _Internal references:_

    * [`_packedPermissions`](/docs/v4/deprecated/v3/api/contracts/jboperatorstore/read/-_packedpermissions.md)
2.  Store the packed permissions as the permissions of the provided operator, on behalf of the `msg.sender`, specifically for the provided domain.

     ```
     // Store the new value.
     permissionsOf[_operatorData.operator][msg.sender][_operatorData.domain] = _packed;
     ```

     _Internal references:_

     * [`permissionsOf`](/docs/v4/deprecated/v3/api/contracts/jboperatorstore/properties/permissionsof.md)
3.  Emit a `SetOperator` event with the relevant parameters.

     ```
     emit SetOperator(
       _operatorData.operator,
       msg.sender,
       _operatorData.domain,
       _operatorData.permissionIndexes,
       _packed
     );
     ```

     _Event references:_

     * [`SetOperator`](/docs/v4/deprecated/v3/api/contracts/jboperatorstore/events/setoperator.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Sets permissions for an operator.

  @dev
  Only an address can set its own operators.

  @param _operatorData The data that specifies the params for the operator being set.
*/
function setOperator(JBOperatorData calldata _operatorData) external override {
  // Pack the indexes into a uint256.
  uint256 _packed = _packedPermissions(_operatorData.permissionIndexes);

  // Store the new value.
  permissionsOf[_operatorData.operator][msg.sender][_operatorData.domain] = _packed;

  emit SetOperator(
    _operatorData.operator,
    msg.sender,
    _operatorData.domain,
    _operatorData.permissionIndexes,
    _packed
  );
}
```

</TabItem>

<TabItem value="Events" label="Events">

|                                               |                                                                                                                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetOperator`**](/docs/v4/deprecated/v3/api/contracts/jboperatorstore/events/setoperator.md) | <ul><li><code>address indexed operator</code></li><li><code>address indexed account</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256[] permissionIndexes</code></li><li><code>uint256 packed</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
