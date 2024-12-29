# Operator

#### What everyone needs to know

* An operator is an address that has been given permission to take one or more actions on another address's behalf.
* Several functions are only available to a project's owner, or to an operator address that the project's owner has set.
* Operator permissions are stored and managed in the [`JBOperatorStore`](/v4/deprecated/v3/api/contracts/jboperatorstore/README.md), where they can be added or revoked at any time by the address being operated on behalf of.
* Operator permissions are expressed in terms of indexes defined in [`JBOperations`](/v4/deprecated/v3/api/libraries/jboperations.md).
* Operator permissions apply to a specific domain namespace, which is used in the Juicebox ecosystem to allow addresses to give permissions that only apply to a specific project (where the domain is the project's ID). A domain of 0 is a wildcard domain, giving an operator access to an action across all domains.

#### What you'll want to know if you're building

* Permission indexes can be found in [`JBOperations`](/v4/deprecated/v3/api/libraries/jboperations.md), [`JBOperations2`](/v4/deprecated/v3/api/libraries/jboperations2/), and [`JBUriOperations`](/v4/deprecated/v3/extensions/juice-token-resolver/libraries/jburioperations/). See [Namespaces](/v4/deprecated/v3/build/namespace/#operator-indices) for a list.
* Any address can give an operator permissions to take one or more actions on its behalf by sending a transaction to [`JBOperatorStore.setOperator(...)`](/v4/deprecated/v3/api/contracts/jboperatorstore/write/setoperator.md). To set multiple operators in the same transaction, use [`JBOperatorStore.setOperators(...)`](/v4/deprecated/v3/api/contracts/jboperatorstore/write/setoperators.md).
* Access can be revoked from an operator through the same operations as above by sending  an array of permissions that does not include those you wish to revoke.
* Permission for each operation is stored in a bit within an `uint256`. If the bit is 1, the permission is enabled for the particular operator within the particular domain. Otherwise it is disabled.
* [`JBOperatorStore.hasPermission(...)`](/v4/deprecated/v3/api/contracts/jboperatorstore/read/haspermission.md) and [`JBOperatorStore.hasPermissions(...)`](/v4/deprecated/v3/api/contracts/jboperatorstore/read/haspermissions.md) can be used to check if an operator has a particular permission.

#### Operatable functionality

For each project, the following functions can only be accessed by either the address that owns the project's NFT or by operator addresses explicitly allowed by the address that owns the project's NFT. Operators are only valid in the context of a particular owner – if the NFT changes hands, the operators for the project must be set again by the new owner.

An address can set operators for its project with [`JBOperatorStore.setOperator(...)`](/v4/deprecated/v3/api/contracts/jboperatorstore/write/setoperator.md), using the indexes from the [`JBOperations`](/v4/deprecated/v3/api/libraries/jboperations.md) library. An Operator's permissions depend on the specific parameters the admin allows them. Each of the following functions can be called by the admin, and also by any operator that has been granted permission to call the function by the admin.

* [`JBController3_1.launchFundingCyclesFor(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#launchfundingcyclesfor)
* [`JBController3_1.reconfigureFundingCyclesOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#reconfigurefundingcyclesof)
* [`JBController3_1.mintTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#minttokensof)
* [`JBTokenStore.issueFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/issuefor.md)
* [`JBController3_1.setFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/setfor.md)
* [`JBController3_1.migrate(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#migrate)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.useAllowanceOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#useallowanceof)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.migrate(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#migrate)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.processFees(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#processfees)
* [`JBProjects.setMetadataOf(...)`](/v4/deprecated/v3/api/contracts/jbprojects/write/setmetadataof.md)
* [`JBSplitsStore.set(...)`](/v4/deprecated/v3/api/contracts/jbsplitsstore/write/set.md)
* [`JBDirectory.setControllerOf(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/write/setcontrollerof.md)
* [`JBDirectory.setTerminalsOf(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/write/setterminalsof.md)
* [`JBDirectory.setPrimaryTerminalOf(...)`](/v4/deprecated/v3/api/contracts/jbdirectory/write/setprimaryterminalof.md)

The following transactions can be used by token holders or operator addresses explicitly allowed by the address that owns the tokens. If the tokens change hands, the operators must be set again by the new holder.

* [`JBController3_1.burnTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-controllers/jbcontroller3_1/#burntokensof)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/v4/deprecated/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1/#redeemtokensof)
* [`JBTokenStore.claimFor(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/claimfor.md)
* [`JBTokenStore.transferFrom(...)`](/v4/deprecated/v3/api/contracts/jbtokenstore/write/transferfrom.md)
