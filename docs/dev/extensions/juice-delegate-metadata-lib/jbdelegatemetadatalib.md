# JBDelegateMetadataLib

[Git Source](https://github.com/jbx-protocol/juice-delegate-metadata-lib/blob/da5a4b405dd77812ee819145a5c71885119339d3/src/JBDelegateMetadataLib.sol)

Library to parse and create delegate metadata

Metadata are built as:
- 32B of reserved space for the protocol
- a lookup table `delegateId: offset`, defining the offset of the metadata for each delegate.
The offset fits 1 bytes, the ID 4 bytes. This table is padded to 32B.
- the metadata for each delegate, padded to 32B each
```text
+-----------------------+ offset: 0
| 32B reserved          |
+-----------------------+ offset: 1 = end of first 32B
| (delegate1 ID,offset1)|
| (delegate2 ID,offset2)|
| 0's padding           |
+-----------------------+ offset: offset1 = 1 + number of words taken by the padded table
| delegate 1 metadata1  |
| 0's padding           |
+-----------------------+ offset: offset2 = offset1 + number of words taken by the metadata1
| delegate 2 metadata2  |
| 0's padding           |
+-----------------------+
```

## Functions

### getMetadata

Parse the metadata to find the metadata for a specific delegate

*Returns false and an empty bytes if no metadata is found*

```solidity
function getMetadata(bytes4 _id, bytes calldata _metadata)
    internal
    pure
    returns (bool _found, bytes memory _targetMetadata);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_id`|`bytes4`|            The delegate id to find|
|`_metadata`|`bytes`|      The metadata to parse|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_found`|`bool`|         Whether the metadata was found|
|`_targetMetadata`|`bytes`|The metadata for the delegate|

### addToMetadata

Add a delegate to an existing metadata

```solidity
function addToMetadata(bytes4 _idToAdd, bytes calldata _dataToAdd, bytes calldata _originalMetadata)
    public
    pure
    returns (bytes memory _newMetadata);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_idToAdd`|`bytes4`|        The id of the delegate to add|
|`_dataToAdd`|`bytes`|      The metadata of the delegate to add|
|`_originalMetadata`|`bytes`|The original metadata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_newMetadata`|`bytes`|   The new metadata with the delegate added|

