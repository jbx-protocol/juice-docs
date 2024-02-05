# recordDistributionFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/jbdirectory/write/)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Records newly distributed funds for a project.**

_The msg.sender must be an [`IJBSingleTokenPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)._

#### Definition

```
function recordDistributionFor(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency
)
  external
  override
  nonReentrant
  returns (JBFundingCycle memory fundingCycle, uint256 distributedAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is having funds distributed.
  * `_amount` is the amount to use from the distribution limit, as a fixed point number.
  * `_currency` is the currency of the `_amount`. This must match the project's current funding cycle's currency.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns:
  * `fundingCycle` is the funding cycle during which the withdrawal was made.
  * `distributedAmount` is the amount of terminal tokens distributed, as a fixed point number with the same amount of decimals as its relative terminal.

#### Body

1.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/dev/api/contracts/jbfundingcyclestore/read/currentof.md)
2.  Make sure the current funding cycle doesn't have distributions paused.

    ```
    // The funding cycle must not be configured to have distributions paused.
    if (fundingCycle.distributionsPaused()) revert FUNDING_CYCLE_DISTRIBUTION_PAUSED();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/dev/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.distributionsPaused(...)`

3.  Calculate the new total amount that has been distributed during this funding cycle by adding the amount being distributed to the used distribution limit.

    ```
    // The new total amount that has been distributed during this funding cycle.
    uint256 _newUsedDistributionLimitOf = usedDistributionLimitOf[
      IJBSingleTokenPaymentTerminal(msg.sender)
    ][_projectId][fundingCycle.number] + _amount;
    ```

    _Internal references:_

    * [`usedDistributionLimitOf`](/dev/deprecated/v3/jbsingletokenpaymentterminalstore/properties/useddistributionlimitof.md)

4.  Get a reference to the currrent distribution limit of the project during the current funding cycle, and the currency the distribution limit is in terms of.

    ```
    // Amount must be within what is still distributable.
    (uint256 _distributionLimitOf, uint256 _distributionLimitCurrencyOf) = IJBController(
      directory.controllerOf(_projectId)
    ).distributionLimitOf(
        _projectId,
        fundingCycle.configuration,
        IJBSingleTokenPaymentTerminal(msg.sender),
        IJBSingleTokenPaymentTerminal(msg.sender).token()
      );
    ```

    _External references:_

    * [`distributionLimitOf`](/dev/deprecated/v3/or-controllers/jbcontroller/read/distributionlimitof.md)
    * [`token`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/token.md)

5.  Make sure the new total amount distributed will be at most the distribution limit.

    ```
    // Make sure the new used amount is within the distribution limit.
    if (_newUsedDistributionLimitOf > _distributionLimitOf || _distributionLimitOf == 0)
      revert DISTRIBUTION_AMOUNT_LIMIT_REACHED();
    ```

6.  Make the sure the provided currency matches the expected currency for the distribution limit.

    ```
    // Make sure the currencies match.
    if (_currency != _distributionLimitCurrencyOf) revert CURRENCY_MISMATCH();
    ```

7.  Get a reference to the terminal's currency.

    ```
    // Get a reference to the terminal's currency.
    uint256 _balanceCurrency = IJBSingleTokenPaymentTerminal(msg.sender).currency();
    ```

8.  Calculate how much of the balance will be used. If the currency of the distribution limit and the balance are the same, no price conversion is necessary. Otherwise, convert the distribution limit currency to that of the balance.

    ```
    // Convert the amount to the balance's currency.
    distributedAmount = (_currency == _balanceCurrency) ? _amount : PRBMath
      .mulDiv(
        _amount,
        10**_MAX_FIXED_POINT_FIDELITY, // Use _MAX_FIXED_POINT_FIDELITY to keep as much of the `_amount.value`'s fidelity as possible when converting.
        prices.priceFor(_currency, _balanceCurrency, _MAX_FIXED_POINT_FIDELITY)
      );
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`

    _Internal references:_

    * [`_MAX_FIXED_POINT_FIDELITY`](/dev/deprecated/v3/jbsingletokenpaymentterminalstore/properties/-_max_fixed_point_fidelity.md)

    _External references:_

    * [`priceFor`](/dev/api/contracts/jbprices/read/pricefor.md)
9.  Make sure the project has access to the amount being distributed.

    ```
    // The amount being distributed must be available.
    if (distributedAmount > balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId])
      revert INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();
    ```

    _Internal references:_

    * [`balanceOf`](/dev/deprecated/v3/jbsingletokenpaymentterminalstore/properties/balanceof.md)
10. Store the new used distributed amount.

    ```
    // Store the new amount.
    usedDistributionLimitOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId][
      fundingCycle.number
    ] = _newUsedDistributionLimitOf;
    ```

    _Internal references:_

    * [`usedDistributionLimitOf`](/dev/deprecated/v3/jbsingletokenpaymentterminalstore/properties/useddistributionlimitof.md)
11. Store the decremented balance.

    ```
    // Removed the distributed funds from the project's token balance.
    unchecked {
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
        balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] -
        distributedAmount;
    }
    ```

    _Internal references:_

    * [`balanceOf`](/dev/deprecated/v3/jbsingletokenpaymentterminalstore/properties/balanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Records newly distributed funds for a project.

  @dev
  The msg.sender must be an IJBSingleTokenPaymentTerminal.

  @param _projectId The ID of the project that is having funds distributed.
  @param _amount The amount to use from the distribution limit, as a fixed point number.
  @param _currency The currency of the `_amount`. This must match the project's current funding cycle's currency.

  @return fundingCycle The funding cycle during which the distribution was made.
  @return distributedAmount The amount of terminal tokens distributed, as a fixed point number with the same amount of decimals as its relative terminal.
*/
function recordDistributionFor(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  uint256 _balanceCurrency
)
  external
  override
  nonReentrant
  returns (JBFundingCycle memory fundingCycle, uint256 distributedAmount)
{
  // Get a reference to the project's current funding cycle.
  fundingCycle = fundingCycleStore.currentOf(_projectId);

  // The funding cycle must not be configured to have distributions paused.
  if (fundingCycle.distributionsPaused()) revert FUNDING_CYCLE_DISTRIBUTION_PAUSED();

  // The new total amount that has been distributed during this funding cycle.
  uint256 _newUsedDistributionLimitOf = usedDistributionLimitOf[
    IJBSingleTokenPaymentTerminal(msg.sender)
  ][_projectId][fundingCycle.number] + _amount;

  // Amount must be within what is still distributable.
  (uint256 _distributionLimitOf, uint256 _distributionLimitCurrencyOf) = IJBController(
    directory.controllerOf(_projectId)
  ).distributionLimitOf(
      _projectId,
      fundingCycle.configuration,
      IJBSingleTokenPaymentTerminal(msg.sender),
      IJBSingleTokenPaymentTerminal(msg.sender).token()
    );

  // Make sure the new used amount is within the distribution limit.
  if (_newUsedDistributionLimitOf > _distributionLimitOf || _distributionLimitOf == 0)
    revert DISTRIBUTION_AMOUNT_LIMIT_REACHED();

  // Make sure the currencies match.
  if (_currency != _distributionLimitCurrencyOf) revert CURRENCY_MISMATCH();

  // Get a reference to the terminal's currency.
  uint256 _balanceCurrency = IJBSingleTokenPaymentTerminal(msg.sender).currency();

  // Convert the amount to the balance's currency.
  distributedAmount = (_currency == _balanceCurrency) ? _amount : PRBMath
    .mulDiv(
      _amount,
      10**_MAX_FIXED_POINT_FIDELITY, // Use _MAX_FIXED_POINT_FIDELITY to keep as much of the `_amount.value`'s fidelity as possible when converting.
      prices.priceFor(_currency, _balanceCurrency, _MAX_FIXED_POINT_FIDELITY)
    );

  // The amount being distributed must be available.
  if (distributedAmount > balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId])
    revert INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();

  // Store the new amount.
  usedDistributionLimitOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId][
    fundingCycle.number
  ] = _newUsedDistributionLimitOf;

  // Removed the distributed funds from the project's token balance.
  unchecked {
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] -
      distributedAmount;
  }
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                          | Description                                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **`FUNDING_CYCLE_DISTRIBUTION_PAUSED`**         | Thrown if the project has configured its current funding cycle to pause distributions.                               |
| **`CURRENCY_MISMATCH`**                         | Thrown if the currency of the specified amount doesn't match the currency of the project's current funding cycle.    |
| **`DISTRIBUTION_AMOUNT_LIMIT_REACHED`**         | Thrown if there isn't enough of a distribution limit for the specified terminal to fulfill the desired distribution. |
| **`INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE`** | Thrown if the project's balance isn't sufficient to fulfill the desired distribution.                                |
| **`INADEQUATE_WITHDRAW_AMOUNT`**                | Thrown if the distribution amount is less than the minimum expected.                                                 |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
