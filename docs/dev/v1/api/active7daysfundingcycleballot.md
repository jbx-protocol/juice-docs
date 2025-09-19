# Active7DaysFundingCycleBallot

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/Active7DaysFundingCycleBallot.sol)

Mainnet: [`0xEf7480b6E7CEd228fFB0854fe49A428F562a8982`](https://etherscan.io/address/0xEf7480b6E7CEd228fFB0854fe49A428F562a8982)

Inherits: [`IFundingCycleBallot`](/docs/dev/v1/api/interfaces/ifundingcycleballot.md)

Manages votes towards approving funding cycle reconfigurations.

## State Variables

### reconfigurationDelay

The number of seconds that must pass for a funding cycle reconfiguration to become active.

```solidity
uint256 public constant reconfigurationDelay = 604800;
```

## Functions

### duration

The time that this ballot is active for.

*A ballot should not be considered final until the duration has passed.*

```solidity
function duration() external pure override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The durection in seconds.|

### state

The approval state of a particular funding cycle.

```solidity
function state(uint256, uint256 _configured) external view override returns (BallotState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`||
|`_configured`|`uint256`|The configuration of the funding cycle to check the state of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`BallotState`](/docs/dev/v1/api/interfaces/ballotstate.md)|The state of the provided ballot.|

