---
sidebar_position: 7
---

# Contract Examples

Simple contract examples which integrate with Juicebox. If you're building new Juicebox-related contracts, join our [Discord server](https://discord.gg/juicebox) for help!

## Pay

A simple contract which pays a project through their primary ETH terminal.

```
import '@jbx-protocol/juice-contracts-v3/contracts/interfaces/IJBDirectory.sol';
import '@jbx-protocol/juice-contracts-v3/contracts/libraries/JBTokens.sol';

contract MyBangarangApp {
  // Keep a reference to the directory in which project's current payment terminal's can be found.
  IJBDirectory directory;

  // Keep a reference to the project ID that'll be paid.
  uint256 projectId;

  constructor(IJBDirectory _directory, uint256 _projectId) {
    directory = _directory;
    projectId = _projectId;
  }

  function doSomething() external payable {
    // Get the payment terminal the project currently prefers to accept ETH through.
    IJBPaymentTerminal _ethTerminal = directory.primaryTerminalOf(projectId, JBTokens.ETH);

    _ethTerminal.pay{ value: msg.value }(
      projectId, // pay the correct project.
      amount, // pay the full amount sent to this function.
      JBTokens.ETH, // assert that the payment is being made in ETH.
      msg.sender, // send the msg.sender as the beneficiary of any tokens issued from the payment.
      0, // if you know the amount of project tokens you expect to be receiving as a result of this payment, specify it here to ensure this happens accordingly. this can be useful if your expectations rely on an oracle calculation. set to 0 if you're ok getting whatever you get.
      false, // set this to true if you know the project has issued ERC-20's, and you prefer receiving the ERC-20's directly instead of keeping the option to claim later.
      "This is a test payment!!", // send a memo if you want,
      bytes(0) // no need to send metadata. if you know the project is using an extension that requires more information to fulfill the operation -- such as NFT minting -- you'll want to add the appropriate formatted metadata here.
    });
  }
}
```

## Read Balance

A simple contract which reads a project's balance in their primary ETH terminal.

```
import '@jbx-protocol/juice-contracts-v3/contracts/interfaces/IJBDirectory.sol';
import '@jbx-protocol/juice-contracts-v3/contracts/interfaces/IJBETHPaymentTerminal.sol';
import '@jbx-protocol/juice-contracts-v3/contracts/libraries/JBTokens.sol';

contract JBProjectViewUtil {
  // Keep a reference to the directory in which project's current payment terminal's can be found.
  IJBDirectory directory;

  constructor(IJBDirectory _directory, uint256 _projectId) {
    directory = _directory;
  }

  function getETHBalance(uint256 _projectId) external returns (uint256) {
    // Get the payment terminal the project currently prefers to accept ETH through.
    IJBPaymentTerminal _ethTerminal = directory.primaryTerminalOf(projectId, JBTokens.ETH);

    // Assumes the terminal is a IJBETHPaymentTerminal. If the terminal could be a lesser version, a ERC165 check should be done before casting.
    return IJBETHPaymentTerminal(_ethTerminal).store().balanceOf(_ethTerminal, projectId);
  }
}
```

## Read Overflow

A simple project which reads a project's overflow in their primary ETH terminal. A project's [*Overflow*](/v4/deprecated/v3/learn/glossary/overflow/) is the funds it holds which aren't needed for the current funding cycle's payouts.

```
import '@jbx-protocol/juice-contracts-v3/contracts/interfaces/IJBDirectory.sol';
import '@jbx-protocol/juice-contracts-v3/contracts/libraries/JBTokens.sol';

contract JBProjectViewUtil {
  // Keep a reference to the directory in which project's current payment terminal's can be found.
  IJBDirectory directory;

  constructor(IJBDirectory _directory, uint256 _projectId) {
    directory = _directory;
  }

  function getETHBalance(uint256 _projectId) external returns (uint256) {
    // Get the payment terminal the project currently prefers to accept ETH through.
    IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_projectId, JBTokens.ETH);

    // Return a project's balance in excess of any commitments already made but not yet distributed.
    return _terminal.currentEthOverflowOf(_projectId);
  }
}
```

[`IJBPaymentTerminal`](/v4/deprecated/v3/api/interfaces/ijbpaymentterminal/)s are required to report how much ETH's worth of tokens it holds for a project in excess of funds needed for the current funding cycle's payouts via [`IJBPaymentTerminal.currentEthOverflowOf(uint256 _projectId)`](/v4/deprecated/v3/api/interfaces/ijbpaymentterminal/). The terminal can be written to assume a conversion rate to ETH of 0, meaning it could have a balance of 10,000 shitcoins but still have an ETH overflow of 0.

This requirement allows for straightforwards calculation of a project's total redeemable balance for use in redemption calculations and custom [data sources](/v4/deprecated/v3/learn/glossary/data-source/).
