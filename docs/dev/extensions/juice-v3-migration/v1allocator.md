# V1Allocator

Juicebox split allocator for allocating V1 treasury funds to a V3 treasury

[Git Source](https://github.com/jbx-protocol/juice-v3-migration/blob/06aea3eaf2c25f0981e3cb1c81b903a806872271/contracts/V1Allocator.sol)

Mainnet: [`0x1eb759829b1a3d55193472142f18df3091BcAc4B`](https://etherscan.io/address/0x1eb759829b1a3d55193472142f18df3091BcAc4B)

Goerli: [`0x8d9E7ef328A6aa45890Aa9751D45D66a4fd34447`](https://goerli.etherscan.io/address/0x8d9E7ef328A6aa45890Aa9751D45D66a4fd34447)

Inherits: [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165), [`IModAllocator`](https://github.com/jbx-protocol/juice-contracts-v1/blob/main/contracts/interfaces/IModAllocator.sol)

Adheres to:

- [`IModAllocator`](https://github.com/jbx-protocol/juice-contracts-v1/blob/main/contracts/interfaces/IModAllocator.sol): Adhere to Allocator pattern to receive payout distributions for allocation.

Inherits from:

- [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165): Introspection on interface adherance.

## State Variables

### directory

The V3 directory address.

```solidity
IJBDirectoryV3 public immutable directory;
```

## Functions

### constructor

```solidity
constructor(IJBDirectoryV3 _directory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|`IJBDirectoryV3`|The V3 directory address.|

### allocate

Allocate hook that will transfer treasury funds to V3.

```solidity
function allocate(uint256 _projectId, uint256 _forProjectId, address _beneficiary) external payable override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project ID where the funds are being transferred from. This is unused.|
|`_forProjectId`|`uint256`|The project ID where the funds will be transferred to.|
|`_beneficiary`|`address`|The address that should be the beneficiary of the allocation. This is unused.|

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) public view override returns (bool);
```

## Errors

### TERMINAL_NOT_FOUND

```solidity
error TERMINAL_NOT_FOUND();
```
