# JBSuckerState
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/enums/JBSuckerState.sol)

Options for the deprecation state of a `JBSucker`.

**Notes:**
- member: ENABLED The `JBSucker` is not deprecated.

- member: DEPRECATION_PENDING The `JBSucker` has a deprecation set, but it is still fully functional.

- member: SENDING_DISABLED The `JBSucker` is deprecated and sending to the pair sucker is disabled.

- member: DEPRECATED The `JBSucker` is deprecated, but it continues to let users claim their funds.


```solidity
enum JBSuckerState {
    ENABLED,
    DEPRECATION_PENDING,
    SENDING_DISABLED,
    DEPRECATED
}
```

