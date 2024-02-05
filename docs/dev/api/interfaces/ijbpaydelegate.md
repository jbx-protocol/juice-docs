# IJBPayDelegate

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/interfaces/IJBPayDelegate.sol

#### Definition

```
interface IJBPayDelegate is IERC165 {
  function didPay(JBDidPayData calldata _data) external payable;
}
```
