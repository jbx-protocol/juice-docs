---
sidebar_position: 2
title: Subgraph Entities
---

*See [The Graph Docs](https://thegraph.com/docs/en/developing/creating-a-subgraph/#defining-entities) for more on defining entities.*

## Entities

- [`ProtocolLog`](#protocollog)
- [`ProjectCreateEvent`](#projectcreateevent)
- [`Project`](#project)
- [`ENSNode`](#ensnode)
- [`Participant`](#participant)
- [`ProjectEvent`](#projectevent)
- [`PayEvent`](#payevent)
- [`MintTokensEvent`](#minttokensevent)
- [`RedeemEvent`](#redeemevent)
- [`DeployedERC20Event`](#deployederc20event)
- [`ProtocolV1Log`](#protocolv1log)
- [`PrintReservesEvent`](#printreservesevent)
- [`DistributeToPayoutModEvent`](#distributetopayoutmodevent)
- [`TapEvent`](#tapevent)
- [`DistributeToTicketModEvent`](#distributetoticketmodevent)
- [`ProtocolV2Log`](#protocolv2log)
- [`DistributePayoutsEvent`](#distributepayoutsevent)
- [`DistributeToPayoutSplitEvent`](#distributetopayoutsplitevent)
- [`DistributeReservedTokensEvent`](#distributereservedtokensevent)
- [`DistributeToReservedTokenSplitEvent`](#distributetoreservedtokensplitevent)
- [`UseAllowanceEvent`](#useallowanceevent)
- [`DeployETHERC20ProjectPayerEvent`](#deployetherc20projectpayerevent)
- [`ETHERC20ProjectPayer`](#etherc20projectpayer)
- [`VeNftToken`](#venfttoken)

Notes:

- Events used for both Juicebox v1 and Juicebox v2 contracts include a `cv` (contracts version) property, which allows querying events for a specific contracts version.
- `project.id` is string concatenated from multiple properties. `projectId` represents an integer id of the project.
- Familiarize yourself with sample records of the various entities on [GraphLooker](https://graphlooker.com/explore?uri=https%3A%2F%2Fgateway.thegraph.com%2Fapi%2F7ba063459ec88c336425c0847b9368a1%2Fsubgraphs%2Fid%2FFVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC&e=ProtocolLog&efd=protocolLogs).

## ProtocolLog

**Description:** High level overview of the Juicebox Protocol.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field                  | Type                                     | Description                               |
| ---------------------- | ---------------------------------------- | ----------------------------------------- |
| id                     | ID!                                      | Entity ID (currently "1")                 |
| v1                     | ProtocolV1Log @derivedFrom(field: "log") | Sub-entity for v1 logs                    |
| v2                     | ProtocolV2Log @derivedFrom(field: "log") | Sub-entity for v2 logs                    |
| projectsCount          | BigInt!                                  | Total Project Count for Juicebox          |
| volumeRedeemed         | BigInt!                                  | Total Volume Redeemed across all projects |
| paymentsCount          | Int!                                     | Total Payment Count across all projects   |
| redeemCount            | Int!                                     | Total Redeem Count across all projects    |
| erc20Count             | Int!                                     | Total ERC20's deployed from JBX projects  |
| oldestTrendingPayEvent | PayEvent                                 |                                           |

## ProjectCreateEvent

**Description:** Entity detailing info about the creation of a project.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field     | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| id        | ID!      | Contract Version - Project ID - Transaction Hash  |
| project   | Project! | Sub-entity linking to a project                   |
| projectId | Int!     | projectId expressed as integer                    |
| cv        | String!  | Contract Version of the project                   |
| timestamp | Int!     | Unix timestamp for when the project was created   |
| txHash    | Bytes!   | Transaction hash for when the project was created |
| caller    | Bytes!   | The wallet address that created the project       |

## Project

**Description:** Overview of a specific project.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field                                | Type                                                                   | Description                           |
| ------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------- |
| id                                   | ID!                                                                    | Concatenation of CV - projectId       |
| projectId                            | Int!                                                                   | Project id as an Integer              |
| cv                                   | String!                                                                | Contract Version of the project       |
| handle                               | String                                                                 | Project Name                          |
| metadataUri                          | String                                                                 | URI for Project Metadata              |
| metadataDomain                       | BigInt                                                                 |                                       |
| terminal                             | Bytes                                                                  |                                       |
| owner                                | Bytes!                                                                 | Address that owns the project         |
| createdAt                            | Int!                                                                   | Timestamp for when the                |
| totalPaid                            | BigInt!                                                                | Total amount paid to the project      |
| totalRedeemed                        | BigInt!                                                                | Total amount redeemed by the project  |
| currentBalance                       | BigInt!                                                                | Current total balance for the project |
| participants                         | [Participant!]! @derivedFrom(field: "project")                         | Derived field to lead to sub-entity   |
| payEvents                            | [PayEvent!]! @derivedFrom(field: "project")                            | Derived field to lead to sub-entity   |
| mintTokensEvents                     | [MintTokensEvent!]! @derivedFrom(field: "project")                     | Derived field to lead to sub-entity   |
| tapEvents                            | [TapEvent!]! @derivedFrom(field: "project")                            | Derived field to lead to sub-entity   |
| redeemEvents                         | [RedeemEvent!]! @derivedFrom(field: "project")                         | Derived field to lead to sub-entity   |
| printReservesEvents                  | [PrintReservesEvent!]! @derivedFrom(field: "project")                  | Derived field to lead to sub-entity   |
| distributeToPayoutModEvents          | [DistributeToPayoutModEvent!]!@derivedFrom(field: "project")           | Derived field to lead to sub-entity   |
| distributeToTicketModEvents          | [DistributeToTicketModEvent!]!@derivedFrom(field: "project")           | Derived field to lead to sub-entity   |
| deployedERC20s                       | [DeployedERC20Event!]! @derivedFrom(field: "project")                  | Derived field to lead to sub-entity   |
| distributePayoutsEvents              | [DistributePayoutsEvent!]! @derivedFrom(field: "project")              | Derived field to lead to sub-entity   |
| distributeToPayoutSplitEvents        | [DistributeToPayoutSplitEvent!]! @derivedFrom(field: "project")        | Derived field to lead to sub-entity   |
| distributeReservedTokensEvents       | [DistributeReservedTokensEvent!]! @derivedFrom(field: "project")       | Derived field to lead to sub-entity   |
| distributeToReservedTokenSplitEvents | [DistributeToReservedTokenSplitEvent!]! @derivedFrom(field: "project") | Derived field to lead to sub-entity   |
| deployedERC20Events                  | [DeployedERC20Event!]! @derivedFrom(field: "project")                  | Derived field to lead to sub-entity   |
| useAllowanceEvents                   | [UseAllowanceEvent!]! @derivedFrom(field: "project")                   | Derived field to lead to sub-entity   |
| projectEvents                        | [ProjectEvent!]! @derivedFrom(field: "project")                        | Derived field to lead to sub-entity   |
| ethErc20ProjectPayers                | [ETHERC20ProjectPayer!]! @derivedFrom(field: "project")                | Derived field to lead to sub-entity   |

## ENSNode

**Description:**<br/>
**Applicable Versions:** `v2`

| Field     | Type | Description |
| --------- | ---- | ----------- |
| id        | ID!  |             |
| projectId | Int  |             |

## Participant

**Description:** A users participation with a project. This is the M:M link between users:projects.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field             | Type     | Description                                                    |
| ----------------- | -------- | -------------------------------------------------------------- |
| id                | ID!      | Concatenated string of CV - projectId - walletAddress          |
| project           | Project! | Sub entity leading to the project                              |
| projectId         | Int!     | Project id as an Integer                                       |
| cv                | String!  | Contract Version of the project                                |
| wallet            | Bytes!   | Wallet address                                                 |
| totalPaid         | BigInt!  | Total paid to the project                                      |
| lastPaidTimestamp | Int!     | Time stamp for the most recent payment to the project          |
| balance           | BigInt!  | Balance of the ERC20 in the users wallet (staked and unstaked) |
| stakedBalance     | BigInt!  | Balance of the ERC20 staked in juicebox                        |
| unstakedBalance   | BigInt!  | Balance of the ERC20 that is not staked in juicebox            |

## ProjectEvent

**Description:** Events shown in a project's activity feed on [juicebox.money](https://juicebox.money), including payments and distributions.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field                               | Type                                | Description                                                     |
| ----------------------------------- | ----------------------------------- | --------------------------------------------------------------- |
| id                                  | ID!                                 |                                                                 |
| project                             | Project!                            | Sub entity leading to the project                               |
| projectId                           | Int!                                | Project id as an Integer                                        |
| cv                                  | String!                             | Contract Version of the project                                 |
| timestamp                           | Int!                                | timestamp of the event                                          |
| payEvent                            | PayEvent                            | Sub-entity to query "project events"                            |
| mintTokensEvent                     | MintTokensEvent                     | Sub-entity to query "mint tokens events"                        |
| tapEvent                            | TapEvent                            | Sub-entity to query "tap events"                                |
| redeemEvent                         | RedeemEvent                         | Sub-entity to query "redeem events"                             |
| printReservesEvent                  | PrintReservesEvent                  | Sub-entity to query "print reserves events"                     |
| distributeToPayoutModEvent          | DistributeToPayoutModEvent          | Sub-entity to query "distribute to payout mod events"           |
| distributeToTicketModEvent          | DistributeToTicketModEvent          | Sub-entity to query "distribute to ticket mod events"           |
| deployedERC20Event                  | DeployedERC20Event                  | Sub-entity to query "deployed ERC20 events"                     |
| projectCreateEvent                  | ProjectCreateEvent                  | Sub-entity to query "project creation events"                   |
| distributePayoutsEvent              | DistributePayoutsEvent              | Sub-entity to query "distribute payout events"                  |
| distributeReservedTokensEvent       | DistributeReservedTokensEvent       | Sub-entity to query "distribute reserved tokens events"         |
| distributeToReservedTokenSplitEvent | DistributeToReservedTokenSplitEvent | Sub-entity to query "distribute to reserved token split events" |
| distributeToPayoutSplitEvent        | DistributeToPayoutSplitEvent        | Sub-entity to query "distribute to payout split events"         |
| useAllowanceEvent                   | UseAllowanceEvent                   | Sub-entity to query "allowance use events"                      |
| deployETHERC20ProjectPayerEvent     | DeployETHERC20ProjectPayerEvent     | Sub-entity to query "deploy ETH ERC20 project payer events"     |

## PayEvent

**Description:** Pay events across the protocol.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field            | Type     | Description                                          |
| ---------------- | -------- | ---------------------------------------------------- |
| id               | ID!      |                                                      |
| project          | Project! | Sub entity leading to the project                    |
| projectId        | Int!     | Project id as an Integer                             |
| cv               | String!  | Contract Version of the project                      |
| timestamp        | Int!     | Timestamp of the transaction                         |
| txHash           | Bytes!   | Transaction hash                                     |
| caller           | Bytes!   | The wallet address that paid the project             |
| beneficiary      | Bytes!   | Recipient of the funds from the pay event            |
| amount           | BigInt!  | Amount of the pay event                              |
| note             | String!  | Note for the pay event                               |
| feeFromV2Project | Int      | Indicates payment is a fee from project with this ID |

## MintTokensEvent

**Description:** Token minting events across the protocol.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field       | Type     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| id          | ID!      |                                            |
| project     | Project! | Sub entity leading to the project          |
| projectId   | Int!     | Project id as an Integer                   |
| cv          | String!  | Contract Version of the project            |
| timestamp   | Int!     | Timestamp of the transaction               |
| txHash      | Bytes!   | Transaction hash                           |
| beneficiary | Bytes!   | Recipient of the funds from the mint event |
| amount      | BigInt!  | Amount of the mint event                   |
| memo        | String!  | Note for the mint event                    |
| caller      | Bytes!   | The wallet address that minted tokens      |

## RedeemEvent

**Description:** Overflow redemption events across the protocol.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field        | Type     | Description                                      |
| ------------ | -------- | ------------------------------------------------ |
| id           | ID!      |                                                  |
| project      | Project! | Sub entity leading to the project                |
| projectId    | Int!     | Project id as an Integer                         |
| cv           | String!  | Contract Version of the project                  |
| timestamp    | Int!     | Timestamp of the transaction                     |
| txHash       | Bytes!   | Transaction hash                                 |
| holder       | Bytes!   |                                                  |
| beneficiary  | Bytes!   | Recipient of the funds from the redeem event     |
| amount       | BigInt!  | Amount of the redeem event                       |
| returnAmount | BigInt!  | Note for the redeem event                        |
| caller       | Bytes!   | The wallet address that initiated the redemption |

## DeployedERC20Event

**Description:** View deployments of new [`JBToken`](/dev/api/contracts/jbtoken/)s.<br/>
**Applicable Versions:** `v1.0`, `v1.1`, `v2`

| Field     | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| id        | ID!      |                                   |
| project   | Project! | Sub entity leading to the project |
| projectId | Int!     | Project id as an Integer          |
| cv        | String!  | Contract Version of the project   |
| timestamp | Int!     | Timestamp of the transaction      |
| txHash    | Bytes!   | Transaction hash                  |
| symbol    | String!  | symbol of the ERC20               |
| address   | Bytes    | will be empty for v1.x events     |

## ProtocolV1Log

**Description:** High level view of Juicebox v1.<br/>
**Applicable Versions:** `v1.0`, `v1.1`

| Field          | Type         | Description                                  |
| -------------- | ------------ | -------------------------------------------- |
| id             | ID!          |                                              |
| log            | ProtocolLog! |                                              |
| projectsCount  | Int!         | Total V1.X projects                          |
| volumePaid     | BigInt!      | Total volume paid to V1.X projects           |
| volumeRedeemed | BigInt!      | Total volume redeemed to V1.X projects       |
| paymentsCount  | Int!         | Total number of payments to V1.X projects    |
| redeemCount    | Int!         | Total number of redemptions to V1.X projects |
| erc20Count     | Int!         | Total ERC20 deployed by V1.X projects        |

## PrintReservesEvent

**Description:**<br/>
**Applicable Versions:** `v1.0`, `v1.1`

| Field                   | Type                                                                    | Description                                 |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| id                      | ID!                                                                     |                                             |
| project                 | Project!                                                                | Sub entity leading to the project           |
| projectId               | Int!                                                                    | Project id as an Integer                    |
| timestamp               | Int!                                                                    | Timestamp of the transaction                |
| txHash                  | Bytes!                                                                  | Transaction hash                            |
| fundingCycleId          | BigInt!                                                                 |                                             |
| beneficiary             | Bytes!                                                                  |                                             |
| count                   | BigInt!                                                                 |                                             |
| beneficiaryTicketAmount | BigInt!                                                                 |                                             |
| caller                  | Bytes!                                                                  | The wallet address that initiated the event |
| distributions           | [DistributeToTicketModEvent!]!@derivedFrom(field: "printReservesEvent") |                                             |

## DistributeToPayoutModEvent

**Description:**<br/>
**Applicable Versions:** `v1.0`, `v1.1`

| Field             | Type      | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| id                | ID!       |                                                    |
| project           | Project!  | Sub entity leading to the project                  |
| projectId         | Int!      | Project id as an Integer                           |
| timestamp         | Int!      | Timestamp of the transaction                       |
| txHash            | Bytes!    | Transaction hash                                   |
| fundingCycleId    | BigInt!   |                                                    |
| modProjectId      | Int!      |                                                    |
| modAllocator      | Bytes!    |                                                    |
| modBeneficiary    | Bytes!    |                                                    |
| modPreferUnstaked | Boolean!  |                                                    |
| modCut            | BigInt!   |                                                    |
| caller            | Bytes!    | The wallet address that initiated the distribution |
| tapEvent          | TapEvent! | Sub-entity leading to tap events                   |

## TapEvent

**Description:**<br/>
**Applicable Versions:** `v1.0`, `v1.1`

| Field                     | Type                                                           | Description                                    |
| ------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| id                        | ID!                                                            |                                                |
| project                   | Project!                                                       | Sub entity leading to the project              |
| projectId                 | Int!                                                           | Project id as an Integer                       |
| timestamp                 | Int!                                                           | Timestamp of the transaction                   |
| txHash                    | Bytes!                                                         | Transaction hash                               |
| fundingCycleId            | BigInt!                                                        |                                                |
| beneficiary               | Bytes!                                                         | Recipient of the tap event                     |
| amount                    | BigInt!                                                        | Amount of the tap event                        |
| currency                  | BigInt!                                                        | Currency address of the token in the tap event |
| netTransferAmount         | BigInt!                                                        | Net amount transfered in all tap events        |
| beneficiaryTransferAmount | BigInt!                                                        | Amount sent to the beneficiary                 |
| govFeeAmount              | BigInt!                                                        | Tax amount on the tap event                    |
| caller                    | Bytes!                                                         | The wallet address that initiated the tap      |
| distributions             | [DistributeToPayoutModEvent!]! @derivedFrom(field: "tapEvent") |                                                |

## DistributeToTicketModEvent

**Description:**<br/>
**Applicable Versions:** `v1.0`, `v1.1`

| Field              | Type                | Description                                        |
| ------------------ | ------------------- | -------------------------------------------------- |
| id                 | ID!                 |                                                    |
| project            | Project!            | Sub entity leading to the project                  |
| projectId          | Int!                | Project id as an Integer                           |
| timestamp          | Int!                | Timestamp of the transaction                       |
| txHash             | Bytes!              | Transaction hash                                   |
| fundingCycleId     | BigInt!             |                                                    |
| modBeneficiary     | Bytes!              |                                                    |
| modPreferUnstaked  | Boolean!            |                                                    |
| modCut             | BigInt!             |                                                    |
| caller             | Bytes!              | The wallet address that initiated the distribution |
| printReservesEvent | PrintReservesEvent! | Sub-entity leading to the print reserve events     |

## ProtocolV2Log

**Description:** High level view of Juicebox v2.<br/>
**Applicable Versions:** `v2`

| Field          | Type         | Description                                |
| -------------- | ------------ | ------------------------------------------ |
| id             | ID!          |                                            |
| log            | ProtocolLog! |                                            |
| projectsCount  | Int!         |                                            |
| volumePaid     | BigInt!      | Total volume paid to V2 projects           |
| volumeRedeemed | BigInt!      | Total volume redeemed to V2 projects       |
| paymentsCount  | Int!         | Total number of payments to V2 projects    |
| redeemCount    | Int!         | Total number of redemptions to V2 projects |
| erc20Count     | Int!         | Total ERC20's deployed by V2 projects      |

## DistributePayoutsEvent

**Description:** View of payout distributions. See [`JBSingleTokenPaymentTerminalStore.distributePayoutsOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/).<br/>
**Applicable Versions:** `v2`

| Field                         | Type                                                                          | Description                                        |
| ----------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| id                            | ID!                                                                           |                                                    |
| project                       | Project!                                                                      | Sub entity leading to the project                  |
| projectId                     | Int!                                                                          | Project id as an Integer                           |
| timestamp                     | Int!                                                                          | Timestamp of the transaction                       |
| txHash                        | Bytes!                                                                        | Transaction hash                                   |
| fundingCycleConfiguration     | BigInt!                                                                       |                                                    |
| fundingCycleNumber            | Int!                                                                          |                                                    |
| beneficiary                   | Bytes!                                                                        | Beneficiary of the distribution                    |
| amount                        | BigInt!                                                                       | Amount of the distribution event                   |
| distributedAmount             | BigInt!                                                                       | Total amount distributed as of this event          |
| fee                           | BigInt!                                                                       | Fee on this distribution                           |
| beneficiaryDistributionAmount | BigInt!                                                                       | Net amount sent to the beneficiary                 |
| memo                          | String!                                                                       | Note on the disribution                            |
| caller                        | Bytes!                                                                        | The wallet address that initiated the distribution |
| splitDistributions            | [DistributeToPayoutSplitEvent!]!@derivedFrom(field: "distributePayoutsEvent") | Sub-entity leading to split distributions          |

## DistributeToPayoutSplitEvent

**Description:**<br/>
**Applicable Versions:** `v2`

| Field                  | Type                    | Description                                              |
| ---------------------- | ----------------------- | -------------------------------------------------------- |
| id:                    | ID!                     |                                                          |
| project                | Project!                | Sub entity leading to the project                        |
| projectId              | Int!                    | Project id as an Integer                                 |
| timestamp              | Int!                    | Timestamp of the transaction                             |
| txHash                 | Bytes!                  | Transaction hash                                         |
| domain                 | BigInt!                 |                                                          |
| group                  | BigInt!                 |                                                          |
| amount                 | BigInt!                 |                                                          |
| caller                 | Bytes!                  | The wallet address that initiated the distribution split |
| distributePayoutsEvent | DistributePayoutsEvent! |                                                          |
| preferClaimed          | Boolean!                |                                                          |
| preferAddToBalance     | Boolean!                |                                                          |
| percent                | Int!                    |                                                          |
| splitProjectId         | Int!                    |                                                          |
| beneficiary            | Bytes!                  |                                                          |
| lockedUntil            | Int!                    |                                                          |
| allocator              | Bytes!                  |                                                          |

## DistributeReservedTokensEvent

**Description:** View of reserved token distributions. See [`JBController.distributeReservedTokensOf`](/dev/api/contracts/or-controllers/jbcontroller/write/distributereservedtokensof/).<br/>
**Applicable Versions:** `v2`

| Field                 | Type                                                                                      | Description                                                |
| --------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| id                    | ID!                                                                                       |                                                            |
| project               | Project!                                                                                  | Sub entity leading to the project                          |
| projectId             | Int!                                                                                      | Project id as an Integer                                   |
| timestamp             | Int!                                                                                      | Timestamp of the transaction                               |
| txHash                | Bytes!                                                                                    | Transaction hash                                           |
| fundingCycleNumber    | Int!                                                                                      |                                                            |
| beneficiary           | Bytes!                                                                                    |                                                            |
| tokenCount            | BigInt!                                                                                   |                                                            |
| beneficiaryTokenCount | BigInt!                                                                                   |                                                            |
| memo                  | String!                                                                                   |                                                            |
| caller                | Bytes!                                                                                    | The wallet address that initiated the reserve distribution |
| splitDistributions    | [DistributeToReservedTokenSplitEvent!]!@derivedFrom(field"distributeReservedTokensEvent") |                                                            |

## DistributeToReservedTokenSplitEvent

**Description:**<br/>
**Applicable Versions:** `v2`

| Field                         | Type                           | Description                       |
| ----------------------------- | ------------------------------ | --------------------------------- |
| id                            | ID!                            |                                   |
| project                       | Project!                       | Sub entity leading to the project |
| projectId                     | Int!                           | Project id as an Integer          |
| timestamp                     | Int!                           | Timestamp of the transaction      |
| txHash                        | Bytes!                         | Transaction hash                  |
| tokenCount                    | BigInt!                        |                                   |
| caller                        | Bytes!                         |                                   |
| distributeReservedTokensEvent | DistributeReservedTokensEvent! |                                   |
| preferClaimed:                | Boolean!                       | Split struct properties           |
| percent                       | Int!                           | Split struct properties           |
| splitProjectId                | Int!                           | Split struct properties           |
| beneficiary                   | Bytes!                         | Split struct properties           |
| lockedUntil                   | Int!                           | Split struct properties           |
| allocator                     | Bytes!                         | Split struct properties           |

## UseAllowanceEvent

**Description:** View overflow allowance use. See [`JBController.overflowAllowanceOf`](/dev/api/contracts/or-controllers/jbcontroller/read/overflowallowanceof/).<br/>
**Applicable Versions:** `v2`

| Field                     | Type     | Description                                     |
| ------------------------- | -------- | ----------------------------------------------- |
| id                        | ID!      |                                                 |
| project                   | Project! | Sub entity leading to the project               |
| projectId                 | Int!     | Project id as an Integer                        |
| timestamp                 | Int!     | Timestamp of the transaction                    |
| txHash                    | Bytes!   | Transaction hash                                |
| fundingCycleConfiguration | BigInt!  |                                                 |
| fundingCycleNumber        | Int!     |                                                 |
| beneficiary               | Bytes!   | Beneficiary of the allowance                    |
| amount                    | BigInt!  | Amountof the allowance                          |
| distributedAmount         | BigInt!  |                                                 |
| netDistributedamount      | BigInt!  | Total amount distributed by the project         |
| memo                      | String!  | Note for the distribution                       |
| caller                    | Bytes!   | The wallet address that initiated the allowance |

## DeployETHERC20ProjectPayerEvent

**Description:** View new deployments of `ETHERC20ProjectPayer`s. See [`JBETHERC20ProjectPayerDeployer`](/dev/api/contracts/or-utilities/jbetherc20projectpayerdeployer/).<br/>
**Applicable Versions:** `v2`

| Field               | Type     | Description                                |
| ------------------- | -------- | ------------------------------------------ |
| id                  | ID!      |                                            |
| project             | Project! | Sub entity leading to the project          |
| projectId           | Int!     | Project id as an Integer                   |
| timestamp           | Int!     | Timestamp of the transaction               |
| txHash              | Bytes!   | Transaction hash                           |
| address             | Bytes!   |                                            |
| beneficiary         | Bytes!   |                                            |
| preferClaimedTokens | Boolean! |                                            |
| preferAddToBalance  | Boolean! |                                            |
| directory           | Bytes!   |                                            |
| owner               | Bytes!   |                                            |
| memo                | String   |                                            |
| metadata            | Bytes    |                                            |
| caller              | Bytes!   | The wallet address that deployed the ERC20 |

## ETHERC20ProjectPayer

**Description:** View [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/) events.<br/>
**Applicable Versions:** `v2`

| Field               | Type     | Description                       |
| ------------------- | -------- | --------------------------------- |
| id:                 | ID!      |                                   |
| project             | Project! | Sub entity leading to the project |
| projectId           | Int!     | Project id as an Integer          |
| address             | Bytes!   |                                   |
| beneficiary         | Bytes!   |                                   |
| preferClaimedTokens | Boolean! |                                   |
| preferAddToBalance  | Boolean! |                                   |
| directory           | Bytes!   |                                   |
| owner               | Bytes!   |                                   |
| memo                | String   |                                   |
| metadata            | Bytes    |                                   |

## VeNftToken

**Description:**<br/>
**Applicable Versions:** `v2`

| Field                    | Type         | Description                               |
| ------------------------ | ------------ | ----------------------------------------- |
| id                       | ID!          |                                           |
| tokenId                  | Int!         | Token identifier                          |
| tokenUri                 | String!      | Token URI                                 |
| createdAt                | Int!         | timestamp for when the token was created  |
| redeemedAt               | Int          | timestamp for when the token was redeemed |
| owner                    | Bytes!       | owner of the NFT                          |
| participant              | Participant! |                                           |
| lockAmount               | BigInt!      |                                           |
| lockEnd                  | Int!         |                                           |
| lockDuration             | Int!         |                                           |
| lockUseJbToken           | Boolean!     |                                           |
| lockAllowPublicExtension | Boolean!     |                                           |
| unlockedAt               | Int!         |                                           |
