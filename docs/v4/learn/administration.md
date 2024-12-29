---
sidebar_position: 3
---
# Administration

The protocol has very minimal global governance - ensuring that each project owns and is responsible for its own funds and destiny. The following are the only global functions that can be accessed by a privileged administrating address, initially the [JuiceboxDAO multisig](https://gnosis-safe.io/app/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/home), a 9 of 14 multisig voted in by JBX members:

* **[`JBProjects.setTokenUriResolver(...)`](/docs/v4/api/core/contracts/JBProjects.md#settokenuriresolver)**<br/>
  Allows the owner of the [`JBProjects`](/docs/v4/api/core/contracts/JBProjects.md) contract to provide and change the [`IJBTokenUriResolver`](/docs/v4/api/core/interfaces/IJBTokenUriResolver.md) used to resolve metadata for project NFTs in its [`tokenURI(...)`](/docs/v4/api/core/contracts/JBProjects.md#tokenuri) function.
  <br/>
* **[`JBPrices.addPriceFeedFor(...)`](/docs/v4/api/core/contracts/JBPrices.md#addfeed.md)**<br/>
  Allows the owner of the [`JBPrices`](/docs/v4/api/core/contracts/JBPrices.md) contract to add new price feeds used to convert amounts denoted in one currency to another. Once added, a default price feed cannot be removed. A project owner can set and use custom price feeds, but cannot override default price feeds.
  <br/>
* **[`JBDirectory.setIsAllowedToSetFirstController(...)`](/docs/v4/api/core/contracts/JBDirectory.md#setisallowedtosetfirstcontroller)**<br/>
  Allows the owner of the [`JBDirectory`](/docs/v4/api/core/contracts/JBDirectory.md) contract to add/remove addresses that can set a project's first controller on its behalf. Allowed contracts simplify project deployments by removing the need for the project's owner to send a second transaction to set the controller in the directory.
  <br/>
* **[`JBFeelessAddresses.setFeelessAddress(...)`](/docs/v4/api/core/contracts/JBFeelessAddresses.md#setfeelessaddress)**<br/>
  Allows the owner of the [`JBFeelessAddresses`](/docs/v4/api/core/contracts/JBFeelessAddresses.md) contract to add/remove addresses that can receive funds from projects without incurring fees typically taken any time funds leave the ecosystem. 

Ownership for each contract is managed independently and can be transferred to a new owner by the current owner.
