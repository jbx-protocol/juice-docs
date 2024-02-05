# _deriveWeightFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The accumulated weight change since the specified funding cycle.**

#### Definition

```
function _deriveWeightFrom(JBFundingCycle memory _baseFundingCycle, uint256 _start)
  private
  pure
  returns (uint256 weight) { ... }
```

* Arguments:
  * `_baseFundingCycle` is The [`JBFundingCycle`](/dev/api/data-structures/jbfundingcycle.md) to base the calculation on.
  * `_start` is the start time of the funding cycle to derive a number for.
* The view function is private to this contract.
* The function does not alter state on the blockchain.
* The function returns the derived weight, as a fixed point number with 18 decimals.

#### Body

1.  If the base funding cycle has no duration, the derived weight should be calculated from it no matter how much time has passed since it was active. The discount rate property in a [`JBFundingCycle`](/dev/api/data-structures/jbfundingcycle.md) is out of [`JBConstants.MAX_DISCOUNT_RATE`](/dev/api/libraries/jbconstants.md).

    ```
    // A subsequent cycle to one with a duration of 0 should have the next possible weight.
    if (_baseFundingCycle.duration == 0)
      return
        PRBMath.mulDiv(
          _baseFundingCycle.weight,
          JBConstants.MAX_DISCOUNT_RATE - _baseFundingCycle.discountRate,
          JBConstants.MAX_DISCOUNT_RATE
        );
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/dev/api/libraries/jbconstants.md)
      * `.MAX_DISCOUNT_RATE`
2.  The calculations that follow will progressively apply discount rates to the base funding cycle's weight to arrive at the correct weight to return.

    ```
    // The weight should be based off the base funding cycle's weight.
    weight = _baseFundingCycle.weight;
    ```
3.  If the base doesn't have a discount rate, the original weight won't change and should be returned.

    ```
    // If the discount is 0, the weight doesn't change.
    if (_baseFundingCycle.discountRate == 0) return weight;
    ```
4.  Get a reference to how long after the base funding cycle's start the specified start time is.

    ```
    // The difference between the start of the base funding cycle and the proposed start.
    uint256 _startDistance = _start - _baseFundingCycle.start;
    ```
5.  Apply the base funding cycle's discount rate. Apply the rate as many times as there have been cycles within the start distance. No need to keep iterating if the weight has reached 0.

    ```
    // Apply the base funding cycle's discount rate for each cycle that has passed.
    uint256 _discountMultiple;
    unchecked {
      _discountMultiple = _startDistance / _baseFundingCycle.duration; // Non-null duration is excluded above
    }

    for (uint256 _i; _i < _discountMultiple; )  {
      // The number of times to apply the discount rate.
      // Base the new weight on the specified funding cycle's weight.
      weight = PRBMath.mulDiv(
        weight,
        JBConstants.MAX_DISCOUNT_RATE - _baseFundingCycle.discountRate,
        JBConstants.MAX_DISCOUNT_RATE
      );

      // The calculation doesn't need to continue if the weight is 0.
      if (weight == 0) break;

      unchecked {
        ++_i;
      }
    }
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/dev/api/libraries/jbconstants.md)
      * `.MAX_DISCOUNT_RATE`

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The accumulated weight change since the specified funding cycle.

  @param _baseFundingCycle The funding cycle to base the calculation on.
  @param _start The start time of the funding cycle to derive a number for.

  @return weight The derived weight, as a fixed point number with 18 decimals.
*/
function _deriveWeightFrom(JBFundingCycle memory _baseFundingCycle, uint256 _start)
  private
  pure
  returns (uint256 weight)
{
  // A subsequent cycle to one with a duration of 0 should have the next possible weight.
  if (_baseFundingCycle.duration == 0)
    return
      PRBMath.mulDiv(
        _baseFundingCycle.weight,
        JBConstants.MAX_DISCOUNT_RATE - _baseFundingCycle.discountRate,
        JBConstants.MAX_DISCOUNT_RATE
      );

  // The weight should be based off the base funding cycle's weight.
  weight = _baseFundingCycle.weight;

  // If the discount is 0, the weight doesn't change.
  if (_baseFundingCycle.discountRate == 0) return weight;

  // The difference between the start of the base funding cycle and the proposed start.
  uint256 _startDistance = _start - _baseFundingCycle.start;

  // Apply the base funding cycle's discount rate for each cycle that has passed.
  uint256 _discountMultiple;
  unchecked {
    _discountMultiple = _startDistance / _baseFundingCycle.duration; // Non-null duration is excluded above
  }

  for (uint256 _i; _i < _discountMultiple; )  {
    // The number of times to apply the discount rate.
    // Base the new weight on the specified funding cycle's weight.
    weight = PRBMath.mulDiv(
      weight,
      JBConstants.MAX_DISCOUNT_RATE - _baseFundingCycle.discountRate,
      JBConstants.MAX_DISCOUNT_RATE
    );

    // The calculation doesn't need to continue if the weight is 0.
    if (weight == 0) break;

    unchecked {
      ++_i;
    }
  }
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
