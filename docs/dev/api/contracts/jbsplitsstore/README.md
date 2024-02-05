# JBSplitsStore

_Stores splits for each project._


#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBSplitsStore.sol

#### Addresses

Ethereum mainnet: [`0x0D25194ABE95185Db8e4B0294F5669E21C534785`](https://etherscan.io/address/0x0D25194ABE95185Db8e4B0294F5669E21C534785)

Goerli testnet: [`0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272`](https://goerli.etherscan.io/address/0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSplitsStore`**](/dev/api/interfaces/ijbsplitsstore.md) |General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

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
) JBOperatable(_operatorStore) {
  projects = _projects;
  directory = _directory;
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/dev/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Events

| Name                                 | Data                                                                                                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetSplit`**](/dev/api/contracts/jbsplitsstore/events/setsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/dev/api/data-structures/jbsplit.md) split</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                   | Definition                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [**`projects`**](/dev/api/contracts/jbsplitsstore/properties/projects.md)   | <p><strong>Returns</strong></p><ul><li><code>IJBProjects</code></li></ul> |
| [**`directory`**](/dev/api/contracts/jbsplitsstore/properties/directory.md) | <p><strong>Returns</strong></p><ul><li><code>IJBPaymentTerminal</code></li></ul> |

#### Read

| Function                           | Definition                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`splitsOf`**](/dev/api/contracts/jbsplitsstore/read/splitsof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>[JBGroupedSplits](/dev/api/data-structures/jbgroupedsplits.md)[] calldata _groupedSplits</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBSplit](/dev/api/data-structures/jbsplit.md)[] splits</code></li></ul> |

#### Write

| Function                  | Definition                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`set`**](/dev/api/contracts/jbsplitsstore/write/set.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li><li><code>[JBSplit](/dev/api/data-structures/jbsplit.md)[] _splits</code></li></ul> |
