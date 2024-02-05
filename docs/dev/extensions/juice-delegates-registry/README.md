# Delegate Registry

:::info
This is the README from the `juice-delegates-registry` [GitHub Repository](https://github.com/jbx-protocol/juice-delegates-registry).
:::

## Summary

Provide an easy to access function linking Juicebox protocol pay and redemption delegate with their respective deployer address.
This registry use create and create2 to, based on a deployer address and a nonce, generate a deterministic address for a delegate.
This address is then used as a key to store the deployer address (after sanity check).

## Design

### Flow

After deploying a delegate, any addresses can call `registry.addDelegate(address deployer, uint256 nonce)` to add it. The registry will compute the corresponding delegate address, check if it is a valid delegate and add it. Alternatively, addDelegateCreate2(address _deployer, bytes32 _salt, bytes calldata _bytecode) can be used to add delegate deployed from a contract, using create2.

The frontend might retrieve the correct nonce, for both contract and eoa, using  ethers `provider.getTransactionCount(address)` or web3js `web3.eth.getTransactionCount` just *before* the delegate deployment (if adding a delegate at a later time, manual nonce counting might be needed).

Create2 salt is based on the delegate deployer own internal logic while the deployment bytecode can be retrieved in the deployment transaction (off-chain) or via `abi.encodePacked(type(delegateContract).creationCode, abi.encode(constructorArguments))` (on-chain)

### Contracts/interface

- JBDelegatesRegistry: the registry
- IJBDelegatesRegistry; the registry interface

## Usage

Anyone can deploy this registry using the provided forge script.

To run this repo, you'll need [Foundry](https://book.getfoundry.sh/) and [NodeJS](https://nodejs.dev/en/learn/how-to-install-nodejs/) installed.

Install the dependencies with `npm install && git submodule update --init --force --recursive`, you should then be able
to run the tests using `forge test` or deploy a new registry using `forge script Deploy` (and the correct arguments, based on the chain and key you want to use - see the [Foundry docs](https://book.getfoundry.sh/)).

## Use-case

This registry allows frontend to easily and trustlessly query the deployer behind a given delegate. This might then used to assume a delegate as "safe" or not, based on front-end opinion.

## Risks & trade-off

A nasty delegate has a mint privilege access. It is therefore a key responsability to front-end providing informations to project owners and users on unintended/potentially adversarial behaviour, especially for unknow delegates.
