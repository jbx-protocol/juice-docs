---
sidebar_position: 2
---

# SDK

The Juicebox SDK provides React hooks and utilities for building frontend applications that interact with the Juicebox protocol. It handles contract interactions, data fetching, and provides type-safe interfaces for all protocol operations.

:::tip Quick Links
**Most developers need these:**
- [Pay Modal](#pay-modal) - Accept payments with token quotes
- [Cash Out Modal](#cash-out-modal) - Let users redeem tokens
- [Dashboard Data](#dashboard-data) - Display project stats
- [User Holdings](#user-holdings-component) - Show user balances
- [Omnichain Payments](#omnichain-payments) - Pay projects on any chain
- [Bendystraw (Data API)](/docs/dev/v5/build/bendystraw.md) - Query indexed data via GraphQL
- [Relayr (Cross-Chain Deploy)](/docs/dev/v5/build/relayr.md) - Deploy projects across chains
:::

## Packages

| Package | Description | NPM |
|---------|-------------|-----|
| `juice-sdk-react` | React hooks and context providers | [![npm](https://img.shields.io/npm/v/juice-sdk-react)](https://www.npmjs.com/package/juice-sdk-react) |
| `juice-sdk-core` | Core utilities, types, and constants | [![npm](https://img.shields.io/npm/v/juice-sdk-core)](https://www.npmjs.com/package/juice-sdk-core) |
| `revnet-sdk` | Revnet-specific hooks and utilities | [![npm](https://img.shields.io/npm/v/revnet-sdk)](https://www.npmjs.com/package/revnet-sdk) |

## Installation

```bash
npm install juice-sdk-react juice-sdk-core wagmi viem @tanstack/react-query
```

For Revnet functionality:

```bash
npm install revnet-sdk
```

**Requirements:**
- Node.js 20+
- React 18.3+
- wagmi 2.10+
- viem 2.14+

## Quick Start

### 1. Configure Wagmi

Create a wagmi configuration with the chains you want to support:

```typescript
// lib/wagmi.ts
import { createConfig, http } from 'wagmi';
import { mainnet, optimism, base, arbitrum, sepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, optimism, base, arbitrum, sepolia],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC),
  },
});
```

### 2. Set Up Providers

Wrap your application with the required providers:

```tsx
// app/providers.tsx
'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 3. Add JBProjectProvider

For project-specific pages, wrap your content with `JBProjectProvider`:

```tsx
// app/project/[id]/page.tsx
import { JBProjectProvider } from 'juice-sdk-react';
import { sepolia } from 'viem/chains';

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <JBProjectProvider
      projectId={BigInt(params.id)}
      chainId={sepolia.id}
    >
      <ProjectDashboard />
    </JBProjectProvider>
  );
}
```

### 4. Use Hooks in Components

```tsx
import {
  useJBProjectMetadataContext,
  useJBTokenContext,
  useJBRulesetContext
} from 'juice-sdk-react';

function ProjectDashboard() {
  const { metadata } = useJBProjectMetadataContext();
  const { token } = useJBTokenContext();
  const { ruleset, rulesetMetadata } = useJBRulesetContext();

  if (metadata.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{metadata.data?.name}</h1>
      <p>{metadata.data?.description}</p>
      <p>Token: {token.data?.symbol}</p>
    </div>
  );
}
```

---

## Common UI Patterns

The most common UI components developers need are **Pay** and **Cash Out** modals. Here are complete, copy-paste ready implementations.

### Pay Modal

A complete pay form with amount input, token quote, and transaction execution:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { parseEther, formatEther } from 'viem';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import {
  useJBContractContext,
  useJBChainId,
  useJBRulesetContext,
  useJBTokenContext,
  useWriteJbMultiTerminalPay,
} from 'juice-sdk-react';
import { getTokenAToBQuote, NATIVE_TOKEN } from 'juice-sdk-core';

interface PayModalProps {
  projectId: bigint;
  onSuccess?: () => void;
}

export function PayModal({ projectId, onSuccess }: PayModalProps) {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  const { address, isConnected } = useAccount();
  const chainId = useJBChainId();
  const { contracts } = useJBContractContext();
  const { ruleset, rulesetMetadata } = useJBRulesetContext();
  const { token } = useJBTokenContext();

  const {
    writeContractAsync,
    isPending: isWriting,
    data: txHash,
  } = useWriteJbMultiTerminalPay();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Calculate how many tokens user will receive
  const tokensReceived = useMemo(() => {
    if (!amount || !ruleset.data || !rulesetMetadata.data) return 0n;
    try {
      return getTokenAToBQuote(parseEther(amount), {
        weight: ruleset.data.weight,
        reservedPercent: rulesetMetadata.data.reservedPercent,
      });
    } catch {
      return 0n;
    }
  }, [amount, ruleset.data, rulesetMetadata.data]);

  const handlePay = async () => {
    if (!address || !contracts.primaryNativeTerminal.data || !amount) return;

    try {
      const amountWei = parseEther(amount);

      await writeContractAsync({
        chainId,
        address: contracts.primaryNativeTerminal.data,
        args: [
          projectId,
          NATIVE_TOKEN,
          amountWei,
          address,        // beneficiary - receives tokens
          0n,             // minReturnedTokens
          memo || '',
          '0x',           // metadata
        ],
        value: amountWei,
      });

      // Reset form on success
      setAmount('');
      setMemo('');
      onSuccess?.();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const isLoading = isWriting || isConfirming;
  const buttonDisabled = !isConnected || !amount || isLoading;

  return (
    <div className="pay-modal">
      {/* Amount Input */}
      <div className="input-group">
        <label>Amount</label>
        <div className="input-with-suffix">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            step="0.01"
            min="0"
            disabled={isLoading}
          />
          <span>ETH</span>
        </div>
      </div>

      {/* Token Quote */}
      {amount && Number(amount) > 0 && (
        <div className="quote">
          <span>You will receive:</span>
          <strong>
            {formatEther(tokensReceived)} {token.data?.symbol || 'tokens'}
          </strong>
        </div>
      )}

      {/* Memo Input */}
      <div className="input-group">
        <label>Memo (optional)</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Leave a message..."
          disabled={isLoading}
        />
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={buttonDisabled}
        className="pay-button"
      >
        {!isConnected
          ? 'Connect Wallet'
          : isWriting
          ? 'Confirm in wallet...'
          : isConfirming
          ? 'Confirming...'
          : isSuccess
          ? 'Success!'
          : `Pay ${amount || '0'} ETH`}
      </button>

      {/* Success Message */}
      {isSuccess && txHash && (
        <p className="success">
          Payment successful!{' '}
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">
            View transaction
          </a>
        </p>
      )}
    </div>
  );
}
```

### Cash Out Modal

A complete redemption form with balance display, quote, and multi-chain support:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { parseEther, formatEther } from 'viem';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import {
  useJBContractContext,
  useJBChainId,
  useJBTokenContext,
  useNativeTokenSurplus,
  useSuckersUserTokenBalance,
  useWriteJbMultiTerminalCashOutTokensOf,
} from 'juice-sdk-react';
import {
  NATIVE_TOKEN,
  getTokenCashOutQuoteEth,
  applyJbDaoCashOutFee,
} from 'juice-sdk-core';

interface CashOutModalProps {
  projectId: bigint;
  onSuccess?: () => void;
}

export function CashOutModal({ projectId, onSuccess }: CashOutModalProps) {
  const [amount, setAmount] = useState('');

  const { address, isConnected } = useAccount();
  const chainId = useJBChainId();
  const { contracts } = useJBContractContext();
  const { token, totalOutstanding } = useJBTokenContext();
  const { data: surplus } = useNativeTokenSurplus();
  const { data: userBalance } = useSuckersUserTokenBalance(address);

  const {
    writeContractAsync,
    isPending: isWriting,
    data: txHash,
  } = useWriteJbMultiTerminalCashOutTokensOf();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Calculate ETH received when cashing out
  const ethReceived = useMemo(() => {
    if (!amount || !surplus || !totalOutstanding.data) return 0n;
    try {
      const tokenAmount = parseEther(amount);
      // Simple calculation: (tokens / totalSupply) * surplus
      // This is a simplified version - production should use getTokenCashOutQuoteEth
      const share = (tokenAmount * surplus) / totalOutstanding.data;
      return applyJbDaoCashOutFee(share); // Apply 2.5% JB DAO fee
    } catch {
      return 0n;
    }
  }, [amount, surplus, totalOutstanding.data]);

  const handleCashOut = async () => {
    if (!address || !contracts.primaryNativeTerminal.data || !amount) return;

    try {
      const tokenAmount = parseEther(amount);

      await writeContractAsync({
        chainId,
        address: contracts.primaryNativeTerminal.data,
        args: [
          address,        // holder
          projectId,
          tokenAmount,
          NATIVE_TOKEN,   // token to receive (ETH)
          0n,             // minTokensReclaimed
          address,        // beneficiary
          '0x',           // metadata
        ],
      });

      setAmount('');
      onSuccess?.();
    } catch (error) {
      console.error('Cash out failed:', error);
    }
  };

  // Quick select buttons
  const setPercentage = (percent: number) => {
    if (!userBalance) return;
    const tokenAmount = (userBalance * BigInt(percent)) / 100n;
    setAmount(formatEther(tokenAmount));
  };

  const isLoading = isWriting || isConfirming;
  const buttonDisabled = !isConnected || !amount || isLoading;

  return (
    <div className="cash-out-modal">
      {/* Balance Display */}
      <div className="balance">
        <span>Your balance:</span>
        <strong>
          {formatEther(userBalance || 0n)} {token.data?.symbol || 'tokens'}
        </strong>
      </div>

      {/* Quick Select Buttons */}
      <div className="quick-select">
        {[10, 25, 50, 100].map((pct) => (
          <button
            key={pct}
            onClick={() => setPercentage(pct)}
            disabled={!userBalance || isLoading}
          >
            {pct === 100 ? 'Max' : `${pct}%`}
          </button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="input-group">
        <label>Amount to redeem</label>
        <div className="input-with-suffix">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            step="0.01"
            min="0"
            max={formatEther(userBalance || 0n)}
            disabled={isLoading}
          />
          <span>{token.data?.symbol || 'tokens'}</span>
        </div>
      </div>

      {/* ETH Quote */}
      {amount && Number(amount) > 0 && (
        <div className="quote">
          <span>You will receive:</span>
          <strong>~{formatEther(ethReceived)} ETH</strong>
          <small>(after 2.5% fee)</small>
        </div>
      )}

      {/* Cash Out Button */}
      <button
        onClick={handleCashOut}
        disabled={buttonDisabled}
        className="cash-out-button"
      >
        {!isConnected
          ? 'Connect Wallet'
          : isWriting
          ? 'Confirm in wallet...'
          : isConfirming
          ? 'Confirming...'
          : isSuccess
          ? 'Success!'
          : 'Cash Out'}
      </button>

      {/* Success Message */}
      {isSuccess && txHash && (
        <p className="success">
          Cash out successful!{' '}
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">
            View transaction
          </a>
        </p>
      )}
    </div>
  );
}
```

### Combined Pay/Cash Out Card

A single component that toggles between pay and cash out modes:

```tsx
'use client';

import { useState } from 'react';
import { PayModal } from './PayModal';
import { CashOutModal } from './CashOutModal';

interface PayCashOutCardProps {
  projectId: bigint;
}

export function PayCashOutCard({ projectId }: PayCashOutCardProps) {
  const [mode, setMode] = useState<'pay' | 'cashout'>('pay');

  return (
    <div className="pay-cashout-card">
      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={mode === 'pay' ? 'active' : ''}
          onClick={() => setMode('pay')}
        >
          Pay
        </button>
        <button
          className={mode === 'cashout' ? 'active' : ''}
          onClick={() => setMode('cashout')}
        >
          Cash Out
        </button>
      </div>

      {/* Content */}
      {mode === 'pay' ? (
        <PayModal projectId={projectId} />
      ) : (
        <CashOutModal projectId={projectId} />
      )}
    </div>
  );
}
```

### Dashboard Data

Fetch and display all the key project metrics:

```tsx
'use client';

import { formatEther } from 'viem';
import {
  useJBProjectMetadataContext,
  useJBTokenContext,
  useJBRulesetContext,
  useNativeTokenSurplus,
  useSuckers,
  useSuckersNativeTokenSurplus,
} from 'juice-sdk-react';

export function ProjectDashboard() {
  const { metadata } = useJBProjectMetadataContext();
  const { token, totalOutstanding } = useJBTokenContext();
  const { ruleset, rulesetMetadata } = useJBRulesetContext();
  const { data: surplus } = useNativeTokenSurplus();
  const { data: suckers } = useSuckers();
  const { data: totalSurplus } = useSuckersNativeTokenSurplus();

  const isOmnichain = suckers && suckers.length > 0;

  if (metadata.isLoading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      {/* Project Header */}
      <header>
        {metadata.data?.logoUri && (
          <img src={metadata.data.logoUri} alt="" />
        )}
        <h1>{metadata.data?.name}</h1>
        <p>{metadata.data?.description}</p>
      </header>

      {/* Treasury Stats */}
      <section className="stats">
        <div className="stat">
          <label>Treasury</label>
          <value>
            {formatEther(isOmnichain ? (totalSurplus || 0n) : (surplus || 0n))} ETH
          </value>
          {isOmnichain && <small>across {suckers.length + 1} chains</small>}
        </div>

        <div className="stat">
          <label>Total Supply</label>
          <value>
            {formatEther(totalOutstanding.data || 0n)} {token.data?.symbol}
          </value>
        </div>

        <div className="stat">
          <label>Token Price</label>
          <value>
            {ruleset.data?.weight
              ? `${formatEther(ruleset.data.weight)} ${token.data?.symbol}/ETH`
              : '—'}
          </value>
        </div>
      </section>

      {/* Ruleset Info */}
      <section className="ruleset">
        <h3>Current Rules</h3>
        <div className="rules">
          <div>
            <label>Reserved Rate</label>
            <value>{(rulesetMetadata.data?.reservedPercent || 0) / 100}%</value>
          </div>
          <div>
            <label>Redemption Rate</label>
            <value>
              {100 - (rulesetMetadata.data?.cashOutTaxRate || 0) / 100}%
            </value>
          </div>
          <div>
            <label>Duration</label>
            <value>
              {ruleset.data?.duration
                ? `${Number(ruleset.data.duration) / 86400} days`
                : 'Open-ended'}
            </value>
          </div>
        </div>
      </section>

      {/* Connected Chains (if omnichain) */}
      {isOmnichain && (
        <section className="chains">
          <h3>Available on {suckers.length + 1} chains</h3>
          <ul>
            {suckers.map((s) => (
              <li key={s.peerChainId}>Chain {s.peerChainId}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
```

### User Holdings Component

Display a user's token balance and value:

```tsx
'use client';

import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import {
  useJBTokenContext,
  useNativeTokenSurplus,
  useSuckersUserTokenBalance,
} from 'juice-sdk-react';

export function UserHoldings() {
  const { address, isConnected } = useAccount();
  const { token, totalOutstanding } = useJBTokenContext();
  const { data: surplus } = useNativeTokenSurplus();
  const { data: userBalance, isLoading } = useSuckersUserTokenBalance(address);

  if (!isConnected) {
    return <p>Connect wallet to see your holdings</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Calculate user's share of the treasury
  const userValue = useMemo(() => {
    if (!userBalance || !surplus || !totalOutstanding.data) return 0n;
    if (totalOutstanding.data === 0n) return 0n;
    return (userBalance * surplus) / totalOutstanding.data;
  }, [userBalance, surplus, totalOutstanding.data]);

  return (
    <div className="user-holdings">
      <h3>Your Holdings</h3>

      <div className="holding">
        <label>Tokens</label>
        <value>
          {formatEther(userBalance || 0n)} {token.data?.symbol}
        </value>
      </div>

      <div className="holding">
        <label>Value</label>
        <value>~{formatEther(userValue)} ETH</value>
      </div>

      <div className="holding">
        <label>Share</label>
        <value>
          {totalOutstanding.data && userBalance
            ? ((Number(userBalance) / Number(totalOutstanding.data)) * 100).toFixed(2)
            : '0'}
          %
        </value>
      </div>
    </div>
  );
}
```

---

## Omnichain Payments

Juicebox V5 supports **omnichain projects** - projects deployed across multiple chains that share the same token and treasury. Users can pay the project on any chain and receive tokens, which can be bridged between chains via **suckers**.

### How Omnichain Works

1. **Suckers** connect project instances across chains (Ethereum, Optimism, Arbitrum, Base)
2. **Tokens** can be bridged between any connected chains
3. **Treasury** is aggregated across all chains for redemption calculations
4. **Users** can pay on any chain and cash out from any chain

### Checking if a Project is Omnichain

```tsx
import { useSuckers } from 'juice-sdk-react';

function OmnichainBadge() {
  const { data: suckers, isLoading } = useSuckers();

  if (isLoading) return null;

  const isOmnichain = suckers && suckers.length > 0;

  if (!isOmnichain) return null;

  return (
    <span className="badge">
      🌐 Available on {suckers.length + 1} chains
    </span>
  );
}
```

### Paying on Any Chain

Users can pay your project on whichever chain they prefer. The `JBProjectProvider` can be configured for any chain:

```tsx
import { JBProjectProvider } from 'juice-sdk-react';
import { useWriteJbMultiTerminalPay } from 'juice-sdk-react';
import { optimism, base, arbitrum, mainnet } from 'viem/chains';

// Chain selector for omnichain projects
function OmnichainPayPage({ projectId }: { projectId: bigint }) {
  const [selectedChain, setSelectedChain] = useState(mainnet);

  return (
    <div>
      {/* Chain selector */}
      <ChainSelector
        projectId={projectId}
        selectedChain={selectedChain}
        onChainSelect={setSelectedChain}
      />

      {/* Project provider for selected chain */}
      <JBProjectProvider
        projectId={projectId}
        chainId={selectedChain.id}
      >
        <PayForm />
      </JBProjectProvider>
    </div>
  );
}

// Chain selector showing available chains
function ChainSelector({ projectId, selectedChain, onChainSelect }) {
  const chainOptions = [
    { chain: mainnet, name: 'Ethereum', icon: '⟠' },
    { chain: optimism, name: 'Optimism', icon: '🔴' },
    { chain: base, name: 'Base', icon: '🔵' },
    { chain: arbitrum, name: 'Arbitrum', icon: '🔷' },
  ];

  return (
    <div className="chain-selector">
      <p>Pay on:</p>
      <div className="chain-options">
        {chainOptions.map(({ chain, name, icon }) => (
          <button
            key={chain.id}
            className={selectedChain.id === chain.id ? 'selected' : ''}
            onClick={() => onChainSelect(chain)}
          >
            {icon} {name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Complete Omnichain Pay Component

This component lets users pay on their preferred chain with full token quote support:

```tsx
import {
  JBProjectProvider,
  useJBContractContext,
  useJBProjectId,
  useJBChainId,
  useSuckers,
  useWriteJbMultiTerminalPay,
} from 'juice-sdk-react';
import { getTokenAToBQuote, NATIVE_TOKEN } from 'juice-sdk-core';
import { useState, useMemo } from 'react';
import { parseEther, formatEther, zeroAddress } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';
import { mainnet, optimism, base, arbitrum } from 'viem/chains';

const SUPPORTED_CHAINS = [
  { id: mainnet.id, name: 'Ethereum', icon: '⟠' },
  { id: optimism.id, name: 'Optimism', icon: '🔴' },
  { id: base.id, name: 'Base', icon: '🔵' },
  { id: arbitrum.id, name: 'Arbitrum', icon: '🔷' },
];

function OmnichainPayWidget({ projectId }: { projectId: bigint }) {
  const [chainId, setChainId] = useState(mainnet.id);

  return (
    <JBProjectProvider projectId={projectId} chainId={chainId}>
      <OmnichainPayForm
        selectedChainId={chainId}
        onChainChange={setChainId}
      />
    </JBProjectProvider>
  );
}

function OmnichainPayForm({ selectedChainId, onChainChange }) {
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: suckers } = useSuckers();
  const projectId = useJBProjectId();
  const currentChainId = useJBChainId();
  const { contracts } = useJBContractContext();

  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  // Get token quote
  const payAmountWei = amount ? parseEther(amount) : 0n;
  const tokenQuote = useMemo(() => {
    if (!contracts.primaryNativeTerminal.data || payAmountWei === 0n) return 0n;
    // Simplified - in production use ruleset weight
    return payAmountWei; // 1:1 default
  }, [payAmountWei, contracts]);

  // Get available chains from suckers
  const availableChains = useMemo(() => {
    const chains = [{ id: currentChainId, ...SUPPORTED_CHAINS.find(c => c.id === currentChainId) }];
    suckers?.forEach(s => {
      const chain = SUPPORTED_CHAINS.find(c => c.id === s.peerChainId);
      if (chain) chains.push(chain);
    });
    return chains;
  }, [suckers, currentChainId]);

  const { writeContract, isPending, isSuccess } = useWriteJbMultiTerminalPay();

  async function handlePay() {
    if (!address || !contracts.primaryNativeTerminal.data) return;

    // Switch chain if needed
    if (currentChainId !== selectedChainId) {
      await switchChain({ chainId: selectedChainId });
    }

    writeContract({
      address: contracts.primaryNativeTerminal.data,
      args: [
        projectId,          // projectId
        NATIVE_TOKEN,       // token (ETH)
        payAmountWei,       // amount
        address,            // beneficiary
        0n,                 // minReturnedTokens
        memo,               // memo
        '0x',               // metadata
      ],
      value: payAmountWei,
    });
  }

  return (
    <div className="omnichain-pay">
      {/* Chain selector */}
      <div className="chain-selector">
        <label>Pay on chain:</label>
        <div className="chain-buttons">
          {availableChains.map(chain => (
            <button
              key={chain.id}
              className={selectedChainId === chain.id ? 'active' : ''}
              onClick={() => onChainChange(chain.id)}
            >
              {chain.icon} {chain.name}
            </button>
          ))}
        </div>
      </div>

      {/* Amount input */}
      <div className="amount-input">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          step="0.01"
        />
        <span>ETH</span>
      </div>

      {/* Token quote */}
      {tokenQuote > 0n && (
        <p className="token-quote">
          You'll receive: {formatEther(tokenQuote)} tokens
        </p>
      )}

      {/* Memo */}
      <input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="Add a memo (optional)"
      />

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={!amount || isPending}
      >
        {isPending ? 'Processing...' : `Pay on ${SUPPORTED_CHAINS.find(c => c.id === selectedChainId)?.name}`}
      </button>

      {isSuccess && <p className="success">Payment successful!</p>}
    </div>
  );
}
```

### Aggregated Cross-Chain Dashboard

Display treasury and user data aggregated across all chains:

```tsx
import {
  useSuckers,
  useSuckersUserTokenBalance,
  useSuckersNativeTokenSurplus,
  useSuckersCashOutQuote,
  useNativeTokenSurplus,
} from 'juice-sdk-react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

function OmnichainDashboard() {
  const { address } = useAccount();
  const { data: suckers, isLoading: suckersLoading } = useSuckers();

  // Single-chain data
  const { data: localSurplus } = useNativeTokenSurplus();

  // Cross-chain aggregated data
  const { data: totalSurplus } = useSuckersNativeTokenSurplus();
  const { data: userBalance } = useSuckersUserTokenBalance(address);
  const { data: cashOutQuote } = useSuckersCashOutQuote(userBalance || 0n);

  const isOmnichain = suckers && suckers.length > 0;

  if (suckersLoading) return <div>Loading...</div>;

  return (
    <div className="omnichain-dashboard">
      {/* Omnichain indicator */}
      {isOmnichain && (
        <div className="omnichain-badge">
          🌐 Omnichain Project
          <span className="chain-count">
            Active on {suckers.length + 1} chains
          </span>
        </div>
      )}

      {/* Treasury */}
      <div className="stat-card">
        <label>Total Treasury</label>
        <value>
          {formatEther(isOmnichain ? (totalSurplus || 0n) : (localSurplus || 0n))} ETH
        </value>
        {isOmnichain && (
          <small>Aggregated across all chains</small>
        )}
      </div>

      {/* Connected chains */}
      {isOmnichain && (
        <div className="connected-chains">
          <label>Connected Chains</label>
          <ul>
            {suckers.map((sucker) => (
              <li key={sucker.peerChainId}>
                Chain {sucker.peerChainId} → Project #{sucker.projectId.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User holdings */}
      {address && (
        <div className="stat-card">
          <label>Your Balance (All Chains)</label>
          <value>{formatEther(userBalance || 0n)} tokens</value>
          {cashOutQuote && cashOutQuote > 0n && (
            <small>
              Worth {formatEther(cashOutQuote)} ETH if redeemed
            </small>
          )}
        </div>
      )}
    </div>
  );
}
```

### Cross-Chain Token Bridging

Tokens earned on any chain can be bridged to other chains via suckers. See [Suckers documentation](/docs/dev/v5/learn/glossary/suckers.md) for details on how token bridging works.

```tsx
import { useSuckers } from 'juice-sdk-react';

function BridgeOptions() {
  const { data: suckers } = useSuckers();

  if (!suckers || suckers.length === 0) {
    return <p>This project is not omnichain</p>;
  }

  return (
    <div className="bridge-options">
      <h3>Bridge Tokens To:</h3>
      <ul>
        {suckers.map((sucker) => (
          <li key={sucker.peerChainId}>
            <button onClick={() => handleBridge(sucker.peerChainId)}>
              Bridge to Chain {sucker.peerChainId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Context Providers

The SDK uses React Context to provide project data throughout your component tree.

### JBProjectProvider

The main provider that composes all project-specific contexts. Use this to wrap any page or component that needs access to project data.

```tsx
import { JBProjectProvider } from 'juice-sdk-react';

<JBProjectProvider
  projectId={1n}                    // Required: Project ID as bigint
  chainId={1}                       // Required: Chain ID
  ctxProps={{                       // Optional: Configure nested contexts
    metadata: {
      ipfsGatewayHostname: 'jbm.infura-ipfs.io'  // Custom IPFS gateway
    },
    token: {
      withTotalOutstanding: true    // Include total token supply
    }
  }}
>
  {children}
</JBProjectProvider>
```

**Nested Contexts:**

| Context | Hook | Data Provided |
|---------|------|---------------|
| `JBChainContext` | `useJBChainId()` | Current chain ID |
| `JBContractContext` | `useJBContractContext()` | Contract addresses (Controller, Terminal, etc.) |
| `JBRulesetContext` | `useJBRulesetContext()` | Current ruleset and metadata |
| `JBProjectMetadataContext` | `useJBProjectMetadataContext()` | Project metadata from IPFS |
| `JBTokenContext` | `useJBTokenContext()` | Token info and supply |
| `JBTerminalContext` | - | Primary native terminal |

---

## Hooks Reference

### Context Hooks

These hooks access data from the `JBProjectProvider` context.

#### useJBChainId

Get the current chain ID from the project context.

```tsx
import { useJBChainId } from 'juice-sdk-react';

function MyComponent() {
  const chainId = useJBChainId();
  return <span>Chain: {chainId}</span>;
}
```

#### useJBProjectId

Get the project ID, optionally for a different chain (useful for omnichain projects).

```tsx
import { useJBProjectId } from 'juice-sdk-react';
import { optimism } from 'viem/chains';

function MyComponent() {
  // Get project ID on current chain
  const { projectId } = useJBProjectId();

  // Get project ID on a different chain
  const { projectId: opProjectId } = useJBProjectId(optimism.id);
}
```

#### useJBContractContext

Access contract addresses for the current project.

```tsx
import { useJBContractContext } from 'juice-sdk-react';

function MyComponent() {
  const { contracts } = useJBContractContext();

  // Available contracts:
  // - contracts.controller
  // - contracts.primaryNativeTerminal
  // - contracts.fundAccessLimits
  // - contracts.tokens
  // - contracts.splits
  // - contracts.rulesets

  return <span>Terminal: {contracts.primaryNativeTerminal.data}</span>;
}
```

#### useJBRulesetContext

Access the current ruleset and its metadata.

```tsx
import { useJBRulesetContext } from 'juice-sdk-react';
import { formatEther } from 'viem';

function RulesetInfo() {
  const { ruleset, rulesetMetadata } = useJBRulesetContext();

  if (ruleset.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>Duration: {ruleset.data?.duration.toString()} seconds</p>
      <p>Weight: {formatEther(ruleset.data?.weight || 0n)}</p>
      <p>Reserved Rate: {rulesetMetadata.data?.reservedPercent}%</p>
      <p>Redemption Rate: {100 - (rulesetMetadata.data?.cashOutTaxRate || 0) / 100}%</p>
    </div>
  );
}
```

#### useJBProjectMetadataContext

Access project metadata from IPFS (name, description, logo, links).

```tsx
import { useJBProjectMetadataContext } from 'juice-sdk-react';

function ProjectHeader() {
  const { metadata } = useJBProjectMetadataContext();

  if (metadata.isLoading) return <div>Loading...</div>;
  if (!metadata.data) return <div>No metadata</div>;

  return (
    <div>
      {metadata.data.logoUri && (
        <img src={metadata.data.logoUri} alt={metadata.data.name} />
      )}
      <h1>{metadata.data.name}</h1>
      <p>{metadata.data.description}</p>
      {metadata.data.twitter && (
        <a href={`https://twitter.com/${metadata.data.twitter}`}>Twitter</a>
      )}
    </div>
  );
}
```

#### useJBTokenContext

Access project token information.

```tsx
import { useJBTokenContext } from 'juice-sdk-react';
import { formatEther } from 'viem';

function TokenInfo() {
  const { token, totalOutstanding } = useJBTokenContext();

  return (
    <div>
      <p>Symbol: {token.data?.symbol}</p>
      <p>Decimals: {token.data?.decimals}</p>
      <p>Total Supply: {formatEther(totalOutstanding.data || 0n)}</p>
    </div>
  );
}
```

### Token & Balance Hooks

#### useNativeTokenSurplus

Get the native token (ETH) surplus available for redemptions.

```tsx
import { useNativeTokenSurplus } from 'juice-sdk-react';
import { formatEther } from 'viem';

function TreasurySurplus() {
  const { data: surplus, isLoading } = useNativeTokenSurplus();

  if (isLoading) return <div>Loading...</div>;

  return <p>Available to redeem: {formatEther(surplus || 0n)} ETH</p>;
}
```

#### useTokenCashOutQuoteEth

Calculate how much ETH a token holder would receive when cashing out.

```tsx
import { useTokenCashOutQuoteEth } from 'juice-sdk-react';
import { parseEther, formatEther } from 'viem';

function RedemptionQuote({ tokenAmount }: { tokenAmount: string }) {
  const { data: ethAmount } = useTokenCashOutQuoteEth(parseEther(tokenAmount));

  return (
    <p>
      Redeeming {tokenAmount} tokens = {formatEther(ethAmount || 0n)} ETH
    </p>
  );
}
```

### Omnichain Hooks

These hooks work with projects deployed across multiple chains via [suckers](/docs/dev/v5/learn/glossary/suckers.md).

#### useSuckers

Get cross-chain token pairs for the project.

```tsx
import { useSuckers } from 'juice-sdk-react';

function ChainSelector() {
  const { data: suckers, isLoading } = useSuckers();

  if (isLoading) return <div>Loading chains...</div>;

  return (
    <select>
      {suckers?.map((sucker) => (
        <option key={sucker.peerChainId} value={sucker.peerChainId}>
          Chain {sucker.peerChainId}
        </option>
      ))}
    </select>
  );
}
```

#### useSuckersUserTokenBalance

Get a user's token balance aggregated across all connected chains.

```tsx
import { useSuckersUserTokenBalance } from 'juice-sdk-react';
import { formatEther } from 'juice-sdk-core';
import { useAccount } from 'wagmi';

function CrossChainBalance() {
  const { address } = useAccount();
  const { data: totalBalance, isLoading } = useSuckersUserTokenBalance(address);

  if (isLoading) return <div>Loading...</div>;

  return (
    <p>Your total balance: {formatEther(totalBalance || 0n, { fractionDigits: 4 })} tokens</p>
  );
}
```

#### useSuckersNativeTokenSurplus

Get the total surplus across all connected chains.

```tsx
import { useSuckersNativeTokenSurplus } from 'juice-sdk-react';
import { formatEther } from 'viem';

function TotalSurplus() {
  const { data: surplus } = useSuckersNativeTokenSurplus();

  return <p>Total surplus (all chains): {formatEther(surplus || 0n)} ETH</p>;
}
```

#### useSuckersCashOutQuote

Get a cash-out quote considering multi-chain surplus.

```tsx
import { useSuckersCashOutQuote } from 'juice-sdk-react';
import { parseEther, formatEther } from 'viem';

function OmnichainRedemptionQuote({ tokenAmount }: { tokenAmount: string }) {
  const { data: quote } = useSuckersCashOutQuote(parseEther(tokenAmount));

  return (
    <p>
      Redeeming across all chains: {formatEther(quote || 0n)} ETH
    </p>
  );
}
```

### NFT (721 Hook) Hooks

#### useFind721DataHook

Find the 721 data hook address for a project that has NFT tiers.

```tsx
import { useFind721DataHook } from 'juice-sdk-react';

function NFTHookInfo() {
  const { data: hookAddress } = useFind721DataHook();

  if (!hookAddress) return <div>No NFT hook configured</div>;

  return <p>NFT Hook: {hookAddress}</p>;
}
```

#### usePreparePayMetadata

Prepare metadata for payments that include NFT tier minting.

```tsx
import { usePreparePayMetadata } from 'juice-sdk-react';

function PayWithNFT({ hookAddress, tierIds }: { hookAddress: string; tierIds: bigint[] }) {
  const metadata = usePreparePayMetadata({
    jb721Hook: {
      dataHookAddress: hookAddress,
      tierIdsToMint: tierIds,
    }
  });

  // Use metadata in your pay transaction
  // ...
}
```

### Utility Hooks

#### useEtherPrice

Get the current ETH price in USD.

```tsx
import { useEtherPrice } from 'juice-sdk-react';

function EthPrice() {
  const { data: ethPrice } = useEtherPrice();

  return <p>ETH Price: ${ethPrice?.toFixed(2)}</p>;
}
```

---

## Auto-Generated Contract Hooks

The SDK auto-generates type-safe hooks for all Juicebox contracts using Wagmi CLI. These follow the pattern:

- `useRead{Contract}{Function}` - Read contract state
- `useWrite{Contract}{Function}` - Write transactions
- `useWatch{Contract}{Event}` - Watch for events

### Payment Example

```tsx
import { useWriteJbMultiTerminalPay } from 'juice-sdk-react';
import { useJBContractContext, useJBChainId } from 'juice-sdk-react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

const NATIVE_TOKEN = '0x000000000000000000000000000000000000EEEe';

function PayButton({ projectId, amount }: { projectId: bigint; amount: string }) {
  const { address } = useAccount();
  const chainId = useJBChainId();
  const { contracts } = useJBContractContext();
  const { writeContractAsync, isPending, isSuccess } = useWriteJbMultiTerminalPay();

  const handlePay = async () => {
    if (!address || !contracts.primaryNativeTerminal.data) return;

    const amountWei = parseEther(amount);

    await writeContractAsync({
      chainId,
      address: contracts.primaryNativeTerminal.data,
      args: [
        projectId,           // projectId
        NATIVE_TOKEN,        // token (ETH)
        amountWei,           // amount
        address,             // beneficiary (receives project tokens)
        0n,                  // minReturnedTokens (0 = no slippage protection)
        'Payment from app',  // memo
        '0x',                // metadata
      ],
      value: amountWei,
    });
  };

  return (
    <button onClick={handlePay} disabled={isPending || !address}>
      {isPending ? 'Paying...' : `Pay ${amount} ETH`}
    </button>
  );
}
```

### Cash Out (Redemption) Example

```tsx
import { useWriteJbMultiTerminalCashOutTokensOf } from 'juice-sdk-react';
import { useJBContractContext, useJBChainId } from 'juice-sdk-react';
import { useAccount } from 'wagmi';

const NATIVE_TOKEN = '0x000000000000000000000000000000000000EEEe';

function RedeemButton({ projectId, tokenAmount }: { projectId: bigint; tokenAmount: bigint }) {
  const { address } = useAccount();
  const chainId = useJBChainId();
  const { contracts } = useJBContractContext();
  const { writeContractAsync, isPending } = useWriteJbMultiTerminalCashOutTokensOf();

  const handleRedeem = async () => {
    if (!address || !contracts.primaryNativeTerminal.data) return;

    await writeContractAsync({
      chainId,
      address: contracts.primaryNativeTerminal.data,
      args: [
        address,       // holder
        projectId,     // projectId
        tokenAmount,   // tokenCount to redeem
        NATIVE_TOKEN,  // token to receive (ETH)
        0n,            // minTokensReclaimed (0 = no slippage protection)
        address,       // beneficiary
        '0x',          // metadata
      ],
    });
  };

  return (
    <button onClick={handleRedeem} disabled={isPending || !address}>
      {isPending ? 'Redeeming...' : 'Redeem Tokens'}
    </button>
  );
}
```

### Read Current Ruleset Example

```tsx
import { useReadJbControllerCurrentRulesetOf } from 'juice-sdk-react';
import { useJBContractContext, useJBChainId } from 'juice-sdk-react';

function CurrentRuleset({ projectId }: { projectId: bigint }) {
  const chainId = useJBChainId();
  const { contracts } = useJBContractContext();

  const { data, isLoading } = useReadJbControllerCurrentRulesetOf({
    chainId,
    address: contracts.controller.data,
    args: [projectId],
  });

  if (isLoading) return <div>Loading...</div>;

  const [ruleset, metadata] = data || [];

  return (
    <div>
      <p>Ruleset ID: {ruleset?.id.toString()}</p>
      <p>Start: {new Date(Number(ruleset?.start) * 1000).toLocaleDateString()}</p>
      <p>Duration: {ruleset?.duration.toString()} seconds</p>
    </div>
  );
}
```

---

## Core Utilities

The `juice-sdk-core` package provides utilities for calculations, formatting, and constants.

### Token Math

#### getTokenAToBQuote

Calculate how many project tokens a payment will mint.

```typescript
import { getTokenAToBQuote } from 'juice-sdk-core';
import { parseEther } from 'viem';

// How many tokens for 1 ETH?
const tokensReceived = getTokenAToBQuote(
  parseEther('1'),  // payment amount in wei
  {
    weight: ruleset.weight,
    reservedPercent: rulesetMetadata.reservedPercent,
  }
);
```

#### getTokenBtoAQuote

Calculate how much to pay for a specific number of tokens.

```typescript
import { getTokenBtoAQuote } from 'juice-sdk-core';
import { parseEther } from 'viem';

// How much ETH for 1000 tokens?
const paymentRequired = getTokenBtoAQuote(
  parseEther('1000'),  // desired token amount
  {
    weight: ruleset.weight,
  }
);
```

#### getTokenBPrice

Get the current price of project tokens.

```typescript
import { getTokenBPrice } from 'juice-sdk-core';

const price = getTokenBPrice({ weight: ruleset.weight });
console.log(`Token price: ${price.toString()} ETH`);
```

### Ruleset Math

#### getNextRulesetWeight

Calculate what the weight will be in the next ruleset (after decay).

```typescript
import { getNextRulesetWeight } from 'juice-sdk-core';

const nextWeight = getNextRulesetWeight(
  currentRuleset.weight,
  currentRuleset.decayPercent
);
```

### Formatting

```typescript
import { formatEther, formatUnits, formatEthAddress } from 'juice-sdk-core';

// Format ETH with custom precision
formatEther(weiAmount, { fractionDigits: 4 }); // "1.2345"

// Format any token
formatUnits(tokenAmount, 18); // "1000.00"

// Truncate addresses
formatEthAddress('0x1234567890abcdef...', { truncateTo: 4 }); // "0x1234...cdef"
```

### Fixed-Point Math Classes

The SDK uses fixed-point math for precise decimal calculations:

```typescript
import {
  ReservedPercent,
  CashOutTaxRate,
  RulesetWeight,
  Ether,
  JBProjectToken
} from 'juice-sdk-core';

// Percentages (4 decimal places, max 10,000 = 100%)
const reserved = new ReservedPercent(5000); // 50%
const taxRate = new CashOutTaxRate(2500);   // 25%

// Token weights and amounts (18 decimal places)
const weight = new RulesetWeight(1_000_000_000_000_000_000n); // 1.0
const ethAmount = new Ether(parseEther('1.5'));
const tokens = new JBProjectToken(tokenAmount);

// Convert to human-readable
console.log(weight.toString()); // "1.0"
```

### Constants

```typescript
import {
  NATIVE_TOKEN,
  JB_CHAINS,
  ETH_CURRENCY_ID,
  USD_CURRENCY_ID,
  MAX_RESERVED_PERCENT,
  MAX_CASH_OUT_TAX_RATE
} from 'juice-sdk-core';

// Native token address (ETH)
NATIVE_TOKEN // "0x000000000000000000000000000000000000EEEe"

// Supported chains
JB_CHAINS // { 1: {...}, 10: {...}, 8453: {...}, 42161: {...}, ... }

// Currency IDs for price feeds
ETH_CURRENCY_ID // 1
USD_CURRENCY_ID // 2

// Max values for percentages
MAX_RESERVED_PERCENT   // 10_000 (100%)
MAX_CASH_OUT_TAX_RATE  // 10_000 (100%)
```

---

## Revnet SDK

For Revnet-specific functionality, use `revnet-sdk`:

```typescript
import { calcPrepaidFee } from 'revnet-sdk';

// Calculate prepaid fee for a Revnet operation
const fee = calcPrepaidFee(amount);
```

### Auto-Generated Revnet Hooks

```typescript
import {
  useWriteRevDeployerDeployFor,
  useReadRevLoansLoanOf,
  useWriteRevLoansBorrowFrom,
  useWriteRevLoansRepayLoan
} from 'revnet-sdk';
```

See [Life of a Revnet](/docs/dev/v5/build/life-of-a-revnet.md) and [Borrow from Revnet](/docs/dev/v5/build/examples/borrow-from-revnet.md) for detailed examples.

---

## Complete Examples

### Full Project Dashboard

```tsx
'use client';

import { JBProjectProvider } from 'juice-sdk-react';
import {
  useJBProjectMetadataContext,
  useJBTokenContext,
  useJBRulesetContext,
  useNativeTokenSurplus,
  useWriteJbMultiTerminalPay,
  useJBContractContext,
  useJBChainId
} from 'juice-sdk-react';
import { formatEther, getTokenAToBQuote } from 'juice-sdk-core';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { useState } from 'react';

const NATIVE_TOKEN = '0x000000000000000000000000000000000000EEEe';

function ProjectInfo() {
  const { metadata } = useJBProjectMetadataContext();
  const { token, totalOutstanding } = useJBTokenContext();
  const { ruleset, rulesetMetadata } = useJBRulesetContext();
  const { data: surplus } = useNativeTokenSurplus();

  if (metadata.isLoading) return <div>Loading project...</div>;

  return (
    <div>
      <header>
        {metadata.data?.logoUri && (
          <img src={metadata.data.logoUri} alt="" width={64} height={64} />
        )}
        <h1>{metadata.data?.name}</h1>
        <p>{metadata.data?.description}</p>
      </header>

      <section>
        <h2>Treasury</h2>
        <p>Surplus: {formatEther(surplus || 0n, { fractionDigits: 4 })} ETH</p>
        <p>Total tokens: {formatEther(totalOutstanding.data || 0n, { fractionDigits: 2 })} {token.data?.symbol}</p>
      </section>

      <section>
        <h2>Current Ruleset</h2>
        <p>Reserved rate: {(rulesetMetadata.data?.reservedPercent || 0) / 100}%</p>
        <p>Redemption rate: {100 - (rulesetMetadata.data?.cashOutTaxRate || 0) / 100}%</p>
      </section>
    </div>
  );
}

function PayForm({ projectId }: { projectId: bigint }) {
  const [amount, setAmount] = useState('0.1');
  const { address } = useAccount();
  const chainId = useJBChainId();
  const { contracts } = useJBContractContext();
  const { ruleset, rulesetMetadata } = useJBRulesetContext();
  const { writeContractAsync, isPending } = useWriteJbMultiTerminalPay();

  // Calculate token quote
  const tokensReceived = ruleset.data && rulesetMetadata.data
    ? getTokenAToBQuote(parseEther(amount || '0'), {
        weight: ruleset.data.weight,
        reservedPercent: rulesetMetadata.data.reservedPercent,
      })
    : 0n;

  const handlePay = async () => {
    if (!address || !contracts.primaryNativeTerminal.data) return;

    await writeContractAsync({
      chainId,
      address: contracts.primaryNativeTerminal.data,
      args: [projectId, NATIVE_TOKEN, parseEther(amount), address, 0n, '', '0x'],
      value: parseEther(amount),
    });
  };

  return (
    <div>
      <h2>Contribute</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01"
        min="0"
      />
      <span> ETH</span>
      <p>You'll receive: {formatEther(tokensReceived, { fractionDigits: 2 })} tokens</p>
      <button onClick={handlePay} disabled={isPending || !address}>
        {!address ? 'Connect Wallet' : isPending ? 'Paying...' : 'Pay'}
      </button>
    </div>
  );
}

export default function ProjectDashboard({
  projectId,
  chainId
}: {
  projectId: number;
  chainId: number;
}) {
  return (
    <JBProjectProvider projectId={BigInt(projectId)} chainId={chainId}>
      <ProjectInfo />
      <PayForm projectId={BigInt(projectId)} />
    </JBProjectProvider>
  );
}
```

### Multi-Chain Balance Display

```tsx
import {
  useSuckers,
  useSuckersUserTokenBalance,
  useSuckersNativeTokenSurplus
} from 'juice-sdk-react';
import { formatEther } from 'juice-sdk-core';
import { useAccount } from 'wagmi';

function OmnichainDashboard() {
  const { address } = useAccount();
  const { data: suckers, isLoading: suckersLoading } = useSuckers();
  const { data: totalBalance } = useSuckersUserTokenBalance(address);
  const { data: totalSurplus } = useSuckersNativeTokenSurplus();

  if (suckersLoading) return <div>Loading chains...</div>;

  return (
    <div>
      <h2>Cross-Chain Overview</h2>

      <div>
        <h3>Connected Chains</h3>
        <ul>
          {suckers?.map((sucker) => (
            <li key={sucker.peerChainId}>
              Chain {sucker.peerChainId} - Project #{sucker.projectId.toString()}
            </li>
          ))}
        </ul>
      </div>

      {address && (
        <div>
          <h3>Your Balance (All Chains)</h3>
          <p>{formatEther(totalBalance || 0n, { fractionDigits: 4 })} tokens</p>
        </div>
      )}

      <div>
        <h3>Total Surplus (All Chains)</h3>
        <p>{formatEther(totalSurplus || 0n, { fractionDigits: 4 })} ETH</p>
      </div>
    </div>
  );
}
```

---

## TypeScript Types

The SDK exports TypeScript types for all protocol data structures:

```typescript
import type {
  JBProjectMetadata,
  JBRulesetData,
  JBRulesetMetadata,
  JBSplit,
  JBChainId,
} from 'juice-sdk-core';
```

### Key Types

| Type | Description |
|------|-------------|
| `JBProjectMetadata` | Project metadata (name, description, logoUri, links) |
| `JBRulesetData` | Ruleset configuration (duration, weight, decayPercent) |
| `JBRulesetMetadata` | Ruleset settings (reservedPercent, cashOutTaxRate, hooks) |
| `JBSplit` | Split configuration for payouts or reserved tokens |
| `JBChainId` | Union of supported chain IDs |

---

## Resources

- **Source Code**: [github.com/juicebox-money/juice-sdk-v4](https://github.com/juicebox-money/juice-sdk-v4)
- **NPM**: [juice-sdk-react](https://www.npmjs.com/package/juice-sdk-react) | [juice-sdk-core](https://www.npmjs.com/package/juice-sdk-core)
- **Examples**: [Revnet App](https://github.com/rev-net/revnet-app) | [Juicebox Interface](https://github.com/jbx-protocol/juice-interface)
