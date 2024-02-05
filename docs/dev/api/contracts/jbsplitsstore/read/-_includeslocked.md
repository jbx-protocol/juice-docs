# _includesLocked

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSplitsStore`](/dev/api/contracts/jbsplitsstore/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**A flag indiciating if the provided splits array includes the locked split.**

#### Definition

```
function _includesLocked(JBSplit[] memory _splits, JBSplit memory _lockedSplit)
  private
  pure
  returns (bool) { ... }
```

* Arguments:
  * `_splits` is the array of splits to check within.
  * `_lockedSplit` is the locked split.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns a flag indicating if the `_lockedSplit` is contained in the `_splits`.

#### Body

1.  Keep a reference to the number of splits.

    ```
    // Keep a reference to the number of splits.
    uint256 _numberOfSplits = _splits.length;
    ```

2.  Iterate through each split. The only property of a locked split that can have changed is its locked deadline, which can be extended. Return true if the locked split is included.

    ```
    for (uint256 _i; _i < _numberOfSplits; ) {
      // Check for sameness.
      if (
        _splits[_i].percent == _lockedSplit.percent &&
        _splits[_i].beneficiary == _lockedSplit.beneficiary &&
        _splits[_i].allocator == _lockedSplit.allocator &&
        _splits[_i].projectId == _lockedSplit.projectId &&
        _splits[_i].preferClaimed == _lockedSplit.preferClaimed &&
        _splits[_i].preferAddToBalance == _lockedSplit.preferAddToBalance &&
        // Allow lock extention.
        _splits[_i].lockedUntil >= _lockedSplit.lockedUntil
      ) return true;

      unchecked {
        ++_i;
      }
    }
    ```

3.  Returns false if the locked split is not included.

    ```
    return false;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  A flag indiciating if the provided splits array includes the locked split.

  @param _splits The array of splits to check within.
  @param _lockedSplit The locked split.

  @return A flag indicating if the `_lockedSplit` is contained in the `_splits`.
*/
function _includesLocked(JBSplit[] memory _splits, JBSplit memory _lockedSplit)
  private
  pure
  returns (bool)
{
  // Keep a reference to the number of splits.
  uint256 _numberOfSplits = _splits.length;

  for (uint256 _i; _i < _numberOfSplits; ) {
    // Check for sameness.
    if (
      _splits[_i].percent == _lockedSplit.percent &&
      _splits[_i].beneficiary == _lockedSplit.beneficiary &&
      _splits[_i].allocator == _lockedSplit.allocator &&
      _splits[_i].projectId == _lockedSplit.projectId &&
      _splits[_i].preferClaimed == _lockedSplit.preferClaimed &&
      _splits[_i].preferAddToBalance == _lockedSplit.preferAddToBalance &&
      // Allow lock extention.
      _splits[_i].lockedUntil >= _lockedSplit.lockedUntil
    ) return true;

    unchecked {
      ++_i;
    }
  }

  return false;
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
