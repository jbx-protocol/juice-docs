---
description: >-
 Manage token minting, burning, and account balances.
---

# JBTokenStore

## Overview

### Code

{% embed url="https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBTokenStore.sol" %}

### **Addresses**

Ethereum mainnet: _Not yet deployed_

### **Interfaces**

| Name                                                     | Description                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBTokenStore`**](../../interfaces/ijbtokenstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

### **Inheritance**

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBControllerUtility`**](../or-abstract/jbcontrollerutility/) | Includes convenience functionality for checking if the message sender is the current controller of the project whose data is being manipulated.                                      |
| [**`JBOperatable`**](../or-abstract/jboperatable/)               | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

## Constructor

```solidity
constructor(
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory
) JBOperatable(_operatorStore) JBControllerUtility(_directory) {
  projects = _projects;
}
```

* **Arguments:**
  * `_operatorStore` is an [`IJBOperatorStore`](../../interfaces/ijboperatorstore.md) contract storing operator assignments.
  * `_projects` is an [`IJBProjects`](../../interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
  * `_directory` is an [`IJBDirectory`](../../interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

## Events

| Name                                                     | Data                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Issue`**](events/issue.md)                           | <ul><li><code>uint256 indexed projectId</code></li><li><code>[`IJBToken`](../../interfaces/ijbtoken.md)indexed token</code></li><li><code>string name</code></li><li><code>string symbol</code></li><li><code>address caller</code></li></ul>                                                                  |
| [**`Mint`**](events/mint.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>bool tokensWereClaimed</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul>        |
| [**`Burn`**](events/burn.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 initialClaimedBalance</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul> |
| [**`Claim`**](events/claim.md)                           | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                  |
| [**`ShouldRequireClaim`**](events/shouldrequireclaim.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul>                                                                                                                                           |
| [**`Change`**](events/change.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[`IJBToken`](../../interfaces/ijbtoken.md)indexed newToken</code></li><li><code>[`IJBToken`](../../interfaces/ijbtoken.md)indexed oldToken</code></li><li><code>address indexed owner</code></li><li><code>address caller</code></li></ul>                                                                                           |
| [**`Transfer`**](events/transfer.md)                     | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>address indexed recipient</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                   |

## Properties

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projects`**](properties/projects.md)                             | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[`IJBProjects`](../../interfaces/ijbprojects.md)projects</code></li></ul>   |
| [**`tokenOf`**](properties/tokenof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[`IJBToken`](../../interfaces/ijbprojects.md)token</code></li></ul>                                                |
| [**`unclaimedBalanceOf`**](properties/unclaimedbalanceof.md)         | <p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 unclaimedBalance</code></li></ul> |
| [**`unclaimedTotalSupplyOf`**](properties/unclaimedtotalsupplyof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 unclaimedTotalSupply</code></li></ul>                                  |
| [**`requireClaimFor`**](properties/requireclaimfor.md)               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool flag</code></li></ul>                                                     |

## Read

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`totalSupplyOf`**](read/totalsupplyof.md)                         | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul>                                           |
| [**`balanceOf`**](read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>          |

## Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`issueFor`**](write/issuefor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[`onlyController`](../or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>string _name</code></li><li><code>string _symbol</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[`IJBToken`](../../interfaces/ijbtoken.md)token</code></li></ul> |
| [**`changeFor`**](write/changefor.md)                       | <p><strong>Traits</strong></p><ul><li><code>[`onlyController`](../or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>IJBToken _token</code></li><li><code>address _newOwner</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[`IJBToken`](../../interfaces/ijbtoken.md)</code><code>oldToken</code></li></ul>                                             |
| [**`mintFor`**](write/mintfor.md)                                   | <p><strong>Traits</strong></p><ul><li><code>[`onlyController`](../or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`burnFrom`**](write/burnfrom.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[`onlyController`](../or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`claimFor`**](write/claimfor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[`requirePermissionAllowingOverride`](../or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                       |
| [**`transferFrom`**](write/transferfrom.md)                             | <p><strong>Traits</strong></p><ul><li><code>[`requirePermission`](../or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>address _recipient</code></li><li><code>uint256 _amount</code></li></ul>                                |
| [**`shouldRequireClaimingFor`**](write/shouldrequireclaimingfor.md) | <p><strong>Traits</strong></p><ul><li><code>[`requirePermission`](../or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>bool _flag</code></li></ul>                                                                                                                                                                                                 |
