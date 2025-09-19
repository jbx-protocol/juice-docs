# JBDidPayData

#### Code

https://github.com/jbx-protocol/juice-contracts-v3/blob/main/contracts/structs/JBDidPayData.sol

#### Definition

```
/**
  @member payer The address from which the payment originated.
  @member projectId The ID of the project for which the payment was made.
  @member currentFundingCycleConfiguration The configuration of the funding cycle during which the payment is being made.
  @member amount The amount of the payment. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
  @member forwardedAmount The amount of the payment that is being sent to the delegate. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
  @member projectTokenCount The number of project tokens minted for the beneficiary.
  @member beneficiary The address to which the tokens were minted.
  @member preferClaimedTokens A flag indicating whether the request prefered to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract.
  @member memo The memo that is being emitted alongside the payment.
  @member metadata Extra data to send to the delegate.
*/
struct JBDidPayData {
  address payer;
  uint256 projectId;
  uint256 currentFundingCycleConfiguration;
  JBTokenAmount amount;
  JBTokenAmount forwardedAmount;
  uint256 projectTokenCount;
  address beneficiary;
  bool preferClaimedTokens;
  string memo;
  bytes metadata;
}
```

* `payer` is the address from which the payment originated.
* `projectId` is the ID of the project for which the payment was made.
* `currentFundingCycleConfiguration` is the configuration of the funding cycle during which the payment is being made.
* `amount` is the amount of the payment. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
* `forwardedAmount` is the amount of the payment that is being sent to the delegate. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
* `projectTokenCount` is the number of project tokens minted for the beneficiary.
* `beneficiary` is the address to which the tokens were minted.
* `preferClaimedTokens` is a flag indicating whether the request prefered to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract.
* `memo` is the memo that is being emitted alongside the payment.
* `metadata` is extra data to send to the delegate (see further information below).

#### Metadata

The `metadata` field of `JBDidPayData` can be used by delegates to define custom payment data. For example, [`juice-721-delegate`](/docs/dev/v3/extensions/juice-721-delegate/README.md) uses the metadata to communicate whether overspending should be allowed and which tiers should be minted in [`_processPayment(...)`](/docs/dev/v3/extensions/juice-721-delegate/abstract/jb721delegate.md#_processpayment):

```
...

// Skip the first 32 bytes which are used by the Juicebox protocol to pass the referring project's ID.
// Skip another 32 bytes which are reserved for generic extension parameters.
// Check the 4 byte interfaceId to verify that the metadata is intended for this contract.
if (_data.metadata.length > 68 && bytes4(_data.metadata[64:68]) == type(IJBTiered721Delegate).interfaceId) {
    // Keep a reference to the tier IDs to mint.
    uint16[] memory _tierIdsToMint;

    // Decode the metadata.
    (,,, _allowOverspending, _tierIdsToMint) =
        abi.decode(_data.metadata, (bytes32, bytes32, bytes4, bool, uint16[]));

    // Make sure overspending is allowed if requested.
    if (_allowOverspending && store.flagsOf(address(this)).preventOverspending) {
        _allowOverspending = false;
    }

    // Mint tiers if they were specified.
    if (_tierIdsToMint.length != 0) {
        _leftoverAmount = _mintAll(_leftoverAmount, _tierIdsToMint, _data.beneficiary);
    }
} else if (!store.flagsOf(address(this)).preventOverspending) {
    _allowOverspending = true;
}

...
```

As mentioned in the comments of this function, the first 32 bytes are typically used by the protocol to pass the referring frontend's ID, and the next 32 bytes are reserved for generic extension parameters.
