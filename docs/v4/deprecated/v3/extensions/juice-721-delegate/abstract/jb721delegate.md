# JB721Delegate

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/abstract/JB721Delegate.sol)

Inherits: [`ERC721`](/v4/deprecated/v3/extensions/juice-721-delegate/abstract/erc721.md), [`IJB721Delegate`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijb721delegate.md), [`IJBFundingCycleDataSource3_1_1`](/v4/deprecated/v3/api/interfaces/ijbfundingcycledatasource3_1_1.md), [`IJBPayDelegate3_1_1`](/v4/deprecated/v3/api/interfaces/ijbpaydelegate3_1_1.md), [`IJBRedemptionDelegate3_1_1`](/v4/deprecated/v3/api/interfaces/ijbredemptiondelegate3_1_1.md)

This delegate makes NFTs available to a project's contributors upon payment, and allows project owners to enable NFT redemption for treasury assets.

## State Variables

### directory

The directory of terminals and controllers for projects.

```solidity
IJBDirectory public immutable override directory;
```

### payMetadataDelegateId

The 4bytes ID of this delegate, used for pay metadata parsing

```solidity
bytes4 public immutable override payMetadataDelegateId;
```

### redeemMetadataDelegateId

The 4bytes ID of this delegate, used for redeem metadata parsing

```solidity
bytes4 public immutable override redeemMetadataDelegateId;
```

### projectId

The Juicebox project ID this contract's functionality applies to.

```solidity
uint256 public override projectId;
```

## Functions

### payParams

This function gets called when the project receives a payment. It sets this contract as the delegate to get a callback from the terminal. Part of IJBFundingCycleDataSource.

```solidity
function payParams(JBPayParamsData calldata _data)
    public
    view
    virtual
    override
    returns (uint256 weight, string memory memo, JBPayDelegateAllocation3_1_1[] memory delegateAllocations);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBPayParamsData`](/v4/deprecated/v3/api/data-structures/jbpayparamsdata.md)|The Juicebox standard project payment data.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`weight`|`uint256`|The weight that tokens should get minted in accordance with.|
|`memo`|`string`|A memo to be forwarded to the event.|
|`delegateAllocations`|[`JBPayDelegateAllocation3_1_1[]`](/v4/deprecated/v3/api/data-structures/jbpaydelegateallocation3_1_1.md)|Amount to be sent to delegates instead of adding to local balance.|

### redeemParams

This function gets called when the project's (NFT) token holders redeem. Part of IJBFundingCycleDataSource.

```solidity
function redeemParams(JBRedeemParamsData calldata _data)
    public
    view
    virtual
    override
    returns (
        uint256 reclaimAmount,
        string memory memo,
        JBRedemptionDelegateAllocation3_1_1[] memory delegateAllocations
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBRedeemParamsData`](/v4/deprecated/v3/api/data-structures/jbredeemparamsdata.md)|Standard Juicebox project redemption data.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimAmount`|`uint256`|Amount to be reclaimed from the treasury.|
|`memo`|`string`|A memo to be forwarded to the event.|
|`delegateAllocations`|[`JBRedemptionDelegateAllocation3_1_1[]`](/v4/deprecated/v3/api/data-structures/jbredemptiondelegateallocation3_1_1.md)|Amount to be sent to delegates instead of being added to the beneficiary.|

### redemptionWeightOf

Returns the cumulative redemption weight of the given token IDs relative to the `totalRedemptionWeight`.

```solidity
function redemptionWeightOf(uint256[] memory _tokenIds, JBRedeemParamsData calldata _data)
    public
    view
    virtual
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIds`|`uint256[]`|The token IDs to calculate the cumulative redemption weight for.|
|`_data`|[`JBRedeemParamsData`](/v4/deprecated/v3/api/data-structures/jbredeemparamsdata.md)|Standard Juicebox project redemption data.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The cumulative redemption weight of the specified token IDs.|

### totalRedemptionWeight

Calculates the cumulative redemption weight of all token IDs.

```solidity
function totalRedemptionWeight(JBRedeemParamsData calldata _data) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBRedeemParamsData`](/v4/deprecated/v3/api/data-structures/jbredeemparamsdata.md)|Standard Juicebox project redemption data.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Total cumulative redemption weight of all token IDs.|

### supportsInterface

Indicates if this contract adheres to the specified interface.

*See IERC165-supportsInterface.*

```solidity
function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC721, IERC165) returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interfaceId`|`bytes4`|The ID of the interface to check for adherence to.|

### constructor

```solidity
constructor(IJBDirectory _directory, bytes4 _payMetadataDelegateId, bytes4 _redeemMetadataDelegateId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](/v4/deprecated/v3/api/interfaces/ijbdirectory.md)|A directory of terminals and controllers for projects.|
|`_payMetadataDelegateId`|`bytes4`|The 4bytes ID of this delegate, used for pay metadata parsing|
|`_redeemMetadataDelegateId`|`bytes4`|The 4bytes ID of this delegate, used for redeem metadata parsing|

### _initialize

Initializes the contract with project details and ERC721 token details.

```solidity
function _initialize(uint256 _projectId, string memory _name, string memory _symbol) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project this contract's functionality applies to.|
|`_name`|`string`|The name of the token.|
|`_symbol`|`string`|The symbol representing the token.|

### didPay

Mints an NFT to the contributor (_data.beneficiary) upon project payment if conditions are met. Part of IJBPayDelegate.

*Reverts if the calling contract is not one of the project's terminals.*

```solidity
function didPay(JBDidPayData3_1_1 calldata _data) external payable virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBDidPayData3_1_1`](/v4/deprecated/v3/api/data-structures/jbdidpaydata3_1_1.md)|Standard Juicebox project payment data.|

### didRedeem

Burns specified NFTs upon token holder redemption, reclaiming funds from the project's balance to _data.beneficiary. Part of IJBRedeemDelegate.

*Reverts if the calling contract is not one of the project's terminals.*

```solidity
function didRedeem(JBDidRedeemData3_1_1 calldata _data) external payable virtual override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBDidRedeemData3_1_1`](/v4/deprecated/v3/api/data-structures/jbdidredeemdata3_1_1.md)|Standard Juicebox project redemption data.|

### _processPayment

Process a received payment.

```solidity
function _processPayment(JBDidPayData3_1_1 calldata _data) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|[`JBDidPayData3_1_1`](/v4/deprecated/v3/api/data-structures/jbdidpaydata3_1_1.md)|Standard Juicebox project payment data.|

### _didBurn

Executes after tokens have been burned via redemption.

```solidity
function _didBurn(uint256[] memory _tokenIds) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIds`|`uint256[]`|The IDs of the tokens that were burned.|

## Errors

### INVALID_PAYMENT_EVENT

```solidity
error INVALID_PAYMENT_EVENT();
```

### INVALID_REDEMPTION_EVENT

```solidity
error INVALID_REDEMPTION_EVENT();
```

### UNAUTHORIZED_TOKEN

```solidity
error UNAUTHORIZED_TOKEN(uint256 _tokenId);
```

### UNEXPECTED_TOKEN_REDEEMED

```solidity
error UNEXPECTED_TOKEN_REDEEMED();
```

### INVALID_REDEMPTION_METADATA

```solidity
error INVALID_REDEMPTION_METADATA();
```

