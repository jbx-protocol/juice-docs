# Permissions

#### What everyone needs to know

* An operator is an address that has been given permission to take one or more actions on another address's behalf.
* Several functions are only available to a project's owner, or to an operator address that the project's owner has set.
* Operator permissions are stored and managed in the [`JBPermissions`](/docs/v4/api/core/JBPermissions.md), where they can be added or revoked at any time by the address being operated on behalf of.
* Operator permissions are expressed in terms of indexes defined in [`JBPermissionIds`](.).
* Operator permissions apply to a specific domain namespace, which is used in the Juicebox ecosystem to allow addresses to give permissions that only apply to a specific project (where the domain is the project's ID). A domain of 0 is a wildcard domain, giving an operator access to an action across all domains for a given address.

#### What you'll want to know if you're building

* Permission indexes can be found in [`JBPermissionIds`](/docs/v4/api/permission-ids/JBPermissionIds.md).
* Any address can give an operator permissions to take one or more actions on its behalf by sending a transaction to [`JBPermissions.setPermissionsFor(...)`](/docs/v4/api/core/JBPermissions.md#setpermissionsfor). 
* Access can be revoked from an operator through the same operations as above by sending an array of permissions that does not include those you wish to revoke.
* [`JBPermissions.hasPermission(...)`](/docs/v4/api/core/JBPermissions.md#haspermission) and [`JBPermissions.hasPermissions(...)`](/docs/v4/api/core/JBPermissions.md#haspermissions) can be used to check if an operator has a particular permission.

#### Operatable functionality

For each project, the following functions can only be accessed by either the address that owns the project's NFT or by operator addresses explicitly allowed by the address that owns the project's NFT. Operators are only valid in the context of a particular owner – if the NFT changes hands, the operators for the project must be set again by the new owner.

An address can set operators for its project with [`JBPermissions.setPermissionsFor(...)`](/docs/v4/api/core/JBPermissions.md#setpermissionsfor), using the indexes from the [`JBPermissionIds`](.) library. An Operator's permissions depend on the specific parameters the admin allows them. Each of the following functions can be called by the admin, and also by any operator that has been granted permission to call the function by the admin.

* [`JBController4_1.launchRulesetsFor(...)`](/docs/v4/api/core/JBController.md#launchrulesetsfor)
* [`JBController4_1.queueRulesetsOf(...)`](/docs/v4/api/core/JBController.md#queuerulesetsof)
* [`JBController4_1.mintTokensOf(...)`](/docs/v4/api/core/JBController.md#minttokensof)
* [`JBController4_1.deployERC20For(...)`](/docs/v4/api/core/JBController.md#deployerc20for)
* [`JBController4_1.setTokenFor(...)`](/docs/v4/api/core/JBController.md#settokenfor)
* [`JBController4_1.setSplitGroupsOf(...)`](/docs/v4/api/core/JBController.md#setsplitgroupsof)
* [`JBController4_1.addPriceFeed(...)`](/docs/v4/api/core/JBController.md#addpricefeed)
* [`JBController4_1.migrate(...)`](/docs/v4/api/core/JBController.md#migrate)
* [`JBController4_1.setUriOf(...)`](/docs/v4/api/core/JBController.md#seturiof)
* [`JBMultiTerminal.addAccountingContextFor(...)`](/docs/v4/api/core/JBMultiTerminal.md#addaccountingcontextsfor)
* [`JBMultiTerminal.useAllowanceOf(...)`](/docs/v4/api/core/JBMultiTerminal.md#useallowanceof)
* [`JBMultiTerminal.migrateBalanceOf(...)`](/docs/v4/api/core/JBMultiTerminal.md#migratebalanceof)
* [`JBMultiTerminal.processHeldFeesOf(...)`](/docs/v4/api/core/JBMultiTerminal.md#processheldfeesof)
* [`JBDirectory.setControllerOf(...)`](/docs/v4/api/core/JBDirectory.md#setcontrollerof)
* [`JBDirectory.setTerminalsOf(...)`](/docs/v4/api/core/JBDirectory.md#setterminalsof.md)
* [`JBDirectory.setPrimaryTerminalOf(...)`](/docs/v4/api/core/JBDirectory.md#setprimaryterminalof.md)

The following transactions can be used by token holders or operator addresses explicitly allowed by the address that owns the tokens. If the tokens change hands, the operators must be set again by the new holder.

* [`JBController4_1.burnTokensOf(...)`](/docs/v4/api/core/JBController.md#burntokensof)
* [`JBMultiTerminal.cashOutTokensOf(...)`](/docs/v4/api/core/JBMultiTerminal.md#cashouttokensof)
* [`JBController4_1.claimTokensOf(...)`](/docs/v4/api/core/JBController.md#claimtokensof)
* [`JBTokens.transferCredits(...)`](/docs/v4/api/core/JBTokens.md#transfercreditsfrom)

