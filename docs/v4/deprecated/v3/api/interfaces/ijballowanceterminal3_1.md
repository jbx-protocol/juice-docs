# IJBAllowanceTerminal3_1
[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/interfaces/IJBAllowanceTerminal3_1.sol)


## Functions
### useAllowanceOf


```solidity
function useAllowanceOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    address _token,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string calldata _memo,
    bytes calldata _metadata
) external returns (uint256 netDistributedAmount);
```

