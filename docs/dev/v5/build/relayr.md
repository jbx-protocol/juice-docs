---
sidebar_position: 3
---

# Relayr (Cross-Chain Deploy)

Relayr is a cross-chain transaction service that enables **gasless, multi-chain transaction bundling**. With Relayr, a single user signature can trigger transactions across multiple blockchain networks while only paying gas on one selected chain.

This is particularly useful for:
- **Deploying omnichain projects** across Ethereum, Optimism, Arbitrum, and Base simultaneously
- **Updating rulesets** across all chains at once
- **Managing multi-chain projects** with a single transaction flow

## How Relayr Works

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          RELAYR FLOW                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   1. GET QUOTE                    2. SELECT CHAIN                       │
│   ┌──────────────┐               ┌───────────────────┐                  │
│   │ User signs   │               │ Choose which      │                  │
│   │ tx for each  │ ──────────▶   │ chain to pay      │                  │
│   │ chain        │               │ gas on            │                  │
│   └──────────────┘               └───────────────────┘                  │
│                                           │                             │
│                                           ▼                             │
│   4. EXECUTION                    3. SEND TX                            │
│   ┌──────────────┐               ┌───────────────────┐                  │
│   │ Relayr       │               │ Submit single tx  │                  │
│   │ executes on  │ ◀──────────   │ on payment chain  │                  │
│   │ all chains   │               └───────────────────┘                  │
│   └──────────────┘                                                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

1. **Get Quote**: User signs ERC-2771 meta-transactions for each target chain
2. **Select Chain**: User picks which chain to pay gas on
3. **Send Transaction**: Single transaction submitted on payment chain
4. **Execution**: Relayr relayers execute queued transactions on all other chains

## Installation

The Relayr hooks are included in `juice-sdk-react`:

```bash
npm install juice-sdk-react juice-sdk-core wagmi viem @tanstack/react-query
```

## SDK Hooks

### useGetRelayrTxQuote

Get a quote for a bundle of cross-chain transactions. This prompts the user to sign each transaction.

```tsx
import { useGetRelayrTxQuote } from 'juice-sdk-react';
import type { JBChainId } from 'juice-sdk-core';

function DeployButton() {
  const { getRelayrTxQuote, data: quote, reset, isPending } = useGetRelayrTxQuote();

  async function handleGetQuote() {
    const transactions = [
      {
        chainId: 1 as JBChainId,  // Ethereum
        data: {
          from: userAddress,
          to: contractAddress,
          value: 0n,
          gas: 1_000_000n,
          data: encodedFunctionCall,
        },
      },
      {
        chainId: 10 as JBChainId, // Optimism
        data: {
          from: userAddress,
          to: contractAddress,
          value: 0n,
          gas: 1_000_000n,
          data: encodedFunctionCall,
        },
      },
      // Add more chains...
    ];

    const result = await getRelayrTxQuote(transactions);
    console.log('Bundle UUID:', result.bundle_uuid);
    console.log('Payment options:', result.payment_info);
  }

  return (
    <button onClick={handleGetQuote} disabled={isPending}>
      {isPending ? 'Signing...' : 'Get Quote'}
    </button>
  );
}
```

**Returns:**
```typescript
type RelayrPostBundleResponse = {
  bundle_uuid: string;           // Unique bundle identifier
  payment_info: ChainPayment[];  // Payment options for each chain
  per_txn: PerTransaction[];     // Gas cost breakdown per transaction
  txn_uuids: string[];           // Individual transaction IDs
};
```

### useSendRelayrTx

Submit the payment transaction on the user's chosen chain.

```tsx
import { useSendRelayrTx } from 'juice-sdk-react';

function PaymentForm({ quote, selectedPayment }) {
  const { sendRelayrTx, isPending, isSuccess, error } = useSendRelayrTx();

  async function handlePay() {
    const txHash = await sendRelayrTx({
      amount: selectedPayment.amount,
      calldata: selectedPayment.calldata,
      chain: selectedPayment.chain,
      target: selectedPayment.target,
      token: selectedPayment.token,
      payment_deadline: selectedPayment.payment_deadline,
    });
    console.log('Payment tx:', txHash);
  }

  return (
    <button onClick={handlePay} disabled={isPending}>
      {isPending ? 'Processing...' : 'Pay & Execute'}
    </button>
  );
}
```

### useGetRelayrTxBundle

