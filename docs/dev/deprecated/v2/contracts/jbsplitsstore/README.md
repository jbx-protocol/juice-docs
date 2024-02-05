# JBSplitsStore

_Stores splits for each project._


#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBSplitsStore.sol

#### Addresses

Ethereum mainnet: [`0xFBE1075826B7FFd898cf8D944885ba6a8D714A7F`](https://etherscan.io/address/0xFBE1075826B7FFd898cf8D944885ba6a8D714A7F)

Ethereum rinkeby: [`0x5918B60672f53D504881C63AB04c65338ff185d7`](https://rinkeby.etherscan.io/address/0x5918B60672f53D504881C63AB04c65338ff185d7)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSplitsStore`**](/dev/deprecated/v2/interfaces/ijbsplitsstore.md) |General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/deprecated/v2/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

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

* `_operatorStore` is an [`IJBOperatorStore`](/dev/deprecated/v2/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/deprecated/v2/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/dev/deprecated/v2/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Events

| Name                                 | Data                                                                                                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetSplit`**](/dev/deprecated/v2/contracts/jbsplitsstore/events/setsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/dev/deprecated/v2/data-structures/jbsplit.md) split</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                   | Definition                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [**`projects`**](/dev/deprecated/v2/contracts/jbsplitsstore/properties/projects.md)   | <p><strong>Returns</strong></p><ul><li><code>IJBProjects</code></li></ul> |
| [**`directory`**](/dev/deprecated/v2/contracts/jbsplitsstore/properties/directory.md) | <p><strong>Returns</strong></p><ul><li><code>IJBPaymentTerminal</code></li></ul> |

#### Read

| Function                           | Definition                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`splitsOf`**](/dev/deprecated/v2/contracts/jbsplitsstore/read/splitsof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>[JBGroupedSplits](/dev/deprecated/v2/data-structures/jbgroupedsplits.md)[] calldata _groupedSplits</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBSplit](/dev/deprecated/v2/data-structures/jbsplit.md)[] splits</code></li></ul> |

#### Write

| Function                  | Definition                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`set`**](/dev/deprecated/v2/contracts/jbsplitsstore/write/set.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/dev/deprecated/v2/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li><li><code>[JBSplit](/dev/deprecated/v2/data-structures/jbsplit.md)[] _splits</code></li></ul> |
