# splitsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSplitsStore`](/docs/v4/deprecated/v3/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitsstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Get all splits for the specified project ID, within the specified domain, for the specified group.**

#### Definition

```
function splitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) external view override returns (JBSplit[] memory)  { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get splits for.
  * `_domain` is an identifier within which the returned splits should be considered active.
  * `_group` is the identifying group of the splits.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBSplitsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitsstore.md) interface.
* The function returns an array of all [`JBSplit`](/docs/v4/deprecated/v3/api/data-structures/jbsplit.md)s for the project.

#### Body

1.  This function just reads and returns the splits of the project, within the specified domain, for the specified group.

    ```
    return _getStructsFor(_projectId, _domain, _group);
    ```

    _Internal references:_

    * [`_getStructsFor`](/docs/v4/deprecated/v3/api/contracts/jbsplitsstore/read/-_getstructsfor.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Get all splits for the specified project ID, within the specified domain, for the specified group.

  @param _projectId The ID of the project to get splits for.
  @param _domain An identifier within which the returned splits should be considered active.
  @param _group The identifying group of the splits.

  @return An array of all splits for the project.
*/
function splitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) external view override returns (JBSplit[] memory) {
  return _getStructsFor(_projectId, _domain, _group);
}
```

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
