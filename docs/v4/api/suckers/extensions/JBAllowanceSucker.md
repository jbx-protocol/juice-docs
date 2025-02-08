# JBAllowanceSucker
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/extensions/JBAllowanceSucker.sol)

**Inherits:**
[JBSucker](/docs/v4/api/suckers/JBSucker.md)


## Functions
### _pullBackingAssets

Cash out the project tokens for the cash out tokens.


```solidity
function _pullBackingAssets(
    IERC20 projectToken,
    uint256 count,
    address token,
    uint256 minTokensReclaimed
)
    internal
    virtual
    override
    returns (uint256 receivedAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`projectToken`|`IERC20`|the token to cash out.|
|`count`|`uint256`|the amount of project tokens to cash out.|
|`token`|`address`|the token to reclaim.|
|`minTokensReclaimed`|`uint256`|the minimum amount of tokens to receive.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receivedAmount`|`uint256`|the amount of tokens received by cashing out.|


## Errors
### JBAllowanceSucker_NoTerminalForToken

```solidity
error JBAllowanceSucker_NoTerminalForToken(uint256 projectId, address token);
```

### JBAllowanceSucker_TokenNotAccepted

```solidity
error JBAllowanceSucker_TokenNotAccepted(uint256 projectId, address token);
```

