# recordPaymentFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Records newly contributed tokens to a project.**

_Mints the project's tokens according to values provided by a configured data source. If no data source is configured, mints tokens proportional to the amount of the contribution._

_The msg.sender must be an [`IJBSingleTokenPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md). The amount specified in the params is in terms of the msg.sender's tokens._

#### Definition

```
function recordPaymentFrom(
  address _payer,
  JBTokenAmount calldata _amount,
  uint256 _projectId,
  uint256 _baseWeightCurrency,
  address _beneficiary,
  string calldata _memo,
  bytes memory _metadata
)
  external
  override
  nonReentrant
  returns (
    JBFundingCycle memory fundingCycle,
    uint256 tokenCount,
    JBPayDelegateAllocation[] memory delegateAllocations,,
    string memory memo
  ) { ... }
```

* Arguments:
  * `_payer` is the original address that sent the payment to the terminal.
  * `_amount` is a [`JBTokenAmount`](/docs/v4/deprecated/v3/api/data-structures/jbtokenamount.md) data structure specifying the amount of tokens being paid. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
  * `_projectId` is the ID of the project being paid.
  * `_baseWeightCurrency` is the currency to base token issuance on.
  * `_beneficiary` is the specified address that should be the beneficiary of anything that results from the payment.
  * `_memo` is a memo to pass along to the emitted event, and passed along to the funding cycle's data source.
  * `_metadata` are bytes to send along to the data source, if one is provided.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns:
  * `fundingCycle` is the project's funding cycle during which payment was made.
  * `tokenCount` is the number of project tokens that were minted, as a fixed point number with 18 decimals.
  * `delegateAllocations` is the amount to send to delegates instead of adding to the local balance.
  * `memo` is a memo that should be passed along to the emitted event.

#### Body

1.  Get a reference to the project's current funding cycle that should have its properties used in the subsequent calculations and returned.

    ```
    // Get a reference to the current funding cycle for the project.
    fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/docs/v4/deprecated/v3/api/contracts/jbfundingcyclestore/read/currentof.md)

2.  Make sure the project has a funding cycle configured. This is done by checking if the project's current funding cycle number is non-zero.

    ```
    // The project must have a funding cycle configured.
    if (fundingCycle.number == 0) revert INVALID_FUNDING_CYCLE();
    ```

3.  Make sure the project's funding cycle isn't configured to pause payments.

    ```
    // Must not be paused.
    if (fundingCycle.payPaused()) revert FUNDING_CYCLE_PAYMENT_PAUSED();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/docs/v4/deprecated/v3/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.payPaused(...)`

4.  Create a variable where the weight to use in subsquent calculations will be saved.

    ```
    // The weight according to which new token supply is to be minted, as a fixed point number with 18 decimals.
    uint256 _weight;
    ```

5.  If the project's current funding cycle is configured to use a data source when receiving payments, ask the data source for the parameters that should be used throughout the rest of the function given provided contextual values in a [`JBPayParamsData`](/docs/v4/deprecated/v3/api/data-structures/jbpayparamsdata.md) structure. Otherwise default parameters are used.

    ```
    // If the funding cycle has configured a data source, use it to derive a weight and memo.
    if (fundingCycle.useDataSourceForPay() && fundingCycle.dataSource() != address(0)) {
      // Create the params that'll be sent to the data source.
      JBPayParamsData memory _data = JBPayParamsData(
        IJBSingleTokenPaymentTerminal(msg.sender),
        _payer,
        _amount,
        _projectId,
        _beneficiary,
        fundingCycle.configuration,
        fundingCycle.weight,
        fundingCycle.reservedRate(),
        _memo,
        _metadata
      );
      (_weight, memo, delegateAllocations) = IJBFundingCycleDataSource(fundingCycle.dataSource())
        .payParams(_data);
    }
    // Otherwise use the funding cycle's weight
    else {
      _weight = fundingCycle.weight;
      memo = _memo;
    }
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/docs/v4/deprecated/v3/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.useDataSourceForPay(...)`\
      * `.dataSource(...)`\
      * `.reservedRate(...)`

    _External references:_

    * [`payParams`](/docs/v4/deprecated/v3/api/interfaces/ijbfundingcycledatasource.md)
