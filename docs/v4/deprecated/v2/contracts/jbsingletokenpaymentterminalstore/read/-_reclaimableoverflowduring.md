# _reclaimableOverflowDuring

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens  when measured from the specified.**

_If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used._

#### Definition

```
function _reclaimableOverflowDuring(
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _tokenCount,
  uint256 _overflow
) private view returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get the reclaimable overflow amount for.
  * `_fundingCycle` is the funding cycle during which reclaimable overflow is being calculated.
  * `_tokenCount` is the number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  * `_overflow` is the amount of overflow to make the calculation with.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns the amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the `_overflow`.

#### Body

1.  If there are reserved tokens, add them to the total supply for the purposes of this calculation.

    ```
    // If there are reserved tokens, add them to the total supply.
    if (_reservedTokenAmount > 0) _totalSupply = _totalSupply + _reservedTokenAmount;
    ```
2.  If the calculation is being made to find the claimable amount for all of a project's tokens, return the entire current overflow.

    ```
    // If the amount being redeemed is the total supply, return the rest of the overflow.
    if (_tokenCount == _totalSupply) return _overflow;
    ```
3.  Get a reference to the redemption rate that should be used in the redemption bonding curve formula. If the current funding cycle has an active ballot, use its ballot redemption rate, otherwise use the standard redemption rate. This lets projects configure different bonding curves depending on the state of pending reconfigurations.

    ```
    // Use the ballot redemption rate if the queued cycle is pending approval according to the previous funding cycle's ballot.
    uint256 _redemptionRate = fundingCycleStore.currentBallotStateOf(_projectId) ==
      JBBallotState.Active
      ? _fundingCycle.ballotRedemptionRate()
      : _fundingCycle.redemptionRate();
    ```

    _Enums used:_

    * [`JBBallotState`](/docs/v4/deprecated/v2/enums/jbballotstate.md)
      * `.Active`

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/docs/v4/deprecated/v2/libraries/jbfundingcyclemetadataresolver.md)
      * `.ballotRedemptionRate(...)`
      * `.redemptionRate(...)`

    _Internal references:_

    * [`fundingCycleStore`](/docs/v4/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/properties/fundingcyclestore.md)

    _External references:_

    * [`currentBallotStateOf`](/docs/v4/deprecated/v2/contracts/jbfundingcyclestore/read/currentballotstateof.md)
4.  If the redemption rate is 0%, nothing is claimable regardless of the amount of tokens.

    ```
    // If the redemption rate is 0, nothing is claimable.
    if (_redemptionRate == 0) return 0;
    ```
5.  The redemption bonding curve formula depends on a base claimable value that is the linear proportion of the provided tokens to the total supply of tokens. Get a reference to this proportion to use in the formula.

    ```
    // Get a reference to the linear proportion.
    uint256 _base = PRBMath.mulDiv(_overflow, _tokenCount, _totalSupply);
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
6.  Return the claimable amount determined by a bonding curve. At a 100% bonding curve the linear base can be returned immediately, this outcome is naturally part of the curve – checking for it first could prevent an unnecessary and slightly more expensive mulDiv calculation.

    ```
    // These conditions are all part of the same curve. Edge conditions are separated because fewer operation are necessary.
    if (_redemptionRate == JBConstants.MAX_REDEMPTION_RATE) return _base;

    return
      PRBMath.mulDiv(
        _base,
        _redemptionRate +
          PRBMath.mulDiv(
            _tokenCount,
            JBConstants.MAX_REDEMPTION_RATE - _redemptionRate,
            _totalSupply
          ),
        JBConstants.MAX_REDEMPTION_RATE
      );
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/docs/v4/deprecated/v2/libraries/jbconstants.md)
      * `.MAX_REDEMPTION_RATE`

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens when measured from the specified.

  @dev
  If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used.

  @param _projectId The ID of the project to get the reclaimable overflow amount for.
  @param _fundingCycle The funding cycle during which reclaimable overflow is being calculated.
  @param _tokenCount The number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  @param _totalSupply The total supply of tokens to make the calculation with, as a fixed point number with 18 decimals.
  @param _overflow The amount of overflow to make the calculation with.

  @return The amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the `_overflow`.
*/
function _reclaimableOverflowDuring(
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _tokenCount,
  uint256 _totalSupply,
  uint256 _overflow
) private view returns (uint256) {
  // If there are reserved tokens, add them to the total supply.
  if (_reservedTokenAmount > 0) _totalSupply = _totalSupply + _reservedTokenAmount;

  // If the amount being redeemed is the total supply, return the rest of the overflow.
  if (_tokenCount == _totalSupply) return _overflow;

  // Use the ballot redemption rate if the queued cycle is pending approval according to the previous funding cycle's ballot.
  uint256 _redemptionRate = fundingCycleStore.currentBallotStateOf(_projectId) ==
    JBBallotState.Active
    ? _fundingCycle.ballotRedemptionRate()
    : _fundingCycle.redemptionRate();

  // If the redemption rate is 0, nothing is claimable.
  if (_redemptionRate == 0) return 0;

  // Get a reference to the linear proportion.
  uint256 _base = PRBMath.mulDiv(_overflow, _tokenCount, _totalSupply);

  // These conditions are all part of the same curve. Edge conditions are separated because fewer operation are necessary.
  if (_redemptionRate == JBConstants.MAX_REDEMPTION_RATE) return _base;

  return
    PRBMath.mulDiv(
      _base,
      _redemptionRate +
        PRBMath.mulDiv(
          _tokenCount,
          JBConstants.MAX_REDEMPTION_RATE - _redemptionRate,
          _totalSupply
        ),
      JBConstants.MAX_REDEMPTION_RATE
    );
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
