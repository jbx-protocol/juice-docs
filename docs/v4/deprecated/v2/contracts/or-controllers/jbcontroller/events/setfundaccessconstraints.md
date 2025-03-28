# SetFundAccessConstraints

Emitted from:

* [`_configure`](/docs/v4/deprecated/v2/contracts/or-controllers/jbcontroller/write/-_configure.md)

#### Definition

```
event SetFundAccessConstraints(
  uint256 indexed fundingCycleConfiguration,
  uint256 indexed fundingCycleNumber,
  uint256 indexed projectId,
  JBFundAccessConstraints constraints,
  address caller
);
```

* `fundingCycleConfiguration` is the funding cycle configuration during which the constraints are valid.
* `fundingCycleNumber` is the number of the funding cycle during which the constraints were set.
* `projectId` is the ID of the project who has set an fund access constraints.
* `constraints` is the [`JBFundAccessConstraints`](/docs/v4/deprecated/v2/data-structures/jbfundaccessconstraints.md) data structure.
* `caller` is the address that issued the transaction within which the event was emitted.
