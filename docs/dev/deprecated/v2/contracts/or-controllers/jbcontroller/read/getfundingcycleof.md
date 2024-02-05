# currentFundingCycleOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**A project's funding cycle for the specified configuration along with its metadata.**


### Definition

```
function getFundingCycleOf(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata) { ... }
```

* Arguments:
* `_projectId` is the ID of the project to which the funding cycle belongs.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md) interface.
* The function returns:
  * `fundingCycle` is the funding cycle.
  * `metadata` is the funding cycle's metadata.

#### Body

1.  Get the current funding cycle.

    ```
    fundingCycle = fundingCycleStore.get(_projectId, _configuration);
    ```

    _Internal references:_

    * [`fundingCycleStore`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/fundingcyclestore.md)

    _External references:_

    * [`get`](/dev/deprecated/v2/contracts/jbfundingcyclestore/read/get.md)
2.  Expand the metadata of the funding cycle.

    ```
    metadata = fundingCycle.expandMetadata();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/dev/deprecated/v2/libraries/jbfundingcyclemetadataresolver.md)<br/>
      * `.expandMetadata(...)`

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  A project's funding cycle for the specified configuration along with its metadata.

  @param _projectId The ID of the project to which the funding cycle belongs.

  @return fundingCycle The funding cycle.
  @return metadata The funding cycle's metadata.
*/
function getFundingCycleOf(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata)
{
  fundingCycle = fundingCycleStore.get(_projectId, _configuration);
  metadata = fundingCycle.expandMetadata();
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
