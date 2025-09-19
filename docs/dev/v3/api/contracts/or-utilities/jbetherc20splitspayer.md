# JBETHERC20SplitsPayer

Sends ETH or ERC20's to a group of splits as it receives direct payments or has its functions called.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/JBETHERC20SplitsPayer.sol)

Inherits: [`JBETHERC20ProjectPayer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayer.md), [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard), [`IJBSplitsPayer`](/docs/dev/v3/api/interfaces/ijbsplitspayer.md)

*Inherit from this contract or borrow from its logic to forward ETH or ERC20's to a group of splits from within other contracts.*

Adheres to:

- [`IJBSplitsPayer`](/docs/dev/v3/api/interfaces/ijbsplitspayer.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

Inherits from:

- [`JBETHERC20ProjectPayer`](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayer.md): Sends ETH or ERC20's to a project treasury as it receives direct payments or has it's functions called.
- [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard): Contract module that helps prevent reentrant calls to a function.

## State Variables

### splitsStore

The contract that stores splits for each project.

```solidity
IJBSplitsStore public immutable override splitsStore;
```

### defaultSplitsProjectId

The ID of project for which the default splits are stored.

```solidity
uint256 public override defaultSplitsProjectId;
```

### defaultSplitsDomain

The domain within which the default splits are stored.

```solidity
uint256 public override defaultSplitsDomain;
```

### defaultSplitsGroup

The group within which the default splits are stored.

```solidity
uint256 public override defaultSplitsGroup;
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
    override(JBETHERC20ProjectPayer, IERC165)
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherance to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A flag indicating if this contract adheres to the specified interface.|

### constructor

```solidity
constructor(IJBSplitsStore _splitsStore) JBETHERC20ProjectPayer(_splitsStore.directory());
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_splitsStore`|[`IJBSplitsStore`](/docs/dev/v3/api/interfaces/ijbsplitsstore.md)|A contract that stores splits for each project.|

### initialize

*The re-initialize check is done in the inherited paroject payer*

```solidity
function initialize(
    uint256 _defaultSplitsProjectId,
    uint256 _defaultSplitsDomain,
    uint256 _defaultSplitsGroup,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _preferAddToBalance,
    address _owner
) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_defaultSplitsProjectId`|`uint256`|The ID of project for which the default splits are stored.|
|`_defaultSplitsDomain`|`uint256`|The splits domain to payout when this contract receives direct payments.|
|`_defaultSplitsGroup`|`uint256`|The splits group to payout when this contract receives direct payments.|
|`_defaultProjectId`|`uint256`|The ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.|
|`_defaultBeneficiary`|`address payable`|The address that'll receive the project's tokens.|
|`_defaultPreferClaimedTokens`|`bool`|A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.|
|`_defaultMemo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_defaultMetadata`|`bytes`|Bytes to send along to the project's data source and delegate, if provided.|
|`_preferAddToBalance`|`bool`| A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.|
|`_owner`|`address`|The address that will own the contract.|

### receive

Received funds are paid to the default split group using the stored default properties.

*This function is called automatically when the contract receives an ETH payment.*

```solidity
receive() external payable virtual override nonReentrant;
```

### setDefaultSplits

Sets the splits in the splits store that payments this contract receives will be split between.

```solidity
function setDefaultSplits(
    uint256 _projectId,
    uint256 _domain,
    uint256 _group,
    JBGroupedSplits[] memory _groupedSplits
) external virtual override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of project for which the default splits are stored.|
|`_domain`|`uint256`|The domain within which the default splits are stored.|
|`_group`|`uint256`|The group within which the default splits are stored.|
|`_groupedSplits`|[`JBGroupedSplits[]`](/docs/dev/v3/api/data-structures/jbgroupedsplits.md)|The split groups to set.|

### setDefaultSplitsReference

Sets the location of the splits that payments this contract receives will be split between.

```solidity
function setDefaultSplitsReference(uint256 _projectId, uint256 _domain, uint256 _group)
    public
    virtual
    override
    onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of project for which the default splits are stored.|
|`_domain`|`uint256`|The domain within which the default splits are stored.|
|`_group`|`uint256`|The group within which the default splits are stored.|

### pay

Make a payment to the specified project after first splitting the amount among the stored default splits.

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
) public payable virtual override nonReentrant;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being paid after.|
|`_token`|`address`|The token being paid in.|
|`_amount`|`uint256`|The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.|
|`_beneficiary`|`address`|The address who will receive tokens from the payment made with leftover funds.|
|`_minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.|
|`_memo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate. A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_metadata`|`bytes`|Bytes to send along to the data source, delegate, and emitted event, if provided.|

### addToBalanceOf

Add to the balance of the specified project after first splitting the amount among the stored default splits.

```solidity
function addToBalanceOf(
    uint256 _projectId,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    string calldata _memo,
    bytes calldata _metadata
) public payable virtual override nonReentrant;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project that is being paid after.|
|`_token`|`address`|The token being paid in.|
|`_amount`|`uint256`|The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Extra data to pass along to the terminal.|

### _payToSplits

Split an amount between all splits.

```solidity
function _payToSplits(
    uint256 _splitsProjectId,
    uint256 _splitsDomain,
    uint256 _splitsGroup,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_splitsProjectId`|`uint256`|The ID of the project to which the splits belong.|
|`_splitsDomain`|`uint256`|The splits domain to which the group belongs.|
|`_splitsGroup`|`uint256`|The splits group to pay.|
|`_token`|`address`|The token the amonut being split is in.|
|`_amount`|`uint256`|The amount of tokens being split, as a fixed point number. If the `_token` is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number.|
|`_defaultBeneficiary`|`address`|The address that will benefit from any non-specified beneficiaries in splits.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|The amount leftover after all splits were paid.|

### _payTo

Split an amount between all splits.

```solidity
function _payTo(
    JBSplit[] memory _splits,
    address _token,
    uint256 _amount,
    uint256 _decimals,
    address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_splits`|[`JBSplit[]`](/docs/dev/v3/api/data-structures/jbsplit.md)|The splits.|
|`_token`|`address`|The token the amonut being split is in.|
|`_amount`|`uint256`|The amount of tokens being split, as a fixed point number. If the `_token` is ETH, this is ignored and msg.value is used in its place.|
|`_decimals`|`uint256`|The number of decimals in the `_amount` fixed point number.|
|`_defaultBeneficiary`|`address`|The address that will benefit from any non-specified beneficiaries in splits.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|The amount leftover after all splits were paid.|
