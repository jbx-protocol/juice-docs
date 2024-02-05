# mintFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/deprecated/v2/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/deprecated/v2/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Mint new project tokens.**

_Only a project's current controller can mint its tokens._

### Definition

```
function mintFor(
  address _holder,
  uint256 _projectId,
  uint256 _amount,
  bool _preferClaimedTokens
) external override onlyController(_projectId) { ... }
```

* Arguments:
  * `_holder` is the address receiving the new tokens.
  * `_projectId` is the ID of the project to which the tokens belong.
  * `_amount` is the amount of tokens to mint.
  * `_preferClaimedTokens` is a flag indicating whether there's a preference for minted tokens to be claimed automatically into the `_holder`s wallet if the project currently has a token contract attached.
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
2.  Check if tokens should be minted using the internal accounting mechanism, or if they should be claimed into the holder's wallet. Tokens should be claimed if the project has issued tokens, and either the project forces tokens to be claimed or if the `_preferClaimedTokens` flag is true. The internal accounting mechanism uses less gas, and tokens issued using it can later be claimed into the holders wallet by anyone who submits a [`claimFor`](/dev/deprecated/v2/contracts/jbtokenstore/write/claimfor.md) transaction.

    ```
    // Save a reference to whether there exists a token and the caller prefers these claimed tokens or the project requires it.
    bool _shouldClaimTokens = (requireClaimFor[_projectId] || _preferClaimedTokens) &&
      _token != IJBToken(address(0));
    ```

    _Internal references:_

    * [`requireClaimFor`](/dev/deprecated/v2/contracts/jbtokenstore/properties/requireclaimfor.md)
3.  If claimed tokens should be minted, mint the project's token into the holders wallet. Otherwise increment the holder's balance or the unclaimed tokens for the project, and the total supply of unclaimed tokens for the project.

    ```
    if (_shouldClaimTokens)
      // If tokens should be claimed, mint tokens into the holder's wallet.
      _token.mint(_projectId, _holder, _amount);
    else {
      // Otherwise, add the tokens to the unclaimed balance and total supply.
      unclaimedBalanceOf[_holder][_projectId] = unclaimedBalanceOf[_holder][_projectId] + _amount;
      unclaimedTotalSupplyOf[_projectId] = unclaimedTotalSupplyOf[_projectId] + _amount;
    }
    ```

    _Internal references:_

    * [`unclaimedBalanceOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)
    * [`unclaimedTotalSupplyOf`](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md)

    _External references:_

    * [`mint`](/dev/deprecated/v2/contracts/jbtoken/write/mint.md)
4.  Emit a `Mint` event with the relevant parameters.

    ```
    emit Mint(_holder, _projectId, _amount, _shouldClaimTokens, _preferClaimedTokens, msg.sender);
    ```

    _Event references:_

    * [`Mint`](/dev/deprecated/v2/contracts/jbtokenstore/events/mint.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Mint new project tokens.

  @dev
  Only a project's current controller can mint its tokens.

  @param _holder The address receiving the new tokens.
  @param _projectId The ID of the project to which the tokens belong.
  @param _amount The amount of tokens to mint.
  @param _preferClaimedTokens A flag indicating whether there's a preference for minted tokens to be claimed automatically into the `_holder`s wallet if the project currently has a token contract attached.
*/
function mintFor(
  address _holder,
  uint256 _projectId,
  uint256 _amount,
  bool _preferClaimedTokens
) external override onlyController(_projectId) {
  // Get a reference to the project's current token.
  IJBToken _token = tokenOf[_projectId];

  // Save a reference to whether there exists a token and the caller prefers these claimed tokens or the project requires it.
  bool _shouldClaimTokens = (requireClaimFor[_projectId] || _preferClaimedTokens) &&
    _token != IJBToken(address(0));

  if (_shouldClaimTokens)
    // If tokens should be claimed, mint tokens into the holder's wallet.
    _token.mint(_projectId, _holder, _amount);
  else {
    // Otherwise, add the tokens to the unclaimed balance and total supply.
    unclaimedBalanceOf[_holder][_projectId] = unclaimedBalanceOf[_holder][_projectId] + _amount;
    unclaimedTotalSupplyOf[_projectId] = unclaimedTotalSupplyOf[_projectId] + _amount;
  }

  emit Mint(_holder, _projectId, _amount, _shouldClaimTokens, _preferClaimedTokens, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                            | Data                                                                                                                                                                                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Mint`**](/dev/deprecated/v2/contracts/jbtokenstore/events/mint.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>bool tokensWereClaimed</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul>        |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
