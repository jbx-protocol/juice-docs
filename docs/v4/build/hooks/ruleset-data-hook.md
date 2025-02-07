---
sidebar_position: 2
---

# Ruleset Data Hook

A ruleset data hook alters data relavent to inbound payments to a project, or outbound token cash outs from a project. The data hook can specify pay hooks and cash out hooks to run after the regular protocol operations have completed. To build a ruleset data hook, you'll want to implement the [`IJBRulesetDataHook`](/docs/v4/api/core/interfaces/IJBRulesetDataHook.sol/interface.IJBRulesetDataHook.md) interface. 

```javascript
interface IJBRulesetDataHook is IERC165 {
    function hasMintPermissionFor(uint256 projectId, address addr) external view returns (bool flag);

    function beforePayRecordedWith(JBBeforePayRecordedContext calldata context)
        external
        view
        returns (uint256 weight, JBPayHookSpecification[] memory hookSpecifications);

    function beforeCashOutRecordedWith(JBBeforeCashOutRecordedContext calldata context)
        external
        view
        returns (
            uint256 cashOutTaxRate,
            uint256 cashOutCount,
            uint256 totalSupply,
            JBCashOutHookSpecification[] memory hookSpecifications
        );
}
```

Once you've deployed your contract, you can use its address in the `dataHook` field of a [`JBRulesetMetadata`](/docs/v4/api/core/structs/JBRulesetMetadata.sol/struct.JBRulesetMetadata.md) when scheduling a project's rulesets. The data hook's [`IJBRulesetDataHook.beforePayRecordedWith(...)`](/docs/v4/api/core/interfaces/IJBRulesetDataHook.sol/interface.IJBRulesetDataHook.md#beforepayrecordedwith) function will be called with the payment's [`JBBeforePayRecordedContext`](/docs/v4/api/core/structs/JBBeforePayRecordedContext.sol/struct.JBBeforePayRecordedContext.md) automatically when the project receives a payment, and the data hook's [`IJBRulesetDataHook.beforeCashOutRecordedWith(...)`](/docs/v4/api/core/interfaces/IJBRulesetDataHook.sol/interface.IJBRulesetDataHook.md#beforecashoutrecordedwith) function will be called with the cash out's [`JBBeforeCashOutRecordedContext`](/docs/v4/api/core/structs/JBBeforeCashOutRecordedContext.sol/struct.JBBeforeCashOutRecordedContext.md) automatically when the project distributes a cash out.

The data hook's [`IJBRulesetDataHook.hasMintPermissionFor(...)`](/docs/v4/api/core/interfaces/IJBRulesetDataHook.sol/interface.IJBRulesetDataHook.md#hasmintpermissionfor) function can be used to give other contracts the permission to mint a project's tokens on its owner's behalf without any other permission coordination. 


[Learn more about ruleset data hooks](/docs/v4/learn/glossary/ruleset-data-hook.md).
