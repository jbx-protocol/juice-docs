# JBETHERC20SplitsPayerDeployer

Deploys splits payer contracts.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/JBETHERC20SplitsPayerDeployer.sol)

Mainnet: [`0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27`](https://etherscan.io/address/0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27)

Goerli: [`0x4C466008867c471316Be2606E5D76D1940fC4765`](https://goerli.etherscan.io/address/0x4C466008867c471316Be2606E5D76D1940fC4765)

Inherits: [`IJBETHERC20SplitsPayerDeployer`](/docs/v4/deprecated/v3/api/interfaces/ijbetherc20splitspayerdeployer.md)

Adheres to:

- [`IJBETHERC20SplitsPayerDeployer`](/docs/v4/deprecated/v3/api/interfaces/ijbetherc20splitspayerdeployer.md):  General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

## State Variables

### implementation

```solidity
address immutable implementation;
```

### splitsStore

```solidity
IJBSplitsStore immutable splitsStore;
```

## Functions

### constructor

```solidity
constructor(IJBSplitsStore _splitsStore);
```

### deploySplitsPayerWithSplits

Allows anyone to deploy a new splits payer contract.

*This contract must have Operator permissions over the SET_SPLITS permission of the specified `_defaultSplitsProjectId`.*

```solidity
function deploySplitsPayerWithSplits(
    uint256 _defaultSplitsProjectId,
    JBSplit[] memory _defaultSplits,
    IJBSplitsStore _splitsStore,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _defaultPreferAddToBalance,
    address _owner
) external override returns (IJBSplitsPayer splitsPayer);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_defaultSplitsProjectId`|`uint256`|The ID of project for which the default splits are stored.|
|`_defaultSplits`|[`JBSplit[]`](/docs/v4/deprecated/v3/api/data-structures/jbsplit.md)|The splits to payout when this contract receives direct payments.|
|`_splitsStore`|[`IJBSplitsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitsstore.md)|A contract that stores splits for each project.|
|`_defaultProjectId`|`uint256`|The ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.|
|`_defaultBeneficiary`|`address payable`|The address that'll receive the project's tokens when the splits payer receives payments.|
|`_defaultPreferClaimedTokens`|`bool`|A flag indicating whether issued tokens from the splits payer's received payments should be automatically claimed into the beneficiary's wallet.|
|`_defaultMemo`|`string`|The memo that'll be forwarded with the splits payer's received payments.|
|`_defaultMetadata`|`bytes`|The metadata that'll be forwarded with the splits payer's received payments.|
|`_defaultPreferAddToBalance`|`bool`|A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.|
|`_owner`|`address`|The address that will own the splits payer.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`splitsPayer`|[`IJBSplitsPayer`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitspayer.md)|The splits payer contract.|

### deploySplitsPayer

Allows anyone to deploy a new splits payer contract.

```solidity
function deploySplitsPayer(
    uint256 _defaultSplitsProjectId,
    uint256 _defaultSplitsDomain,
    uint256 _defaultSplitsGroup,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _defaultPreferAddToBalance,
    address _owner
) public override returns (IJBSplitsPayer splitsPayer);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_defaultSplitsProjectId`|`uint256`|The ID of project for which the default splits are stored.|
|`_defaultSplitsDomain`|`uint256`|The splits domain to payout when this contract receives direct payments.|
|`_defaultSplitsGroup`|`uint256`|The splits group to payout when this contract receives direct payments.|
|`_defaultProjectId`|`uint256`|The ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.|
|`_defaultBeneficiary`|`address payable`|The address that'll receive the project's tokens when the splits payer receives payments.|
|`_defaultPreferClaimedTokens`|`bool`|A flag indicating whether issued tokens from the splits payer's received payments should be automatically claimed into the beneficiary's wallet.|
|`_defaultMemo`|`string`|The memo that'll be forwarded with the splits payer's received payments.|
|`_defaultMetadata`|`bytes`|The metadata that'll be forwarded with the splits payer's received payments.|
|`_defaultPreferAddToBalance`|`bool`|A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.|
|`_owner`|`address`|The address that will own the splits payer.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`splitsPayer`|[`IJBSplitsPayer`](/docs/v4/deprecated/v3/api/interfaces/ijbsplitspayer.md)|The splits payer contract.|
