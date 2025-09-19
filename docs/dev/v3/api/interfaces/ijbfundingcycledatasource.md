# IJBFundingCycleDataSource

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/interfaces/IJBFundingCycleDataSource.sol

#### Definition

```
interface IJBFundingCycleDataSource is IERC165 {
  function payParams(JBPayParamsData calldata _data)
    external
    returns (
      uint256 weight,
      string memory memo,
      JBPayDelegateAllocation[] memory delegateAllocations
    );

  function redeemParams(JBRedeemParamsData calldata _data)
    external
    returns (
      uint256 reclaimAmount,
      string memory memo,
      JBRedemptionDelegateAllocation[] memory delegateAllocations
    );
}
```
