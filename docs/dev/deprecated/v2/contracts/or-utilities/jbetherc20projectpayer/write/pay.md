# pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/dev/deprecated/v2/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/dev/deprecated/v2/interfaces/ijbprojectpayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Make a payment to the specified project.**

#### Definition

```
function pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is being paid.
  * `_token` is the token being paid in.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_beneficiary` is the address who will receive tokens from the payment.
  * `_minReturnedTokens` is the minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is a memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided.
* The function can be accessed externally by anyone, or internally from this contract or one that inherits it.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBProjectPayer`](/dev/deprecated/v2/interfaces/ijbprojectpayer.md) interface.
* The function doesn't return anything.

#### Body

1.  If the token isn't ETH, make sure ETH wasn't sent to the function, then transfer the amount of tokens from the message sender to this contract. If the token is ETH, override the specified amount and decimals values with with amount of ETH sent to the function, which is denoted as a fixed point number with 18 decimals.

    ```
    // ETH shouldn't be sent if the token isn't ETH.
    if (address(_token) != JBTokens.ETH) {
      if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

      // Transfer tokens to this contract from the msg sender.
      IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    } else {
      // If ETH is being paid, set the amount to the message value, and decimals to 18.
      _amount = msg.value;
      _decimals = 18;
    }
    ```

    _Library references:_

    * [`JBTokens`](/dev/deprecated/v2/libraries/jbtokens.md)
      * `.ETH`

    _External references:_

    * [`transferFrom`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-)
2.  Make the payment.

    ```
    _pay(
      _projectId,
      _token,
      _amount,
      _decimals,
      _beneficiary,
      _minReturnedTokens,
      _preferClaimedTokens,
      _memo,
      _metadata
    );
    ```

    _Internal references:_

    * [`_pay`](/dev/deprecated/v2/contracts/or-utilities/jbetherc20projectpayer/write/-_pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Make a payment to the specified project.

  @param _projectId The ID of the project that is being paid.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _beneficiary The address who will receive tokens from the payment.
  @param _minReturnedTokens The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided.
*/
function pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override {
  // ETH shouldn't be sent if the token isn't ETH.
  if (address(_token) != JBTokens.ETH) {
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

    // Transfer tokens to this contract from the msg sender.
    IERC20(_token).transferFrom(msg.sender, address(this), _amount);
  } else {
    // If ETH is being paid, set the amount to the message value, and decimals to 18.
    _amount = msg.value;
    _decimals = 18;
  }

  _pay(
    _projectId,
    _token,
    _amount,
    _decimals,
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

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`NO_MSG_VALUE_ALLOWED`**    | Thrown if ETH was sent to a non-ETH terminal.   |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
