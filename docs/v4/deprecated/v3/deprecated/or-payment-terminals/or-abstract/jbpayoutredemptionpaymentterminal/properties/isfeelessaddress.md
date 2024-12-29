# isFeelessAddress

Contract: [`JBPayoutRedemptionPaymentTerminal`](/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal)

**Addresses that can be paid towards from this terminal without incurring a fee.**

_Only addresses that are considered to be contained within the ecosystem can be feeless. Funds sent outside the ecosystem may incur fees despite being stored as feeless._

#### Definition

```
/**
  @notice
  Addresses that can be paid towards from this terminal without incurring a fee.

  @dev
  Only addresses that are considered to be contained within the ecosystem can be feeless. Funds sent outside the ecosystem may incur fees despite being stored as feeless.

  _address The address that can be paid toward.
*/
mapping(address => bool) public override isFeelessAddress;
```

* Arguments:
  * `_address` is the address that can be paid toward.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/v4/deprecated/v3/interfaces/ijbpayoutredemptionpaymentterminal) interface.
