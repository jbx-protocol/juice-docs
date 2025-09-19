# Governance

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/Governance.sol)

Mainnet: [`0xAc43e14c018490D045a774008648c701cda8C6b3`](https://etherscan.io/address/0xAc43e14c018490D045a774008648c701cda8C6b3)

Inherits: [`JuiceboxProject`](/docs/dev/v1/api/abstract/juiceboxproject.md)

Owner should eventually change to a multisig wallet contract.

## Functions

### constructor

```solidity
constructor(uint256 _projectId, ITerminalDirectory _terminalDirectory)
    JuiceboxProject(_projectId, _terminalDirectory);
```

### allowMigration

Gives projects using one Terminal access to migrate to another Terminal.

```solidity
function allowMigration(ITerminal _from, ITerminal _to) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|[`ITerminal`](/docs/dev/v1/api/interfaces/iterminal.md)|The terminal to allow a new migration from.|
|`_to`|[`ITerminal`](/docs/dev/v1/api/interfaces/iterminal.md)|The terminal to allow migration to.|

### addPriceFeed

Adds a price feed.

```solidity
function addPriceFeed(IPrices _prices, AggregatorV3Interface _feed, uint256 _currency) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_prices`|[`IPrices`](/docs/dev/v1/api/interfaces/iprices.md)|The prices contract to add a feed to.|
|`_feed`|`AggregatorV3Interface`|The price feed to add.|
|`_currency`|`uint256`|The currency the price feed is for.|

### setFee

Sets the fee of the TerminalV1.

```solidity
function setFee(ITerminalV1 _terminalV1, uint256 _fee) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminalV1`|[`ITerminalV1`](/docs/dev/v1/api/interfaces/iterminalv1.md)|The terminalV1 to change the fee of.|
|`_fee`|`uint256`|The new fee.|

### appointGovernance

Appoints a new governance for the specified terminalV1.

```solidity
function appointGovernance(ITerminalV1 _terminalV1, address payable _newGovernance) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminalV1`|[`ITerminalV1`](/docs/dev/v1/api/interfaces/iterminalv1.md)|The terminalV1 to change the governance of.|
|`_newGovernance`|`address payable`|The address to appoint as governance.|

### acceptGovernance

Accepts the offer to be the governance of a new terminalV1.

```solidity
function acceptGovernance(ITerminalV1 _terminalV1) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminalV1`|[`ITerminalV1`](/docs/dev/v1/api/interfaces/iterminalv1.md)|The terminalV1 to change the governance of.|

