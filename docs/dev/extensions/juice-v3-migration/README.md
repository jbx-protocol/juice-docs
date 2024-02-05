# V3 Migration

:::info
This is the README from the `juice-v3-migration` [GitHub Repository](https://github.com/jbx-protocol/juice-v3-migration).
:::

## Motivation

Since the v3 contract went live recently so in order for existing projects to migrate their treasuries & project tokens to V3 we have come up with some migration tools in the form of smart contracts that'll help to make this process efficient & seamless for the users

## Mechanic

First up we have the allocators by which v1 & v2 project owners can migrate their treasuries to v3, so we basically use a couple of custom allocator implementations for both v1 & v2, so inside `allocate` we fetch the `primary terminal` and add to its balance with `addToBalanceOf`.

Next up we have the project token deployer for v1 & v2 project token holders to migrate to v3, so to start things project owners can deploy a `v3 token` for their project by calling `deploy` on the v3 token deployer which will also call `setFor` to attach the token to the project.

After the token is deployed token holders can call `migrate` to send their v1/v2 claimed & unclaimed token balances & get the appropriate v3 tokens minted to them.

Another interesting thing is since the migration logic lies in the v3 token contract in order to make sure that v3 redemptions are smooth we calculate the `totalSupply` by `total supply of v3 tokens + (v1 total supply - v1 token balance in v3 contract i.e the balances that have been already migrated) + (v2 total supply - v2 token balance in v3 contract i.e the balances that have been already migrated)`

## Architecture

An understanding of how the Juicebox protocol's distributions with allocations & project token economics is an important prereq to understand the migration process.

For migration of the treasuries `V1Allocator` & `V2Allocator` contracts need to be deployed & then attached as an `allocator` to the respective v1 & v2 projects.

For migration of the project tokens `JBV3TokenDeployer` will be deployed and then v3 project owners can deploy their tokens, so that the token holders can call `migrate` on `JBV3Token`

## Deploy

The deployment process is pretty straightforward with deployer scripts for the `V1Allocator`, `V2Allocator` &  `JBV3TokenDeployer`
in the `scripts` folder.


# Install

Quick all-in-one command:

```bash
git clone https://github.com/jbx-protocol/juice-v3-migration && cd juice-v3-migration && foundryup && git submodule update --init --recursive --force && yarn install && forge test --gas-report
```

To get set up:

1. Install [Foundry](https://github.com/gakonst/foundry).

```bash
curl -L https://foundry.paradigm.xyz | sh
```

2. Install external lib(s)

```bash
git submodule update --init --recursive --force && yarn install
```

then run

```bash
forge update
```

3. Run tests:

```bash
forge test
```

4. Update Foundry periodically:

```bash
foundryup
```

#### Setup

Configure the .env variables, and add a mnemonic.txt file with the mnemonic of the deployer wallet. The sender address in the .env must correspond to the mnemonic account.

## Goerli

```bash
yarn deploy-goerli-v2-allocator
```

## Mainnet

```bash
yarn deploy-mainnet-v3-token-deployer
yarn deploy-mainnet-v2-allocator
yarn deploy-mainnet-v1-allocator
```

The deployments are stored in ./broadcast

See the [Foundry Book for available options](https://book.getfoundry.sh/reference/forge/forge-create.html).
