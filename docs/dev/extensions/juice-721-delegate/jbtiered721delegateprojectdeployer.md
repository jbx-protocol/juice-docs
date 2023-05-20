# JBTiered721DelegateProjectDeployer

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/331ed61b7ae1a4c4536bcd78f5e0b7d4a67c2869/contracts/JBTiered721DelegateProjectDeployer.sol)

Mainnet: [`0xB8bc7d74C0CFe75d93C0844D3f49679dcc86f477`](https://etherscan.io/address/0xB8bc7d74C0CFe75d93C0844D3f49679dcc86f477)

Goerli: [`0xba89412849C354AE4350F2c339bFc0720EDB7C7B`](https://goerli.etherscan.io/address/0xba89412849C354AE4350F2c339bFc0720EDB7C7B)

Inherits: [`JBOperatable`](/), [`IJBTiered721DelegateProjectDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegateprojectdeployer.md)

Deploys a project with a tiered tier delegate.

Adheres to -
- [`IJBTiered721DelegateProjectDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegateprojectdeployer.md):  General interface for the generic controller methods in this contract that interacts with funding cycles and tokens according to the protocol's rules.

Inherits from -
- [`JBOperatable`](/):  Several functions in this contract can only be accessed by a project owner, or an address that has been preconfigured to be an operator of the project.

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

|Name|Type|Description|
|----|----|-----------|
|`_directory`|[`IJBDirectory`](/docs/dev/api/interfaces/ijbdirectory.md)|The directory of terminals and controllers for projects.|
|`_delegateDeployer`|[`IJBTiered721DelegateDeployer`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegatedeployer.md)|The deployer of delegates.|
|`_operatorStore`|[`IJBOperatorStore`](/docs/dev/api/interfaces/ijboperatorstore.md)|A contract storing operator assignments.|

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

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The address to set as the owner of the project. The project ERC-721 will be owned by this address.|
|`_deployTiered721DelegateData`|[`JBDeployTiered721DelegateData`](/docs/dev/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md)|Data necessary to fulfill the transaction to deploy a delegate.|
|`_launchProjectData`|[`JBLaunchProjectData`](/docs/dev/extensions/juice-721-delegate/structs/jblaunchprojectdata.md)|Data necessary to fulfill the transaction to launch a project.|
|`_controller`|[`IJBController3_1`](/docs/dev/api/interfaces/ijbcontroller3_1.md)|The controller with which the funding cycles should be configured.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`projectId`|`uint256`|The ID of the newly configured project.|

### launchFundingCyclesFor

Launches funding cycle's for a project with a delegate attached.

*Only a project owner or operator can launch its funding cycles.*

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

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having funding cycles launched.|
|`_deployTiered721DelegateData`|[`JBDeployTiered721DelegateData`](/docs/dev/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md)|Data necessary to fulfill the transaction to deploy a delegate.|
|`_launchFundingCyclesData`|[`JBLaunchFundingCyclesData`](/docs/dev/extensions/juice-721-delegate/structs/jblaunchfundingcyclesdata.md)|Data necessary to fulfill the transaction to launch funding cycles for the project.|
|`_controller`|[`IJBController3_1`](/docs/dev/api/interfaces/ijbcontroller3_1.md)|The controller with which the funding cycles should be configured.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`uint256`|The configuration of the funding cycle that was successfully created.|

### reconfigureFundingCyclesOf

Reconfigures funding cycles for a project with a delegate attached.

*Only a project's owner or a designated operator can configure its funding cycles.*

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

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having funding cycles reconfigured.|
|`_deployTiered721DelegateData`|[`JBDeployTiered721DelegateData`](/docs/dev/extensions/juice-721-delegate/structs/jbdeploytiered721delegatedata.md)|Data necessary to fulfill the transaction to deploy a delegate.|
|`_reconfigureFundingCyclesData`|[`JBReconfigureFundingCyclesData`](/docs/dev/extensions/juice-721-delegate/structs/jbreconfigurefundingcyclesdata.md)|Data necessary to fulfill the transaction to reconfigure funding cycles for the project.|
|`_controller`|[`IJBController3_1`](/docs/dev/api/interfaces/ijbcontroller3_1.md)|The controller with which the funding cycles should be configured.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`uint256`|The configuration of the funding cycle that was successfully reconfigured.|

### _launchProjectFor

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

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The address to set as the owner of the project.|
|`_launchProjectData`|[`JBLaunchProjectData`](/docs/dev/extensions/juice-721-delegate/structs/jblaunchprojectdata.md)|Data necessary to fulfill the transaction to launch the project.|
|`_dataSource`|[`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)|The data source to set.|
|`_controller`|[`IJBController3_1`](/docs/dev/api/interfaces/ijbcontroller3_1.md)|The controller with which the funding cycles should be configured.|

### _launchFundingCyclesFor

Launches funding cycles for a project.

```solidity
function _launchFundingCyclesFor(
    uint256 _projectId,
    JBLaunchFundingCyclesData memory _launchFundingCyclesData,
    IJBTiered721Delegate _dataSource,
    IJBController3_1 _controller
) internal returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having funding cycles launched.|
|`_launchFundingCyclesData`|[`JBLaunchFundingCyclesData`](/docs/dev/extensions/juice-721-delegate/structs/jblaunchfundingcyclesdata.md)|Data necessary to fulfill the transaction to launch funding cycles for the project.|
|`_dataSource`|[`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)|The data source to set.|
|`_controller`|[`IJBController3_1`](/docs/dev/api/interfaces/ijbcontroller3_1.md)|The controller with which the funding cycles should be configured.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|configuration The configuration of the funding cycle that was successfully created.|

### _reconfigureFundingCyclesOf

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

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project having funding cycles launched.|
|`_reconfigureFundingCyclesData`|[`JBReconfigureFundingCyclesData`](/docs/dev/extensions/juice-721-delegate/structs/jbreconfigurefundingcyclesdata.md)|Data necessary to fulfill the transaction to launch funding cycles for the project.|
|`_dataSource`|[`IJBTiered721Delegate`](/docs/dev/extensions/juice-721-delegate/interfaces/ijbtiered721delegate.md)|The data source to set.|
|`_controller`|[`IJBController3_1`](/docs/dev/api/interfaces/ijbcontroller3_1.md)|The controller with which the funding cycles should be configured.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The configuration of the funding cycle that was successfully reconfigured.|

