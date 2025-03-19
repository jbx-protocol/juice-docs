---
sidebar_position: 4
---

# Subgraph

The Juicebox subgraphs index events from the Juicebox contracts, and provide data to apps like [Crypto Fundraising & DAO Management](https://juicebox.money) and [Revnets](https://app.revnet.eth.sucks).  

There are two subgraph versions: one for legacy contracts versions 1-3, and another for the current v4 contracts. Both maintain extensive, up-to-date data reflecting nearly every aspect of the contracts, including Projects (or Revents) and their balances/configurations, activity events like Payments and Redemptions, token holders, token balances and transfers, and much more.  

Both subgraphs are developed primarily by Peri (peri.eth, [@peri](https://twitter.com/peri)), and hosted by [Alchemy Subgraphs - By Satsuma](https://subgraph.satsuma-prod.com).  

---

## Querying the subgraph  

**URLs:**  
Query URLs use this format:  
```
https://subgraph.satsuma-prod.com/<api-key>/juicebox/<name>/api
```  

If you don’t have your own Alchemy subgraphs API key, you can use the free dev key `bc505571c408`, which is restricted by a monthly query limit.  

**For current (v4) contracts, Subgraph names follow their network name:**  
- ethereum  
- sepolia  
- base  
- base-sepolia  
- arbitrum  
- arbitrum-sepolia  
- optimism  
- optimism-sepolia  

> **Note:** data from v1-v3 contracts are NOT available in the current (v4) subgraphs.  

**For previous contracts (v1-v3), network names are suffixed with `-v3`. Only Ethereum networks are available:**  
- ethereum-v3  
- sepolia-v3  

---

## Query structure  

Juicebox subgraphs accept standard graphql queries. More info [here](https://graphql.org/learn/).  

You can use Alchemy’s Playground to make sample queries to a specific subgraph, and explore the schema for queryable entities:  
```
https://subgraph.satsuma-prod.com/juicebox/<network>/playground
```  

Schemas for each subgraph can also be found on Github.  

---

## Github  

- **Current v4:** [peripheralist/nana-subgraph: 🧃 Juicebox Subgraph implementation.](https://github.com/peripheralist/nana-subgraph)  
- **Previous versions 1-3:** [jbx-protocol/juice-subgraph: 🧃 Juicebox Subgraph implementation.](https://github.com/jbx-protocol/juice-subgraph)  

See the Readme in each repo for more information on development/contributing.

