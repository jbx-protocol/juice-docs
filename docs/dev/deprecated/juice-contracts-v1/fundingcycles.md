# FundingCycles

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/FundingCycles.sol)

Mainnet: [`0xf507B2A1dD7439201eb07F11E1d62AfB29216e2E`](https://etherscan.io/address/0xf507B2A1dD7439201eb07F11E1d62AfB29216e2E)

Inherits: [`TerminalUtility`](/docs/dev/deprecated/juice-contracts-v1/abstract/terminalutility.md), [`IFundingCycles`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ifundingcycles.md)

Manage funding cycle configurations, accounting, and scheduling.

## State Variables

### SECONDS_IN_DAY

```solidity
uint256 private constant SECONDS_IN_DAY = 86400;
```

### _packedConfigurationPropertiesOf

```solidity
mapping(uint256 => uint256) private _packedConfigurationPropertiesOf;
```

### _packedIntrinsicPropertiesOf

```solidity
mapping(uint256 => uint256) private _packedIntrinsicPropertiesOf;
```

### _metadataOf

```solidity
mapping(uint256 => uint256) private _metadataOf;
```

### _targetOf

```solidity
mapping(uint256 => uint256) private _targetOf;
```

### _tappedOf

```solidity
mapping(uint256 => uint256) private _tappedOf;
```

### BASE_WEIGHT

The weight used for each project's first funding cycle.

```solidity
uint256 public constant override BASE_WEIGHT = 1e24;
```

### MAX_CYCLE_LIMIT

The maximum value that a cycle limit can be set to.

```solidity
uint256 public constant override MAX_CYCLE_LIMIT = 32;
```

### latestIdOf

The ID of the latest funding cycle for each project.

```solidity
mapping(uint256 => uint256) public override latestIdOf;
```

### count

The total number of funding cycles created, which is used for issuing funding cycle IDs.

*Funding cycles have IDs > 0.*

```solidity
uint256 public override count = 0;
```

## Functions

### get

Get the funding cycle with the given ID.

```solidity
function get(uint256 _fundingCycleId) external view override returns (FundingCycle memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycleId`|`uint256`|The ID of the funding cycle to get.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|_fundingCycle The funding cycle.|

### queuedOf

The funding cycle that's next up for a project, and therefor not currently accepting payments.

*This runs roughly similar logic to `_configurable`.*

```solidity
function queuedOf(uint256 _projectId) external view override returns (FundingCycle memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being looked through.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|_fundingCycle The queued funding cycle.|

### currentOf

The funding cycle that is currently active for the specified project.

*This runs very similar logic to `_tappable`.*

```solidity
function currentOf(uint256 _projectId) external view override returns (FundingCycle memory fundingCycle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being looked through.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The current funding cycle.|

### currentBallotStateOf

The currency ballot state of the project.

```solidity
function currentBallotStateOf(uint256 _projectId) external view override returns (BallotState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to check for a pending reconfiguration.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`BallotState`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ballotstate.md)|The current ballot's state.|

### constructor

```solidity
constructor(ITerminalDirectory _terminalDirectory) TerminalUtility(_terminalDirectory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|

### configure

Configures the next eligible funding cycle for the specified project.

*Only a project's current terminal can configure its funding cycles.*

_properties.target: The amount that the project wants to receive in each funding cycle. 18 decimals.

_properties.currency: The currency of the `_target`. Send 0 for ETH or 1 for USD.

- _properties.duration: The duration of the funding cycle for which the `_target` amount is needed. Measured in days.
Set to 0 for no expiry and to be able to reconfigure anytime.

_cycleLimit: The number of cycles that this configuration should last for before going back to the last permanent. This does nothing for a project's first funding cycle.

- _properties.discountRate: A number from 0-200 indicating how valuable a contribution to this funding cycle is compared to previous funding cycles.
If it's 0, each funding cycle will have equal weight.
If the number is 100, a contribution to the next funding cycle will only give you 90% of tickets given to a contribution of the same amount during the current funding cycle.
If the number is 200, a contribution to the next funding cycle will only give you 80% of tickets given to a contribution of the same amoutn during the current funding cycle.
If the number is 201, an non-recurring funding cycle will get made.

_ballot: The new ballot that will be used to approve subsequent reconfigurations.

```solidity
function configure(
    uint256 _projectId,
    FundingCycleProperties calldata _properties,
    uint256 _metadata,
    uint256 _fee,
    bool _configureActiveFundingCycle
) external override onlyTerminal(_projectId) returns (FundingCycle memory fundingCycle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being reconfigured.|
|`_properties`|[`FundingCycleProperties`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycleproperties.md)|The funding cycle configuration.|
|`_metadata`|`uint256`|Data to associate with this funding cycle configuration.|
|`_fee`|`uint256`|The fee that this configuration will incure when tapping.|
|`_configureActiveFundingCycle`|`bool`|If a funding cycle that has already started should be configurable.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle that the configuration will take effect during.|

### tap

Tap funds from a project's currently tappable funding cycle.

*Only a project's current terminal can tap funds for its funding cycles.*

```solidity
function tap(uint256 _projectId, uint256 _amount)
    external
    override
    onlyTerminal(_projectId)
    returns (FundingCycle memory fundingCycle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being tapped.|
|`_amount`|`uint256`|The amount being tapped.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The tapped funding cycle.|

### _configurable

Returns the configurable funding cycle for this project if it exists, otherwise creates one.

```solidity
function _configurable(uint256 _projectId, uint256 _configured, bool _configureActiveFundingCycle)
    private
    returns (uint256 fundingCycleId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to find a configurable funding cycle for.|
|`_configured`|`uint256`|The time at which the configuration is occuring.|
|`_configureActiveFundingCycle`|`bool`|If the active funding cycle should be configurable. Otherwise the next funding cycle will be used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycleId`|`uint256`|The ID of the configurable funding cycle.|

### _tappable

Returns the funding cycle that can be tapped at the time of the call.

```solidity
function _tappable(uint256 _projectId) private returns (uint256 fundingCycleId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to find a configurable funding cycle for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycleId`|`uint256`|The ID of the tappable funding cycle.|

### _init

Initializes a funding cycle with the appropriate properties.

```solidity
function _init(uint256 _projectId, FundingCycle memory _baseFundingCycle, uint256 _mustStartOnOrAfter, bool _copy)
    private
    returns (uint256 newFundingCycleId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle being initialized belongs.|
|`_baseFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to base the initialized one on.|
|`_mustStartOnOrAfter`|`uint256`|The time before which the initialized funding cycle can't start.|
|`_copy`|`bool`|If non-intrinsic properties should be copied from the base funding cycle.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newFundingCycleId`|`uint256`|The ID of the initialized funding cycle.|

### _standby

The project's funding cycle that hasn't yet started, if one exists.

```solidity
function _standby(uint256 _projectId) private view returns (uint256 fundingCycleId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of project to look through.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycleId`|`uint256`|The ID of the standby funding cycle.|

### _eligible

The project's funding cycle that has started and hasn't yet expired.

```solidity
function _eligible(uint256 _projectId) private view returns (uint256 fundingCycleId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to look through.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycleId`|`uint256`|The ID of the active funding cycle.|

### _mockFundingCycleBasedOn

A view of the funding cycle that would be created based on the provided one if the project doesn't make a reconfiguration.

```solidity
function _mockFundingCycleBasedOn(FundingCycle memory _baseFundingCycle, bool _allowMidCycle)
    internal
    view
    returns (FundingCycle memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to make the calculation for.|
|`_allowMidCycle`|`bool`|Allow the mocked funding cycle to already be mid cycle.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The next funding cycle, with an ID set to 0.|

### _updateFundingCycle

Updates intrinsic properties for a funding cycle given a base cycle.

```solidity
function _updateFundingCycle(
    uint256 _fundingCycleId,
    FundingCycle memory _baseFundingCycle,
    uint256 _mustStartOnOrAfter,
    bool _copy
) private;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycleId`|`uint256`|The ID of the funding cycle to make sure is update.|
|`_baseFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The cycle that the one being updated is based on.|
|`_mustStartOnOrAfter`|`uint256`|The time before which the initialized funding cycle can't start.|
|`_copy`|`bool`|If non-intrinsic properties should be copied from the base funding cycle.|

### _packAndStoreIntrinsicProperties

Efficiently stores a funding cycle's provided intrinsic properties.

```solidity
function _packAndStoreIntrinsicProperties(
    uint256 _fundingCycleId,
    uint256 _projectId,
    uint256 _weight,
    uint256 _number,
    uint256 _basedOn,
    uint256 _start
) private;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycleId`|`uint256`|The ID of the funding cycle to pack and store.|
|`_projectId`|`uint256`|The ID of the project to which the funding cycle belongs.|
|`_weight`|`uint256`|The weight of the funding cycle.|
|`_number`|`uint256`|The number of the funding cycle.|
|`_basedOn`|`uint256`|The ID of the based funding cycle.|
|`_start`|`uint256`|The start time of this funding cycle.|

### _packAndStoreConfigurationProperties

Efficiently stores a funding cycles provided configuration properties.

```solidity
function _packAndStoreConfigurationProperties(
    uint256 _fundingCycleId,
    uint256 _configured,
    uint256 _cycleLimit,
    IFundingCycleBallot _ballot,
    uint256 _duration,
    uint256 _currency,
    uint256 _fee,
    uint256 _discountRate
) private;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycleId`|`uint256`|The ID of the funding cycle to pack and store.|
|`_configured`|`uint256`|The timestamp of the configuration.|
|`_cycleLimit`|`uint256`|The number of cycles that this configuration should last for before going back to the last permanent.|
|`_ballot`|[`IFundingCycleBallot`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ifundingcycleballot.md)|The ballot to use for future reconfiguration approvals.|
|`_duration`|`uint256`|The duration of the funding cycle.|
|`_currency`|`uint256`|The currency of the funding cycle.|
|`_fee`|`uint256`|The fee of the funding cycle.|
|`_discountRate`|`uint256`|The discount rate of the based funding cycle.|

### _getStruct

Unpack a funding cycle's packed stored values into an easy-to-work-with funding cycle struct.

```solidity
function _getStruct(uint256 _id) private view returns (FundingCycle memory _fundingCycle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_id`|`uint256`|The ID of the funding cycle to get a struct of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle struct.|

### _deriveStart

The date that is the nearest multiple of the specified funding cycle's duration from its end.

```solidity
function _deriveStart(
    FundingCycle memory _baseFundingCycle,
    FundingCycle memory _latestPermanentFundingCycle,
    uint256 _mustStartOnOrAfter
) internal pure returns (uint256 start);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to make the calculation for.|
|`_latestPermanentFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The latest funding cycle in the same project as `_baseFundingCycle` to not have a limit.|
|`_mustStartOnOrAfter`|`uint256`|A date that the derived start must be on or come after.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`start`|`uint256`|The next start time.|

### _deriveWeight

The accumulated weight change since the specified funding cycle.

```solidity
function _deriveWeight(
    FundingCycle memory _baseFundingCycle,
    FundingCycle memory _latestPermanentFundingCycle,
    uint256 _start
) internal pure returns (uint256 weight);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to make the calculation with.|
|`_latestPermanentFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The latest funding cycle in the same project as `_fundingCycle` to not have a limit.|
|`_start`|`uint256`|The start time to derive a weight for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The next weight.|

### _deriveNumber

The number of the next funding cycle given the specified funding cycle.

```solidity
function _deriveNumber(
    FundingCycle memory _baseFundingCycle,
    FundingCycle memory _latestPermanentFundingCycle,
    uint256 _start
) internal pure returns (uint256 number);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_baseFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to make the calculation with.|
|`_latestPermanentFundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The latest funding cycle in the same project as `_fundingCycle` to not have a limit.|
|`_start`|`uint256`|The start time to derive a number for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`number`|`uint256`|The next number.|

### _deriveCycleLimit

The limited number of times a funding cycle configuration can be active given the specified funding cycle.

```solidity
function _deriveCycleLimit(FundingCycle memory _fundingCycle, uint256 _start) internal pure returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to make the calculation with.|
|`_start`|`uint256`|The start time to derive cycles remaining for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|start The inclusive nunmber of cycles remaining.|

### _isIdApproved

Checks to see if the funding cycle of the provided ID is approved according to the correct ballot.

```solidity
function _isIdApproved(uint256 _fundingCycleId) private view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycleId`|`uint256`|The ID of the funding cycle to get an approval flag for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|The approval flag.|

### _isApproved

Checks to see if the provided funding cycle is approved according to the correct ballot.

```solidity
function _isApproved(FundingCycle memory _fundingCycle) private view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The ID of the funding cycle to get an approval flag for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|The approval flag.|

### _ballotState

A funding cycle configuration's currency status.

```solidity
function _ballotState(uint256 _id, uint256 _configuration, uint256 _ballotFundingCycleId)
    private
    view
    returns (BallotState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_id`|`uint256`|The ID of the funding cycle configuration to check the status of.|
|`_configuration`|`uint256`|The timestamp of when the configuration took place.|
|`_ballotFundingCycleId`|`uint256`|The ID of the funding cycle which is configured with the ballot that should be used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`BallotState`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ballotstate.md)|The funding cycle's configuration status.|

### _latestPermanentCycleBefore

Finds the last funding cycle that was permanent in relation to the specified funding cycle.

*Determined what the latest funding cycle with a `cycleLimit` of 0 is, or isn't based on any previous funding cycle.*

```solidity
function _latestPermanentCycleBefore(FundingCycle memory _fundingCycle)
    private
    view
    returns (FundingCycle memory fundingCycle);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The funding cycle to find the most recent permanent cycle compared to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The most recent permanent funding cycle.|

### _getTimeAfterBallot

The time after the ballot of the provided funding cycle has expired.

*If the ballot ends in the past, the current block timestamp will be returned.*

```solidity
function _getTimeAfterBallot(FundingCycle memory _fundingCycle, uint256 _from) private view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fundingCycle`|[`FundingCycle`](/docs/dev/deprecated/juice-contracts-v1/interfaces/fundingcycle.md)|The ID funding cycle to make the caluclation the ballot of.|
|`_from`|`uint256`|The time from which the ballot duration should be calculated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The time when the ballot duration ends.|

