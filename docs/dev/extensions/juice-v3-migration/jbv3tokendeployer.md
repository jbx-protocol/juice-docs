# JBV3TokenDeployer

V3 token deployer which is used by owners of V1 and/or V2 projects to deploy V3 token for their V3 project.

[Git Source](https://github.com/jbx-protocol/juice-v3-migration/blob/06aea3eaf2c25f0981e3cb1c81b903a806872271/contracts/JBV3TokenDeployer.sol)

Mainnet: [`0x6d9899830791de5639C3926C2493c8cC38E6E6C4`](https://etherscan.io/address/0x6d9899830791de5639C3926C2493c8cC38E6E6C4)

Goerli: [`0x90ee867396B2755506E2BD8d92A50Ee777115EA3`](https://goerli.etherscan.io/address/0x90ee867396B2755506E2BD8d92A50Ee777115EA3)

## State Variables

### projectDirectory

The V3 & V2 project directory instance (since both use 1 directory instance)

```solidity
IJBProjects public immutable projectDirectory;
```

### tokenStore

The V3 token store.

```solidity
IJBV3TokenStore public immutable tokenStore;
```

## Functions

### constructor

```solidity
constructor(IJBProjects _projectDirectory, IJBV3TokenStore _tokenStore);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectDirectory`|`IJBProjects`|The V3 & V2 project directory address.|
|`_tokenStore`|`IJBV3TokenStore`|The token store address.|

### deploy

Deploy the V3 token and attach it to a V3 project.

*Only the V3 project owner can deploy the token.*

```solidity
function deploy(
    string calldata _name,
    string calldata _symbol,
    uint256 _projectId,
    ITicketBooth _v1TicketBooth,
    IJBV2TokenStore _v2TokenStore,
    uint256 _v1ProjectId
) external returns (JBV3Token v3Token);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The name of the token.|
|`_symbol`|`string`|The symbol that the token should be represented by.|
|`_projectId`|`uint256`|The V3 ID of the project that this token should exclusively be used for.|
|`_v1TicketBooth`|`ITicketBooth`|V1 Token Booth instance, if V1 migration is desired.|
|`_v2TokenStore`|`IJBV2TokenStore`|V2 Token Store instance, if V2 migration is desired.|
|`_v1ProjectId`|`uint256`|V1 project ID that this token should include.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`v3Token`|`JBV3Token`|The address of the new token.|

## Events

### Deploy

```solidity
event Deploy(uint256 v3ProjectId, address v3Token, address owner);
```

## Errors

### NOT_OWNER

```solidity
error NOT_OWNER();
```
