---
sidebar_position: 2
---

# Paying a project

If you know the ID of the project you want to pay, the address of the ecosystem's [`JBDirectory`](/docs/v4/api/core/JBDirectory.md) contract, and the token you want to pay with, you can get the address of the terminal where the project is currently accepting funds. You can find this address by calling [`JBDirectory.primaryTerminal(...)`](/docs/v4/api/core/JBDirectory.md#primaryterminalof).

```javascript
function primaryTerminalOf(uint256 projectId, address token) external view override returns (IJBTerminal) { ... }
```

Once you have the address of the terminal, you can use [`IJBTerminal.pay(...)`](/docs/v4/api/core/interfaces/IJBTerminal.md#pay) to pay it.

```javascript
function pay(
  uint256 projectId,
  address token,
  uint256 amount,
  address beneficiary,
  uint256 minReturnedTokens,
  string calldata memo,
  bytes calldata metadata
)
  external payable returns (uint256 beneficiaryTokenCount) { ... }
```

Here's a complete example of how to pay a project:

*   For `rulesetConfigurations` send the following [`JBRulesetConfig`](/docs/v4/api/core/structs/JBRulesetConfig.md).

    ```javascript
    Example:

    {
      projectId: 123, // The ID of the project to pay.
      token: 0x000000000000000000000000000000000000EEEe, // The token to pay with. If this is ETH, the `amount` property will be overwritten with the ETH amount sent along with the transaction. If this is an ERC-20 token, the `amount` property will be the amount of the token to pay, and an approval must be made to the terminal before the transaction is sent.
      amount: 100_000_000_000_000_000_000_000, // The amount of the token to pay. The number of decimals used in the fixed point number should match the terminal's accounting context for the token being paid with.
      beneficiary: 0x0123456789012345678901234567890123456789, // The address that will receive the project's tokens issued from the payment.
      minReturnedTokens: 0, // The minimum amount of the project's tokens that will be issued to the beneficiary. 
      memo: "I love you", // A string that will be attached to the transaction as a memo.
      metadata: "0x0" // A bytes array that can be used to pass additional information to a pay hook if the project uses one.
    }
    ```

