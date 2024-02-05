# OperatorStore

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/OperatorStore.sol)

Mainnet: [`0xab47304D987390E27Ce3BC0fA4Fe31E3A98B0db2`](https://etherscan.io/address/0xab47304D987390E27Ce3BC0fA4Fe31E3A98B0db2)

Inherits: [`IOperatorStore`](/docs/dev/deprecated/juice-contracts-v1/interfaces/ioperatorstore.md)

Addresses can give permissions to any other address to take specific actions
throughout the Juicebox ecosystem on their behalf. These addresses are called `operators`.

*Permissions are stored as a uint256, with each boolean bit representing whether or not an oporator has the permission identified by that bit's index in the 256 bit uint256. Indexes must be between 0 and 255. The directory of permissions, along with how they uniquely mapp to indexes, are managed externally. This contract doesn't know or care about specific permissions and their indexes.*

## State Variables

### permissionsOf

The permissions that an operator has to operate on a specific domain.

*An account can give an operator permissions that only pertain to a specific domain. There is no domain with an ID of 0 -- accounts can use the 0 domain to give an operator permissions to operator on their personal behalf.*

```solidity
mapping(address => mapping(address => mapping(uint256 => uint256))) public override permissionsOf;
```

## Functions

### hasPermission

Whether or not an operator has the permission to take a certain action pertaining to the specified domain.

```solidity
function hasPermission(address _operator, address _account, uint256 _domain, uint256 _permissionIndex)
    external
    view
    override
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operator`|`address`|The operator to check.|
|`_account`|`address`|The account that has given out permission to the operator.|
|`_domain`|`uint256`|The domain that the operator has been given permissions to operate.|
|`_permissionIndex`|`uint256`|the permission to check for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the operator has the specified permission.|

### hasPermissions

Whether or not an operator has the permission to take certain actions pertaining to the specified domain.

```solidity
function hasPermissions(address _operator, address _account, uint256 _domain, uint256[] calldata _permissionIndexes)
    external
    view
    override
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operator`|`address`|The operator to check.|
|`_account`|`address`|The account that has given out permissions to the operator.|
|`_domain`|`uint256`|The domain that the operator has been given permissions to operate.|
|`_permissionIndexes`|`uint256[]`|An array of permission indexes to check for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the operator has all specified permissions.|

### setOperator

Sets permissions for an operator.

```solidity
function setOperator(address _operator, uint256 _domain, uint256[] calldata _permissionIndexes) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operator`|`address`|The operator to give permission to.|
|`_domain`|`uint256`|The domain that the operator is being given permissions to operate.|
|`_permissionIndexes`|`uint256[]`|An array of indexes of permissions to set.|

### setOperators

Sets permissions for many operators.

```solidity
function setOperators(
    address[] calldata _operators,
    uint256[] calldata _domains,
    uint256[][] calldata _permissionIndexes
) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_operators`|`address[]`|The operators to give permission to.|
|`_domains`|`uint256[]`|The domains that can be operated. Set to 0 to allow operation of account level actions.|
|`_permissionIndexes`|`uint256[][]`|The level of power each operator should have.|

### _packedPermissions

Converts an array of permission indexes to a packed int.

```solidity
function _packedPermissions(uint256[] calldata _indexes) private pure returns (uint256 packed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_indexes`|`uint256[]`|The indexes of the permissions to pack.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`packed`|`uint256`|The packed result.|

