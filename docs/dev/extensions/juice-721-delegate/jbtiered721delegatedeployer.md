# JBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/42d3a6d91f96ac82ae443fb9b5a22dd1ff8d398e/contracts/JBTiered721DelegateDeployer.sol)

Mainnet: [`0xc017a3F357a1C5F5298cA40B5647d5667B73B22A`](https://etherscan.io/address/0xc017a3F357a1C5F5298cA40B5647d5667B73B22A)

Goerli: [`0x55e778fBD008Cf3e29beaed2FB3E7F55f89cB487`](https://goerli.etherscan.io/address/0x55e778fBD008Cf3e29beaed2FB3E7F55f89cB487)

Inherits: [`IJBTiered721DelegateDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md)

Deploys a JBTiered721Delegate.

## State Variables

### _nonce

This contract's current nonce, used for the Juicebox delegates registry.

```solidity
uint256 internal _nonce;
```

### onchainGovernance

A contract that supports on-chain governance across all tiers.

```solidity
JBTiered721GovernanceDelegate public immutable onchainGovernance;
```

### noGovernance

A contract with no on-chain governance mechanism.

```solidity
JBTiered721Delegate public immutable noGovernance;
```

### delegatesRegistry

A contract that stores references to deployer contracts of delegates.

```solidity
IJBDelegatesRegistry public immutable delegatesRegistry;
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

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_onchainGovernance`|[`JBTiered721GovernanceDelegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721governancedelegate.md)|Reference copy of the delegate that works with onchain governance.|
|`_noGovernance`|[`JBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/jbtiered721delegate.md)|Reference copy of a simpler delegate without on-chain governance.|
|`_delegatesRegistry`|`IJBDelegatesRegistry`|A contract that stores references to delegate deployer contracts.|

### deployDelegateFor

Deploys a delegate for the provided project.

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
|`_projectId`|`uint256`|The ID of the project for which the delegate will be deployed.|
|`_deployTiered721DelegateData`|[`JBDeployTiered721DelegateData`](/docs/dev/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md)|Structure containing data necessary for delegate deployment.|
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

