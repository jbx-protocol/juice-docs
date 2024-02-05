# IJBPayoutRedemptionPaymentTerminal3_1
[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/interfaces/IJBPayoutRedemptionPaymentTerminal3_1.sol)

**Inherits:**
[**`IJBPaymentTerminal`**](/dev/api/interfaces/ijbpaymentterminal/), [**`IJBPayoutTerminal3_1`**](/dev/api/interfaces/ijbpayoutterminal3_1/), [**`IJBAllowanceTerminal3_1`**](/dev/api/interfaces/ijballowanceterminal3_1/), [**`IJBRedemptionTerminal`**](/dev/api/interfaces/ijbredemptionterminal/), [**`IJBFeeHoldingTerminal`**](/dev/api/interfaces/ijbfeeholdingterminal/)


## Functions
### projects


```solidity
function projects() external view returns (IJBProjects);
```

### splitsStore


```solidity
function splitsStore() external view returns (IJBSplitsStore);
```

### directory


```solidity
function directory() external view returns (IJBDirectory);
```

### prices


```solidity
function prices() external view returns (IJBPrices);
```

### store


```solidity
function store() external view returns (IJBSingleTokenPaymentTerminalStore);
```

### baseWeightCurrency


```solidity
function baseWeightCurrency() external view returns (uint256);
```

### payoutSplitsGroup


```solidity
function payoutSplitsGroup() external view returns (uint256);
```

### heldFeesOf


```solidity
function heldFeesOf(uint256 _projectId) external view returns (JBFee[] memory);
```

### fee


```solidity
function fee() external view returns (uint256);
```

### feeGauge


```solidity
function feeGauge() external view returns (IJBFeeGauge);
```

### isFeelessAddress


```solidity
function isFeelessAddress(address _contract) external view returns (bool);
```

### migrate


```solidity
function migrate(uint256 _projectId, IJBPaymentTerminal _to) external returns (uint256 balance);
```

### processFees


```solidity
function processFees(uint256 _projectId) external;
```

### setFee


```solidity
function setFee(uint256 _fee) external;
```

### setFeeGauge


```solidity
function setFeeGauge(IJBFeeGauge _feeGauge) external;
```

### setFeelessAddress


```solidity
function setFeelessAddress(address _contract, bool _flag) external;
```

## Events
### AddToBalance

```solidity
event AddToBalance(
    uint256 indexed projectId, uint256 amount, uint256 refundedFees, string memo, bytes metadata, address caller
);
```

### Migrate

```solidity
event Migrate(uint256 indexed projectId, IJBPaymentTerminal indexed to, uint256 amount, address caller);
```

### DistributePayouts

```solidity
event DistributePayouts(
    uint256 indexed fundingCycleConfiguration,
    uint256 indexed fundingCycleNumber,
    uint256 indexed projectId,
    address beneficiary,
    uint256 amount,
    uint256 distributedAmount,
    uint256 fee,
    uint256 beneficiaryDistributionAmount,
    bytes metadata,
    address caller
);
```

### UseAllowance

```solidity
event UseAllowance(
    uint256 indexed fundingCycleConfiguration,
    uint256 indexed fundingCycleNumber,
    uint256 indexed projectId,
    address beneficiary,
    uint256 amount,
    uint256 distributedAmount,
    uint256 netDistributedamount,
    string memo,
    bytes metadata,
    address caller
);
```

### HoldFee

```solidity
event HoldFee(
    uint256 indexed projectId,
    uint256 indexed amount,
    uint256 indexed fee,
    uint256 feeDiscount,
    address beneficiary,
    address caller
);
```

### ProcessFee

```solidity
event ProcessFee(
    uint256 indexed projectId, uint256 indexed amount, bool indexed wasHeld, address beneficiary, address caller
);
```

### RefundHeldFees

```solidity
event RefundHeldFees(
    uint256 indexed projectId,
    uint256 indexed amount,
    uint256 indexed refundedFees,
    uint256 leftoverAmount,
    address caller
);
```

### Pay

```solidity
event Pay(
    uint256 indexed fundingCycleConfiguration,
    uint256 indexed fundingCycleNumber,
    uint256 indexed projectId,
    address payer,
    address beneficiary,
    uint256 amount,
    uint256 beneficiaryTokenCount,
    string memo,
    bytes metadata,
    address caller
);
```

### DelegateDidPay

```solidity
event DelegateDidPay(IJBPayDelegate indexed delegate, JBDidPayData data, uint256 delegatedAmount, address caller);
```

### RedeemTokens

```solidity
event RedeemTokens(
    uint256 indexed fundingCycleConfiguration,
    uint256 indexed fundingCycleNumber,
    uint256 indexed projectId,
    address holder,
    address beneficiary,
    uint256 tokenCount,
    uint256 reclaimedAmount,
    string memo,
    bytes metadata,
    address caller
);
```

### DelegateDidRedeem

```solidity
event DelegateDidRedeem(
    IJBRedemptionDelegate indexed delegate, JBDidRedeemData data, uint256 delegatedAmount, address caller
);
```

### DistributeToPayoutSplit

```solidity
event DistributeToPayoutSplit(
    uint256 indexed projectId,
    uint256 indexed domain,
    uint256 indexed group,
    JBSplit split,
    uint256 amount,
    uint256 netAmount,
    address caller
);
```

### SetFee

```solidity
event SetFee(uint256 fee, address caller);
```

### SetFeeGauge

```solidity
event SetFeeGauge(IJBFeeGauge indexed feeGauge, address caller);
```

### SetFeelessAddress

```solidity
event SetFeelessAddress(address indexed addrs, bool indexed flag, address caller);
```

### PayoutReverted

```solidity
event PayoutReverted(uint256 indexed projectId, JBSplit split, uint256 amount, bytes reason, address caller);
```

### FeeReverted

```solidity
event FeeReverted(
    uint256 indexed projectId, uint256 indexed feeProjectId, uint256 amount, bytes reason, address caller
);
```