6.  The following scoped block is a bit of a hack to prevent a "Stack too deep" error.

    ```
    // Scoped section prevents stack too deep. `_balanceDiff` only used within scope.
    { ... }
    ```

    1.  Keep a reference the amount difference to apply to the balance. Initially this is the full value.

        ```
        // Keep a reference to the amount that should be added to the project's balance.
        uint256 _balanceDiff = _amount.value;
        ```

    2.  If delegate allocations were returned by the data source, make sure their sum does not exceed the amount paid. Decrement each delegated allocation from the amount that will get subtracted from the project's balance.

        ```
        // Validate all delegated amounts. This needs to be done before returning the delegate allocations to ensure valid delegated amounts.
        if (delegateAllocations.length != 0) {
          for (uint256 _i; _i < delegateAllocations.length; ) {
            // Get a reference to the amount to be delegated.
            uint256 _delegatedAmount = delegateAllocations[_i].amount;

            // Validate if non-zero.
            if (_delegatedAmount != 0) {
              // Can't delegate more than was paid.
              if (_delegatedAmount > _balanceDiff) revert INVALID_AMOUNT_TO_SEND_DELEGATE();

              // Decrement the total amount being added to the balance.
              _balanceDiff = _balanceDiff - _delegatedAmount;
            }

            unchecked {
              ++_i;
            }
          }
        }
        ```

    3.  If there is no amount being recorded, there's nothing left to do so the current validated values can be returned.

        ```
        // If there's no amount being recorded, there's nothing left to do.
        if (_amount.value == 0) return (fundingCycle, 0, delegateAllocations, memo);
        ```

    4.  Add the appropriate amount to the stored balance.

        ```
        // Add the correct balance difference to the token balance of the project.
        if (_balanceDiff != 0)
          balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
            balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] +
            _balanceDiff;
        ```

        _Internal references:_

        * [`balanceOf`](/docs/v4/deprecated/v3/deprecated/jbsingletokenpaymentterminalstore/properties/balanceof.md)

7.  If there is no weight, the resulting token count will be 0. There's nothing left to do so the current values can be returned.

    ```
    // If there's no weight, token count must be 0 so there's nothing left to do.
    if (_weight == 0) return (fundingCycle, 0, delegateAllocations, memo);
    ```

8.  Calculate the weight ratio. This allows a project to get paid in a certain token, but issue project tokens relative to a different base currency. The weight ratio will be used to divide the product of the paid amount and the weight to determine the number of tokens that should be distributed. Since the number of distributed tokens should be a fixed point number with 18 decimals, the weight ratio must have the same number of decimals as the amount to cancel it out and leave only the fidelity of the 18 decimal fixed point weight.

    ```
    // Get a reference to the number of decimals in the amount. (prevents stack too deep).
    uint256 _decimals = _amount.decimals;

    // If the terminal should base its weight on a different currency from the terminal's currency, determine the factor.
    // The weight is always a fixed point mumber with 18 decimals. To ensure this, the ratio should use the same number of decimals as the `_amount`.
    uint256 _weightRatio = _amount.currency == _baseWeightCurrency
      ? 10**_decimals
      : prices.priceFor(_amount.currency, _baseWeightCurrency, _decimals);
    ```

    _External references:_

    * [`priceFor`](/docs/v4/deprecated/v3/api/contracts/jbprices/read/pricefor.md)

