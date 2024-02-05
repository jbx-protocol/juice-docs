# ProxyPaymentAddressManager

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/ProxyPaymentAddressManager.sol)

Mainnet: [`0x9C1B7A7D6b6EE04a465bD4B0F52b21807c49E36e`](https://etherscan.io/address/0x9C1B7A7D6b6EE04a465bD4B0F52b21807c49E36e)

Inherits: [`IProxyPaymentAddressManager`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iproxypaymentaddressmanager.md)

Manages deploying proxy payment addresses for Juicebox projects.

## State Variables

### _addressesOf

```solidity
mapping(uint256 => IProxyPaymentAddress[]) private _addressesOf;
```

### terminalDirectory

The directory that will be injected into proxy payment addresses.

```solidity
ITerminalDirectory public immutable override terminalDirectory;
```

### ticketBooth

The ticket boot that will be injected into proxy payment addresses.

```solidity
ITicketBooth public immutable override ticketBooth;
```

## Functions

### constructor

```solidity
constructor(ITerminalDirectory _terminalDirectory, ITicketBooth _ticketBooth);
```

### addressesOf

A list of all proxy payment addresses for the specified project ID.

```solidity
function addressesOf(uint256 _projectId) external view override returns (IProxyPaymentAddress[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get proxy payment addresses for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`IProxyPaymentAddress[]`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iproxypaymentaddress.md)|A list of proxy payment addresses for the specified project ID.|

### deploy

Deploys a proxy payment address.

```solidity
function deploy(uint256 _projectId, string memory _memo) external override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|ID of the project funds will be fowarded to.|
|`_memo`|`string`|Memo that will be attached withdrawal transactions.|

