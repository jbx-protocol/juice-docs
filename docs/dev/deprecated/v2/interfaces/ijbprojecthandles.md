# IJBProjectHandles

#### Code

https://github.com/jbx-protocol/juice-project-handles/blob/main/contracts/interfaces/IJBProjectHandles.sol

#### Definition

```
interface IJBProjectHandles {
  event SetEnsNameParts(
    uint256 indexed projectId,
    string indexed handle,
    string[] parts,
    address caller
  );

  function setEnsNamePartsFor(uint256 _projectId, string[] memory _parts) external;

  function ensNamePartsOf(uint256 _projectId) external view returns (string[] memory);

  function TEXT_KEY() external view returns (string memory);

  function projects() external view returns (IJBProjects);

  function textResolver() external view returns (ITextResolver);

  function handleOf(uint256 _projectId) external view returns (string memory);
}
```