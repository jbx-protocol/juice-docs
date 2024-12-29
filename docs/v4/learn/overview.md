---
sidebar_position: 1
---

# Overview 

The Juicebox protocol is a **capital formation engine** for tokenized fundraises, revenues, incentives, and financial operations. Below are some of the protocol's most notable features, designed to make treasury management flexible, scalable, and transparent.

---

## Key Features

### Deploy a Project

Juicebox projects are represented by NFTs. Owning this NFT grants the holder full administrative privileges to:
- Configure treasury parameters
- Schedule ruleset changes

**Example: Deploying a New Project**  
To deploy a new Juicebox project, you will:
1. Define the project metadata (e.g., its name, description, and token details).
2. Choose an initial sequence of rulesets that dictate how funds are distributed and tokens are issued.
3. Deploy the project, generating an NFT representing its ownership.

[Learn more about projects](/docs/v4/learn/glossary/project.md)

---

### Schedule Rulesets for a Project
Rulesets define the operational constraints for a project, including how funds are managed, tokens are issued, and payouts are distributed. Each project operates under one active ruleset at a time, with the ability to queue any number of future rulesets at any time.

[Learn more about rulesets](/docs/v4/learn/glossary/ruleset.md)

#### Configurable Ruleset Properties:

| **Property**             | **Description**                                                                                     |
|--------------------------|-----------------------------------------------------------------------------------------------------|
| Start Timestamp          | When the ruleset becomes active.                                                                   |
| Duration                 | How long the ruleset lasts. Changes can only take effect after the current ruleset ends.            |
| Payout Limit             | The maximum funds that can be distributed during a ruleset.                                        |
| Surplus Allowance        | Funds the owner can distribute on-demand.                                                          |
| Weight                   | Determines how many tokens are issued per payment.                                                 |
| Base Currency            | The currency used as the reference for token issuance weight.                                      |
| Weight Cut Percent       | Automatically decreases token issuance weight for subsequent cycles.                               |
| Reserved Percent         | Percentage of newly issued tokens withheld for specific distributions.                             |
| Cash Out Tax Rate        | Determines the percentage of treasury funds token holders can reclaim.                             |
| Approval Hook            | Custom criteria for approving ruleset changes.                                                     |

**Example: Configuring Rulesets**  
A project owner wants to create a ruleset with the following:
- **Start Timestamp**: January 1, 2025, 00:00 UTC
- **Duration**: 30 days
- **Payout Limit**: 100 ETH
- **Surplus Allowance**: 50 ETH
- **Weight/Base Currency**: 1,000 tokens/ETH  
- **Weight Cut Percent**: 10%
- **Reserved Percent**: 20%
- **Approval Hook**: Requires ruleset changes to be submitted at least 7 days in advance.  

This configuration ensures:
1. Fund distribution is capped at 100 ETH during the 30-day period.
2. Any surplus above the payout limit is available for token holders to cash out from, used by the project owner (up to 50 ETH), or held as runway for future rulesets.
3. Token issuance follows a fixed rate of 1,000 tokens per ETH contributed. 20% of newly issued tokens are withheld for the project owner.
4. If the project owner wants to change the next ruleset, they must submit a changes at least 7 days in advance of the current ruleset ending. Otherwise, the current ruleset will cycle over to another 30 day ruleset with identical properties except a weight of 900 tokens/ETH (10% fewer).

---

### Issue Tokens
Projects issue tokens when treasury payments are received. By default:
- Tokens are accounted for within the Juicebox protocol as non-ERC-20 credits.
- The project owner can optionally issue ERC-20 tokens at any time after the project is deployed, which credit holders can then claim.

**Example: Issuing Tokens**  
- A contributor sends 2 ETH to the project’s treasury.  
- The current ruleset has a **weight** of 500 tokens/ETH, and a **reserved percent** of 20%.  
- The contributor receives 800 project tokens as credits.  

If the project later issues an ERC-20 token:
1. The contributor can claim 800 ERC-20 tokens in exchange for their credits.
2. These ERC-20 tokens can be freely traded or used in other DeFi protocols.

[Learn more about tokens](/docs/v4/learn/glossary/tokens.md)

