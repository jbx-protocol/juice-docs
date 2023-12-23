// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Juicebox Docs",
  tagline: "Fund your thing.",
  favicon: "img/logo/icon-logo-black.svg",
  url: "https://docs.juicebox.money",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  trailingSlash: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
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
            copyright: "MIT",
          },
        },
        theme: { customCss: "./src/css/custom.css" },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/site/unfurl.png", // og:image
      navbar: {
        logo: {
          alt: "Juicebox",
          src: "img/logo/main-logo-black.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "devSidebar",
            position: "left",
            label: "Developers",
          },
          {
            type: "docSidebar",
            sidebarId: "userSidebar",
            position: "left",
            label: "Users",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { type: "localeDropdown", position: "right" },
          {
            type: "dropdown",
            label: "Links",
            position: "right",
            items: [
              { label: "Juicebox", to: "https://juicebox.money" },
              { label: "Contact", to: "https://juicebox.money/contact" },
              { label: "Discord", to: "https://discord.gg/juicebox" },
              { label: "GitHub", to: "https://github.com/jbx-protocol" },
              { label: "Telegram", to: "https://t.me/jbx_eth" },
              { label: "Twitter", to: "https://twitter.com/juiceboxETH" },
            ],
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      metadata: [
        {
          name: "google-site-verification",
          content: "0Jp7zERBL5i76DiM-bODvBGgbjuVMEQGSuwOchP_ZnE",
        },
      ],
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
