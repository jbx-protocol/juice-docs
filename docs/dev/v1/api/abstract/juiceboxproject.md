# JuiceboxProject

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/abstract/JuiceboxProject.sol)

Inherits: [`IERC721Receiver`](/), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

A contract that inherits from JuiceboxProject can use Juicebox as a business-model-as-a-service.

The owner of the contract makes admin decisions such as:
- Which address is the funding cycle owner, which can tap funds from the funding cycle.
- Should this project's Tickets be migrated to a new TerminalV1.

## State Variables

### terminalDirectory

The direct deposit terminals.

```solidity
ITerminalDirectory public immutable terminalDirectory;
```

### projectId

The ID of the project that should be used to forward this contract's received payments.

```solidity
uint256 public projectId;
```

## Functions

### constructor

```solidity
constructor(uint256 _projectId, ITerminalDirectory _terminalDirectory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that should be used to forward this contract's received payments.|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/dev/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|

### receive

```solidity
receive() external payable;
```

### withdraw

Withdraws funds stored in this contract.

```solidity
function withdraw(address payable _beneficiary, uint256 _amount) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address payable`|The address to send the funds to.|
|`_amount`|`uint256`|The amount to send.|

### setProjectId

Allows the project that is being managed to be set.

```solidity
function setProjectId(uint256 _projectId) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being managed.|

### pay

Make a payment to this project.

```solidity
function pay(address _beneficiary, string calldata _memo, bool _preferUnstakedTickets) external payable;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address`|The address who will receive tickets from this fee.|
|`_memo`|`string`|A memo that will be included in the published event.|
|`_preferUnstakedTickets`|`bool`|Whether ERC20's should be claimed automatically if they have been issued.|

### transferProjectOwnership

Transfer the ownership of the project to a new owner.

*This contract will no longer be able to reconfigure or tap funds from this project.*

```solidity
function transferProjectOwnership(IProjects _projects, address _newOwner, uint256 _projectId, bytes calldata _data)
    external
    onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projects`|[`IProjects`](/docs/dev/v1/api/interfaces/iprojects.md)|The projects contract.|
|`_newOwner`|`address`|The new project owner.|
|`_projectId`|`uint256`|The ID of the project to transfer ownership of.|
|`_data`|`bytes`|Arbitrary data to include in the transaction.|

### onERC721Received

Allows this contract to receive a project.

```solidity
function onERC721Received(address, address, uint256, bytes calldata) public pure override returns (bytes4);
```

### setOperator

```solidity
function setOperator(
    IOperatorStore _operatorStore,
    address _operator,
    uint256 _projectId,
    uint256[] calldata _permissionIndexes
) external onlyOwner;
```

### setOperators

```solidity
function setOperators(
    IOperatorStore _operatorStore,
    address[] calldata _operators,
    uint256[] calldata _projectIds,
    uint256[][] calldata _permissionIndexes
) external onlyOwner;
```

### _takeFee

Take a fee for this project from this contract.

```solidity
function _takeFee(uint256 _amount, address _beneficiary, string memory _memo, bool _preferUnstakedTickets) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The payment amount.|
|`_beneficiary`|`address`|The address who will receive tickets from this fee.|
|`_memo`|`string`|A memo that will be included in the published event.|
|`_preferUnstakedTickets`|`bool`|Whether ERC20's should be claimed automatically if they have been issued.|

