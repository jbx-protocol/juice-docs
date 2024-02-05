# TokenRepresentationProxy

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/TokenRepresentationProxy.sol)

Inherits: [`ERC20`](/)

ERC20 wrapper for TicketBooth calls that return both staked + unstaked for a project's token supply.

## State Variables

### ticketBooth

```solidity
ITicketBooth ticketBooth;
```

### projectId

```solidity
uint256 projectId;
```

## Functions

### constructor

```solidity
constructor(ITicketBooth _ticketBooth, uint256 _projectId, string memory name, string memory ticker)
    ERC20(name, ticker);
```

### totalSupply

```solidity
function totalSupply() public view virtual override returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address _account) public view virtual override returns (uint256);
```

