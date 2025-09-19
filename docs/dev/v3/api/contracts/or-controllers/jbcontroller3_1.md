# JBController3_1

Stitches together funding cycles and project tokens, making sure all activity is accounted for and correct.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/JBController3_1.sol)

Mainnet: [`0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b`](https://etherscan.io/address/0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b)

Goerli: [`0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6`](https://goerli.etherscan.io/address/0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6)

Inherits: [`JBOperatable`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/README.md), [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165), [`IJBController3_1`](/docs/dev/v3/api/interfaces/ijbcontroller3_1.md), [`IJBMigratable`](/docs/dev/v3/api/interfaces/ijbmigratable.md)

Adheres to:

- [`IJBController3_1`](/docs/dev/v3/api/interfaces/ijbcontroller3_1.md): General interface for the generic controller methods in this contract that interacts with funding cycles and tokens according to the protocol's rules.
- [`IJBMigratable`](/docs/dev/v3/api/interfaces/ijbmigratable.md): Allows migrating to this contract, with a hook called to prepare for the migration.

Inherits from:

- [`JBOperatable`](/docs/dev/v3/api/contracts/or-abstract/jboperatable/README.md): Several functions in this contract can only be accessed by a project owner, or an address that has been preconfifigured to be an operator of the project.
- [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165): Introspection on interface adherance.

This Controller has the same functionality as [`JBController3_1`](/docs/dev/v3/deprecated/or-controllers/jbcontroller3_0_1.md), except it is not backwards compatible with the original IJBController view methods.

## State Variables

### _packedDistributionLimitDataOf

Data regarding the distribution limit of a project during a configuration.

- bits 0-231: The amount of token that a project can distribute per funding cycle.
- bits 232-255: The currency of amount that a project can distribute.

Params:

- _projectId The ID of the project to get the packed distribution limit data of.
- _configuration The configuration during which the packed distribution limit data applies.
- _terminal The terminal from which distributions are being limited.
- _token The token for which distributions are being limited.

```solidity
mapping(uint256 => mapping(uint256 => mapping(IJBPaymentTerminal => mapping(address => uint256)))) internal
    _packedDistributionLimitDataOf;
```

### _packedOverflowAllowanceDataOf

Data regarding the overflow allowance of a project during a configuration.

- bits 0-231: The amount of overflow that a project is allowed to tap into on-demand throughout the configuration.
- bits 232-255: The currency of the amount of overflow that a project is allowed to tap.

Params:

- _projectId The ID of the project to get the packed overflow allowance data of.
- _configuration The configuration during which the packed overflow allowance data applies.
- _terminal The terminal managing the overflow.
- _token The token for which overflow is being allowed.

```solidity
mapping(uint256 => mapping(uint256 => mapping(IJBPaymentTerminal => mapping(address => uint256)))) internal
    _packedOverflowAllowanceDataOf;
```

### projects

Mints ERC-721's that represent project ownership.

```solidity
IJBProjects public immutable override projects;
```

### fundingCycleStore

The contract storing all funding cycle configurations.

```solidity
IJBFundingCycleStore public immutable override fundingCycleStore;
```

### tokenStore

The contract that manages token minting and burning.

```solidity
IJBTokenStore public immutable override tokenStore;
```

### splitsStore

The contract that stores splits for each project.

```solidity
IJBSplitsStore public immutable override splitsStore;
```

### fundAccessConstraintsStore

A contract that stores fund access constraints for each project.

```solidity
IJBFundAccessConstraintsStore public immutable override fundAccessConstraintsStore;
```

### directory

The directory of terminals and controllers for projects.

```solidity
IJBDirectory public immutable override directory;
```

### reservedTokenBalanceOf

The current undistributed reserved token balance of.
- _projectId The ID of the project to get a reserved token balance of.

```solidity
mapping(uint256 => uint256) public override reservedTokenBalanceOf;
```

## Functions

### getFundingCycleOf

A project's funding cycle for the specified configuration along with its metadata.

```solidity
function getFundingCycleOf(uint256 _projectId, uint256 _configuration)
    external
    view
    override
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle belongs.|
|`_configuration`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](/docs/dev/v3/api/data-structures/jbfundingcycle.md)|The funding cycle.|
|`metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|The funding cycle's metadata.|

### latestConfiguredFundingCycleOf

A project's latest configured funding cycle along with its metadata and the ballot state of the configuration.

```solidity
function latestConfiguredFundingCycleOf(uint256 _projectId)
    external
    view
    override
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata, JBBallotState ballotState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle belongs.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](/docs/dev/v3/api/data-structures/jbfundingcycle.md)|The latest configured funding cycle.|
|`metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|The latest configured funding cycle's metadata.|
|`ballotState`|`JBBallotState`|The state of the configuration.|

### currentFundingCycleOf

A project's current funding cycle along with its metadata.

```solidity
function currentFundingCycleOf(uint256 _projectId)
    external
    view
    override
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle belongs.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](/docs/dev/v3/api/data-structures/jbfundingcycle.md)|The current funding cycle.|
|`metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|The current funding cycle's metadata.|

### queuedFundingCycleOf

A project's queued funding cycle along with its metadata.

```solidity
function queuedFundingCycleOf(uint256 _projectId)
    external
    view
    override
    returns (JBFundingCycle memory fundingCycle, JBFundingCycleMetadata memory metadata);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle belongs.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`JBFundingCycle`](/docs/dev/v3/api/data-structures/jbfundingcycle.md)|The queued funding cycle.|
|`metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|The queued funding cycle's metadata.|

### totalOutstandingTokensOf

Gets the current total amount of outstanding tokens for a project.

```solidity
function totalOutstandingTokensOf(uint256 _projectId) public view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get total outstanding tokens of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current total amount of outstanding tokens for the project.|

### supportsInterface

Indicates if this contract adheres to the specified interface.

See [`IERC165` - `supportsInterface`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol).

```solidity
function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC165, IERC165) returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherance to.|

### constructor

```solidity
constructor(
    IJBOperatorStore _operatorStore,
    IJBProjects _projects,
    IJBDirectory _directory,
    IJBFundingCycleStore _fundingCycleStore,
    IJBTokenStore _tokenStore,
    IJBSplitsStore _splitsStore,
    IJBFundAccessConstraintsStore _fundAccessConstraintsStore
) JBOperatable(_operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operatorStore`|[`IJBOperatorStore`](/docs/dev/v3/api/interfaces/ijboperatorstore.md)|A contract storing operator assignments.|
|`_projects`|[`IJBProjects`](/docs/dev/v3/api/interfaces/ijbprojects.md)|A contract which mints ERC-721's that represent project ownership and transfers.|
|`_directory`|[`IJBDirectory`](/docs/dev/v3/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|
|`_fundingCycleStore`|[`IJBFundingCycleStore`](/docs/dev/v3/api/interfaces/ijbfundingcyclestore.md)|A contract storing all funding cycle configurations.|
|`_tokenStore`|[`IJBTokenStore`](/docs/dev/v3/api/interfaces/ijbtokenstore.md)|A contract that manages token minting and burning.|
|`_splitsStore`|[`IJBSplitsStore`](/docs/dev/v3/api/interfaces/ijbsplitsstore.md)|A contract that stores splits for each project.|
|`_fundAccessConstraintsStore`|[`IJBFundAccessConstraintsStore`](/docs/dev/v3/api/interfaces/ijbfundaccessconstraintsstore.md)|A contract that stores fund access constraints for each project.|

### launchProjectFor

Creates a project. This will mint an ERC-721 into the specified owner's account, configure a first funding cycle, and set up any splits.

Each operation within this transaction can be done in sequence separately.

Anyone can deploy a project on an owner's behalf.

```solidity
function launchProjectFor(
    address _owner,
    JBProjectMetadata calldata _projectMetadata,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] calldata _groupedSplits,
    JBFundAccessConstraints[] calldata _fundAccessConstraints,
    IJBPaymentTerminal[] memory _terminals,
    string memory _memo
) external virtual override returns (uint256 projectId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The address to set as the owner of the project. The project ERC-721 will be owned by this address.|
|`_projectMetadata`|[`JBProjectMetadata`](/docs/dev/v3/api/data-structures/jbprojectmetadata.md)|Metadata to associate with the project within a particular domain. This can be updated any time by the owner of the project.|
|`_data`|[`JBFundingCycleData`](/docs/dev/v3/api/data-structures/jbfundingcycledata.md)|Data that defines the project's first funding cycle. These properties will remain fixed for the duration of the funding cycle.|
|`_metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|Metadata specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.|
|`_mustStartAtOrAfter`|`uint256`|The time before which the configured funding cycle cannot start.|
|`_groupedSplits`|[`JBGroupedSplits[]`](/docs/dev/v3/api/data-structures/jbgroupedsplits.md)|An array of splits to set for any number of groups.|
|`_fundAccessConstraints`|[`JBFundAccessConstraints[]`](/docs/dev/v3/api/data-structures/jbfundaccessconstraints.md)|An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.|
|`_terminals`|[`IJBPaymentTerminal[]`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)|Payment terminals to add for the project.|
|`_memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the project.|

### launchFundingCyclesFor

Creates a funding cycle for an already existing project ERC-721.

Each operation within this transaction can be done in sequence separately.

Only a project owner or operator can launch its funding cycles.

```solidity
function launchFundingCyclesFor(
    uint256 _projectId,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] calldata _groupedSplits,
    JBFundAccessConstraints[] memory _fundAccessConstraints,
    IJBPaymentTerminal[] memory _terminals,
    string memory _memo
)
    external
    virtual
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
    returns (uint256 configuration);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to launch funding cycles for.|
|`_data`|[`JBFundingCycleData`](/docs/dev/v3/api/data-structures/jbfundingcycledata.md)|Data that defines the project's first funding cycle. These properties will remain fixed for the duration of the funding cycle.|
|`_metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|Metadata specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.|
|`_mustStartAtOrAfter`|`uint256`|The time before which the configured funding cycle cannot start.|
|`_groupedSplits`|[`JBGroupedSplits[]`](/docs/dev/v3/api/data-structures/jbgroupedsplits.md)|An array of splits to set for any number of groups.|
|`_fundAccessConstraints`|[`JBFundAccessConstraints[]`](/docs/dev/v3/api/data-structures/jbfundaccessconstraints.md)|An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.|
|`_terminals`|[`IJBPaymentTerminal[]`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)|Payment terminals to add for the project.|
|`_memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`uint256`|The configuration of the funding cycle that was successfully created.|

### reconfigureFundingCyclesOf

Proposes a configuration of a subsequent funding cycle that will take effect once the current one expires if it is approved by the current funding cycle's ballot.

Only a project's owner or a designated operator can configure its funding cycles.

```solidity
function reconfigureFundingCyclesOf(
    uint256 _projectId,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] calldata _groupedSplits,
    JBFundAccessConstraints[] calldata _fundAccessConstraints,
    string calldata _memo
)
    external
    virtual
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
    returns (uint256 configuration);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whose funding cycles are being reconfigured.|
|`_data`|[`JBFundingCycleData`](/docs/dev/v3/api/data-structures/jbfundingcycledata.md)|Data that defines the funding cycle. These properties will remain fixed for the duration of the funding cycle.|
|`_metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|Metadata specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.|
|`_mustStartAtOrAfter`|`uint256`|The time before which the configured funding cycle cannot start.|
|`_groupedSplits`|[`JBGroupedSplits[]`](/docs/dev/v3/api/data-structures/jbgroupedsplits.md)|An array of splits to set for any number of groups.|
|`_fundAccessConstraints`|[`JBFundAccessConstraints[]`](/docs/dev/v3/api/data-structures/jbfundaccessconstraints.md)|An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.|
|`_memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`uint256`|The configuration of the funding cycle that was successfully reconfigured.|

### mintTokensOf

Mint new token supply into an account, and optionally reserve a supply to be distributed according to the project's current funding cycle configuration.

Only a project's owner, a designated operator, one of its terminals, or the current data source can mint its tokens.

```solidity
function mintTokensOf(
    uint256 _projectId,
    uint256 _tokenCount,
    address _beneficiary,
    string calldata _memo,
    bool _preferClaimedTokens,
    bool _useReservedRate
) external virtual override returns (uint256 beneficiaryTokenCount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the tokens being minted belong.|
|`_tokenCount`|`uint256`|The amount of tokens to mint in total, counting however many should be reserved.|
|`_beneficiary`|`address`|The account that the tokens are being minted for.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether a project's attached token contract should be minted if they have been issued.|
|`_useReservedRate`|`bool`|Whether to use the current funding cycle's reserved rate in the mint calculation.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`beneficiaryTokenCount`|`uint256`|The amount of tokens minted for the beneficiary.|

### burnTokensOf

Burns a token holder's supply.

Only a token's holder, a designated operator, or a project's terminal can burn it.

```solidity
function burnTokensOf(
    address _holder,
    uint256 _projectId,
    uint256 _tokenCount,
    string calldata _memo,
    bool _preferClaimedTokens
)
    external
    virtual
    override
    requirePermissionAllowingOverride(
        _holder,
        _projectId,
        JBOperations.BURN,
        directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender))
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The account that is having its tokens burned.|
|`_projectId`|`uint256`|The ID of the project to which the tokens being burned belong.|
|`_tokenCount`|`uint256`|The number of tokens to burn.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether a project's attached token contract should be burned first if they have been issued.|

### distributeReservedTokensOf

Distributes all outstanding reserved tokens for a project.

```solidity
function distributeReservedTokensOf(uint256 _projectId, string calldata _memo)
    external
    virtual
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the reserved tokens belong.|
|`_memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of minted reserved tokens.|

### prepForMigrationOf

Allows other controllers to signal to this one that a migration is expected for the specified project.

This controller should not yet be the project's controller.

```solidity
function prepForMigrationOf(uint256 _projectId, address _from) external virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that will be migrated to this controller.|
|`_from`|`address`|The controller being migrated from.|

### migrate

Allows a project to migrate from this controller to another.

Only a project's owner or a designated operator can migrate it.

```solidity
function migrate(uint256 _projectId, IJBMigratable _to)
    external
    virtual
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.MIGRATE_CONTROLLER);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that will be migrated from this controller.|
|`_to`|[`IJBMigratable`](/docs/dev/v3/api/interfaces/ijbmigratable.md)|The controller to which the project is migrating.|

### _distributeReservedTokensOf

Distributes all outstanding reserved tokens for a project.

```solidity
function _distributeReservedTokensOf(uint256 _projectId, string memory _memo) internal returns (uint256 tokenCount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the reserved tokens belong.|
|`_memo`|`string`|A memo to pass along to the emitted event.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenCount`|`uint256`|The amount of minted reserved tokens.|

### _distributeToReservedTokenSplitsOf

Distribute tokens to the splits according to the specified funding cycle configuration.

```solidity
function _distributeToReservedTokenSplitsOf(uint256 _projectId, uint256 _domain, uint256 _group, uint256 _amount)
    internal
    returns (uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project for which reserved token splits are being distributed.|
|`_domain`|`uint256`|The domain of the splits to distribute the reserved tokens between.|
|`_group`|`uint256`|The group of the splits to distribute the reserved tokens between.|
|`_amount`|`uint256`|The total amount of tokens to mint.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|If the splits percents dont add up to 100%, the leftover amount is returned.|

### _configure

Configures a funding cycle and stores information pertinent to the configuration.

```solidity
function _configure(
    uint256 _projectId,
    JBFundingCycleData calldata _data,
    JBFundingCycleMetadata calldata _metadata,
    uint256 _mustStartAtOrAfter,
    JBGroupedSplits[] memory _groupedSplits,
    JBFundAccessConstraints[] memory _fundAccessConstraints
) internal returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whose funding cycles are being reconfigured.|
|`_data`|[`JBFundingCycleData`](/docs/dev/v3/api/data-structures/jbfundingcycledata.md)|Data that defines the funding cycle. These properties will remain fixed for the duration of the funding cycle.|
|`_metadata`|[`JBFundingCycleMetadata`](/docs/dev/v3/api/data-structures/jbfundingcyclemetadata.md)|Metadata specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.|
|`_mustStartAtOrAfter`|`uint256`|The time before which the configured funding cycle cannot start.|
|`_groupedSplits`|[`JBGroupedSplits[]`](/docs/dev/v3/api/data-structures/jbgroupedsplits.md)|An array of splits to set for any number of groups.|
|`_fundAccessConstraints`|[`JBFundAccessConstraints[]`](/docs/dev/v3/api/data-structures/jbfundaccessconstraints.md)|An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|configuration The configuration of the funding cycle that was successfully reconfigured.|

## Errors

### BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE

```solidity
error BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE();
```

### CANT_MIGRATE_TO_CURRENT_CONTROLLER

```solidity
error CANT_MIGRATE_TO_CURRENT_CONTROLLER();
```

### FUNDING_CYCLE_ALREADY_LAUNCHED

```solidity
error FUNDING_CYCLE_ALREADY_LAUNCHED();
```

### INVALID_BALLOT_REDEMPTION_RATE

```solidity
error INVALID_BALLOT_REDEMPTION_RATE();
```

### INVALID_REDEMPTION_RATE

```solidity
error INVALID_REDEMPTION_RATE();
```

### INVALID_RESERVED_RATE

```solidity
error INVALID_RESERVED_RATE();
```

### MIGRATION_NOT_ALLOWED

```solidity
error MIGRATION_NOT_ALLOWED();
```

### MINT_NOT_ALLOWED_AND_NOT_TERMINAL_DELEGATE

```solidity
error MINT_NOT_ALLOWED_AND_NOT_TERMINAL_DELEGATE();
```

### NO_BURNABLE_TOKENS

```solidity
error NO_BURNABLE_TOKENS();
```

### NOT_CURRENT_CONTROLLER

```solidity
error NOT_CURRENT_CONTROLLER();
```

### OVERFLOW_ALERT

```solidity
error OVERFLOW_ALERT();
```

### ZERO_TOKENS_TO_MINT

```solidity
error ZERO_TOKENS_TO_MINT();
```

