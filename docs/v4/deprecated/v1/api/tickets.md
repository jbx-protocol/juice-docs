# Tickets

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/Tickets.sol)

Inherits: [`ERC20`](/), [`ERC20Permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable), [`ITickets`](/docs/v4/deprecated/v1/api/interfaces/itickets.md)

## Functions

### constructor

```solidity
constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) ERC20Permit(_name);
```

### print

```solidity
function print(address _account, uint256 _amount) external override onlyOwner;
```

### redeem

```solidity
function redeem(address _account, uint256 _amount) external override onlyOwner;
```

