---
sidebar_position: 2
---

# Project Metadata

Juicebox project metadata (such as a project's name, logo, and description) are stored on [IPFS](https://ipfs.tech/), and can be accessed through a [public IPFS gateway](https://ipfs.github.io/public-gateway-checker/) or a dedicated gateway (from [Infura](https://www.infura.io/), [Cloudflare](https://developers.cloudflare.com/web3/ipfs-gateway/), or another provider). For production applications, a dedicated gateway is recommended.

To learn more about IPFS, visit the [IPFS docs](https://docs.ipfs.tech/).

## Juicebox v2/v3

A project's metadata IPFS hash can be found by accessing the [`JBProjects.metadataContentOf(...)`](/docs/dev/v3/api/contracts/jbprojects/properties/metadatacontentof.md) property, which takes two arguments:

- `_projectId` is the ID of the project to which the metadata belongs.
- `_domain` is the **domain within which the metadata applies.**

As of 2023-04-13, all projects store their metadata within domain `0`, but future frontends or contracts with unique metadata needs might consider utilizing new domains.

If one calls [`JBProjects.metadataContentOf(...)`](/docs/dev/v3/api/contracts/jbprojects/properties/metadatacontentof.md) with `_projectId` as `1` and `_domain` as `0`, the contract will return the IPFS hash `QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF`.

Now, one can navigate to an IPFS endpoint to read the project's metadata:

```json
{
  "name": "JuiceboxDAO",
  "description": "Supports projects built using the Juicebox protocol, and the development of the protocol itself. All projects withdrawing funds from their treasury pay a 2.5% membership fee and receive JBX at the current issuance rate. JBX members govern the NFT that represents ownership over this treasury.",
  "logoUri": "https://jbx.mypinata.cloud/ipfs/QmWXCt1zYAJBkNb7cLXTNRNisuWu9mRAmXTaW9CLFYkWVS",
  "infoUri": "https://snapshot.org/#/jbdao.eth",
  "twitter": "juiceboxETH",
  "discord": "https://discord.gg/W9mTVG4QhD",
  "payButton": "Add juice",
  "tokens": [],
  "version": 4
}
```

See it yourself at [`https://ipfs.io/ipfs/QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF`](https://ipfs.io/ipfs/QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF).

## Juicebox v1

To access a v1 Juicebox project's metadata, call [`Projects.uriOf(...)`](https://etherscan.io/token/0x9b5a4053ffbb11ca9cd858aaee43cc95ab435418#readContract#F16) passing the relevant project ID.

For example, calling this function with a projectId of `1` returns the IPFS hash `QmYvwWN9tAXZsw6VkexE19eFRyP6Y8bak7WxfGABQiVjUB`. Accessing this hash on a [public gateway](https://ipfs.io/ipfs/QmYvwWN9tAXZsw6VkexE19eFRyP6Y8bak7WxfGABQiVjUB) returns:

```json
{
  "name": "JuiceboxDAO v1",
  "description": "Supports projects built using the Juicebox protocol, and the development of the protocol itself. All projects withdrawing funds from their treasury pay a 2.5% membership fee and receive JBX at the current issuance rate. JBX members govern the NFT that represents ownership over this treasury.",
  "logoUri": "https://jbx.mypinata.cloud/ipfs/QmWXCt1zYAJBkNb7cLXTNRNisuWu9mRAmXTaW9CLFYkWVS",
  "infoUri": "https://snapshot.org/#/jbdao.eth",
  "twitter": "juiceboxETH",
  "discord": "https://discord.gg/W9mTVG4QhD",
  "payButton": "Add juice",
  "tokens": [],
  "version": 4
}
```

## Accessing Metadata via the Subgraph

Project metadata can also be accessed via the [Juicebox Subgraph](../subgraph). The query:

```graphql
query MyProjectMetadata{
  projects(where: {id: "2-1"}){
    metadataUri
  }
}
```

Will return the following JSON data:

```json
{
  "data": {
    "projects": [
      {
        "metadataUri": "QmQHGuXv7nDh1rxj48HnzFtwvVxwF1KU9AfB6HbfG8fmJF"
      }
    ]
  }
}
```

Note that for v2 projects, the Subgraph will only return metadata for domain `0`.

## Metadata JSON Schema

The metadata schemas below are used on [juicebox.money](https://juicebox.money). Note that all fields can be user-defined, and are not guaranteed to exist. When reading project metadata, take care to properly sanitize and process the results.

The most recent JSON schema (version 9):

| Field | Description |
| --- | --- |
| `name` | The project's name. Required when creating a project on [juicebox.money](https://juicebox.money). |
| `description` | The project's description, in HTML. |
| `logoUri` | The URI/URL of the project's logo image (usually hosted on the IPFS network). |
| `coverImageUri` | The URI/URL of the project's cover image (usually hosted on the IPFS network). |
| `infoUri` | The URI/URL of the project's website. |
| `twitter` | The project's Twitter *handle* (**not** the full URL). |
| `discord` | An invite link to the project's Discord server. |
| `telegram` | An invite link to the project's Telegram group/channel. |
| `tokens` | An array containing tokens to be shown under the project owner's assets on [juicebox.money](https://juicebox.money). |
| `value` | (Within a `token` object) the token's address. |
| `type` | (Within a `token` object) the token's standard (such as `erc20`). |
| `tags` | An array of project tags. |
| `nftPaymentSuccessModal` | An object defining the modal displayed to a user after purchasing one of the project's NFTs on [juicebox.money](https://juicebox.money). Contains `content`, a `ctaText`, and a `ctaLink`. |
| `content` | (Within the `nftPaymentSuccessModal` object) the modal's text. |
| `ctaText` | (Within the `nftPaymentSuccessModal` object) the text on the modal's CTA button. |
| `ctaLink` | (Within the `nftPaymentSuccessModal` object) where the modal's CTA button links to. |
| `version` | The version number of the project's JSON structure. |
| `payButton` | The text displayed on the project's payment button on [juicebox.money](https://juicebox.money). |
| `payDisclosure` | The text displayed to users before paying the project on [juicebox.money](https://juicebox.money). |
| `projectTagline` | A short tagline displayed prominently on [juicebox.money](https://juicebox.money). |

<details>

<summary>Previous JSON Schema Versions</summary>

### Version 1

Example: Project `1-3`, hash [`QmZEJZDouDgPUBBbnYhmRzDwNH7SYHDWTF22XmyE6kb6kb`](https://ipfs.io/ipfs/QmZEJZDouDgPUBBbnYhmRzDwNH7SYHDWTF22XmyE6kb6kb)

```json
{
  "name": "Web3DAO",
  "logoUri": "https://gateway.pinata.cloud/ipfs/QmXsGGtJytXrAGmwDvcsZQKZX8TGtnXvFWSQ1Ao66VJTsd",
  "infoUri": "web3dao.io",
  "description": "Web3DAO is the Web3's own gallery, where you can own and trade iconic moments in Web3 history. We're an experiment in making a bright future for a fun Web3. \n\nWebsite(web3dao.io) coming soon, and we will airdrop limited edition NFT to all token holders."
}
```

- `name` - The project's name.
- `logoUri` - The URI/URL of the project's logo.
- `infoUri` - The URI/URL of the project's website.
- `description` - A description of the project.

### Version 2

Example: Project `1-28`, hash [`QmNnExgSYMg5ekLRRxb6wMefA94Ry8uDKVCSKGmF4rGVvK`](https://ipfs.io/ipfs/QmNnExgSYMg5ekLRRxb6wMefA94Ry8uDKVCSKGmF4rGVvK)

```json
{
  "name": "Sneaky Vampire Syndicate Pool ",
  "description": "Represents ownership in 10 SVS Tokens in linked portfolio. This pool has an exit point of 54.95 ETH for the bundle.  This is a reserve rate bundle and the exit price may be changed based on additional drops or mints. ",
  "logoUri": "https://jbx.mypinata.cloud/ipfs/QmSCKixmHXPjmYPfau87NioV9a4rDUxdVCdiWDVP5jSR1b",
  "infoUri": "https://opensea.io/svspool002",
  "payText": "Purchase",
  "tokens": [],
  "version": 2
}
```

- Added `version` - the metadata schema version.
- Added `payText` - text on the project's payment button on [juicebox.money](https://juicebox.money).
- Added `tokens[]` - an array containing tokens to be shown under the project owner's assets on [juicebox.money](https://juicebox.money). |

### Version 3

Example: Project `1-36`, hash [`QmW4WhXEHB55zxn5xAab4gBv6rT4nBckiMkfDujhgWW8TA`](https://ipfs.io/ipfs/QmW4WhXEHB55zxn5xAab4gBv6rT4nBckiMkfDujhgWW8TA)

```json
{
  "name": "ConstitutionDAO",
  "infoUri": "https://constitutiondao.com",
  "logoUri": "https://jbx.mypinata.cloud/ipfs/QmeBqesmJ2Ch8opZGnY1vGhYhnXDZrsY48RXQoq1WczqL1",
  "description": "We are buying the United States Constitution.",
  "twitter": "ConstitutionDAO",
  "discord": "https://discord.gg/EPJnNkP8MX",
  "tokens": [],
  "version": 3,
  "payButton": "Contribute",
  "payDisclosure": "If we fail to win the auction, you will be able to get refunded. If we win, your tokens will serve as governance tokens for ConstitutionDAO."
}
```

- Added `twitter` - The project's Twitter *handle* (**not** the full URL).
- Added `discord` - An invite link to the project's Discord server.
- Added `payDisclosure` - The text displayed to users before paying the project on [juicebox.money](https://juicebox.money).

### Version 4

Example: Project `2-13`, hash [`QmdwY2JDyT8uthJ2kfehpCNM659MHBEDjQ6ic3qw24dGVi`](https://ipfs.io/ipfs/QmdwY2JDyT8uthJ2kfehpCNM659MHBEDjQ6ic3qw24dGVi)

```json
{
  "name": "Zeugh's Juice",
  "infoUri": "https://bit.ly/3lfp3z8",
  "logoUri": "https://jbx.mypinata.cloud/ipfs/QmUCnxDmA9CA7RxerZQgEoLVAEKewyM59eg9cRir1oMXLK",
  "description": "That's where I get my money and my JBX. \n\nThis where you get $Zion",
  "twitter": "zeughfromcanu",
  "discord": "https://discord.gg/gwYNkwKkeM",
  "tokens": [
    { "value": "0x3abF2A4f8452cCC2CF7b4C1e4663147600646f66", "type": "erc20" }
  ],
  "version": 4,
  "payButton": "Z money!",
  "payDisclosure": "Hey, paying this project means directly giving money to zeugh.eth and whatever he wants to do with it\n\nYou will get tokens, they might not have any utility, maybe they do, idk"
}
```

- v2 project support.

### Version 5

Example: Project `2-311`, hash [`QmZPJTmFntmhXvu1iMa8zpP41b7haQURDM8nZx2aPUk54z`](https://ipfs.io/ipfs/QmZPJTmFntmhXvu1iMa8zpP41b7haQURDM8nZx2aPUk54z)

```json
{
  "name": "Greenlight Treasury",
  "infoUri": "studiodao.xyz",
  "logoUri": "ipfs://QmSC2fmjGJ33wKk1A64BrfTjLMvAUD3UCvjtAAi4v5kCNX",
  "description": "First season contributors are the true OGs at StudioDAO. Your contributions fund the first filmmaker Greenlight grants and the development of StudioDAO’s platform.",
  "twitter": "studiodao",
  "discord": "https://discord.gg/YxPGn9pcdr",
  "tokens": [],
  "version": 5,
  "payButton": "Buy Super Ticket",
  "payDisclosure": "BY CLICKING \"Buy a Super Ticket\" YOU ARE AGREEING TO THE TERMS OF SERVICE HOSTED HERE: https://www.studiodao.xyz/terms-of-service",
  "nftPaymentSuccessModal": {
    "content": "Thank you for becoming a Season 1 member!\n\nCheck your Greenlight Power by connecting to StudioDAO. ",
    "ctaText": "Connect to StudioDAO",
    "ctaLink": "https://studiodao.xyz"
  }
}
```

- Added `nftPaymentSuccessModal` - An object defining the modal displayed to a user after purchasing one of the project's NFTs on [juicebox.money](https://juicebox.money). Contains `content`, a `ctaText`, and a `ctaLink`.
- Added `content` - (Within the `nftPaymentSuccessModal` object) the modal's text.
- Added `ctaText` - (Within the `nftPaymentSuccessModal` object) the text on the modal's CTA button.
- Added `ctaLink` - (Within the `nftPaymentSuccessModal` object) where the modal's CTA button links to.
- Changed `logoUri` from full URL to IPFS URI.

### Version 6

Example: Project `2-437`, hash [`QmPugpHXtNN9opNkfThLR9gSqZcNUaA5eZ3WxKeFwsSYSX`](https://ipfs.io/ipfs/QmPugpHXtNN9opNkfThLR9gSqZcNUaA5eZ3WxKeFwsSYSX)

```json
{
  "name": "Anton Vitkovskiy's “Meditation on pikes”",
  "description": "Purchase Anton Vitkovskiy's “Meditation on pikes” 32x39 physical painting. Details below:\n\nArtist: Anton Vitkovskiy\n\nStyle: Neo Expressionism/ Figurative art/post modern/outsiderart/abstract\n\nTitle: “Meditation on Pikes”\nSize: 32x39 inches on stretched canvas.\nGlobal International Shipping is available\nMaterials: acrylic paint , canvas,\nHandmade item\nSigned and dated on the front and back by the artist.\ncreated in 2019\n\nA Certificate of Authenticity issued by the Artist\nReady to hang on the wall.\n\nShips worldwide from Brooklyn, NYC.\nShipping is Free within the US.\n\nReturns are accepted within 14 days of purchase.\nFeel free to contact me with any of your questions.\n\nThank you very much for supporting original art !",
  "logoUri": "ipfs://QmdhRykHKWh4KXSeRTvE6t28iJ5t9Vv1DH6w91MwwJAvT3",
  "infoUri": "www.instagram.com/antovitko/",
  "twitter": "",
  "discord": "",
  "telegram": "",
  "payButton": "Purchase",
  "payDisclosure": "",
  "version": 6
}
```

- added `telegram` - An invite link to the project's Telegram group/channel.

### Version 7

Example: Project `2-466`, hash [`QmZ3tYkpGMjC8gCGSERH2Hk5MWJYY5e8nvxwvr2ec9fwuJ`](https://ipfs.io/ipfs/QmZ3tYkpGMjC8gCGSERH2Hk5MWJYY5e8nvxwvr2ec9fwuJ)

```json
{
  "name": "Cosmic Bake Sale",
  "description": "UPDATE: MINTING CLOSED TILL THE END OF THE UNIVERSE......Why a bake sale? @WagmiStudios\n was mistakenly payed through a few funding cycles from Juicebox DAO even though our proposal had not passed. It has since passed but now we have a 10 ETH shortfall. https://t.co/3HPZyWjrWS, All art was hand made by Sage Kellyn. Once the project launches we will keep the project open for 96 Hrs. Then shut off minting and burn the project.  The Project can collect up to 10.1 Eth to repay JuiceboxDAO and any overflow will be redeemable by Wagmi  Studios. ",
  "logoUri": "ipfs://QmaN22z6Vq1sXZHAHefLeDtnYEcRUKeepQgQdoQ8pRa8LG",
  "coverImageUri": "ipfs://QmQTuBk7hi7rrinfXhBbiHScoLG1Rhzq3QxStgvoTkVuJv",
  "infoUri": "wagmistudios.xyz",
  "twitter": "wagmiStudios",
  "discord": "https://discord.gg/dGADgHKW",
  "telegram": "",
  "payButton": "Collect Treats",
  "payDisclosure": "Thank you so much for being apart of this beautiful experiment. We'd like to thank Juicebox for creating one of the most powerful fundraising tools this side of the milky way. PLEASE flex your favorite pastry on Twitter and share the project. 🙌    ❤️ - Wagmi Studios",
  "version": 7
}
```

- Added `coverImageUri` - The URI/URL of the project's cover image (usually hosted on the IPFS network).

### Version 8

Example: Project `2-477`, hash [`QmZUYR2bNUPNZYzmLcbY4JqJMRrZhfmP7Nom7Hp3kdo2YE`](https://ipfs.io/ipfs/QmZUYR2bNUPNZYzmLcbY4JqJMRrZhfmP7Nom7Hp3kdo2YE)

```json
{
  "name": "nance",
  "infoUri": "nance.app",
  "logoUri": "ipfs://QmU6eSNXv4qyP1FhW1KcExnk114BQmKWJwkuWo9D3HEeap",
  "coverImageUri": "",
  "description": "nance is a sufficiently decentralized, automated governance platform\n\nborn from the most active DAO on Ethereum, JuiceboxDAO\n\nnance can:\n* provide a proposal creation frontend\n* store proposals using Dolt (git for mySQL databases)\n* create a discussion thread for a new proposal\n* alert the DAO to different stages of governance\n* upload proposals to Snapshot in a timely manner\n* keep track of DAO member payouts\n* reconfigure Juicebox funding cycles\n* submit Gnosis Safe transactions",
  "twitter": "nance_app",
  "discord": "discord.gg/eHv5kwbgGE",
  "telegram": "",
  "tokens": [],
  "tags": [],
  "version": 8,
  "payDisclosure": "this is not an investment\n\nthanks for feeling nance-ish <3",
  "payButton": "automate"
}
```

- Add `tags`, an array of project categories defined on juicebox.money.

### Version 9

Example: Project `2-552`, hash [`QmXHpKPhQM6e1RsjxU7pBrrV2w3jjUyy58gtjvBs1xji45`](https://ipfs.io/ipfs/QmXHpKPhQM6e1RsjxU7pBrrV2w3jjUyy58gtjvBs1xji45)

```json
{
  "name": "Juicecast",
  "infoUri": "podcast.juicebox.money",
  "logoUri": "ipfs://QmStCU29qjCi8ngAH7AZ1GTGymPvkDCppZT63335Bw8jBz",
  "coverImageUri": "ipfs://QmP4big6pVACh1erNtPa4sSHSqQr5N5SMZXDrHcvkUrgdf",
  "description": "<p>The Juicecast is a series of conversations hosted by <a href=\"https://twitter.com/0xbrileigh\" rel=\"noopener noreferrer\" target=\"_blank\">Brileigh</a> &amp; <a href=\"https://twitter.com/0xmatthewb\" rel=\"noopener noreferrer\" target=\"_blank\">Matthew</a> with builders in the Juicebox ecosystem and beyond. Episodes are released every two weeks and can be found on <a href=\"https://podcast.juicebox.money\" rel=\"noopener noreferrer\" target=\"_blank\">all major podcast platforms</a> as well as <a href=\"https://www.youtube.com/@JuiceboxDAO\" rel=\"noopener noreferrer\" target=\"_blank\">JBDAO YouTube</a>.</p><p><br></p><p>This project will serve as the homebase for The Juicecast as well as any payouts to Matthew &amp; Brileigh for contributions to JBDAO.</p>",
  "twitter": "",
  "discord": "",
  "telegram": "",
  "tokens": [],
  "tags": ["social", "education"],
  "version": 9,
  "payButton": "Add juice",
  "projectTagline": "Content creation for the Juicebox ecosystem"
}
```

- Added `projectTagline`
- Added HTML `description`s

</details>