Poll for bundle completion status.

```tsx
import { useGetRelayrTxBundle } from 'juice-sdk-react';
import { useEffect } from 'react';

function BundleStatus({ bundleUuid }) {
  const { startPolling, isComplete, response, error, stopPolling } = useGetRelayrTxBundle();

  useEffect(() => {
    if (bundleUuid) {
      startPolling(bundleUuid);
    }
    return () => stopPolling();
  }, [bundleUuid]);

  if (error) return <div>Error: {error.message}</div>;

  if (isComplete) {
    return (
      <div className="success">
        All transactions complete!
        <ul>
          {response?.transactions.map((tx, i) => (
            <li key={i}>
              Chain {tx.chain}: {tx.status} - {tx.txn_hash}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="pending">
      <p>Executing transactions...</p>
      <ul>
        {response?.transactions.map((tx, i) => (
          <li key={i}>
            Chain {tx.chain}: {tx.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Transaction Status Values:**
- `"Pending"` - Waiting to be executed
- `"Included"` - Included in a block
- `"Completed"` - On-chain but not finalized
- `"Success"` - Finalized and successful
- `"Failed"` - Transaction failed

## Complete Example: Deploy Omnichain Project

This example shows how to deploy a Juicebox project across multiple chains using Relayr:

```tsx
import {
  useGetRelayrTxQuote,
  useSendRelayrTx,
  useGetRelayrTxBundle,
} from 'juice-sdk-react';
import { JB_CHAINS, type JBChainId } from 'juice-sdk-core';
import { useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { encodeFunctionData } from 'viem';

// Chain display info
const CHAIN_INFO: Record<number, { name: string; icon: string }> = {
  1: { name: 'Ethereum', icon: '⟠' },
  10: { name: 'Optimism', icon: '🔴' },
  8453: { name: 'Base', icon: '🔵' },
  42161: { name: 'Arbitrum', icon: '🔷' },
};

type DeployStep = 'select' | 'quote' | 'payment' | 'executing' | 'complete';

export function OmnichainDeployer() {
  const { address } = useAccount();
  const [step, setStep] = useState<DeployStep>('select');
  const [selectedChains, setSelectedChains] = useState<JBChainId[]>([1, 10]);
  const [paymentChain, setPaymentChain] = useState<JBChainId | null>(null);

  // Relayr hooks
  const { getRelayrTxQuote, data: quote, isPending: quotePending } = useGetRelayrTxQuote();
  const { sendRelayrTx, isPending: sendPending, isSuccess: sendSuccess } = useSendRelayrTx();
  const { startPolling, isComplete, response: bundleStatus } = useGetRelayrTxBundle();

  // Step 1: Select chains
  function toggleChain(chainId: JBChainId) {
    setSelectedChains(prev =>
      prev.includes(chainId)
        ? prev.filter(c => c !== chainId)
        : [...prev, chainId]
    );
  }

  // Step 2: Get quote (sign for each chain)
  async function handleGetQuote() {
    if (!address || selectedChains.length < 2) return;

    // Build deploy transactions for each chain
    const transactions = selectedChains.map(chainId => ({
      chainId,
      data: {
        from: address,
        to: JB_CHAINS[chainId].omnichainDeployer as `0x${string}`,
        value: 0n,
        gas: 1_000_000n * BigInt(selectedChains.length),
        data: buildDeployCalldata(chainId), // Your deploy data
      },
    }));

    const result = await getRelayrTxQuote(transactions);
    if (result) {
      setStep('payment');
    }
  }

  // Step 3: Select payment chain and send
  async function handleSendPayment() {
    if (!quote || !paymentChain) return;

    const payment = quote.payment_info.find(p => p.chain === paymentChain);
    if (!payment) return;

    await sendRelayrTx(payment);
    setStep('executing');
    startPolling(quote.bundle_uuid);
  }

  // Check completion
  useEffect(() => {
    if (isComplete) {
      setStep('complete');
    }
  }, [isComplete]);

  return (
    <div className="omnichain-deployer">
      <h2>Deploy Omnichain Project</h2>

      {/* Step 1: Chain Selection */}
      {step === 'select' && (
        <div className="step">
          <h3>Select Chains</h3>
          <p>Choose which chains to deploy your project on:</p>
          <div className="chain-grid">
            {Object.entries(CHAIN_INFO).map(([id, info]) => (
              <button
                key={id}
                className={selectedChains.includes(Number(id) as JBChainId) ? 'selected' : ''}
                onClick={() => toggleChain(Number(id) as JBChainId)}
              >
                {info.icon} {info.name}
                {selectedChains.includes(Number(id) as JBChainId) && ' ✓'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep('quote')}
            disabled={selectedChains.length < 2}
          >
            Continue with {selectedChains.length} chains
          </button>
        </div>
      )}

      {/* Step 2: Get Quote */}
      {step === 'quote' && (
        <div className="step">
          <h3>Sign Transactions</h3>
          <p>
            You'll be asked to sign a transaction for each chain.
            This doesn't cost gas yet.
          </p>
          <div className="chain-list">
            {selectedChains.map(chainId => (
              <div key={chainId} className="chain-item">
                {CHAIN_INFO[chainId]?.icon} {CHAIN_INFO[chainId]?.name}
              </div>
            ))}
          </div>
          <button onClick={handleGetQuote} disabled={quotePending}>
            {quotePending ? 'Signing...' : 'Sign All Transactions'}
          </button>
        </div>
      )}

      {/* Step 3: Payment Chain Selection */}
      {step === 'payment' && quote && (
        <div className="step">
          <h3>Choose Payment Chain</h3>
          <p>Select which chain you want to pay gas on:</p>
          <div className="payment-options">
            {quote.payment_info.map((payment) => (
              <button
                key={payment.chain}
                className={paymentChain === payment.chain ? 'selected' : ''}
                onClick={() => setPaymentChain(payment.chain)}
              >
                <span className="chain-name">
                  {CHAIN_INFO[payment.chain]?.icon} {CHAIN_INFO[payment.chain]?.name}
                </span>
                <span className="gas-cost">
                  ~{(Number(payment.amount) / 1e18).toFixed(4)} ETH
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={handleSendPayment}
            disabled={!paymentChain || sendPending}
          >
            {sendPending ? 'Sending...' : 'Pay & Deploy'}
          </button>
        </div>
      )}

      {/* Step 4: Executing */}
      {step === 'executing' && (
        <div className="step">
          <h3>Deploying...</h3>
          <p>Relayr is executing transactions on all chains:</p>
          <div className="tx-status">
            {bundleStatus?.transactions.map((tx, i) => (
              <div key={i} className={`tx-item ${tx.status.toLowerCase()}`}>
                <span>{CHAIN_INFO[tx.chain]?.icon} {CHAIN_INFO[tx.chain]?.name}</span>
                <span className="status">{tx.status}</span>
                {tx.txn_hash && (
                  <a href={`${getExplorerUrl(tx.chain)}/tx/${tx.txn_hash}`} target="_blank">
                    View
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Complete */}
      {step === 'complete' && (
        <div className="step success">
          <h3>Deployment Complete!</h3>
          <p>Your project is now live on {selectedChains.length} chains.</p>
          <div className="tx-links">
            {bundleStatus?.transactions.map((tx, i) => (
              <a
                key={i}
                href={`${getExplorerUrl(tx.chain)}/tx/${tx.txn_hash}`}
                target="_blank"
              >
                {CHAIN_INFO[tx.chain]?.icon} View on {CHAIN_INFO[tx.chain]?.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to build deploy calldata (simplified)
function buildDeployCalldata(chainId: JBChainId): `0x${string}` {
  // In production, encode your actual deploy parameters
  return encodeFunctionData({
    abi: jbOmnichainDeployerAbi,
    functionName: 'launchProjectFor',
    args: [/* your deploy args */],
  });
}

// Helper to get explorer URL
function getExplorerUrl(chainId: number): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    10: 'https://optimistic.etherscan.io',
    8453: 'https://basescan.org',
    42161: 'https://arbiscan.io',
  };
  return explorers[chainId] || 'https://etherscan.io';
}
```

## Updating Rulesets Across Chains

Use Relayr to update rulesets on all chains simultaneously:

```tsx
import {
  useGetRelayrTxQuote,
  useSendRelayrTx,
  useGetRelayrTxBundle,
  useSuckers,
  useJBProjectId,
  useJBChainId,
} from 'juice-sdk-react';
import { JB_CHAINS } from 'juice-sdk-core';
import { encodeFunctionData } from 'viem';
import { jbOmnichainDeployer4_1Abi } from 'juice-sdk-core';

function OmnichainRulesetEditor() {
  const projectId = useJBProjectId();
  const currentChainId = useJBChainId();
  const { data: suckers } = useSuckers();
  const { address } = useAccount();

  const { getRelayrTxQuote, data: quote } = useGetRelayrTxQuote();
  const { sendRelayrTx } = useSendRelayrTx();
  const { startPolling, isComplete } = useGetRelayrTxBundle();

  // Get all chain IDs (current + suckers)
  const allChainIds = [
    currentChainId,
    ...(suckers?.map(s => s.peerChainId) || []),
  ];

  async function updateAllRulesets(newRulesetConfig: RulesetConfig) {
    if (!address) return;

    // Build queue ruleset transactions for each chain
    const transactions = allChainIds.map(chainId => {
      const calldata = encodeFunctionData({
        abi: jbOmnichainDeployer4_1Abi,
        functionName: 'queueRulesetsOf',
        args: [
          projectId,
          [newRulesetConfig],
          [], // terminal configs
          'Ruleset update via Relayr',
        ],
      });

      return {
        chainId,
        data: {
          from: address,
          to: JB_CHAINS[chainId].omnichainDeployer,
          value: 0n,
          gas: 200_000n * BigInt(allChainIds.length),
          data: calldata,
        },
      };
    });

    // Get quote
    const result = await getRelayrTxQuote(transactions);

    // User selects payment chain...
    // Then send and poll for completion
  }

  return (
    <div>
      <h3>Update Ruleset on All Chains</h3>
      <p>This will update the ruleset on {allChainIds.length} chains at once.</p>
      {/* Ruleset editor form... */}
    </div>
  );
}
```

## API Reference

### Relayr API Endpoint

```
https://api.relayr.ba5ed.com
```

### Types

```typescript
// Transaction input for quote
type RelayrTransaction = {
  chainId: JBChainId;
  data: {
    from: `0x${string}`;
    to: `0x${string}`;
    value: bigint;
    gas: bigint;
    data: `0x${string}`;
  };
};

// Payment info from quote
type ChainPayment = {
  amount: `0x${string}`;        // Gas cost in wei (hex)
  calldata: `0x${string}`;      // Encoded forward request
  chain: JBChainId;             // Chain ID
  payment_deadline: string;     // Unix timestamp
  target: `0x${string}`;        // ERC-2771 Forwarder address
  token: `0x${string}`;         // Payment token (native)
};

// Bundle response
type RelayrPostBundleResponse = {
  bundle_uuid: string;
  payment_info: ChainPayment[];
  per_txn: { chain: number; gas_cost: string }[];
  txn_uuids: string[];
};

// Bundle status response
type RelayrGetBundleResponse = {
  bundle_uuid: string;
  created_at: string;
  expires_at: string;
  payment: ChainPayment[];
  payment_received: boolean;
  transactions: {
    chain: number;
    status: 'Pending' | 'Included' | 'Completed' | 'Success' | 'Failed';
    txn_hash?: string;
    block_hash?: string;
  }[];
};
```

## Gas Estimation

When building Relayr transactions, estimate gas based on the operation:

| Operation | Recommended Gas |
|-----------|-----------------|
| Deploy project (single chain) | `1,000,000` |
| Deploy project (per additional chain) | `+ 500,000` |
| Queue ruleset (per chain) | `200,000` |
| Deploy suckers | `300,000` |

Example:
```typescript
// Deploying to 4 chains
const gasPerChain = 1_000_000n + (500_000n * BigInt(chainCount - 1));
```

## Best Practices

1. **Always show gas costs**: Display the gas cost for each payment chain option so users can choose the cheapest
2. **Handle failures gracefully**: Individual chain transactions can fail - show status for each
3. **Set appropriate timeouts**: Relayr signatures expire after 48 hours
4. **Estimate gas conservatively**: Better to overestimate than have transactions fail

## Resources

- **Relayr Dashboard**: [relayr.ba5ed.com](https://relayr.ba5ed.com)
- **Relayr Docs**: [relayr-docs-staging.up.railway.app](https://relayr-docs-staging.up.railway.app)
- **Creator**: [@0xba5ed](https://x.com/0xba5ed)
- **SDK Source**: [juice-sdk-v4/packages/react/src/lib/relayr](https://github.com/juicebox-money/juice-sdk-v4/tree/main/packages/react/src/lib/relayr)
