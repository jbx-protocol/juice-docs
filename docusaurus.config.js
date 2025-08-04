// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Juice Docs",
  tagline: "Fund your thing.",
  url: "https://docs.juicebox.money",
  baseUrl: "/",
  favicon: "img/logo/icon-logo-black.svg",
  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "town-hall",
        routeBasePath: "town-hall",
        path: "./town-hall",
        showReadingTime: true,
        editUrl: "https://github.com/jbx-protocol/juice-docs/blob/master",
        blogSidebarTitle: "Town Halls",
        blogSidebarCount: "ALL",
        authorsMapPath: "../blog/authors.yml",
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "/",
          editUrl: "https://github.com/jbx-protocol/juice-docs-v3/blob/main",
        },
        blog: {
          showReadingTime: true,
          routeBasePath: "blog",
          editUrl: "https://github.com/jbx-protocol/juice-docs/blob/main",
          blogSidebarTitle: "Articles",
          blogSidebarCount: "ALL",
          feedOptions: {
            type: "all",
            copyright: "Licensed under the MIT License",
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/site/unfurl.png",
      navbar: {
        logo: {
          alt: "Juicebox Logo",
          src: "img/logo/main-logo-black.svg",
        },
        items: [
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "v4",
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
            to: "blog",
            label: "Blog",
            position: "left",
          },
          {
            label: "Town Halls",
            to: "town-hall",
            position: "left",
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
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        defaultLanguage: "solidity",
        additionalLanguages: ["solidity"],
      },
      algolia: {
        appId: "6C0XLHGK46",
        apiKey: "cf4910b7f8d618e1ee356e575db8120b",
        indexName: "juicebox",
      },
    }),
};

export default config;
