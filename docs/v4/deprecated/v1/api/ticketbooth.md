# TicketBooth

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/TicketBooth.sol)

Mainnet: [`0xee2eBCcB7CDb34a8A822b589F9E8427C24351bfc`](https://etherscan.io/address/0xee2eBCcB7CDb34a8A822b589F9E8427C24351bfc)

Inherits: [`TerminalUtility`](/docs/v4/deprecated/v1/api/abstract/terminalutility.md), [`Operatable`](/docs/v4/deprecated/v1/api/abstract/operatable.md), [`ITicketBooth`](/docs/v4/deprecated/v1/api/interfaces/iticketbooth.md)

Manage Ticket printing, redemption, and account balances.

*Tickets can be either represented internally staked, or as unstaked ERC-20s.
This contract manages these two representations and the conversion between the two.

*The total supply of a project's tickets and the balance of each account are calculated in this contract.*

## State Variables

### projects

The Projects contract which mints ERC-721's that represent project ownership and transfers.

```solidity
IProjects public immutable override projects;
```

### ticketsOf

```solidity
mapping(uint256 => ITickets) public override ticketsOf;
```

### stakedBalanceOf

```solidity
mapping(address => mapping(uint256 => uint256)) public override stakedBalanceOf;
```

### stakedTotalSupplyOf

```solidity
mapping(uint256 => uint256) public override stakedTotalSupplyOf;
```

### lockedBalanceOf

```solidity
mapping(address => mapping(uint256 => uint256)) public override lockedBalanceOf;
```

### lockedBalanceBy

```solidity
mapping(address => mapping(address => mapping(uint256 => uint256))) public override lockedBalanceBy;
```

## Functions

### totalSupplyOf

The total supply of tickets for each project, including staked and unstaked tickets.

```solidity
function totalSupplyOf(uint256 _projectId) external view override returns (uint256 supply);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get the total supply of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`supply`|`uint256`|The total supply.|

### balanceOf

The total balance of tickets a holder has for a specified project, including staked and unstaked tickets.

```solidity
function balanceOf(address _holder, uint256 _projectId) external view override returns (uint256 balance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The ticket holder to get a balance for.|
|`_projectId`|`uint256`|The project to get the `_hodler`s balance of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The balance.|

### constructor

```solidity
constructor(IProjects _projects, IOperatorStore _operatorStore, ITerminalDirectory _terminalDirectory)
    Operatable(_operatorStore)
    TerminalUtility(_terminalDirectory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IProjects`](/docs/v4/deprecated/v1/api/interfaces/iprojects.md)|A Projects contract which mints ERC-721's that represent project ownership and transfers.|
|`_operatorStore`|[`IOperatorStore`](/docs/v4/deprecated/v1/api/interfaces/ioperatorstore.md)|A contract storing operator assignments.|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/v4/deprecated/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|

### issue

Issues an owner's ERC-20 Tickets that'll be used when unstaking tickets.

*Deploys an owner's Ticket ERC-20 token contract.*

```solidity
function issue(uint256 _projectId, string calldata _name, string calldata _symbol)
    external
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, Operations.Issue);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being issued tickets.|
|`_name`|`string`|The ERC-20's name. " Juicebox ticket" will be appended.|
|`_symbol`|`string`|The ERC-20's symbol. "j" will be prepended.|

### print

Print new tickets.

*Only a project's current terminal can print its tickets.*

```solidity
function print(address _holder, uint256 _projectId, uint256 _amount, bool _preferUnstakedTickets)
    external
    override
    onlyTerminal(_projectId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The address receiving the new tickets.|
|`_projectId`|`uint256`|The project to which the tickets belong.|
|`_amount`|`uint256`|The amount to print.|
|`_preferUnstakedTickets`|`bool`|Whether ERC20's should be converted automatically if they have been issued.|

### redeem

Redeems tickets.

*Only a project's current terminal can redeem its tickets.*

```solidity
function redeem(address _holder, uint256 _projectId, uint256 _amount, bool _preferUnstaked)
    external
    override
    onlyTerminal(_projectId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The address that owns the tickets being redeemed.|
|`_projectId`|`uint256`|The ID of the project of the tickets being redeemed.|
|`_amount`|`uint256`|The amount of tickets being redeemed.|
|`_preferUnstaked`|`bool`|If the preference is to redeem tickets that have been converted to ERC-20s.|

### stake

Stakes ERC20 tickets by burning their supply and creating an internal staked version.

*Only a ticket holder or an operator can stake its tickets.*

```solidity
function stake(address _holder, uint256 _projectId, uint256 _amount)
    external
    override
    requirePermissionAllowingWildcardDomain(_holder, _projectId, Operations.Stake);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The owner of the tickets to stake.|
|`_projectId`|`uint256`|The ID of the project whos tickets are being staked.|
|`_amount`|`uint256`|The amount of tickets to stake.|

### unstake

Unstakes internal tickets by creating and distributing ERC20 tickets.

*Only a ticket holder or an operator can unstake its tickets.*

```solidity
function unstake(address _holder, uint256 _projectId, uint256 _amount)
    external
    override
    requirePermissionAllowingWildcardDomain(_holder, _projectId, Operations.Unstake);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The owner of the tickets to unstake.|
|`_projectId`|`uint256`|The ID of the project whos tickets are being unstaked.|
|`_amount`|`uint256`|The amount of tickets to unstake.|

### lock

Lock a project's tickets, preventing them from being redeemed and from converting to ERC20s.

*Only a ticket holder or an operator can lock its tickets.*

```solidity
function lock(address _holder, uint256 _projectId, uint256 _amount)
    external
    override
    requirePermissionAllowingWildcardDomain(_holder, _projectId, Operations.Lock);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The holder to lock tickets from.|
|`_projectId`|`uint256`|The ID of the project whos tickets are being locked.|
|`_amount`|`uint256`|The amount of tickets to lock.|

### unlock

Unlock a project's tickets.

*The address that locked the tickets must be the address that unlocks the tickets.*

```solidity
function unlock(address _holder, uint256 _projectId, uint256 _amount) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The holder to unlock tickets from.|
|`_projectId`|`uint256`|The ID of the project whos tickets are being unlocked.|
|`_amount`|`uint256`|The amount of tickets to unlock.|

### transfer

Allows a ticket holder to transfer its tickets to another account, without unstaking to ERC-20s.

*Only a ticket holder or an operator can transfer its tickets.*

```solidity
function transfer(address _holder, uint256 _projectId, uint256 _amount, address _recipient)
    external
    override
    requirePermissionAllowingWildcardDomain(_holder, _projectId, Operations.Transfer);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The holder to transfer tickets from.|
|`_projectId`|`uint256`|The ID of the project whos tickets are being transfered.|
|`_amount`|`uint256`|The amount of tickets to transfer.|
|`_recipient`|`address`|The recipient of the tickets.|

