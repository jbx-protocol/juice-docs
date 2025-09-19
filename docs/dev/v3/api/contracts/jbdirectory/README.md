# JBDirectory

_Keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and funding cycles._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBDirectory.sol

#### Addresses

Ethereum mainnet: [`0x65572FB928b46f9aDB7cfe5A4c41226F636161ea`](https://etherscan.io/address/0x65572FB928b46f9aDB7cfe5A4c41226F636161ea)

Goerli testnet: [`0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99`](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)

#### Interfaces

| Name                                                   | Description                                                                                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBDirectory`**](/docs/dev/v3/api/interfaces/ijbdirectory.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                               | Description                                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/docs/dev/v3/api/contracts/or-abstract/jboperatable/README.md) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/security) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/**
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _fundingCycleStore A contract storing all funding cycle configurations.
  @param _owner The address that will own the contract.
*/
constructor(
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBFundingCycleStore _fundingCycleStore,
  address _owner
) JBOperatable(_operatorStore) {
  projects = _projects;
  fundingCycleStore = _fundingCycleStore;
  _transferOwnership(_owner);
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/docs/dev/v3/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/docs/dev/v3/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_fundingCycleStore` is an [`IJBFundingCycleStore`](/docs/dev/v3/api/interfaces/ijbfundingcyclestore.md) contract storing all funding cycle configurations.
* `_owner` is the address that will own the contract.

#### Events

| Name                                                     | Data                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetController`**](/docs/dev/v3/api/contracts/jbdirectory/events/setcontroller.md)           | <ul><li><code>int256 indexed projectId</code></li><li><code>[IJBController](/docs/dev/v3/interfaces/ijbcontroller.md) indexed controller</code></li><li><code>address caller</code></li></ul>                                       |
| [**`AddTerminal`**](/docs/dev/v3/api/contracts/jbdirectory/events/addterminal.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>address caller</code></li></ul>                                            |
| [**`SetTerminals`**](/docs/dev/v3/api/contracts/jbdirectory/events/setterminals.md)         | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)[] indexed terminals</code></li><li><code>address caller</code></li></ul>                                            |
| [**`SetPrimaryTerminal`**](/docs/dev/v3/api/contracts/jbdirectory/events/setprimaryterminal.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed token</code></li><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>address caller</code></li></ul> |
| [**`SetIsAllowedToSetFirstController`**](/docs/dev/v3/api/contracts/jbdirectory/events/setisallowedtosetfirstcontroller.md) | <ul><li><code>address indexed addr</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul> |
#### Properties

| Function                                                                                   | Definition                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`projects`**](/docs/dev/v3/api/contracts/jbdirectory/properties/projects.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/docs/dev/v3/api/interfaces/ijbprojects.md)</code></li></ul> |
| [**`fundingCycleStore`**](/docs/dev/v3/api/contracts/jbdirectory/properties/fundingcyclestore.md)            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/docs/dev/v3/api/interfaces/ijbfundingcyclestore.md)</code></li></ul>                                                                             |
| [**`controllerOf`**](/docs/dev/v3/api/contracts/jbdirectory/properties/controllerof.md)                                           | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>address</code></li></ul> |
| [**`isAllowedToSetFirstController`**](/docs/dev/v3/api/contracts/jbdirectory/properties/isallowedtosetfirstcontroller.md)                                           | <p><strong>Params</strong></p><ul><li><code>address _address</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Read

| Function                                                   | Definition                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`terminalsOf`**](/docs/dev/v3/api/contracts/jbdirectory/read/terminalsof.md)                   | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)[] terminals</code></li></ul>                                 |
| [**`isTerminalOf`**](/docs/dev/v3/api/contracts/jbdirectory/read/isterminalof.md)                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) terminal</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool isTerminal</code></li></ul>                                                                                                    |
| [**`primaryTerminalOf`**](/docs/dev/v3/api/contracts/jbdirectory/read/primaryterminalof.md)       | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) terminal</code></li></ul> |

#### Write

| Function                                                    | Definition                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`setControllerOf`**](/docs/dev/v3/api/contracts/jbdirectory/write/setcontrollerof.md)           | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/docs/dev/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _controller</code></li></ul> |
| [**`setTerminalsOf`**](/docs/dev/v3/api/contracts/jbdirectory/write/setterminalsof.md)               | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/docs/dev/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)[] _terminals</code></li></ul>       |
| [**`setPrimaryTerminalOf`**](/docs/dev/v3/api/contracts/jbdirectory/write/setprimaryterminalof.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/docs/dev/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li><code>[IJBPaymentTerminal](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md) _terminal</code></li></ul>                                       |
| [**`setIsAllowedToSetFirstController`**](/docs/dev/v3/api/contracts/jbdirectory/write/setisallowedtosetfirstcontroller.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _address</code></li><li><code>bool _flag</code></li></ul>                                       |
