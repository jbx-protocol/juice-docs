# JBDirectory

_Keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and funding cycles._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBDirectory.sol

#### Addresses

Ethereum mainnet: [`0xCc8f7a89d89c2AB3559f484E0C656423E979ac9C`](https://etherscan.io/address/0xCc8f7a89d89c2AB3559f484E0C656423E979ac9C)

Ethereum rinkeby: [`0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a`](https://rinkeby.etherscan.io/address/0x1A9b04A9617ba5C9b7EBfF9668C30F41db6fC21a)

#### Interfaces

| Name                                                   | Description                                                                                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBDirectory`**](/dev/deprecated/v2/interfaces/ijbdirectory.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                               | Description                                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/deprecated/v2/contracts/or-abstract/jboperatable/) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
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

* `_operatorStore` is an [`IJBOperatorStore`](/dev/deprecated/v2/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/deprecated/v2/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_fundingCycleStore` is an [`IJBFundingCycleStore`](/dev/deprecated/v2/interfaces/ijbfundingcyclestore.md) contract storing all funding cycle configurations.
* `_owner` is the address that will own the contract.

#### Events

| Name                                                     | Data                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetController`**](/dev/deprecated/v2/contracts/jbdirectory/events/setcontroller.md)           | <ul><li><code>int256 indexed projectId</code></li><li><code>[IJBController](/dev/deprecated/v2/interfaces/ijbcontroller.md) indexed controller</code></li><li><code>address caller</code></li></ul>                                       |
| [**`AddTerminal`**](/dev/deprecated/v2/contracts/jbdirectory/events/addterminal.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>address caller</code></li></ul>                                            |
| [**`SetTerminals`**](/dev/deprecated/v2/contracts/jbdirectory/events/setterminals.md)         | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md)[] indexed terminals</code></li><li><code>address caller</code></li></ul>                                            |
| [**`SetPrimaryTerminal`**](/dev/deprecated/v2/contracts/jbdirectory/events/setprimaryterminal.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed token</code></li><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>address caller</code></li></ul> |
| [**`SetIsAllowedToSetFirstController`**](/dev/deprecated/v2/contracts/jbdirectory/events/setisallowedtosetfirstcontroller.md) | <ul><li><code>address indexed addr</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul> |
#### Properties

| Function                                                                                   | Definition                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`projects`**](/dev/deprecated/v2/contracts/jbdirectory/properties/projects.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/dev/deprecated/v2/interfaces/ijbprojects.md)</code></li></ul> |
| [**`fundingCycleStore`**](/dev/deprecated/v2/contracts/jbdirectory/properties/fundingcyclestore.md)            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/dev/deprecated/v2/interfaces/ijbfundingcyclestore.md)</code></li></ul>                                                                             |
| [**`controllerOf`**](/dev/deprecated/v2/contracts/jbdirectory/properties/controllerof.md)                                           | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>address</code></li></ul> |
| [**`isAllowedToSetFirstController`**](/dev/deprecated/v2/contracts/jbdirectory/properties/isallowedtosetfirstcontroller.md)                                           | <p><strong>Params</strong></p><ul><li><code>address _address</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Read

| Function                                                   | Definition                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`terminalsOf`**](/dev/deprecated/v2/contracts/jbdirectory/read/terminalsof.md)                   | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md)[] terminals</code></li></ul>                                 |
| [**`isTerminalOf`**](/dev/deprecated/v2/contracts/jbdirectory/read/isterminalof.md)                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md) terminal</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool isTerminal</code></li></ul>                                                                                                    |
| [**`primaryTerminalOf`**](/dev/deprecated/v2/contracts/jbdirectory/read/primaryterminalof.md)       | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md) terminal</code></li></ul> |

#### Write

| Function                                                    | Definition                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`setControllerOf`**](/dev/deprecated/v2/contracts/jbdirectory/write/setcontrollerof.md)           | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _controller</code></li></ul> |
| [**`setTerminalsOf`**](/dev/deprecated/v2/contracts/jbdirectory/write/setterminalsof.md)               | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md)[] _terminals</code></li></ul>       |
| [**`setPrimaryTerminalOf`**](/dev/deprecated/v2/contracts/jbdirectory/write/setprimaryterminalof.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li><code>[IJBPaymentTerminal](/dev/deprecated/v2/interfaces/ijbpaymentterminal.md) _terminal</code></li></ul>                                       |
| [**`setIsAllowedToSetFirstController`**](/dev/deprecated/v2/contracts/jbdirectory/write/setisallowedtosetfirstcontroller.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _address</code></li><li><code>bool _flag</code></li></ul>                                       |
