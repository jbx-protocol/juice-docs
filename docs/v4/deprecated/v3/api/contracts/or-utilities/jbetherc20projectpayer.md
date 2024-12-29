# JBETHERC20ProjectPayer

Sends ETH or ERC20's to a project treasury as it receives direct payments or has it's functions called.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/JBETHERC20ProjectPayer.sol)

Inherits: [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable), [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165), [`IJBProjectPayer`](/docs/v4/deprecated/v3/api/interfaces/ijbprojectpayer.md)

Inherit from this contract or borrow from its logic to forward ETH or ERC20's to project treasuries from within other contracts.

Adheres to:

- [`IJBProjectPayer`](/docs/v4/deprecated/v3/api/interfaces/ijbprojectpayer.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.*

Inherits from:

- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable): Includes convenience functionality for checking a message sender's permissions before executing certain transactions.
- [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165): Introspection on interface adherance.

## State Variables

### directory

A contract storing directories of terminals and controllers for each project.

```solidity
IJBDirectory public immutable override directory;
```

### projectPayerDeployer

The deployer associated with this implementation. Used to rule out double initialization.

```solidity
address public immutable override projectPayerDeployer;
```

### defaultProjectId

The ID of the project that should be used to forward this contract's received payments.

```solidity
uint256 public override defaultProjectId;
```

### defaultBeneficiary

The beneficiary that should be used in the payment made when this contract receives payments.

```solidity
address payable public override defaultBeneficiary;
```

### defaultPreferClaimedTokens

A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. Leaving tokens unclaimed saves gas.

```solidity
bool public override defaultPreferClaimedTokens;
```

### defaultMemo

The memo that should be used in the payment made when this contract receives payments.

```solidity
string public override defaultMemo;
```

### defaultMetadata

The metadata that should be used in the payment made when this contract receives payments.

```solidity
bytes public override defaultMetadata;
```

### defaultPreferAddToBalance

A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.

```solidity
bool public override defaultPreferAddToBalance;
```

## Functions

### supportsInterface

Indicates if this contract adheres to the specified interface.

*See IERC165-supportsInterface.*

```solidity
function supportsInterface(bytes4 _interfaceId)
    public
    view
    virtual
    override(ERC165, IERC165)
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherance to.|

### constructor

*This is the constructor of the implementation. The directory is shared between project payers and is
immutable. If a new JBDirectory is needed, a new JBProjectPayerDeployer should be deployed.*

```solidity
constructor(IJBDirectory _directory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|

### initialize

```solidity
function initialize(
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _defaultPreferAddToBalance,
    address _owner
) public;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_defaultProjectId`|`uint256`|The ID of the project whose treasury should be forwarded this contract's received payments.|
|`_defaultBeneficiary`|`address payable`|The address that'll receive the project's tokens.|
|`_defaultPreferClaimedTokens`|`bool`|A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.|
|`_defaultMemo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_defaultMetadata`|`bytes`|Bytes to send along to the project's data source and delegate, if provided.|
|`_defaultPreferAddToBalance`|`bool`|A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.|
|`_owner`|`address`|The address that will own the contract.|

### receive

Received funds are paid to the default project ID using the stored default properties.

*Use the `addToBalance` function if there's a preference to do so. Otherwise use `pay`.*

*This function is called automatically when the contract receives an ETH payment.*

```solidity
receive() external payable virtual override;
```

### setDefaultValues

Sets the default values that determine how to interact with a protocol treasury when this contract receives ETH directly.

```solidity
function setDefaultValues(
    uint256 _projectId,
    address payable _beneficiary,
    bool _preferClaimedTokens,
    string memory _memo,
    bytes memory _metadata,
    bool _defaultPreferAddToBalance
) external virtual override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whose treasury should be forwarded this contract's received payments.|
|`_beneficiary`|`address payable`|The address that'll receive the project's tokens.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.|
|`_memo`|`string`|The memo that'll be used.|
|`_metadata`|`bytes`|The metadata that'll be sent.|
|`_defaultPreferAddToBalance`|`bool`|A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.|

### pay

Make a payment to the specified project.

```solidity
function pay(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    address _beneficiary,
    uint256 _minReturnedTokens,
    bool _preferClaimedTokens,
    string calldata _memo,
    bytes calldata _metadata
) public payable virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being paid.|
|`_token`|`address`|The token being paid in.|
|`_amount`|`uint256`|The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.|
|`_beneficiary`|`address`|The address who will receive tokens from the payment.|
|`_minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.|
|`_memo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate. A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_metadata`|`bytes`|Bytes to send along to the data source, delegate, and emitted event, if provided.|

### addToBalanceOf

Add to the balance of the specified project.

```solidity
function addToBalanceOf(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    string calldata _memo,
    bytes calldata _metadata
) public payable virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being paid.|
|`_token`|`address`|The token being paid in.|
|`_amount`|`uint256`|The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Extra data to pass along to the terminal.|

### _pay

Make a payment to the specified project.

```solidity
function _pay(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    address _beneficiary,
    uint256 _minReturnedTokens,
    bool _preferClaimedTokens,
    string memory _memo,
    bytes memory _metadata
) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being paid.|
|`_token`|`address`|The token being paid in.|
|`_amount`|`uint256`|The amount of tokens being paid, as a fixed point number.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number.|
|`_beneficiary`|`address`|The address who will receive tokens from the payment.|
|`_minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.|
|`_memo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_metadata`|`bytes`|Bytes to send along to the data source and delegate, if provided.|

### _addToBalanceOf

Add to the balance of the specified project.

```solidity
function _addToBalanceOf(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    string memory _memo,
    bytes memory _metadata
) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being paid.|
|`_token`|`address`|The token being paid in.|
|`_amount`|`uint256`|The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Extra data to pass along to the terminal.|

## Errors

### INCORRECT_DECIMAL_AMOUNT

```solidity
error INCORRECT_DECIMAL_AMOUNT();
```

### ALREADY_INITIALIZED

```solidity
error ALREADY_INITIALIZED();
```

### NO_MSG_VALUE_ALLOWED

```solidity
error NO_MSG_VALUE_ALLOWED();
```

### TERMINAL_NOT_FOUND

```solidity
error TERMINAL_NOT_FOUND();
```
