import { defineConfig } from 'vitepress'

// Set to '/docs/' for project pages (github.com/blstmo-abandoned-us-for-the-milk/docs)
// Set to '/' if using a custom domain
const BASE = process.env.VITEPRESS_BASE ?? '/'

export default defineConfig({
  base: BASE,
  title: 'erin.js',


  description: 'SDK for building bots on erin.',
  lang: 'en-US',

  head: [['link', { rel: 'icon', href: `${BASE}favicon.svg` }]],

  themeConfig: {
    siteTitle: 'erin.js',

    nav: [
      { text: 'Guides', link: '/v/latest/guides/installation' },
      { text: 'API', link: '/v/latest/api/classes/' },
      { text: 'Changelog', link: '/changelog' },
      {
        text: 'v/latest',
        items: [
          { text: 'latest', link: '/v/latest/guides/installation' },
          // Add versioned links here as new versions are cut:
          // { text: '1.2.4', link: '/v/1.2.4/guides/installation' },
        ],
      },
      {
        text: 'GitHub',
        link: 'https://github.com/blstmo-abandoned-us-for-the-milk/core',
      },
    ],

    sidebar: {
      '/v/latest/guides/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/v/latest/guides/installation' },
            { text: 'Basic Bot', link: '/v/latest/guides/basic-bot' },
            { text: 'Discord.js Compatibility', link: '/v/latest/guides/discord-js-compatibility' },
          ],
        },
        {
          text: 'Sending Messages',
          items: [
            { text: 'Sending Without Reply', link: '/v/latest/guides/sending-without-reply' },
            { text: 'Embeds', link: '/v/latest/guides/embeds' },
            { text: 'Editing Embeds', link: '/v/latest/guides/editing-embeds' },
            { text: 'Reactions', link: '/v/latest/guides/reactions' },
          ],
        },
        {
          text: 'Media',
          items: [
            { text: 'Embed Media', link: '/v/latest/guides/embed-media' },
            { text: 'GIFs', link: '/v/latest/guides/gifs' },
            { text: 'Attachments', link: '/v/latest/guides/attachments' },
            { text: 'Attachments by URL', link: '/v/latest/guides/attachments-by-url' },
            { text: 'Profile URLs', link: '/v/latest/guides/profile-urls' },
          ],
        },
        {
          text: 'Webhooks',
          items: [
            { text: 'Webhooks', link: '/v/latest/guides/webhooks' },
            { text: 'Webhook Attachments & Embeds', link: '/v/latest/guides/webhook-attachments-embeds' },
          ],
        },
        {
          text: 'Voice',
          items: [
            { text: 'Voice', link: '/v/latest/guides/voice' },
          ],
        },
        {
          text: 'Events',
          items: [
            { text: 'Events', link: '/v/latest/guides/events' },
            { text: 'Wait for Guilds', link: '/v/latest/guides/wait-for-guilds' },
            { text: 'Prefix Commands', link: '/v/latest/guides/prefix-commands' },
          ],
        },
        {
          text: 'Channels',
          items: [
            { text: 'Channels', link: '/v/latest/guides/channels' },
            { text: 'Roles', link: '/v/latest/guides/roles' },
          ],
        },
        {
          text: 'Emojis',
          items: [
            { text: 'Emojis', link: '/v/latest/guides/emojis' },
          ],
        },
        {
          text: 'Other',
          items: [
            { text: 'Permissions', link: '/v/latest/guides/permissions' },
            { text: 'Moderation', link: '/v/latest/guides/moderation' },
            { text: 'Deprecated APIs', link: '/v/latest/guides/deprecated-apis' },
          ],
        },
      ],

      '/v/latest/api/': [
        {
          text: 'Classes',
          link: '/v/latest/api/classes/',
        },
        {
          text: 'Interfaces',
          link: '/v/latest/api/interfaces/',
        },
        {
          text: 'Enums',
          link: '/v/latest/api/enums/',
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/blstmo-abandoned-us-for-the-milk/core/edit/main/apps/docs-vitepress/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'erin.js — forked from fluxer.js',
    },
  },
})
