# JBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/0032066684f3154c956fbb736a7376333174171f/contracts/JBTiered721DelegateDeployer.sol)

Mainnet: [`0xC3279bAbe48c43955932570694f3aDb55027eB8e`](https://etherscan.io/address/0xC3279bAbe48c43955932570694f3aDb55027eB8e)

Goerli: [`0xF9d5Bc54f54eBEE30dE3e960992a343481073B3d`](https://goerli.etherscan.io/address/0xF9d5Bc54f54eBEE30dE3e960992a343481073B3d)

Inherits: [`IJBTiered721DelegateDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md)

Deploys a tier delegate.

Adheres to -
- [`IJBTiered721DelegateDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md):  General interface for the generic controller methods in this contract that interacts with funding cycles and tokens according to the protocol's rules.

## State Variables

### globalGovernance

The contract that supports on-chain governance across all tiers.

```solidity
JB721GlobalGovernance public immutable globalGovernance;
```

### tieredGovernance

The contract that supports on-chain governance per-tier.

```solidity
JB721TieredGovernance public immutable tieredGovernance;
```

### noGovernance

The contract that has no on-chain governance.

```solidity
JBTiered721Delegate public immutable noGovernance;
```

### delegatesRegistry

The delegates registry.

```solidity
IJBDelegatesRegistry public immutable delegatesRegistry;
```

### _nonce

This contract current nonce, used for the registry

```solidity
uint256 private _nonce;
```

## Functions

### constructor

```solidity
constructor(
    JB721GlobalGovernance _globalGovernance,
    JB721TieredGovernance _tieredGovernance,
    JBTiered721Delegate _noGovernance,
    IJBDelegatesRegistry _delegatesRegistry
);
```

### deployDelegateFor

Deploys a delegate.

```solidity
function deployDelegateFor(
    uint256 _projectId,
    JBDeployTiered721DelegateData memory _deployTiered721DelegateData,
    IJBDirectory _directory
) external override returns (IJBTiered721Delegate newDelegate);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project this contract's functionality applies to.|
|`_deployTiered721DelegateData`|[`JBDeployTiered721DelegateData`](/docs/dev/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md)|Data necessary to fulfill the transaction to deploy a delegate.|
|`_directory`|[`IJBDirectory`](/docs/dev/api/interfaces/ijbdirectory.md)|The directory of terminals and controllers for projects.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newDelegate`|[`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)|The address of the newly deployed delegate.|

## Errors

### INVALID_GOVERNANCE_TYPE

```solidity
error INVALID_GOVERNANCE_TYPE();
```

