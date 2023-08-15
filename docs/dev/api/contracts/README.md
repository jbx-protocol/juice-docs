# Contracts

| Contract | Description |
| --- | --- |
| [**`JBProjects`**](/dev/api/contracts/jbprojects/README.md) | Stores project ownership and identifying information. |
| [**`JBTokenStore`**](/dev/api/contracts/jbtokenstore/README.md) | Manage token minting, burning, and account balances. |
| [**`JBFundingCycleStore`**](/dev/api/contracts/jbfundingcyclestore/README.md) | Manages funding cycle scheduling. |
| [**`JBSplitsStore`**](/dev/api/contracts/jbsplitsstore/README.md) | Stores splits information for all groups of each project. Projects can create split groups for directing percents of a total token allocation to any address, any other Juicebox project, or any contract that inherits from the IJBSplitAllocator interface. |
| [**`JBPrices`**](/dev/api/contracts/jbprices/README.md) | Manages and normalizes price feeds. |
| [**`JBOperatorStore`**](/dev/api/contracts/jboperatorstore/README.md) | Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf. |
| [**`JBDirectory`**](/dev/api/contracts/jbdirectory/README.md) | Keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and funding cycles. |
| [**`JBController3_1`**](/dev/api/contracts/or-controllers/jbcontroller3_1/) | Stitches together funding cycles and project tokens, making sure all activity is accounted for and correct. |
| [**`JBFundAccessConstraintsStore`**](/dev/api/contracts/jbfundaccessconstraintsstore/) | Information pertaining to how much funds can be accessed by a project from each payment terminal. |
| [**`JBETHPaymentTerminal3_1`**](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal3_1/) | Manages inflows and outflows of ETH funds into the protocol ecosystem. This contract contains minor inefficiencies. |
| [**`JBETHPaymentTerminal3_1_1`**](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_1/) | Manages inflows and outflows of ETH funds into the protocol ecosystem. This contract contains minor inefficiencies. |
| [**`JBETHPaymentTerminal3_1_2`**](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal3_1_2/) | Manages inflows and outflows of ETH funds into the protocol ecosystem. This contract contains several improvements over 3_1_1 and 3_1. |
| [**`JBSingleTokenPaymentTerminalStore3_1`**](/dev/api/contracts/jbsingletokenpaymentterminalstore3_1/) | Manages all bookkeeping for inflows and outflows of funds for `JBETHPaymentTerminal3_1`. |
| [**`JBSingleTokenPaymentTerminalStore3_1_1`**](/dev/api/contracts/jbsingletokenpaymentterminalstore3_1_1/) | Manages bookkeeping for inflows and outflows of funds for `JBETHPaymentTerminal3_1_1`. |
| [**`JBETHERC20ProjectPayer`**](/dev/api/contracts/or-utilities/jbetherc20projectpayer/) | Sends ETH or ERC20's to a project treasury as it receives direct payments or has it's functions called. |
| [**`JBETHERC20ProjectPayerDeployer`**](/dev/api/contracts/or-utilities/jbetherc20projectpayerdeployer/) | Deploys project payer contracts. |
| [**`JBETHERC20SplitsPayer`**](/dev/api/contracts/or-utilities/jbetherc20splitspayer/) | Sends ETH or ERC20's to a group of splits as it receives direct payments or has its functions called. |
| [**`JBETHERC20SplitsPayerDeployer`**](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer/) | Deploys splits payer contracts. |
