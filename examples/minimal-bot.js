/**
 * Minimal erin.js bot — login + !ping → Pong.
 * Usage: FLUXER_BOT_TOKEN=your_token node examples/minimal-bot.js
 *
 * Guide route (local docs): /v/latest/guides/basic-bot
 */

import { Client, Events } from '@erinjs/core';

const client = new Client({ intents: 0 });

client.on(Events.Ready, () => console.log('Ready!'));
client.on(Events.MessageCreate, async (m) => {
  if (m.content === '!ping') await m.reply('Pong');
});

await client.login(process.env.FLUXER_BOT_TOKEN);
