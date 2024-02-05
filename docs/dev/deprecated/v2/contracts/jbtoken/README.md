# JBToken

_An ERC-20 token that can be used by a project in the [`JBTokenStore`](/dev/deprecated/v2/contracts/jbtokenstore)._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBToken.sol

#### Interfaces

| Name                                                     | Description                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBToken`**](/dev/deprecated/v2/interfaces/ijbtoken.md) | Allows this contract to be used by projects in the JBTokenStore. |


#### Inheritance

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC20Permit`**](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit) | General token standard for fungible accounting. |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

#### Constructor

```
/**
  @param _name The name of the token.
  @param _symbol The symbol that the token should be represented by.
*/
constructor(string memory _name, string memory _symbol)
  ERC20(_name, _symbol) ERC20Permit(_name) {}
```

* `_name` is the name of the token.
* `_symbol` is the symbol that the token should be represented by.


#### Read

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`decimals`**](/dev/deprecated/v2/contracts/jbtoken/read/decimals.md)                                 | <p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul> |
| [**`totalSupply`**](/dev/deprecated/v2/contracts/jbtoken/read/totalsupply.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 totalSupply</code></li></ul> |
| [**`balanceOf`**](/dev/deprecated/v2/contracts/jbtoken/read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balanceOf</code></li></ul> |

#### Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`mint`**](/dev/deprecated/v2/contracts/jbtoken/write/mint.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`burn`**](/dev/deprecated/v2/contracts/jbtoken/write/burn.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`approve`**](/dev/deprecated/v2/contracts/jbtoken/write/approve.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _spender</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transfer`**](/dev/deprecated/v2/contracts/jbtoken/write/transfer.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transferFrom`**](/dev/deprecated/v2/contracts/jbtoken/write/transferfrom.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _from</code></li><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transferOwnership`**](/dev/deprecated/v2/contracts/jbtoken/write/transferownership.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _newOwner</code></li></ul> |
