# JBDeployTiered721DelegateData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/331ed61b7ae1a4c4536bcd78f5e0b7d4a67c2869/contracts/structs/JBDeployTiered721DelegateData.sol)

```solidity
struct JBDeployTiered721DelegateData {
    string name;
    string symbol;
    IJBFundingCycleStore fundingCycleStore;
    string baseUri;
    IJBTokenUriResolver tokenUriResolver;
    string contractUri;
    address owner;
    JB721PricingParams pricing;
    address reservedTokenBeneficiary;
    IJBTiered721DelegateStore store;
    JBTiered721Flags flags;
    JB721GovernanceType governanceType;
}
```

