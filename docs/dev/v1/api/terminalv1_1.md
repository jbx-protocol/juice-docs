# TerminalV1_1

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/TerminalV1_1.sol)

Mainnet: [`0x981c8ECD009E3E84eE1fF99266BF1461a12e5c68`](https://etherscan.io/address/0x981c8ECD009E3E84eE1fF99266BF1461a12e5c68)

Inherits: [`Operatable`](/docs/dev/v1/api/abstract/operatable.md), [`ITerminalV1_1`](/docs/dev/v1/api/interfaces/iterminalv1_1.md), [`ITerminal`](/docs/dev/v1/api/interfaces/iterminal.md), [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

This contract manages the Juicebox ecosystem, serves as a payment terminal, and custodies all funds.

*A project can transfer its funds, along with the power to reconfigure and mint/burn their Tickets, from this contract to another allowed terminal contract at any time.*

## State Variables

### _processedTicketTrackerOf

```solidity
mapping(uint256 => int256) private _processedTicketTrackerOf;
```

### _deadAddress

```solidity
address private constant _deadAddress = address(0x000000000000000000000000000000000000dEaD);
```

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

### modStore

The contract that stores mods for each project.

```solidity
IModStore public immutable override modStore;
```

### prices

The prices feeds.

```solidity
IPrices public immutable override prices;
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

### fee

The percent fee the Juicebox project takes from tapped amounts. Out of 200.

```solidity
uint256 public override fee = 10;
```

### migrationIsAllowed

```solidity
mapping(ITerminal => bool) public override migrationIsAllowed;
```

## Functions

### currentOverflowOf

Gets the current overflowed amount for a specified project.

```solidity
function currentOverflowOf(uint256 _projectId) external view override returns (uint256 overflow);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get overflow for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`overflow`|`uint256`|The current overflow of funds for the project.|

### reservedTicketBalanceOf

Gets the amount of reserved tickets that a project has.

```solidity
function reservedTicketBalanceOf(uint256 _projectId, uint256 _reservedRate) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get overflow for.|
|`_reservedRate`|`uint256`|The reserved rate to use to make the calculation.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amount overflow The current overflow of funds for the project.|

### claimableOverflowOf

The amount of tokens that can be claimed by the given address.

*The _account must have at least _count tickets for the specified project.*

*If there is a funding cycle reconfiguration ballot open for the project, the project's current bonding curve is bypassed.*

*No more than the overflow can be claimable.*

```solidity
function claimableOverflowOf(address _account, uint256 _projectId, uint256 _count)
    public
    view
    override
    returns (uint256 _claimableOverflow);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address to get an amount for.|
|`_projectId`|`uint256`|The ID of the project to get a claimable amount for.|
|`_count`|`uint256`|The number of Tickets that would be redeemed to get the resulting amount.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_claimableOverflow`|`uint256`|amount The amount of tokens that can be claimed.|

### constructor

```solidity
constructor(
    IProjects _projects,
    IFundingCycles _fundingCycles,
    ITicketBooth _ticketBooth,
    IOperatorStore _operatorStore,
    IModStore _modStore,
    IPrices _prices,
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
|`_modStore`|[`IModStore`](/docs/dev/v1/api/interfaces/imodstore.md)|A storage for a project's mods.|
|`_prices`|[`IPrices`](/docs/dev/v1/api/interfaces/iprices.md)|A price feed contract to use.|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/dev/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|
|`_owner`|`address`||

### deploy

Deploys a project. This will mint an ERC-721 into the `_owner`'s account, configure a first funding cycle, and set up any mods.

*Each operation withing this transaction can be done in sequence separately.*

*Anyone can deploy a project on an owner's behalf.*

*_properties.target The amount that the project wants to receive in this funding cycle. Sent as a wad.*

*_properties.currency The currency of the `target`. Send 0 for ETH or 1 for USD.*

*_properties.duration The duration of the funding stage for which the `target` amount is needed. Measured in days. Send 0 for a boundless cycle reconfigurable at any time.*

*_properties.cycleLimit The number of cycles that this configuration should last for before going back to the last permanent. This has no effect for a project's first funding cycle.*

- _properties.discountRate A number from 0-200 indicating how valuable a contribution to this funding stage is compared to the project's previous funding stage.
If it's 200, each funding stage will have equal weight.
If the number is 180, a contribution to the next funding stage will only give you 90% of tickets given to a contribution of the same amount during the current funding stage.
If the number is 0, an non-recurring funding stage will get made.

*_properties.ballot The new ballot that will be used to approve subsequent reconfigurations.*

*_metadata.reservedRate A number from 0-200 indicating the percentage of each contribution's tickets that will be reserved for the project owner.*

- _metadata.bondingCurveRate The rate from 0-200 at which a project's Tickets can be redeemed for surplus.
The bonding curve formula is https://www.desmos.com/calculator/sp9ru6zbpk
where x is _count, o is _currentOverflow, s is _totalSupply, and r is _bondingCurveRate.

*_metadata.reconfigurationBondingCurveRate The bonding curve rate to apply when there is an active ballot.*

```solidity
function deploy(
    address _owner,
    bytes32 _handle,
    string calldata _uri,
    FundingCycleProperties calldata _properties,
    FundingCycleMetadata2 calldata _metadata,
    PayoutMod[] memory _payoutMods,
    TicketMod[] memory _ticketMods
) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The address that will own the project.|
|`_handle`|`bytes32`|The project's unique handle.|
|`_uri`|`string`|A link to information about the project and this funding cycle.|
|`_properties`|[`FundingCycleProperties`](/docs/dev/v1/api/interfaces/fundingcycleproperties.md)|The funding cycle configuration.|
|`_metadata`|[`FundingCycleMetadata2`](/docs/dev/v1/api/interfaces/fundingcyclemetadata2.md)|A struct specifying the TerminalV1 specific params _bondingCurveRate, and _reservedRate.|
|`_payoutMods`|[`PayoutMod[]`](/docs/dev/v1/api/interfaces/payoutmod.md)|Any payout mods to set.|
|`_ticketMods`|[`TicketMod[]`](/docs/dev/v1/api/interfaces/ticketmod.md)|Any ticket mods to set.|

### configure

Configures the properties of the current funding cycle if the project hasn't distributed tickets yet, or
sets the properties of the proposed funding cycle that will take effect once the current one expires
if it is approved by the current funding cycle's ballot.

*Only a project's owner or a designated operator can configure its funding cycles.*

*_properties.target The amount that the project wants to receive in this funding stage. Sent as a wad.*

*_properties.currency The currency of the `target`. Send 0 for ETH or 1 for USD.*

*_properties.duration The duration of the funding stage for which the `target` amount is needed. Measured in days. Send 0 for a boundless cycle reconfigurable at any time.*

*_properties.cycleLimit The number of cycles that this configuration should last for before going back to the last permanent. This has no effect for a project's first funding cycle.*

- _properties.discountRate A number from 0-200 indicating how valuable a contribution to this funding stage is compared to the project's previous funding stage.
If it's 200, each funding stage will have equal weight.
If the number is 180, a contribution to the next funding stage will only give you 90% of tickets given to a contribution of the same amount during the current funding stage.
If the number is 0, an non-recurring funding stage will get made.

*_properties.ballot The new ballot that will be used to approve subsequent reconfigurations.*

*_metadata.reservedRate A number from 0-200 indicating the percentage of each contribution's tickets that will be reserved for the project owner.*

- _metadata.bondingCurveRate The rate from 0-200 at which a project's Tickets can be redeemed for surplus.
The bonding curve formula is https://www.desmos.com/calculator/sp9ru6zbpk
where x is _count, o is _currentOverflow, s is _totalSupply, and r is _bondingCurveRate.

*_metadata.reconfigurationBondingCurveRate The bonding curve rate to apply when there is an active ballot.*

```solidity
function configure(
    uint256 _projectId,
    FundingCycleProperties calldata _properties,
    FundingCycleMetadata2 calldata _metadata,
    PayoutMod[] memory _payoutMods,
    TicketMod[] memory _ticketMods
)
    external
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, Operations.Configure)
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being reconfigured.|
|`_properties`|[`FundingCycleProperties`](/docs/dev/v1/api/interfaces/fundingcycleproperties.md)|The funding cycle configuration.|
|`_metadata`|[`FundingCycleMetadata2`](/docs/dev/v1/api/interfaces/fundingcyclemetadata2.md)|A struct specifying the TerminalV1 specific params _bondingCurveRate, and _reservedRate.|
|`_payoutMods`|[`PayoutMod[]`](/docs/dev/v1/api/interfaces/payoutmod.md)||
|`_ticketMods`|[`TicketMod[]`](/docs/dev/v1/api/interfaces/ticketmod.md)||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the funding cycle that was successfully configured.|

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

### burnFromDeadAddress

A function that burns the supply of the dead address for a project.

*Callable by anyone.*

```solidity
function burnFromDeadAddress(uint256 _projectId) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whose tokens are being burned.|

### pay

Contribute ETH to a project.

*Print's the project's tickets proportional to the amount of the contribution.*

*The msg.value is the amount of the contribution in wei.*

```solidity
function pay(uint256 _projectId, address _beneficiary, string calldata _memo, bool _preferUnstakedTickets)
    external
    payable
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being contribute to.|
|`_beneficiary`|`address`|The address to print Tickets for.|
|`_memo`|`string`|A memo that will be included in the published event.|
|`_preferUnstakedTickets`|`bool`|Whether ERC20's should be unstaked automatically if they have been issued.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the funding cycle that the payment was made during.|

### tap

Tap into funds that have been contributed to a project's current funding cycle.

*Anyone can tap funds on a project's behalf.*

```solidity
function tap(uint256 _projectId, uint256 _amount, uint256 _currency, uint256 _minReturnedWei)
    external
    override
    nonReentrant
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle being tapped belongs.|
|`_amount`|`uint256`|The amount being tapped, in the funding cycle's currency.|
|`_currency`|`uint256`|The expected currency being tapped.|
|`_minReturnedWei`|`uint256`|The minimum number of wei that the amount should be valued at.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The ID of the funding cycle that was tapped.|

### redeem

Addresses can redeem their Tickets to claim the project's overflowed ETH.

*Only a ticket's holder or a designated operator can redeem it.*

```solidity
function redeem(
    address _account,
    uint256 _projectId,
    uint256 _count,
    uint256 _minReturnedWei,
    address payable _beneficiary,
    bool _preferUnstaked
)
    external
    override
    nonReentrant
    requirePermissionAllowingWildcardDomain(_account, _projectId, Operations.Redeem)
    returns (uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to redeem tickets for.|
|`_projectId`|`uint256`|The ID of the project to which the Tickets being redeemed belong.|
|`_count`|`uint256`|The number of Tickets to redeem.|
|`_minReturnedWei`|`uint256`|The minimum amount of Wei expected in return.|
|`_beneficiary`|`address payable`|The address to send the ETH to.|
|`_preferUnstaked`|`bool`|If the preference is to redeem tickets that have been converted to ERC-20s.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of ETH that the tickets were redeemed for.|

### migrate

Allows a project owner to migrate its funds and operations to a new contract.

*Only a project's owner or a designated operator can migrate it.*

```solidity
function migrate(uint256 _projectId, ITerminal _to)
    external
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, Operations.Migrate)
    nonReentrant;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being migrated.|
|`_to`|[`ITerminal`](/docs/dev/v1/api/interfaces/iterminal.md)|The contract that will gain the project's funds.|

### addToBalance

Receives and allocates funds belonging to the specified project.

```solidity
function addToBalance(uint256 _projectId) external payable override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funds received belong.|

### allowMigration

Adds to the contract addresses that projects can migrate their Tickets to.

*Only governance can add a contract to the migration allow list.*

```solidity
function allowMigration(ITerminal _contract) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_contract`|[`ITerminal`](/docs/dev/v1/api/interfaces/iterminal.md)|The contract to allow.|

### setFee

Allow the admin to change the fee.

*Only funding cycle reconfigurations after the new fee is set will use the new fee.
All future funding cycles based on configurations made in the past will use the fee that was set at the time of the configuration.

*Only the owner can set a new fee.*

*The max fee is 5%.*

```solidity
function setFee(uint256 _fee) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fee`|`uint256`|The new fee percent. Out of 200.|

### printReservedTickets

Prints all reserved tickets for a project.

```solidity
function printReservedTickets(uint256 _projectId) public override returns (uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the reserved tickets belong.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of tickets that are being printed.|

### _distributeToPayoutMods

Pays out the mods for the specified funding cycle.

```solidity
function _distributeToPayoutMods(FundingCycle memory _fundingCycle, uint256 _amount, string memory _memo)
    private
    returns (uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/v1/api/interfaces/fundingcycle.md)|The funding cycle to base the distribution on.|
|`_amount`|`uint256`|The total amount being paid out.|
|`_memo`|`string`|A memo to send along with project payouts.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|If the mod percents dont add up to 100%, the leftover amount is returned.|

### _distributeToTicketMods

distributed tickets to the mods for the specified funding cycle.

```solidity
function _distributeToTicketMods(FundingCycle memory _fundingCycle, uint256 _amount)
    private
    returns (uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/v1/api/interfaces/fundingcycle.md)|The funding cycle to base the ticket distribution on.|
|`_amount`|`uint256`|The total amount of tickets to print.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|If the mod percents dont add up to 100%, the leftover amount is returned.|

### _pay

See the documentation for 'pay'.

```solidity
function _pay(
    uint256 _projectId,
    uint256 _amount,
    address _beneficiary,
    string memory _memo,
    bool _preferUnstakedTickets
) private returns (uint256);
```

### _overflowFrom

Gets the amount overflowed in relation to the provided funding cycle.

*This amount changes as the price of ETH changes against the funding cycle's currency.*

```solidity
function _overflowFrom(FundingCycle memory _currentFundingCycle) private view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_currentFundingCycle`|[`FundingCycle`](/docs/dev/v1/api/interfaces/fundingcycle.md)|The ID of the funding cycle to base the overflow on.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|overflow The current overflow of funds.|

### _reservedTicketAmountFrom

Gets the amount of reserved tickets currently tracked for a project given a reserved rate.

```solidity
function _reservedTicketAmountFrom(int256 _processedTicketTracker, uint256 _reservedRate, uint256 _totalEligibleTickets)
    private
    pure
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_processedTicketTracker`|`int256`|The tracker to make the calculation with.|
|`_reservedRate`|`uint256`|The reserved rate to use to make the calculation.|
|`_totalEligibleTickets`|`uint256`|The total amount to make the calculation with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amount reserved ticket amount.|

### _validateAndPackFundingCycleMetadata

Validate and pack the funding cycle metadata.

```solidity
function _validateAndPackFundingCycleMetadata(FundingCycleMetadata2 memory _metadata)
    private
    pure
    returns (uint256 packed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|[`FundingCycleMetadata2`](/docs/dev/v1/api/interfaces/fundingcyclemetadata2.md)|The metadata to validate and pack.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`packed`|`uint256`|The packed uint256 of all metadata params. The first 8 bytes specify the version.|

### _takeFee

Takes a fee into the Governance contract's project.

```solidity
function _takeFee(uint256 _from, uint256 _percent, address _beneficiary, string memory _memo)
    private
    returns (uint256 feeAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`uint256`|The amount to take a fee from.|
|`_percent`|`uint256`|The percent fee to take. Out of 200.|
|`_beneficiary`|`address`|The address to print governance's tickets for.|
|`_memo`|`string`|A memo to send with the fee.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeAmount`|`uint256`|The amount of the fee taken.|

