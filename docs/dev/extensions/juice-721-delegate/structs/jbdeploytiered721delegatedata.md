# JBDeployTiered721DelegateData

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/structs/JBDeployTiered721DelegateData.sol)

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

