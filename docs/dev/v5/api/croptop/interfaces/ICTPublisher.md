# ICTPublisher
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/interfaces/ICTPublisher.sol)


## Functions
### FEE_DIVISOR


```solidity
function FEE_DIVISOR() external view returns (uint256);
```

### CONTROLLER


```solidity
function CONTROLLER() external view returns (IJBController);
```

### FEE_PROJECT_ID


```solidity
function FEE_PROJECT_ID() external view returns (uint256);
```

### tierIdForEncodedIPFSUriOf


```solidity
function tierIdForEncodedIPFSUriOf(address hook, bytes32 encodedIPFSUri) external view returns (uint256);
```

### allowanceFor


```solidity
function allowanceFor(
    address hook,
    uint256 category
)
    external
    view
    returns (
        uint256 minimumPrice,
        uint256 minimumTotalSupply,
        uint256 maximumTotalSupply,
        address[] memory allowedAddresses
    );
```

### tiersFor


```solidity
function tiersFor(address hook, bytes32[] memory encodedIPFSUris) external view returns (JB721Tier[] memory tiers);
```

### configurePostingCriteriaFor


```solidity
function configurePostingCriteriaFor(CTAllowedPost[] memory allowedPosts) external;
```

### mintFrom


```solidity
function mintFrom(
    IJB721TiersHook hook,
    CTPost[] memory posts,
    address nftBeneficiary,
    address feeBeneficiary,
    bytes calldata additionalPayMetadata,
    bytes calldata feeMetadata
)
    external
    payable;
```

## Events
### ConfigurePostingCriteria

```solidity
event ConfigurePostingCriteria(address indexed hook, CTAllowedPost allowedPost, address caller);
```

### Mint

```solidity
event Mint(
    uint256 indexed projectId,
    IJB721TiersHook indexed hook,
    address indexed nftBeneficiary,
    address feeBeneficiary,
    CTPost[] posts,
    uint256 postValue,
    uint256 txValue,
    address caller
);
```

