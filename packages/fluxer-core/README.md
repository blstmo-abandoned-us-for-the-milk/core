# @erinjs/core

Main client for the Fluxer bot SDK.

## Install

```bash
npm install @erinjs/core
```

## Usage

```javascript
import { Client, Events } from '@erinjs/core';

const client = new Client({ intents: 0 });

client.on(Events.Ready, () => console.log('Ready'));
client.on(Events.MessageCreate, async (m) => {
  if (m.content === '!ping') await m.reply('Pong');
});

await client.login(process.env.FLUXER_BOT_TOKEN);
```

For voice, add `@erinjs/voice`. For embeds, use `EmbedBuilder`.

## Event Typing

`client.on(...)`, `client.once(...)`, `client.off(...)`, and `client.emit(...)` are typed against SDK events.

```ts
import { Client, Events } from '@erinjs/core';

const client = new Client();

client.on(Events.MessageCreate, (message) => {
  // message is strongly typed
  console.log(message.id);
});

client.on(Events.GuildMembersChunk, (chunk) => {
  // chunk is GatewayGuildMembersChunkDispatchData
  console.log(chunk.guild_id, chunk.chunk_index, chunk.chunk_count);
});
```
