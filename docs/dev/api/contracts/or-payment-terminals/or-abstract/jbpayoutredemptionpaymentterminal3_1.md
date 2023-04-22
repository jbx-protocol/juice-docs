# JBPayoutRedemptionPaymentTerminal3_1

Generic terminal managing all inflows and outflows of funds into the protocol ecosystem.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/48fe7091a30761fa42ce394c68aad2fcf639ea53/contracts/abstract/JBPayoutRedemptionPaymentTerminal3_1.sol)

Inherits: [`JBSingleTokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/), [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable), [`IJBPayoutRedemptionPaymentTerminal3_1`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal3_1/)

A project can transfer its funds, along with the power to reconfigure and mint/burn their tokens, from this contract to another allowed terminal of the same token type contract at any time.

Adheres to:

- [`IJBPayoutRedemptionPaymentTerminal3_1`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal3_1/): General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

Inherits from:

- [`JBSingleTokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/): Generic terminal managing all inflows of funds into the protocol ecosystem for one token.
- [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/): Includes convenience functionality for checking a message sender's permissions before executing certain transactions.
- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable): Includes convenience functionality for checking a message sender's permissions before executing certain transactions.*

## State Variables

### _FEE_CAP

Maximum fee that can be set for a funding cycle configuration.

Out of MAX_FEE (50_000_000 / 1_000_000_000).

```solidity
uint256 internal constant _FEE_CAP = 50_000_000;
```

### _FEE_BENEFICIARY_PROJECT_ID

The fee beneficiary project ID is 1, as it should be the first project launched during the deployment process.

```solidity
uint256 internal constant _FEE_BENEFICIARY_PROJECT_ID = 1;
```

### _heldFeesOf

Fees that are being held to be processed later.

- _projectId The ID of the project for which fees are being held.

```solidity
mapping(uint256 => JBFee[]) internal _heldFeesOf;
```

### projects

Mints ERC-721's that represent project ownership and transfers.

```solidity
IJBProjects public immutable override projects;
```

### directory

The directory of terminals and controllers for projects.

```solidity
IJBDirectory public immutable override directory;
```

### splitsStore

The contract that stores splits for each project.

```solidity
IJBSplitsStore public immutable override splitsStore;
```

### prices

The contract that exposes price feeds.

```solidity
IJBPrices public immutable override prices;
```

### store

The contract that stores and manages the terminal's data.

```solidity
IJBSingleTokenPaymentTerminalStore public immutable override store;
```

### baseWeightCurrency

The currency to base token issuance on.

If this differs from `currency`, there must be a price feed available to convert `currency` to `baseWeightCurrency`.

```solidity
uint256 public immutable override baseWeightCurrency;
```

### payoutSplitsGroup

The group that payout splits coming from this terminal are identified by.

```solidity
uint256 public immutable override payoutSplitsGroup;
```

### fee

The platform fee percent.

Out of MAX_FEE (25_000_000 / 1_000_000_000)

```solidity
uint256 public override fee = 25_000_000;
```

### feeGauge

The data source that returns a discount to apply to a project's fee.

```solidity
IJBFeeGauge public override feeGauge;
```

### isFeelessAddress

Addresses that can be paid towards from this terminal without incurring a fee.

Only addresses that are considered to be contained within the ecosystem can be feeless. Funds sent outside the ecosystem may incur fees despite being stored as feeless.

- _address The address that can be paid toward.

```solidity
mapping(address => bool) public override isFeelessAddress;
```

## Functions

### isTerminalOf

A modifier that verifies this terminal is a terminal of provided project ID.

```solidity
modifier isTerminalOf(uint256 _projectId);
```

### currentEthOverflowOf

Gets the current overflowed amount in this terminal for a specified project, in terms of ETH.

The current overflow is represented as a fixed point number with 18 decimals.

