# IJBFundAccessConstraintsStore

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/49815b2e30771277ff493d21f7c8451159bbbe6a/contracts/interfaces/IJBFundAccessConstraintsStore.sol)

Inherits: [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165)

## Functions

### distributionLimitOf

```solidity
function distributionLimitOf(
    uint256 _projectId,
    uint256 _configuration,
    IJBPaymentTerminal _terminal,
    address _token
) external view returns (uint256 distributionLimit, uint256 distributionLimitCurrency);
```

### overflowAllowanceOf

```solidity
function overflowAllowanceOf(
    uint256 _projectId,
    uint256 _configuration,
    IJBPaymentTerminal _terminal,
    address _token
) external view returns (uint256 overflowAllowance, uint256 overflowAllowanceCurrency);
```

### setFor

```solidity
function setFor(
    uint256 _projectId,
    uint256 _configuration,
    JBFundAccessConstraints[] memory _fundAccessConstaints
) external;
```

## Events

### SetFundAccessConstraints

```solidity
event SetFundAccessConstraints(
    uint256 indexed fundingCycleConfiguration,
    uint256 indexed projectId,
    JBFundAccessConstraints constraints,
    address caller
);
```
