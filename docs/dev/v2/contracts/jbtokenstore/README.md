# JBTokenStore

_Manage token minting, burning, and account balances._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBTokenStore.sol

#### Addresses

Ethereum mainnet: [`0xCBB8e16d998161AdB20465830107ca298995f371`](https://etherscan.io/address/0xCBB8e16d998161AdB20465830107ca298995f371)

Ethereum rinkeby: [`0x220468762c6cE4C05E8fda5cc68Ffaf0CC0B2A85`](https://rinkeby.etherscan.io/address/0x220468762c6cE4C05E8fda5cc68Ffaf0CC0B2A85)

#### Interfaces

| Name                                                     | Description                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBTokenStore`**](/docs/dev/v2/interfaces/ijbtokenstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBControllerUtility`**](/docs/dev/v2/contracts/or-abstract/jbcontrollerutility/README.md) | Includes convenience functionality for checking if the message sender is the current controller of the project whose data is being manipulated.                                      |
| [**`JBOperatable`**](/docs/dev/v2/contracts/or-abstract/jboperatable/README.md)               | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/**
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
*/
constructor(
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory
) JBOperatable(_operatorStore) JBControllerUtility(_directory) {
  projects = _projects;
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/docs/dev/v2/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/docs/dev/v2/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/docs/dev/v2/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Events

| Name                                                     | Data                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Issue`**](/docs/dev/v2/contracts/jbtokenstore/events/issue.md)                           | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/docs/dev/v2/interfaces/ijbtoken.md) indexed token</code></li><li><code>string name</code></li><li><code>string symbol</code></li><li><code>address caller</code></li></ul>                                                                  |
| [**`Mint`**](/docs/dev/v2/contracts/jbtokenstore/events/mint.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>bool tokensWereClaimed</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul>        |
| [**`Burn`**](/docs/dev/v2/contracts/jbtokenstore/events/burn.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 initialClaimedBalance</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul> |
| [**`Claim`**](/docs/dev/v2/contracts/jbtokenstore/events/claim.md)                           | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                  |
| [**`ShouldRequireClaim`**](/docs/dev/v2/contracts/jbtokenstore/events/shouldrequireclaim.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul>                                                                                                                                           |
| [**`Change`**](/docs/dev/v2/contracts/jbtokenstore/events/change.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/docs/dev/v2/interfaces/ijbtoken.md) indexed newToken</code></li><li><code>[IJBToken](/docs/dev/v2/interfaces/ijbtoken.md) indexed oldToken</code></li><li><code>address indexed owner</code></li><li><code>address caller</code></li></ul>                                                                                           |
| [**`Transfer`**](/docs/dev/v2/contracts/jbtokenstore/events/transfer.md)                     | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>address indexed recipient</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                   |

#### Properties

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projects`**](/docs/dev/v2/contracts/jbtokenstore/properties/projects.md)                             | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/docs/dev/v2/interfaces/ijbprojects.md)</code></li></ul>   |
| [**`tokenOf`**](/docs/dev/v2/contracts/jbtokenstore/properties/tokenof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/docs/dev/v2/interfaces/ijbprojects.md)</code></li></ul>                                                |
| [**`projectOf`**](/docs/dev/v2/contracts/jbtokenstore/properties/projectof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                                |
| [**`unclaimedBalanceOf`**](/docs/dev/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)         | <p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |
| [**`unclaimedTotalSupplyOf`**](/docs/dev/v2/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                  |
| [**`requireClaimFor`**](/docs/dev/v2/contracts/jbtokenstore/properties/requireclaimfor.md)               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul>                                                     |

#### Read

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`totalSupplyOf`**](/docs/dev/v2/contracts/jbtokenstore/read/totalsupplyof.md)                         | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul>                                           |
| [**`balanceOf`**](/docs/dev/v2/contracts/jbtokenstore/read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>          |

#### Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`issueFor`**](/docs/dev/v2/contracts/jbtokenstore/write/issuefor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/docs/dev/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>string _name</code></li><li><code>string _symbol</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/docs/dev/v2/interfaces/ijbtoken.md) token</code></li></ul> |
| [**`changeFor`**](/docs/dev/v2/contracts/jbtokenstore/write/changefor.md)                       | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/docs/dev/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>IJBToken _token</code></li><li><code>address _newOwner</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/docs/dev/v2/interfaces/ijbtoken.md) oldToken</code></li></ul>                                             |
| [**`mintFor`**](/docs/dev/v2/contracts/jbtokenstore/write/mintfor.md)                                   | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/docs/dev/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`burnFrom`**](/docs/dev/v2/contracts/jbtokenstore/write/burnfrom.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/docs/dev/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`claimFor`**](/docs/dev/v2/contracts/jbtokenstore/write/claimfor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/docs/dev/v2/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                       |
| [**`transferFrom`**](/docs/dev/v2/contracts/jbtokenstore/write/transferfrom.md)                             | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/docs/dev/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>address _recipient</code></li><li><code>uint256 _amount</code></li></ul>                                |
| [**`shouldRequireClaimingFor`**](/docs/dev/v2/contracts/jbtokenstore/write/shouldrequireclaimingfor.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/docs/dev/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>bool _flag</code></li></ul>                                                                                                                                                                                                 |
