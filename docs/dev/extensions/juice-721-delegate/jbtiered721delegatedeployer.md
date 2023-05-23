# JBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/fc0bf08850ad04f445ec8810a23ecc01aaacf536/contracts/JBTiered721DelegateDeployer.sol)

Mainnet: [`0xd7C3CE7F47bc884f7e4cD8D49e3427c2E76859dc`](https://etherscan.io/address/0xd7C3CE7F47bc884f7e4cD8D49e3427c2E76859dc)

Goerli: [`0x16d266B73F24307D5F157d27b4753Fe9549Ca8D7`](https://goerli.etherscan.io/address/0x16d266B73F24307D5F157d27b4753Fe9549Ca8D7)

Inherits: [`IJBTiered721DelegateDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md)

Deploys a tier delegate.

Adheres to -
- [`IJBTiered721DelegateDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md):  General interface for the generic controller methods in this contract that interacts with funding cycles and tokens according to the protocol's rules.

## State Variables

### onchainGovernance

The contract that supports on-chain governance across all tiers.

```solidity
JBTiered721GovernanceDelegate public immutable onchainGovernance;
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
    JBTiered721GovernanceDelegate _onchainGovernance,
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

