// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Juicebox Docs",
  tagline: "Fund your thing.",
  url: "https://docs.juicebox.money",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo/icon-logo-black.svg",
  trailingSlash: true,
  organizationName: "Juicebox", // Usually your GitHub org/user name.
  projectName: "juice-docs", // Usually your repo name.
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "town-hall",
        routeBasePath: "town-hall",
        path: "./blogs/town-hall",
        showReadingTime: true,
        editUrl: "https://github.com/jbx-protocol/juice-docs/blob/main",
        blogSidebarTitle: "Town Halls",
        blogSidebarCount: "ALL",
        authorsMapPath: "../../blog/authors.yml"
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "updates",
        routeBasePath: "updates",
        path: "./blogs/updates",
        showReadingTime: true,
        editUrl: "https://github.com/jbx-protocol/juice-docs/blob/main",
        blogSidebarTitle: "Updates",
        blogSidebarCount: "ALL",
        authorsMapPath: "../../blog/authors.yml"
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "misc",
        routeBasePath: "misc",
        path: "./blogs/misc",
        showReadingTime: true,
        editUrl: "https://github.com/jbx-protocol/juice-docs/blob/main",
        blogSidebarTitle: "Articles",
        blogSidebarCount: "ALL",
        authorsMapPath: "../../blog/authors.yml"
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          editUrl: "https://github.com/jbx-protocol/juice-docs/blob/main",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/jbx-protocol/juice-docs/blob/main",
          blogSidebarTitle: "Articles",
          blogSidebarCount: "ALL",
          feedOptions: {
            type: "all",
            copyright: `Licensed under the MIT License`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
  },
  themeConfig: {
    /*announcementBar: {
      content: '<a href="https://www.juicecrowd.gg/">Juicecrowd</a> submissions are open, with a 3 ETH prize pool.',
      backgroundColor: "#ffb2dd",
      isCloseable: true,
    },*/
    image: "img/site/unfurl.png",
    metadata: [
      {
        name: "keywords",
        content:
          "juicebox, docs, documentation, crypto, cryptocurrency, eth, ethereum, fundraising, treasury, JuiceboxDAO, dao, daos, funding, web3",
      },
      {
        name: "google-site-verification",
        content: "0Jp7zERBL5i76DiM-bODvBGgbjuVMEQGSuwOchP_ZnE",
      },
    ],
    algolia: {
      appId: "6C0XLHGK46",
      apiKey: "cf4910b7f8d618e1ee356e575db8120b",
      indexName: "juicebox",
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    navbar: {
      logo: {
        alt: "Juicebox Logo",
        src: "img/logo/main-logo-black.svg",
      },
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "dev",
          label: "Docs",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "user",
          label: "Project Creators",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "dao",
          label: "JuiceboxDAO",
        },
        {
          type: "dropdown",
          label: "Blogs",
          to: "/blogs",
          position: "left",
          items: [
            {
              label: "For Project Creators",
              to: "/blog",
            },
            {
              label: "Updates",
              to: "/updates",
            },
            {
              label: "Town Halls",
              to: "/town-hall",
            },
            {
              label: "Miscellaneous",
              to: "/misc",
            },
          ],
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          type: "dropdown",
          label: "Links",
          position: "right",
          items: [
            {
              label: "Juicebox",
              to: "https://juicebox.money",
            },
            {
              label: "Contact",
              to: "https://juicebox.money/contact",
            },
            {
              label: "Discord",
              to: "https://discord.gg/juicebox",
            },
            {
              label: "GitHub",
              to: "https://github.com/jbx-protocol",
            },
	    {
	      label: "Telegram",
	      to: "https://t.me/jbx_eth",
	    },
            {
              label: "Governance",
              to: "https://jbdao.org",
            },
            {
              label: "Analytics",
              to: "/dao/reference/analytics/",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/juiceboxETH",
            },
            {
              label: "YouTube",
              to: "https://www.youtube.com/c/JuiceboxDAO/",
            },
            {
              label: "Newsletter",
              to: "https://subscribepage.io/juicenews",
            },
            {
              label: "Podcast",
              to: "https://anchor.fm/thejuicecast",
            },
          ],
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      defaultLanguage: "solidity",
      additionalLanguages: ["solidity"],
    },
  },
};
module.exports = config;
