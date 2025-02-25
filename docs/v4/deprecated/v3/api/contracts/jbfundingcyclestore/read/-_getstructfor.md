# _getStructFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/README.md)​

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Unpack a funding cycle's packed stored values into an easy-to-work-with funding cycle struct.**

#### Definition

```
function _getStructFor(uint256 _projectId, uint256 _configuration)
  private
  view
  returns (JBFundingCycle memory fundingCycle) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funding cycle belongs.
  * `_configuration` is the funding cycle configuration to get the full struct for.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns a [`JBFundingCycle`](/docs/v4/deprecated/v3/api/data-structures/jbfundingcycle.md) struct.

#### Body

1.  If the configuration provided is 0, return an empty funding cycle.

    ```
    // Return an empty funding cycle if the configuration specified is 0.
    if (_configuration == 0) return fundingCycle;
    ```
2.  Set the funding cycle's configuration to the provided value.

    ```
    fundingCycle.configuration = _configuration;
    ```
3.  Get the stored intrinsic properties of the funding cycle. Populate the struct values by unpacking the `uint256`.

    ```
    uint256 _packedIntrinsicProperties = _packedIntrinsicPropertiesOf[_projectId][_configuration];

    // weight in bits 0-87 bits.
    fundingCycle.weight = uint256(uint88(_packedIntrinsicProperties));
    // basedOn in bits 88-143 bits.
    fundingCycle.basedOn = uint256(uint56(_packedIntrinsicProperties >> 88));
    // start in bits 144-199 bits.
    fundingCycle.start = uint256(uint56(_packedIntrinsicProperties >> 144));
    // number in bits 200-255 bits.
    fundingCycle.number = uint256(uint56(_packedIntrinsicProperties >> 200));
    ```

    _Internal references:_

    * [`_packedIntrinsicPropertiesOf`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/properties/-_packedintrinsicpropertiesof.md)
4.  Get the stored user properties of the funding cycle. Populate the struct values by unpacking the `uint256`.

    ```
    uint256 _packedUserProperties = _packedUserPropertiesOf[_projectId][_configuration];

    // ballot in bits 0-159 bits.
    fundingCycle.ballot = IJBFundingCycleBallot(address(uint160(_packedUserProperties)));
    // duration in bits 160-191 bits.
    fundingCycle.duration = uint256(uint32(_packedUserProperties >> 160));
    // discountRate in bits 192-223 bits.
    fundingCycle.discountRate = uint256(uint32(_packedUserProperties >> 192));
    ```

    _Internal references:_

    * [`_packedUserPropertiesOf`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/properties/-_packeduserpropertiesof.md)
5.  Populate the metadata property of the struct by reading from what's stored.

    ```
    fundingCycle.metadata = _metadataOf[_projectId][_configuration];
    ```

    _Internal references:_

    * [`_metadataOf`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/properties/-_metadataof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Unpack a funding cycle's packed stored values into an easy-to-work-with funding cycle struct.

  @param _projectId The ID of the project to which the funding cycle belongs.
  @param _configuration The funding cycle configuration to get the full struct for.

  @return fundingCycle A funding cycle struct.
*/
function _getStructFor(uint256 _projectId, uint256 _configuration)
  private
  view
  returns (JBFundingCycle memory fundingCycle)
{
  // Return an empty funding cycle if the configuration specified is 0.
  if (_configuration == 0) return fundingCycle;

  fundingCycle.configuration = _configuration;

  uint256 _packedIntrinsicProperties = _packedIntrinsicPropertiesOf[_projectId][_configuration];

  // weight in bits 0-87 bits.
  fundingCycle.weight = uint256(uint88(_packedIntrinsicProperties));
  // basedOn in bits 88-143 bits.
  fundingCycle.basedOn = uint256(uint56(_packedIntrinsicProperties >> 88));
  // start in bits 144-199 bits.
  fundingCycle.start = uint256(uint56(_packedIntrinsicProperties >> 144));
  // number in bits 200-255 bits.
  fundingCycle.number = uint256(uint56(_packedIntrinsicProperties >> 200));

  uint256 _packedUserProperties = _packedUserPropertiesOf[_projectId][_configuration];

  // ballot in bits 0-159 bits.
  fundingCycle.ballot = IJBFundingCycleBallot(address(uint160(_packedUserProperties)));
  // duration in bits 160-191 bits.
  fundingCycle.duration = uint256(uint32(_packedUserProperties >> 160));
  // discountRate in bits 192-223 bits.
  fundingCycle.discountRate = uint256(uint32(_packedUserProperties >> 192));

  fundingCycle.metadata = _metadataOf[_projectId][_configuration];
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
