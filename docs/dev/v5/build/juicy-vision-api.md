---
sidebar_position: 11
title: Juicy Vision API
description: API reference for Juicy Vision - the AI-powered Juicebox interface
keywords: [API, Juicy Vision, AI, chat, payments, smart accounts]
---

# Juicy Vision API

Juicy Vision is an AI-powered interface for interacting with the Juicebox protocol. It provides a conversational interface for creating projects, making payments, and managing treasury operations.

**Base URL:** `https://juicy.vision/api` (production) or `http://localhost:3001/api` (development)

## Authentication

Juicy Vision supports three authentication methods:

### 1. Passkey (Touch ID / Face ID)

Passwordless authentication using WebAuthn. Creates a managed smart account.

```bash
# Get authentication options
GET /api/passkey/authenticate/options

# Verify authentication
POST /api/passkey/authenticate/verify
Content-Type: application/json
{
  "credential": { /* WebAuthn credential response */ }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "walletAddress": "0x..."
    }
  }
}
```

### 2. Wallet (SIWE)

Sign-In With Ethereum for existing wallet users.

```bash
# Get nonce
GET /api/auth/siwe/nonce

# Verify signature
POST /api/auth/siwe/verify
Content-Type: application/json
{
  "message": "Sign this message...",
  "signature": "0x..."
}
```

### 3. Session ID

Anonymous sessions are created automatically via `X-Session-ID` header.

```bash
# Include in all requests for session continuity
X-Session-ID: your-session-id
```

## API Headers

```bash
# Required for all requests
X-Session-ID: <session-id>

# For authenticated users (passkey/managed mode)
Authorization: Bearer <jwt-token>

# For wallet users (SIWE)
X-Wallet-Session: <wallet-session-token>
```

---

## Chat API

### Create Chat

```bash
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Project Discussion",
  "isPrivate": false
}
```

### Send Message

```bash
POST /api/chat/:chatId/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Help me create a crowdfunding project",
  "invokeAi": true
}
```

**Response (streaming):**
```
data: {"type":"message","content":"I'll help you..."}
data: {"type":"tool_use","name":"createProject","input":{...}}
data: {"type":"tool_result","result":{...}}
data: {"type":"done"}
```

### WebSocket Connection

```javascript
const ws = new WebSocket('wss://juicy.vision/api/chat/:chatId/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time messages
};
```

---

## Juice Credits (Stored Value)

Juice credits allow users to pay for AI usage and project contributions without needing crypto.

### Get Balance

```bash
GET /api/juice/balance
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": "25.00",
    "lifetime_purchased": "100.00",
    "lifetime_spent": "75.00"
  }
}
```

### Purchase Juice (Stripe Checkout)

```bash
POST /api/juice/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25.00
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx"
  }
}
```

### Spend Juice (Pay a Project)

```bash
POST /api/juice/spend
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": 1,
  "chainId": 1,
  "amount": 10.00,
  "memo": "Supporting the project"
}
```

---

## Smart Accounts

Managed users get ERC-4337 smart accounts that Juicy Vision operates on their behalf.

### Get Smart Account Address

```bash
GET /api/smart-account/address
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x...",
    "deployed": true,
    "chainId": 1
  }
}
```

### Get Balances

```bash
GET /api/smart-account/balances
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "eth": "0.05",
    "usdc": "100.00",
    "tokens": [
      { "symbol": "JBX", "balance": "1000.00", "projectId": 1 }
    ]
  }
}
```

---

## Identity

Users can set a "Juicy ID" - an emoji + username combo.

### Check Availability

```bash
GET /api/identity/check?emoji=🍋&username=mooch
```

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true
  }
}
```

### Set Identity

```bash
PUT /api/identity/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "emoji": "🍋",
  "username": "mooch"
}
```

### Get Identity

```bash
GET /api/identity/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "emoji": "🍋",
    "username": "mooch",
    "formatted": "🍋 mooch"
  }
}
```

---

## Proxy Endpoints

### Bendystraw GraphQL

Proxy to the Bendystraw indexer for Juicebox data.

```bash
POST /api/proxy/bendystraw
Content-Type: application/json

{
  "query": "query { projects(first: 10) { id name } }"
}
```

### RPC Proxy

JSON-RPC proxy for supported chains.

```bash
POST /api/proxy/rpc/1
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```

**Supported chains:** `1` (mainnet), `10` (optimism), `8453` (base), `42161` (arbitrum)

---

## Health Check

```bash
GET /api/health
```

**Response:**
```json
{
  "name": "Juicy Vision API",
  "version": "0.1.0",
  "status": "healthy"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Missing or invalid auth |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Chat messages | 60/minute |
| AI invocations | 20/minute |
| Juice purchases | 10/hour |
| Identity changes | 5/hour |

---

## WebSocket Events

When connected to a chat WebSocket, you'll receive these event types:

```typescript
type WebSocketEvent =
  | { type: 'message', data: ChatMessage }
  | { type: 'member_joined', data: { address: string } }
  | { type: 'member_left', data: { address: string } }
  | { type: 'typing', data: { address: string } }
  | { type: 'ai_start', data: { messageId: string } }
  | { type: 'ai_token', data: { content: string } }
  | { type: 'ai_done', data: { messageId: string } }
  | { type: 'error', data: { message: string } }
```

---

## See Also

- [AI Agent Integration](./ai.md) - MCP server and Claude Code skills
- [Smart Account Architecture](https://github.com/jbx-protocol/juice-docs-v3) - ERC-4337 implementation details
- [Stripe Integration](https://stripe.com/docs) - Payment processing documentation
