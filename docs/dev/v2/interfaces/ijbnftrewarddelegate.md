# IJBNFTRewardDelegate

#### Code

https://github.com/jbx-protocol/juice-nft-rewards/blob/main/contracts/interfaces/IJBNFTRewardDelegate.sol

#### Definition

```
interface IJBNFTRewardDelegate is ITokenSupplyDetails {
  event SetContractUri(string indexed contractUri, address caller);

  event SetBaseUri(string indexed baseUri, address caller);

  event SetTokenUriResolver(IJBTokenUriResolver indexed newResolver, address caller);

  function projectId() external view returns (uint256);

  function directory() external view returns (IJBDirectory);

  function baseUri() external view returns (string memory);

  function contractUri() external view returns (string memory);

  function tokenUriResolver() external view returns (IJBTokenUriResolver);

  function setContractUri(string calldata _contractMetadataUri) external;

  function setTokenUriResolver(IJBTokenUriResolver _tokenUriResolverAddress) external;

  function setBaseUri(string calldata _baseUri) external;
}
```