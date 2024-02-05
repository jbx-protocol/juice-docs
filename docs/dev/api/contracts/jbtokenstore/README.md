# JBTokenStore

_Manage token minting, burning, and account balances._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBTokenStore.sol

#### Addresses

Ethereum mainnet: [`0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7`](https://etherscan.io/address/0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7)

Goerli testnet: [`0x1246a50e3aDaF684Ac566f0c40816fF738F309B3`](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3)

#### Interfaces

| Name                                                     | Description                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBTokenStore`**](/dev/api/interfaces/ijbtokenstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBControllerUtility`**](/dev/api/contracts/or-abstract/jbcontrollerutility/) | Includes convenience functionality for checking if the message sender is the current controller of the project whose data is being manipulated.                                      |
| [**`JBOperatable`**](/dev/api/contracts/or-abstract/jboperatable/)               | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/**
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _fundingCycleStore A contract storing all funding cycle configurations.

*/
constructor(
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory,
  IJBFundingCycleStore _fundingCycleStore
) JBOperatable(_operatorStore) JBControllerUtility(_directory) {
  projects = _projects;
  fundingCycleStore = _fundingCycleStore;
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/dev/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_fundingCycleStore` is an [`IJBFundingCycleStore`](/dev/api/interfaces/ijbfundingcyclestore.md) contract storing all funding cycle configurations.

#### Events

| Name                                                     | Data                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Issue`**](/dev/api/contracts/jbtokenstore/events/issue.md)                           | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/dev/api/interfaces/ijbtoken.md) indexed token</code></li><li><code>string name</code></li><li><code>string symbol</code></li><li><code>address caller</code></li></ul>                                                                  |
| [**`Mint`**](/dev/api/contracts/jbtokenstore/events/mint.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>bool tokensWereClaimed</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul>        |
| [**`Burn`**](/dev/api/contracts/jbtokenstore/events/burn.md)                             | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 initialClaimedBalance</code></li><li><code>bool preferClaimedTokens</code></li><li><code>address caller</code></li></ul> |
| [**`Claim`**](/dev/api/contracts/jbtokenstore/events/claim.md)                           | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 initialUnclaimedBalance</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                  |
| [**`Set`**](/dev/api/contracts/jbtokenstore/events/set.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/dev/api/interfaces/ijbtoken.md) indexed newToken</code></li><li><code>address caller</code></li></ul>                                                                                           |
| [**`Transfer`**](/dev/api/contracts/jbtokenstore/events/transfer.md)                     | <ul><li><code>address indexed holder</code></li><li><code>uint256 indexed projectId</code></li><li><code>address indexed recipient</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                   |

#### Properties

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projects`**](/dev/api/contracts/jbtokenstore/properties/projects.md)                             | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/dev/api/interfaces/ijbprojects.md)</code></li></ul>   |
| [**`fundingCycleStore`**](/dev/api/contracts/jbtokenstore/properties/fundingcyclestore.md)                             | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/dev/api/interfaces/ijbfundingcyclestore.md)</code></li></ul>   |
| [**`tokenOf`**](/dev/api/contracts/jbtokenstore/properties/tokenof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/dev/api/interfaces/ijbprojects.md)</code></li></ul>                                                |
| [**`projectOf`**](/dev/api/contracts/jbtokenstore/properties/projectof.md)                               | <p><strong>Params</strong></p><ul><li><code>uint256 _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                                |
| [**`unclaimedBalanceOf`**](/dev/api/contracts/jbtokenstore/properties/unclaimedbalanceof.md)         | <p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |
| [**`unclaimedTotalSupplyOf`**](/dev/api/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                  |

#### Read

| Function                                                             | Definition                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`totalSupplyOf`**](/dev/api/contracts/jbtokenstore/read/totalsupplyof.md)                         | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul>                                           |
| [**`balanceOf`**](/dev/api/contracts/jbtokenstore/read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _holder</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>          |

#### Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`issueFor`**](/dev/api/contracts/jbtokenstore/write/issuefor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>string _name</code></li><li><code>string _symbol</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBToken](/dev/api/interfaces/ijbtoken.md) token</code></li></ul> |
| [**`setFor`**](/dev/api/contracts/jbtokenstore/write/setfor.md)                       | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>IJBToken _token</code></li></ul>                                             |
| [**`mintFor`**](/dev/api/contracts/jbtokenstore/write/mintfor.md)                                   | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/dev/api/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`burnFrom`**](/dev/api/contracts/jbtokenstore/write/burnfrom.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/dev/api/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>bool _preferClaimedTokens</code></li></ul>                               |
| [**`claimFor`**](/dev/api/contracts/jbtokenstore/write/claimfor.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                       |
| [**`transferFrom`**](/dev/api/contracts/jbtokenstore/write/transferfrom.md)                             | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>address _recipient</code></li><li><code>uint256 _amount</code></li></ul>                                |