```solidity
function currentEthOverflowOf(uint256 _projectId) external view virtual override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get overflow for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current amount of ETH overflow that project has in this terminal, as a fixed point number with 18 decimals.|

### heldFeesOf

The fees that are currently being held to be processed later for each project.

```solidity
function heldFeesOf(uint256 _projectId) external view override returns (JBFee[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project for which fees are being held.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|[`JBFee[]`](docs/dev/api/data-structures/jbfee.md)|An array of fees that are being held.|

### supportsInterface

Indicates if this contract adheres to the specified interface.

See [`IERC165-supportsInterface`](https://docs.openzeppelin.com/contracts/2.x/api/introspection#IERC165-supportsInterface-bytes4-).

```solidity
function supportsInterface(bytes4 _interfaceId)
    public
    view
    virtual
    override(JBSingleTokenPaymentTerminal, IERC165)
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherance to.|

### _balance

Checks the balance of tokens in this contract.

```solidity
function _balance() internal view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The contract's balance.|

### constructor

```solidity
constructor(
    address _token,
    uint256 _decimals,
    uint256 _currency,
    uint256 _baseWeightCurrency,
    uint256 _payoutSplitsGroup,
    IJBOperatorStore _operatorStore,
    IJBProjects _projects,
    IJBDirectory _directory,
    IJBSplitsStore _splitsStore,
    IJBPrices _prices,
    IJBSingleTokenPaymentTerminalStore _store,
    address _owner
) payable JBSingleTokenPaymentTerminal(_token, _decimals, _currency) JBOperatable(_operatorStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_token`|`address`|The token that this terminal manages.|
|`_decimals`|`uint256`|The number of decimals the token fixed point amounts are expected to have.|
|`_currency`|`uint256`|The currency that this terminal's token adheres to for price feeds.|
|`_baseWeightCurrency`|`uint256`|The currency to base token issuance on.|
|`_payoutSplitsGroup`|`uint256`|The group that denotes payout splits from this terminal in the splits store.|
|`_operatorStore`|[`IJBOperatorStore`](docs/dev/api/interfaces/ijboperatorstore.md)|A contract storing operator assignments.|
|`_projects`|[`IJBProjects`](docs/dev/api/interfaces/ijbprojects.md)|A contract which mints ERC-721's that represent project ownership and transfers.|
|`_directory`|[`IJBDirectory`](docs/dev/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|
|`_splitsStore`|[`IJBSplitsStore`](docs/dev/api/interfaces/ijbsplitsstore.md)|A contract that stores splits for each project.|
|`_prices`|[`IJBPrices`](docs/dev/api/interfaces/ijbprices.md)|A contract that exposes price feeds.|
|`_store`|[`IJBSingleTokenPaymentTerminalStore`](docs/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)|A contract that stores the terminal's data.|
|`_owner`|`address`|The address that will own this contract.|

### pay

Contribute tokens to a project.

```solidity
function pay(
    uint256 _projectId,
    uint256 _amount,
    address _token,
    address _beneficiary,
    uint256 _minReturnedTokens,
    bool _preferClaimedTokens,
    string calldata _memo,
    bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being paid.|
|`_amount`|`uint256`|The amount of terminal tokens being received, as a fixed point number with the same amount of decimals as this terminal. If this terminal's token is ETH, this is ignored and msg.value is used in its place.|
|`_token`|`address`|The token being paid. This terminal ignores this property since it only manages one token.|
|`_beneficiary`|`address`|The address to mint tokens for and pass along to the funding cycle's data source and delegate.|
|`_minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.|
|`_memo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_metadata`|`bytes`|Bytes to send along to the data source, delegate, and emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of tokens minted for the beneficiary, as a fixed point number with 18 decimals.|

### redeemTokensOf

Holders can redeem their tokens to claim the project's overflowed tokens, or to trigger rules determined by the project's current funding cycle's data source.

Only a token holder or a designated operator can redeem its tokens.

```solidity
function redeemTokensOf(
    address _holder,
    uint256 _projectId,
    uint256 _tokenCount,
    address _token,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string memory _memo,
    bytes memory _metadata
)
    external
    virtual
    override
    requirePermission(_holder, _projectId, JBOperations.REDEEM)
    returns (uint256 reclaimAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The account to redeem tokens for.|
|`_projectId`|`uint256`|The ID of the project to which the tokens being redeemed belong.|
|`_tokenCount`|`uint256`|The number of project tokens to redeem, as a fixed point number with 18 decimals.|
|`_token`|`address`|The token being reclaimed. This terminal ignores this property since it only manages one token.|
|`_minReturnedTokens`|`uint256`|The minimum amount of terminal tokens expected in return, as a fixed point number with the same amount of decimals as the terminal.|
|`_beneficiary`|`address payable`|The address to send the terminal tokens to.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Bytes to send along to the data source, delegate, and emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimAmount`|`uint256`|The amount of terminal tokens that the project tokens were redeemed for, as a fixed point number with 18 decimals.|

### distributePayoutsOf

Distributes payouts for a project with the distribution limit of its current funding cycle.

Payouts are sent to the preprogrammed splits. Any leftover is sent to the project's owner.

Anyone can distribute payouts on a project's behalf. The project can preconfigure a wildcard split that is used to send funds to msg.sender. This can be used to incentivize calling this function.

All funds distributed outside of this contract or any feeless terminals incure the protocol fee.

```solidity
function distributePayoutsOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    address _token,
    uint256 _minReturnedTokens,
    bytes calldata _metadata
) external virtual override returns (uint256 netLeftoverDistributionAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having its payouts distributed.|
|`_amount`|`uint256`|The amount of terminal tokens to distribute, as a fixed point number with same number of decimals as this terminal.|
|`_currency`|`uint256`|The expected currency of the amount being distributed. Must match the project's current funding cycle's distribution limit currency.|
|`_token`|`address`|The token being distributed. This terminal ignores this property since it only manages one token.|
|`_minReturnedTokens`|`uint256`|The minimum number of terminal tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with the same number of decimals as this terminal.|
|`_metadata`|`bytes`|Bytes to send along to the emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netLeftoverDistributionAmount`|`uint256`|The amount that was sent to the project owner, as a fixed point number with the same amount of decimals as this terminal.|

### useAllowanceOf

Allows a project to send funds from its overflow up to the preconfigured allowance.

Only a project's owner or a designated operator can use its allowance.*

Incurs the protocol fee.

```solidity
function useAllowanceOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    address _token,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string memory _memo,
    bytes calldata _metadata
)
    external
    virtual
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.USE_ALLOWANCE)
    returns (uint256 netDistributedAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to use the allowance of.|
|`_amount`|`uint256`|The amount of terminal tokens to use from this project's current allowance, as a fixed point number with the same amount of decimals as this terminal.|
|`_currency`|`uint256`|The expected currency of the amount being distributed. Must match the project's current funding cycle's overflow allowance currency.|
|`_token`|`address`|The token being distributed. This terminal ignores this property since it only manages one token.|
|`_minReturnedTokens`|`uint256`|The minimum number of tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with 18 decimals.|
|`_beneficiary`|`address payable`|The address to send the funds to.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Bytes to send along to the emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDistributedAmount`|`uint256`|The amount of tokens that was distributed to the beneficiary, as a fixed point number with the same amount of decimals as the terminal.|

### migrate

Allows a project owner to migrate its funds and operations to a new terminal that accepts the same token type.

Only a project's owner or a designated operator can migrate it.

```solidity
function migrate(uint256 _projectId, IJBPaymentTerminal _to)
    external
    virtual
    override
    requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.MIGRATE_TERMINAL)
    returns (uint256 balance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project being migrated.|
|`_to`|[`IJBPaymentTerminal`](docs/dev/api/interfaces/ijbpaymentterminal.md)|The terminal contract that will gain the project's funds.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The amount of funds that were migrated, as a fixed point number with the same amount of decimals as this terminal.|

### addToBalanceOf

Receives funds belonging to the specified project.

```solidity
function addToBalanceOf(
    uint256 _projectId,
    uint256 _amount,
    address _token,
    string calldata _memo,
    bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funds received belong.|
|`_amount`|`uint256`|The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.|
|`_token`|`address`|The token being paid. This terminal ignores this property since it only manages one currency.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Extra data to pass along to the emitted event.|

### processFees

Process any fees that are being held for the project.

Only a project owner, an operator, or the contract's owner can process held fees.

```solidity
function processFees(uint256 _projectId)
    external
    virtual
    override
    requirePermissionAllowingOverride(
        projects.ownerOf(_projectId),
        _projectId,
        JBOperations.PROCESS_FEES,
        msg.sender == owner()
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whos held fees should be processed.|

### setFee

Allows the fee to be updated.

Only the owner of this contract can change the fee.

```solidity
function setFee(uint256 _fee) external virtual override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_fee`|`uint256`|The new fee, out of MAX_FEE.|

### setFeeGauge

Allows the fee gauge to be updated.

Only the owner of this contract can change the fee gauge.

```solidity
function setFeeGauge(IJBFeeGauge _feeGauge) external virtual override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_feeGauge`|[`IJBFeeGauge`](docs/dev/api/interfaces/ijbfeegauge.md)|The new fee gauge.|

### setFeelessAddress

Sets whether projects operating on this terminal can pay towards the specified address without incurring a fee.

Only the owner of this contract can set addresses as feeless.

```solidity
function setFeelessAddress(address _address, bool _flag) external virtual override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_address`|`address`|The address that can be paid towards while still bypassing fees.|
|`_flag`|`bool`|A flag indicating whether the terminal should be feeless or not.|

### addToBalanceOf

Receives funds belonging to the specified project.

```solidity
function addToBalanceOf(
    uint256 _projectId,
    uint256 _amount,
    address _token,
    bool _shouldRefundHeldFees,
    string calldata _memo,
    bytes calldata _metadata
) public payable virtual override isTerminalOf(_projectId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funds received belong.|
|`_amount`|`uint256`|The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.|
|`_token`|`address`|The token being paid. This terminal ignores this property since it only manages one currency.|
|`_shouldRefundHeldFees`|`bool`|A flag indicating if held fees should be refunded based on the amount being added.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Extra data to pass along to the emitted event.|

### _transferFrom

Transfers tokens.

```solidity
function _transferFrom(address _from, address payable _to, uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address from which the transfer should originate.|
|`_to`|`address payable`|The address to which the transfer should go.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.|

### _beforeTransferTo

Logic to be triggered before transferring tokens from this terminal.

```solidity
function _beforeTransferTo(address _to, uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to which the transfer is going.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.|

### _cancelTransferTo

Logic to be triggered if a transfer should be undone

```solidity
function _cancelTransferTo(address _to, uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to which the transfer went.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.|

### _redeemTokensOf

Holders can redeem their tokens to claim the project's overflowed tokens, or to trigger rules determined by the project's current funding cycle's data source.

Only a token holder or a designated operator can redeem its tokens.

```solidity
function _redeemTokensOf(
    address _holder,
    uint256 _projectId,
    uint256 _tokenCount,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string memory _memo,
    bytes memory _metadata
) internal returns (uint256 reclaimAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_holder`|`address`|The account to redeem tokens for.|
|`_projectId`|`uint256`|The ID of the project to which the tokens being redeemed belong.|
|`_tokenCount`|`uint256`|The number of project tokens to redeem, as a fixed point number with 18 decimals.|
|`_minReturnedTokens`|`uint256`|The minimum amount of terminal tokens expected in return, as a fixed point number with the same amount of decimals as the terminal.|
|`_beneficiary`|`address payable`|The address to send the terminal tokens to.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Bytes to send along to the data source, delegate, and emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimAmount`|`uint256`|The amount of terminal tokens that the project tokens were redeemed for, as a fixed point number with 18 decimals.|

### _distributePayoutsOf

Distributes payouts for a project with the distribution limit of its current funding cycle.

Payouts are sent to the preprogrammed splits. Any leftover is sent to the project's owner.

Anyone can distribute payouts on a project's behalf. The project can preconfigure a wildcard split that is used to send funds to msg.sender. This can be used to incentivize calling this function.

All funds distributed outside of this contract or any feeless terminals incure the protocol fee.

```solidity
function _distributePayoutsOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    uint256 _minReturnedTokens,
    bytes calldata _metadata
) internal returns (uint256 netLeftoverDistributionAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having its payouts distributed.|
|`_amount`|`uint256`|The amount of terminal tokens to distribute, as a fixed point number with same number of decimals as this terminal.|
|`_currency`|`uint256`|The expected currency of the amount being distributed. Must match the project's current funding cycle's distribution limit currency.|
|`_minReturnedTokens`|`uint256`|The minimum number of terminal tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with the same number of decimals as this terminal.|
|`_metadata`|`bytes`|Bytes to send along to the emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netLeftoverDistributionAmount`|`uint256`|The amount that was sent to the project owner, as a fixed point number with the same amount of decimals as this terminal.|

### _useAllowanceOf

Allows a project to send funds from its overflow up to the preconfigured allowance.

Only a project's owner or a designated operator can use its allowance.

Incurs the protocol fee.

```solidity
function _useAllowanceOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string memory _memo,
    bytes calldata _metadata
) internal returns (uint256 netDistributedAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to use the allowance of.|
|`_amount`|`uint256`|The amount of terminal tokens to use from this project's current allowance, as a fixed point number with the same amount of decimals as this terminal.|
|`_currency`|`uint256`|The expected currency of the amount being distributed. Must match the project's current funding cycle's overflow allowance currency.|
|`_minReturnedTokens`|`uint256`|The minimum number of tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with 18 decimals.|
|`_beneficiary`|`address payable`|The address to send the funds to.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Bytes to send along to the emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDistributedAmount`|`uint256`|The amount of tokens that was distributed to the beneficiary, as a fixed point number with the same amount of decimals as the terminal.|

### _distributeToPayoutSplitsOf

Pays out splits for a project's funding cycle configuration.

```solidity
function _distributeToPayoutSplitsOf(
    uint256 _projectId,
    uint256 _domain,
    uint256 _group,
    uint256 _amount,
    uint256 _feeDiscount
) internal returns (uint256 leftoverAmount, uint256 feeEligibleDistributionAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project for which payout splits are being distributed.|
|`_domain`|`uint256`|The domain of the splits to distribute the payout between.|
|`_group`|`uint256`|The group of the splits to distribute the payout between.|
|`_amount`|`uint256`|The total amount being distributed, as a fixed point number with the same number of decimals as this terminal.|
|`_feeDiscount`|`uint256`|The amount of discount to apply to the fee, out of the MAX_FEE.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leftoverAmount`|`uint256`|If the leftover amount if the splits don't add up to 100%.|
|`feeEligibleDistributionAmount`|`uint256`|The total amount of distributions that are eligible to have fees taken from.|

### _distributeToPayoutSplit

Pays out a split for a project's funding cycle configuration.

```solidity
function _distributeToPayoutSplit(
    JBSplit memory _split,
    uint256 _projectId,
    uint256 _group,
    uint256 _amount,
    uint256 _feeDiscount
) internal returns (uint256 netPayoutAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_split`|[`JBSplit`](docs/dev/api/data-structures/jbsplit.md)|The split to distribute payouts to.|
|`_projectId`|`uint256`||
|`_group`|`uint256`||
|`_amount`|`uint256`|The total amount being distributed to the split, as a fixed point number with the same number of decimals as this terminal.|
|`_feeDiscount`|`uint256`|The amount of discount to apply to the fee, out of the MAX_FEE.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netPayoutAmount`|`uint256`|The amount sent to the split after subtracting fees.|

### _takeFeeFrom

Takes a fee into the platform's project, which has an id of `_FEE_BENEFICIARY_PROJECT_ID`.

```solidity
function _takeFeeFrom(
    uint256 _projectId,
    JBFundingCycle memory _fundingCycle,
    uint256 _amount,
    address _beneficiary,
    uint256 _feeDiscount
) internal returns (uint256 feeAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having fees taken from.|
|`_fundingCycle`|[`JBFundingCycle`](docs/dev/api/data-structures/jbfundingcycle.md)|The funding cycle during which the fee is being taken.|
|`_amount`|`uint256`|The amount of the fee to take, as a floating point number with 18 decimals.|
|`_beneficiary`|`address`|The address to mint the platforms tokens for.|
|`_feeDiscount`|`uint256`|The amount of discount to apply to the fee, out of the MAX_FEE.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeAmount`|`uint256`|The amount of the fee taken.|

### _processFee

Process a fee of the specified amount.

```solidity
function _processFee(uint256 _amount, address _beneficiary, uint256 _from) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The fee amount, as a floating point number with 18 decimals.|
|`_beneficiary`|`address`|The address to mint the platform's tokens for.|
|`_from`|`uint256`|The project ID the fee is being paid from.|

### _pay

Contribute tokens to a project.

```solidity
function _pay(
    uint256 _amount,
    address _payer,
    uint256 _projectId,
    address _beneficiary,
    uint256 _minReturnedTokens,
    bool _preferClaimedTokens,
    string memory _memo,
    bytes memory _metadata
) internal returns (uint256 beneficiaryTokenCount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of terminal tokens being received, as a fixed point number with the same amount of decimals as this terminal. If this terminal's token is ETH, this is ignored and msg.value is used in its place.|
|`_payer`|`address`|The address making the payment.|
|`_projectId`|`uint256`|The ID of the project being paid.|
|`_beneficiary`|`address`|The address to mint tokens for and pass along to the funding cycle's data source and delegate.|
|`_minReturnedTokens`|`uint256`|The minimum number of project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.|
|`_preferClaimedTokens`|`bool`|A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.|
|`_memo`|`string`|A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.|
|`_metadata`|`bytes`|Bytes to send along to the data source, delegate, and emitted event, if provided.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`beneficiaryTokenCount`|`uint256`|The number of tokens minted for the beneficiary, as a fixed point number with 18 decimals.|

### _addToBalanceOf

Receives funds belonging to the specified project.

```solidity
function _addToBalanceOf(
    uint256 _projectId,
    uint256 _amount,
    bool _shouldRefundHeldFees,
    string memory _memo,
    bytes memory _metadata
) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the funds received belong.|
|`_amount`|`uint256`|The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.|
|`_shouldRefundHeldFees`|`bool`|A flag indicating if held fees should be refunded based on the amount being added.|
|`_memo`|`string`|A memo to pass along to the emitted event.|
|`_metadata`|`bytes`|Extra data to pass along to the emitted event.|

### _refundHeldFees

Refund fees based on the specified amount.

```solidity
function _refundHeldFees(uint256 _projectId, uint256 _amount) internal returns (uint256 refundedFees);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project for which fees are being refunded.|
|`_amount`|`uint256`|The amount to base the refund on, as a fixed point number with the same amount of decimals as this terminal.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`refundedFees`|`uint256`|How much fees were refunded, as a fixed point number with the same number of decimals as this terminal|

### _feeAmount

Returns the fee amount based on the provided amount for the specified project.

```solidity
function _feeAmount(uint256 _amount, uint256 _fee, uint256 _feeDiscount) internal pure returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount that the fee is based on, as a fixed point number with the same amount of decimals as this terminal.|
|`_fee`|`uint256`|The percentage of the fee, out of MAX_FEE.|
|`_feeDiscount`|`uint256`|The percentage discount that should be applied out of the max amount, out of MAX_FEE_DISCOUNT.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of the fee, as a fixed point number with the same amount of decimals as this terminal.|

### _currentFeeDiscount

Get the fee discount from the fee gauge for the specified project.

```solidity
function _currentFeeDiscount(uint256 _projectId) internal view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get a fee discount for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|feeDiscount The fee discount, which should be interpreted as a percentage out MAX_FEE_DISCOUNT.|

## Errors

### FEE_TOO_HIGH

```solidity
error FEE_TOO_HIGH();
```

### INADEQUATE_DISTRIBUTION_AMOUNT

```solidity
error INADEQUATE_DISTRIBUTION_AMOUNT();
```

### INADEQUATE_RECLAIM_AMOUNT

```solidity
error INADEQUATE_RECLAIM_AMOUNT();
```

### INADEQUATE_TOKEN_COUNT

```solidity
error INADEQUATE_TOKEN_COUNT();
```

### NO_MSG_VALUE_ALLOWED

```solidity
error NO_MSG_VALUE_ALLOWED();
```

### PAY_TO_ZERO_ADDRESS

```solidity
error PAY_TO_ZERO_ADDRESS();
```

### PROJECT_TERMINAL_MISMATCH

```solidity
error PROJECT_TERMINAL_MISMATCH();
```

### REDEEM_TO_ZERO_ADDRESS

```solidity
error REDEEM_TO_ZERO_ADDRESS();
```

### TERMINAL_IN_SPLIT_ZERO_ADDRESS

```solidity
error TERMINAL_IN_SPLIT_ZERO_ADDRESS();
```

### TERMINAL_TOKENS_INCOMPATIBLE

```solidity
error TERMINAL_TOKENS_INCOMPATIBLE();
```
