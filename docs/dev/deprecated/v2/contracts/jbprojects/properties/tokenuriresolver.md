# tokenUriResolver

Contract: [`JBProjects`](/dev/deprecated/v2/contracts/jbprojects/README.md)

Interface: [`IJBProjects`](/dev/deprecated/v2/interfaces/ijbprojects.md)

**The contract resolving each project ID to its ERC721 URI.**

#### Definition

```
/**
  @notice
  The contract resolving each project ID to its ERC721 URI.
*/
IJBTokenUriResolver public override tokenUriResolver;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjects`](/dev/deprecated/v2/interfaces/ijbprojects.md) interface.
