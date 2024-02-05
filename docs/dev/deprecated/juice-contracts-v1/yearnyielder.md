# YearnYielder

[Git Source](https://github.com/jbx-protocol/juice-contracts-v1/blob/71fd42afb0ef0d51606019d9a17dcb746505efd5/contracts/YearnYielder.sol)

Inherits: [`IYielder`](/docs/dev/deprecated/juice-contracts-v1/interfaces/iyielder.md), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

## State Variables

### wethVault

```solidity
IyVaultV2 public wethVault = IyVaultV2(0xa9fE4601811213c340e850ea305481afF02f5b28);
```

### weth

```solidity
address public weth;
```

### deposited

```solidity
uint256 public override deposited = 0;
```

### decimals

```solidity
uint256 public decimals;
```

## Functions

### constructor

```solidity
constructor(address _weth);
```

### getCurrentBalance

```solidity
function getCurrentBalance() public view override returns (uint256);
```

### deposit

```solidity
function deposit() external payable override onlyOwner;
```

### withdraw

```solidity
function withdraw(uint256 _amount, address payable _beneficiary) public override onlyOwner;
```

### withdrawAll

```solidity
function withdrawAll(address payable _beneficiary) external override onlyOwner returns (uint256 _balance);
```

### updateApproval

*Updates the vaults approval of the token to be the maximum value.*

```solidity
function updateApproval() public;
```

### _sharesToTokens

*Computes the number of tokens an amount of shares is worth.*

```solidity
function _sharesToTokens(uint256 _sharesAmount) private view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sharesAmount`|`uint256`|the amount of shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|the number of tokens the shares are worth.|

### _tokensToShares

*Computes the number of shares an amount of tokens is worth.*

```solidity
function _tokensToShares(uint256 _tokensAmount) private view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokensAmount`|`uint256`|the amount of shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|the number of shares the tokens are worth.|

