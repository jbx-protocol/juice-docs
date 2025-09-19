# JBMigrationOperator

[Git Source](https://github.com/jbx-protocol/juice-contracts-v3/blob/538df2514294743901858017818a50a2eedd084b/contracts/JBMigrationOperator.sol)

Mainnet: [`0x004d50E8552f7E811E7DF913A3205ABf48E47b52`](https://etherscan.io/address/0x004d50E8552f7E811E7DF913A3205ABf48E47b52)

Goerli: [`0x0Da2f87c14EA33686E0fFAAF56EE1f1f82cA59A9`](https://goerli.etherscan.io/address/0x0Da2f87c14EA33686E0fFAAF56EE1f1f82cA59A9)

---

Allows projects to migrate their controller & terminal to 3.1 version

*The project owner needs to give the migration permission to this contract for carrying out the migrations for both controller & terminal.*

*The current funding cycle needs to be a reconfigured one before migration, so metadata flags allowControllerMigration, allowTerminalMigration & global.allowSetTerminals need to be set true.*

## State Variables

### directory

directory instance which keeps a track of which controller is linked to which project.

```solidity
IJBDirectory public immutable directory;
```

### projects

The NFT granting ownership to a Juicebox project

```solidity
IJBProjects public immutable projects;
```

## Functions

### constructor

```solidity
constructor(IJBDirectory _directory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](/docs/dev/v3/api/interfaces/ijbdirectory.md)|A contract storing directories of terminals and controllers for each project.|

### migrate

Allows project owners to migrate the controller & terminal linked to their project to the latest version

```solidity
function migrate(
    uint256 _projectId,
    IJBMigratable _newController,
    IJBPaymentTerminal _newJbTerminal,
    IJBPayoutRedemptionPaymentTerminal _oldJbTerminal
) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project id whose controller & terminal are to be migrated|
|`_newController`|[`IJBMigratable`](/docs/dev/v3/api/interfaces/ijbmigratable.md)|Controller 3.1 address to migrate to.|
|`_newJbTerminal`|[`IJBPaymentTerminal`](/docs/dev/v3/api/interfaces/ijbpaymentterminal.md)|Terminal 3.1 address to migrate to.|
|`_oldJbTerminal`|`IJBPayoutRedemptionPaymentTerminal`|Old terminal address to migrate from.|

## Errors

### UNAUTHORIZED

```solidity
error UNAUTHORIZED();
```
