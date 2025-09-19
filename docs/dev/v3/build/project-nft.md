---
sidebar_position: 3
---

# Project NFT

Anyone can build on the [`JBProjects`](/docs/dev/v3/api/contracts/jbprojects/README.md) NFT contract. This allows developers to write new contracts which use [`JBProjects`](/docs/dev/v3/api/contracts/jbprojects/README.md) NFTs to manage permissions in a standardized way, and allows any project using Juicebox payment terminals to access your contracts, and vice versa.

#### Create a project

Instead of calling [`JBController3_1.launchProjectFor(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchprojectfor) to create a project, configure its first funding cycle, and attach payment terminals and a juicebox controller contract to it in the same transaction, `JBProjects` can be minted independently to represent ownership over projects with subsequent capabilities attached later on.

To create a project, call [`JBProjects.createFor(...)`](/docs/dev/v3/api/contracts/jbprojects/write/createfor.md). The [`JBProjectMetadata`](/docs/dev/v3/api/data-structures/jbprojectmetadata.md) structure allows arbitrary metadata to be mapped to any namespace domain. [juicebox.money](https://juicebox.money) metadata uses a domain of 0 to store its formatted metadata.

```
function createFor(address _owner, JBProjectMetadata calldata _metadata)
  external
  override
  returns (uint256 projectId) { ... }
```

```
struct JBProjectMetadata {
  string content;
  uint256 domain;
}
```

<details>

<summary>View project info</summary>

Launching a project will mint a new NFT in the [`JBProjects`](/docs/dev/v3/api/contracts/jbprojects/README.md) contract. The owner can be found using [`JBProjects.ownerOf(...)`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721-ownerOf-uint256-).

```
function ownerOf(uint256 _projectId) external returns (address owner) { ... }
```

The project's metadata can be found using [`JBProjects.metadataContentOf(...)`](/docs/dev/v3/api/contracts/jbprojects/properties/metadatacontentof.md).

```
function metadataContentOf(uint256 _projectId, uint256 _domain)
  external
  view
  returns (string memory) { ... }
```

</details>

Once a project has been created, new metadata can be added by calling [`JBProjects.metadataContentOf(...)`](/docs/dev/v3/api/contracts/jbprojects/properties/metadatacontentof.md).

```
function setMetadataOf(uint256 _projectId, JBProjectMetadata calldata _metadata)
  external
  override
  requirePermission(ownerOf(_projectId), _projectId, JBOperations.SET_METADATA) { ... }
```

The project can set a new token URI by calling [`JBProjects.setTokenUriResolver(...)`](/docs/dev/v3/api/contracts/jbprojects/write/settokenuriresolver.md).

```
function setTokenUriResolver(IJBTokenUriResolver _newResolver) external override onlyOwner { ... }
```

#### Attaching application-specific functionality

Project owners can configure their first funding cycle for their `JBProject`, attach payment terminals, and set all other standard Juicebox project properties by calling [`JBController3_1.launchFundingCyclesFor(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchfundingcyclesfor).

Most Juicebox protocol contracts are generic utilities for any `JBProject` owner, meaning stored data tends to me mapped from project IDs, and functionality that affects a project tends to be exposed only to the project's owner or a operator address specified by the project's owner.

```
function launchFundingCyclesFor(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] memory _fundAccessConstraints,
  IJBPaymentTerminal[] memory _terminals,
  string calldata _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
  returns (uint256 configuration) { ... }
```
