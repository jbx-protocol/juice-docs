# Permissions

#### What everyone needs to know

* An operator is an address that has been given permission to take one or more actions on another address's behalf.
* Several functions are only available to a project's owner, or to an operator address that the project's owner has set.
* Operator permissions are stored and managed in the [`JBPermissions`](/v4/api/core/contracts/jbpermissions), where they can be added or revoked at any time by the address being operated on behalf of.
* Operator permissions are expressed in terms of indexes defined in [`JBPermissionIds`](.).
* Operator permissions apply to a specific domain namespace, which is used in the Juicebox ecosystem to allow addresses to give permissions that only apply to a specific project (where the domain is the project's ID). A domain of 0 is a wildcard domain, giving an operator access to an action across all domains for a given address.

#### What you'll want to know if you're building

* Permission indexes can be found in [`JBPermissionIds`](.). See [Namespaces](/v4/build/namespace/#permission-ids) for a list.
* Any address can give an operator permissions to take one or more actions on its behalf by sending a transaction to [`JBPermissions.setPermissionsFor(...)`](/v4/api/core/contracts/jbpermissions.md/#setpermissionsfor). 
* Access can be revoked from an operator through the same operations as above by sending an array of permissions that does not include those you wish to revoke.
* [`JBPermissions.hasPermission(...)`](/v4/api/core/contracts/jbpermissions.md/#haspermission) and [`JBPermissions.hasPermissions(...)`](/v4/api/core/contracts/jbpermissions.md/#haspermissions) can be used to check if an operator has a particular permission.

#### Operatable functionality

For each project, the following functions can only be accessed by either the address that owns the project's NFT or by operator addresses explicitly allowed by the address that owns the project's NFT. Operators are only valid in the context of a particular owner – if the NFT changes hands, the operators for the project must be set again by the new owner.

An address can set operators for its project with [`JBPermissions.setPermissionsFor(...)`](/v4/api/core/contracts/jbpermissions.md/#setpermissionsfor), using the indexes from the [`JBPermissionIds`](.) library. An Operator's permissions depend on the specific parameters the admin allows them. Each of the following functions can be called by the admin, and also by any operator that has been granted permission to call the function by the admin.

* [`JBController.launchRulesetsFor(...)`](/v4/api/core/contracts/jbcontroller/#launchrulesetsfor)
* [`JBController.queueRulesetsOf(...)`](/v4/api/core/contracts/jbcontroller/#queuerulesetsof)
* [`JBController.mintTokensOf(...)`](/v4/api/core/contracts/jbcontroller/#minttokensof)
* [`JBTokenStore.issueFor(...)`](/v4/api/core/contracts/jbtokenstore.md/#issuefor.md)
* [`JBController.setFor(...)`](/v4/api/core/contracts/jbtokenstore.md/#setfor.md)
* [`JBController.migrate(...)`](/v4/api/core/contracts/jbcontroller/#migrate)
* [`JBPayoutRedemptionPaymentTerminal.useAllowanceOf(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/#useallowanceof)
* [`JBPayoutRedemptionPaymentTerminal.migrate(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/#migrate)
* [`JBPayoutRedemptionPaymentTerminal.processFees(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/#processfees)
* [`JBProjects.setMetadataOf(...)`](/v4/api/core/contracts/jbprojects.md/#setmetadataof.md)
* [`JBSplitsStore.set(...)`](/v4/api/core/contracts/jbsplitsstore.md/#set.md)
* [`JBDirectory.setControllerOf(...)`](/v4/api/core/contracts/jbdirectory.md/#setcontrollerof.md)
* [`JBDirectory.setTerminalsOf(...)`](/v4/api/core/contracts/jbdirectory.md/#setterminalsof.md)
* [`JBDirectory.setPrimaryTerminalOf(...)`](/v4/api/core/contracts/jbdirectory.md/#setprimaryterminalof.md)

The following transactions can be used by token holders or operator addresses explicitly allowed by the address that owns the tokens. If the tokens change hands, the operators must be set again by the new holder.

* [`JBController.burnTokensOf(...)`](/v4/api/core/contracts/jbcontroller/#burntokensof)
* [`JBPayoutRedemptionPaymentTerminal.redeemTokensOf(...)`](/v4/api/core/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/#redeemtokensof)
* [`JBTokenStore.claimFor(...)`](/v4/api/core/contracts/jbtokenstore.md/#claimfor.md)
* [`JBTokenStore.transferFrom(...)`](/v4/api/core/contracts/jbtokenstore.md/#transferfrom.md)

