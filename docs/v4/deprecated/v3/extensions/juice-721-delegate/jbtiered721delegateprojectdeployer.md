# JBTiered721DelegateProjectDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/JBTiered721DelegateProjectDeployer.sol)

Inherits: [`JBOperatable`](/v4/deprecated/v3/api/contracts/or-abstract/jboperatable/), [`IJBTiered721DelegateProjectDeployer`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegateprojectdeployer.md)

Deploys a project with an associated tiered 721 delegate.

## State Variables

### directory

The directory of terminals and controllers for projects.

```solidity
IJBDirectory public immutable override directory;
```

### delegateDeployer

The contract responsible for deploying the delegate.

```solidity
IJBTiered721DelegateDeployer public immutable override delegateDeployer;
```

## Functions

### constructor

```solidity
constructor(IJBDirectory _directory, IJBTiered721DelegateDeployer _delegateDeployer, IJBOperatorStore _operatorStore)
    JBOperatable(_operatorStore);
```

**Parameters**

| Name                | Type                                                                                                                 | Description                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `_directory`        | [`IJBDirectory`](/v4/deprecated/v3/api/interfaces/ijbdirectory.md)                                                           | The directory of terminals and controllers for projects. |
| `_delegateDeployer` | [`IJBTiered721DelegateDeployer`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md) | The delegate deployer.                                   |
| `_operatorStore`    | [`IJBOperatorStore`](/v4/deprecated/v3/api/interfaces/ijboperatorstore.md)                                                   | A contract storing operator assignments.                 |

### launchProjectFor

Launches a new project with a tiered 721 delegate attached.

```solidity
function launchProjectFor(
    address _owner,
    JBDeployTiered721DelegateData memory _deployTiered721DelegateData,
    JBLaunchProjectData memory _launchProjectData,
    IJBController3_1 _controller
) external override returns (uint256 projectId);
```

**Parameters**

| Name                           | Type                                                                                                                | Description                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `_owner`                       | `address`                                                                                                           | The address to set as the owner of the project. The project's ERC-721 will be owned by this address. |
| `_deployTiered721DelegateData` | [`JBDeployTiered721DelegateData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md) | Data necessary to deploy the delegate.                                                               |
| `_launchProjectData`           | [`JBLaunchProjectData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jblaunchprojectdata.md)                     | Data necessary to launch the project.                                                                |
| `_controller`                  | [`IJBController3_1`](/v4/deprecated/v3/api/interfaces/ijbcontroller3_1.md)                                                  | The controller with which the funding cycles should be configured.                                   |

**Returns**

| Name        | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| `projectId` | `uint256` | The ID of the newly configured project. |

### launchFundingCyclesFor

Launches funding cycles for a project with an attached delegate.

_Only a project's owner or operator can launch its funding cycles._

```solidity
function launchFundingCyclesFor(
    uint256 _projectId,
    JBDeployTiered721DelegateData memory _deployTiered721DelegateData,
    JBLaunchFundingCyclesData memory _launchFundingCyclesData,
    IJBController3_1 _controller
)
    external
    override
    requirePermission(directory.projects().ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
    returns (uint256 configuration);
```

**Parameters**

| Name                           | Type                                                                                                                | Description                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `_projectId`                   | `uint256`                                                                                                           | The ID of the project for which the funding cycles will be launched. |
| `_deployTiered721DelegateData` | [`JBDeployTiered721DelegateData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md) | Data necessary to deploy a delegate.                                 |
| `_launchFundingCyclesData`     | [`JBLaunchFundingCyclesData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jblaunchfundingcyclesdata.md)         | Data necessary to launch the funding cycles for the project.         |
| `_controller`                  | [`IJBController3_1`](/v4/deprecated/v3/api/interfaces/ijbcontroller3_1.md)                                                  | The controller with which the funding cycles should be configured.   |

**Returns**

| Name            | Type      | Description                                                           |
| --------------- | --------- | --------------------------------------------------------------------- |
| `configuration` | `uint256` | The configuration of the funding cycle that was successfully created. |

### reconfigureFundingCyclesOf

Reconfigures funding cycles for a project with an attached delegate.

_Only a project's owner or operator can configure its funding cycles._

```solidity
function reconfigureFundingCyclesOf(
    uint256 _projectId,
    JBDeployTiered721DelegateData memory _deployTiered721DelegateData,
    JBReconfigureFundingCyclesData memory _reconfigureFundingCyclesData,
    IJBController3_1 _controller
)
    external
    override
    requirePermission(directory.projects().ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
    returns (uint256 configuration);
```

