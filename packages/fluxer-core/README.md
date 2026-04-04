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
