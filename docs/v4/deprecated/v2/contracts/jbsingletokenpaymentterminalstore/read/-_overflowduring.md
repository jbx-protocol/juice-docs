# _overflowDuring

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the amount that is overflowing when measured from the specified funding cycle.**

_This amount changes as the value of the balance changes in relation to the currency being used to measure the distribution limit._

#### Definition

```
function _overflowDuring(
  IJBSingleTokenPaymentTerminal _terminal,
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _balanceCurrency
) private view returns (uint256) { ... }
```

* Arguments:
  * `_terminal` is the terminal for which the overflow is being calculated.
  * `_projectId` is the ID of the project to get overflow for.
  * `_fundingCycle` is the ID of the funding cycle to base the overflow on.
  * `_balanceCurrency` is the currency that the stored balance is expected to be in terms of.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns the overflow of funds, as a fixed point number with the same amount of decimals as the specified terminal.

#### Body

1.  Get a reference to the current balance of the project.

    ```
    // Get the current balance of the project.
    uint256 _balanceOf = balanceOf[_terminal][_projectId];
    ```

    _Internal references:_

    * [`balanceOf`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/properties/balanceof.md)
2.  If the project has no balance, there can't be any overflow.

    ```
    // If there's no balance, there's no overflow.
    if (_balanceOf == 0) return 0;
    ```
3.  Get a reference to the current distribution limit of the project, along with the currency the limit is in terms of.

    ```
    // Get a reference to the distribution limit during the funding cycle.
    (uint256 _distributionLimit, uint256 _distributionLimitCurrency) = IJBController(
      directory.controllerOf(_projectId)
    ).distributionLimitOf(_projectId, _fundingCycle.configuration, _terminal, _terminal.token());
    ```

    _External references:_

    * [`controllerOf`](/docs/v4/deprecated/v2/contracts/jbdirectory/properties/controllerof.md)
    * [`distributionLimitOf`](/docs/v4/deprecated/v2/contracts/or-controllers/jbcontroller/read/distributionlimitof.md)
4.  Get a reference to the amount of the funding cycle's target that can still be distributed. This is the difference between its distribution limit and what has already been distributed during this funding cycle.

    ```
    // Get a reference to the amount still distributable during the funding cycle.
    uint256 _distributionLimitRemaining = _distributionLimit -
      usedDistributionLimitOf[_terminal][_projectId][_fundingCycle.number];
    ```

    _Internal references:_

    * [`usedDistributionLimitOf`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/properties/useddistributionlimitof.md)

5.  Convert the distribution remaining into the balance's currency using the appropriate price feed. The distribution remaining and balance fixed point numbers should already be using the same number of decimals.

    ```
    // Convert the _distributionRemaining to be in terms of the provided currency.
    if (_distributionLimitRemaining != 0 && _distributionLimitCurrency != _balanceCurrency)
      _distributionLimitRemaining = PRBMath.mulDiv(
        _distributionLimitRemaining,
        10**_MAX_FIXED_POINT_FIDELITY, // Use _MAX_FIXED_POINT_FIDELITY to keep as much of the `_amount.value`'s fidelity as possible when converting.
        prices.priceFor(_distributionLimitCurrency, _balanceCurrency, _MAX_FIXED_POINT_FIDELITY)
      );
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`

    _Internal references:_

    * [`_MAX_FIXED_POINT_FIDELITY`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/properties/-_max_fixed_point_fidelity.md)
    * [`prices`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/properties/prices.md)

    _External references:_

    * [`priceFor`](/docs/v4/deprecated/v2/contracts/jbprices/read/pricefor.md)
6.  If the current balance of the project is at most the target remaining, there is no overflow. Otherwise the difference between the project's current balance and the remaining distribution limit is the overflow.

    ```
    // Overflow is the balance of this project minus the amount that can still be distributed.
    return _balanceOf > _distributionLimitRemaining ? _balanceOf - _distributionLimitRemaining : 0;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Gets the amount that is overflowing when measured from the specified funding cycle.

  @dev
  This amount changes as the value of the balance changes in relation to the currency being used to measure the distribution limit.

  @param _terminal The terminal for which the overflow is being calculated.
  @param _projectId The ID of the project to get overflow for.
  @param _fundingCycle The ID of the funding cycle to base the overflow on.
  @param _balanceCurrency The currency that the stored balance is expected to be in terms of.

  @return overflow The overflow of funds, as a fixed point number with the same amount of decimals as the specified terminal.
*/
function _overflowDuring(
  IJBSingleTokenPaymentTerminal _terminal,
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _balanceCurrency
) private view returns (uint256) {
  // Get the current balance of the project.
  uint256 _balanceOf = balanceOf[_terminal][_projectId];

  // If there's no balance, there's no overflow.
  if (_balanceOf == 0) return 0;

  // Get a reference to the distribution limit during the funding cycle.
  (uint256 _distributionLimit, uint256 _distributionLimitCurrency) = directory
    .controllerOf(_projectId)
    .distributionLimitOf(_projectId, _fundingCycle.configuration, _terminal, _terminal.token());

  // Get a reference to the amount still distributable during the funding cycle.
  uint256 _distributionLimitRemaining = _distributionLimit -
    usedDistributionLimitOf[_terminal][_projectId][_fundingCycle.number];

  // Convert the _distributionRemaining to be in terms of the provided currency.
  if (_distributionLimitRemaining != 0 && _distributionLimitCurrency != _balanceCurrency)
    _distributionLimitRemaining = PRBMath.mulDiv(
      _distributionLimitRemaining,
      10**_MAX_FIXED_POINT_FIDELITY, // Use _MAX_FIXED_POINT_FIDELITY to keep as much of the `_amount.value`'s fidelity as possible when converting.
      prices.priceFor(_distributionLimitCurrency, _balanceCurrency, _MAX_FIXED_POINT_FIDELITY)
    );

  // Overflow is the balance of this project minus the amount that can still be distributed.
  return _balanceOf > _distributionLimitRemaining ? _balanceOf - _distributionLimitRemaining : 0;
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
