# IJBFeeHoldingTerminal

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/interfaces/IJBFeeHoldingTerminal.sol)

## Functions

### addToBalanceOf

```solidity
function addToBalanceOf(
    uint256 _projectId,
    uint256 _amount,
    address _token,
    bool _shouldRefundHeldFees,
    string calldata _memo,
    bytes calldata _metadata
) external payable;
```
