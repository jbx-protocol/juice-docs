# JBTiered721DelegateDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/JBTiered721DelegateDeployer.sol)

Inherits: [`IJBTiered721DelegateDeployer`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md)

Deploys a JBTiered721Delegate.

## State Variables

### \_nonce

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

| Name                 | Type                                                                                                        | Description                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `_onchainGovernance` | [`JBTiered721GovernanceDelegate`](/v4/deprecated/v3/extensions/juice-721-delegate/jbtiered721governancedelegate.md) | Reference copy of the delegate that works with onchain governance. |
| `_noGovernance`      | [`JBTiered721Delegate`](/v4/deprecated/v3/extensions/juice-721-delegate/jbtiered721delegate.md)                     | Reference copy of a simpler delegate without on-chain governance.  |
| `_delegatesRegistry` | `IJBDelegatesRegistry`                                                                                      | A contract that stores references to delegate deployer contracts.  |

### deployDelegateFor

Deploys a delegate for the provided project.

```solidity
function deployDelegateFor(uint256 _projectId, JBDeployTiered721DelegateData memory _deployTiered721DelegateData)
    external
    override
    returns (IJBTiered721Delegate newDelegate);
```

**Parameters**

| Name                           | Type                                                                                                                | Description                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `_projectId`                   | `uint256`                                                                                                           | The ID of the project for which the delegate will be deployed. |
| `_deployTiered721DelegateData` | [`JBDeployTiered721DelegateData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md) | Structure containing data necessary for delegate deployment.   |

**Returns**

| Name          | Type                                                                                                 | Description                                 |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `newDelegate` | [`IJBTiered721Delegate`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md) | The address of the newly deployed delegate. |

## Errors

### INVALID_GOVERNANCE_TYPE

```solidity
error INVALID_GOVERNANCE_TYPE();
```