9.  Determine the number of tokens to mint.

    ```
    // Find the number of tokens to mint, as a fixed point number with as many decimals as `weight` has.
    tokenCount = PRBMath.mulDiv(_amount.value, _weight, _weightRatio);
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Records newly contributed tokens to a project.

  @dev
  Mints the project's tokens according to values provided by a configured data source. If no data source is configured, mints tokens proportional to the amount of the contribution.

  @dev
  The msg.sender must be an IJBSingleTokenPaymentTerminal. The amount specified in the params is in terms of the msg.sender's tokens.

  @param _payer The original address that sent the payment to the terminal.
  @param _amount The amount of tokens being paid. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
  @param _projectId The ID of the project being paid.
  @param _baseWeightCurrency The currency to base token issuance on.
  @param _beneficiary The specified address that should be the beneficiary of anything that results from the payment.
  @param _memo A memo to pass along to the emitted event, and passed along to the funding cycle's data source.
  @param _metadata Bytes to send along to the data source, if one is provided.

  @return fundingCycle The project's funding cycle during which payment was made.
  @return tokenCount The number of project tokens that were minted, as a fixed point number with 18 decimals.
  @return delegateAllocations The amount to send to delegates instead of adding to the local balance.
  @return memo A memo that should be passed along to the emitted event.
*/
function recordPaymentFrom(
  address _payer,
  JBTokenAmount calldata _amount,
  uint256 _projectId,
  uint256 _baseWeightCurrency,
  address _beneficiary,
  string calldata _memo,
  bytes memory _metadata
)
  external
  override
  nonReentrant
  returns (
    JBFundingCycle memory fundingCycle,
    uint256 tokenCount,
    JBPayDelegateAllocation[] memory delegateAllocations,
    string memory memo
  )
{
  // Get a reference to the current funding cycle for the project.
  fundingCycle = fundingCycleStore.currentOf(_projectId);

  // The project must have a funding cycle configured.
  if (fundingCycle.number == 0) revert INVALID_FUNDING_CYCLE();

  // Must not be paused.
  if (fundingCycle.payPaused()) revert FUNDING_CYCLE_PAYMENT_PAUSED();

  // The weight according to which new token supply is to be minted, as a fixed point number with 18 decimals.
  uint256 _weight;

  // If the funding cycle has configured a data source, use it to derive a weight and memo.
  if (fundingCycle.useDataSourceForPay() && fundingCycle.dataSource() != address(0)) {
    // Create the params that'll be sent to the data source.
    JBPayParamsData memory _data = JBPayParamsData(
      IJBSingleTokenPaymentTerminal(msg.sender),
      _payer,
      _amount,
      _projectId,
      fundingCycle.configuration,
      _beneficiary,
      fundingCycle.weight,
      fundingCycle.reservedRate(),
      _memo,
      _metadata
    );
    (_weight, memo, delegateAllocations) = IJBFundingCycleDataSource(fundingCycle.dataSource())
      .payParams(_data);
  }
  // Otherwise use the funding cycle's weight
  else {
    _weight = fundingCycle.weight;
    memo = _memo;
  }

  // Scoped section prevents stack too deep. `_balanceDiff` only used within scope.
  {
    // Keep a reference to the amount that should be added to the project's balance.
    uint256 _balanceDiff = _amount.value;

    // Validate all delegated amounts. This needs to be done before returning the delegate allocations to ensure valid delegated amounts.
    if (delegateAllocations.length != 0) {
      for (uint256 _i; _i < delegateAllocations.length; ) {
        // Get a reference to the amount to be delegated.
        uint256 _delegatedAmount = delegateAllocations[_i].amount;

        // Validate if non-zero.
        if (_delegatedAmount != 0) {
          // Can't delegate more than was paid.
          if (_delegatedAmount > _balanceDiff) revert INVALID_AMOUNT_TO_SEND_DELEGATE();

          // Decrement the total amount being added to the balance.
          _balanceDiff = _balanceDiff - _delegatedAmount;
        }

        unchecked {
          ++_i;
        }
      }
    }

    // If there's no amount being recorded, there's nothing left to do.
    if (_amount.value == 0) return (fundingCycle, 0, delegateAllocations, memo);

    // Add the correct balance difference to the token balance of the project.
    if (_balanceDiff != 0)
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
        balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] +
        _balanceDiff;
  }

  // If there's no weight, token count must be 0 so there's nothing left to do.
  if (_weight == 0) return (fundingCycle, 0, delegateAllocations, memo);

  // Get a reference to the number of decimals in the amount. (prevents stack too deep).
  uint256 _decimals = _amount.decimals;

  // If the terminal should base its weight on a different currency from the terminal's currency, determine the factor.
  // The weight is always a fixed point mumber with 18 decimals. To ensure this, the ratio should use the same number of decimals as the `_amount`.
  uint256 _weightRatio = _amount.currency == _baseWeightCurrency
    ? 10**_decimals
    : prices.priceFor(_amount.currency, _baseWeightCurrency, _decimals);

  // Find the number of tokens to mint, as a fixed point number with as many decimals as `weight` has.
  tokenCount = PRBMath.mulDiv(_amount.value, _weight, _weightRatio);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                             | Description                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| **`INVALID_FUNDING_CYCLE`**        | Thrown if the project doesn't have a funding cycle.                                            |
| **`FUNDING_CYCLE_PAYMENT_PAUSED`** | Thrown if the project has configured its current funding cycle to pause payments.              |
| **`INVALID_AMOUNT_TO_SEND_DELEGATE`** | Thrown if the sum of delegated amounts is greater than the amount being paid.               |


</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
