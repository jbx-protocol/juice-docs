# ITerminal

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/ITerminal.sol)

## Functions

### terminalDirectory

```solidity
function terminalDirectory() external view returns (ITerminalDirectory);
```

### migrationIsAllowed

```solidity
function migrationIsAllowed(ITerminal _terminal) external view returns (bool);
```

### pay

```solidity
function pay(uint256 _projectId, address _beneficiary, string calldata _memo, bool _preferUnstakedTickets)
    external
    payable
    returns (uint256 fundingCycleId);
```

### addToBalance

```solidity
function addToBalance(uint256 _projectId) external payable;
```

### allowMigration

```solidity
function allowMigration(ITerminal _contract) external;
```

### migrate

```solidity
function migrate(uint256 _projectId, ITerminal _to) external;
```

