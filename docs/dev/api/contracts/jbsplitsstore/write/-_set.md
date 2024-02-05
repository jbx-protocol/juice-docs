# _set

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSplitsStore`](/dev/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/dev/api/interfaces/ijbsplitsstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Sets a project's splits.**

_The new splits must include any currently set splits that are locked._

#### Definition

```
function _set(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group,
  JBSplit[] memory _splits
) internal { ... }
```

* Arguments:
  * `_projectId` is the ID of the project for which splits are being added.
  * `_domain` is an identifier within which the splits should be considered active.
  * `_group` is an identifier between of splits being set. All splits within this `_group` must add up to within 100%.
  * `_splits` are the [`JBSplit`](/dev/api/data-structures/jbsplit.md)s to set.
* The resulting function is internal to this contract and its inheriters.
* The function doesn't return anything.

#### Body

1.  Get a reference to the current splits set for the specified project's domain, within the specified group.

    ```
    // Get a reference to the project's current splits.
    JBSplit[] memory _currentSplits = _getStructsFor(_projectId, _domain, _group);
    ```

    _Internal references:_

    * [`_getStructsFor`](/dev/api/contracts/jbsplitsstore/read/-_getstructsfor.md)

2.  Keep a reference to the number of current splits.

    ```
    // Keep a reference to the number of splits.
    uint256 _currentSplitsLength = _currentSplits.length;
    ```

3.  Loop through each current split to make sure the new splits being set respect any current split bound by a lock constraint.

    ```
    // Check to see if all locked splits are included.
    for (uint256 _i; _i < _currentSplitsLength; ) {
    ```

    1.  Make sure the current split isn't locked if it's being removed.

        ```
        if (
          block.timestamp < _currentSplits[_i].lockedUntil &&
          !_includesLocked(_splits, _currentSplits[_i])
        ) revert PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED();
        ```

        _Internal references:_

        * [`_includesLocked`](/dev/api/contracts/jbsplitsstore/read/-_includeslocked.md)

    2.  Increment the loop counter.

        ```
        unchecked {
          ++_i;
        }
        ```

4.  Store a local variable to keep track of all the percents from the splits.

    ```
    // Add up all the percents to make sure they cumulative are under 100%.
    uint256 _percentTotal;
    ```

5.  Keep a reference to the number of splits being set.

    ```
    // Keep a reference to the number of splits.
    uint256 _splitsLength = _splits.length;
    ```

6.  Loop through each newly provided splits to validate the provided properties.

    ```
    for (uint256 _i; _i < _splitsLength; ) { ... }
    ```

    1.  Check that the percent for the current split is not zero.

        ```
        // The percent should be greater than 0.
        if (_splits[_i].percent == 0) revert INVALID_SPLIT_PERCENT();
        ```
    2.  Check that the ID of the project for the current split is within the max value that can be packed.

        ```
        // ProjectId should be within a uint56
        if (_splits[_i].projectId > type(uint56).max) revert INVALID_PROJECT_ID();
        ```
    3.  Increment the total percents that have been accumulated so far.

        ```
        // Add to the total percents.
        _percentTotal = _percentTotal + _splits[_i].percent;
        ```
    4.  Make sure the accumulated percents are under 100%.

        ```
        // Validate the total does not exceed the expected value.
        if (_percentTotal > JBConstants.SPLITS_TOTAL_PERCENT) revert INVALID_TOTAL_PERCENT();
        ```

        _Library references:_

        * [`JBConstants`](/dev/api/libraries/jbconstants.md)
          * `.SPLITS_TOTAL_PERCENT`
    5.  Pack common split properties into a storage slot.

        ```
        // Pack the first split part properties.
        uint256 _packedSplitParts1;

        // prefer claimed in bit 0.
        if (_splits[_i].preferClaimed) _packedSplitParts1 = 1;
        // prefer add to balance in bit 1.
        if (_splits[_i].preferAddToBalance) _packedSplitParts1 |= 1 << 1;
        // percent in bits 2-33.
        _packedSplitParts1 |= _splits[_i].percent << 2;
        // projectId in bits 32-89.
        _packedSplitParts1 |= _splits[_i].projectId << 34;
        // beneficiary in bits 90-249.
        _packedSplitParts1 |= uint256(uint160(address(_splits[_i].beneficiary))) << 90;

        // Store the first split part.
        _packedSplitParts1Of[_projectId][_domain][_group][_i] = _packedSplitParts1;
        ```

        _Internal references:_

        * [`_packedSplitParts1Of`](/dev/api/contracts/jbsplitsstore/properties/-_packedsplitparts1of.md)
    6.  Pack less common split properties into another storage slot if needed. Otherwise, delete any content in storage at the index being iterated on.

       ```
       // If there's data to store in the second packed split part, pack and store.
       if (_splits[_i].lockedUntil > 0 || _splits[_i].allocator != IJBSplitAllocator(address(0))) {
         // Locked until should be within a uint48
         if (_splits[_i].lockedUntil > type(uint48).max) revert INVALID_LOCKED_UNTIL();

          // lockedUntil in bits 0-47.
          uint256 _packedSplitParts2 = uint48(_splits[_i].lockedUntil);
          // allocator in bits 48-207.
          _packedSplitParts2 |= uint256(uint160(address(_splits[_i].allocator))) << 48;

          // Store the second split part.
         _packedSplitParts2Of[_projectId][_domain][_group][_i] = _packedSplitParts2;

         // Otherwise if there's a value stored in the indexed position, delete it.
       } else if (_packedSplitParts2Of[_projectId][_domain][_group][_i] > 0)
         delete _packedSplitParts2Of[_projectId][_domain][_group][_i];
       ```

       _Internal references:_

       * [`_packedSplitParts2Of`](/dev/api/contracts/jbsplitsstore/properties/-_packedsplitparts2of.md)
    7.  For each added split, emit a `SetSplit` event with all relevant parameters.

        ```
        emit SetSplit(_projectId, _domain, _group, _splits[_i], msg.sender);
        ```

        _Event references:_

        * [`SetSplit`](/dev/api/contracts/jbsplitsstore/events/setsplit.md)

    8.  Increment the loop counter.

        ```
        unchecked {
          ++_i;
        }
        ```

7.  Store the new array length.

    ```
    // Set the new length of the splits.
    _splitCountOf[_projectId][_domain][_group] = _splitsLength;
    ```

    _Internal references:_

    * [`_splitCountOf`](/dev/api/contracts/jbsplitsstore/properties/-_splitcountof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Sets a project's splits.

  @dev
  The new splits must include any currently set splits that are locked.

  @param _projectId The ID of the project for which splits are being added.
  @param _domain An identifier within which the splits should be considered active.
  @param _group An identifier between of splits being set. All splits within this _group must add up to within 100%.
  @param _splits The splits to set.
*/
function _set(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group,
  JBSplit[] memory _splits
) internal {
  // Get a reference to the project's current splits.
  JBSplit[] memory _currentSplits = _getStructsFor(_projectId, _domain, _group);

  // Keep a reference to the number of splits.
  uint256 _currentSplitsLength = _currentSplits.length;

  // Check to see if all locked splits are included.
  for (uint256 _i; _i < _currentSplitsLength; ) {
    // If not locked, continue.
    if (
      block.timestamp < _currentSplits[_i].lockedUntil &&
      !_includesLocked(_splits, _currentSplits[_i])
    ) revert PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED();

    unchecked {
      ++_i;
    }
  }

  // Add up all the percents to make sure they cumulatively are under 100%.
  uint256 _percentTotal;

  // Keep a reference to the number of splits.
  uint256 _splitsLength = _splits.length;

  for (uint256 _i; _i < _splitsLength; ) {
    // The percent should be greater than 0.
    if (_splits[_i].percent == 0) revert INVALID_SPLIT_PERCENT();

    // ProjectId should be within a uint56
    if (_splits[_i].projectId > type(uint56).max) revert INVALID_PROJECT_ID();

    // Add to the total percents.
    _percentTotal = _percentTotal + _splits[_i].percent;

    // Validate the total does not exceed the expected value.
    if (_percentTotal > JBConstants.SPLITS_TOTAL_PERCENT) revert INVALID_TOTAL_PERCENT();

    uint256 _packedSplitParts1;

    // prefer claimed in bit 0.
    if (_splits[_i].preferClaimed) _packedSplitParts1 = 1;
    // prefer add to balance in bit 1.
    if (_splits[_i].preferAddToBalance) _packedSplitParts1 |= 1 << 1;
    // percent in bits 2-33.
    _packedSplitParts1 |= _splits[_i].percent << 2;
    // projectId in bits 32-89.
    _packedSplitParts1 |= _splits[_i].projectId << 34;
    // beneficiary in bits 90-249.
    _packedSplitParts1 |= uint256(uint160(address(_splits[_i].beneficiary))) << 90;

    // Store the first split part.
    _packedSplitParts1Of[_projectId][_domain][_group][_i] = _packedSplitParts1;

    // If there's data to store in the second packed split part, pack and store.
    if (_splits[_i].lockedUntil > 0 || _splits[_i].allocator != IJBSplitAllocator(address(0))) {
      // Locked until should be within a uint48
      if (_splits[_i].lockedUntil > type(uint48).max) revert INVALID_LOCKED_UNTIL();

      // lockedUntil in bits 0-47.
      uint256 _packedSplitParts2 = uint48(_splits[_i].lockedUntil);
      // allocator in bits 48-207.
      _packedSplitParts2 |= uint256(uint160(address(_splits[_i].allocator))) << 48;

      // Store the second split part.
      _packedSplitParts2Of[_projectId][_domain][_group][_i] = _packedSplitParts2;

      // Otherwise if there's a value stored in the indexed position, delete it.
    } else if (_packedSplitParts2Of[_projectId][_domain][_group][_i] > 0)
      delete _packedSplitParts2Of[_projectId][_domain][_group][_i];

    emit SetSplit(_projectId, _domain, _group, _splits[_i], msg.sender);

    unchecked {
      ++_i;
    }
  }

  // Set the new length of the splits.
  _splitCountOf[_projectId][_domain][_group] = _splitsLength;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED`**    | Thrown if the splits that are being set override some splits that are locked.   |
| **`INVALID_PROJECT_ID`**                     | Thrown if the split has a project ID that wont fit in its packed storage slot.  |
| **`INVALID_SPLIT_PERCENT`**                  | Thrown if the split has specified a percent of 0.                               |
| **`INVALID_TOTAL_PERCENT`**                  | Thrown if the split percents add up more than 100%.                             |
| **`INVALID_LOCKED_UNTIL`**                   | Thrown if the split has a lockedUntil that wont fit in its packed storage slot. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                    | Data                                                                                                                                                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetSplit`**](/dev/api/contracts/jbsplitsstore/events/setsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/dev/api/data-structures/jbsplit.md) split</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