**Parameters**

| Name                            | Type                                                                                                                  | Description                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `_projectId`                    | `uint256`                                                                                                             | The ID of the project for which funding cycles are being reconfigured. |
| `_deployTiered721DelegateData`  | [`JBDeployTiered721DelegateData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md)   | Data necessary to deploy a delegate.                                   |
| `_reconfigureFundingCyclesData` | [`JBReconfigureFundingCyclesData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbreconfigurefundingcyclesdata.md) | Data necessary to reconfigure the funding cycle.                       |
| `_controller`                   | [`IJBController3_1`](/v4/deprecated/v3/api/interfaces/ijbcontroller3_1.md)                                                    | The controller with which the funding cycles should be configured.     |

**Returns**

| Name            | Type      | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| `configuration` | `uint256` | The configuration of the successfully reconfigured funding cycle. |

### \_launchProjectFor

Launches a project.

```solidity
function _launchProjectFor(
    address _owner,
    JBLaunchProjectData memory _launchProjectData,
    IJBTiered721Delegate _dataSource,
    IJBController3_1 _controller
) internal;
```

**Parameters**

| Name                 | Type                                                                                                 | Description                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `_owner`             | `address`                                                                                            | The address to set as the project's owner.                              |
| `_launchProjectData` | [`JBLaunchProjectData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jblaunchprojectdata.md)      | Data needed to launch the project.                                      |
| `_dataSource`        | [`IJBTiered721Delegate`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md) | The data source to set for the project.                                 |
| `_controller`        | [`IJBController3_1`](/v4/deprecated/v3/api/interfaces/ijbcontroller3_1.md)                                   | The controller to be used for configuring the project's funding cycles. |

### \_launchFundingCyclesFor

Launches a funding cycle for a project.

```solidity
function _launchFundingCyclesFor(
    uint256 _projectId,
    JBLaunchFundingCyclesData memory _launchFundingCyclesData,
    IJBTiered721Delegate _dataSource,
    IJBController3_1 _controller
) internal returns (uint256);
```

**Parameters**

| Name                       | Type                                                                                                        | Description                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `_projectId`               | `uint256`                                                                                                   | The project ID to launch a funding cycle for.                  |
| `_launchFundingCyclesData` | [`JBLaunchFundingCyclesData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jblaunchfundingcyclesdata.md) | Data necessary to launch a funding cycle for the project.      |
| `_dataSource`              | [`IJBTiered721Delegate`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)        | The data source to be set for the project.                     |
| `_controller`              | [`IJBController3_1`](/v4/deprecated/v3/api/interfaces/ijbcontroller3_1.md)                                          | The controller to configure the project's funding cycles with. |

**Returns**

| Name     | Type      | Description                                                                         |
| -------- | --------- | ----------------------------------------------------------------------------------- |
| `<none>` | `uint256` | configuration The configuration of the funding cycle that was successfully created. |

### \_reconfigureFundingCyclesOf

Reconfigure funding cycles for a project.

```solidity
function _reconfigureFundingCyclesOf(
    uint256 _projectId,
    JBReconfigureFundingCyclesData memory _reconfigureFundingCyclesData,
    IJBTiered721Delegate _dataSource,
    IJBController3_1 _controller
) internal returns (uint256);
```

**Parameters**

| Name                            | Type                                                                                                                  | Description                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `_projectId`                    | `uint256`                                                                                                             | The ID of the project for which the funding cycles are being reconfigured. |
| `_reconfigureFundingCyclesData` | [`JBReconfigureFundingCyclesData`](/v4/deprecated/v3/extensions/juice-721-delegate/structs/jbreconfigurefundingcyclesdata.md) | Data necessary to reconfigure the project's funding cycles.                |
| `_dataSource`                   | [`IJBTiered721Delegate`](/v4/deprecated/v3/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)                  | The data source to be set for the project.                                 |
| `_controller`                   | [`IJBController3_1`](/v4/deprecated/v3/api/interfaces/ijbcontroller3_1.md)                                                    | The controller to be used for configuring the project's funding cycles.    |

**Returns**

| Name     | Type      | Description                                                       |
| -------- | --------- | ----------------------------------------------------------------- |
| `<none>` | `uint256` | The configuration of the successfully reconfigured funding cycle. |
