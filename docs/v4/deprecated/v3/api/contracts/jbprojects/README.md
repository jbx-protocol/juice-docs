# JBProjects

_Stores project ownership and metadata._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBProjects.sol

#### Addresses

Ethereum mainnet: [`0xD8B4359143eda5B2d763E127Ed27c77addBc47d3`](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)

Goerli testnet: [`0x21263a042aFE4bAE34F08Bb318056C181bD96D3b`](https://goerli.etherscan.io/address/0x21263a042aFE4bAE34F08Bb318056C181bD96D3b)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBProjects`**](/v4/deprecated/v3/api/interfaces/ijbprojects.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/v4/deprecated/v3/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`ERC721Votes`**](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Votes) | A checkpointable standard definition for non-fungible tokens (NFTs).                                                                  |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

#### Constructor

```
constructor(IJBOperatorStore _operatorStore)
  ERC721('Juicebox Projects', 'JUICEBOX')
  EIP712('Juicebox Projects', '1')
  JBOperatable(_operatorStore)
{}
```

* `_operatorStore` is an [`IJBOperatorStore`](/v4/deprecated/v3/api/interfaces/ijboperatorstore.md) contract storing operator assignments.

#### Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`Create`**](/v4/deprecated/v3/api/contracts/jbprojects/events/create.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed owner</code></li><li><code>[JBProjectMetadata](/v4/deprecated/v3/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                  |
| [**`SetMetadata`**](/v4/deprecated/v3/api/contracts/jbprojects/events/setmetadata.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>[JBProjectMetadata](/v4/deprecated/v3/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                                                                                                         |
| [**`SetTokenUriResolver`**](/v4/deprecated/v3/api/contracts/jbprojects/events/settokenuriresolver.md) | <ul><li><code>[IJBTokenUriResolver](/v4/deprecated/v3/api/interfaces/ijbtokenuriresolver.md) indexed resolver</code></li><li><code>address caller</code></li></ul>                                                                                                         |

#### Properties

| Name                                                                                                        | Definition                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`count`**](/v4/deprecated/v3/api/contracts/jbprojects/properties/count.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                                                                                |
| [**`metadataContentOf`**](/v4/deprecated/v3/api/contracts/jbprojects/properties/metadatacontentof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string</code></li></ul>                    |
| [**`tokenUriResolver`**](/v4/deprecated/v3/api/contracts/jbprojects/properties/tokenuriresolver.md) | <p><strong>Returns</strong></p><ul><li><code>[IJBTokenUriResolver](/v4/deprecated/v3/api/interfaces/ijbtokenuriresolver.md)</code></li></ul>                    |

#### Read

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`tokenURI`**](/v4/deprecated/v3/api/contracts/jbprojects/read/tokenuri.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul>                                                                                                                          |
| [**`supportsInterface`**](/v4/deprecated/v3/api/contracts/jbprojects/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`createFor`**](/v4/deprecated/v3/api/contracts/jbprojects/write/createfor.md)                                                                        | <p><strong>Params</strong></p><ul><li><code>address _owner</code></li><li><code>[JBProjectMetadata](/v4/deprecated/v3/api/data-structures/jbprojectmetadata.md) _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 projectId</code></li></ul>                                             |
| [**`setMetadataOf`**](/v4/deprecated/v3/api/contracts/jbprojects/write/setmetadataof.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/v4/deprecated/v3/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[JBProjectMetadata](/v4/deprecated/v3/api/data-structures/jbprojectmetadata.md) _metadata</code></li></ul>                                                                                                                          |
| [**`setTokenUriResolver`**](/v4/deprecated/v3/api/contracts/jbprojects/write/settokenuriresolver.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>[IJBTokenUriResolver](/v4/deprecated/v3/api/interfaces/ijbtokenuriresolver.md) _newResolver</code></li></ul>                                                                                                                          |
