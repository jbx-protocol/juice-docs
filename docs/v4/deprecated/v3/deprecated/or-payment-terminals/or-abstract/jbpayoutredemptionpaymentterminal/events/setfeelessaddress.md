
# SetFeelessAddress

Emitted from:

* [`setFeelessAddress`](/v4/deprecated/v3/deprecated/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/setfeelessaddress.md)

#### Definition

```
event SetFeelessAddress(address indexed addrs, bool indexed flag, address caller);
```

* `addrs` is the address that was made feeless or not.
* `flag` is whether or not the terminal was made feeless.
* `caller` is the address that issued the transaction within which the event was emitted.
