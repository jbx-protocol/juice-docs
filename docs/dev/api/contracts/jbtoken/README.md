# JBToken

_An ERC-20 token that can be used by a project in the [`JBTokenStore`](/dev/api/contracts/jbtokenstore)._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBToken.sol

#### Interfaces

| Name                                                     | Description                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBToken`**](/dev/api/interfaces/ijbtoken.md) | Allows this contract to be used by projects in the JBTokenStore. |


#### Inheritance

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC20Votes`**](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Votes) | General token standard for fungible membership with snapshot capabilities sufficient to interact with standard governance contracts. |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

#### Constructor

```
/**
  @param _name The name of the token.
  @param _symbol The symbol that the token should be represented by.
  @param _projectId The ID of the project that this token should be exclusively used for. Send 0 to support any project.
*/
constructor(
  string memory _name,
  string memory _symbol,
  uint256 _projectId
)
  ERC20(_name, _symbol)
  ERC20Permit(_name)
{
  projectId = _projectId;
}
```

* `_name` is the name of the token.
* `_symbol` is the symbol that the token should be represented by.
* `_projectId` is the ID of the project that this token should be exclusively used for. Send 0 to support any project.


#### Properties

| Function                                   | Definition                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [**`projectId`**](/dev/api/contracts/jbtoken/properties/projectid.md)   | <p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |

#### Read

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`decimals`**](/dev/api/contracts/jbtoken/read/decimals.md)                                 | <p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul> |
| [**`totalSupply`**](/dev/api/contracts/jbtoken/read/totalsupply.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul> |
| [**`balanceOf`**](/dev/api/contracts/jbtoken/read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balanceOf</code></li></ul> |

#### Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`mint`**](/dev/api/contracts/jbtoken/write/mint.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`burn`**](/dev/api/contracts/jbtoken/write/burn.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`approve`**](/dev/api/contracts/jbtoken/write/approve.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _spender</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transfer`**](/dev/api/contracts/jbtoken/write/transfer.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transferFrom`**](/dev/api/contracts/jbtoken/write/transferfrom.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _from</code></li><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul> |
