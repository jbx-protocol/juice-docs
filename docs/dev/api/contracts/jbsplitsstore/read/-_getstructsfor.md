# _getStructsFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSplitsStore`](/dev/api/contracts/jbsplitsstore/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Unpack splits' packed stored values into easy-to-work-with split structs.**

#### Definition

```
function _getStructsFor(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) private view returns (JBSplit[] memory) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get splits for.
  * `_domain` is an identifier within which the returned splits should be considered active.
  * `_group` is the identifying group of the splits.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns an array of [`JBSplit`](/dev/api/data-structures/jbsplit.md)s.

#### Body

1.  Get a reference to the expected number of splits for the specified domain and group.

    ```
    // Get a reference to the number of splits that need to be added to the returned array.
    uint256 _splitCount = _splitCountOf[_projectId][_domain][_group];
    ```

    _Internal references:_

    * [`_splitCountOf`](/dev/api/contracts/jbsplitsstore/properties/-_splitcountof.md)

2.  Inititalize an array of [`JBSplit`](/dev/api/data-structures/jbsplit.md) with length equal to the number of splits expected.

    ```
    // Initialize an array to be returned that has the set length.
    JBSplit[] memory _splits = new JBSplit[](_splitCount);
    ```

3.  For each index, parse out the packed split parts into [`JBSplit`](/dev/api/data-structures/jbsplit.md) structs and add to the array. The packed splits are stored in two different `uint256` slots, the second of which contains info that is populated way less frequently.

    ```
    // Loop through each split and unpack the values into structs.
    for (uint256 _i; _i < _splitCount; ) {
      // Get a reference to the fist packed data.
      uint256 _packedSplitPart1 = _packedSplitParts1Of[_projectId][_domain][_group][_i];

      // Store the first spit part.
      JBSplit memory _split;

      // prefer claimed in bit 0.
      _split.preferClaimed = _packedSplitPart1 & 1 == 1;
      // prefer add to balance in bit 1.
      _split.preferAddToBalance = (_packedSplitPart1 >> 1) & 1 == 1;
      // percent in bits 2-33.
      _split.percent = uint256(uint32(_packedSplitPart1 >> 2));
      // projectId in bits 32-89.
      _split.projectId = uint256(uint56(_packedSplitPart1 >> 34));
      // beneficiary in bits 90-249.
      _split.beneficiary = payable(address(uint160(_packedSplitPart1 >> 90)));

      // Get a reference to the second packed data.
      uint256 _packedSplitPart2 = _packedSplitParts2Of[_projectId][_domain][_group][_i];

      // If there's anything in it, unpack.
      if (_packedSplitPart2 > 0) {
        // Locked until in bits 0-47.
        _split.lockedUntil = uint256(uint48(_packedSplitPart2));
        // Locked until in bits 48-207.
        _split.allocator = IJBSplitAllocator(address(uint160(_packedSplitPart2 >> 48)));
      }

      // Add the split to the value being returned.
      _splits[_i] = _split;

      unchecked {
        ++_i;
      }
    }
    ```

    _Internal references:_

    * [`_packedSplitParts1Of`](/dev/api/contracts/jbsplitsstore/properties/-_packedsplitparts1of.md)
    * [`_packedSplitParts2Of`](/dev/api/contracts/jbsplitsstore/properties/-_packedsplitparts2of.md)

4.  Return the array of splits.

    ```
    return _splits;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Unpack splits' packed stored values into easy-to-work-with split structs.

  @param _projectId The ID of the project to which the split belongs.
  @param _domain The identifier within which the returned splits should be considered active.
  @param _group The identifying group of the splits.

  @return splits The split structs.
*/
function _getStructsFor(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) private view returns (JBSplit[] memory) {
  // Get a reference to the number of splits that need to be added to the returned array.
  uint256 _splitCount = _splitCountOf[_projectId][_domain][_group];

  // Initialize an array to be returned that has the set length.
  JBSplit[] memory _splits = new JBSplit[](_splitCount);

  // Loop through each split and unpack the values into structs.
  for (uint256 _i; _i < _splitCount; ) {
    // Get a reference to the fist packed data.
    uint256 _packedSplitPart1 = _packedSplitParts1Of[_projectId][_domain][_group][_i];

    // Populate the split struct.
    JBSplit memory _split;

    // prefer claimed in bit 0.
    _split.preferClaimed = _packedSplitPart1 & 1 == 1;
    // prefer add to balance in bit 1.
    _split.preferAddToBalance = (_packedSplitPart1 >> 1) & 1 == 1;
    // percent in bits 2-33.
    _split.percent = uint256(uint32(_packedSplitPart1 >> 2));
    // projectId in bits 32-89.
    _split.projectId = uint256(uint56(_packedSplitPart1 >> 34));
    // beneficiary in bits 90-249.
    _split.beneficiary = payable(address(uint160(_packedSplitPart1 >> 90)));

    // Get a reference to the second packed data.
    uint256 _packedSplitPart2 = _packedSplitParts2Of[_projectId][_domain][_group][_i];

    // If there's anything in it, unpack.
    if (_packedSplitPart2 > 0) {
      // Locked until in bits 0-47.
      _split.lockedUntil = uint256(uint48(_packedSplitPart2));
      // Locked until in bits 48-207.
      _split.allocator = IJBSplitAllocator(address(uint160(_packedSplitPart2 >> 48)));
    }

    // Add the split to the value being returned.
    _splits[_i] = _split;

    unchecked {
      ++_i;
    }
  }

  return _splits;
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
