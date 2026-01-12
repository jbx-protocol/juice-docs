---
sidebar_position: 5
---

# Bendystraw (Data API)

Bendystraw is a GraphQL API for querying Juicebox protocol data across all supported chains. Built on [Ponder](https://ponder.sh), it indexes on-chain events and provides real-time access to projects, payments, token holders, NFTs, loans, and more.

:::tip Quick Start
**Most developers need these:**
- [Endpoints](#endpoints) - API URLs for mainnet and testnet
- [Common Queries](#common-queries) - Copy-paste GraphQL examples
- [SDK Integration](#sdk-integration) - React hooks for data fetching
- [Playground](https://bendystraw.xyz/schema) - Interactive query builder
:::

## Endpoints

| Environment | Base URL | Chains | Status |
|-------------|----------|--------|--------|
| **Mainnet** | `bendystraw.xyz` | Ethereum, Arbitrum, Base, Optimism | [Playground](https://bendystraw.xyz/schema) |
| **Testnet** | `testnet.bendystraw.xyz` | Sepolia, Arbitrum Sepolia, Base Sepolia, Optimism Sepolia | [Playground](https://testnet.bendystraw.xyz/schema) |

### Authentication

Contact [@peripheralist](https://x.com/peripheralist) for an API key.

**Important:** API keys should not be exposed in client-side code. Use a server-side proxy for frontend applications.

### Making Requests

**GraphQL endpoint:**
```
POST https://<base-url>/<api-key>/graphql
```

**Schema (no auth required):**
```
GET https://bendystraw.xyz/schema
```

---

## Available Data

### Core Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| `project` | Project configuration and stats | `projectId`, `chainId`, `name`, `balance`, `volume`, `tokenSupply` |
| `participant` | Token holder balances | `address`, `projectId`, `balance`, `volume`, `paymentsCount` |
| `suckerGroup` | Cross-chain linked projects | `id`, `projects`, `balance`, `tokenSupply`, `contributorsCount` |
| `wallet` | Global wallet stats | `address`, `volume`, `volumeUsd` |

### Events

| Entity | Description | Key Fields |
|--------|-------------|------------|
| `payEvent` | Payments to projects | `amount`, `beneficiary`, `memo`, `newlyIssuedTokenCount` |
| `cashOutTokensEvent` | Token redemptions | `cashOutCount`, `reclaimAmount`, `holder` |
| `mintTokensEvent` | Token mints (all) | `tokenCount`, `beneficiary`, `reservedPercent` |
| `mintNftEvent` | NFT tier mints | `tierId`, `tokenId`, `totalAmountPaid` |
| `activityEvent` | Unified event timeline | `type`, `timestamp`, `projectId` |

### NFTs

| Entity | Description | Key Fields |
|--------|-------------|------------|
| `nft` | Individual NFTs | `tokenId`, `owner`, `tierId`, `tokenUri`, `metadata` |
| `nftTier` | NFT tier configuration | `tierId`, `price`, `initialSupply`, `remainingSupply` |
| `nftHook` | NFT hook contracts | `address`, `name`, `symbol` |

### Loans (Revnet)

| Entity | Description | Key Fields |
|--------|-------------|------------|
| `loan` | Active loans | `id`, `borrowAmount`, `collateral`, `owner` |
| `borrowLoanEvent` | Loan creation | `borrowAmount`, `collateral`, `beneficiary` |
| `repayLoanEvent` | Loan repayment | `repayBorrowAmount`, `collateralCountToReturn` |
| `liquidateLoanEvent` | Loan liquidation | `borrowAmount`, `collateral` |

---

## Common Queries

### Get Project Details

```graphql
query GetProject($projectId: Int!, $chainId: Int!) {
  project(projectId: $projectId, chainId: $chainId, version: 5) {
    projectId
    chainId
    name
    description
    logoUri
    balance
    volume
    volumeUsd
    tokenSupply
    paymentsCount
    contributorsCount
    tokenSymbol
    owner
    suckerGroupId
    isRevnet
  }
}
```

### List Projects

```graphql
query ListProjects($chainId: Int!) {
  projects(
    where: { chainId: $chainId, version: 5 }
    orderBy: "createdAt"
    orderDirection: "desc"
    limit: 20
  ) {
    items {
      projectId
      chainId
      name
      logoUri
      balance
      volume
      tokenSymbol
    }
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Get Project Activity

```graphql
query GetActivity($projectId: Int!, $chainId: Int!) {
  activityEvents(
    where: { projectId: $projectId, chainId: $chainId, version: 5 }
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 50
  ) {
    items {
      id
      type
      timestamp
      txHash
      from

      # Include specific event data
      payEvent {
        amount
        amountUsd
        beneficiary
        memo
        newlyIssuedTokenCount
      }
      cashOutTokensEvent {
        cashOutCount
        reclaimAmount
        holder
      }
      mintNftEvent {
        tierId
        tokenId
        totalAmountPaid
      }
    }
    totalCount
  }
}
```

### Get Token Holders

```graphql
query GetParticipants($projectId: Int!, $chainId: Int!) {
  participants(
    where: { projectId: $projectId, chainId: $chainId, version: 5 }
    orderBy: "balance"
    orderDirection: "desc"
    limit: 100
  ) {
    items {
      address
      balance
      creditBalance
      erc20Balance
      volume
      volumeUsd
      paymentsCount
      lastPaidTimestamp
    }
    totalCount
  }
}
```

### Get Cross-Chain (Omnichain) Data

For projects deployed across multiple chains via suckers:

```graphql
query GetSuckerGroup($suckerGroupId: String!) {
  suckerGroup(id: $suckerGroupId) {
    id
    projects
    balance
    tokenSupply
    volume
    volumeUsd
    contributorsCount
    paymentsCount
  }
}

# Get all activity across chains
query GetOmnichainActivity($suckerGroupId: String!) {
  activityEvents(
    where: { suckerGroupId: $suckerGroupId, version: 5 }
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 50
  ) {
    items {
      chainId
      type
      timestamp
      payEvent {
        amount
        beneficiary
      }
    }
  }
}
```

### Get NFT Tiers

```graphql
query GetNftTiers($projectId: Int!, $chainId: Int!) {
  nftTiers(
    where: { projectId: $projectId, chainId: $chainId, version: 5 }
    orderBy: "tierId"
    orderDirection: "asc"
  ) {
    items {
      tierId
      price
      initialSupply
      remainingSupply
      resolvedUri
      metadata
      category
    }
  }
}
```

### Get User's NFTs

```graphql
query GetUserNfts($owner: String!, $projectId: Int!, $chainId: Int!) {
  nfts(
    where: { owner: $owner, projectId: $projectId, chainId: $chainId, version: 5 }
  ) {
    items {
      tokenId
      tierId
      tokenUri
      metadata
      createdAt
      tier {
        price
        resolvedUri
      }
    }
  }
}
```

### Get Loans (Revnet)

```graphql
query GetLoans($projectId: Int!, $chainId: Int!) {
  loans(
    where: { projectId: $projectId, chainId: $chainId, version: 5 }
    orderBy: "createdAt"
    orderDirection: "desc"
  ) {
    items {
      id
      borrowAmount
      collateral
      owner
      beneficiary
      prepaidDuration
      prepaidFeePercent
      createdAt
    }
  }
}
```

### Trending Projects

```graphql
query TrendingProjects($chainId: Int!) {
  projects(
    where: { chainId: $chainId, version: 5 }
    orderBy: "trendingScore"
    orderDirection: "desc"
    limit: 10
  ) {
    items {
      projectId
      name
      logoUri
      trendingScore
      trendingVolume
      trendingPaymentsCount
    }
  }
}
```

---

## SDK Integration

### Using with juice-sdk-react

The SDK provides a `useBendystrawQuery` hook for easy data fetching with caching and polling:

```tsx
import { useBendystrawQuery } from 'juice-sdk-react';
import { gql } from 'graphql-request';

// Define your query
const PROJECT_QUERY = gql`
  query GetProject($projectId: Int!, $chainId: Int!) {
    project(projectId: $projectId, chainId: $chainId, version: 5) {
      name
      balance
      volume
      tokenSupply
      contributorsCount
    }
  }
`;

function ProjectStats({ projectId, chainId }) {
  const { data, isLoading, error } = useBendystrawQuery(
    PROJECT_QUERY,
    { projectId: Number(projectId), chainId: Number(chainId) },
    { pollInterval: 30000 } // Poll every 30 seconds
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{data?.project?.name}</h2>
      <p>Balance: {formatEther(data?.project?.balance || 0n)} ETH</p>
      <p>Contributors: {data?.project?.contributorsCount}</p>
    </div>
  );
}
```

### Setup with JBProjectProvider

Configure Bendystraw in your provider setup:

```tsx
import { JBProjectProvider } from 'juice-sdk-react';

function App({ projectId, chainId }) {
  return (
    <JBProjectProvider
      projectId={BigInt(projectId)}
      chainId={chainId}
      ctxProps={{
        bendystraw: {
          apiKey: process.env.NEXT_PUBLIC_BENDYSTRAW_KEY
        }
      }}
    >
      <YourApp />
    </JBProjectProvider>
  );
}
```

### Complete Activity Feed Example

```tsx
'use client';

import { useBendystrawQuery } from 'juice-sdk-react';
import { formatEther } from 'viem';
import { gql } from 'graphql-request';

const ACTIVITY_QUERY = gql`
  query GetActivity($projectId: Int!, $chainId: Int!) {
    activityEvents(
      where: { projectId: $projectId, chainId: $chainId, version: 5 }
      orderBy: "timestamp"
      orderDirection: "desc"
      limit: 20
    ) {
      items {
        id
        type
        timestamp
        txHash
        from
        payEvent {
          amount
          beneficiary
          memo
        }
        cashOutTokensEvent {
          cashOutCount
          reclaimAmount
        }
        mintNftEvent {
          tierId
          tokenId
        }
      }
    }
  }
`;

function ActivityFeed({ projectId, chainId }) {
  const { data, isLoading } = useBendystrawQuery(
    ACTIVITY_QUERY,
    { projectId: Number(projectId), chainId: Number(chainId) },
    { pollInterval: 10000 }
  );

  if (isLoading) return <div>Loading activity...</div>;

  const events = data?.activityEvents?.items || [];

  return (
    <div className="activity-feed">
      <h3>Recent Activity</h3>
      {events.map((event) => (
        <div key={event.id} className="activity-item">
          <span className="type">{formatEventType(event.type)}</span>
          <span className="time">
            {new Date(event.timestamp * 1000).toLocaleString()}
          </span>

          {event.type === 'payEvent' && event.payEvent && (
            <div className="details">
              <p>
                {truncateAddress(event.payEvent.beneficiary)} paid{' '}
                {formatEther(BigInt(event.payEvent.amount))} ETH
              </p>
              {event.payEvent.memo && <p className="memo">"{event.payEvent.memo}"</p>}
            </div>
          )}

          {event.type === 'cashOutTokensEvent' && event.cashOutTokensEvent && (
            <div className="details">
              <p>
                Redeemed {formatEther(BigInt(event.cashOutTokensEvent.cashOutCount))} tokens
                for {formatEther(BigInt(event.cashOutTokensEvent.reclaimAmount))} ETH
              </p>
            </div>
          )}

          {event.type === 'mintNftEvent' && event.mintNftEvent && (
            <div className="details">
              <p>Minted NFT #{event.mintNftEvent.tokenId} (Tier {event.mintNftEvent.tierId})</p>
            </div>
          )}

          <a
            href={`https://etherscan.io/tx/${event.txHash}`}
            target="_blank"
            className="tx-link"
          >
            View tx
          </a>
        </div>
      ))}
    </div>
  );
}

function formatEventType(type) {
  const labels = {
    payEvent: 'Payment',
    cashOutTokensEvent: 'Redemption',
    mintNftEvent: 'NFT Mint',
    mintTokensEvent: 'Token Mint',
    sendPayoutsEvent: 'Payout',
    borrowLoanEvent: 'Loan',
  };
  return labels[type] || type;
}

function truncateAddress(addr) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
```

### Token Holders Leaderboard

```tsx
'use client';

import { useBendystrawQuery } from 'juice-sdk-react';
import { formatEther } from 'viem';
import { gql } from 'graphql-request';

const HOLDERS_QUERY = gql`
  query GetHolders($projectId: Int!, $chainId: Int!) {
    participants(
      where: { projectId: $projectId, chainId: $chainId, version: 5 }
      orderBy: "balance"
      orderDirection: "desc"
      limit: 50
    ) {
      items {
        address
        balance
        volume
        volumeUsd
        paymentsCount
      }
      totalCount
    }
  }
`;

function HoldersLeaderboard({ projectId, chainId, tokenSymbol }) {
  const { data, isLoading } = useBendystrawQuery(
    HOLDERS_QUERY,
    { projectId: Number(projectId), chainId: Number(chainId) }
  );

  if (isLoading) return <div>Loading holders...</div>;

  const holders = data?.participants?.items || [];
  const totalHolders = data?.participants?.totalCount || 0;

  return (
    <div className="leaderboard">
      <h3>Top Holders ({totalHolders} total)</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Contributed</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, i) => (
            <tr key={holder.address}>
              <td>{i + 1}</td>
              <td>{truncateAddress(holder.address)}</td>
              <td>
                {formatEther(BigInt(holder.balance))} {tokenSymbol}
              </td>
              <td>{formatEther(BigInt(holder.volume))} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Special Endpoints

### Participants Snapshot

Get all token holder balances at a specific timestamp (useful for airdrops, voting snapshots):

```typescript
// POST https://<base-url>/<api-key>/participants
const response = await fetch(`https://bendystraw.xyz/${API_KEY}/participants`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    suckerGroupId: 'your-sucker-group-id',
    timestamp: 1704067200, // Unix timestamp in seconds
  }),
});

const participants = await response.json();
// Returns: [{ address, balance, creditBalance, erc20Balance, volume, ... }]
```

---

## Key Concepts

### Chain IDs

Every entity includes a `chainId` field. Use this for filtering:

| Chain | ID |
|-------|-----|
| Ethereum | `1` |
| Optimism | `10` |
| Arbitrum | `42161` |
| Base | `8453` |
| Sepolia | `11155111` |
| Optimism Sepolia | `11155420` |
| Arbitrum Sepolia | `421614` |
| Base Sepolia | `84532` |

### Sucker Groups (Omnichain)

Projects linked across chains share a `suckerGroupId`. Query by this ID to get aggregated cross-chain data:

```graphql
# Get total stats across all chains
query {
  suckerGroup(id: "your-sucker-group-id") {
    balance        # Total balance (all chains)
    tokenSupply    # Total supply (all chains)
    contributorsCount
  }
}
```

### Version Field

Always include `version: 5` in queries for V5 protocol data. The version field is part of most compound primary keys.

### Deterministic IDs

- `project.id` = computed from `projectId`, `version`, and `chainId`
- `suckerGroup.id` = hash of contained project IDs

These IDs are stable and can be stored/cached. All other IDs may change on reindexing.

---

## Pagination

Use cursor-based pagination for large result sets:

```graphql
query GetPayments($cursor: String) {
  payEvents(
    where: { projectId: 1, chainId: 1, version: 5 }
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 50
    after: $cursor
  ) {
    items {
      id
      amount
      beneficiary
      timestamp
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
```

Then fetch the next page:

```typescript
const nextPage = await query({
  cursor: data.payEvents.pageInfo.endCursor
});
```

---

## Resources

- **Playground (Mainnet)**: [bendystraw.xyz/schema](https://bendystraw.xyz/schema)
- **Playground (Testnet)**: [testnet.bendystraw.xyz/schema](https://testnet.bendystraw.xyz/schema)
- **Source Code**: [github.com/peripheralist/bendystraw](https://github.com/peripheralist/bendystraw)
- **Contact**: [@peripheralist](https://x.com/peripheralist)
