# totalOutstandingTokensOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the current total amount of outstanding tokens for a project, given a reserved rate.**

### Definition

```
function totalOutstandingTokensOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  override
  returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get total outstanding tokens of.
  * `_reservedRate` is the reserved rate to use when making the calculation.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md) interface.
* The function returns the current total amount of outstanding tokens for the project.

#### Body

1.  Get the total supply of tokens in circulation.

    ```
    // Get the total number of tokens in circulation.
    uint256 _totalSupply = tokenStore.totalSupplyOf(_projectId);
    ```

    _Internal references:_

    * [`tokenStore`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/tokenstore.md)

    _External references:_

    * [`totalSupplyOf`](/dev/deprecated/v2/contracts/jbtokenstore/read/totalsupplyof.md)

2.  Get the number of outstanding reserved tokens the project has given the provided reserved rate.

    ```
    // Get the number of reserved tokens the project has.
    uint256 _reservedTokenAmount = _reservedTokenAmountFrom(
      _processedTokenTrackerOf[_projectId],
      _reservedRate,
      _totalSupply
    );
    ```

    _Internal references:_

    * [`_reservedTokenAmountFrom`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/read/-_reservedtokenamountfrom.md)
    * [`_processedTokenTrackerOf`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/-_processedtokentrackerof.md)

3.  Return the sum of the total supply and the reserved tokens.

    ```
    // Add the reserved tokens to the total supply.
    return _totalSupply + _reservedTokenAmount;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Gets the current total amount of outstanding tokens for a project, given a reserved rate.

  @param _projectId The ID of the project to get total outstanding tokens of.
  @param _reservedRate The reserved rate to use when making the calculation.

  @return The current total amount of outstanding tokens for the project.
*/
function totalOutstandingTokensOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  override
  returns (uint256)
{
  // Get the total number of tokens in circulation.
  uint256 _totalSupply = tokenStore.totalSupplyOf(_projectId);

  // Get the number of reserved tokens the project has.
  uint256 _reservedTokenAmount = _reservedTokenAmountFrom(
    _processedTokenTrackerOf[_projectId],
    _reservedRate,
    _totalSupply
  );

  // Add the reserved tokens to the total supply.
  return _totalSupply + _reservedTokenAmount;
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
