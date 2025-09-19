# Contracts

| Contract | Description |
| --- | --- |
| [**`JBProjects`**](/docs/dev/v3/api/contracts/jbprojects/README.md) | Stores project ownership and identifying information. |
| [**`JBTokenStore`**](/docs/dev/v3/api/contracts/jbtokenstore/README.md) | Manage token minting, burning, and account balances. |
| [**`JBFundingCycleStore`**](/docs/dev/v3/api/contracts/jbfundingcyclestore/README.md) | Manages funding cycle scheduling. |
| [**`JBSplitsStore`**](/docs/dev/v3/api/contracts/jbsplitsstore/README.md) | Stores splits information for all groups of each project. Projects can create split groups for directing percents of a total token allocation to any address, any other Juicebox project, or any contract that inherits from the IJBSplitAllocator interface. |
| [**`JBPrices`**](/docs/dev/v3/api/contracts/jbprices/README.md) | Manages and normalizes price feeds. |
| [**`JBOperatorStore`**](/docs/dev/v3/api/contracts/jboperatorstore/README.md) | Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf. |
| [**`JBDirectory`**](/docs/dev/v3/api/contracts/jbdirectory/README.md) | Keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and funding cycles. |
| [**`JBController3_1`**](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md) | Stitches together funding cycles and project tokens, making sure all activity is accounted for and correct. |
| [**`JBFundAccessConstraintsStore`**](/docs/dev/v3/api/contracts/jbfundaccessconstraintsstore.md) | Information pertaining to how much funds can be accessed by a project from each payment terminal. |
| [**`JBETHPaymentTerminal3_1`**](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1.md) | Manages inflows and outflows of ETH funds into the protocol ecosystem. This contract contains minor inefficiencies. |
| [**`JBETHPaymentTerminal3_1_1`**](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1.md) | Manages inflows and outflows of ETH funds into the protocol ecosystem. This contract contains minor inefficiencies. |
| [**`JBETHPaymentTerminal3_1_2`**](/docs/dev/v3/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_2.md) | Manages inflows and outflows of ETH funds into the protocol ecosystem. This contract contains several improvements over 3_1_1 and 3_1. |
| [**`JBSingleTokenPaymentTerminalStore3_1`**](/docs/dev/v3/api/contracts/jbsingletokenpaymentterminalstore3_1.md) | Manages all bookkeeping for inflows and outflows of funds for `JBETHPaymentTerminal3_1`. |
| [**`JBSingleTokenPaymentTerminalStore3_1_1`**](/docs/dev/v3/api/contracts/jbsingletokenpaymentterminalstore3_1_1.md) | Manages bookkeeping for inflows and outflows of funds for `JBETHPaymentTerminal3_1_1`. |
| [**`JBETHERC20ProjectPayer`**](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayer.md) | Sends ETH or ERC20's to a project treasury as it receives direct payments or has it's functions called. |
| [**`JBETHERC20ProjectPayerDeployer`**](/docs/dev/v3/api/contracts/or-utilities/jbetherc20projectpayerdeployer.md) | Deploys project payer contracts. |
| [**`JBETHERC20SplitsPayer`**](/docs/dev/v3/api/contracts/or-utilities/jbetherc20splitspayer.md) | Sends ETH or ERC20's to a group of splits as it receives direct payments or has its functions called. |
| [**`JBETHERC20SplitsPayerDeployer`**](/docs/dev/v3/api/contracts/or-utilities/jbetherc20splitspayerdeployer.md) | Deploys splits payer contracts. |