---

### Payout Splits and Reserved Token Splits
Projects can pre-program how funds and tokens are distributed within a ruleset's payout limit and reserved token allocation:
- **Payout Splits**: Define how treasury payouts are distributed to external addresses, other Juicebox projects, or split hook contracts.
- **Reserved Token Splits**: Specify how newly issued reserved tokens are allocated to contributors, other projects, or split hook contracts.

**Example: Using Splits**  
A project owner defines the following splits:
1. **Payout Splits**:
   - 50% of funds go to a development team wallet.
   - 30% of funds are directed to another Juicebox project.
   - 20% of funds are distributed to a community fund.  

2. **Reserved Token Splits**:
   - 40% of reserved tokens are allocated to a marketing wallet.
   - 60% are distributed proportionally among key contributors.

With a weight of 1000 tokens/ETH, a payout limit of 10 ETH, and a reserved percent of 20%:

When 1 ETH is paid to the project, 200 reserved tokens are allocated.

The 1 ETH can immediately be distributed:
- 0.5 ETH goes to the development team.
- 0.3 ETH goes to the linked Juicebox project.
- 0.2 ETH goes to the community fund.

The 200 reserved tokens can also be distributed:
- 80 reserved tokens go to the marketing wallet.
- 120 reserved tokens go to the key contributors.

When another 10 ETH is paid to the project, 2000 reserved tokens are allocated.

9 ETH can immediately be distributed, totaling the payout limit of 10 ETH.
- 4.5 ETH goes to the development team.
- 2.7 ETH goes to the linked Juicebox project.
- 1.8 ETH goes to the community fund.

The 2000 reserved tokens can also be distributed:
- 800 reserved tokens go to the marketing wallet.
- 1200 reserved tokens go to the key contributors.

The remaining 1 ETH is held as surplus, and can be distributed to the project owner if a surplus allowance is set, cashed out by token holders if the ruleset allows, or held as runway for future rulesets. Any other incoming ETH adds to the surplus.

[Learn more about splits](/docs/v4/learn/glossary/splits.md)

---

### Omnichain Operations
Juicebox supports projects operating across multiple EVM-compatible chains. Projects can:
- Issue their unified token and receive funds on any supported chain.
- Move tokens and treasury funds proportionally between chains.

**Example: Omnichain Use Case**  
An project collects funds on Ethereum and Base:
1. A contributor pays the project's first funds on Ethereum and receives 1,000 tokens.  
2. The contributor bridges 500 tokens to Base.  
3. 50% of the project’s Ethereum treasury funds are moved to Base automatically.

- **Pro Tip**: Projects must synchronize rulesets across chains to ensure consistent operations or intentionally design unique rulesets for each chain.

[Learn more about omnichain](/docs/v4/learn/glossary/omnichain.md)

---

### Custom Treasury Strategies
Projects can use custom hooks to extend or override default treasury behavior:
- **[`IJBRulesetDataHook`](/docs/v4/api/core/interfaces/IJBRulesetDataHook.md)**: Define custom logic for fund receipts or token cash-outs.
- **[`IJBPayHook`](/docs/v4/api/core/interfaces/IJBPayHook.md)**: Define custom logic for what happens when a payment is received.
- **[`IJBCashOutHook`](/docs/v4/api/core/interfaces/IJBCashOutHook.md)**: Define custom logic for what happens when a token holder cashes out their tokens.
- **[`IJBSplitHook`](/docs/v4/api/core/interfaces/IJBSplitHook.md)**: Define custom logic for what happens when a payout split or reserved token split is triggered.
- **[`IJBRulesetApprovalHook`](/docs/v4/api/core/interfaces/IJBRulesetApprovalHook.md)**: Enforce criteria like governance approvals before ruleset changes.

**Example: Custom Hook Implementation**  
A project uses a data hook and pay hook to:
1. Mint an NFT as a reward for every payment received.  
2. Forward incoming funds to buyback project tokens from the open market instead of issuing new tokens if it offers a better rate.

This ensures contributors are rewarded with NFTs and recieve the most project tokens possible from their contributions.

[Learn more about hooks](/docs/v4/learn/glossary/hooks.md)
