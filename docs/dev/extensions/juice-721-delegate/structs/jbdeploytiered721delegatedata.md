# JBDeployTiered721DelegateData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/structs/JBDeployTiered721DelegateData.sol)

```solidity
struct JBDeployTiered721DelegateData {
    string name;
    string symbol;
    IJBFundingCycleStore fundingCycleStore;
    string baseUri;
    IJB721TokenUriResolver tokenUriResolver;
    string contractUri;
    JB721PricingParams pricing;
    address reservedTokenBeneficiary;
    IJBTiered721DelegateStore store;
    JBTiered721Flags flags;
    JB721GovernanceType governanceType;
}
```
