# _balance

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/deprecated/v3/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

**Checks the balance of tokens in this contract.**

#### Definition

```
/**
  @notice
  Checks the balance of tokens in this contract.

  @return The contract's balance.
*/
function _balance() internal view virtual returns (uint256);
```

* The resulting function is internal to this contract and its inheriters.
* The virtual function must be implemented by inheriters.
* The function returns the contract's balance.
