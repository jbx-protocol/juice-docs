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
| [**`IJBTokenStore`**](/dev/deprecated/v2/interfaces/ijbtokenstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBControllerUtility`**](/dev/deprecated/v2/contracts/or-abstract/jbcontrollerutility/) | Includes convenience functionality for checking if the message sender is the current controller of the project whose data is being manipulated.                                      |
| [**`JBOperatable`**](/dev/deprecated/v2/contracts/or-abstract/jboperatable/)               | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

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

* `_operatorStore` is an [`IJBOperatorStore`](/dev/deprecated/v2/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/deprecated/v2/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Events

| Name                                                     | Data                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Issue`**](/dev/deprecated/v2/contracts/jbtokenstore/events/issue.md)                           | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/dev/deprecated/v2/interfaces/ijbtoken.md) indexed token</code></li><li><code>string name</code></li><li><code>string symbol</code></li><li><code>address caller</code></li></ul>                                                                  |
| [**`Mint`**](/dev/deprecated/v2/contracts/jbtokenstore/events/mint.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>bool tokensWereClaimed</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul>        |
| [**`Burn`**](/dev/deprecated/v2/contracts/jbtokenstore/events/burn.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 initialClaimedBalance</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul> |
| [**`Claim`**](/dev/deprecated/v2/contracts/jbtokenstore/events/claim.md)                           | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                  |
| [**`ShouldRequireClaim`**](/dev/deprecated/v2/contracts/jbtokenstore/events/shouldrequireclaim.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul>                                                                                                                                           |
| [**`Change`**](/dev/deprecated/v2/contracts/jbtokenstore/events/change.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/dev/deprecated/v2/interfaces/ijbtoken.md) indexed newToken</code></li><li><code>[IJBToken](/dev/deprecated/v2/interfaces/ijbtoken.md) indexed oldToken</code></li><li><code>address indexed owner</code></li><li><code>address caller</code></li></ul>                                                                                           |
| [**`Transfer`**](/dev/deprecated/v2/contracts/jbtokenstore/events/transfer.md)                     | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>address indexed recipient</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                   |

#### Properties

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projects`**](/dev/deprecated/v2/contracts/jbtokenstore/properties/projects.md)                             | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/dev/deprecated/v2/interfaces/ijbprojects.md)</code></li></ul>   |
| [**`tokenOf`**](/dev/deprecated/v2/contracts/jbtokenstore/properties/tokenof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/dev/deprecated/v2/interfaces/ijbprojects.md)</code></li></ul>                                                |
| [**`projectOf`**](/dev/deprecated/v2/contracts/jbtokenstore/properties/projectof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                                |
| [**`unclaimedBalanceOf`**](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedbalanceof.md)         | <p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |
| [**`unclaimedTotalSupplyOf`**](/dev/deprecated/v2/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                  |
| [**`requireClaimFor`**](/dev/deprecated/v2/contracts/jbtokenstore/properties/requireclaimfor.md)               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul>                                                     |

#### Read

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`totalSupplyOf`**](/dev/deprecated/v2/contracts/jbtokenstore/read/totalsupplyof.md)                         | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul>                                           |
| [**`balanceOf`**](/dev/deprecated/v2/contracts/jbtokenstore/read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>          |

#### Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`issueFor`**](/dev/deprecated/v2/contracts/jbtokenstore/write/issuefor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/dev/deprecated/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>string _name</code></li><li><code>string _symbol</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/dev/deprecated/v2/interfaces/ijbtoken.md) token</code></li></ul> |
| [**`changeFor`**](/dev/deprecated/v2/contracts/jbtokenstore/write/changefor.md)                       | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/dev/deprecated/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>IJBToken _token</code></li><li><code>address _newOwner</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/dev/deprecated/v2/interfaces/ijbtoken.md) oldToken</code></li></ul>                                             |
| [**`mintFor`**](/dev/deprecated/v2/contracts/jbtokenstore/write/mintfor.md)                                   | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/dev/deprecated/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`burnFrom`**](/dev/deprecated/v2/contracts/jbtokenstore/write/burnfrom.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/dev/deprecated/v2/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`claimFor`**](/dev/deprecated/v2/contracts/jbtokenstore/write/claimfor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                       |
| [**`transferFrom`**](/dev/deprecated/v2/contracts/jbtokenstore/write/transferfrom.md)                             | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>address _recipient</code></li><li><code>uint256 _amount</code></li></ul>                                |
| [**`shouldRequireClaimingFor`**](/dev/deprecated/v2/contracts/jbtokenstore/write/shouldrequireclaimingfor.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>bool _flag</code></li></ul>                                                                                                                                                                                                 |
