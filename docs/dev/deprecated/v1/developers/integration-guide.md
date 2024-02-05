# Integration Guide

## Hooking up your contract to a Juicebox project

This guide is for users who would like to hook up their contract to a pre-existing Juicebox project. Right now, the primary use case for this is to route funds to a Juicebox project when certain events occur (e.g., minting an ERC721 token).

Add the Juicebox contract dependency to your project:

```
$ yarn add @jbox/sol
```

Inherit from `JuiceboxProject` in your contract. You will need to provide a `Project ID` and [`Terminal Directory`](/dev/deprecated/v1/terminal-directory.md) address to the `JuiceboxProject` constructor.

```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@jbox/sol/contracts/abstract/JuiceboxProject.sol";

contract HelloWorldContract is JuiceboxProject {
  ...

  constructor(
      uint256 _projectID,
      ITerminalDirectory _terminalDirectory
    ) JuiceboxProject(_projectID, _terminalDirectory) {}

  ...
}
```

### Example Projects

* [TileDAO](https://github.com/TileDAO/tiles/blob/main/contracts/Tiles.sol)
* [WikiToken](https://github.com/odd-amphora/wiki.token/blob/main/packages/hardhat/contracts/Token.sol)
* Add yours here!
