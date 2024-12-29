# Redemption delegate

Before implementing, learn about delegates [here](/docs/v4/deprecated/v3/learn/glossary/delegate.md). Also see [`juice-delegate-template`](https://github.com/mejango/juice-delegate-template).

#### Specs

A contract can become a treasury redemption delegate by adhering to [`IJBRedemptionDelegate3_1_1`](/docs/v4/deprecated/v3/api/interfaces/ijbredemptiondelegate3_1_1.md):

```
interface IJBRedemptionDelegate3_1_1 is IERC165 {
  function didRedeem(JBDidRedeemData3_1_1 calldata data) external payable;
}
```

When extending the redemption functionality with a delegate, the protocol will pass a [`JBDidRedeemData3_1_1`](/docs/v4/deprecated/v3/api/data-structures/jbdidredeemdata3_1_1.md) to the `didRedeem(...)` function:

```
struct JBDidRedeemData3_1_1 {
    address holder;
    uint256 projectId;
    uint256 currentFundingCycleConfiguration;
    uint256 projectTokenCount;
    JBTokenAmount reclaimedAmount;
    JBTokenAmount forwardedAmount;
    address payable beneficiary;
    string memo;
    bytes dataSourceMetadata;
    bytes redeemerMetadata;
}
```

```
struct JBTokenAmount {
  address token;
  uint256 value;
  uint256 decimals;
  uint256 currency;
}
```

The `msg.sender` to the delegate will be the payment terminal that facilitated the redemption.

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal3_1_1`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md), such as [`JBETHPaymentTerminal3_1_1`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1.md)'s and [`JBERC20PaymentTerminal3_1_1`](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/jberc20paymentterminal3_1_1.md)'s, the redemption delegate hook gets called *before* the reclaimed amount is sent to the redemption beneficiary, but after all internal accounting has been updated.  [View the docs](/docs/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#redeemtokensof).

Make sure to only allow trusted contracts to access the `didRedeem(...)` transaction.

#### Attaching

New delegate contracts should be deployed independently. Once deployed, its address can be returned from a data source hook. See [how to build a data source](/docs/v4/deprecated/v3/build/treasury-extensions/data-source.md) for more.
