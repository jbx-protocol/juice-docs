# JBDeadline
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/JBDeadline.sol)

**Inherits:**
[IJBRulesetApprovalHook](/docs/v4/api/core/interfaces/IJBRulesetApprovalHook.md)

`JBDeadline` is a ruleset approval hook which rejects rulesets if they are not queued at least `duration`
seconds before the current ruleset ends. In other words, rulesets must be queued before the deadline to take effect.

*Project rulesets are stored in a queue. Rulesets take effect after the previous ruleset in the queue ends, and
only if they are approved by the previous ruleset's approval hook.*


## State Variables
### DURATION
The minimum number of seconds between the time a ruleset is queued and the time it starts. If the
difference is greater than this number, the ruleset is `Approved`.


```solidity
uint256 public immutable override DURATION;
```


## Functions
### constructor


```solidity
constructor(uint256 duration);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`duration`|`uint256`|The minimum number of seconds between the time a ruleset is queued and the time it starts for it to be `Approved`.|


### approvalStatusOf

The approval status of a given ruleset.


```solidity
function approvalStatusOf(uint256, uint256 rulesetId, uint256 start) public view override returns (JBApprovalStatus);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`||
|`rulesetId`|`uint256`|The ID of the ruleset to check the status of.|
|`start`|`uint256`|The start timestamp of the ruleset to check the status of.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`JBApprovalStatus`|The ruleset's approval status.|


### supportsInterface

Indicates whether this contract adheres to the specified interface.

*See [IERC165-supportsInterface](https://docs.openzeppelin.com/contracts/2.x/api/core/introspection#IERC165).*


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`interfaceId`|`bytes4`|The ID of the interface to check for adherence to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A flag indicating if this contract adheres to the specified interface.|

