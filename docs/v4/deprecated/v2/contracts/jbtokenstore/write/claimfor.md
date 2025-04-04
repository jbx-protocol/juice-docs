# claimFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/docs/v4/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/docs/v4/deprecated/v2/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Claims internally accounted for tokens into a holder's wallet.**

_Only a token holder, the owner of the token's project, or an operator specified by the token holder can claim its unclaimed tokens._

### Definition

```
function claimFor(
  address _holder,
  uint256 _projectId,
  uint256 _amount
) external override requirePermission(_holder, _projectId, JBOperations.CLAIM) { ... }
```

* Arguments:
  * `_holder` is the owner of the tokens being claimed.
  * `_projectId` is the ID of the project whose tokens are being claimed.
  * `_amount` is the amount of tokens to claim.
* Through the [`requirePermission`](/docs/v4/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the token holder, or from an operator that has been given the [`JBOperations.CLAIM`](/docs/v4/deprecated/v2/libraries/jboperations.md) permission by the token holder.
* The function overrides a function definition from the [`IJBTokenStore`](/docs/v4/deprecated/v2/interfaces/ijbtokenstore.md) interface.
* The function does't return anything.

#### Body

1.  Get a reference to the project's current token.

    ```
    // Get a reference to the project's current token.
    IJBToken _token = tokenOf[_projectId];
    ```

    _Internal references:_

    * [`tokenOf`](/docs/v4/deprecated/v2/contracts/jbtokenstore/properties/tokenof.md)
2.  Make sure the project has a token. If it doesn't, there's nowhere to claim tokens onto.

    ```
    // The project must have a token contract attached.
    if (_token == IJBToken(address(0))) revert TOKEN_NOT_FOUND();
    ```
3.  Get a reference to the amount of unclaimed project tokens the holder has.

    ```
    // Get a reference to the amount of unclaimed project tokens the holder has.
    uint256 _unclaimedBalance = unclaimedBalanceOf[_holder][_projectId];
    ```

    _Internal references:_

    * [`unclaimedBalanceOf`](/docs/v4/deprecated/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)
4.  Make sure the holder has enough tokens to claim.

    ```
    // There must be enough unlocked unclaimed tokens to claim.
    if (_unclaimedBalance < _amount) revert INSUFFICIENT_UNCLAIMED_TOKENS();
    ```
5.  Subtract from the unclaimed project token balance of the holder.

    ```
    // Subtract the claim amount from the holder's unclaimed project token balance.
    unclaimedBalanceOf[_holder][_projectId] = unclaimedBalanceOf[_holder][_projectId] - _amount;
    ```

    _Internal references:_

    * [`unclaimedBalanceOf`](/docs/v4/deprecated/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)
6.  Subtract from the unclaimed token total supply of the project.

    ```
    // Subtract the claim amount from the project's unclaimed total supply.
    unclaimedTotalSupplyOf[_projectId] = unclaimedTotalSupplyOf[_projectId] - _amount;
    ```

    _Internal references:_

    * [`unclaimedTotalSupplyOf`](/docs/v4/deprecated/v2/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md)
7.  Mint the tokens to the holder's wallet.

    ```
    // Mint the equivalent amount of the project's token for the holder.
    _token.mint(_projectId, _holder, _amount);
    ```

    _External references:_

    * [`mint`](/docs/v4/deprecated/v2/contracts/jbtoken/write/mint.md)
8.  Emit a `Claim` event with the relevant parameters.

    ```
    emit Claim(_holder, _projectId, _unclaimedBalance, _amount, msg.sender);
    ```

    _Event references:_

    * [`Claim`](/docs/v4/deprecated/v2/contracts/jbtokenstore/events/claim.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Claims internally accounted for tokens into a holder's wallet.

  @dev
  Only a token holder, the owner of the token's project, or an operator specified by the token holder can claim its unclaimed tokens.

  @param _holder The owner of the tokens being claimed.
  @param _projectId The ID of the project whose tokens are being claimed.
  @param _amount The amount of tokens to claim.
*/
function claimFor(
  address _holder,
  uint256 _projectId,
  uint256 _amount
) external override requirePermission(_holder, _projectId, JBOperations.CLAIM) {
  // Get a reference to the project's current token.
  IJBToken _token = tokenOf[_projectId];

  // The project must have a token contract attached.
  if (_token == IJBToken(address(0))) revert TOKEN_NOT_FOUND();

  // Get a reference to the amount of unclaimed project tokens the holder has.
  uint256 _unclaimedBalance = unclaimedBalanceOf[_holder][_projectId];

  // There must be enough unlocked unclaimed tokens to claim.
  if (_unclaimedBalance < _amount) revert INSUFFICIENT_UNCLAIMED_TOKENS();

  // Subtract the claim amount from the holder's unclaimed project token balance.
  unclaimedBalanceOf[_holder][_projectId] = unclaimedBalanceOf[_holder][_projectId] - _amount;

  // Subtract the claim amount from the project's unclaimed total supply.
  unclaimedTotalSupplyOf[_projectId] = unclaimedTotalSupplyOf[_projectId] - _amount;

  // Mint the equivalent amount of the project's token for the holder.
  _token.mint(_projectId, _holder, _amount);

  emit Claim(_holder, _projectId, _unclaimedBalance, _amount, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                              | Description                                               |
| ----------------------------------- | --------------------------------------------------------- |
| **`TOKEN_NOT_FOUND`**               | Thrown if the project doesn't have a token contract attached.        |
| **`INSUFFICIENT_UNCLAIMED_TOKENS`** | Thrown if the holder doens't have enough tokens to claim. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                              | Data                                                                                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Claim`**](/docs/v4/deprecated/v2/contracts/jbtokenstore/events/claim.md)                           | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
