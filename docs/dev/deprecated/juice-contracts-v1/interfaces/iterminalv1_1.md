# ITerminalV1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/ITerminalV1_1.sol)

## Functions

### projects

```solidity
function projects() external view returns (IProjects);
```

### fundingCycles

```solidity
function fundingCycles() external view returns (IFundingCycles);
```

### ticketBooth

```solidity
function ticketBooth() external view returns (ITicketBooth);
```

### prices

```solidity
function prices() external view returns (IPrices);
```

### modStore

```solidity
function modStore() external view returns (IModStore);
```

### reservedTicketBalanceOf

```solidity
function reservedTicketBalanceOf(uint256 _projectId, uint256 _reservedRate) external view returns (uint256);
```

### balanceOf

```solidity
function balanceOf(uint256 _projectId) external view returns (uint256);
```

### currentOverflowOf

```solidity
function currentOverflowOf(uint256 _projectId) external view returns (uint256);
```

### claimableOverflowOf

```solidity
function claimableOverflowOf(address _account, uint256 _amount, uint256 _projectId) external view returns (uint256);
```

### fee

```solidity
function fee() external view returns (uint256);
```

### deploy

```solidity
function deploy(
    address _owner,
    bytes32 _handle,
    string calldata _uri,
    FundingCycleProperties calldata _properties,
    FundingCycleMetadata2 calldata _metadata,
    PayoutMod[] memory _payoutMods,
    TicketMod[] memory _ticketMods
) external;
```

### configure

```solidity
function configure(
    uint256 _projectId,
    FundingCycleProperties calldata _properties,
    FundingCycleMetadata2 calldata _metadata,
    PayoutMod[] memory _payoutMods,
    TicketMod[] memory _ticketMods
) external returns (uint256);
```

### printTickets

```solidity
function printTickets(
    uint256 _projectId,
    uint256 _amount,
    address _beneficiary,
    string memory _memo,
    bool _preferUnstakedTickets
) external;
```

### tap

```solidity
function tap(uint256 _projectId, uint256 _amount, uint256 _currency, uint256 _minReturnedWei)
    external
    returns (uint256);
```

### redeem

```solidity
function redeem(
    address _account,
    uint256 _projectId,
    uint256 _amount,
    uint256 _minReturnedWei,
    address payable _beneficiary,
    bool _preferUnstaked
) external returns (uint256 returnAmount);
```

### printReservedTickets

```solidity
function printReservedTickets(uint256 _projectId) external returns (uint256 reservedTicketsToPrint);
```

### setFee

```solidity
function setFee(uint256 _fee) external;
```

### burnFromDeadAddress

```solidity
function burnFromDeadAddress(uint256 _projectId) external;
```

## Events

### Pay

```solidity
event Pay(
    uint256 indexed fundingCycleId,
    uint256 indexed projectId,
    address indexed beneficiary,
    uint256 amount,
    uint256 beneficiaryTokens,
    uint256 totalTokens,
    string note,
    address caller
);
```

### AddToBalance

```solidity
event AddToBalance(uint256 indexed projectId, uint256 value, address caller);
```

### AllowMigration

```solidity
event AllowMigration(ITerminal allowed);
```

### Migrate

```solidity
event Migrate(uint256 indexed projectId, ITerminal indexed to, uint256 _amount, address caller);
```

### Configure

```solidity
event Configure(uint256 indexed fundingCycleId, uint256 indexed projectId, address caller);
```

### Tap

```solidity
event Tap(
    uint256 indexed fundingCycleId,
    uint256 indexed projectId,
    address indexed beneficiary,
    uint256 amount,
    uint256 currency,
    uint256 netTransferAmount,
    uint256 beneficiaryTransferAmount,
    uint256 govFeeAmount,
    address caller
);
```

### Redeem

```solidity
event Redeem(
    address indexed holder,
    address indexed beneficiary,
    uint256 indexed _projectId,
    uint256 amount,
    uint256 returnAmount,
    address caller
);
```

### PrintReserveTickets

```solidity
event PrintReserveTickets(
    uint256 indexed fundingCycleId,
    uint256 indexed projectId,
    address indexed beneficiary,
    uint256 count,
    uint256 beneficiaryTicketAmount,
    address caller
);
```

### DistributeToPayoutMod

```solidity
event DistributeToPayoutMod(
    uint256 indexed fundingCycleId, uint256 indexed projectId, PayoutMod mod, uint256 modCut, address caller
);
```

### DistributeToTicketMod

```solidity
event DistributeToTicketMod(
    uint256 indexed fundingCycleId, uint256 indexed projectId, TicketMod mod, uint256 modCut, address caller
);
```

### PrintTickets

```solidity
event PrintTickets(uint256 indexed projectId, address indexed beneficiary, uint256 amount, string memo, address caller);
```

### Deposit

```solidity
event Deposit(uint256 amount);
```

### EnsureTargetLocalWei

```solidity
event EnsureTargetLocalWei(uint256 target);
```

### SetYielder

```solidity
event SetYielder(IYielder newYielder);
```

### SetFee

```solidity
event SetFee(uint256 _amount);
```

### SetTargetLocalWei

```solidity
event SetTargetLocalWei(uint256 amount);
```

