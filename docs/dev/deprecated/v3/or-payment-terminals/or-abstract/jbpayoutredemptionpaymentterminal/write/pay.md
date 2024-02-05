# pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Contribute tokens to a project.**

#### Definition

```
function pay(
  uint256 _projectId,
  uint256 _amount,
  address _token,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project being paid.
  * `_amount` is the amount of terminal tokens being received, as a fixed point number with the same amount of decimals as this terminal. If this terminal's token is ETH, this is ignored and msg.value is used in its place.
  * `_token` is the token being paid. This terminal ignores this property since it only manages one token.
  * `_beneficiary` is the address to mint tokens for and pass along to the funding cycle's data source and delegate.
  * `_minReturnedTokens` is the minimum number of project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate. A data source can alter the memo before emitting in the event and forwarding to the delegate.
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* Through the [`isTerminalOf`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/modifiers/isterminalof.md) modifier, this transaction reverts if this terminal is not one of the project's terminals.
* The function accepts ETH. The transaction reverts if receives ETH but the terminal's token type isn't ETH.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function returns the number of tokens minted for the beneficiary, as a fixed point number with 18 decimals.

#### Body

1.  If this terminal's token is not ETH, make sure ETH wasn't sent to it. Then transfer the specified amount of tokens from the message sender to this contract. If this terminal's contract is ETH, override the specified amount value with with amount of ETH sent to the function.

    ```
    // ETH shouldn't be sent if this terminal's token isn't ETH.
    if (token != JBTokens.ETH) {
      if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

      // Get a reference to the balance before receiving tokens.
      uint256 _balanceBefore = _balance();

      // Transfer tokens to this terminal from the msg sender.
      _transferFrom(msg.sender, payable(address(this)), _amount);

      // The amount should reflect the change in balance.
      _amount = _balance() - _balanceBefore;
    }
    // If this terminal's token is ETH, override _amount with msg.value.
    else _amount = msg.value;
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbcurrencies.md)
      * `.ETH`

    _Virtual references:_

    * [`_balance`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_balance.md)
    * [`_transferFrom`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_transferfrom.md)

1.  Forward the call to the internal version of the function that is also used by other operations.

    ```
    return
      _pay(
        _amount,
        msg.sender,
        _projectId,
        _beneficiary,
        _minReturnedTokens,
        _preferClaimedTokens,
        _memo,
        _metadata
      );
    ```

    _Internal references:_

    * [`_pay`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Contribute tokens to a project.

  @param _projectId The ID of the project being paid.
  @param _amount The amount of terminal tokens being received, as a fixed point number with the same amount of decimals as this terminal. If this terminal's token is ETH, this is ignored and msg.value is used in its place.
  @param _token The token being paid. This terminal ignores this property since it only manages one token.
  @param _beneficiary The address to mint tokens for and pass along to the funding cycle's data source and delegate.
  @param _minReturnedTokens The minimum number of project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate. A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided.

  @return The number of tokens minted for the beneficiary, as a fixed point number with 18 decimals.
*/
function pay(
  uint256 _projectId,
  uint256 _amount,
  address _token,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOfProject(_projectId) returns (uint256) {
  _token; // Prevents unused var compiler and natspec complaints.

  // ETH shouldn't be sent if this terminal's token isn't ETH.
  if (token != JBTokens.ETH) {
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

    // Get a reference to the balance before receiving tokens.
    uint256 _balanceBefore = _balance();

    // Transfer tokens to this terminal from the msg sender.
    _transferFrom(msg.sender, payable(address(this)), _amount);

    // The amount should reflect the change in balance.
    _amount = _balance() - _balanceBefore;
  }
  // If this terminal's token is ETH, override _amount with msg.value.
  else _amount = msg.value;

  return
    _pay(
      _amount,
      msg.sender,
      _projectId,
      _beneficiary,
      _minReturnedTokens,
      _preferClaimedTokens,
      _memo,
      _metadata
    );
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`NO_MSG_VALUE_ALLOWED`** | Thrown if ETH was sent to a non-ETH terminal. |

</TabItem>


<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
