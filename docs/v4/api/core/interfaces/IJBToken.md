# IJBToken
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src/interfaces/IJBToken.sol)


## Functions
### balanceOf


```solidity
function balanceOf(address account) external view returns (uint256);
```

### decimals


```solidity
function decimals() external view returns (uint8);
```

### totalSupply


```solidity
function totalSupply() external view returns (uint256);
```

### initialize


```solidity
function initialize(string memory name, string memory symbol, address owner) external;
```

### burn


```solidity
function burn(address account, uint256 amount) external;
```

### mint


```solidity
function mint(address account, uint256 amount) external;
```

