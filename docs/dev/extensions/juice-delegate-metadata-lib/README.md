# JBDelegateMetadataLib

:::info
This is the README from the [`juice-delegate-metadata-lib`](https://github.com/jbx-protocol/juice-delegate-metadata-lib) repository.
:::

## Description

This library allows to store metadata for delegates. It allows to store metadata for a large number of delegates, and to retrieve the metadata for a specific delegate, using a lookup table.

## Delegate ID

Each new delegate should define a 4 byte ID used to retrieve its metadata. This ID should be unique. We suggest using the first 4 bytes of the code keccak256 hash (using `cast k $bytecode` or `emit log_bytes32(keccak256(type(MyDelegate).creationCode));` for instance).

## Metadata structure

Metadata are built as:
- 32B of reserved space for the protocol (left empty)
- a lookup table `delegateId: offset`, defining the offset of the metadata for each delegate.
  The offset fits 1 bytes and is the number of word since the begining of the metadata.
  The ID fits 4 bytes. This table is padded to 32B.
- the metadata for each delegate, padded to 32B each

```
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
   +-----------------------+ (...)
```

## Usage

Delegate should parse their metadata using the `getMetadata` function, which takes the delegate id as parameter and returns the metadata as a bytes array.

Frontend should use the helper contract to build metadatas. The `createMetadata` function takes an array of delegate ids and an array of data, which can be any data type casted to bytes, and returns the encoded metadata.
