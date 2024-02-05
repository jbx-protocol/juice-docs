# balanceOf

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminalstore.md)

**The amount of tokens that each project has for each terminal, in terms of the terminal's token.**

#### Definition

```
/**
  @notice
  The amount of tokens that each project has for each terminal, in terms of the terminal's token.

  @dev
  The used distribution limit is represented as a fixed point number with the same amount of decimals as its relative terminal.

  _terminal The terminal to which the balance applies.
  _projectId The ID of the project to get the balance of.
*/
mapping(IJBSingleTokenPaymentTerminal => mapping(uint256 => uint256)) public override balanceOf;
```

* Arguments:
  * `_terminal` is the terminal to which the balance applies.
  * `_projectId` is the ID of the project to get the balance of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/deprecated/v2/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
