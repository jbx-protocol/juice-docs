# IModStore

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/interfaces/IModStore.sol)

## Functions

### projects

```solidity
function projects() external view returns (IProjects);
```

### payoutModsOf

```solidity
function payoutModsOf(uint256 _projectId, uint256 _configuration) external view returns (PayoutMod[] memory);
```

### ticketModsOf

```solidity
function ticketModsOf(uint256 _projectId, uint256 _configuration) external view returns (TicketMod[] memory);
```

### setPayoutMods

```solidity
function setPayoutMods(uint256 _projectId, uint256 _configuration, PayoutMod[] memory _mods) external;
```

### setTicketMods

```solidity
function setTicketMods(uint256 _projectId, uint256 _configuration, TicketMod[] memory _mods) external;
```

## Events

### SetPayoutMod

```solidity
event SetPayoutMod(uint256 indexed projectId, uint256 indexed configuration, PayoutMod mods, address caller);
```

### SetTicketMod

```solidity
event SetTicketMod(uint256 indexed projectId, uint256 indexed configuration, TicketMod mods, address caller);
```

