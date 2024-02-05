# burnFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Burns a project's tokens.**

_Only a project's current controller can burn its tokens._

### Definition

```
function burnFrom(
  address _holder,
  uint256 _projectId,
  uint256 _amount,
  bool _preferClaimedTokens
) external override onlyController(_projectId) { ... }
```

* Arguments:
  * `_holder` is the address that owns the tokens being burned.
  * `_projectId` is the ID of the project to which the burned tokens belong.
  * `_amount` is the amount of tokens to burn.
  * `_preferClaimedTokens` is a flag indicating whether there's a preference for tokens to burned from the `_holder`s wallet if the project currently has a token contract attached.
* Through the [`onlyController`](/dev/deprecated/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md) modifier, the function can only be accessed by the controller of the `_projectId`.
* The function overrides a function definition from the [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to the project's current token.

    ```
    // Get a reference to the project's current token.
    IJBToken _token = tokenOf[_projectId];
    ```

    _Internal references:_

    * [`tokenOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/tokenof.md)
2.  Get a reference to the amount of unclaimed project tokens the holder has.

    ```
    // Get a reference to the amount of unclaimed project tokens the holder has.
    uint256 _unclaimedBalance = unclaimedBalanceOf[_holder][_projectId];
    ```

    _Internal references:_

    * [`unclaimedBalanceOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)
3.  Get a reference to the amount of the project's tokens the holder has in their wallet. If the project does not yet have tokens issued, the holder must not have a claimed balance.

    ```
    // Get a reference to the amount of the project's current token the holder has in their wallet.
    uint256 _claimedBalance = _token == IJBToken(address(0))
      ? 0
      : _token.balanceOf(_holder, _projectId);
    ```

    _External references:_

    * [`balanceOf`](/dev/deprecated/v2/contracts/jbtoken/read/balanceof.md)
4.  Make sure the holder has enough tokens to burn.

    ```
    // There must be adequate tokens to burn across the holder's claimed and unclaimed balance.
    if (_amount > _claimedBalance + _unclaimedBalance) revert INSUFFICIENT_FUNDS();
    ```

5.  Find the amount of claimed tokens that should be burned. This will be 0 if the holder has no claimed balance, an amount up to the holder's claimed balance if there is a preference for burning claimed tokens, or the difference between the amount being burned and the holder's unclaimed balance otherwise.

    ```
    // The amount of tokens to burn.
    uint256 _claimedTokensToBurn;

    // If there's no balance, redeem no tokens.
    if (_claimedBalance == 0)
      _claimedTokensToBurn = 0;
      // If prefer converted, redeem tokens before redeeming unclaimed tokens.
    else if (_preferClaimedTokens)
      _claimedTokensToBurn = _claimedBalance < _amount ? _claimedBalance : _amount;
      // Otherwise, redeem unclaimed tokens before claimed tokens.
    else _claimedTokensToBurn = _unclaimedBalance < _amount ? _amount - _unclaimedBalance : 0;
    ```
6.  The amount of unclaimed tokens to burn is necessarily the amount of tokens to burn minus the amount of claimed tokens to burn.

    ```
    // The amount of unclaimed tokens to redeem.
    uint256 _unclaimedTokensToBurn = _amount - _claimedTokensToBurn;
    ```
7.  If there are unclaimed tokens to burn, subtract the amount from the unclaimed balance of the holder for the project, and from the unclaimed total supply of the project.

    ```
    // Subtract the tokens from the unclaimed balance and total supply.
    if (_unclaimedTokensToBurn > 0) {
      // Reduce the holders balance and the total supply.
      unclaimedBalanceOf[_holder][_projectId] =
        unclaimedBalanceOf[_holder][_projectId] -
        _unclaimedTokensToBurn;
      unclaimedTotalSupplyOf[_projectId] =
        unclaimedTotalSupplyOf[_projectId] -
        _unclaimedTokensToBurn;
    }
    ```

    _Internal references:_

    * [`unclaimedBalanceOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)
    * [`unclaimedTotalSupplyOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md)
8.  If there are claimed tokens to burn, burn them from the holder's wallet.

    ```
    // Burn the claimed tokens.
    if (_claimedTokensToBurn > 0) _token.burn(_projectId, _holder, _claimedTokensToBurn);
    ```

    _External references:_

    * [`burn`](/dev/deprecated/v2/contracts/jbtoken/write/burn.md)
9.  Emit a `Burn` event with the relevant parameters.

    ```
    emit Burn(
      _holder,
      _projectId,
      _amount,
      _unclaimedBalance,
      _claimedBalance,
      _preferClaimedTokens,
      msg.sender
    );
    ```

    _Event references:_

    * [`Burn`](/dev/deprecated/v2/contracts/jbtokenstore/events/burn.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Burns a project's tokens.

  @dev
  Only a project's current controller can burn its tokens.

  @param _holder The address that owns the tokens being burned.
  @param _projectId The ID of the project to which the burned tokens belong.
  @param _amount The amount of tokens to burn.
  @param _preferClaimedTokens A flag indicating whether there's a preference for tokens to burned from the `_holder`s wallet if the project currently has a token contract attached.
*/
function burnFrom(
  address _holder,
  uint256 _projectId,
  uint256 _amount,
  bool _preferClaimedTokens
) external override onlyController(_projectId) {
  // Get a reference to the project's current token.
  IJBToken _token = tokenOf[_projectId];

  // Get a reference to the amount of unclaimed project tokens the holder has.
  uint256 _unclaimedBalance = unclaimedBalanceOf[_holder][_projectId];

  // Get a reference to the amount of the project's current token the holder has in their wallet.
  uint256 _claimedBalance = _token == IJBToken(address(0))
    ? 0
    : _token.balanceOf(_holder, _projectId);

  // There must be adequate tokens to burn across the holder's claimed and unclaimed balance.
  if (_amount > _claimedBalance + _unclaimedBalance) revert INSUFFICIENT_FUNDS();

  // The amount of tokens to burn.
  uint256 _claimedTokensToBurn;

  // If there's no balance, redeem no tokens.
  if (_claimedBalance == 0)
    _claimedTokensToBurn = 0;
    // If prefer converted, redeem tokens before redeeming unclaimed tokens.
  else if (_preferClaimedTokens)
    _claimedTokensToBurn = _claimedBalance < _amount ? _claimedBalance : _amount;
    // Otherwise, redeem unclaimed tokens before claimed tokens.
  else _claimedTokensToBurn = _unclaimedBalance < _amount ? _amount - _unclaimedBalance : 0;

  // The amount of unclaimed tokens to redeem.
  uint256 _unclaimedTokensToBurn = _amount - _claimedTokensToBurn;

  // Subtract the tokens from the unclaimed balance and total supply.
  if (_unclaimedTokensToBurn > 0) {
    // Reduce the holders balance and the total supply.
    unclaimedBalanceOf[_holder][_projectId] =
      unclaimedBalanceOf[_holder][_projectId] -
      _unclaimedTokensToBurn;
    unclaimedTotalSupplyOf[_projectId] =
      unclaimedTotalSupplyOf[_projectId] -
      _unclaimedTokensToBurn;
  }

  // Burn the claimed tokens.
  if (_claimedTokensToBurn > 0) _token.burn(_projectId, _holder, _claimedTokensToBurn);

  emit Burn(
    _holder,
    _projectId,
    _amount,
    _unclaimedBalance,
    _claimedBalance,
    _preferClaimedTokens,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| **`INSUFFICIENT_FUNDS`** | Thrown if the holder doesn't have enough tokens to burn. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                            | Data                                                                                                                                                                                                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Burn`**](/dev/deprecated/v2/contracts/jbtokenstore/events/burn.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 initialClaimedBalance</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
