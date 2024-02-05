# V2Allocator

Juicebox split allocator for allocating V2 treasury funds to a V3 treasury.

[Git Source](https://github.com/jbx-protocol/juice-v3-migration/blob/06aea3eaf2c25f0981e3cb1c81b903a806872271/contracts/V2Allocator.sol)

Mainnet: [`0x6aaF7afeF64c6852EE507876f9D25F92bd9A1aE7`](https://etherscan.io/address/0x6aaF7afeF64c6852EE507876f9D25F92bd9A1aE7)

Goerli: [`0xBA8a866Dd1f7195dB6205d3b8826273ba1EF49cc`](https://goerli.etherscan.io/address/0xBA8a866Dd1f7195dB6205d3b8826273ba1EF49cc)

Inherits: [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165), [`IJBSplitAllocator`](/dev/api/interfaces/ijbsplitallocator/)


Adheres to:

- [`IJBSplitAllocator`](/dev/api/interfaces/ijbsplitallocator/): Adhere to Allocator pattern to receive payout distributions for allocation.

Inherits from:

- [`ERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165): Introspection on interface adherance.

## State Variables

### directory

The V3 directory address.

```solidity
IJBDirectory public immutable directory;
```

## Functions

### constructor

```solidity
constructor(IJBDirectory _directory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_directory`|`IJBDirectory`|The V3 directory address.|

### allocate

Allocate hook that will transfer treasury funds to V3.

```solidity
function allocate(JBSplitAllocationData calldata _data) external payable override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|`JBSplitAllocationData`|The allocation config which specifies the destination of the funds.|

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) public view override(IERC165, ERC165) returns (bool);
```

## Errors

### TERMINAL_NOT_FOUND

```solidity
error TERMINAL_NOT_FOUND();
```
