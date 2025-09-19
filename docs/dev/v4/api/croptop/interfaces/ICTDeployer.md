# ICTDeployer
[Git Source](https://github.com/mejango/croptop-core/blob/5d3db1b227bc3b1304f2032a17d2b64e4f748d4f/src/interfaces/ICTDeployer.sol)


## Functions
### CONTROLLER


```solidity
function CONTROLLER() external view returns (IJBController);
```

### DEPLOYER


```solidity
function DEPLOYER() external view returns (IJB721TiersHookProjectDeployer);
```

### PUBLISHER


```solidity
function PUBLISHER() external view returns (ICTPublisher);
```

### deployProjectFor


```solidity
function deployProjectFor(
    address owner,
    JBTerminalConfig[] calldata terminalConfigurations,
    string memory projectUri,
    CTDeployerAllowedPost[] calldata allowedPosts,
    string memory contractUri,
    string memory name,
    string memory symbol,
    bytes32 salt
)
    external
    returns (uint256 projectId, IJB721TiersHook hook);
```

