# JBAddToBalanceMode
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/enums/JBAddToBalanceMode.sol)

Options for how a `JBSucker`'s `amountToAddToBalance` gets added to its project's balance.

**Notes:**
- element: MANUAL The amount gets added to the project's balance manually by calling
`addOutstandingAmountToBalance`.

- element: ON_CLAIM The amount gets added to the project's balance automatically when `claim` is called.


```solidity
enum JBAddToBalanceMode {
    MANUAL,
    ON_CLAIM
}
```

