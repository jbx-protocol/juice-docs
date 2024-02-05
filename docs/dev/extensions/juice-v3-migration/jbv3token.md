# JBV3Token

An ERC-20 token that can be used by a project in the `JBTokenStore` & also this takes care of the migration of the V1 & V2 project tokens for V3.

[Git Source](https://github.com/jbx-protocol/juice-v3-migration/blob/06aea3eaf2c25f0981e3cb1c81b903a806872271/contracts/JBV3Token.sol)

Inherits: [`ERC20Permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable), [`ReentrancyGuard`](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard), [`IJBTokenV3`](/dev/api/interfaces/ijbtoken/)

Adheres to:

- [`IJBTokenV3`](/dev/api/interfaces/ijbtoken/): Allows this contract to be used by projects in the JBTokenStore.

Inherits from:

- [`ERC20Permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit): General ERC20 token standard for allowing approvals to be made via signatures.
- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable): Includes convenience functionality for checking a message sender's permissions before executing certain transactions.

## State Variables

### projectId

The ID of the project that this token should be exclusively used for.

```solidity
uint256 public immutable override projectId;
```

### v1TicketBooth

The V1 Token Booth instance.

```solidity
ITicketBooth public immutable v1TicketBooth;
```

### v2TokenStore

The V2 Token Store instance.

```solidity
IJBTokenStore public immutable v2TokenStore;
```

### v1ProjectId

Storing the v1 project ID to migrate to the v3 project ID.

```solidity
uint256 public immutable v1ProjectId;
```

## Functions

### totalSupply

The total supply of this ERC20.

*Includes the V3 token balance as well as unmigrated V1 and V2 balances.*

```solidity
function totalSupply(uint256 _projectId) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|the ID of the project to which the token belongs. This is ignored.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total supply of this ERC20, as a fixed point number.|

### totalSupply

The total supply of this ERC20.

*Includes the V3 token balance as well as unmigrated V1 and V2 balances.*

```solidity
function totalSupply() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total supply of this ERC20, as a fixed point number.|

### balanceOf

An account's balance of this ERC20.

```solidity
function balanceOf(address _account, uint256 _projectId) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account to get a balance of.|
|`_projectId`|`uint256`|is the ID of the project to which the token belongs. This is ignored.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The balance of the `_account` of this ERC20, as a fixed point number with 18 decimals.|

### decimals

The number of decimals included in the fixed point accounting of this token.

```solidity
function decimals() public view override(ERC20, IJBTokenV3) returns (uint8);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The number of decimals.|

### constructor

```solidity
constructor(
    string memory _name,
    string memory _symbol,
    uint256 _projectId,
    ITicketBooth _v1TicketBooth,
    IJBTokenStore _v2TokenStore,
    uint256 _v1ProjectId
) ERC20(_name, _symbol) ERC20Permit(_name);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The name of the token.|
|`_symbol`|`string`|The symbol that the token should be represented by.|
|`_projectId`|`uint256`|The V3 ID of the project that this token should exclusively be used for.|
|`_v1TicketBooth`|`ITicketBooth`|V1 Token Booth instance, if V1 migration is desired.|
|`_v2TokenStore`|`IJBTokenStore`|V2 Token Store instance, if V2 migration is desired.|
|`_v1ProjectId`|`uint256`|V1 project ID that this token should include.|

### mint

Mints more of the token.

*Only the owner of this contract can mint more of it.*

```solidity
function mint(uint256 _projectId, address _account, uint256 _amount) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the token belongs.|
|`_account`|`address`|The account to mint the tokens for.|
|`_amount`|`uint256`|The amount of tokens to mint, as a fixed point number with 18 decimals.|

### burn

Burn some outstanding tokens.

*Only the owner of this contract cant burn some of its supply.*

```solidity
function burn(uint256 _projectId, address _account, uint256 _amount) external override onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the token belongs. This is ignored.|
|`_account`|`address`|The account to burn tokens from.|
|`_amount`|`uint256`|The amount of tokens to burn, as a fixed point number with 18 decimals.|

### approve

Approves an account to spend tokens on the `msg.sender`s behalf.

```solidity
function approve(uint256 _projectId, address _spender, uint256 _amount) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|the ID of the project to which the token belongs. This is ignored.|
|`_spender`|`address`|The address that will be spending tokens on the `msg.sender`s behalf.|
|`_amount`|`uint256`|The amount the `_spender` is allowed to spend.|

### transfer

Transfer tokens to an account.

```solidity
function transfer(uint256 _projectId, address _to, uint256 _amount) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the token belongs. This is ignored.|
|`_to`|`address`|The destination address.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with 18 decimals.|

### transferFrom

Transfer tokens between accounts.

```solidity
function transferFrom(uint256 _projectId, address _from, address _to, uint256 _amount) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The ID of the project to which the token belongs. This is ignored.|
|`_from`|`address`|The originating address.|
|`_to`|`address`|The destination address.|
|`_amount`|`uint256`|The amount of the transfer, as a fixed point number with 18 decimals.|

### migrate

Migrate v1 & v2 tokens to v3.

```solidity
function migrate() external nonReentrant;
```

### _migrateV1Tokens

Migrate V1 tokens to V3.

```solidity
function _migrateV1Tokens() internal returns (uint256 v3TokensToMint);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`v3TokensToMint`|`uint256`|The amount of V1 tokens to be migrated.|

### _migrateV2Tokens

Migrate V2 tokens to V3.

```solidity
function _migrateV2Tokens() internal returns (uint256 v3TokensToMint);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`v3TokensToMint`|`uint256`|The amount of V2 tokens to be migrated.|

## Errors

### BAD_PROJECT

```solidity
error BAD_PROJECT();
```
