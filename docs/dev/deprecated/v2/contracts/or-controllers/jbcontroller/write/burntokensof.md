# burnTokensOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Burns a token holder's supply.**

_Only a token's holder, a designated operator, or a project's terminal can burn it._

#### Definition

```
function burnTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  string calldata _memo,
  bool _preferClaimedTokens
)
  external
  virtual
  override
  nonReentrant
  requirePermissionAllowingOverride(
    _holder,
    _projectId,
    JBOperations.BURN,
    directory.isTerminalDelegateOf(_projectId, msg.sender)
  ) { ... }
```

* Arguments:
  * `_holder` is the account that is having its tokens burned.
  * `_projectId` is the ID of the project to which the tokens being burned belong.
  * `_tokenCount` is the number of tokens to burn.
  * `_memo` is a memo to pass along to the emitted event.
  * `_preferClaimedTokens` is flag indicating whether a project's attached token contract should be burned first if they have been issued.
* Through the [`requirePermissionAllowingOverride`](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) modifier, the function is only accessible by the project's owner, from an operator that has been given the [`JBOperations.BURN`](/dev/deprecated/v2/libraries/jboperations.md) permission by the project owner for the provided `_projectId`, or from one of the project's terminal's delegates.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/dev/deprecated/v2/interfaces/ijbcontroller.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure there is a specified number of tokens to burn.

    ```
    // There should be tokens to burn
    if (_tokenCount == 0) revert NO_BURNABLE_TOKENS();
    ```
2.  Get a reference to the current funding cycle for the project.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _Internal references:_

    * [`fundingCycleStore`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/fundingcyclestore.md)

    _External references:_

    * [`currentOf`](/dev/deprecated/v2/contracts/jbfundingcyclestore/read/currentof.md)
3.  Make sure the current funding cycle for the project hasn't paused burning if the request is not coming from one of the project's terminals. If the request is coming from a terminal, allow burning regardless of the pause state because it could be a sub-routine of another operation such as redemption.

    ```
    // If the message sender is not a terminal, the current funding cycle must not be paused.
    if (
      _fundingCycle.burnPaused() &&
      !directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender))
    ) revert BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE();
    ```

    _Internal references:_

    * [`directory`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/directory.md)

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/dev/deprecated/v2/libraries/jbfundingcyclemetadataresolver.md)
      * `.burnPaused(...)`

    _External references:_

    * [`isTerminalOf`](/dev/deprecated/v2/contracts/jbdirectory/read/isterminalof.md)
4.  Update the token tracker so that the correct amount of reserved tokens are still mintable after the burn.

    ```
    // Update the token tracker so that reserved tokens will still be correctly mintable.
    _processedTokenTrackerOf[_projectId] =
      _processedTokenTrackerOf[_projectId] -
      int256(_tokenCount);
    ```

    _Internal references:_

    * [`_processedTokenTrackerOf`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/-_processedtokentrackerof.md)
5.  Burn the tokens.

    ```
    // Burn the tokens.
    tokenStore.burnFrom(_holder, _projectId, _tokenCount, _preferClaimedTokens);
    ```

    _Internal references:_

    * [`tokenStore`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/properties/tokenstore.md)

    _External references:_

    * [`burnFrom`](/dev/deprecated/v2/contracts/jbtokenstore/write/burnfrom.md)
6.  Emit a `BurnTokens` event with the relevant parameters.

    ```
    emit BurnTokens(_holder, _projectId, _tokenCount, _memo, msg.sender);
    ```

    _Event references:_

    * [`BurnTokens`](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/events/burntokens.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Burns a token holder's supply.

  @dev
  Only a token's holder, a designated operator, or a project's terminal can burn it.

  @param _holder The account that is having its tokens burned.
  @param _projectId The ID of the project to which the tokens being burned belong.
  @param _tokenCount The number of tokens to burn.
  @param _memo A memo to pass along to the emitted event.
  @param _preferClaimedTokens A flag indicating whether a project's attached token contract should be burned first if they have been issued.
*/
function burnTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  string calldata _memo,
  bool _preferClaimedTokens
)
  external
  virtual
  override
  requirePermissionAllowingOverride(
    _holder,
    _projectId,
    JBOperations.BURN,
    directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender))
  )
{
  // There should be tokens to burn
  if (_tokenCount == 0) revert NO_BURNABLE_TOKENS();

  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // If the message sender is not a terminal, the current funding cycle must not be paused.
  if (
    _fundingCycle.burnPaused() &&
    !directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender))
  ) revert BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE();

  // Update the token tracker so that reserved tokens will still be correctly mintable.
  _processedTokenTrackerOf[_projectId] =
    _processedTokenTrackerOf[_projectId] -
    int256(_tokenCount);

  // Burn the tokens.
  tokenStore.burnFrom(_holder, _projectId, _tokenCount, _preferClaimedTokens);

  emit BurnTokens(_holder, _projectId, _tokenCount, _memo, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                                   | Description                                                                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **`NO_BURNABLE_TOKENS`**                                 | Thrown if no tokens are being burned.                                                                                      |
| **`BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE`** | Thrown if the request is not being made by a payment terminal, and the project's current funding cycle has paused burning. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                        | Data                                                                                                                                                                                                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`BurnTokens`**](/dev/deprecated/v2/contracts/or-controllers/jbcontroller/events/burntokens.md)                                         | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 tokenCount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>                                                                                                              |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
