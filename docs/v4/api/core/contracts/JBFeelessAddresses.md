# JBFeelessAddresses
[Git Source](https://github.com/Bananapus/nana-core/blob/1fb5688d98a7c6e49f86f6a7e868a61ef4c2409a/src//JBFeelessAddresses.sol)

**Inherits:**
Ownable, [IJBFeelessAddresses](/docs/v4/api/core/interfaces/IJBFeelessAddresses.md), IERC165

Stores a list of addresses that shouldn't incur fees when sending or receiving payments.


## State Variables
### isFeeless
Check if the specified address is feeless.

*Feeless addresses can receive payouts without incurring a fee.*

*Feeless addresses can use the surplus allowance without incurring a fee.*

*Feeless addresses can be the beneficary of cash outs without incurring a fee.*


```solidity
mapping(address addr => bool) public override isFeeless;
```


## Functions
### constructor


```solidity
constructor(address owner) Ownable(owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|This contract's owner.|


### supportsInterface

Indicates whether this contract adheres to the specified interface.

*See [IERC165-supportsInterface](/docs/v4/api/core/contracts/JBDeadline.md#supportsinterface).*


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`interfaceId`|`bytes4`|The ID of the interface to check for adherence to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A flag indicating if the provided interface ID is supported.|


### setFeelessAddress

Sets whether an address is feeless.

*Can only be called by this contract's owner.*


```solidity
function setFeelessAddress(address addr, bool flag) external virtual override onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|The address to set as feeless or not feeless.|
|`flag`|`bool`|Whether the address should be feeless (`true`) or not feeless (`false`).|

