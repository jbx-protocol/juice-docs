# defaultBeneficiary

Contract: [`JBETHERC20ProjectPayer`](/docs/v4/deprecated/v2/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/docs/v4/deprecated/v2/interfaces/ijbprojectpayer.md)

**The beneficiary that should be used in the payment made when this contract receives payments.**

#### Definition

```
/**
  @notice
  The beneficiary that should be used in the payment made when this contract receives payments.
*/
address payable public override defaultBeneficiary;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectPayer`](/docs/v4/deprecated/v2/interfaces/ijbprojectpayer.md) interface.
