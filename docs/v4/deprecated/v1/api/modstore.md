# ModStore

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/ModStore.sol)

Mainnet: [`0xB9E4B658298C7A36BdF4C2832042A5D6700c3Ab8`](https://etherscan.io/address/0xB9E4B658298C7A36BdF4C2832042A5D6700c3Ab8)

Inherits: [`IModStore`](/docs/v4/deprecated/v1/api/interfaces/imodstore.md), [`Operatable`](/docs/v4/deprecated/v1/api/abstract/operatable.md), [`TerminalUtility`](/docs/v4/deprecated/v1/api/abstract/terminalutility.md)

Stores mods for each project.

*Mods can be used to distribute a percentage of payments or tickets to preconfigured beneficiaries.*

## State Variables

### _payoutModsOf

```solidity
mapping(uint256 => mapping(uint256 => PayoutMod[])) private _payoutModsOf;
```

### _ticketModsOf

```solidity
mapping(uint256 => mapping(uint256 => TicketMod[])) private _ticketModsOf;
```

### projects

The contract storing project information.

```solidity
IProjects public immutable override projects;
```

## Functions

### payoutModsOf

Get all payout mods for the specified project ID.

```solidity
function payoutModsOf(uint256 _projectId, uint256 _configuration) external view override returns (PayoutMod[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get mods for.|
|`_configuration`|`uint256`|The configuration to get mods for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`PayoutMod[]`](/docs/v4/deprecated/v1/api/interfaces/payoutmod.md)|An array of all mods for the project.|

### ticketModsOf

Get all ticket mods for the specified project ID.

```solidity
function ticketModsOf(uint256 _projectId, uint256 _configuration) external view override returns (TicketMod[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get mods for.|
|`_configuration`|`uint256`|The configuration to get mods for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`TicketMod[]`](/docs/v4/deprecated/v1/api/interfaces/ticketmod.md)|An array of all mods for the project.|

### constructor

```solidity
constructor(IProjects _projects, IOperatorStore _operatorStore, ITerminalDirectory _terminalDirectory)
    Operatable(_operatorStore)
    TerminalUtility(_terminalDirectory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IProjects`](/docs/v4/deprecated/v1/api/interfaces/iprojects.md)|The contract storing project information|
|`_operatorStore`|[`IOperatorStore`](/docs/v4/deprecated/v1/api/interfaces/ioperatorstore.md)|A contract storing operator assignments.|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/v4/deprecated/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|

### setPayoutMods

Adds a mod to the payout mods list.

*Only the owner or operator of a project can make this call, or the current terminal of the project.*

```solidity
function setPayoutMods(uint256 _projectId, uint256 _configuration, PayoutMod[] memory _mods)
    external
    override
    requirePermissionAcceptingAlternateAddress(
        projects.ownerOf(_projectId),
        _projectId,
        Operations.SetPayoutMods,
        address(terminalDirectory.terminalOf(_projectId))
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project to add a mod to.|
|`_configuration`|`uint256`|The configuration to set the mods to be active during.|
|`_mods`|[`PayoutMod[]`](/docs/v4/deprecated/v1/api/interfaces/payoutmod.md)|The payout mods to set.|

### setTicketMods

Adds a mod to the ticket mods list.

*Only the owner or operator of a project can make this call, or the current terminal of the project.*

```solidity
function setTicketMods(uint256 _projectId, uint256 _configuration, TicketMod[] memory _mods)
    external
    override
    requirePermissionAcceptingAlternateAddress(
        projects.ownerOf(_projectId),
        _projectId,
        Operations.SetTicketMods,
        address(terminalDirectory.terminalOf(_projectId))
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project to add a mod to.|
|`_configuration`|`uint256`|The configuration to set the mods to be active during.|
|`_mods`|[`TicketMod[]`](/docs/v4/deprecated/v1/api/interfaces/ticketmod.md)|The ticket mods to set.|

