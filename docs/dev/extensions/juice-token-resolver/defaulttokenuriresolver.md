---
sidebar_position: 2
---

# DefaultTokenUriResolver

[Git Source](https://github.com/jbx-protocol/juice-token-resolver/blob/c700bd075c789c4790d30ba15ea2b31b7fc0791e/src/DefaultTokenUriResolver.sol)

Inherits: [`IJBTokenUriResolver`](/dev/api/interfaces/ijbtokenuriresolver/), [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/), [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable)

## State Variables

### fundingCycleStore

The address of the Juicebox Funding Cycle Store contract.

```solidity
IJBFundingCycleStore public immutable fundingCycleStore;
```

### projects

The address of the Juicebox Projects contract.

```solidity
IJBProjects public immutable projects;
```

### directory

The address of the Juicebox Directory contract.

```solidity
IJBDirectory public immutable directory;
```

### projectHandles

The address of the Juicebox Project Handles contract.

```solidity
IJBProjectHandles public immutable projectHandles;
```

### capsulesTypeface

The address of the Capsules typeface contract.

```solidity
ITypeface public immutable capsulesTypeface;
```

### themes

Mapping containing each project's theme, if one is set. Themes describe the color palette to be used when generating the token uri SVG.

*Theme 0 is the default theme used for all projects without custom themes.*

```solidity
mapping(uint256 => Theme) private themes;
```

## Functions

### constructor

```solidity
constructor(
    IJBOperatorStore _operatorStore,
    IJBDirectory _directory,
    IJBProjectHandles _projectHandles,
    ITypeface _capsulesTypeface
) JBOperatable(_operatorStore);
```

### getTheme

Gets the Theme for a given id in the private themes mapping.

```solidity
function getTheme(uint256 id) external view returns (Theme memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`uint256`|The id of the theme to fetch. This is the project's ID for all values except 0, which is the default theme.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Theme`|Theme The Theme corresponding to the id passed as an argument.|

### getFontSource

Gets the Base64 encoded Capsules-500.otf typeface.

```solidity
function getFontSource() internal view returns (bytes memory fontSource);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fontSource`|`bytes`|The Base64 encoded font file.|

### pad

Transform strings to target length by abbreviating or padding with spaces.

*Shortens long strings to 13 characters including an ellipsis and adds left padding spaces to short strings. Allows variable target length to account for strings that have unicode characters that are longer than 1 byte but only take up 1 character space.*

```solidity
function pad(bool left, string memory str, uint256 targetLength) internal pure returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`left`|`bool`|True adds padding to the left of the passed string, and false adds padding to the right.|
|`str`|`string`|The string to transform.|
|`targetLength`|`uint256`|The length of the string to return.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|string The transformed string.|

### getProjectName

Returns either a project's handle, if set, or a string with the project's ID number if no project handle is found.

```solidity
function getProjectName(uint256 _projectId) internal view returns (string memory projectName);
```

### getTerminalStore

Gets the IJBSingleTokenPaymentTerminalStore for a given project.

```solidity
function getTerminalStore(uint256 _projectId) internal view returns (IJBSingleTokenPaymentTerminalStore);
```

### getRightPaddedCycle

Returns a right-padded string containing the project's current cycle number.

```solidity
function getRightPaddedCycle(JBFundingCycle memory _fundingCycle)
    internal
    pure
    returns (string memory rightPaddedCycleString);
```

### getLeftPaddedTimeLeft

Returns a left-padded string containing the time left in the project's current cycle.

```solidity
function getLeftPaddedTimeLeft(JBFundingCycle memory _fundingCycle)
    internal
    view
    returns (string memory leftPaddedTimeLeftString);
```

### getCycleTimeLeftRow

Returns a string containing the cycle count and time left.

```solidity
function getCycleTimeLeftRow(JBFundingCycle memory fundingCycle)
    internal
    view
    returns (string memory cycleTimeLeftRow);
```

### getBalanceRow

Returns the balance row string.

```solidity
function getBalanceRow(IJBPaymentTerminal primaryEthPaymentTerminal, uint256 _projectId)
    internal
    view
    returns (string memory balanceRow);
```

### getPayouts

Returns a string containing the projects payouts. Used in the JSON metadata.

```solidity
function getPayouts(IJBPaymentTerminal primaryEthPaymentTerminal, uint256 _projectId)
    internal
    view
    returns (string memory payouts);
```

### getPayoutsRow

Returns the payouts row string. Used in the SVG.

```solidity
function getPayoutsRow(IJBPaymentTerminal primaryEthPaymentTerminal, uint256 _projectId)
    internal
    view
    returns (string memory payoutsRow);
```

### getTokenSupplyRow

Returns the token supply row string.

```solidity
function getTokenSupplyRow(uint256 _projectId) internal view returns (string memory tokenSupplyRow);
```

### setTheme

Set theme colors for a given project. Values should be 6 character strings and all letters must be uppercase (e.g, "FFFFFF").

*Available only to project owners or operators with permission to set the token resolver on their behalf.*

```solidity
function setTheme(uint256 _projectId, string memory _textColor, string memory _bgColor, string memory _bgColorAlt)
    external
    requirePermission(projects.ownerOf(_projectId), _projectId, JBUriOperations.SET_TOKEN_URI);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project's ID number.|
|`_textColor`|`string`|The color of the text.|
|`_bgColor`|`string`|The primary background color.|
|`_bgColorAlt`|`string`|The secondary background color.|

### resetTheme

Reset theme for a given project to the default.

*Available only to project owners or operators with permission to set the token resolver on their behalf.*

```solidity
function resetTheme(uint256 _projectId)
    external
    requirePermission(projects.ownerOf(_projectId), _projectId, JBUriOperations.SET_TOKEN_URI);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The project's ID number.|

### setDefaultTheme

Set default theme colors. Values should be 6 character strings and all letters must be uppercase (e.g, "FFFFFF").

*Available only to the owner of this contract.*

```solidity
function setDefaultTheme(string memory _textColor, string memory _bgColor, string memory _bgColorAlt)
    public
    onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_textColor`|`string`|The color of the text.|
|`_bgColor`|`string`|The primary background color.|
|`_bgColorAlt`|`string`|The secondary background color.|

### getOwnerName

Returns a string containing an abbreviated address as a string.

```solidity
function getOwnerName(address owner) internal pure returns (string memory ownerName);
```

### getBalance

Returns a string containing the project's ETH balance.

```solidity
function getBalance(uint256 _projectId, IJBPaymentTerminal primaryEthPaymentTerminal)
    internal
    view
    returns (string memory);
```

### getTokenSupply

Returns a string containing the project's ETH balance.

```solidity
function getTokenSupply(uint256 _projectId) internal view returns (string memory);
```

### getUri

Get the token uri for a project.

*Creates metadata for the given project ID using either the default Theme colors, or custom colors if they are set.*

```solidity
function getUri(uint256 _projectId) external view override returns (string memory tokenUri);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_projectId`|`uint256`|The id of the project.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenUri`|`string`|The token uri for the project.|

### getPartOne

Get SVG part one.

```solidity
function getPartOne(uint256 _projectId, string memory projectName) internal view returns (bytes memory);
```

### getPartTwo

Get SVG part two.

```solidity
function getPartTwo(
    bytes memory _base,
    uint256 _projectId,
    IJBPaymentTerminal _primaryEthPaymentTerminal,
    string memory _projectOwnerPaddedRight,
    address owner
) internal view returns (bytes memory);
```

### getPartThree

Get SVG part three

```solidity
function getPartThree(bytes memory _base, uint256 _projectId) internal view returns (bytes memory);
```

### toAsciiString

Transforms addresses into strings

*borrowed from https://ethereum.stackexchange.com/questions/8346/convert-address-to-string*

```solidity
function toAsciiString(address x) internal pure returns (string memory);
```

### char

Helps toAsciiString function

```solidity
function char(bytes1 b) internal pure returns (bytes1 c);
```

## Events

### ThemeSet

Emitted when a theme is set. Emitted when setting default and custom themes.

```solidity
event ThemeSet(uint256 projectId, Color textColor, Color bgColor, Color bgColorAlt);
```

### ThemeReset

Emitted when a project's custom theme is reset to the default.

```solidity
event ThemeReset(uint256 projectId);
```
