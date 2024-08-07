```

 ▄▄▄██▀▀▀█    ██  ██▓ ▄████▄  ▓█████    ▓█████▄  ▒█████   ▄████▄    ██████
   ▒██   ██  ▓██▒▓██▒▒██▀ ▀█  ▓█   ▀    ▒██▀ ██▌▒██▒  ██▒▒██▀ ▀█  ▒██    ▒
   ░██  ▓██  ▒██░▒██▒▒▓█    ▄ ▒███      ░██   █▌▒██░  ██▒▒▓█    ▄ ░ ▓██▄
▓██▄██▓ ▓▓█  ░██░░██░▒▓▓▄ ▄██▒▒▓█  ▄    ░▓█▄   ▌▒██   ██░▒▓▓▄ ▄██▒  ▒   ██▒
 ▓███▒  ▒▒█████▓ ░██░▒ ▓███▀ ░░▒████▒   ░▒████▓ ░ ████▓▒░▒ ▓███▀ ░▒██████▒▒
 ▒▓▒▒░  ░▒▓▒ ▒ ▒ ░▓  ░ ░▒ ▒  ░░░ ▒░ ░    ▒▒▓  ▒ ░ ▒░▒░▒░ ░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░
 ▒ ░▒░  ░░▒░ ░ ░  ▒ ░  ░  ▒    ░ ░  ░    ░ ▒  ▒   ░ ▒ ▒░   ░  ▒   ░ ░▒  ░ ░
 ░ ░ ░   ░░░ ░ ░  ▒ ░░           ░       ░ ░  ░ ░ ░ ░ ▒  ░        ░  ░  ░
 ░   ░     ░      ░  ░ ░         ░  ░      ░        ░ ░  ░ ░            ░
                     ░                   ░               ░
```

# Website

[`juice-docs-v3`](https://docs.juicebox.money) contains documentation for the [Juicebox protocol](https://github.com/jbx-protocol/juice-contracts-v3), [juicebox.money](https://juicebox.money), and projects throughout the Juicebox ecosystem. Juice Docs v3 is built with [Docusaurus 3](https://docusaurus.io/).

### Installation

To run Juice Docs, you need to have [node.js](https://nodejs.org/en) installed.

Clone with:
```bash
git clone https://github.com/jbx-protocol/juice-docs-v3.git

cd juice-docs
```

And install with:
```bash
npm ci
```

Start a local development server with:
```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Build with:
```bash
npm run build
```

This command generates static content in the `build` directory. This content can be served using any static content hosting service.

### Hosting

We're hosting Juice Docs on Peel's [Vercel](https://vercel.com/). If you have any questions, ask in the [Peel Discord](https://discord.gg/XvmfY4Hkcz).

Avoid incremental commits to minimize unecessary builds – make a PR instead!

### Contributing

Juice Docs are funded and built by JuiceboxDAO. You can contribute by making a pull request. If you're interested in getting more involved, read our [Contribution Guide](https://docs.juicebox.money/dao/contribute/).

Juice Docs are written in [Markdown](https://www.markdownguide.org/cheat-sheet/), making it easy for anybody to contribute. If you can read this, you can help!

### Static Files

Files in the `static` directory will be accessible from the base URL. For example, you can access the file in `static/img/townhall.webp` at [`https://docs.juicebox.money/img/townhall.webp`](https://docs.juicebox.money/img/townhall.webp).

### Images

To speed up load times, we use `webp` images. To convert `png` files to `webp` files, run `pnpm webp`. You will need to have [`cwebp`](https://developers.google.com/speed/webp/download) installed for this to work.

### Contact

If you would like to contribute or have questions, you can make an issue here on GitHub, join our [Discord server](https://discord.gg/juicebox), or [contact us via juicebox.money](https://juicebox.money/contact).
