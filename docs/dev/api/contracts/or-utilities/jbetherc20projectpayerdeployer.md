# JBETHERC20ProjectPayerDeployer

Deploys project payer contracts.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/d13d0bf1dbe72f6b478530994d647e219c58245e/contracts/JBETHERC20ProjectPayerDeployer.sol)

Mainnet: [`0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43`](https://etherscan.io/address/0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43)

Goerli: [`0x483bFC77f28DB242d40aa456D801354fEEBb502E`](https://goerli.etherscan.io/address/0x483bFC77f28DB242d40aa456D801354fEEBb502E)

Adheres to:

- [`IJBETHERC20ProjectPayerDeployer`](/dev/api/interfaces/ijbetherc20projectpayerdeployer/): General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.

## State Variables

### implementation

```solidity
address immutable implementation;
```

### directory

```solidity
IJBDirectory immutable directory;
```

## Functions

### constructor

```solidity
constructor(IJBDirectory _directory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](docs/dev/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|

### deployProjectPayer

Allows anyone to deploy a new project payer contract.

```solidity
function deployProjectPayer(
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _defaultPreferAddToBalance,
    address _owner
) external override returns (IJBProjectPayer projectPayer);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_defaultProjectId`|`uint256`|The ID of the project whose treasury should be forwarded the project payer contract's received payments.|
|`_defaultBeneficiary`|`address payable`|The address that'll receive the project's tokens when the project payer receives payments.|
|`_defaultPreferClaimedTokens`|`bool`|A flag indicating whether issued tokens from the project payer's received payments should be automatically claimed into the beneficiary's wallet.|
|`_defaultMemo`|`string`|The memo that'll be forwarded with the project payer's received payments.|
|`_defaultMetadata`|`bytes`|The metadata that'll be forwarded with the project payer's received payments.|
|`_defaultPreferAddToBalance`|`bool`|A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.|
|`_owner`|`address`|The address that will own the project payer.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectPayer`|[`IJBProjectPayer`](docs/dev/api/interfaces/ijbprojectpayer.md)|The project payer contract.|

