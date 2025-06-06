# _MAX_FEE

Contract: [`JBPayoutRedemptionPaymentTerminal`](/docs/v4/deprecated/v2/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

**Maximum fee that can be set for a funding cycle configuration.**

_Out of MAX_FEE (50_000_000 / 1_000_000_000)._

#### Definition

```
/**
  @notice
  Maximum fee that can be set for a funding cycle configuration.

  @dev
  Out of MAX_FEE (50_000_000 / 1_000_000_000).
*/
uint256 private constant _FEE_CAP = 50_000_000;
```

* This value must be hardcoded.
* The resulting view function is private to this contract.
