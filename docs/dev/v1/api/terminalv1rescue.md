# TerminalV1Rescue

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/TerminalV1Rescue.sol)

Inherits: [`Operatable`](/docs/dev/v1/api/abstract/operatable.md), [`ITerminalV1Rescue`](/docs/dev/v1/api/interfaces/iterminalv1rescue.md), [`ITerminal`](/docs/dev/v1/api/interfaces/iterminal.md), [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

Terminal allowing allow listed projects with one-time funding cycles to rescue stuck ETH.

## State Variables

### projects

The Projects contract which mints ERC-721's that represent project ownership and transfers.

```solidity
IProjects public immutable override projects;
```

### fundingCycles

The contract storing all funding cycle configurations.

```solidity
IFundingCycles public immutable override fundingCycles;
```

### ticketBooth

The contract that manages Ticket printing and redeeming.

```solidity
ITicketBooth public immutable override ticketBooth;
```

### terminalDirectory

The directory of terminals.

```solidity
ITerminalDirectory public immutable override terminalDirectory;
```

### balanceOf

The amount of ETH that each project is responsible for.

```solidity
mapping(uint256 => uint256) public override balanceOf;
```

### rescueAllowed

The addresses that are allowed to be rescued.

```solidity
mapping(uint256 => bool) public override rescueAllowed;
```

### migrationIsAllowed

```solidity
mapping(ITerminal => bool) public override migrationIsAllowed;
```

## Functions

### constructor

```solidity
constructor(
    IProjects _projects,
    IFundingCycles _fundingCycles,
    ITicketBooth _ticketBooth,
    IOperatorStore _operatorStore,
    ITerminalDirectory _terminalDirectory,
    address _owner
) Operatable(_operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IProjects`](/docs/dev/v1/api/interfaces/iprojects.md)|A Projects contract which mints ERC-721's that represent project ownership and transfers.|
|`_fundingCycles`|[`IFundingCycles`](/docs/dev/v1/api/interfaces/ifundingcycles.md)|A funding cycle configuration store.|
|`_ticketBooth`|[`ITicketBooth`](/docs/dev/v1/api/interfaces/iticketbooth.md)|A contract that manages Ticket printing and redeeming.|
|`_operatorStore`|[`IOperatorStore`](/docs/dev/v1/api/interfaces/ioperatorstore.md)|A contract storing operator assignments.|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/dev/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|
|`_owner`|`address`||

### printTickets

Allows a project to print tickets for a specified beneficiary.

*Only a project's owner or a designated operator can print tickets.*

```solidity
function printTickets(
    uint256 _projectId,
    uint256 _amount,
    address _beneficiary,
    string memory _memo,
    bool _preferUnstakedTickets
) external override requirePermission(projects.ownerOf(_projectId), _projectId, Operations.PrintTickets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to print tickets for.|
|`_amount`|`uint256`|The amount of tickets to print.|
|`_beneficiary`|`address`|The address to send the printed tickets to.|
|`_memo`|`string`|A memo to leave with the printing.|
|`_preferUnstakedTickets`|`bool`|If there is a preference to unstake the printed tickets.|

### rescue

A function that burns the supply of the dead address for a project.

*Callable only by project owner, if rescue is allowed by the projectId, if the project's current funding cycle is non recurring.*

```solidity
function rescue(uint256 _projectId, address payable _beneficiary, uint256 _amount) external override nonReentrant;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whose ETH is being resued.|
|`_beneficiary`|`address payable`|The recipient of the resucued funds.|
|`_amount`|`uint256`|The amount to rescue as a fixed point number.|

### addToBalance

Receives and allocates funds belonging to the specified project.

```solidity
function addToBalance(uint256 _projectId) external payable override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funds received belong.|

### toggleRescue

Allows certain projects to migrate to have funds rescued.

```solidity
function toggleRescue(uint256 _projectId) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to allow rescuing.|

### migrate

NO-OP

```solidity
function migrate(uint256, ITerminal) external pure override;
```

### allowMigration

NO-OP

```solidity
function allowMigration(ITerminal) external pure override;
```

### pay

NO-OP

```solidity
function pay(uint256, address, string calldata, bool) external payable override returns (uint256);
```

