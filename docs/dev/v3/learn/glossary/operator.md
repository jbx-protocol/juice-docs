# Operator

#### What everyone needs to know

* An operator is an address that has been given permission to take one or more actions on another address's behalf.
* Several functions are only available to a project's owner, or to an operator address that the project's owner has set.
* Operator permissions are stored and managed in the [`JBOperatorStore`](/docs/dev/v3/api/contracts/jboperatorstore/README.md), where they can be added or revoked at any time by the address being operated on behalf of.
* Operator permissions are expressed in terms of indexes defined in [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md).
* Operator permissions apply to a specific domain namespace, which is used in the Juicebox ecosystem to allow addresses to give permissions that only apply to a specific project (where the domain is the project's ID). A domain of 0 is a wildcard domain, giving an operator access to an action across all domains.

#### What you'll want to know if you're building

* Permission indexes can be found in [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md), [`JBOperations2`](/docs/dev/v3/api/libraries/jboperations2.md), and [`JBUriOperations`](/docs/dev/v3/extensions/juice-token-resolver/libraries/jburioperations.md). See [Namespaces](/docs/dev/v3/build/namespace.md#operator-permissions) for a list.
* Any address can give an operator permissions to take one or more actions on its behalf by sending a transaction to [`JBOperatorStore.setOperator(...)`](/docs/dev/v3/api/contracts/jboperatorstore/write/setoperator.md). To set multiple operators in the same transaction, use [`JBOperatorStore.setOperators(...)`](/docs/dev/v3/api/contracts/jboperatorstore/write/setoperators.md).
* Access can be revoked from an operator through the same operations as above by sending  an array of permissions that does not include those you wish to revoke.
* Permission for each operation is stored in a bit within an `uint256`. If the bit is 1, the permission is enabled for the particular operator within the particular domain. Otherwise it is disabled.
* [`JBOperatorStore.hasPermission(...)`](/docs/dev/v3/api/contracts/jboperatorstore/read/haspermission.md) and [`JBOperatorStore.hasPermissions(...)`](/docs/dev/v3/api/contracts/jboperatorstore/read/haspermissions.md) can be used to check if an operator has a particular permission.

#### Operatable functionality

For each project, the following functions can only be accessed by either the address that owns the project's NFT or by operator addresses explicitly allowed by the address that owns the project's NFT. Operators are only valid in the context of a particular owner – if the NFT changes hands, the operators for the project must be set again by the new owner.

An address can set operators for its project with [`JBOperatorStore.setOperator(...)`](/docs/dev/v3/api/contracts/jboperatorstore/write/setoperator.md), using the indexes from the [`JBOperations`](/docs/dev/v3/api/libraries/jboperations.md) library. An Operator's permissions depend on the specific parameters the admin allows them. Each of the following functions can be called by the admin, and also by any operator that has been granted permission to call the function by the admin.

* [`JBController3_1.launchFundingCyclesFor(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#launchfundingcyclesfor)
* [`JBController3_1.reconfigureFundingCyclesOf(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#reconfigurefundingcyclesof)
* [`JBController3_1.mintTokensOf(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#minttokensof)
* [`JBTokenStore.issueFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/issuefor.md)
* [`JBController3_1.setFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/setfor.md)
* [`JBController3_1.migrate(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#migrate)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.useAllowanceOf(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#useallowanceof)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.migrate(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#migrate)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.processFees(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#processfees)
* [`JBProjects.setMetadataOf(...)`](/docs/dev/v3/api/contracts/jbprojects/write/setmetadataof.md)
* [`JBSplitsStore.set(...)`](/docs/dev/v3/api/contracts/jbsplitsstore/write/set.md)
* [`JBDirectory.setControllerOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setcontrollerof.md)
* [`JBDirectory.setTerminalsOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setterminalsof.md)
* [`JBDirectory.setPrimaryTerminalOf(...)`](/docs/dev/v3/api/contracts/jbdirectory/write/setprimaryterminalof.md)

The following transactions can be used by token holders or operator addresses explicitly allowed by the address that owns the tokens. If the tokens change hands, the operators must be set again by the new holder.

* [`JBController3_1.burnTokensOf(...)`](/docs/dev/v3/api/contracts/or-controllers/jbcontroller3_1.md#burntokensof)
* [`JBPayoutRedemptionPaymentTerminal3_1_1.redeemTokensOf(...)`](/docs/dev/v3/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal3_1_1.md#redeemtokensof)
* [`JBTokenStore.claimFor(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/claimfor.md)
* [`JBTokenStore.transferFrom(...)`](/docs/dev/v3/api/contracts/jbtokenstore/write/transferfrom.md)
