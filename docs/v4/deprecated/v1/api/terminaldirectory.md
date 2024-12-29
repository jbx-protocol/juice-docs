# TerminalDirectory

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/TerminalDirectory.sol)

Mainnet: [`0x46C9999A2EDCD5aA177ed7E8af90c68b7d75Ba46`](https://etherscan.io/address/0x46C9999A2EDCD5aA177ed7E8af90c68b7d75Ba46)

Inherits: [`ITerminalDirectory`](/docs/v4/deprecated/v1/api/interfaces/iterminaldirectory.md), [`Operatable`](/docs/v4/deprecated/v1/api/abstract/operatable.md)

Allows project owners to deploy proxy contracts that can pay them when receiving funds directly.

## State Variables

### _addressesOf

```solidity
mapping(uint256 => IDirectPaymentAddress[]) private _addressesOf;
```

### projects

The Projects contract which mints ERC-721's that represent project ownership and transfers.

```solidity
IProjects public immutable override projects;
```

### terminalOf

For each project ID, the juicebox terminal that the direct payment addresses are proxies for.

```solidity
mapping(uint256 => ITerminal) public override terminalOf;
```

### beneficiaryOf

For each address, the address that will be used as the beneficiary of direct payments made.

```solidity
mapping(address => address) public override beneficiaryOf;
```

### unstakedTicketsPreferenceOf

For each address, the preference of whether ticket will be auto claimed as ERC20s when a payment is made.

```solidity
mapping(address => bool) public override unstakedTicketsPreferenceOf;
```

## Functions

### addressesOf

A list of all direct payment addresses for the specified project ID.

```solidity
function addressesOf(uint256 _projectId) external view override returns (IDirectPaymentAddress[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get direct payment addresses for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`IDirectPaymentAddress[]`](/docs/v4/deprecated/v1/api/interfaces/idirectpaymentaddress.md)|A list of direct payment addresses for the specified project ID.|

### constructor

```solidity
constructor(IProjects _projects, IOperatorStore _operatorStore) Operatable(_operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IProjects`](/docs/v4/deprecated/v1/api/interfaces/iprojects.md)|A Projects contract which mints ERC-721's that represent project ownership and transfers.|
|`_operatorStore`|[`IOperatorStore`](/docs/v4/deprecated/v1/api/interfaces/ioperatorstore.md)|A contract storing operator assignments.|

### deployAddress

Allows anyone to deploy a new direct payment address for a project.

```solidity
function deployAddress(uint256 _projectId, string calldata _memo) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to deploy a direct payment address for.|
|`_memo`|`string`|The note to use for payments made through the new direct payment address.|

### setTerminal

Update the juicebox terminal that payments to direct payment addresses will be forwarded for the specified project ID.

```solidity
function setTerminal(uint256 _projectId, ITerminal _terminal) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to set a new terminal for.|
|`_terminal`|[`ITerminal`](/docs/v4/deprecated/v1/api/interfaces/iterminal.md)|The new terminal to set.|

### setPayerPreferences

Allows any address to pre set the beneficiary of their payments to any direct payment address,
and to pre set whether to prefer to unstake tickets into ERC20's when making a payment.

```solidity
function setPayerPreferences(address _beneficiary, bool _preferUnstakedTickets) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address`|The beneficiary to set.|
|`_preferUnstakedTickets`|`bool`|The preference to set.|

