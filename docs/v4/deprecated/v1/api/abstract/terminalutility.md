# TerminalUtility

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/abstract/TerminalUtility.sol)

Inherits: [`ITerminalUtility`](/docs/v4/deprecated/v1/api/interfaces/iterminalutility.md)

## State Variables

### terminalDirectory

The direct deposit terminals.

```solidity
ITerminalDirectory public immutable override terminalDirectory;
```

## Functions

### onlyTerminal

```solidity
modifier onlyTerminal(uint256 _projectId);
```

### constructor

```solidity
constructor(ITerminalDirectory _terminalDirectory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_terminalDirectory`|[`ITerminalDirectory`](/docs/v4/deprecated/v1/api/interfaces/iterminaldirectory.md)|A directory of a project's current Juicebox terminal to receive payments in.|

