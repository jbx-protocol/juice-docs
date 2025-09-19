---
sidebar_position: 1
---

# Querying

For general subgraph querying advice, see [*Querying The Graph*](https://thegraph.com/docs/querying/querying-the-graph/) and [*GraphQL API*](https://thegraph.com/docs/querying/graphql-api/) in The Graph's docs.

## Project ID & Version

If you look at the `projects` schema, you may notice that there are three similar fields: `id`, `pv`, and `projectId`. You can see these in practice by running the [following query](https://api.studio.thegraph.com/proxy/30654/mainnet-dev/6.2.0/graphql?query=%7B%0A++projects%7B%0A++++id%0A++++pv%0A++++projectId%0A++%7D%0A%7D):

```graphql
{
  projects{
    id
    pv
    projectId
  }
}
```

The JSON results will look something like this:

```json
{
  "data": {
    "projects": [
      {
        "id": "1-1",
        "pv": "1",
        "projectId": 1
      },
      {
        "id": "1-10",
        "pv": "1",
        "projectId": 10
      },
...
```

1. `pv` is the project version. All v1 projects (using the [`Projects`](https://etherscan.io/address/0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418) contract) have a `pv` of `1`.
2. `projectId` is the project ID within a given version of the protocol. These are sequentially assigned to new projects, starting from 0, and are also the token ID of the [Project NFT](/docs/dev/v3/build/project-nft.md).
3. `id` is an ID used within the Subgraph. It is the pv and projectId combined, with a dash in between the two.

To illustrate this, these two queries will return the same result:

```graphql
{
  projects(where: {id: "2-35"}){
    ...
  }
}
```

```graphql
{
  projects(where:{pv:"2", projectId:35}){
    ...
  }
}
```

## Pagination

By default, a query will only return the first 100 results:

```graphql
{
  projects(where:{id: "2-1"}){
    # Participants are wallets which have held a project's token at any point in time
    # Only 100 participants will be returned
    participants(orderBy: totalPaid, orderDirection: desc){
      totalPaid
      balance
    }
  }
}
```

This can be increased to 1,000 results with `first`:

```graphql
# Now, 1,000 participants will be returned
participants(first: 1000, orderBy: totalPaid, orderDirection: desc){
```

After the first 1,000 results, you will have to paginate by using `skip`:

```graphql
# The next 1,000 participants will be returned
participants(first: 1000, skip: 1000, orderBy: totalPaid, orderDirection: desc){
```

## JavaScript Example

The snippet below will log a list of the 10 most recent payments to v2 project #1 ([@juicebox](https://juicebox.money/@juicebox)):

```js
const juicebox_subgraph_endpoint = "https://api.studio.thegraph.com/query/30654/mainnet-dev/6.2.0"

// Queries can be a GraphQL template literal
const query = `{
  payEvents(first: 10, where: {project: "2-1"}, orderBy: timestamp, orderDirection: desc){
    beneficiary
    amount
    amountUSD
  }
}`

const json = await fetch(juicebox_subgraph_endpoint, {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({ query }),
}).then(res => res.json())

// amount and amountUSD both have 18 decimals
for(const {beneficiary, amount, amountUSD} of json.data.payEvents)
  console.log(`${amount / 1e18} ETH paid worth ${amountUSD / 1e18} USD with beneficiary ${beneficiary}.`)
```

For more complex applications, you may want to use [Apollo](https://www.apollographql.com/) or another GraphQL client library.
