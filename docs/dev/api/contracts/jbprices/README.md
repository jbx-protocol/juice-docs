# JBPrices

_Manages and normalizes price feeds._

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/JBPrices.sol

#### Addresses

Ethereum mainnet: [`0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410`](https://etherscan.io/address/0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410)

Goerli testnet: [`0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C`](https://goerli.etherscan.io/address/0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C)

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPrices`**](/dev/api/interfaces/ijbprices.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/**
  @param _owner The address that will own the contract.
*/
constructor(address _owner) {
  // Transfer the ownership.
  transferOwnership(_owner);
}
```

* `_owner` is the address that will own the contract.

#### Events

| Name                               | Data                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`AddFeed`**](/dev/api/contracts/jbprices/events/addfeed.md) | <ul><li><code>uint256 indexed currency</code></li><li><code>uint256 indexed base</code></li><li><code>[IJBPriceFeed](/dev/api/interfaces/ijbpricefeed.md) feed</code></li></ul> |

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`feedFor`**](/dev/api/contracts/jbprices/properties/feedfor.md)                            | <p><strong>Params</strong></p><ul><li><code>uint256 _currency</code></li><li><code>uint256 _base</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPriceFeed](/dev/api/interfaces/ijbpricefeed.md)</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`priceFor`**](read/pricefor.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _currency</code></li><li><code>uint256 _base</code></li><li><code>uint256 _decimals</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 price</code></li></ul> |

#### Write

| Function                             | Definition                                                                                                                                                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`addFeedFor`**](/dev/api/contracts/jbprices/write/addfeed.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _currency</code></li><li><code>uint256 _base</code></li><li><code>[IJBPriceFeed](/dev/api/interfaces/ijbpricefeed.md) _feed</code></li></ul> |
