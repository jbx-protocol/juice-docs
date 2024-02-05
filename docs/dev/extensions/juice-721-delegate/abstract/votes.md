# Votes

[Git Source](https://github.com/jbx-protocol/juice-721-delegate/blob/6897119af158934bfd920f0f9a55758085111dd3/contracts/abstract/Votes.sol)

This is a base abstract contract that tracks voting units, which are a measure of voting power that can be transferred, and provides a system of vote delegation, where an account can delegate its voting units to a sort of "representative" that will pool delegated voting units from different accounts and can then use it to vote in decisions. In fact, voting units _must_ be delegated in order to count as actual votes, and an account has to delegate those votes to itself if it wishes to participate in decisions and does not have a trusted representative. This contract is often combined with a token contract such that voting units correspond to token units. For an example, see {ERC721Votes}.

The full history of delegate votes is tracked on-chain so that governance protocols can consider votes as distributed at a particular block number to protect against flash loans and double voting. The opt-in delegate system makes the cost of this history tracking optional.

When using this module the derived contract must implement \{\_getVotingUnits\} (for example, make it return \{ERC721-balanceOf\}), and can use \{\_transferVotingUnits\} to track a change in the distribution of those units (in the previous example, it would be included in \{ERC721-\_beforeTokenTransfer\}).

- _Available since v4.5._

## State Variables

### \_delegation

```solidity
mapping(address => address) private _delegation;
```

### \_delegateCheckpoints

```solidity
mapping(address => Checkpoints.History) private _delegateCheckpoints;
```

### \_totalCheckpoints

```solidity
Checkpoints.History private _totalCheckpoints;
```

## Functions

### getVotes

_Returns the current amount of votes that `account` has._

```solidity
function getVotes(address account) public view virtual returns (uint256);
```

### getPastVotes

Returns the amount of votes that `account` had at the end of a past block (`blockNumber`).
Requirements:

- `blockNumber` must have been already mined

```solidity
function getPastVotes(address account, uint256 blockNumber) public view virtual returns (uint256);
```

### getPastTotalSupply

Returns the total supply of votes available at the end of a past block (`blockNumber`).
NOTE: This value is the sum of all available votes, which is not necessarily the sum of all delegated votes.
Votes that have not been delegated are still part of total supply, even though they would not participate in a
vote.
Requirements:

- `blockNumber` must have been already mined

```solidity
function getPastTotalSupply(uint256 blockNumber) public view virtual returns (uint256);
```

### \_getTotalSupply

_Returns the current total supply of votes._

```solidity
function _getTotalSupply() internal view virtual returns (uint256);
```

### delegates

_Returns the delegate that `account` has chosen._

```solidity
function delegates(address account) public view virtual returns (address);
```

### delegate

_Delegates votes from the sender to `delegatee`._

```solidity
function delegate(address delegatee) public virtual;
```

### \_delegate

Delegate all of `account`'s voting units to `delegatee`.
Emits events {DelegateChanged} and {DelegateVotesChanged}.

```solidity
function _delegate(address account, address delegatee) internal virtual;
```

### \_transferVotingUnits

Transfers, mints, or burns voting units. To register a mint, `from` should be zero. To register a burn, `to`
should be zero. Total supply of voting units will be adjusted with mints and burns.

```solidity
function _transferVotingUnits(address from, address to, uint256 amount) internal virtual;
```

### \_moveDelegateVotes

_Moves delegated votes from one delegate to another._

```solidity
function _moveDelegateVotes(address from, address to, uint256 amount) private;
```

### \_add

```solidity
function _add(uint256 a, uint256 b) internal pure returns (uint256);
```

### \_subtract

```solidity
function _subtract(uint256 a, uint256 b) internal pure returns (uint256);
```

### \_getVotingUnits

_Must return the voting units held by an account._

```solidity
function _getVotingUnits(address) internal view virtual returns (uint256);
```

## Events

### DelegateChanged

_Emitted when an account changes their delegate._

```solidity
event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
```

### DelegateVotesChanged

_Emitted when a token transfer or delegate change results in changes to a delegate's number of votes._

```solidity
event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance);
```

## Errors

### SIGNATURE_EXPIRED

```solidity
error SIGNATURE_EXPIRED();
```

### BLOCK_NOT_YET_MINED

```solidity
error BLOCK_NOT_YET_MINED();
```

### INVALID

```solidity
error INVALID();
```
