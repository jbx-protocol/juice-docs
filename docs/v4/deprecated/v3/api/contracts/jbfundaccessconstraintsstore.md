---
sidebar_position: 9
---

# JBFundAccessConstraintsStore

Information pertaining to how much funds can be accessed by a project from each payment terminal.

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/49815b2e30771277ff493d21f7c8451159bbbe6a/contracts/JBFundAccessConstraintsStore.sol)

Mainnet: [`0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30`](https://etherscan.io/address/0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30)

Goerli: [`0xbF8b5ea02e50073348767fd9418beDEd30C835D4`](https://goerli.etherscan.io/address/0xbF8b5ea02e50073348767fd9418beDEd30C835D4)

Inherits: [`JBControllerUtility`](/docs/v4/deprecated/v3/api/contracts/or-abstract/jbcontrollerutility/README.md), [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165), [`IJBFundAccessConstraintsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbfundaccessconstraintsstore.md)

Adheres to:

- [`IJBFundAccessConstraintsStore`](/docs/v4/deprecated/v3/api/interfaces/ijbfundaccessconstraintsstore.md): General interface for the generic controller methods in this contract that interacts with funding cycles and tokens according to the protocol's rules.

Inherits from:

- [`JBControllerUtility`](/docs/v4/deprecated/v3/api/contracts/or-abstract/jbcontrollerutility/README.md): Several functions in this contract can only be accessed by a project owner, or an address that has been preconfifigured to be an operator of the project.
- [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165): Introspection on interface adherance.

## State Variables

### _packedDistributionLimitDataOf

Data regarding the distribution limit of a project during a configuration.

bits 0-231: The amount of token that a project can distribute per funding cycle.

bits 232-255: The currency of amount that a project can distribute.

- _projectId The ID of the project to get the packed distribution limit data of.
- _configuration The configuration during which the packed distribution limit data applies.
- _terminal The terminal from which distributions are being limited.
- _token The token for which distributions are being limited.*

```solidity
mapping(uint256 => mapping(uint256 => mapping(IJBPaymentTerminal => mapping(address => uint256))))
    internal _packedDistributionLimitDataOf;
```

### _packedOverflowAllowanceDataOf

Data regarding the overflow allowance of a project during a configuration.

bits 0-231: The amount of overflow that a project is allowed to tap into on-demand throughout the configuration.*

bits 232-255: The currency of the amount of overflow that a project is allowed to tap.

- _projectId The ID of the project to get the packed overflow allowance data of.
- _configuration The configuration during which the packed overflow allowance data applies.
- _terminal The terminal managing the overflow.
- _token The token for which overflow is being allowed.*

```solidity
mapping(uint256 => mapping(uint256 => mapping(IJBPaymentTerminal => mapping(address => uint256))))
    internal _packedOverflowAllowanceDataOf;
```

## Functions

### distributionLimitOf

The amount of token that a project can distribute per funding cycle, and the currency it's in terms of.

The number of decimals in the returned fixed point amount is the same as that of the specified terminal.

```solidity
function distributionLimitOf(
    uint256 _projectId,
    uint256 _configuration,
    IJBPaymentTerminal _terminal,
    address _token
) external view override returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get the distribution limit of.|
|`_configuration`|`uint256`|The configuration during which the distribution limit applies.|
|`_terminal`|[`IJBPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md)|The terminal from which distributions are being limited.|
|`_token`|`address`|The token for which the distribution limit applies.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The distribution limit, as a fixed point number with the same number of decimals as the provided terminal.|
|`<none>`|`uint256`|The currency of the distribution limit.|

### overflowAllowanceOf

The amount of overflow that a project is allowed to tap into on-demand throughout a configuration, and the currency it's in terms of.

The number of decimals in the returned fixed point amount is the same as that of the specified terminal.

```solidity
function overflowAllowanceOf(
    uint256 _projectId,
    uint256 _configuration,
    IJBPaymentTerminal _terminal,
    address _token
) external view override returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to get the overflow allowance of.|
|`_configuration`|`uint256`|The configuration of the during which the allowance applies.|
|`_terminal`|[`IJBPaymentTerminal`](/docs/v4/deprecated/v3/api/interfaces/ijbpaymentterminal.md)|The terminal managing the overflow.|
|`_token`|`address`|The token for which the overflow allowance applies.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The overflow allowance, as a fixed point number with the same number of decimals as the provided terminal.|
|`<none>`|`uint256`|The currency of the overflow allowance.|

### constructor

```solidity
constructor(IJBDirectory _directory) JBControllerUtility(_directory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](/docs/v4/deprecated/v3/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|

### setFor

Sets a project's constraints for accessing treasury funds.

Only a project's current controller can set its fund access constraints.

```solidity
function setFor(
    uint256 _projectId,
    uint256 _configuration,
    JBFundAccessConstraints[] calldata _fundAccessConstraints
) external override onlyController(_projectId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project whose fund access constraints are being set.|
|`_configuration`|`uint256`|The funding cycle configuration the constraints apply within.|
|`_fundAccessConstraints`|[`JBFundAccessConstraints[]`](/docs/v4/deprecated/v3/api/data-structures/jbfundaccessconstraints.md)|An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.|

## Errors

### INVALID_DISTRIBUTION_LIMIT

```solidity
error INVALID_DISTRIBUTION_LIMIT();
```

### INVALID_DISTRIBUTION_LIMIT_CURRENCY

```solidity
error INVALID_DISTRIBUTION_LIMIT_CURRENCY();
```

### INVALID_OVERFLOW_ALLOWANCE

```solidity
error INVALID_OVERFLOW_ALLOWANCE();
```

### INVALID_OVERFLOW_ALLOWANCE_CURRENCY

```solidity
error INVALID_OVERFLOW_ALLOWANCE_CURRENCY();
```
