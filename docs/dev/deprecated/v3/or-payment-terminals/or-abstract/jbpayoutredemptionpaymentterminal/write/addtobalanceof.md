# addToBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Receives funds belonging to the specified project.**

#### Definition

```
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funds received belong.
  * `_amount` is the amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.
  * `_token` is the token being paid. This terminal ignores this property since it only manages one token.
  * `_memo` is a memo to pass along to the emitted event.
  * `_metadata` is metadata to pass along to the emitted event.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* Through the [`isTerminalOf`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/modifiers/isterminalof.md) modifier, this transaction reverts if this terminal is not one of the project's terminals.
* The function accepts ETH. The transaction reverts if receives ETH but the terminal's token type isn't ETH.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function doesn't return anything.

#### Body

1.  If this terminal's token isn't ETH, make sure ETH wasn't sent to the function, then transfer the amount of tokens from the message sender to this contract. If this terminal's contract is ETH, override the specified amount value with with amount of ETH sent to the function.

    ```
    // If this terminal's token isn't ETH, make sure no msg.value was sent, then transfer the tokens in from msg.sender.
    if (token != JBTokens.ETH) {
      // Amount must be greater than 0.
      if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

      // Get a reference to the balance before receiving tokens.
      uint256 _balanceBefore = _balance();

      // Transfer tokens to this terminal from the msg sender.
      _transferFrom(msg.sender, payable(address(this)), _amount);

      // The amount should reflect the change in balance.
      _amount = _balance() - _balanceBefore;
    }
    // If the terminal's token is ETH, override `_amount` with msg.value.
    else _amount = msg.value;
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbcurrencies.md)
      * `.ETH`

    _Virtual references:_

    * [`_balance`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_balance.md)
    * [`_transferFrom`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_transferfrom.md)
2.  Forward to the internal function to properly account for the added balance. If the message sender is a feeless address, don't refund held fees.

    ```
    _addToBalanceOf(_projectId, _amount, _memo, !isFeelessAddress[msg.sender] _metadata);
    ```

    _Internal references:_

    * [`_addToBalanceOf`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_addtobalanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Receives funds belonging to the specified project.

  @param _projectId The ID of the project to which the funds received belong.
  @param _amount The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.
  @param _token The token being paid. This terminal ignores this property since it only manages one token.
  @param _memo A memo to pass along to the emitted event.
  @param _metadata Metadata to pass along to the emitted event.
*/
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address _token,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) {
  _token; // Prevents unused var compiler and natspec complaints.

  // If this terminal's token isn't ETH, make sure no msg.value was sent, then transfer the tokens in from msg.sender.
  if (token != JBTokens.ETH) {
    // Amount must be greater than 0.
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

    // Get a reference to the balance before receiving tokens.
    uint256 _balanceBefore = _balance();

    // Transfer tokens to this terminal from the msg sender.
    _transferFrom(msg.sender, payable(address(this)), _amount);

    // The amount should reflect the change in balance.
    _amount = _balance() - _balanceBefore;
  }
  // If the terminal's token is ETH, override `_amount` with msg.value.
  else _amount = msg.value;

  _addToBalanceOf(_projectId, _amount, _memo, !isFeelessAddress[msg.sender] _metadata);
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
