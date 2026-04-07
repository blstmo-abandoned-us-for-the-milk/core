# Voice

Join voice channels and play audio with @erinjs/voice. Supports WebM/Opus streams—no FFmpeg required.

## Installation

Add the voice package alongside the core library.

```bash
pnpm add @erinjs/voice @erinjs/core
```

## Setup

Create a VoiceManager before login so it receives VoiceStatesSync from READY/GUILD_CREATE. This lets the manager see users already in voice when the bot starts.

```javascript
import { Client, Events, VoiceChannel } from '@erinjs/core';
import { getVoiceManager } from '@erinjs/voice';

const client = new Client({ intents: 0 });
getVoiceManager(client); // Must be before login

await client.login(process.env.ERIN_BOT_TOKEN);
```

## Join a Voice Channel

Get the user's voice channel with getVoiceChannelId, then join. The connection resolves when ready.

```javascript
const voiceManager = getVoiceManager(client);
const voiceChannelId = voiceManager.getVoiceChannelId(guildId, userId);
if (!voiceChannelId) return; // User not in voice

const channel = client.channels.get(voiceChannelId);
if (!(channel instanceof VoiceChannel)) return;

const connection = await voiceManager.join(channel);
```

## Play Audio

Play a WebM/Opus URL or stream. The voice package does not use FFmpeg—input must be WebM with Opus. Use yt-dlp or similar to get direct stream URLs from YouTube.

```javascript
// URL (fetched and demuxed automatically)
await connection.play('https://example.com/audio.webm');

// Or a Node.js ReadableStream of Opus
await connection.play(opusStream);
```

## Getting Stream URLs from YouTube

Use youtube-dl-exec or yt-dlp to extract a WebM/Opus URL.

```javascript
import youtubedl from 'youtube-dl-exec';

const result = await youtubedl(videoUrl, {
  getUrl: true,
  format: 'bestaudio[ext=webm][acodec=opus]/bestaudio[ext=webm]/bestaudio',
}, { timeout: 15000 });

const streamUrl = String(result ?? '').trim();
await connection.play(streamUrl);
```

## Volume Control

LiveKitRtcConnection supports setVolume(0-200) and getVolume(). 100 = normal, 50 = half, 200 = double. Affects current and future playback.

```javascript
import { LiveKitRtcConnection } from '@erinjs/voice';

if (connection instanceof LiveKitRtcConnection) {
  connection.setVolume(80); // 80% volume
  console.log('Current volume:', connection.getVolume());
}
```

## Stop and Leave

Stop playback and disconnect. getConnection accepts channel ID or guild ID. leave(guildId) leaves all channels; leaveChannel(channelId) leaves a specific channel.

```javascript
// By channel ID (primary) or guild ID
const connection = voiceManager.getConnection(channelId) ?? voiceManager.getConnection(guildId);
connection?.stop();
if (connection) voiceManager.leaveChannel(connection.channel.id);
// Or leave all channels in the guild:
voiceManager.leave(guildId);
```

## LiveKit and serverLeave

If using LiveKit, the server may emit serverLeave. Listen and reconnect if needed.

```javascript
connection.on?.('serverLeave', async () => {
  try {
    const conn = await voiceManager.join(channel);
    await conn.play(streamUrl);
  } catch (e) {
    console.error('Auto-reconnect failed:', e);
  }
});
```
