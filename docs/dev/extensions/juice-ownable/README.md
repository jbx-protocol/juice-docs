# Juice Ownable

:::info
This is the README from the [`juice-ownable`](https://github.com/jbx-protocol/juice-ownable.git) repository.
:::

A Juicebox variation upon [OpenZeppelin Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) to allow for more seamless Ownable support for projects, changes from the regular Ownable are:
- Ability to transfer ownership to a JB Project instead of a harcoded address
- Ability to grant users/contracts permission to call OnlyOwner methods using `JBOperatorStore`
- Includes the `JBOperatable` modifiers with support for [OpenZeppelin `Context`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Context.sol) to allow for (optional) meta-transaction support

All features are backwards compatible with OpenZeppelin Ownable, this should be a drop-in replacement.

## Contracts

This repo contains 2 contracts, which one should you use:

### JBOwnable

Does your contract not have any Ownable/access controls yet, use JBOwnable.

### JBOwnableOverride

Does your contract extend a contract that you can't easily modify (ex. it comes from a package manager) and that contract inherits from OpenZeppelin Ownable? Use JBOwnableOverride.

__NOTICE: Only use JBOwnableOverride if you are overriding OpenZeppelin Ownable v4.7.0 or higher, otherwise JBOperatorStore functionality for `onlyOwner` will not work.__
