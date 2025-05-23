# setIsAllowedToSetFirstController

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBDirectory`](/docs/v4/deprecated/v2/contracts/jbdirectory/README.md)​‌

Interface: [`IJBDirectory`](/docs/v4/deprecated/v2/interfaces/ijbdirectory.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Set a contract to the list of trusted addresses that can set a controller for any project.**

_The owner can add addresses which are allowed to change projects' first controllers._
_These addresses are known and vetted controllers as well as contracts designed to launch new projects._ _A project can set its own controller without it being on the allow list._

_If you would like an address/contract allowlisted, please reach out to the contract owner._

#### Definition

```
function setIsAllowedToSetFirstController(address _address, bool _flag)
  external
  override
  onlyOwner { ... }
```

* Arguments:
  * `_address` is the address to allow or revoke allowance from.
  * `_flag` is whether allowance is being added or revoked.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function overrides a function definition from the [`IJBDirectory`](/docs/v4/deprecated/v2/interfaces/ijbdirectory.md) interface.
* The function returns nothing.

#### Body

1.  Set the allowlist property for the provided address to the flag's value.

    ```
    // Set the flag in the allowlist.
    isAllowedToSetFirstController[_address] = _flag;
    ```

    _Internal references:_

    * [`isAllowedToSetFirstController`](/docs/v4/deprecated/v2/contracts/jbdirectory/properties/isallowedtosetfirstcontroller.md)
2.  Emit a `SetIsAllowedToSetFirstController` event with the relevant parameters.

    ```
    emit SetIsAllowedToSetFirstController(_address, _flag, msg.sender);
    ```

    _Event references:_

    * [`SetIsAllowedToSetFirstController`](/docs/v4/deprecated/v2/contracts/jbdirectory/events/setisallowedtosetfirstcontroller.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Set or revoke a contract to the list of trusted addresses that can set a first controller for any project.

  @dev
  The owner can add addresses which are allowed to change projects' first controllers.
  These addresses are known and vetted controllers as well as contracts designed to launch new projects.
  A project can set its own controller without it being on the allow list.

  @dev
  If you would like an address/contract allowlisted, please reach out to the contract owner.

  @param _address The address to allow or revoke allowance from.
  @param _flag Whether allowance is being added or revoked.
*/
function setIsAllowedToSetFirstController(address _address, bool _flag)
  external
  override
  onlyOwner
{
  // Set the flag in the allowlist.
  isAllowedToSetFirstController[_address] = _flag;

  emit SetIsAllowedToSetFirstController(_address, _flag, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                          | Data                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [**`SetIsAllowedToSetFirstController`**](/docs/v4/deprecated/v2/contracts/jbdirectory/events/setisallowedtosetfirstcontroller.md) | <ul><li><code>address indexed addr</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
