# DirectPaymentAddress

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/DirectPaymentAddress.sol)

Inherits: [`IDirectPaymentAddress`](/docs/dev/v1/api/interfaces/idirectpaymentaddress.md)

A contract that can receive funds directly and forward to a project's current terminal.

## State Variables

### terminalDirectory

The directory to use when resolving which terminal to send the payment to.

```solidity
ITerminalDirectory public immutable override terminalDirectory;
```

### projectId

The ID of the project to pay when this contract receives funds.

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
constructor(ITerminalDirectory _terminalDirectory, uint256 _projectId, string memory _memo);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/dev/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|
|`_projectId`|`uint256`|The ID of the project to pay when this contract receives funds.|
|`_memo`|`string`|The memo to use when this contract forwards a payment to a terminal.|

### receive

```solidity
receive() external payable;
```

