# ProxyPaymentAddress

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/ProxyPaymentAddress.sol)

Inherits: [`IProxyPaymentAddress`](/docs/v4/deprecated/v1/api/interfaces/iproxypaymentaddress.md), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

A contract that can receive and hold funds for a given project.
Once funds are tapped, tickets are printed and can be transferred out of the contract at a later date.
Particularly useful for routing funds from third-party platforms (e.g., Open Sea).

## State Variables

### terminalDirectory

The directory to use when resolving which terminal to send the payment to.

```solidity
ITerminalDirectory public immutable override terminalDirectory;
```

### ticketBooth

The ticket booth to use when transferring tickets held by this contract to a beneficiary.

```solidity
ITicketBooth public immutable override ticketBooth;
```

### projectId

The ID of the project tickets should be redeemed for.

```solidity
uint256 public immutable override projectId;
```

### memo

The memo to use when this contract forwards a payment to a terminal.

```solidity
string public override memo;
```

## Functions

### constructor

```solidity
constructor(ITerminalDirectory _terminalDirectory, ITicketBooth _ticketBooth, uint256 _projectId, string memory _memo);
```

### receive

```solidity
receive() external payable;
```

### tap

```solidity
function tap() external override;
```

### transferTickets

Transfers tickets held by this contract to a beneficiary.

```solidity
function transferTickets(address _beneficiary, uint256 _amount) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address`|Address of the beneficiary tickets will be transferred to.|
|`_amount`|`uint256`||

