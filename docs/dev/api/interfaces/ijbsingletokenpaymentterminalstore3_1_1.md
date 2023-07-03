# IJBSingleTokenPaymentTerminalStore3_1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d45af6f3e4786ae53b9c9248af7f5f8ee832bece/contracts/interfaces/IJBSingleTokenPaymentTerminalStore3_1_1.sol)

## Functions

### fundingCycleStore

```solidity
function fundingCycleStore() external view returns (IJBFundingCycleStore);
```

### directory

```solidity
function directory() external view returns (IJBDirectory);
```

### prices

```solidity
function prices() external view returns (IJBPrices);
```

### balanceOf

```solidity
function balanceOf(IJBSingleTokenPaymentTerminal terminal, uint256 projectId)
    external
    view
    returns (uint256);
```

### usedDistributionLimitOf

```solidity
function usedDistributionLimitOf(
    IJBSingleTokenPaymentTerminal terminal,
    uint256 projectId,
    uint256 fundingCycleNumber
) external view returns (uint256);
```

### usedOverflowAllowanceOf

```solidity
function usedOverflowAllowanceOf(
    IJBSingleTokenPaymentTerminal terminal,
    uint256 projectId,
    uint256 fundingCycleConfiguration
) external view returns (uint256);
```

### currentOverflowOf

```solidity
function currentOverflowOf(IJBSingleTokenPaymentTerminal terminal, uint256 projectId)
    external
    view
    returns (uint256);
```

### currentTotalOverflowOf

```solidity
function currentTotalOverflowOf(uint256 projectId, uint256 decimals, uint256 currency)
    external
    view
    returns (uint256);
```

### currentReclaimableOverflowOf

```solidity
function currentReclaimableOverflowOf(
    IJBSingleTokenPaymentTerminal terminal,
    uint256 projectId,
    uint256 tokenCount,
    bool useTotalOverflow
) external view returns (uint256);
```

### currentReclaimableOverflowOf

```solidity
function currentReclaimableOverflowOf(
    uint256 projectId,
    uint256 tokenCount,
    uint256 totalSupply,
    uint256 overflow
) external view returns (uint256);
```

### recordPaymentFrom

```solidity
function recordPaymentFrom(
    address payer,
    JBTokenAmount memory amount,
    uint256 projectId,
    uint256 baseWeightCurrency,
    address beneficiary,
    string calldata inputMemo,
    bytes calldata metadata
)
    external
    returns (
        JBFundingCycle memory fundingCycle,
        uint256 tokenCount,
        JBPayDelegateAllocation3_1_1[] memory delegateAllocations,
        string memory outputMemo
    );
```

### recordRedemptionFor

```solidity
function recordRedemptionFor(
    address holder,
    uint256 projectId,
    uint256 tokenCount,
    string calldata inputMemo,
    bytes calldata metadata
)
    external
    returns (
        JBFundingCycle memory fundingCycle,
        uint256 reclaimAmount,
        JBRedemptionDelegateAllocation3_1_1[] memory delegateAllocations,
        string memory outputMemo
    );
```

### recordDistributionFor

```solidity
function recordDistributionFor(uint256 projectId, uint256 amount, uint256 currency)
    external
    returns (JBFundingCycle memory fundingCycle, uint256 distributedAmount);
```

### recordUsedAllowanceOf

```solidity
function recordUsedAllowanceOf(uint256 projectId, uint256 amount, uint256 currency)
    external
    returns (JBFundingCycle memory fundingCycle, uint256 withdrawnAmount);
```

### recordAddedBalanceFor

```solidity
function recordAddedBalanceFor(uint256 projectId, uint256 amount) external;
```

### recordMigration

```solidity
function recordMigration(uint256 projectId) external returns (uint256 balance);
```

