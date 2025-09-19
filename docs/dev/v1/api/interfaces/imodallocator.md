# IModAllocator

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IModAllocator.sol)

## Functions

### allocate

```solidity
function allocate(uint256 _projectId, uint256 _forProjectId, address _beneficiary) external payable;
```

## Events

### Allocate

```solidity
event Allocate(
    uint256 indexed projectId, uint256 indexed forProjectId, address indexed beneficiary, uint256 amount, address caller
);
```

