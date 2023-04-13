# IJBController3_1
[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/interfaces/IJBController3_1.sol)

**Inherits:**
[**`IJBController3_0_1`**](/dev/deprecated/v3/interfaces/ijbcontroller3_0_1/), [**`ERC165`**](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165)


## Functions
### projects


```solidity
function projects() external view returns (IJBProjects);
```

### fundingCycleStore


```solidity
function fundingCycleStore() external view returns (IJBFundingCycleStore);
```

### tokenStore


```solidity
function tokenStore() external view returns (IJBTokenStore);
```

### splitsStore


```solidity
function splitsStore() external view returns (IJBSplitsStore);
```

### fundAccessConstraintsStore


```solidity
function fundAccessConstraintsStore() external view returns (IJBFundAccessConstraintsStore);
```

### directory


```solidity
function directory() external view returns (IJBDirectory);
```

### reservedTokenBalanceOf


```solidity
function reservedTokenBalanceOf(uint256 _projectId) external view returns (uint256);
```

### totalOutstandingTokensOf


```solidity
function totalOutstandingTokensOf(uint256 _projectId) external view returns (uint256);
```

### getFundingCycleOf


```solidity
function getFundingCycleOf(uint256 _projectId, uint256 _configuration)
    external
    view
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata);
```

### latestConfiguredFundingCycleOf


```solidity
function latestConfiguredFundingCycleOf(uint256 _projectId)
    external
    view
    returns (JBFundingCycle memory, JBFundingCycleMetadata memory metadata, JBBallotState);
```

### currentFundingCycleOf


```solidity
function currentFundingCycleOf(uint256 _projectId)
    external
    view
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata);
```

### queuedFundingCycleOf


```solidity
function queuedFundingCycleOf(uint256 _projectId)
    external
    view
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata);
```

### launchProjectFor


```solidity
function launchProjectFor(
    address _owner,
    JBProjectMetadata calldata _projectMetadata,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] memory _groupedSplits,
    JBFundAccessConstraints[] memory _fundAccessConstraints,
    IJBPaymentTerminal[] memory _terminals,
    string calldata _memo
) external returns (uint256 projectId);
```

### launchFundingCyclesFor


```solidity
function launchFundingCyclesFor(
    uint256 _projectId,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] memory _groupedSplits,
    JBFundAccessConstraints[] memory _fundAccessConstraints,
    IJBPaymentTerminal[] memory _terminals,
    string calldata _memo
) external returns (uint256 configuration);
```

### reconfigureFundingCyclesOf


```solidity
function reconfigureFundingCyclesOf(
    uint256 _projectId,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] memory _groupedSplits,
    JBFundAccessConstraints[] memory _fundAccessConstraints,
    string calldata _memo
) external returns (uint256);
```

### mintTokensOf


```solidity
function mintTokensOf(
    uint256 _projectId,
    uint256 _tokenCount,
    address _beneficiary,
    string calldata _memo,
    bool _preferClaimedTokens,
    bool _useReservedRate
) external returns (uint256 beneficiaryTokenCount);
```

### burnTokensOf


```solidity
function burnTokensOf(
    address _holder,
    uint256 _projectId,
    uint256 _tokenCount,
    string calldata _memo,
    bool _preferClaimedTokens
) external;
```

### distributeReservedTokensOf


```solidity
function distributeReservedTokensOf(uint256 _projectId, string memory _memo) external returns (uint256);
```

### migrate


```solidity
function migrate(uint256 _projectId, IJBMigratable _to) external;
```

## Events
### LaunchProject

```solidity
event LaunchProject(uint256 configuration, uint256 projectId, string memo, address caller);
```

### LaunchFundingCycles

```solidity
event LaunchFundingCycles(uint256 configuration, uint256 projectId, string memo, address caller);
```

### ReconfigureFundingCycles

```solidity
event ReconfigureFundingCycles(uint256 configuration, uint256 projectId, string memo, address caller);
```

### DistributeReservedTokens

```solidity
event DistributeReservedTokens(
    uint256 indexed fundingCycleConfiguration,
    uint256 indexed fundingCycleNumber,
    uint256 indexed projectId,
    address beneficiary,
    uint256 tokenCount,
    uint256 beneficiaryTokenCount,
    string memo,
    address caller
);
```

### DistributeToReservedTokenSplit

```solidity
event DistributeToReservedTokenSplit(
    uint256 indexed projectId,
    uint256 indexed domain,
    uint256 indexed group,
    JBSplit split,
    uint256 tokenCount,
    address caller
);
```

### MintTokens

```solidity
event MintTokens(
    address indexed beneficiary,
    uint256 indexed projectId,
    uint256 tokenCount,
    uint256 beneficiaryTokenCount,
    string memo,
    uint256 reservedRate,
    address caller
);
```

### BurnTokens

```solidity
event BurnTokens(address indexed holder, uint256 indexed projectId, uint256 tokenCount, string memo, address caller);
```

### Migrate

```solidity
event Migrate(uint256 indexed projectId, IJBMigratable to, address caller);
```

### PrepMigration

```solidity
event PrepMigration(uint256 indexed projectId, address from, address caller);
```

